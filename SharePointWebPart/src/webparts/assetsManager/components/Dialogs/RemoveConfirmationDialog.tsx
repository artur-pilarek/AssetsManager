import {
    Dialog, DialogType, DialogFooter,
    PrimaryButton, DefaultButton
} from '@fluentui/react';
import * as React from 'react';
import { IAsset } from '../../../../models';

interface IRemoveConfirmationDialogProps {
    asset: {
        id: number;
        assetTag: string;
    };
    isOpen: boolean;
    onClose: () => void;
    assetService: any;
    onAssetChange: (asset: IAsset | number, action: 'update' | 'delete') => void;
}


export const RemoveConfirmationDialog: React.FC<IRemoveConfirmationDialogProps> = ({
    asset,
    isOpen,
    onClose,
    assetService,
    onAssetChange
}) => {
    const handleRemove = async () => {
        await assetService.delete(asset.id);
        onAssetChange(asset.id, 'delete');
        onClose();
        return;
    }
    return (
        <Dialog
            hidden={!isOpen}
            onDismiss={onClose}
            dialogContentProps={{
                type: DialogType.largeHeader,
                title: `Remove Asset – ${asset.assetTag}`,
                subText: `Are you sure you want to remove asset ${asset.assetTag}? This action cannot be undone.`
            }}
            modalProps={{ isBlocking: false }}
        >
            <DialogFooter>
                <PrimaryButton text="Remove" onClick={handleRemove} styles={{ root: { backgroundColor: '#D83B01' } }} />
                <DefaultButton text="Cancel" onClick={onClose} />
            </DialogFooter>
        </Dialog>
    );
}