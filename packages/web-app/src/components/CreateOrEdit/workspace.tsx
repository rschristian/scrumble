import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { notify } from 'react-notify-toast';
import { Multiselect } from 'multiselect-react-dropdown';

import { getProjects } from 'services/api/projects';
import { errorColour, infoColour } from 'services/Notification/colours';
import { Project } from 'models/Project';
import { Workspace } from 'models/Workspace';

interface IProps {
    workspace?: Workspace;
    close?: () => void;
    submit: (workspace: Workspace) => void;
}

export const CreateOrEditWorkspace: FunctionalComponent<IProps> = (props: IProps) => {
    const [name, setName] = useState(props.workspace?.name || '');
    const [description, setDescription] = useState(props.workspace?.description || '');
    const [usersProjects, setUsersProjects] = useState<Project[]>([]);
    const [selectedProjectIds, setSelectedProjectIds] = useState<number[]>(props.workspace?.projectIds || []);
    const selected = usersProjects.filter((project) => selectedProjectIds.includes(project.id));

    useEffect(() => {
        getProjects().then((result) => {
            if (typeof result === 'string') notify.show(result, 'error', 5000, errorColour);
            else if (result.length === 0) {
                notify.show('You do not have any projects!', 'custom', 5000, infoColour);
            } else {
                setUsersProjects(result);
                console.log('users projects');
                console.log(result);
            }
        });
    }, []);

    const onSelect = (selectedProjects: Project[], selectedProject: Project): void => {
        setSelectedProjectIds([...selectedProjectIds, selectedProject.id]);
    };

    const onRemove = (selectedProjects: Project[], removedProject: Project): void => {
        setSelectedProjectIds(selectedProjectIds.filter((id) => id != removedProject.id));
    };

    return (
        <Fragment>
            <div className="m-4">
                <div className="m-4">
                    <label className="form-label">Workspace Name</label>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Workspace Name"
                        value={name}
                        onInput={(e): void => setName((e.target as HTMLInputElement).value)}
                    />
                </div>
                <div className="m-4">
                    <label className="form-label">Workspace Description</label>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Workspace Description"
                        value={description}
                        onInput={(e): void => setDescription((e.target as HTMLInputElement).value)}
                    />
                </div>
                <div className="m-4">
                    <label className="form-label">Projects in this workspace</label>
                    <Multiselect
                        options={usersProjects}
                        selectedValues={selected}
                        displayValue="name"
                        onSelect={onSelect}
                        onRemove={onRemove}
                    />
                </div>
                <button
                    className="btn-create mx-auto mb-4 ml-4 absolute left-0 bottom-0"
                    onClick={(): void =>
                        props.submit({
                            id: props.workspace?.id || 0,
                            name,
                            description,
                            projectIds: selectedProjectIds,
                        })
                    }
                >
                    Submit
                </button>
            </div>
        </Fragment>
    );
};
