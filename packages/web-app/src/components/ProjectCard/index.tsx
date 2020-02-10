import { FunctionalComponent, h } from 'preact';
import { Project } from 'models/Project';

interface IProps {
    projectKey: number;
    project: Project;
    active: boolean;
    onClick: (index: number) => void;
}

const ProjectCard: FunctionalComponent<IProps> = (props: IProps) => {
    const handleOnClick = (): void => {
        props.onClick(props.projectKey);
    };

    // Just a thought, image on left, a small space, then the text layered? Owner's name on top in smaller,
    // project name on bottom larger?

    return (
        <div className={'card is-clickable ' + (props.active ? 'active' : '')} onClick={handleOnClick}>
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
