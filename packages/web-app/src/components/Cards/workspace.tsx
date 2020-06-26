import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router';
import { useDispatch } from 'react-redux';

import { Workspace } from 'models/Workspace';
import { reduxSetCurrentWorkspace } from 'stores/userLocationStore';

export const WorkspaceCard: FunctionalComponent<Workspace> = (props: Workspace) => {
    const dispatch = useDispatch();

    function setWorkspace(): void {
        dispatch(reduxSetCurrentWorkspace(props));
    }

    return (
        <Link href={`/workspace/${props.id}`} class="lst-itm-container" onClick={setWorkspace}>
            <div class="px-4 py-2">
                <div class="truncate">{props.name}</div>
                <p class="itm-description">{props.description}</p>
            </div>
        </Link>
    );
};
