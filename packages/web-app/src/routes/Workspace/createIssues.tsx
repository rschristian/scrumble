import { Fragment, FunctionalComponent, h, ComponentChild } from 'preact';
import { useState } from 'preact/hooks';
import { projects, storyPoints } from 'data';

interface IProps {
    close: () => void;
    addNewIssue: (issue: any) => void;
}

const NewIssue: FunctionalComponent<IProps> = (props: IProps) => {
    const [Title, setTitle] = useState('');
    const [Descirption, setDescription] = useState('');
    const [IssueStoryPoint, setIssueStoryPoint] = useState(null);
    const [SelectedProject, setSelectedProject] = useState('');

    // currently being used for debugging
    const handleSubmit = (): void => {
        alert('New Issue Created !');
        props.addNewIssue({
            name: Title,
            description: Descirption,
            storyPoint: IssueStoryPoint,
            project: SelectedProject,
        });
        props.close();
    };

    const handleCancel = (evt: any): void => {
        evt.preventDefault();
        props.close();
    };

    const handleValidation = (evt: any): void => {
        evt.preventDefault();
        if (Title.length === 0) {
            alert('A Title is required');
            return;
        }
        if (Descirption.length === 0) {
            alert('A Description is needed');
            return;
        }
        if (IssueStoryPoint === null) {
            alert('A Story Point is needed');
            return;
        }
        if (SelectedProject.length === 0) {
            alert('A Project is needed');
            return;
        }
        handleSubmit();
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
                <input className="btn-create my-auto" type="submit" value="Submit" onClick={handleValidation} />
                <button className="btn-delete my-auto" onClick={handleCancel}>
                    {' '}
                    Cancel{' '}
                </button>
            </form>
        </Fragment>
    );
};

export default NewIssue;
