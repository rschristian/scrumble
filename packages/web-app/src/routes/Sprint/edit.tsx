import { FunctionalComponent, h } from 'preact';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from 'react-notify-toast';

import { GenericEdit } from 'components/CommonRoutes/Edit';
import { CreateOrEditSprint } from 'components/CreateOrEdit/sprint';
import { isSprint, Sprint } from 'models/Sprint';
import { apiUpdateSprint } from 'services/api/sprints';
import { errorColour, successColour } from 'services/notification/colours';
import { RootState } from 'stores';
import { reduxSetCurrentSprint } from 'stores/userLocationStore';

const SprintEdit: FunctionalComponent = () => {
    const dispatch = useDispatch();
    const { currentWorkspace, currentSprint } = useSelector((state: RootState) => state.userLocation);

    const onSubmit = async (updatedSprint: Sprint): Promise<void> => {
        const result = await apiUpdateSprint(currentWorkspace.id, updatedSprint);
        if (isSprint(result)) {
            dispatch(reduxSetCurrentSprint(result));
            notify.show('Sprint has been updated!', 'success', 5000, successColour);
        } else {
            notify.show(result, 'error', 5000, errorColour);
        }
    };

    return <GenericEdit editForm={<CreateOrEditSprint sprint={currentSprint} submit={onSubmit} />} />;
};

export default SprintEdit;
