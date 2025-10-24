import * as React from 'react';
import {
    DetailsList,
    DetailsListLayoutMode,
    SelectionMode,
    IColumn,
    mergeStyles
} from '@fluentui/react';
import { IAsset } from '../../../../models';
import { AssetService } from '../../../../services/AssetService';
import { AssetDetailsPanel } from '../AssetDetailsPanel/AssetDetailsPanel';

export interface IAssetsListProps {
    assetService: AssetService;
}

export const AssetsList: React.FC<IAssetsListProps> = ({ assetService }) => {
    const [assets, setAssets] = React.useState<IAsset[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedAsset, setSelectedAsset] = React.useState<IAsset | null>(null);
    const [isPanelOpen, setIsPanelOpen] = React.useState(false);

    React.useEffect(() => {
        assetService.getAll("")
            .then((fetchedAssets) => {
                setAssets(fetchedAssets);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
        // finaly not working in this ES version - SPFX uses ES5 -.-
    }, [assetService]);

    // useMemo to avoid re-creating columns on each render
    const columns: IColumn[] = React.useMemo(
        () => [
            {
                key: 'assetTag',
                name: 'Asset Tag',
                fieldName: 'assetTag',
                minWidth: 100,
                isResizable: true,
                onRender: (item: IAsset) => <strong>{item.assetTag}</strong>
            },
            {
                key: 'assetType',
                name: 'Type',
                fieldName: 'assetType',
                minWidth: 100,
                isResizable: true
            },
            {
                key: 'manufacturer',
                name: 'Manufacturer',
                fieldName: 'manufacturer',
                minWidth: 100,
                isResizable: true
            },
            {
                key: 'model',
                name: 'Model',
                fieldName: 'model',
                minWidth: 120,
                isResizable: true
            },
            {
                key: 'status',
                name: 'Status',
                fieldName: 'status',
                minWidth: 100,
                isResizable: true,
                onRender: (item: IAsset) => (
                    <span
                        className={mergeStyles({
                            color:
                                item.status === 'Available'
                                    ? 'green'
                                    : item.status === 'Assigned'
                                        ? 'dodgerblue'
                                        : item.status === 'Maintenance'
                                            ? 'orange'
                                            : 'gray',
                            fontWeight: 600
                        })}
                    >
                        {item.status}
                    </span>
                )
            },
            {
                key: 'location',
                name: 'Location',
                fieldName: 'location',
                minWidth: 120,
                isResizable: true
            },
            {
                key: 'nextMaintenanceDate',
                name: 'Next Maintenance',
                fieldName: 'nextMaintenanceDate',
                minWidth: 160,
                isResizable: true,
                onRender: (item: IAsset) =>
                    item.nextMaintenanceDate
                        ? new Date(item.nextMaintenanceDate).toLocaleDateString()
                        : '-'
            }
        ],
        []
    );

    const onDismiss = () => {
        console.log("Panel closed trigger");
        setIsPanelOpen(false);
        setSelectedAsset(null);
    };

    if (loading) return <div>Loading assets...</div>;

    return (
        <>
            <DetailsList
                key={isPanelOpen ? selectedAsset?.id : 'list'}
                items={assets}
                columns={columns}
                setKey="assetsList"
                layoutMode={DetailsListLayoutMode.justified}
                selectionMode={SelectionMode.none}
                styles={{ root: { cursor: 'pointer' } }}
                onActiveItemChanged={(item?: IAsset) => {
                    if (!item) return;
                    if (isPanelOpen && selectedAsset?.id === item.id) return;
                    setSelectedAsset(item);
                    setIsPanelOpen(true);
                }}
            />
            <p>Working 2</p>
            {selectedAsset && (
                <>
                    <p>Selected Asset: {selectedAsset.assetTag || 'Failed to load asset'}</p>
                    <p>{isPanelOpen ? 'Panel is open' : 'Panel is closed'}</p>
                </>
            )}
            {selectedAsset && (
                <AssetDetailsPanel
                    asset={selectedAsset}
                    isOpen={isPanelOpen}
                    onDismiss={onDismiss}
                    assetService={assetService}
                />
            )}
        </>
    )
}