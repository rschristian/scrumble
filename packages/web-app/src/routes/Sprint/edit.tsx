import { Fragment, FunctionalComponent, h } from 'preact';

const SprintEdit: FunctionalComponent = () => {
    return (
        <Fragment>
            <div className="create-bar">
                <h1 className="page-heading">Edit</h1>
            </div>
            <div className="form-container overflow-auto relative">
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
                <button className="btn-create mx-auto mb-4 ml-4">Save Changes</button>
            </div>
        </Fragment>
    );
};

export default SprintEdit;
