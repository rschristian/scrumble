import { FunctionalComponent, h } from 'preact';
import { useState, useContext } from 'preact/hooks';
import { notify } from 'react-notify-toast';

import { IssuesList } from 'components/CommonRoutes/IssuesList';
import { CreateOrEditIssue } from 'components/CreateOrEditIssue';
import { Modal } from 'components/Modal';
import { Issue } from 'models/Issue';
import { IssuePagination } from 'models/IssuePagination';
import { observer } from 'services/mobx';
import { successColour } from 'services/Notification/colours';
import { UserLocationStoreContext } from 'stores';
import { createIssue, fetchWorkspaceIssues, addEstimate } from 'services/api/issues';

const BacklogPlanning: FunctionalComponent = observer(() => {
    const userLocationStore = useContext(UserLocationStoreContext);
    const [showNewIssueModal, setShowNewIssueModal] = useState(false);
    const [newIssueErrorMessage, setNewIssueErrorMessage] = useState('');
    const [updateIssues, setUpdateIssues] = useState(false);

    const handleIssueCreation = async (newIssue: Issue, projectId: number): Promise<void> => {
        return await createIssue(userLocationStore.currentWorkspace.id, projectId, newIssue).then((response: Issue) => {
            notify.show('New issue created!', 'success', 5000, successColour);
            setShowNewIssueModal(false);
            setUpdateIssues(true);
            addEstimate(response.projectId, response);
        })
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
                <IssuesList
                    updatingIssuesList={(): void => setUpdateIssues(false)}
                    updateIssueList={updateIssues}
                />
            </div>
        </div>
    );
});

export default BacklogPlanning;
