import { IssueStatus, IssuePriority } from './Enums';

export interface IIssueReport {
  id: number;
  assetId: number;
  reportedByEmail: string;
  reportedByName: string;
  issueDate: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  resolvedDate?: string;
  resolvedByEmail?: string;
  resolvedByName?: string;
  resolutionNotes?: string;
}