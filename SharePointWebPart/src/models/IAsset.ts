import { AssetStatus } from './Enums';
import { IAssignmentHistory } from './IAssignmentHistory';
import { IIssueReport } from './IIssueReport';

export interface IAsset {
  id: number;
  assetTag: string;
  assetType: string;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  status: AssetStatus;
  currentOwnerEmail?: string;
  currentOwnerName?: string;
  purchaseDate?: string;
  warrantyExpiry?: string;
  nextMaintenanceDate?: string;
  location?: string;
  notes?: string;
  createdDate: string;
  updatedDate: string;
  assignmentHistory?: IAssignmentHistory[];
  issueReports?: IIssueReport[];
}