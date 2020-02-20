import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { GenericEdit } from 'components/Edit';

const SprintEdit: FunctionalComponent = () => {
    const [sprintName, setSprintName] = useState('');
    const [sprintDescription, setSprintDescription] = useState('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    // If there's a better way to do this I'd forever love whoever fixes this
    const [endDate, setEndDate] = useState<Date>(() => {
        const today = new Date();
        today.setDate(today.getDate() + 7);
        return today;
    });

    return (
        <GenericEdit
            editForm={
                <Fragment>
                    <div className="m-4">
                        <label className="form-label">Sprint Name</label>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Sprint Name"
                            value={sprintName}
                            onInput={(e): void => setSprintName((e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <div className="m-4">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-input"
                            rows={5}
                            type="text"
                            placeholder="Description"
                            value={sprintDescription}
                            onInput={(e): void => setSprintDescription((e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <div className="m-4">
                        <label className="form-label">Start Date</label>
                        <input
                            className="form-input"
                            type="date"
                            value={`${startDate.getFullYear().toString()}-${zeroPad(
                                startDate.getMonth() + 1,
                            )}-${zeroPad(startDate.getDate())}`}
                            onInput={(e): void => setStartDate(new Date((e.target as HTMLInputElement).value))}
                        />
                    </div>
                    <div className="m-4">
                        <label className="form-label">End Date</label>
                        <input
                            className="form-input"
                            type="date"
                            value={`${endDate.getFullYear().toString()}-${zeroPad(endDate.getMonth() + 1)}-${zeroPad(
                                endDate.getDate(),
                            )}`}
                            onInput={(e): void => setEndDate(new Date((e.target as HTMLInputElement).value))}
                        />
                    </div>
                </Fragment>
            }
        />
    );
};

const zeroPad = (value: number): string => {
    return (value < 10 ? '0' : '') + value;
};

export default SprintEdit;
