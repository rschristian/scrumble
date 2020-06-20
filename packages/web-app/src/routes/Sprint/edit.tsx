import { FunctionalComponent, h } from 'preact';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from 'react-notify-toast';

import { GenericEdit } from 'components/CommonRoutes/Edit';
import { CreateOrEditSprint } from 'components/CreateOrEdit/sprint';
import { Sprint } from 'models/Sprint';
import { editSprint } from 'services/api/sprints';
import { errorColour, successColour } from 'services/notification/colours';
import { RootState } from 'stores';
import { setCurrentSprint } from 'stores/userLocationStore';

const SprintEdit: FunctionalComponent = () => {
    const dispatch = useDispatch();
    const { currentWorkspace, currentSprint } = useSelector((state: RootState) => state.userLocation);

    const onSubmit = (updatedSprint: Sprint): void => {
        editSprint(currentWorkspace.id, updatedSprint).then((result) => {
            if (typeof result === 'string') notify.show(result, 'error', 5000, errorColour);
            else {
                dispatch(setCurrentSprint(result));
                notify.show('Sprint has been updated!', 'success', 5000, successColour);
            }
        });
    };

    return <GenericEdit editForm={<CreateOrEditSprint sprint={currentSprint} submit={onSubmit} />} />;
};

export default SprintEdit;
