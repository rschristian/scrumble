import { FunctionalComponent, h } from 'preact';
import { Workspace } from 'models/Workspace';
import { Link } from 'preact-router';

const WorkspaceListItem: FunctionalComponent<Workspace> = (props: Workspace) => {
    return (
        <div class="border-b border-gray-300">
            <div>
                <div class="px-4 py-2">
                    <Link href={`/workspace/${props.id}`}>{props.name}</Link>
                    <p class="text-gray-700 text-base">{props.description}</p>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceListItem;
