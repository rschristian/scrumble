import { FunctionalComponent, h } from 'preact';
import { getCurrentUrl, Link } from 'preact-router';

interface IProps {
    id: number;
    title: string;
    description: string;
}

export const SprintCard: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <Link href={`${getUrlSubstringAndFix()}/sprint/${props.id}/`} class="lst-itm-container">
            <div class="px-4 py-2 flex min-w-0">
                <div class="truncate">{props.title}</div>
            </div>
            <div className="px-4 py-2 flex min-w-0">
                <p className="itm-description">{props.description}</p>
            </div>
        </Link>
    );
};

const getUrlSubstringAndFix = (): string => {
    const currentUrl = getCurrentUrl().replace(/\D+$/g, '');
    if (currentUrl.substring(currentUrl.length - 1) == '/') return currentUrl.substring(0, currentUrl.length - 1);
    return currentUrl;
};
