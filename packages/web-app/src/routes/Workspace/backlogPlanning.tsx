import { FunctionalComponent, h } from 'preact';
import { useState, useContext } from 'preact/hooks';

import { notify } from 'react-notify-toast';

import { CreateOrEditIssue } from 'components/Issue/createOrEditIssue';
import { Modal } from 'components/Modal';
import { Issue } from 'models/Issue';
import { observer } from 'services/mobx';
import { UserLocationStoreContext } from 'stores';
import { createIssue } from 'services/api/issues';
import { IssuesList } from 'components/CommonRoutes/Issues';
import { successColour } from 'services/Notification/colours';

const BacklogPlanning: FunctionalComponent = observer(() => {
    const userLocationStore = useContext(UserLocationStoreContext);

    const [showNewIssueModal, setShowNewIssueModal] = useState(false);
    const [newIssueErrorMessage, setNewIssueErrorMessage] = useState('');

    const handleIssueCreation = async (newIssue: Issue, projectId: number): Promise<void> => {
        return await createIssue(userLocationStore.currentWorkspace.id, projectId, newIssue).then((error) => {
            if (error) {
                setNewIssueErrorMessage(error);
            } else {
                notify.show('New issue created!', 'success', 5000, successColour);
            }
        });
    };

    return (
        <div class={showNewIssueModal ? 'modal-active' : ''}>
            <div class="create-bar">
                <h1 class="page-heading">Backlog Planning</h1>
                <button
                    class="btn-create my-auto"
                    onClick={(): void => {
                        setShowNewIssueModal(true);
                        setNewIssueErrorMessage('');
                    }}
                >
                    New Issue
                </button>
            </div>

            {showNewIssueModal ? (
                <Modal
                    title="Create Issue"
                    content={
                        <CreateOrEditIssue
                            submit={handleIssueCreation}
                            close={(): void => setShowNewIssueModal(false)}
                            error={newIssueErrorMessage}
                        />
                    }
                    close={(): void => setShowNewIssueModal(false)}
                />
            ) : null}
            <div>
                <IssuesList />
            </div>
        </div>
    );
});

export default BacklogPlanning;
