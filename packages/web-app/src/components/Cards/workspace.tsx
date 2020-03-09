import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router';

import { Workspace } from 'models/Workspace';

export const WorkspaceCard: FunctionalComponent<Workspace> = (props: Workspace) => {
    return (
        <Link href={`/workspace/${props.id}`} class="lst-itm-container">
            <div class="px-4 py-2">
                <div class="truncate">{props.name}</div>
                <p class="itm-description">{props.description}</p>
            </div>
        </Link>
    );
};
