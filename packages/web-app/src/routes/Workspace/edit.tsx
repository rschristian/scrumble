import { FunctionalComponent, h } from 'preact';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from 'react-notify-toast';

import { CreateOrEditWorkspace } from 'components/CreateOrEdit/workspace';
import { GenericEdit } from 'components/CommonRoutes/Edit';
import { Workspace } from 'models/Workspace';
import { apiUpdateWorkspace } from 'services/api/workspaces';
import { errorColour, infoColour } from 'services/notification/colours';
import { RootState } from 'stores';
import { reduxSetCurrentWorkspace } from 'stores/userLocationStore';

const WorkspaceEdit: FunctionalComponent = () => {
    const dispatch = useDispatch();
    const { currentWorkspace } = useSelector((state: RootState) => state.userLocation);

    const onSubmit = async (workspace: Workspace): Promise<void> => {
        const result = await apiUpdateWorkspace(currentWorkspace.id, workspace);
        if (typeof result === 'string') notify.show(result, 'error', 5000, errorColour);
        else {
            dispatch(reduxSetCurrentWorkspace(result));
            notify.show('Changes saved!', 'custom', 5000, infoColour);
        }
    };

    return <GenericEdit editForm={<CreateOrEditWorkspace workspace={currentWorkspace} submit={onSubmit} />} />;
};

export default WorkspaceEdit;
