import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { X, ArrowDown } from 'preact-feather';

import { Project } from 'models/Project';
import { getProjects } from 'services/api/projects';
import { notify } from 'react-notify-toast';
import { errorColour, infoColour } from 'services/Notification/colours';
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
    const [showProjectSelect, setShowProjectSelect] = useState(false);
    const [selectedProjectIds, setSelectedProjectIds] = useState<number[]>(props.workspace?.projectIds || []);

    useEffect(() => {
        getProjects().then((result) => {
            if (typeof result === 'string') notify.show(result, 'error', 5000, errorColour);
            else if (result.length === 0) {
                notify.show('You do not have any projects!', 'custom', 5000, infoColour);
            } else {
                setUsersProjects(result);
            }
        });
    }, []);

    const selectedProjectBadges = (
        <div className="flex sm:flex-col md:flex-row my-2 flex-wrap">
            {usersProjects.map((project, index) =>
                selectedProjectIds.includes(project.id) ? (
                    <div className="bg-teal-500 rounded-full shadow-lg p-1 text-white mx-1 my-1 flex items-baseline max-w-xs justify-between">
                        <span class="truncate p-1">{project.name}</span>
                        <div
                            onClick={(): void =>
                                setSelectedProjectIds([...selectedProjectIds.filter((id) => id != project.id)])
                            }
                        >
                            <X size={15} />
                        </div>
                    </div>
                ) : null,
            )}
        </div>
    );

    const updateSelectedProjects = (e: any): void => {
        if (e.target.checked) setSelectedProjectIds(selectedProjectIds.concat(parseInt(e.target.id)));
        else setSelectedProjectIds([...selectedProjectIds.filter((id) => id != e.target.id)]);
    };

    let label;
    return (
        <Fragment>
            <div class="flex justify-around">
                <div class="w-4/6">
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
                        {selectedProjectBadges}
                    </div>
                </div>
                <div className="m-4 w-2/6">
                    <div className="flex items-baseline">
                        <label className="form-label mr-4 my-auto">Select Projects for Workspace</label>
                        <button
                            className="bg-teal-500 rounded-full shadow-lg p-1 text-white mr-2 my-auto"
                            onClick={(): void => setShowProjectSelect(!showProjectSelect)}
                        >
                            <ArrowDown size={15} />
                        </button>
                    </div>
                    <div
                        className={`z-10 bg-red-100 absolute mt-2 py-2 bg-white rounded-lg shadow-xl w-64 h-64 overflow-x-hidden overflow-y-scroll ${
                            showProjectSelect ? 'block' : 'hidden'
                        }`}
                        tabIndex={1}
                        onBlur={(): void => setShowProjectSelect(false)}
                    >
                        {usersProjects.map((project, index) => (
                            <div className="flex items-baseline px-4 py-2 text-gray-800 hover:bg-teal-500 hover:text-white">
                                <input
                                    type="checkbox"
                                    id={`${project.id}`}
                                    value={project.name}
                                    name={`${project.id}`}
                                    checked={selectedProjectIds.includes(project.id)}
                                    onChange={(e): void => updateSelectedProjects(e)}
                                />
                                <label className="block px-4 py-2 truncate">{project.name}</label>
                            </div>
                        ))}
                    </div>
                    <button
                        className="btn-create mx-auto mb-4 ml-4 absolute left-0 bottom-0"
                        onClick={(): void => props.submit({ name, description, projectIds: selectedProjectIds })}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </Fragment>
    );
};
