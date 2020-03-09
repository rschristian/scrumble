import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router';

import { Issue } from 'models/Issue';

export const IssueBoardCard: FunctionalComponent<Issue> = (props: Issue) => {
    return (
        <div className="bg-white relative rounded-md shadow-lg m-2 min-h-48 m-4">
            <div className="px-4 py-2 h-40">
                <p class="">{props.name}</p>
            </div>
            <div className="absolute bottom-0 left-0 px-4 py-2">
                <div class="flex">
                    <span className="story-pnt">{props.storyPoint}</span>
                    <p class="font-hairline text-gray-700">{props.project}</p>
                </div>
            </div>
        </div>
    );
};

export const IssueCard: FunctionalComponent<Issue> = (props: Issue) => {
    return (
        <Link href={`/issue/${props.id}`} className="lst-itm-container">
            <div className="px-4 py-2 flex min-w-0">
                <div class="truncate">{props.name}</div>
            </div>
            <div className="flex px-4 py-2 z-1">
                <span className="story-pnt">{props.storyPoint}</span>
                <span className="text-gray-700">{props.project}</span>
            </div>
        </Link>
    );
};
