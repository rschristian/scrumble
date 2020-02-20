import { Fragment, FunctionalComponent, h } from 'preact';

import { GenericEdit } from 'components/Edit';

const WorkspaceEdit: FunctionalComponent = () => {
    return (
        <GenericEdit
            editForm={
                <Fragment>
                    <div className="m-4">
                        <label className="form-label">Workspace Name</label>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Workspace Name"
                            value="UI"
                        />
                    </div>
                    <div className="m-4">
                        <label className="form-label">Projects in this Workspace</label>
                        <textarea
                            className="form-input"
                            rows={5}
                            type="text"
                            placeholder="Phoenix, Narwhal, Unicorn"
                            value="Phoenix, Narwhal, Unicorn"
                        />
                    </div>
                </Fragment>
            }
        />
    );
};

export default WorkspaceEdit;
