import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { notify } from 'react-notify-toast';
import Select from 'react-select';

import { getProjects } from 'services/api/projects';
import { errorColour } from 'services/notification/colours';
import { Project } from 'models/Project';
import { Workspace } from 'models/Workspace';
import { useLtsWarning } from 'services/notification/hooks';

const customStyles = {
    menuPortal: (provided: object): object => ({
        ...provided,
        zIndex: 50,
    }),
};

interface IProps {
    workspace?: Workspace;
    close?: () => void;
    submit: (workspace: Workspace) => void;
}

export const CreateOrEditWorkspace: FunctionalComponent<IProps> = (props: IProps) => {
    const [name, setName] = useState<string>(props.workspace?.name || '');
    const [description, setDescription] = useState<string>(props.workspace?.description || '');

    const [projectOptions, setProjectOptions] = useState<{ value: Project; label: string }[]>([]);
    const [selectedProjectIds, setSelectedProjectIds] = useState<number[]>(props.workspace?.projectIds || []);

    // const selected = projectOptions.filter((project) => selectedProjectIds.includes(project.id));

    useEffect(() => {
        getProjects().then((result) => {
            if (typeof result === 'string') notify.show(result, 'error', 5000, errorColour);
            else {
                const options: { value: Project; label: string }[] = [];
                result.map((project) => {
                    options.push({
                        label: project.name,
                        value: project,
                    });
                });
                setProjectOptions(options);
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
                    <Select
                        styles={customStyles}
                        isMulti={true}
                        onChange={onSelect}
                        options={projectOptions}
                        menuPortalTarget={document.body}
                    />
                </div>
                <button class="btn-create mx-auto mb-4 ml-4" onClick={useLtsWarning}>
                    Submit
                </button>
            </div>
        </Fragment>
    );
};
