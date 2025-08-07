import { Hono } from "hono";
import { issueWebhookHandler as githubIssueWebhookHandler } from "./git/github/issue-webhook.js";
import { issueWebhookHandler as gitlabIssueWebhookHandler } from "./git/gitlab/issue-webhook.js";

export const app = new Hono();

const provider = process.env.GIT_PROVIDER ?? "github";

if (provider === "gitlab") {
  app.post("/webhooks/gitlab", gitlabIssueWebhookHandler);
} else {
  app.post("/webhooks/github", githubIssueWebhookHandler);
}
