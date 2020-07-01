import { FunctionalComponent, h } from 'preact';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from 'react-notify-toast';

import CreateOrEditWorkspace from 'components/CreateOrEdit/workspace';
import GenericEdit from 'components/CommonRoutes/edit';
import { Workspace } from 'models/Workspace';
import { apiUpdateWorkspace } from 'services/api/workspaces';
import { errorColour, infoColour } from 'services/notification/colours';
import { RootState } from 'stores';
import { reduxSetCurrentWorkspace } from 'stores/userLocationStore';

const WorkspaceEdit: FunctionalComponent = () => {
    const dispatch = useDispatch();
    const { currentWorkspace } = useSelector((state: RootState) => state.userLocation);

    const onSubmit = async (workspace: Workspace): Promise<void> => {
        try {
            const result = await apiUpdateWorkspace(currentWorkspace.id, workspace);
            dispatch(reduxSetCurrentWorkspace(result));
            notify.show('Changes saved!', 'custom', 5000, infoColour);
        } catch (error) {
            notify.show(error, 'error', 5000, errorColour);
        }
    };

    return <GenericEdit editForm={<CreateOrEditWorkspace workspace={currentWorkspace} submit={onSubmit} />} />;
};

export default WorkspaceEdit;
