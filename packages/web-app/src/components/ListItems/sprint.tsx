import { FunctionalComponent, h } from 'preact';
import { getCurrentUrl, Link } from 'preact-router';
import { Sprint } from 'models/Sprint';

export const SprintListItem: FunctionalComponent<Sprint> = (props: Sprint) => {
    const fixUrlIfItFucky = (currentUrl: string): string => {
        if (currentUrl.substring(currentUrl.length - 1) == '/') return currentUrl.substring(0, currentUrl.length - 1);
        return currentUrl;
    };

    return (
        <Link href={`${fixUrlIfItFucky(getCurrentUrl())}/sprint/${props.id}/`} class="lst-itm-container">
            <div class="px-4 py-2 flex min-w-0">
                <div class="truncate">{props.name}</div>
            </div>
            <div className="px-4 py-2 flex min-w-0">
                <p className="itm-description">{props.description}</p>
            </div>
        </Link>
    );
};

export default SprintListItem;
