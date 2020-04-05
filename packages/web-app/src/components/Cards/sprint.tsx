import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { getCurrentUrl, route } from 'preact-router';
import { MoreVertical } from 'preact-feather';
import { notify } from 'react-notify-toast';

import { Modal } from 'components/Modal';
import { Sprint } from 'models/Sprint';
import { toggleSprintStatus } from 'services/api/sprints';
import { observer } from 'services/mobx';
import { errorColour } from 'services/notification/colours';
import { useStore } from 'stores';

interface IProps {
    sprint: Sprint;
    closed: boolean;
}

export const SprintCard: FunctionalComponent<IProps> = observer((props: IProps) => {
    const userLocationStore = useStore().userLocationStore;

    const [showClosureModal, setShowClosureModal] = useState(false);
    const [showOpeningModal, setShowOpeningModal] = useState(false);

    const linkTo = (): void => {
        route(`${getUrlSubstringAndFix()}/sprint/${props.sprint.id}/`);
        userLocationStore.setSprint(props.sprint);
    };

    const closureModalContent = <div>Are you sure you want to close this sprint?</div>;
    const openingModalContent = <div>Are you sure you want to open this sprint?</div>;

    const handleToggleSprintStatus = async (): Promise<void> => {
        return await toggleSprintStatus(userLocationStore.currentWorkspace.id, props.sprint.id).then((error) => {
            if (error) notify.show(error, 'error', 5000, errorColour);
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
                    <div class="truncate">
                        {props.sprint.title} - {props.sprint.description}
                    </div>
                    <MoreVertical
                        class="hover:text-orange-600"
                        onClick={(e: MouseEvent): void => {
                            e.stopPropagation();
                            if (!props.closed) setShowClosureModal(true);
                            else setShowOpeningModal(true);
                        }}
                    />
                </div>
                <div class="px-4 py-2 flex min-w-0 justify-between">
                    <p class="itm-description">
                        {`${new Date(props.sprint.startDate).toDateString()} 
                        - ${new Date(props.sprint.dueDate).toDateString()}`}
                    </p>
                    <div>
                        <span class="num-issues tooltip">
                            {props.sprint.totalNumberOfIssues}
                            <span class="tooltip-text">Total Number of Issues Assigned to Sprint</span>
                        </span>
                        <span class="story-pnt tooltip">
                            {props.sprint.totalStoryPoint}
                            <span class="tooltip-text">Total Number of Story Points Assigned to Sprint</span>
                        </span>
                    </div>
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
