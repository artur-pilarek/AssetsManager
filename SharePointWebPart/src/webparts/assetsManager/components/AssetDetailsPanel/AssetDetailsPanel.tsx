import * as React from 'react';
import {
    Panel,
    PanelType,
    PrimaryButton,
    Stack,
    Text
} from '@fluentui/react';
import { IAsset } from '../../../../models';
import { AssetService } from '../../../../services/AssetService';
import { ModifyAssetDialog } from '../Dialogs/ModifyAsset';
import { ChangeAssignmentDialog } from '../Dialogs/ChangeAssignmentDialog';
import { IssueReportDialog } from '../Dialogs/AddIssueDialog';
import { RemoveConfirmationDialog } from '../Dialogs/RemoveConfirmationDialog';

export interface IAssetDetailsPanelProps {
    asset: IAsset;
    isOpen: boolean;
    onDismiss: () => void;
    assetService: AssetService;
}

export const AssetDetailsPanel: React.FC<IAssetDetailsPanelProps> = ({
    asset,
    isOpen,
    onDismiss,
    assetService
}) => {

    const [showModify, setShowModify] = React.useState(false);
    const [showAssign, setShowAssign] = React.useState(false);
    const [showIssue, setShowIssue] = React.useState(false);
    const [showRemove, setShowRemove] = React.useState(false);
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

                <ModifyAssetDialog
                    asset={asset}
                    isOpen={showModify}
                    onClose={() => setShowModify(false)}
                    assetService={assetService}
                />

                <ChangeAssignmentDialog
                    asset={asset}
                    users={[]} // todo: load users from service
                    isOpen={showAssign}
                    onClose={() => setShowAssign(false)}
                    assetService={assetService}
                />

                <IssueReportDialog
                    assetId={asset.id}
                    isOpen={showIssue}
                    onClose={() => setShowIssue(false)}
                    assetService={assetService}
                />
                <RemoveConfirmationDialog
                    asset={{ id: asset.id, assetTag: asset.assetTag }}
                    isOpen={showRemove}
                    onClose={() => setShowRemove(false)}
                    assetService={assetService}
                />
            </Stack>
        </Panel>
    );
};