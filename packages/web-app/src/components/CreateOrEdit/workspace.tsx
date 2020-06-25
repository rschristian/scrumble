import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { notify } from 'react-notify-toast';
import Select from 'react-select';

import { apiFetchProjects } from 'services/api/projects';
import { errorColour } from 'services/notification/colours';
import { Project } from 'models/Project';
import { Workspace } from 'models/Workspace';
import { useLtsWarning } from 'services/notification/hooks';

interface DropdownMenuOption {
    value: Project;
    label: string;
}

interface IProps {
    workspace?: Workspace;
    close?: () => void;
    submit: (workspace: Workspace) => void;
}

export const CreateOrEditWorkspace: FunctionalComponent<IProps> = (props: IProps) => {
    const [name, setName] = useState<string>(props.workspace?.name || '');
    const [description, setDescription] = useState<string>(props.workspace?.description || '');

    const [projectOptions, setProjectOptions] = useState<DropdownMenuOption[]>([]);
    const [selectedProjectOptions, setSelectedProjectOptions] = useState<DropdownMenuOption[]>([]);

    useEffect(() => {
        async function getProjectData(): Promise<void> {
            const result = await apiFetchProjects();
            if (typeof result === 'string') notify.show(result, 'error', 5000, errorColour);
            else {
                const options: DropdownMenuOption[] = [];
                result.map((project) => {
                    options.push({
                        value: project,
                        label: project.name,
                    });
                });
                setProjectOptions(options);
                setSelectedProjectOptions(
                    options.filter((project) => props.workspace?.projectIds.includes(project.value.id)),
                );
            }
        }

        getProjectData();
    }, [props.workspace]);

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
                        styles={{
                            menuPortal: (provided: object): object => ({
                                ...provided,
                                zIndex: 50,
                            }),
                        }}
                        isMulti={true}
                        options={projectOptions}
                        menuPortalTarget={document.body}
                        value={selectedProjectOptions}
                        onChange={(selectedOptions: DropdownMenuOption[]): void => {
                            if (selectedOptions !== null) setSelectedProjectOptions(selectedOptions);
                            else setSelectedProjectOptions([]);
                        }}
                    />
                </div>
                <button class="btn-create mx-auto mb-4 ml-4" onClick={useLtsWarning}>
                    Submit
                </button>
            </div>
        </Fragment>
    );
};
