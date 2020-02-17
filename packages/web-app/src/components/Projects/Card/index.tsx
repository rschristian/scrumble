import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { Project } from 'models/Project';

import './style.scss';

interface IProps {
    projectKey: number;
    project: Project;
    onClick: (index: number) => void;
}

const ProjectCard: FunctionalComponent<IProps> = (props: IProps) => {
    const [selected, setSelected] = useState(false);

    const handleOnClick = (): void => {
        props.onClick(props.projectKey);
        setSelected(!selected);
    };

    // Just a thought, image on left, a small space, then the text layered? Owner's name on top in smaller,
    // project name on bottom larger?

    return (
        <div className={'card is-clickable ' + (selected ? 'active' : '')} onClick={handleOnClick}>
            <div>
                <img src={props.project.avatarUrl} alt="Project's Avatar" />
                <span>
                    <small>Project Owner: {props.project.ownerName}</small>
                </span>
                <strong>{props.project.name}</strong>
            </div>
        </div>
    );
};

export default ProjectCard;
