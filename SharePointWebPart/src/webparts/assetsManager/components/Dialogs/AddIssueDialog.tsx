import * as React from 'react';
import {
    Dialog, DialogType, DialogFooter,
    TextField, PrimaryButton, DefaultButton
} from '@fluentui/react';
import { IssueReportService } from '../../../../services/IssueReportService';
import { MSGraphClientFactory } from '@microsoft/sp-http';
import { IssuePriority, IssueStatus } from '../../../../models/Enums';
import { IIssueReport } from '../../../../models';

export interface IIssueReportDialogProps {
    assetId: number;
    isOpen: boolean;
    onClose: () => void;
    onSave: (issueReport: IIssueReport) => void;
    issueReportService: IssueReportService;
    graphClientFactory: MSGraphClientFactory;
}

export const IssueReportDialog: React.FC<IIssueReportDialogProps> = ({
    assetId, isOpen, onClose, onSave, issueReportService, graphClientFactory
}) => {
    const [description, setDescription] = React.useState('');
    const [currentUser, setCurrentUser] = React.useState<any>(null);

    const getCurrentUser = async () => {
        let graphClient = await graphClientFactory.getClient("3");
        try {
            const user = await graphClient.api('/me').get();
            return user;
        } catch (err) {
            console.error("Error fetching current user: ", err);
        }
    };

    React.useEffect(() => {
        const fetchUser = async () => {
            const user = await getCurrentUser();
            setCurrentUser(user);
        };
        fetchUser();
    }, []);

    const handleSave = async () => {
        if (!description.trim()) return;
        console.log('Creating issue report for asset', assetId, 'with description:', description);
        const issueReport = {
            assetId,
            description,
            reportedByName: currentUser?.displayName || 'Unknown',
            reportedByEmail: currentUser?.mail || 'Unknown',
            issueDate: new Date().toISOString(),
            status: IssueStatus.Open,
            priority: IssuePriority.Medium
        }
        await issueReportService.create(issueReport);
        onSave(issueReport);
        onClose();
    };

    return (
        <Dialog
            hidden={!isOpen}
            onDismiss={onClose}
            dialogContentProps={{
                type: DialogType.largeHeader,
                title: 'Add Issue Report'
            }}
            modalProps={{ isBlocking: false }}
        >
            <TextField
                label="Describe the issue"
                multiline
                rows={4}
                value={description}
                onChange={(_, val) => setDescription(val || '')}
            />
            <DialogFooter>
                <PrimaryButton text="Save" onClick={handleSave} />
                <DefaultButton text="Cancel" onClick={onClose} />
            </DialogFooter>
        </Dialog>
    );
};