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

    const createIssue = (): Sprint => {
        return {
            id: props.sprint?.id || 0,
            title,
            description,
            status: props.sprint?.status || SprintStatus.active,
            startDate,
            dueDate,
            totalStoryPoint: props.sprint?.totalStoryPoint || 0,
            totalNumberOfIssues: props.sprint?.totalNumberOfIssues || 0,
        };
    };

    return (
        <Fragment>
            <div className="m-4">
                <label className="form-label">Sprint Name</label>
                <input
                    className="form-input"
                    type="text"
                    placeholder="Sprint Name"
                    value={title}
                    onInput={(e): void => setTitle((e.target as HTMLInputElement).value)}
                />
            </div>
            <div className="m-4">
                <label className="form-label">Description</label>
                <textarea
                    className="form-input"
                    rows={5}
                    type="text"
                    placeholder="Description"
                    value={description}
                    onInput={(e): void => setDescription((e.target as HTMLInputElement).value)}
                />
            </div>
            <div className="m-4">
                <label className="form-label">Start Date</label>
                <input
                    className="form-input"
                    type="date"
                    value={`${startDate.getFullYear().toString()}-${zeroPad(startDate.getMonth() + 1)}-${zeroPad(
                        startDate.getDate(),
                    )}`}
                    onInput={(e): void => setStartDate(new Date((e.target as HTMLInputElement).value))}
                />
            </div>
            <div className="m-4">
                <label className="form-label">End Date</label>
                <input
                    className="form-input"
                    type="date"
                    value={`${dueDate.getFullYear().toString()}-${zeroPad(dueDate.getMonth() + 1)}-${zeroPad(
                        dueDate.getDate(),
                    )}`}
                    onInput={(e): void => setDueDate(new Date((e.target as HTMLInputElement).value))}
                />
            </div>
            {!props.sprint ? (
                <div className="flex justify-end pt-2">
                    <button
                        className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
                        onClick={(): void => props.submit(createIssue())}
                    >
                        Confirm
                    </button>
                    <button
                        className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
                        onClick={props.close}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <button className="btn-create mx-auto mb-4 ml-4" onClick={(): void => props.submit(createIssue())}>
                    Save Changes
                </button>
            )}
        </Fragment>
    );
};

const zeroPad = (value: number): string => {
    return (value < 10 ? '0' : '') + value;
};
