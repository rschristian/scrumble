import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { GenericEdit } from 'components/CommonRoutes/Edit';
import { Sprint } from 'models/Sprint';
import { editSprint } from 'services/api/sprints';
import { useStore } from 'stores';

const SprintEdit: FunctionalComponent = () => {
    const userLocationStore = useStore().userLocationStore;
    const currentSprint: Sprint = userLocationStore.currentSprint;

    const [title, setTitle] = useState(currentSprint.title);
    const [description, setDescription] = useState(currentSprint.description);
    const [startDate, setStartDate] = useState(new Date(currentSprint.startDate));
    const [dueDate, setDueDate] = useState(new Date(currentSprint.dueDate));

    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = (): void => {
        editSprint(userLocationStore.currentWorkspace.id, 1, currentSprint.id, {
            id: currentSprint.id,
            iid: currentSprint.iid,
            projectId: currentSprint.projectId,
            title,
            description,
            status: currentSprint.status,
            startDate,
            dueDate,
            totalStoryPoint: currentSprint.totalStoryPoint,
            totalNumberOfIssues: currentSprint.totalNumberOfIssues,
        }).then((error) => {
            if (error) setErrorMessage(error);
            else console.log('Success');
        });
    };

    return (
        <GenericEdit
            editForm={
                <Fragment>
                    <div class="m-4">
                        <label class="form-label">Sprint Name</label>
                        <input
                            class="form-input"
                            type="text"
                            placeholder="Sprint Name"
                            value={title}
                            onInput={(e): void => setTitle((e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <div class="m-4">
                        <label class="form-label">Description</label>
                        <textarea
                            class="form-input"
                            rows={5}
                            type="text"
                            placeholder="Description"
                            value={description}
                            onInput={(e): void => setDescription((e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <div class="m-4">
                        <label class="form-label">Start Date</label>
                        <input
                            class="form-input"
                            type="date"
                            value={`${startDate.getFullYear().toString()}-${zeroPad(
                                startDate.getMonth() + 1,
                            )}-${zeroPad(startDate.getDate())}`}
                            onInput={(e): void => setStartDate(new Date((e.target as HTMLInputElement).value))}
                        />
                    </div>
                    <div class="m-4">
                        <label class="form-label">End Date</label>
                        <input
                            class="form-input"
                            type="date"
                            value={`${dueDate.getFullYear().toString()}-${zeroPad(dueDate.getMonth() + 1)}-${zeroPad(
                                dueDate.getDate(),
                            )}`}
                            onInput={(e): void => setDueDate(new Date((e.target as HTMLInputElement).value))}
                        />
                    </div>
                    <div class="error">{errorMessage}</div>
                </Fragment>
            }
            onSubmit={onSubmit}
        />
    );
};

const zeroPad = (value: number): string => {
    return (value < 10 ? '0' : '') + value;
};

export default SprintEdit;
