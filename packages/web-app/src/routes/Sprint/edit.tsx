import { FunctionalComponent, h } from 'preact';
import { notify } from 'react-notify-toast';

import { GenericEdit } from 'components/CommonRoutes/Edit';
import { CreateOrEditSprint } from 'components/CreateOrEdit/sprint';
import { Sprint } from 'models/Sprint';
import { editSprint } from 'services/api/sprints';
import { errorColour, successColour } from 'services/notification/colours';
import { useStore } from 'stores';

const SprintEdit: FunctionalComponent = () => {
    const userLocationStore = useStore().userLocationStore;

    const onSubmit = (updatedSprint: Sprint): void => {
        editSprint(userLocationStore.currentWorkspace.id, updatedSprint).then((result) => {
            if (typeof result === 'string') notify.show(result, 'error', 5000, errorColour);
            else {
                userLocationStore.setSprint(result);
                notify.show('Sprint has been updated!', 'success', 5000, successColour);
            }
        });
    };

    return <GenericEdit editForm={<CreateOrEditSprint sprint={userLocationStore.currentSprint} submit={onSubmit} />} />;
};

export default SprintEdit;
