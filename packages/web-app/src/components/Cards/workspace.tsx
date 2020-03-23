import { FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import { Link } from 'preact-router';

import { Workspace } from 'models/Workspace';
import { UserLocationStoreContext } from 'stores';
import { observer } from 'services/mobx';

export const WorkspaceCard: FunctionalComponent<Workspace> = observer((props: Workspace) => {
    const userLocationStore = useContext(UserLocationStoreContext);

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
