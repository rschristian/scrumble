import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router';
import { Workspace } from 'models/Workspace';

const WorkspaceListItem: FunctionalComponent<Workspace> = (props: Workspace) => {
    return (
        <div class="lst-itm-container">
            <div class="px-4 py-2">
                <Link href={`/workspace/${props.id}`} class="truncate">
                    {props.name}
                </Link>
                <p class="itm-description">{props.description}</p>
            </div>
        </div>
    );
};

export default WorkspaceListItem;
