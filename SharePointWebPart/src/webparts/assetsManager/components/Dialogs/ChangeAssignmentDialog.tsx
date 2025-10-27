import * as React from 'react';
import {
    Dialog, DialogType, DialogFooter,
    PrimaryButton, DefaultButton, Dropdown, IDropdownOption, TextField
} from '@fluentui/react';
import { AssetService } from '../../../../services/AssetService';
import { IAsset } from '../../../../models';
import { MSGraphClientV3 } from '@microsoft/sp-http'
import { MSGraphClientFactory } from '@microsoft/sp-http';

export interface IChangeAssignmentDialogProps {
    asset: IAsset;
    isOpen: boolean;
    onClose: () => void;
    assetService: AssetService;
    graphClientFactory: MSGraphClientFactory;
    onAssetChange?: (asset: IAsset | number, action: 'update' | 'delete' | 'add') => void;
}

interface IUser {
    id: string;
    displayName: string;
    mail: string;
};

export const ChangeAssignmentDialog: React.FC<IChangeAssignmentDialogProps> = ({
    asset, isOpen, onClose, assetService, graphClientFactory, onAssetChange
}) => {
    const [selectedUser, setSelectedUser] = React.useState<IDropdownOption<IUser> | undefined>();
    const [users, setUsers] = React.useState<IDropdownOption[]>([]);
    const [assignmentNote, setAssignmentNote] = React.useState<string>('');

    React.useEffect(() => {
        const fetchUsers = async () => {
            const members = await getUsers();
            const options = members.value.map((member: any) => ({
                key: member.id,
                text: member.displayName,
                data: { mail: member.mail }
            }));
            setUsers(options);
        }
        fetchUsers();
    }, []);

    const getUsers = async (): Promise<any> => {
        let graphClient: MSGraphClientV3 = (await graphClientFactory.getClient("3"));
        try {
            graphClient = await graphClientFactory.getClient("3");
            return await graphClient.api("/users?$select=id,displayName,mail").get();
        } catch (err) {
            console.error("Error fetching users: ", err);
        }
        return [];
    }

    const handleSave = async (forceSave: boolean = false) => {
        if (selectedUser || forceSave) {
            console.log('assigning user', selectedUser, 'to asset', asset);
            await assetService.changeAssignment(asset.id, selectedUser?.data?.mail ?? '', selectedUser?.text ?? '', assignmentNote);
            onAssetChange?.({
                ...asset,
                currentOwnerName: selectedUser?.text,
                currentOwnerEmail: selectedUser?.data?.mail
            }, 'update');
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
            <TextField
                label="Assignment Note"
                multiline
                rows={4}
                value={assignmentNote}
                onChange={(_, value) => setAssignmentNote(value || '')}
            />

            <DialogFooter>
                <PrimaryButton text="Save" onClick={() => handleSave()} />
                <DefaultButton text="Unassign" onClick={() => handleSave(true)} />
                <DefaultButton text="Cancel" onClick={onClose} />
            </DialogFooter>
        </Dialog>
    );
};