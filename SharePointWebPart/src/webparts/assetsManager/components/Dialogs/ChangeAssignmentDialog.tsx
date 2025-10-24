import * as React from 'react';
import {
    Dialog, DialogType, DialogFooter,
    PrimaryButton, DefaultButton, Dropdown, IDropdownOption
} from '@fluentui/react';
import { AssetService } from '../../../../services/AssetService';
import { IAsset } from '../../../../models';

export interface IChangeAssignmentDialogProps {
    asset: IAsset;
    users: IDropdownOption[];
    isOpen: boolean;
    onClose: () => void;
    assetService: AssetService;
}

export const ChangeAssignmentDialog: React.FC<IChangeAssignmentDialogProps> = ({
    asset, users, isOpen, onClose, assetService
}) => {
    const [selectedUser, setSelectedUser] = React.useState<IDropdownOption | undefined>();

    const handleSave = async () => {
        if (selectedUser) {
            console.log('assigning user', selectedUser, 'to asset', asset);
            await new Promise(resolve => setTimeout(resolve, 1000));
            // await assetService.assign(
            //     asset.id,
            //     selectedUser.key as string,
            //     selectedUser.text
            // );
            onClose();
            return;
        }
    };

    return (
        <Dialog
            hidden={!isOpen}
            onDismiss={onClose}
            dialogContentProps={{
                type: DialogType.largeHeader,
                title: `Change assignment – ${asset.assetTag}`
            }}
            modalProps={{ isBlocking: false }}
        >
            <Dropdown
                label="Select user"
                options={users}
                selectedKey={selectedUser?.key}
                onChange={(_, option) => setSelectedUser(option)}
                placeholder="Select a user..."
            />

            <DialogFooter>
                <PrimaryButton text="Save" onClick={handleSave} />
                <DefaultButton text="Cancel" onClick={onClose} />
            </DialogFooter>
        </Dialog>
    );
};