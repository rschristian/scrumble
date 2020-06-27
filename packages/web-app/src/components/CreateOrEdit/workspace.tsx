import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Select from 'react-select';
import { notify } from 'react-notify-toast';

import { Project } from 'models/Project';
import { Workspace } from 'models/Workspace';
import { apiFetchProjects } from 'services/api/projects';
import { errorColour } from 'services/notification/colours';

interface DropdownMenuOption {
    value: Project;
    label: string;
}

interface IProps {
    workspace?: Workspace;
    close?: () => void;
    submit: (workspace: Workspace) => void;
}

const CreateOrEditWorkspace: FunctionalComponent<IProps> = (props: IProps) => {
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
            <div class="m-4">
                <div class="m-4">
                    <label class="form-label">Workspace Name</label>
                    <input
                        class="form-input"
                        type="text"
                        placeholder="Workspace Name"
                        value={name}
                        onInput={(e): void => setName((e.target as HTMLInputElement).value)}
                    />
                </div>
                <div class="m-4">
                    <label class="form-label">Workspace Description</label>
                    <input
                        class="form-input"
                        type="text"
                        placeholder="Workspace Description"
                        value={description}
                        onInput={(e): void => setDescription((e.target as HTMLInputElement).value)}
                    />
                </div>
                <div class="m-4">
                    <label class="form-label">Projects in this workspace</label>
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
                        closeMenuOnSelect={false}
                    />
                </div>
                <button
                    class="btn-create mx-auto mb-4 ml-4"
                    onClick={(): void =>
                        props.submit({
                            id: props.workspace?.id || 0,
                            name,
                            description,
                            // TODO Ensure this works like I think it does
                            projectIds: selectedProjectOptions.map((projectOption) => projectOption.value.id),
                            users: props.workspace?.users || [],
                        })
                    }
                >
                    Submit
                </button>
            </div>
        </Fragment>
    );
};

export default CreateOrEditWorkspace;
