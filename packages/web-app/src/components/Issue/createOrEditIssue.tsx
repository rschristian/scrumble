import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { projects } from 'data';
import { Issue } from 'models/Issue';

interface IProps {
    issue?: Issue;
    submit?: (newIssue: Issue, projectId?: number) => void;
    edit?: (editIssue: Issue, projectId?: number) => void;
    close: () => void;
    error: string;
}

export const CreateOrEditIssue: FunctionalComponent<IProps> = (props: IProps) => {
    const [title, setTitle] = useState<string>(props.issue?.title || '');
    const [description, setDescription] = useState<string>(props.issue?.description || '');
    const [storyPoints, setStoryPoints] = useState<number[]>(props.issue?.storyPoints);
    const [projectId, setProjectId] = useState<number>(props.issue?.projectId || 0);
    const createIssue = (): Issue => {
        return {
            iid: props.issue?.iid || 0,
            title,
            description,
            storyPoints,
            projectId,
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
                type="text"
                placeholder="Issue Description (Optional)"
                value={description}
                onInput={(e): void => setDescription((e.target as HTMLInputElement).value)}
            />
            <label class="form-label">Story Points</label>
            <input
                class="form-input"
                type="number"
                placeholder="Issue Story Points (Optional)"
                value={storyPoints[0]}
                onInput={(e): void => setStoryPoints(() => [parseInt((e.target as HTMLSelectElement).value, 10)])}
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
            <div className="flex justify-end pt-2">
                {props.submit ? (
                    <button
                        className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
                        onClick={(): void => props.submit(createIssue(), projectId)}
                    >
                        Create new issue
                    </button>
                ) : (
                    <button
                        className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
                        onClick={(): void => props.edit(createIssue())}
                    >
                        Edit Issue
                    </button>
                )}
                <button
                    className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
                    onClick={props.close}
                >
                    Cancel
                </button>
            </div>
            <div className="error">{props.error}</div>
        </Fragment>
    );
};
