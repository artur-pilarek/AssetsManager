import { AssetService } from "../../../../services/AssetService";
import { MSGraphClientFactory } from "@microsoft/sp-http";
import { IssueReportService } from "../../../../services/IssueReportService";
import { AssignmentHistoryService } from "../../../../services/AssignmentHistory";

export interface IAssetsManagerProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  assetService: AssetService;
  issueReportService: IssueReportService;
  assignmentHistoryService: AssignmentHistoryService;
  graphClientFactory: MSGraphClientFactory;
}
