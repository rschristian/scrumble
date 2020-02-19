import { FunctionalComponent, h } from 'preact';
import { getCurrentUrl, Link } from 'preact-router';
import { Sprint } from 'models/Sprint';

const SprintListItem: FunctionalComponent<Sprint> = (props: Sprint) => {
    return (
        <div class="lst-itm-container">
            <div class="px-4 py-2">
                <Link href={`${getCurrentUrl()}/sprint/${props.id}`} class="truncate">
                    {props.name}
                </Link>
                <p class="itm-description">{props.description}</p>
            </div>
        </div>
    );
};

export default SprintListItem;
