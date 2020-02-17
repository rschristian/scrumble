import { FunctionalComponent, h } from 'preact';
import { Issue } from 'models/Issue';
import { Link } from 'preact-router';

const IssueListItem: FunctionalComponent<Issue> = (props: Issue) => {
    return (
        <div class="border-b border-gray-300 w-screen">
            <div class="flex justify-between w-9/12">
                <div class="px-4 py-2">
                    <Link href={`/issue/${props.id}`}>{props.name}</Link>
                </div>
                <div class="px-4 py-2">
                    <span class="bg-orange-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
                        {props.storyPoint}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default IssueListItem;
