import { FunctionalComponent, h } from 'preact';

import { Issue } from 'models/Issue';

export const IssueBoardCard: FunctionalComponent<Issue> = (props: Issue) => {
    return (
        <div class="bg-white relative rounded-md shadow-lg m-2 min-h-48 m-4">
            <div class="px-4 py-2 h-40">
                <p class="">{props.name}</p>
            </div>
            <div class="absolute bottom-0 left-0 px-4 py-2">
                <div class="flex">
                    <span class="story-pnt">{props.storyPoint}</span>
                    <p class="font-hairline text-gray-700">{props.project}</p>
                </div>
            </div>
        </div>
    );
};

interface IProps {
    issue: Issue;
    onClick: () => void;
}

export const IssueCard: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <div class="lst-itm-container" onClick={props.onClick}>
            <div class="px-4 py-2 flex min-w-0">
                <div class="truncate">{props.issue.name}</div>
            </div>
            <div class="flex px-4 py-2 z-1">
                <span class="story-pnt">{props.issue.storyPoint}</span>
                <span class="text-gray-700">{props.issue.project}</span>
            </div>
        </div>
    );
};
