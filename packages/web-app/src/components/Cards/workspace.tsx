import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router';

import { Workspace } from 'models/Workspace';
import { observer } from 'services/mobx';
import { useStore } from 'stores';

export const WorkspaceCard: FunctionalComponent<Workspace> = observer((props: Workspace) => {
    const userLocationStore = useStore().userLocationStore;

    return (
        <Link
            href={`/workspace/${props.id}`}
            class="lst-itm-container"
            onClick={(): void => userLocationStore.setWorkspace(props)}
        >
            <div class="px-4 py-2">
                <div class="truncate">{props.name}</div>
                <p class="itm-description">{props.description}</p>
            </div>
        </Link>
    );
});
