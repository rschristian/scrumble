import { Fragment, FunctionalComponent, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { getCurrentUrl, route } from 'preact-router';
import { observer as mobxObserver } from 'mobx-react-lite';
import { MoreVertical } from 'preact-feather';

import { Modal } from 'components/Modal';
import { toggleSprintStatus } from 'services/api/sprints';
import { WorkspaceStoreContext } from 'stores';

function observer<P>(props: P): any {
    return mobxObserver(props as any);
}

interface IProps {
    id: number;
    projectId: number;
    title: string;
    description: string;
    closed: boolean;
}

export const SprintCard: FunctionalComponent<IProps> = observer((props: IProps) => {
    const workspaceStore = useContext(WorkspaceStoreContext);

    const [showClosureModal, setShowClosureModal] = useState<boolean>(false);
    const [showOpeningModal, setShowOpeningModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const linkTo = (): boolean => route(`${getUrlSubstringAndFix()}/sprint/${props.id}/`);

    const closureModalContent = (
        <div>
            Are you sure you want to close this sprint?
            <div class="error">{errorMessage}</div>
        </div>
    );
    const openingModalContent = (
        <div>
            Are you sure you want to open this sprint?
            <div className="error">{errorMessage}</div>
        </div>
    );

    const handleToggleSprintStatus = async (): Promise<void> => {
        return await toggleSprintStatus(workspaceStore.currentWorkspace, props.projectId, props.id).then((error) => {
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
});

const getUrlSubstringAndFix = (): string => {
    const currentUrl = getCurrentUrl().replace(/\D+$/g, '');
    if (currentUrl.substring(currentUrl.length - 1) == '/') return currentUrl.substring(0, currentUrl.length - 1);
    return currentUrl;
};
