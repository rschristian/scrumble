import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { X, ArrowDown } from 'preact-feather';

import { GenericEdit } from 'components/CommonRoutes/Edit';

import { useStore } from 'stores';
import { associateProjectsWithWorkspace, editWorkspace } from 'services/api/workspaces';
import { Project } from 'models/Project';
import { getProjects } from 'services/api/projects';
import { notify } from 'react-notify-toast';
import { errorColour, infoColour } from 'services/Notification/colours';
const WorkspaceEdit: FunctionalComponent = () => {
    const currentWorkspace = useStore().userLocationStore.currentWorkspace;

    const [name, setName] = useState(currentWorkspace.name);
    const [description, setDescription] = useState(currentWorkspace.description);
    const [usersProjects, setUsersProjects] = useState<Project[]>([]); // TODO: Figure this out
    const [showProjectSelect, setShowProjectSelect] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedProjectIds, setSelectedProjectIds] = useState<number[]>([currentWorkspace.projectIds]);

    useEffect(() => {
        getProjects().then((result) => {
            if (typeof result === 'string') notify.show(result, 'error', 5000, errorColour);
            else if (result.length === 0) {
                // if (typeof result === 'string') notify.show('You don\'t have any projects!', 'custom', 5000, infoColour);
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

    const onSubmit = (): void => {
        editWorkspace(currentWorkspace.id, {
            id: currentWorkspace.id,
            name,
            description,
        }).then((error) => {
            if (error) setErrorMessage(error);
            else console.log('Success');
        });
    };

    const x = (): void => {
        associateProjectsWithWorkspace(1, [1, 3, 4, 5, 8]).then((result) => {
            if (result) console.log('error');
        });
    };

    const updateSelectedProjects = (e): void => {
        if (e.target.checked) setSelectedProjectIds(selectedProjectIds.concat(parseInt(e.target.id)));
        else setSelectedProjectIds([...selectedProjectIds.filter((id) => id != e.target.id)]);
    };

    let label;
    return (
        <GenericEdit
            editForm={
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
                                <div
                                    className="bg-teal-500 rounded-full shadow-lg p-1 text-white mr-2 my-auto"
                                    onClick={(): void => setShowProjectSelect(!showProjectSelect)}
                                >
                                    <ArrowDown size={15} />
                                </div>
                            </div>
                            <div
                                className={`z-10 absolute mt-2 py-2 bg-white rounded-lg shadow-xl w-64 h-64 overflow-x-hidden overflow-y-scroll ${
                                    showProjectSelect ? 'block' : 'hidden'
                                }`}
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
                        </div>
                    </div>
                    <div class="error">{errorMessage}</div>
                </Fragment>
            }
            onSubmit={onSubmit}
        />
    );
};

import { ChangeEvent } from 'react';

export default WorkspaceEdit;
