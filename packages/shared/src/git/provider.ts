export interface GitIssue {
  number: number;
  title: string;
  body: string | null;
}

export interface GitIssueComment {
  id: number;
  body: string;
}

export interface GitBranch {
  name: string;
  sha?: string;
}

export interface GitProvider {
  getIssue(params: {
    owner: string;
    repo: string;
    issueNumber: number;
    token: string;
  }): Promise<GitIssue | null>;
  updateIssue(params: {
    owner: string;
    repo: string;
    issueNumber: number;
    title?: string;
    body?: string;
    token: string;
  }): Promise<GitIssue | null>;
  createIssueComment(params: {
    owner: string;
    repo: string;
    issueNumber: number;
    body: string;
    token: string;
  }): Promise<GitIssueComment | null>;
  updateIssueComment(params: {
    owner: string;
    repo: string;
    commentId: number;
    body: string;
    token: string;
    issueNumber?: number;
  }): Promise<GitIssueComment | null>;
  getBranch(params: {
    owner: string;
    repo: string;
    branchName: string;
    token: string;
  }): Promise<GitBranch | null>;
}
