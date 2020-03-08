import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { projects, storyPoints } from 'data';

const NewIssue: FunctionalComponent<any> = (props: any) => {
    const [Title, setTitle] = useState('');
    const [Descirption, setDescription] = useState('');
    const [IssueStoryPoint, setIssueStoryPoint] = useState(null);
    const [SelectedProject, setSelectedProject] = useState('');

    // currently being used for debugging
    const handleSubmit = (evt: any): void => {
        evt.preventDefault();
        alert(
            `Submitting title: ${Title}
            Description: ${Descirption}
            Story points ${IssueStoryPoint}
            project ${SelectedProject}`,
        );
    };

    const handleCancel = (evt: any): void => {
        evt.preventDefault();
        props.onCancel(false);
    };
    return (
        <Fragment>
            <form class="bg-grey shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                    {storyPoints.map((storyPoint): any => {
                        return (
                            <option class="form-option" value={storyPoint}>
                                {storyPoint}
                            </option>
                        );
                    })}
                </select>
                <label class="form-label"> Project </label>
                <select
                    class="form-input"
                    id="Project"
                    value={SelectedProject}
                    onChange={(e): void => setSelectedProject((e.target as HTMLSelectElement).value)}
                >
                    {projects.map((project): any => {
                        return (
                            <option class="form-option" value={project.name}>
                                {' '}
                                {project.name}
                            </option>
                        );
                    })}
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

export default NewIssue;
