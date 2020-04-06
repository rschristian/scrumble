import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { notify } from 'react-notify-toast';
import { Multiselect } from 'multiselect-react-dropdown';

import { getProjects } from 'services/api/projects';
import { errorColour, infoColour } from 'services/notification/colours';
import { Project } from 'models/Project';
import { Workspace } from 'models/Workspace';
import { Sprint, SprintStatus } from 'models/Sprint';

interface IProps {
    workspace?: Workspace;
    close?: () => void;
    submit: (workspace: Workspace) => void;
}

export const CreateOrEditWorkspace: FunctionalComponent<IProps> = (props: IProps) => {
    const [name, setName] = useState(props.workspace?.name || '');
    const [description, setDescription] = useState(props.workspace?.description || '');
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);

    useEffect(() => {
        getProjects().then((result) => {
            if (typeof result === 'string') notify.show(result, 'error', 5000, errorColour);
            else if (result.length === 0) notify.show('You do not have any projects!', 'custom', 5000, infoColour);
            else setProjects(result);
        });
    }, []);

    const createWorkspace = (): Workspace => {
        return {
            id: props.workspace?.id || 0,
            name,
            description,
            projectIds: selectedProjects.map((project) => project.id),
            users: props.workspace?.users || [],
        };
    };

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
                    <Multiselect
                        class="z-50"
                        style={{ position: 'relative' }}
                        closeOnSelect={false}
                        avoidHighlightFirstOption={true}
                        options={projects}
                        selectedValues={selectedProjects}
                        displayValue="name"
                        onSelect={(doNotUseMe: Project[], selectedProject: Project): void => {
                            setSelectedProjects((oldValues) => Array.from(new Set([...oldValues, selectedProject])));
                        }}
                        onRemove={(doNotUseMe: Project[], selectedProject: Project): void => {
                            setSelectedProjects((oldValues) =>
                                oldValues.filter((project) => project.id != selectedProject.id),
                            );
                        }}
                    />
                </div>
                {!props.workspace ? (
                    <div class="flex justify-between pt-2">
                        <button class="btn-create mb-4 ml-4" onClick={(): void => props.submit(createWorkspace())}>
                            Confirm
                        </button>
                        <button class="btn-close bg-transparent mb-4 mr-4" onClick={props.close}>
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button class="btn-create mx-auto mb-4 ml-4" onClick={(): void => props.submit(createWorkspace())}>
                        Save Changes
                    </button>
                )}
            </div>
        </Fragment>
    );
};
