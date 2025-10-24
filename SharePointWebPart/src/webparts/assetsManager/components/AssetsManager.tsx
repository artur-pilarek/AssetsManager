import * as React from 'react';
import styles from './AssetsManager.module.scss';
import type { IAssetsManagerProps } from './IAssetsManagerProps';
import { IAsset } from '../../../models';

const AssetsManager: React.FC<IAssetsManagerProps> = ({ hasTeamsContext, assetService }) => {

  const [assets, setAssets] = React.useState<IAsset[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    assetService.getAll("?$filter=status eq 'Available'")
      .then((fetchedAssets) => {
        setAssets(fetchedAssets);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section className={`${styles.assetsManager} ${hasTeamsContext ? styles.teams : ''}`}>
      <div>
        {assets.map(a => (
          <div key={a.id}>
            <strong>{a.assetTag}</strong> — {a.status}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AssetsManager;
