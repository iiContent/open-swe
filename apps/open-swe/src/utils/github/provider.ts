import {
  GitProvider,
  GitIssue,
  GitIssueComment,
  GitBranch,
} from "@open-swe/shared/git/provider";
import {
  getIssue as githubGetIssue,
  updateIssue as githubUpdateIssue,
  createIssueComment as githubCreateIssueComment,
  updateIssueComment as githubUpdateIssueComment,
  getBranch as githubGetBranch,
} from "./api.js";

export const githubProvider: GitProvider = {
  getIssue: async ({
    owner,
    repo,
    issueNumber,
    token,
  }): Promise<GitIssue | null> =>
    githubGetIssue({
      owner,
      repo,
      issueNumber,
      githubInstallationToken: token,
    }),
  updateIssue: async ({
    owner,
    repo,
    issueNumber,
    title,
    body,
    token,
  }): Promise<GitIssue | null> =>
    githubUpdateIssue({
      owner,
      repo,
      issueNumber,
      title,
      body,
      githubInstallationToken: token,
    }),
  createIssueComment: async ({
    owner,
    repo,
    issueNumber,
    body,
    token,
  }): Promise<GitIssueComment | null> =>
    githubCreateIssueComment({
      owner,
      repo,
      issueNumber,
      body,
      githubToken: token,
    }),
  updateIssueComment: async ({
    owner,
    repo,
    commentId,
    body,
    token,
    issueNumber,
  }): Promise<GitIssueComment | null> =>
    githubUpdateIssueComment({
      owner,
      repo,
      commentId,
      body,
      githubInstallationToken: token,
    }),
  getBranch: async ({
    owner,
    repo,
    branchName,
    token,
  }): Promise<GitBranch | null> =>
    githubGetBranch({
      owner,
      repo,
      branchName,
      githubInstallationToken: token,
    }),
};
