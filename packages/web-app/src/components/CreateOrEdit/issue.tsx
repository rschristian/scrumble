import { Fragment, FunctionalComponent, h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { projects } from 'data';
import { Issue } from 'models/Issue';
import { User } from 'models/User';
import { useStore } from 'stores';
import { observer } from 'services/mobx';

interface IProps {
    issue?: Issue;
    submit: (newIssue: Issue, projectId?: number) => void;
    close: () => void;
}

export const CreateOrEditIssue: FunctionalComponent<IProps> = observer((props: IProps) => {
    const authStore = useStore().authStore;
    const userLocationStore = useStore().userLocationStore;
    const currentWorkspace = userLocationStore.currentWorkspace;
    const [title, setTitle] = useState(props.issue?.title || '');
    const [description, setDescription] = useState(props.issue?.description || '');
    const [storyPoint, setStoryPoint] = useState(props.issue?.storyPoint || 0);
    const [projectId, setProjectId] = useState(props.issue?.projectId || 0);
    const [projectName, setProjectName] = useState(props.issue?.projectName || '');
    const [assignee, setAssignee] = useState<User>(props.issue?.assignee || null);

    const createIssue = (): Issue => {
        return {
            iid: props.issue?.iid || 0,
            status: props.issue?.status,
            title,
            description,
            storyPoint,
            projectId,
            projectName,
            author: props.issue?.author || authStore.currentUser,
            createdAt: new Date(),
            assignee,
        };
    };

    const handleChange = (event: any) => {
        setAssignee(currentWorkspace.users[event.target.value]);
    }
console.log(projectId);
    return (
        <Fragment>
            <label class="form-label">Title</label>
            <input
                class="form-input"
                type="text"
                placeholder="Issue Title"
                value={title}
                onInput={(e): void => setTitle((e.target as HTMLInputElement).value)}
            />
            <label class="form-label">Description</label>
            <textarea
                class="form-input"
                placeholder="Issue Description (Optional)"
                value={description}
                onInput={(e): void => setDescription((e.target as HTMLInputElement).value)}
            />
            <label class="form-label">Story Points</label>
            <input
                class="form-input"
                type="number"
                placeholder="Issue Story Points (Optional)"
                value={storyPoint}
                onInput={(e): void => setStoryPoint(parseInt((e.target as HTMLSelectElement).value, 10))}
            />
            <label class="form-label">Assignee</label>
            <select
                class="form-input"
                placeholder="Unassigned"
                onChange={handleChange}
            >
                {currentWorkspace.users.map((user, index) => {
                    return (
                        <option class="form-option" value={index}>
                            {user.name}
                        </option>
                    );
                })}
            </select>
            <label class="form-label">Project to Attach To</label>
            <select
                class="form-input"
                type="number"
                placeholder="Project to Attach To"
                value={projectId}
                onInput={(e): void => setProjectId(parseInt((e.target as HTMLSelectElement).value, 10))}
            >
                {projects.map((project) => {
                    return (
                        <option class="form-option" value={project.id}>
                            {project.name}
                        </option>
                    );
                })}
            </select>
            <div className="flex justify-between pt-2">
                <button className="btn-create mb-4 ml-4" onClick={(): void => props.submit(createIssue())}>
                    Confirm
                </button>
                <button className="btn-close bg-transparent mb-4 mr-4" onClick={props.close}>
                    Cancel
                </button>
            </div>
        </Fragment>
    );
});
