import { Fragment, FunctionalComponent, h } from 'preact';
import { getCurrentUrl, route } from 'preact-router';

import { MoreVertical } from 'preact-feather';
import { useState } from 'preact/hooks';
import { Modal } from 'components/Modal';

interface IProps {
    id: number;
    title: string;
    description: string;
    closed: boolean;
}

export const SprintCard: FunctionalComponent<IProps> = (props: IProps) => {
    const [showClosureModal, setShowClosureModal] = useState<boolean>(false);
    const [showOpeningModal, setShowOpeningModal] = useState<boolean>(false);

    // Have to do this rather than a link component, as there's no way to stop propagation with it
    const linkTo = (): boolean => route(`${getUrlSubstringAndFix()}/sprint/${props.id}/`);

    const closureModalContent = <div>Are you sure you want to close this sprint?</div>;
    const openingModalContent = <div>Are you sure you want to open this sprint?</div>;

    return (
        <Fragment>
            {showClosureModal ? (
                <Modal
                    title="Close Sprint?"
                    content={closureModalContent}
                    submit={(): void => setShowClosureModal(false)}
                    close={(): void => setShowClosureModal(false)}
                />
            ) : showOpeningModal ? (
                <Modal
                    title="Open Sprint?"
                    content={openingModalContent}
                    submit={(): void => setShowOpeningModal(false)}
                    close={(): void => setShowOpeningModal(false)}
                />
            ) : null}
            <div class="lst-itm-container" onClick={linkTo}>
                <div class="px-4 py-2 flex min-w-0 justify-between">
                    <div class="truncate">{props.title}</div>
                    <div class="more-vertical">
                        <MoreVertical
                            class="hover:text-orange-600"
                            onClick={(e: MouseEvent): void => {
                                e.stopPropagation();
                                if (!props.closed) setShowClosureModal(true);
                                else setShowOpeningModal(true);
                            }}
                        />
                    </div>
                </div>
                <div class="px-4 py-2 flex min-w-0">
                    <p class="itm-description">{props.description}</p>
                </div>
            </div>
        </Fragment>
    );
};

const getUrlSubstringAndFix = (): string => {
    const currentUrl = getCurrentUrl().replace(/\D+$/g, '');
    if (currentUrl.substring(currentUrl.length - 1) == '/') return currentUrl.substring(0, currentUrl.length - 1);
    return currentUrl;
};
