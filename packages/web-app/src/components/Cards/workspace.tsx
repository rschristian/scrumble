import { FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import { Link } from 'preact-router';

import { Workspace } from 'models/Workspace';
import { WorkspaceStoreContext } from 'stores';
import { observer } from 'services/mobx';

export const WorkspaceCard: FunctionalComponent<Workspace> = observer((props: Workspace) => {
    const workspaceStore = useContext(WorkspaceStoreContext);

    return (
        <Link
            href={`/workspace/${props.id}`}
            class="lst-itm-container"
            onClick={(): void => workspaceStore.setWorkspace(props.id)}
        >
            <div class="px-4 py-2">
                <div class="truncate">{props.name}</div>
                <p class="itm-description">{props.description}</p>
            </div>
        </Link>
    );
});
