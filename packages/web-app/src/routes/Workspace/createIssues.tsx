import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { projects, storyPoints } from 'data';

const NewIssue: FunctionalComponent = () => {
    const [ID, setID] = useState(null);
    const [Title, setTitle] = useState('');
    const [Descirption, setDescription] = useState('');
    const [IssueStoryPoint, setIssueStoryPoint] = useState(null);
    const [SelectedProject, setSelectedProject] = useState('');

    // currently being used for debugging
    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        alert(
            `Submitting title: ${Title}
            Description: ${Descirption}
            Story points ${IssueStoryPoint}
            project ${SelectedProject}`,
        );
    };
    return (
        <Fragment>
            <form onSubmit={handleSubmit} class="bg-grey shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <label class="form-label"> Title </label>
                <input
                    class="form-input"
                    type="text"
                    id="title"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label class="form-label"> Description </label>
                <textarea
                    class="form-input"
                    type="text"
                    id="description"
                    value={Descirption}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label class="form-label"> Story Points </label>
                <select
                    class="form-input"
                    id="StoryPoints"
                    value={IssueStoryPoint}
                    onChange={(e) => setIssueStoryPoint(e.target.value)}
                >
                    {storyPoints.map((storyPoint) => {
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
                    onChange={(e) => setSelectedProject(e.target.value)}
                >
                    {projects.map((project) => {
                        return (
                            <option class="form-option" value={project.name}>
                                {' '}
                                {project.name}
                            </option>
                        );
                    })}
                </select>
                <input className="btn-create my-auto" type="submit" value="Submit" />
            </form>
        </Fragment>
    );
};

export default NewIssue;
