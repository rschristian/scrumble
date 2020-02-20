import { FunctionalComponent, h } from 'preact';

import Sidebar from 'components/Navigation/Sidebar';
import { sideNavItems } from 'routes/Workspaces/util';

const WorkspacesEdit: FunctionalComponent = () => {
    return (
        <div class="page">
            <div class="flex">
                <Sidebar items={sideNavItems} />
                <div class="main-content">
                    <h1 className="user-path">CUBRIC > Edit</h1>
                    <div className="create-bar">
                        <h1 className="page-heading">Edit</h1>
                    </div>
                    <div className="form-container overflow-auto relative">
                        <div className="m-4">
                            <label className="form-label">Workspace Name</label>
                            <input className="form-input" type="text" placeholder="Sprint Name" value="CUBRIC" />
                        </div>
                        <div className="m-4">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-input"
                                rows={5}
                                type="text"
                                placeholder="Description"
                                value="A Workspace description"
                            />
                        </div>
                        <button className="btn-create mx-auto mb-4 ml-4">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkspacesEdit;
