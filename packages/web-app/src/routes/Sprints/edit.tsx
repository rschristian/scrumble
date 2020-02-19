import { FunctionalComponent, h } from 'preact';

import Sidebar from 'components/Navigation/Sidebar';
import { sideNavItems } from 'routes/Sprints/util';

const SprintEdit: FunctionalComponent = () => {
    return (
        <div className="w-screen block">
            <div className="flex">
                <Sidebar items={sideNavItems} />
                <div className="main-content">
                    <h1 className="user-path">CUBRIC > Sprints > Skyfall > Edit</h1>
                    <div className="create-bar">
                        <h1 className="page-heading">Edit</h1>
                    </div>
                    <div class="form-container overflow-auto relative">
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
                        <button class="btn-create mx-auto mb-4 ml-4">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SprintEdit;
