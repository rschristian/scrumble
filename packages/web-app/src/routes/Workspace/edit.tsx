import { FunctionalComponent, h } from 'preact';
import { notify } from 'react-notify-toast';

import { CreateOrEditWorkspace } from 'components/CreateOrEdit/workspace';
import { GenericEdit } from 'components/CommonRoutes/Edit';
import { editWorkspace } from 'services/api/workspaces';
import { Workspace } from 'models/Workspace';
import { errorColour, infoColour } from 'services/notification/colours';
import { useStore } from 'stores';

const WorkspaceEdit: FunctionalComponent = () => {
    const userLocationStore = useStore().userLocationStore;
    const currentWorkspace = userLocationStore.currentWorkspace;

    const onSubmit = (workspace: Workspace): void => {
        editWorkspace(currentWorkspace.id, workspace).then((result) => {
            if (typeof result == 'string') notify.show(result, 'error', 5000, errorColour);
            else {
                userLocationStore.setWorkspace(result);
                notify.show('Changes saved!', 'custom', 5000, infoColour);
            }
        });
    };

    return <GenericEdit editForm={<CreateOrEditWorkspace workspace={currentWorkspace} submit={onSubmit} />} />;
};

export default WorkspaceEdit;
