import * as React from 'react';
import {
    DetailsList,
    DetailsListLayoutMode,
    SelectionMode,
    IColumn,
    mergeStyles,
    Stack,
    PrimaryButton
} from '@fluentui/react';
import { IAsset } from '../../../../models';
import { AssetService } from '../../../../services/AssetService';
import { AssetDetailsPanel } from '../AssetDetailsPanel/AssetDetailsPanel';
import { CreateAssetDialog } from '../Dialogs/CreateAssetDialog';
import { MSGraphClientFactory } from '@microsoft/sp-http';
import { IssueReportService } from '../../../../services/IssueReportService';
import { AssignmentHistoryService } from '../../../../services/AssignmentHistory';

export interface IAssetsListProps {
    assetService: AssetService;
    graphClientFactory: MSGraphClientFactory;
    issueReportService: IssueReportService;
    assignmentHistoryService: AssignmentHistoryService;
}

export const AssetsList: React.FC<IAssetsListProps> = ({ assetService, graphClientFactory, issueReportService, assignmentHistoryService }) => {
    const [assets, setAssets] = React.useState<IAsset[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedAsset, setSelectedAsset] = React.useState<IAsset | null>(null);
    const [isPanelOpen, setIsPanelOpen] = React.useState(false);
    const [showCreate, setShowCreate] = React.useState(false);

    React.useEffect(() => {
        assetService.getAll("")
            .then((fetchedAssets) => {
                setAssets(fetchedAssets);
            })
            .catch((error) => {
                console.error("Error fetching assets:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [assetService]);

    const handleAssetChange: (asset: IAsset | number, action: 'update' | 'delete' | 'add') => void = (asset, action) => {
        console.log('Handling asset change:', asset, action);
        if (action === 'delete') {
            setAssets((prev) => prev.filter((a) => a.id !== asset));
            setSelectedAsset(null);
            setIsPanelOpen(false);
        } else if (action === 'update' && typeof asset !== 'number') {
            setAssets((prev) =>
                prev.map((a) => (a.id === asset.id ? asset : a))
            );
            setSelectedAsset(asset);
        } else if (action === 'add' && typeof asset !== 'number') {
            setAssets((prev) => [...prev, asset]);
            setSelectedAsset(asset);
        }
    };

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
                key: 'currentOwnerName',
                name: 'Owner',
                fieldName: 'currentOwnerName',
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
            }
        ],
        []
    );

    const onDismiss: () => void = () => {
        setIsPanelOpen(false);
        setSelectedAsset(null);
    };

    if (loading) return <div>Loading assets...</div>;

    return (
        <>
            <Stack horizontal tokens={{ childrenGap: 10 }} styles={{ root: { marginBottom: 10 } }}>
                <PrimaryButton text="Create Asset" onClick={() => setShowCreate(true)} />
            </Stack>
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
            {selectedAsset && (
                <AssetDetailsPanel
                    asset={selectedAsset}
                    isOpen={isPanelOpen}
                    onDismiss={onDismiss}
                    assetService={assetService}
                    onAssetChange={handleAssetChange}
                    graphClientFactory={graphClientFactory}
                    issueReportService={issueReportService}
                    assignmentHistoryService={assignmentHistoryService}
                />
            )}

            <CreateAssetDialog
                isOpen={showCreate}
                onClose={() => setShowCreate(false)}
                assetService={assetService}
                onAssetChange={handleAssetChange}
            />
        </>
    )
}