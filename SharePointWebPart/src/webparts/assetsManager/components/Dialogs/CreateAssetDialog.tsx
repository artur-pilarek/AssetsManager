import * as React from 'react';
import {
    Dialog,
    DialogFooter,
    DialogType,
    PrimaryButton,
    DefaultButton,
    TextField,
    Stack,
} from '@fluentui/react';
import { IAsset } from '../../../../models';
import { AssetService } from '../../../../services/AssetService';
import { AssetStatus } from '../../../../models/Enums';

export interface ICreateAssetDialogProps {
    isOpen: boolean;
    onClose: () => void;
    assetService: AssetService;
    onAssetChange: (asset: IAsset | number, action: 'update' | 'delete' | 'add') => void;
}

const createEmptyAsset = (): IAsset => ({
    id: 0,
    assetTag: '',
    assetType: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    status: AssetStatus.Available,
    location: '',
    notes: '',
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    assignmentHistory: [],
    issueReports: [],
});

export const CreateAssetDialog: React.FC<ICreateAssetDialogProps> = ({
    isOpen,
    onClose,
    assetService,
    onAssetChange,
}) => {

    const [form, setForm] = React.useState<IAsset>(createEmptyAsset());
    const [saving, setSaving] = React.useState(false);

    const handleChange = (
        e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
        value?: string
    ): void => {
        const { name } = e.target as HTMLInputElement;
        setForm({ ...form, [name]: value });
    };

    const handleSave = async (): Promise<void> => {
        try {
            setSaving(true);
            const created = await assetService.create(form);
            onAssetChange(created, 'add');
        } finally {
            setSaving(false);
            onClose();
        }
    };

    return (
        <Dialog
            hidden={!isOpen}
            onDismiss={onClose}
            dialogContentProps={{
                type: DialogType.largeHeader,
                title: 'Create New Asset',
            }}
            modalProps={{ isBlocking: false }}
        >
            <Stack tokens={{ childrenGap: 10 }}>
                <TextField
                    label="Asset Tag"
                    name="assetTag"
                    value={form.assetTag}
                    onChange={handleChange}
                    required
                />
                <TextField label="Type" name="assetType" value={form.assetType} onChange={handleChange} />
                <TextField
                    label="Manufacturer"
                    name="manufacturer"
                    value={form.manufacturer ?? ''}
                    onChange={handleChange}
                />
                <TextField label="Model" name="model" value={form.model ?? ''} onChange={handleChange} />
                <TextField label="Location" name="location" value={form.location ?? ''} onChange={handleChange} />
                <TextField
                    label="Notes"
                    name="notes"
                    multiline
                    rows={3}
                    value={form.notes ?? ''}
                    onChange={handleChange}
                />
            </Stack>

            <DialogFooter>
                <PrimaryButton text="Create" onClick={handleSave} disabled={saving} />
                <DefaultButton text="Cancel" onClick={onClose} />
            </DialogFooter>
        </Dialog>
    );
};