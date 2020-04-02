import { FunctionalComponent, h } from 'preact';
import { notify } from 'react-notify-toast';

import { GenericEdit } from 'components/CommonRoutes/Edit';
import { CreateOrEditSprint } from 'components/CreateOrEdit/sprint';
import { Sprint } from 'models/Sprint';
import { createSprint } from 'services/api/sprints';
import { errorColour, successColour } from 'services/notification/colours';
import { useStore } from 'stores';

const SprintEdit: FunctionalComponent = () => {
    const userLocationStore = useStore().userLocationStore;

    const onSubmit = (newSprint: Sprint): void => {
        createSprint(userLocationStore.currentWorkspace.id, newSprint).then((error) => {
            if (error) notify.show(error, 'error', 5000, errorColour);
            else notify.show('Sprint has been updated!', 'success', 5000, successColour);
        });
    };

    return <GenericEdit editForm={<CreateOrEditSprint sprint={userLocationStore.currentSprint} submit={onSubmit} />} />;
};

export default SprintEdit;
