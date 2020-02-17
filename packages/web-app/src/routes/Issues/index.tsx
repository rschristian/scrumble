import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { Issue } from '../../models/Issue';
import IssueListItem from '../../components/IssueListItem';
import IssueFilter from '../../components/IssueFilter';

const Issues: FunctionalComponent = () => {
    const [issues, setIssues] = useState<Issue[]>([
        {
            id: 1,
            name: 'As a user, I want to be edit a workspace so they can be altered after creation',
            description: 'Crippling depression and anxiety',
            storyPoint: 1,
        },
        {
            id: 2,
            name: 'As a scrum master, I want to view a burn down chart for a sprint so that I can view velocity',
            description: 'Retards and assholes',
            storyPoint: 3,
        },
        {
            id: 1,
            name: 'As a scrum master, I want to view the current number of closed tasks for a sprint',
            description: 'Toughest option. Personal development',
            storyPoint: 1,
        },
    ]);

    return (
        <div class="w-screen">
            <div class="mx-3 flex justify-center flex-col w-3/4">
                <h1 class="text-left font-medium text-sm text-deep-space-sparkle py-2 border-b border-gray-300">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    CUBRIC > Sprints > Skyfall
                </h1>
                <div class="flex items-baseline items-start justify-between border-b border-gray-300">
                    <h1 class="text-3xl text-deep-space-sparkle tracking-wide font-medium my-5">Issues</h1>
                    <button class="align-baseline bg-blue-500 hover:bg-gray-100 hover:text-gray-800 text-white font-semibold px-2 py-1 border border-gray-400 rounded shadow">
                        New Issue
                    </button>
                </div>
                <IssueFilter />
                <div class="rounded bg-white overflow-hidden shadow-lg">
                    {issues.map((issue, index) => {
                        return (
                            <IssueListItem
                                key={index}
                                id={issue.id}
                                name={issue.name}
                                description={issue.description}
                                storyPoint={issue.storyPoint}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Issues;
