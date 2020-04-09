import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { Issue } from 'models/Issue';
import { User } from 'models/User';
import { useStore } from 'stores';
import { Project } from 'models/Project';
import { getWorkspaceProjects } from 'services/api/projects';
import { notify } from 'react-notify-toast';
import { errorColour } from 'services/notification/colours';
import { observer } from 'services/mobx';
import { getSprints } from 'services/api/sprints';
import { Sprint } from 'models/Sprint';

interface IProps {
    issue?: Issue;
    submit: (newIssue: Issue, projectId?: number) => void;
    close: () => void;
}

const unassigned: User = {
    id: 0,
    name: 'Unassigned',
    username: 'unassigned',
    avatarUrl: null,
    projectIds: [],
};

export const CreateOrEditIssue: FunctionalComponent<IProps> = observer((props: IProps) => {
    const authStore = useStore().authStore;
    const userLocationStore = useStore().userLocationStore;
    const currentWorkspace = userLocationStore.currentWorkspace;
    const [title, setTitle] = useState(props.issue?.title || '');
    const [description, setDescription] = useState(props.issue?.description || '');
    const [storyPoint, setStoryPoint] = useState(props.issue?.storyPoint || 0);
    const [projectId, setProjectId] = useState(props.issue?.projectId || 0);
    const [projectName, setProjectName] = useState(props.issue?.projectName || '');
    const [assignee, setAssignee] = useState<User>(props.issue?.assignee || unassigned);
    const [projects, setProjects] = useState<Project[]>([]);
    const [sprints, setSprints] = useState<Sprint[]>([]);

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
        if (event.target.value === 'Unassigned') {
            setAssignee(unassigned);
        } else {
            setAssignee(currentWorkspace.users[event.target.options.selectedIndex - 1]);
        }
    };
    const validateAndSubmit = (): void => {
        if (title == '') notify.show('Please give this issue a title', 'warning', 5000);
        else if (projectId == 0) notify.show('Please attach this issue to a project', 'warning', 5000);
        else props.submit(createIssue());
    };

    useEffect(() => {
        getWorkspaceProjects(userLocationStore.currentWorkspace.id).then((result) => {
            if (typeof result === 'string') notify.show(result, 'error', 5000, errorColour);
            else setProjects(result);
        });
        getSprints(userLocationStore.currentWorkspace.id, 'active').then((result) => {
            if (typeof result === 'string') notify.show(result, 'error', 5000, errorColour);
            else setSprints(result);
        });
    }, []);

    useEffect(() => {
        unassigned.projectIds = [projectId];
    }, [projectId]);
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
            <select class="form-input" onInput={handleChange} value={assignee.name}>
                <option value="Unassigned" class="form-option">
                    Unassigned
                </option>
                {currentWorkspace.users.map((assignee) => {
                    return (
                        <option class="form-option" value={assignee.name}>
                            {assignee.name}
                        </option>
                    );
                })}
            </select>
            <div className={`${props.issue ? 'hidden' : 'block'}`}>
                <label className="form-label">Project to Attach To</label>
                <select
                    className="form-input"
                    type="number"
                    placeholder="Project to Attach To"
                    value={projectId}
                    onInput={(e): void => setProjectId(parseInt((e.target as HTMLSelectElement).value, 10))}
                >
                    {projects.map((project) => {
                        return (
                            <option className="form-option" value={project.id}>
                                {project.name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <label className="form-label">Sprint to Attach To</label>
            <select
                className="form-input"
                type="number"
                placeholder="Project to Attach To"
                value={projectId}
                onInput={(e): void => setProjectId(parseInt((e.target as HTMLSelectElement).value, 10))}
            >
                {sprints.map((sprint) => {
                    return (
                        <option className="form-option" value={sprint.id}>
                            {sprint.title}
                        </option>
                    );
                })}
            </select>
            <div className="flex justify-between pt-2">
                <button className="btn-create mb-4 ml-4" onClick={(): void => validateAndSubmit()}>
                    Confirm
                </button>
                <button className="btn-close bg-transparent mb-4 mr-4" onClick={props.close}>
                    Cancel
                </button>
            </div>
        </Fragment>
    );
});
