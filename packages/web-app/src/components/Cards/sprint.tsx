import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { getCurrentUrl, route } from 'preact-router';
import { MoreVertical } from 'preact-feather';

import { Modal } from 'components/Modal';
import { Sprint } from 'models/Sprint';
import { toggleSprintStatus } from 'services/api/sprints';
import { observer } from 'services/mobx';
import { useStore } from 'stores';

interface IProps {
    sprint: Sprint;
    closed: boolean;
}

export const SprintCard: FunctionalComponent<IProps> = observer((props: IProps) => {
    const userLocationStore = useStore().userLocationStore;

    const [showClosureModal, setShowClosureModal] = useState(false);
    const [showOpeningModal, setShowOpeningModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const linkTo = (): void => {
        route(`${getUrlSubstringAndFix()}/sprint/${props.sprint.id}/`);
        userLocationStore.setSprint(props.sprint);
    };

    const closureModalContent = (
        <div>
            Are you sure you want to close this sprint?
            <div class="error">{errorMessage}</div>
        </div>
    );
    const openingModalContent = (
        <div>
            Are you sure you want to open this sprint?
            <div class="error">{errorMessage}</div>
        </div>
    );

    const handleToggleSprintStatus = async (): Promise<void> => {
        return await toggleSprintStatus(
            userLocationStore.currentWorkspace.id,
            props.sprint.projectId,
            props.sprint.id,
        ).then((error) => {
            if (error) setErrorMessage(error);
            else {
                setShowClosureModal(false);
                setShowOpeningModal(false);
            }
        });
    };

    return (
        <Fragment>
            {showClosureModal ? (
                <Modal
                    title="Close Sprint?"
                    content={closureModalContent}
                    submit={async (): Promise<void> => await handleToggleSprintStatus()}
                    close={(): void => setShowClosureModal(false)}
                />
            ) : showOpeningModal ? (
                <Modal
                    title="Open Sprint?"
                    content={openingModalContent}
                    submit={async (): Promise<void> => await handleToggleSprintStatus()}
                    close={(): void => setShowOpeningModal(false)}
                />
            ) : null}

            <div class="lst-itm-container" onClick={linkTo}>
                <div class="px-4 py-2 flex min-w-0 justify-between">
                    <div class="truncate">{props.sprint.title}</div>
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
                    <p class="itm-description">{props.sprint.description}</p>
                </div>
            </div>
        </Fragment>
    );
});

const getUrlSubstringAndFix = (): string => {
    const currentUrl = getCurrentUrl().replace(/\D+$/g, '');
    if (currentUrl.substring(currentUrl.length - 1) == '/') return currentUrl.substring(0, currentUrl.length - 1);
    return currentUrl;
};
