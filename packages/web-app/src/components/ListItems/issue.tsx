import { FunctionalComponent, h } from 'preact';
import { Issue } from 'models/Issue';
import { Link } from 'preact-router';

export const IssueListItem: FunctionalComponent<Issue> = (props: Issue) => {
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
