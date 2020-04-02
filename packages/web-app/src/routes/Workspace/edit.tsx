import { FunctionalComponent, h } from 'preact';
import { notify } from 'react-notify-toast';

import { CreateOrEditWorkspace } from 'components/CreateOrEdit/workspace';
import { GenericEdit } from 'components/CommonRoutes/Edit';
import { editWorkspace } from 'services/api/workspaces';
import { Workspace } from 'models/Workspace';
import { errorColour, infoColour } from 'services/Notification/colours';
import { useStore } from 'stores';

const WorkspaceEdit: FunctionalComponent = () => {
    const currentWorkspace = useStore().userLocationStore.currentWorkspace;

    const onSubmit = (workspace: Workspace): void => {
        editWorkspace(currentWorkspace.id, workspace).then((error) => {
            if (error) notify.show(error, 'error', 5000, errorColour);
            else notify.show('Changes saved!', 'custom', 5000, infoColour);
        });
    };

    return <GenericEdit editForm={<CreateOrEditWorkspace workspace={currentWorkspace} submit={onSubmit} />} />;
};

export default WorkspaceEdit;
