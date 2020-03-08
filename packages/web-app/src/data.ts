import { Workspace } from 'models/Workspace';
import { Issue } from 'models/Issue';
import { Sprint } from 'models/Sprint';

export const workspaces: Workspace[] = [
    { id: 1, name: 'CUBRIC', description: 'Brain Tinder' },
    { id: 2, name: 'Sappo', description: 'Frogs n stuff' },
    { id: 3, name: 'Spot a Bee', description: 'Bees and Foxgloves' },
];

export const sprints: Sprint[] = [
    {
        id: 1,
        name: 'Sprint 1',
        description: 'Insert insightful and creative description of a sprint here',
    },
    {
        id: 2,
        name: 'Sprint 2',
        description: 'Insert insightful and creative description of a sprint here',
    },
    {
        id: 3,
        name: 'Sprint 3',
        description: 'Insert insightful and creative description of a sprint here',
    },
];

export const issues: Issue[] = [
    {
        id: 1,
        name: 'As a user, I want to be edit a workspace so they can be altered after creation',
        description: 'An insightful description of a user story',
        storyPoint: 1,
        project: 'Phoenix Project',
    },
    {
        id: 2,
        name: 'As a scrum master, I want to view a burn down chart for a sprint so that I can view velocity',
        description: 'An insightful description of a user story',
        storyPoint: 2,
        project: 'Narwhal Project',
    },
    {
        id: 3,
        name: 'As a scrum master, I want to view the current number of closed tasks for a sprint',
        description: 'An insightful description of a user story',
        storyPoint: 3,
        project: 'Unicorn Project',
    },
];
