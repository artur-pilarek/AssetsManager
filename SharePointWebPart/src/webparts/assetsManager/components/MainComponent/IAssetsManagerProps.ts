import { AssetService } from "../../../../services/AssetService";

export interface IAssetsManagerProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  assetService: AssetService;
}
