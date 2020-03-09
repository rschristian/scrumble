import { Fragment, FunctionalComponent, h, ComponentChild } from 'preact';
import { useState } from 'preact/hooks';
import { projects, storyPoints } from 'data';
import { Issue } from 'models/Issue';

interface IProps {
    issue: Issue;
    store: any;
    close: () => void;
}

const EditIssue: FunctionalComponent<IProps> = (props: IProps) => {
    const [Title, setTitle] = useState<string>(props.issue.name);
    const [Descirption, setDescription] = useState<string>(props.issue.description);
    const [IssueStoryPoint, setIssueStoryPoint] = useState<number | string>(props.issue.storyPoint);
    const [SelectedProject, setSelectedProject] = useState<string>(props.issue.project);

    const handleSubmit = (): void => {
        const issue = {
            name: Title,
            description: Descirption,
            storyPoint: IssueStoryPoint,
            project: SelectedProject,
        };
        props.store.editIssue(props.issue.index, issue);
        props.close();
    };
    const handleCancel = (): void => {
        props.close();
    };
    return (
        <Fragment>
            <form class="bg-grey rounded px-8 pt-6 pb-8 mb-4">
                <label class="form-label"> Title </label>
                <input
                    class="form-input"
                    type="text"
                    id="title"
                    value={Title}
                    onChange={(e): void => setTitle((e.target as HTMLInputElement).value)}
                />
                <label class="form-label"> Description </label>
                <textarea
                    class="form-input"
                    type="text"
                    id="description"
                    value={Descirption}
                    onChange={(e): void => setDescription((e.target as HTMLTextAreaElement).value)}
                />
                <label class="form-label"> Story Points </label>
                <select
                    class="form-input"
                    id="StoryPoints"
                    value={IssueStoryPoint}
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
                    value={SelectedProject}
                    onChange={(e): void => setSelectedProject((e.target as HTMLSelectElement).value)}
                >
                    {projects.map(
                        (project): ComponentChild => {
                            return (
                                <option class="form-option" value={project.name}>
                                    {' '}
                                    {project.name}
                                </option>
                            );
                        },
                    )}
                </select>
                <input className="btn-create my-auto" type="submit" value="Submit" onClick={handleSubmit} />
                <button className="btn-delete my-auto" onClick={handleCancel}>
                    {' '}
                    Cancel{' '}
                </button>
            </form>
        </Fragment>
    );
};
export default EditIssue;
