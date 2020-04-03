import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { projects } from 'data';
import { Issue } from 'models/Issue';

interface IProps {
    issue?: Issue;
    submit: (newIssue: Issue, projectId?: number) => void;
    close: () => void;
}

export const CreateOrEditIssue: FunctionalComponent<IProps> = (props: IProps) => {
    const [title, setTitle] = useState(props.issue?.title || '');
    const [description, setDescription] = useState(props.issue?.description || '');
    const [storyPoint, setStoryPoint] = useState(props.issue?.storyPoint || 0);
    const [projectId, setProjectId] = useState(props.issue?.projectId || 0);
    const [projectName, setProjectName] = useState(props.issue?.projectName);

    const createIssue = (): Issue => {
        return {
            iid: props.issue?.iid || 0,
            status: props.issue?.status,
            title,
            description,
            storyPoint,
            projectId,
            projectName,
        };
    };

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
            <div class="flex justify-end pt-2">
                <button
                    class="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
                    onClick={(): void => props.submit(createIssue(), projectId)}
                >
                    Confirm
                </button>
                <button
                    class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
                    onClick={props.close}
                >
                    Cancel
                </button>
            </div>
        </Fragment>
    );
};
