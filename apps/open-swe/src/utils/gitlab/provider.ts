import { GitProvider } from "@open-swe/shared/git/provider";
import {
  getIssue,
  updateIssue,
  createIssueComment,
  updateIssueComment,
  getBranch,
} from "./api.js";

export const gitlabProvider: GitProvider = {
  getIssue: ({ owner, repo, issueNumber, token }) =>
    getIssue({ owner, repo, issueNumber, token }),
  updateIssue: ({ owner, repo, issueNumber, title, body, token }) =>
    updateIssue({ owner, repo, issueNumber, title, body, token }),
  createIssueComment: ({ owner, repo, issueNumber, body, token }) =>
    createIssueComment({ owner, repo, issueNumber, body, token }),
  updateIssueComment: ({ owner, repo, commentId, body, token, issueNumber }) =>
    updateIssueComment({
      owner,
      repo,
      commentId,
      body,
      token,
      issueNumber,
    }),
  getBranch: ({ owner, repo, branchName, token }) =>
    getBranch({ owner, repo, branchName, token }),
};
