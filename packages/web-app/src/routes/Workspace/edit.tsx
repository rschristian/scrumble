import { FunctionalComponent, h } from 'preact';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from 'react-notify-toast';

import { CreateOrEditWorkspace } from 'components/CreateOrEdit/workspace';
import { GenericEdit } from 'components/CommonRoutes/Edit';
import { editWorkspace } from 'services/api/workspaces';
import { Workspace } from 'models/Workspace';
import { errorColour, infoColour } from 'services/notification/colours';
import { RootState } from 'stores';
import { setCurrentWorkspace } from 'stores/userLocationStore';

const WorkspaceEdit: FunctionalComponent = () => {
    const dispatch = useDispatch();
    const { currentWorkspace } = useSelector((state: RootState) => state.userLocation);

    const onSubmit = (workspace: Workspace): void => {
        editWorkspace(currentWorkspace.id, workspace).then((result) => {
            if (typeof result == 'string') notify.show(result, 'error', 5000, errorColour);
            else {
                dispatch(setCurrentWorkspace(result));
                notify.show('Changes saved!', 'custom', 5000, infoColour);
            }
        });
    };

    return <GenericEdit editForm={<CreateOrEditWorkspace workspace={currentWorkspace} submit={onSubmit} />} />;
};

export default WorkspaceEdit;
