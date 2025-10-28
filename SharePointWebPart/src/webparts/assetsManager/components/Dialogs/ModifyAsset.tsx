import * as React from 'react';
import {
    Dialog, DialogFooter, DialogType,
    PrimaryButton, DefaultButton,
    TextField, Stack
} from '@fluentui/react';
import { IAsset } from '../../../../models';
import { AssetService } from '../../../../services/AssetService';

export interface IModifyAssetDialogProps {
    asset: IAsset;
    isOpen: boolean;
    onClose: () => void;
    assetService: AssetService;
    onAssetChange: (asset: IAsset | number, action: 'update' | 'delete' | 'add') => void;
}

export const ModifyAssetDialog: React.FC<IModifyAssetDialogProps> = ({
    asset, isOpen, onClose, assetService, onAssetChange
}) => {
    const [form, setForm] = React.useState({ ...asset });
    const [saving, setSaving] = React.useState(false);

    const handleChange = (
        e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value?: string
    ): void => {
        const { name } = e.target as HTMLInputElement;
        setForm({ ...form, [name]: value });
    };

    const handleSave: () => Promise<void> = async () => {
        setSaving(true);
        await assetService.update(form);
        onAssetChange(form, 'update');
        setSaving(false);
        onClose();
        return;
    };

    return (
        <Dialog
            hidden={!isOpen}
            onDismiss={onClose}
            dialogContentProps={{
                type: DialogType.largeHeader,
                title: `Modify Asset – ${asset.assetTag}`
            }}
            modalProps={{ isBlocking: false }}
        >
            <Stack tokens={{ childrenGap: 10 }}>
                <TextField label="Asset Tag" name="assetTag" value={form.assetTag} onChange={handleChange} />
                <TextField label="Type" name="assetType" value={form.assetType} onChange={handleChange} />
                <TextField label="Manufacturer" name="manufacturer" value={form.manufacturer ?? ''} onChange={handleChange} />
                <TextField label="Model" name="model" value={form.model ?? ''} onChange={handleChange} />
                <TextField label="Location" name="location" value={form.location ?? ''} onChange={handleChange} />
                <TextField label="Notes" name="notes" multiline rows={3} value={form.notes ?? ''} onChange={handleChange} />
            </Stack>

            <DialogFooter>
                <PrimaryButton text="Save" onClick={handleSave} disabled={saving} />
                <DefaultButton text="Cancel" onClick={onClose} />
            </DialogFooter>
        </Dialog>
    );
};