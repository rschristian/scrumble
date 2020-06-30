import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useSelector } from 'react-redux';
import { notify } from 'react-notify-toast';

import { Issue, IssueStatus } from 'models/Issue';
import { Project } from 'models/Project';
import { Sprint, SprintStatus } from 'models/Sprint';
import { User } from 'models/User';
import { apiFetchWorkspaceProjects } from 'services/api/projects';
import { apiFetchSprints } from 'services/api/sprints';
import { errorColour } from 'services/notification/colours';
import { RootState } from 'stores';

interface IProps {
    issue?: Issue;
    submit: (newIssue: Issue, projectId?: number) => void;
    close: () => void;
}

const unassigned: User = {
    id: 0,
    name: 'Unassigned',
    username: 'unassigned',
    avatarUrl: '',
    projectIds: [],
};

const emptySprint = (): Sprint => {
    return {
        id: -1,
        title: '',
        description: '',
        status: SprintStatus.active,
        // TODO Reevaluate this
        projectIdToMilestoneIds: {},
    };
};

const emptyProject = (): Project => {
    return {
        id: 0,
        name: 'Unassigned',
        description: '',
    };
};

const CreateOrEditIssue: FunctionalComponent<IProps> = (props: IProps) => {
    const { currentUser } = useSelector((state: RootState) => state.auth);
    const { currentWorkspace } = useSelector((state: RootState) => state.userLocation);

    const [title, setTitle] = useState(props.issue?.title || '');
    const [description, setDescription] = useState(props.issue?.description || '');
    const [storyPoint, setStoryPoint] = useState(props.issue?.storyPoint || 0);
    const [project, setProject] = useState<Project>(props.issue?.project || emptyProject);
    const [assignee, setAssignee] = useState<User>(props.issue?.assignee || unassigned);
    const [sprint, setSprint] = useState<Sprint>(props.issue?.sprint || emptySprint);
    const [projects, setProjects] = useState<Project[]>([]);
    const [sprints, setSprints] = useState<Sprint[]>([]);

    const createIssue = (): Issue => {
        return {
            iid: props.issue?.iid || 0,
            title,
            description,
            status: props.issue?.status || IssueStatus.open,
            author: props.issue?.author || currentUser,
            assignee,
            createdAt: new Date(),
            storyPoint,
            project,
            sprint,
        };
    };

    const handleAssigneeChange = (event: any): void => {
        event.target.value === 'Unassigned'
            ? setAssignee(unassigned)
            : setAssignee(currentWorkspace.users[event.target.options.selectedIndex - 1]);
    };

    const handleProjectChange = (projectName: string): void => {
        const project = projects.find((p) => p.name === projectName);
        if (project) {
            setProject(project);
        }
    };

    const handleSprintChange = (sprintTitle: string): void => {
        const sprint = sprints.find((sprint) => sprint.title === sprintTitle);
        if (sprint) {
            setSprint(sprint);
        }
    };

    const validateAndSubmit = (): void => {
        if (title === emptySprint().title) notify.show('Please give this issue a title', 'warning', 5000);
        else if (project.id === 0) notify.show('Please attach this issue to a project', 'warning', 5000);
        else props.submit(createIssue());
    };

    useEffect(() => {
        async function getWorkspaceProjectsAndSprints(): Promise<void> {
            const workspaceProjectsResult = await apiFetchWorkspaceProjects(currentWorkspace.id);
            typeof workspaceProjectsResult === 'string'
                ? notify.show(workspaceProjectsResult, 'error', 5000, errorColour)
                : setProjects(workspaceProjectsResult);

            const sprintResult = await apiFetchSprints(currentWorkspace.id, 'active');
            if (typeof sprintResult === 'string') notify.show(sprintResult, 'error', 5000, errorColour);
            else {
                sprintResult.unshift(emptySprint());
                setSprints(sprintResult);
            }
        }
        getWorkspaceProjectsAndSprints();
    }, [currentWorkspace.id]);

    useEffect(() => {
        unassigned.projectIds = [project.id];
    }, [project]);

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
            <select class="form-input" onInput={handleAssigneeChange} value={assignee.name}>
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
            <div class={`${props.issue ? 'hidden' : 'block'}`}>
                <label class="form-label">Project to Attach To</label>
                <select
                    class="form-input"
                    placeholder="Project to Attach To"
                    value={project.name}
                    onInput={(e): void => handleProjectChange((e.target as HTMLSelectElement).value)}
                >
                    {projects.map((project) => {
                        return (
                            <option class="form-option" value={project.name}>
                                {project.name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <label class="form-label">Sprint to Attach To</label>
            <select
                class="form-input"
                placeholder="Project to Attach To"
                value={sprint.title}
                onInput={(e): void => handleSprintChange((e.target as HTMLSelectElement).value)}
            >
                {sprints.map((sprint) => {
                    return (
                        <option class="form-option" value={sprint.title}>
                            {sprint.title}
                        </option>
                    );
                })}
            </select>
            <div class="flex justify-between pt-2">
                <button class="btn-create mb-4 ml-4" onClick={(): void => validateAndSubmit()}>
                    Confirm
                </button>
                <button class="btn-close bg-transparent mb-4 mr-4" onClick={props.close}>
                    Cancel
                </button>
            </div>
        </Fragment>
    );
};

export default CreateOrEditIssue;
