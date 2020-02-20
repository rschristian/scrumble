import { FunctionalComponent, h } from 'preact';
import { getCurrentUrl, Link } from 'preact-router';
import { Sprint } from 'models/Sprint';

const SprintListItem: FunctionalComponent<Sprint> = (props: Sprint) => {
    return (
        <Link href={`${fixUrlIfItFucky(getCurrentUrl())}/sprint/${props.id}/`} class="lst-itm-container">
            <div class="px-4 py-2">
                <div class="truncate">{props.name}</div>
                <p class="itm-description">{props.description}</p>
            </div>
        </Link>
    );
};

const fixUrlIfItFucky = (currentUrl: string): string => {
    if (currentUrl.substring(currentUrl.length - 1) == '/') return currentUrl.substring(0, currentUrl.length - 1);
    return currentUrl;
};

export default SprintListItem;
