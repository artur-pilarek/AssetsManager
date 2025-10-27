import * as React from 'react';
import styles from '../AssetsManager.module.scss';
import type { IAssetsManagerProps } from './IAssetsManagerProps';
import { AssetsList } from '../AssetsList/AssetsList';

const AssetsManager: React.FC<IAssetsManagerProps> = ({ hasTeamsContext, assetService, graphClientFactory, issueReportService, assignmentHistoryService }) => {

  return (
    <section className={`${styles.assetsManager} ${hasTeamsContext ? styles.teams : ''}`}>
      <AssetsList assetService={assetService} graphClientFactory={graphClientFactory} issueReportService={issueReportService} assignmentHistoryService={assignmentHistoryService} />
    </section>
  );
};

export default AssetsManager;
