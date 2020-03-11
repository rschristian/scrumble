import { Fragment, FunctionalComponent, h, ComponentChild } from 'preact';
import { useState } from 'preact/hooks';
import { projects, storyPoints } from 'data';

interface IProps {
    close: () => void;
    addNewIssue: (issue: any) => void;
}

const NewIssue: FunctionalComponent<IProps> = (props: IProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [issueStoryPoint, setIssueStoryPoint] = useState<string>(null);
    const [selectedProject, setSelectedProject] = useState('');

    // currently being used for debugging
    const handleSubmit = (): void => {
        props.addNewIssue({
            name: title,
            description,
            storyPoint: issueStoryPoint,
            project: selectedProject,
        });
        props.close();
    };

    const handleCancel = (): void => {
        props.close();
    };

    const handleValidation = (): void => {
        if (title.length === 0) {
            alert('A title is required');
            return;
        }
        if (description.length === 0) {
            alert('A Description is needed');
            return;
        }
        if (issueStoryPoint === null) {
            alert('A Story Point is needed');
            return;
        }
        if (selectedProject.length === 0) {
            alert('A Project is needed');
            return;
        }
        handleSubmit();
    };
    return (
        <Fragment>
            <div class="bg-grey rounded px-8 pt-6 pb-8 mb-4">
                <label class="form-label"> Title </label>
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
                <button class="btn-create my-auto" onClick={handleValidation}>
                    Submit
                </button>
                <button class="btn-delete my-auto" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </Fragment>
    );
};

export default NewIssue;
