import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { notify } from 'react-notify-toast';
import { useSelector } from 'react-redux';

import { Issue } from 'models/Issue';
import { User } from 'models/User';
import { Project } from 'models/Project';
import { Sprint, SprintStatus } from 'models/Sprint';
import { apiFetchWorkspaceProjects } from 'services/api/projects';
import { apiFetchSprints } from 'services/api/sprints';
import { errorColour } from 'services/notification/colours';
import { useLtsWarning } from 'services/notification/hooks';
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
        description: '',
    };
};

const CreateOrEditIssue: FunctionalComponent<IProps> = (props: IProps) => {
    const { currentWorkspace } = useSelector((state: RootState) => state.userLocation);

    const [title, setTitle] = useState(props.issue?.title || '');
    const [description, setDescription] = useState(props.issue?.description || '');
    const [storyPoint, setStoryPoint] = useState(props.issue?.storyPoint || 0);
    const [project, setProject] = useState<Project>(props.issue?.project || emptyProject);
    const [assignee, setAssignee] = useState<User>(props.issue?.assignee || unassigned);
    const [sprint, setSprint] = useState<Sprint>(props.issue?.sprint || emptySprint);
    const [projects, setProjects] = useState<Project[]>([]);
    const [sprints, setSprints] = useState<Sprint[]>([]);

    useEffect(() => {
        apiFetchWorkspaceProjects(currentWorkspace.id).then((result) => {
            if (typeof result === 'string') notify.show(result, 'error', 5000, errorColour);
            else setProjects(result);
        });
        apiFetchSprints(currentWorkspace.id, 'active').then((result) => {
            if (typeof result === 'string') notify.show(result, 'error', 5000, errorColour);
            else {
                result.unshift(emptySprint());
                setSprints(result);
            }
        });
    }, [currentWorkspace.id]);

    useEffect(() => {
        unassigned.projectIds = [project.id];
    }, [project.id]);

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
            <select class="form-input" onInput={useLtsWarning} value={assignee.name}>
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
                    value={project.name}
                    onInput={useLtsWarning}
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
                onInput={useLtsWarning}
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
                <button className="btn-create mb-4 ml-4" onClick={useLtsWarning}>
                    Confirm
                </button>
                <button className="btn-close bg-transparent mb-4 mr-4" onClick={props.close}>
                    Cancel
                </button>
            </div>
        </Fragment>
    );
};

export default CreateOrEditIssue;
