import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { GenericEdit } from 'components/CommonRoutes/Edit';

const WorkspaceEdit: FunctionalComponent = () => {
    const [workspaceName, setWorkspaceName] = useState('');
    const [projectsInWorkspace, setProjectsInWorkspace] = useState<string[]>([]);

    return (
        <GenericEdit
            editForm={
                <Fragment>
                    <div class="m-4">
                        <label class="form-label">Workspace Name</label>
                        <input
                            class="form-input"
                            type="text"
                            placeholder="Workspace Name"
                            value={workspaceName}
                            onInput={(e): void => setWorkspaceName((e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <div class="m-4">
                        <label class="form-label">Projects in this Workspace</label>
                        <textarea
                            class="form-input"
                            rows={5}
                            type="text"
                            placeholder="Phoenix, Narwhal, Unicorn"
                            value={projectsInWorkspace}
                            // TODO this will need to be an array of projects, maybe through a drop down? Definitely not a cowboy'd string array.
                            // onInput={(e): void => setWorkspaceName((e.target as HTMLInputElement).value)}
                        />
                    </div>
                </Fragment>
            }
        />
    );
};

export default WorkspaceEdit;
