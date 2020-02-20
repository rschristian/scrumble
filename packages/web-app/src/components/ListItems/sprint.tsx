import { FunctionalComponent, h } from 'preact';
import { getCurrentUrl, Link } from 'preact-router';
import { Sprint } from 'models/Sprint';

export const SprintListItem: FunctionalComponent<Sprint> = (props: Sprint) => {
    return (
        <Link href={`${getCurrentUrl()}/sprint/${props.id}/issues`} class="lst-itm-container">
            <div class="px-4 py-2">
                <div class="truncate">{props.name}</div>
                <p class="itm-description">{props.description}</p>
            </div>
        </Link>
    );
};
