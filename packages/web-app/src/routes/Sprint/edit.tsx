import { FunctionalComponent, h } from 'preact';
import { useSelector } from 'react-redux';

import { GenericEdit } from 'components/CommonRoutes/Edit';
import { CreateOrEditSprint } from 'components/CreateOrEdit/sprint';
import { RootState } from 'stores';
import { useLtsWarning } from 'services/notification/hooks';

const SprintEdit: FunctionalComponent = () => {
    const { currentSprint } = useSelector((state: RootState) => state.userLocation);

    return <GenericEdit editForm={<CreateOrEditSprint sprint={currentSprint} submit={useLtsWarning} />} />;
};

export default SprintEdit;
