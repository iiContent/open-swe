import { Context } from "hono";
import { BlankEnv, BlankInput } from "hono/types";
import { createLogger, LogLevel } from "../../../utils/logger.js";
import {
  getOpenSWELabel,
  getOpenSWEAutoAcceptLabel,
  getOpenSWEMaxLabel,
  getOpenSWEMaxAutoAcceptLabel,
} from "../../../utils/github/label.js";
import { gitlabProvider } from "../../../utils/gitlab/provider.js";

const logger = createLogger(LogLevel.INFO, "GitLabIssueWebhook");

const GITLAB_TOKEN = process.env.GITLAB_TOKEN;

export async function issueWebhookHandler(
  c: Context<BlankEnv, "/webhooks/gitlab", BlankInput>,
) {
  if (!GITLAB_TOKEN) {
    logger.error("GITLAB_TOKEN not configured");
    return c.json({ error: "Missing token" }, 400);
  }

  const payload = await c.req.json();
  const addedLabels =
    payload.changes?.labels?.current?.map((l: any) => l.title) ?? [];
  const previousLabels =
    payload.changes?.labels?.previous?.map((l: any) => l.title) ?? [];
  const newLabels = addedLabels.filter(
    (l: string) => !previousLabels.includes(l),
  );

  const validLabels = [
    getOpenSWELabel(),
    getOpenSWEAutoAcceptLabel(),
    getOpenSWEMaxLabel(),
    getOpenSWEMaxAutoAcceptLabel(),
  ];

  if (!newLabels.some((l: string) => validLabels.includes(l))) {
    return c.json({ skipped: true });
  }

  const issue = payload.object_attributes;
  const project = payload.project;
  const [owner, repo] = project.path_with_namespace.split("/");
  const issueNumber = issue.iid;

  await gitlabProvider.createIssueComment({
    owner,
    repo,
    issueNumber,
    body: "🤖 Open SWE has been triggered for this issue. Processing...",
    token: GITLAB_TOKEN,
  });

  logger.info("Processed GitLab issue", { owner, repo, issueNumber });
  return c.json({ received: true });
}
