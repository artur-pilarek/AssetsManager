import * as React from 'react';
import {
    Dialog, DialogType, DialogFooter,
    TextField, PrimaryButton, DefaultButton
} from '@fluentui/react';
import { AssetService } from '../../../../services/AssetService';

export interface IIssueReportDialogProps {
    assetId: number;
    isOpen: boolean;
    onClose: () => void;
    assetService: AssetService;
}

export const IssueReportDialog: React.FC<IIssueReportDialogProps> = ({
    assetId, isOpen, onClose, assetService
}) => {
    const [description, setDescription] = React.useState('');

    const handleSave = async () => {
        if (!description.trim()) return;
        console.log('Creating issue report for asset', assetId, 'with description:', description);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // todo implement endpoint call when ready
        onClose();
        return;
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