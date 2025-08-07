import {
  GitIssue,
  GitIssueComment,
  GitBranch,
} from "@open-swe/shared/git/provider";

const API_URL = process.env.GITLAB_API_URL || "https://gitlab.com/api/v4";

function projectPath(owner: string, repo: string): string {
  return encodeURIComponent(`${owner}/${repo}`);
}

async function gitlabRequest<T>(
  path: string,
  token: string,
  init?: RequestInit,
): Promise<T | null> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "PRIVATE-TOKEN": token,
      "Content-Type": "application/json",
    },
    ...init,
  });
  if (!res.ok) {
    return null;
  }
  return res.json() as Promise<T>;
}

export async function getIssue({
  owner,
  repo,
  issueNumber,
  token,
}: {
  owner: string;
  repo: string;
  issueNumber: number;
  token: string;
}): Promise<GitIssue | null> {
  return gitlabRequest<GitIssue>(
    `/projects/${projectPath(owner, repo)}/issues/${issueNumber}`,
    token,
  );
}

export async function updateIssue({
  owner,
  repo,
  issueNumber,
  title,
  body,
  token,
}: {
  owner: string;
  repo: string;
  issueNumber: number;
  title?: string;
  body?: string;
  token: string;
}): Promise<GitIssue | null> {
  return gitlabRequest<GitIssue>(
    `/projects/${projectPath(owner, repo)}/issues/${issueNumber}`,
    token,
    {
      method: "PUT",
      body: JSON.stringify({
        title,
        description: body,
      }),
    },
  );
}

export async function createIssueComment({
  owner,
  repo,
  issueNumber,
  body,
  token,
}: {
  owner: string;
  repo: string;
  issueNumber: number;
  body: string;
  token: string;
}): Promise<GitIssueComment | null> {
  return gitlabRequest<GitIssueComment>(
    `/projects/${projectPath(owner, repo)}/issues/${issueNumber}/notes`,
    token,
    {
      method: "POST",
      body: JSON.stringify({
        body,
      }),
    },
  );
}

export async function updateIssueComment({
  owner,
  repo,
  issueNumber,
  commentId,
  body,
  token,
}: {
  owner: string;
  repo: string;
  issueNumber: number;
  commentId: number;
  body: string;
  token: string;
}): Promise<GitIssueComment | null> {
  return gitlabRequest<GitIssueComment>(
    `/projects/${projectPath(owner, repo)}/issues/${issueNumber}/notes/${commentId}`,
    token,
    {
      method: "PUT",
      body: JSON.stringify({
        body,
      }),
    },
  );
}

export async function getBranch({
  owner,
  repo,
  branchName,
  token,
}: {
  owner: string;
  repo: string;
  branchName: string;
  token: string;
}): Promise<GitBranch | null> {
  return gitlabRequest<GitBranch>(
    `/projects/${projectPath(owner, repo)}/repository/branches/${branchName}`,
    token,
  );
}
