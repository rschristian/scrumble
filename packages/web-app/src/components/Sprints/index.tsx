import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { Sprint } from '../../models/Sprint';
import SprintListItem from '../SprintListItem';
import SearchBar from '../SearchBar';

const Sprints: FunctionalComponent = () => {
    const [sprints, setSprints] = useState<Sprint[]>([
        { id: 1, name: 'Skyfall', description: 'Insert insightful and creative description of a sprint here' },
        {
            id: 2,
            name: 'Quantum of Solace',
            description: 'Insert insightful and creative description of a sprint here',
        },
        { id: 1, name: 'Spectre', description: 'Insert insightful and creative description of a sprint here' },
    ]);

    return (
        <div class="w-screen">
            <div class="mx-3 flex justify-center flex-col w-3/4">
                <h1 class="text-left font-medium text-sm text-deep-space-sparkle py-2 border-b border-gray-300">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    CUBRIC > Sprints
                </h1>
                <div class="flex items-baseline items-start justify-between border-b border-gray-300">
                    <h1 class="text-3xl text-deep-space-sparkle tracking-wide font-medium my-5">Sprints</h1>
                    <button class="align-baseline bg-blue-500 hover:bg-gray-100 hover:text-gray-800 text-white font-semibold px-2 py-1 border border-gray-400 rounded shadow">
                        New Sprint
                    </button>
                </div>
                <SearchBar placeholder="Search by name" />
                <div class="rounded bg-white overflow-hidden shadow-lg">
                    {sprints.map((sprint, index) => {
                        return (
                            <SprintListItem
                                key={index}
                                id={sprint.id}
                                name={sprint.name}
                                description={sprint.description}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Sprints;
