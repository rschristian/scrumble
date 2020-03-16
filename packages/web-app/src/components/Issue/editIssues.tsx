import { Fragment, FunctionalComponent, h, ComponentChild } from 'preact';
import { useState } from 'preact/hooks';
import { projects, storyPoints } from 'data';
import { Issue } from 'models/Issue';

interface IProps {
    issue: Issue;
    index: number;
    editIssue: (index: number, issue: any) => void;
    close: () => void;
}

const EditIssue: FunctionalComponent<IProps> = (props: IProps) => {
    const [title, setTitle] = useState<string>(props.issue.title);
    const [description, setDescription] = useState<string>(props.issue.description);
    const [issueStoryPoint, setIssueStoryPoint] = useState<number | string>(props.issue.storyPoints);
    const [selectedProject, setSelectedProject] = useState(props.issue.projectId);

    const handleSubmit = (): void => {
        const issue = {
            name: title,
            description,
            storyPoint: issueStoryPoint,
            project: selectedProject,
        };
        props.editIssue(props.index, issue);
        props.close();
    };
    const handleCancel = (): void => {
        props.close();
    };
    return (
        <Fragment>
            <div class="bg-grey rounded px-8 pt-6 pb-8 mb-4">
                <label class="form-label"> title </label>
                <input
                    class="form-input"
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e): void => setTitle((e.target as HTMLInputElement).value)}
                />
                <label class="form-label"> Description </label>
                <textarea
                    class="form-input"
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e): void => setDescription((e.target as HTMLTextAreaElement).value)}
                />
                <label class="form-label"> Story Points </label>
                <select
                    class="form-input"
                    id="StoryPoints"
                    value={issueStoryPoint}
                    onChange={(e): void => setIssueStoryPoint((e.target as HTMLSelectElement).value)}
                >
                    {storyPoints.map(
                        (storyPoint): ComponentChild => {
                            return (
                                <option class="form-option" value={storyPoint}>
                                    {storyPoint}
                                </option>
                            );
                        },
                    )}
                </select>
                <label class="form-label"> Project </label>
                <select
                    class="form-input"
                    id="Project"
                    value={selectedProject}
                    onChange={(e): void => setSelectedProject((e.target as HTMLSelectElement).value)}
                >
                    {projects.map(
                        (project): ComponentChild => {
                            return (
                                <option class="form-option" value={project.name}>
                                    {project.name}
                                </option>
                            );
                        },
                    )}
                </select>
                <button class="btn-create my-auto" onClick={handleSubmit}>
                    Submit
                </button>
                <button class="btn-delete my-auto" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </Fragment>
    );
};
export default EditIssue;
