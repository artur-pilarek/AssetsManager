import * as React from 'react';
import {
    Panel,
    PanelType,
    PrimaryButton,
    Stack,
    Text
} from '@fluentui/react';
import { IAsset, IAssignmentHistory } from '../../../../models';
import { AssetService } from '../../../../services/AssetService';
import { ModifyAssetDialog } from '../Dialogs/ModifyAsset';
import { ChangeAssignmentDialog } from '../Dialogs/ChangeAssignmentDialog';
import { IssueReportDialog } from '../Dialogs/AddIssueDialog';
import { RemoveConfirmationDialog } from '../Dialogs/RemoveConfirmationDialog';
import { MSGraphClientFactory } from '@microsoft/sp-http';
import { IssueReportService } from '../../../../services/IssueReportService';
import { IIssueReport } from '../../../../models/IIssueReport';
import { AssignmentHistoryService } from '../../../../services/AssignmentHistory';

export interface IAssetDetailsPanelProps {
    asset: IAsset;
    isOpen: boolean;
    onDismiss: () => void;
    assetService: AssetService;
    assignmentHistoryService?: AssignmentHistoryService;
    onAssetChange: (asset: IAsset | number, action: 'update' | 'delete' | 'add') => void;
    graphClientFactory: MSGraphClientFactory;
    issueReportService: IssueReportService;
}

export const AssetDetailsPanel: React.FC<IAssetDetailsPanelProps> = ({
    asset,
    isOpen,
    onDismiss,
    assetService,
    issueReportService,
    assignmentHistoryService,
    onAssetChange,
    graphClientFactory
}) => {

    const [showModify, setShowModify] = React.useState(false);
    const [showAssign, setShowAssign] = React.useState(false);
    const [showIssue, setShowIssue] = React.useState(false);
    const [showRemove, setShowRemove] = React.useState(false);
    const [issues, setIssues] = React.useState<IIssueReport[]>([]);
    const [assignmentHistory, setAssignmentHistory] = React.useState<IAssignmentHistory[]>([]);

    const fetchIssues: () => Promise<void> = async () => {
        const fetchedIssues = await issueReportService.getByAssetId(asset.id);
        setIssues(fetchedIssues);
    };

    const fetchAssignmentHistory: () => Promise<void> = async () => {
        const fetchedHistory = await assignmentHistoryService!.getByAssetId(asset.id);
        setAssignmentHistory(fetchedHistory);
    };

    React.useEffect(() => {
        Promise.all([
            fetchIssues(),
            fetchAssignmentHistory()
        ]).then(() => {
            console.log("Fetched asset issues and assignment history successfully");
        }).catch((error) => {
            console.error("Error fetching asset details:", error);
        });
    }, [asset]);

    return (
        <Panel
            isOpen={isOpen}
            onDismiss={onDismiss}
            isLightDismiss={true}
            closeButtonAriaLabel="Close"
            headerText={`Asset Details – ${asset.assetTag}`}
            type={PanelType.medium}
        >
            <Stack tokens={{ childrenGap: 10 }} styles={{ root: { marginTop: 10 } }}>
                <Text><b>Type:</b> {asset.assetType}</Text>
                <Text><b>Manufacturer:</b> {asset.manufacturer}</Text>
                <Text><b>Model:</b> {asset.model}</Text>
                <Text><b>Status:</b> {asset.status}</Text>
                <Text><b>Location:</b> {asset.location}</Text>
                <Text><b>Owner:</b> {asset.currentOwnerName ?? '-'}</Text>
                <Text><b>Purchase Date:</b> {asset.purchaseDate ? new Date(asset.purchaseDate).toLocaleDateString() : '-'}</Text>
                <Text><b>Notes:</b> {asset.notes ?? '-'}</Text>
                <Text><b>Issue Reports:</b></Text>
                {issues.length > 0 ? (
                    <Stack tokens={{ childrenGap: 5 }}>
                        {issues.map((issue) => (
                            <Text key={issue.id}>- {issue.description} (Reported on: {new Date(issue.issueDate).toLocaleDateString()} by {issue.reportedByName})</Text>
                        ))}
                    </Stack>
                ) : (
                    <Text>No issue reports for this asset.</Text>
                )}
                <Text><b>Assignment History:</b></Text>
                {assignmentHistory.length > 0 ? (
                    <Stack tokens={{ childrenGap: 5 }}>
                        {assignmentHistory.map((history) => (
                            <Text key={history.id}>- {history.employeeName} (From: {new Date(history.assignedDate).toLocaleDateString()})</Text>
                        ))}
                    </Stack>
                ) : (
                    <Text>No assignment history for this asset.</Text>
                )}
                <Stack tokens={{ childrenGap: 8 }}>
                    <PrimaryButton
                        text="Modify Asset"
                        onClick={() => setShowModify(true)}
                        styles={{
                            root: {
                                maxWidth: 300,
                                backgroundColor: 'blue',
                                border: 'none',
                            },
                            rootHovered: {
                                backgroundColor: 'blue',
                                border: 'none',
                                opacity: 0.8
                            },
                        }}
                    />
                    <PrimaryButton
                        text="Change Assignment"
                        onClick={() => setShowAssign(true)}
                        styles={{
                            root: {
                                maxWidth: 300,
                                backgroundColor: 'green',
                                border: 'none',
                            },
                            rootHovered: {
                                backgroundColor: 'green',
                                border: 'none',
                                opacity: 0.8
                            },
                        }}
                    />
                    <PrimaryButton
                        text="Add Issue Report"
                        onClick={() => setShowIssue(true)}
                        styles={{
                            root: {
                                maxWidth: 300,
                                backgroundColor: 'orange',
                                border: 'none',
                                color: 'violet',
                            },
                            rootHovered: {
                                backgroundColor: 'orange',
                                border: 'none',
                                opacity: 0.8
                            },
                        }}
                    />
                    <PrimaryButton
                        text="Remove Asset"
                        onClick={() => setShowRemove(true)}
                        styles={{
                            root: {
                                maxWidth: 300,
                                backgroundColor: 'red',
                                border: 'none',
                            },
                            rootHovered: {
                                backgroundColor: 'red',
                                border: 'none',
                                opacity: 0.8
                            },
                        }}
                    />
                </Stack>

                {showModify && <ModifyAssetDialog
                    asset={asset}
                    isOpen={showModify}
                    onClose={() => setShowModify(false)}
                    assetService={assetService}
                    onAssetChange={onAssetChange}
                />}

                {showAssign && <ChangeAssignmentDialog
                    asset={asset}
                    isOpen={showAssign}
                    onClose={() => setShowAssign(false)}
                    assetService={assetService}
                    graphClientFactory={graphClientFactory}
                    onAssetChange={onAssetChange}
                />}

                {showIssue && <IssueReportDialog
                    assetId={asset.id}
                    isOpen={showIssue}
                    onClose={() => setShowIssue(false)}
                    onSave={(newIssueReport) => {
                        setIssues([...issues, newIssueReport]);
                    }}
                    issueReportService={issueReportService}
                    graphClientFactory={graphClientFactory}
                />}
                {showRemove && <RemoveConfirmationDialog
                    asset={{ id: asset.id, assetTag: asset.assetTag }}
                    isOpen={showRemove}
                    onClose={() => setShowRemove(false)}
                    assetService={assetService}
                    onAssetChange={onAssetChange}
                />}
            </Stack>
        </Panel>
    );
};