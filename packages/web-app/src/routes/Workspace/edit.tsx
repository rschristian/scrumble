import { FunctionalComponent, h } from 'preact';
import { useSelector } from 'react-redux';

import { CreateOrEditWorkspace } from 'components/CreateOrEdit/workspace';
import GenericEdit from 'components/CommonRoutes/edit';
import { RootState } from 'stores';
import { useLtsWarning } from 'services/notification/hooks';

const WorkspaceEdit: FunctionalComponent = () => {
    const { currentWorkspace } = useSelector((state: RootState) => state.userLocation);

    return <GenericEdit editForm={<CreateOrEditWorkspace workspace={currentWorkspace} submit={useLtsWarning} />} />;
};

export default WorkspaceEdit;
