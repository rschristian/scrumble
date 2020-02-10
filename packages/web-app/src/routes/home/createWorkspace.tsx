import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import ProjectCard from 'components/ProjectCard';
import { Project } from 'models/Project';

interface IProps {
    show: boolean;
}

const tempProjectDataList: Array<Project> = [
    // prettier-ignore
    { id: 1, name: 'Lauren\'s Bees', ownerId: 1, ownerName: 'Lauren Heymer', url: '', avatarUrl: null },
    { id: 2, name: 'Context Switching', ownerId: 2, ownerName: 'Lauren Heymer', url: '', avatarUrl: null },
    { id: 3, name: 'Fox Gloves', ownerId: 3, ownerName: 'Lauren Heymer', url: '', avatarUrl: null },
    { id: 4, name: 'Sexy Databases', ownerId: 4, ownerName: 'Lauren Heymer', url: '', avatarUrl: null },
    {
        id: 5,
        name: 'Women in Tech (Or how to take over the world by screaming "PATRIARCHY")',
        ownerId: 5,
        ownerName: 'Lauren Heymer',
        url: '',
        avatarUrl: null,
    },
];

const CreateWorkspace: FunctionalComponent<IProps> = (props: IProps) => {
    const [selectedProjects, setSelectedProjects] = useState<Array<number>>([]);

    const projectOnClick = (index: number): void => {
        if (selectedProjects.includes(index)) {
            selectedProjects.splice(selectedProjects.indexOf(index), 1);
        } else setSelectedProjects([...selectedProjects, index]);
    };

    const projects = tempProjectDataList.map((project, index) => {
        return <ProjectCard key={index} projectKey={index} project={project} onClick={projectOnClick} />;
    });

    return (
        <Fragment>
            <div class={'column is-5' + (props.show ? '' : ' is-hidden')}>
                <div>{projects}</div>
            </div>
            <div class={'column is-6 is-offset-1' + (props.show ? '' : ' is-hidden')}>
                <div>Config in some way?</div>
            </div>
        </Fragment>
    );
};

export default CreateWorkspace;
