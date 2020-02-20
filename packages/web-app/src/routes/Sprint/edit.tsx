import { Fragment, FunctionalComponent, h } from 'preact';
import { GenericEdit } from 'components/Edit';

const SprintEdit: FunctionalComponent = () => {
    return (
        <GenericEdit
            editForm={
                <Fragment>
                    <div className="m-4">
                        <label className="form-label">Sprint Name</label>
                        <input className="form-input" type="text" placeholder="Sprint Name" value="Skyfall" />
                    </div>
                    <div className="m-4">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-input"
                            rows={5}
                            type="text"
                            placeholder="Description"
                            value="A Sprint description"
                        />
                    </div>
                    <div className="m-4">
                        <label className="form-label">Start Date</label>
                        <input className="form-input" type="date" />
                    </div>
                    <div className="m-4">
                        <label className="form-label">End Date</label>
                        <input className="form-input" type="date" />
                    </div>
                </Fragment>
            }
        />
    );
};

export default SprintEdit;
