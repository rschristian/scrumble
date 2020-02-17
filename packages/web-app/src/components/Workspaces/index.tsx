import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import WorkspaceListItem from '../WorkspaceListItem';
import { Sprint } from '../../models/Sprint';
import SearchBar from '../SearchBar';

const Workspaces: FunctionalComponent = () => {
    const [workspaces, setWorkspaces] = useState<Sprint[]>([
        { id: 1, name: 'CUBRIC', description: 'Brain Tinder' },
        { id: 2, name: 'Sappo', description: 'Frogs n stuff' },
        { id: 1, name: 'Spot a Bee', description: 'Bees and Foxgloves' },
    ]);

    return (
        <div class="w-screen flex justify-center bg-blue-100">
            <div class="mx-3 flex justify-center flex-col w-3/4">
                <div class="flex items-baseline items-start justify-between border-b border-gray-300">
                    <h1 class="text-3xl text-deep-space-sparkle tracking-wide font-medium my-5">Your Workspaces</h1>
                    <button class="align-baseline bg-teal-500 hover:bg-gray-100 hover:text-gray-800 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        New Workspace
                    </button>
                </div>
                <SearchBar placeholder="Search by name" />
                <div class="rounded bg-white overflow-hidden shadow-lg">
                    {workspaces.map((workspace, index) => {
                        return (
                            <WorkspaceListItem
                                key={index}
                                id={workspace.id}
                                name={workspace.name}
                                description={workspace.description}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Workspaces;
