import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { Sprint, SprintStatus } from 'models/Sprint';

interface IProps {
    sprint?: Sprint;
    submit: (newSprint: Sprint) => void;
    close?: () => void;
}

export const CreateOrEditSprint: FunctionalComponent<IProps> = (props: IProps) => {
    const [title, setTitle] = useState(props.sprint?.title || '');
    const [description, setDescription] = useState(props.sprint?.description || '');
    const [startDate, setStartDate] = useState(new Date(props.sprint?.startDate) || new Date());
    const [dueDate, setDueDate] = useState(
        new Date(props.sprint?.dueDate) ||
            ((): Date => {
                const today = new Date();
                today.setDate(today.getDate() + 7);
                return today;
            }),
    );

    const createSprint = (): Sprint => {
        return {
            id: props.sprint?.id || 0,
            title,
            description,
            status: props.sprint?.status || SprintStatus.active,
            startDate: startDate.toISOString(),
            dueDate: dueDate.toISOString(),
            totalStoryPoint: props.sprint?.totalStoryPoint || 0,
            totalNumberOfIssues: props.sprint?.totalNumberOfIssues || 0,
        };
    };

    return (
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
                    value={`${startDate.getFullYear().toString()}-${zeroPad(startDate.getMonth() + 1)}-${zeroPad(
                        startDate.getDate(),
                    )}`}
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
            {!props.sprint ? (
                <div class="flex justify-between pt-2">
                    <button class="btn-create mb-4 ml-4" onClick={(): void => props.submit(createSprint())}>
                        Confirm
                    </button>
                    <button class="btn-close bg-transparent mb-4 mr-4" onClick={props.close}>
                        Cancel
                    </button>
                </div>
            ) : (
                <button class="btn-create mx-auto mb-4 ml-4" onClick={(): void => props.submit(createSprint())}>
                    Save Changes
                </button>
            )}
        </Fragment>
    );
};

const zeroPad = (value: number): string => {
    return (value < 10 ? '0' : '') + value;
};
