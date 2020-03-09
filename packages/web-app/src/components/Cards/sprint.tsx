import { FunctionalComponent, h } from 'preact';
import { getCurrentUrl, route } from 'preact-router';

import { MoreVertical } from 'preact-feather';

interface IProps {
    id: number;
    title: string;
    description: string;
}

export const SprintCard: FunctionalComponent<IProps> = (props: IProps) => {
    // Have to do this rather than a link component, as there's no way to stop propagation with it
    const linkTo = (): void => {
        route(`${getUrlSubstringAndFix()}/sprint/${props.id}/`);
    };

    return (
        <div class="lst-itm-container" onClick={linkTo}>
            <div class="px-4 py-2 flex min-w-0 justify-between">
                <div class="truncate">{props.title}</div>
                <div class="more-vertical">
                    <MoreVertical
                        class="hover:text-orange-600"
                        onClick={(e: MouseEvent): void => {
                            e.stopPropagation();
                            console.log('Hello World!');
                        }}
                    />
                </div>
            </div>
            <div class="px-4 py-2 flex min-w-0">
                <p class="itm-description">{props.description}</p>
            </div>
        </div>
    );
};

const getUrlSubstringAndFix = (): string => {
    const currentUrl = getCurrentUrl().replace(/\D+$/g, '');
    if (currentUrl.substring(currentUrl.length - 1) == '/') return currentUrl.substring(0, currentUrl.length - 1);
    return currentUrl;
};
