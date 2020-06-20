import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { notify } from 'react-notify-toast';

import { Issue } from 'models/Issue';
import { User } from 'models/User';
import { Project } from 'models/Project';
import { getWorkspaceProjects } from 'services/api/projects';

import { errorColour } from 'services/notification/colours';
import { getSprints } from 'services/api/sprints';
import { Sprint, SprintStatus } from 'models/Sprint';
import { RootState } from 'stores';
import { useSelector } from 'react-redux';

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

const emptySprint = (): Sprint => {
    return {
        id: 0,
        title: 'No sprint',
        status: SprintStatus.active,
        projectIdToMilestoneIds: {},
    };
};

const emptyProject = (): Project => {
    return {
        id: 0,
        name: 'Unassigned',
    };
};

export const CreateOrEditIssue: FunctionalComponent<IProps> = (props: IProps) => {
    const { currentUser } = useSelector((state: RootState) => state.auth);
    const { currentWorkspace } = useSelector((state: RootState) => state.userLocation);

    const [title, setTitle] = useState(props.issue?.title || '');
    const [description, setDescription] = useState(props.issue?.description || '');
    const [storyPoint, setStoryPoint] = useState(props.issue?.storyPoint || 0);
    const [projectId, setProjectId] = useState(props.issue?.projectId || 0);
    const [projectName, setProjectName] = useState(props.issue?.projectName || emptyProject().name);
    const [assignee, setAssignee] = useState<User>(props.issue?.assignee || unassigned);
    const [sprint, setSprint] = useState<Sprint>(props.issue?.sprint || emptySprint);
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
            sprint,
            author: props.issue?.author || currentUser,
            createdAt: new Date(),
            assignee,
        };
    };

    const handleAssigneeChange = (event: any): void => {
        if (event.target.value === 'Unassigned') {
            setAssignee(unassigned);
        } else {
            setAssignee(currentWorkspace.users[event.target.options.selectedIndex - 1]);
        }
    };

    const handleProjectChange = (projectName: string): void => {
        const project = projects.find((p) => p.name === projectName);
        setProjectId(project.id);
        setProjectName(project.name);
    };

    const handleSprintChange = (sprintTitle: string): void => {
        setSprint(sprints.find((sprint) => sprint.title === sprintTitle));
    };

    const validateAndSubmit = (): void => {
        if (title == emptySprint().title) notify.show('Please give this issue a title', 'warning', 5000);
        else if (projectId == 0) notify.show('Please attach this issue to a project', 'warning', 5000);
        else props.submit(createIssue());
    };

    useEffect(() => {
        getWorkspaceProjects(currentWorkspace.id).then((result) => {
            if (typeof result === 'string') notify.show(result, 'error', 5000, errorColour);
            else setProjects(result);
        });
        getSprints(currentWorkspace.id, 'active').then((result) => {
            if (typeof result === 'string') notify.show(result, 'error', 5000, errorColour);
            else {
                result.unshift(emptySprint());
                setSprints(result);
            }
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
            <div className={`${props.issue ? 'hidden' : 'block'}`}>
                <label className="form-label">Project to Attach To</label>
                <select
                    className="form-input"
                    placeholder="Project to Attach To"
                    value={projectName}
                    onInput={(e): void => handleProjectChange((e.target as HTMLSelectElement).value)}
                >
                    {projects.map((project) => {
                        return (
                            <option className="form-option" value={project.name}>
                                {project.name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <label className="form-label">Sprint to Attach To</label>
            <select
                className="form-input"
                placeholder="Project to Attach To"
                value={sprint.title}
                onInput={(e): void => handleSprintChange((e.target as HTMLSelectElement).value)}
            >
                {sprints.map((sprint) => {
                    return (
                        <option className="form-option" value={sprint.title}>
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
};
