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
import { dataGrabber } from 'services/RegressionModel/dataGrabber';

const BacklogPlanning: FunctionalComponent = observer(() => {
    const userLocationStore = useContext(UserLocationStoreContext);
    const [showNewIssueModal, setShowNewIssueModal] = useState<boolean>(false);
    const [newIssueErrorMessage, setNewIssueErrorMessage] = useState<string>('');
    const [issueArray, setIssueArray] = useState<Issue[]>([]);
    const [updateIssues, setUpdateIssues] = useState<boolean>(false);

    const handleIssueCreation = async (newIssue: Issue, projectId: number): Promise<void> => {
        return await createIssue(userLocationStore.currentWorkspace.id, projectId, newIssue).then((error) => {
            if (error) {
                setNewIssueErrorMessage(error);
            } else {
                fetchWorkspaceIssues(userLocationStore.currentWorkspace.id, 'open', projectId, 0).then(
                    (response: IssuePagination) => {
                        addEstimate(response.issues[0].projectId, dataGrabber(issueArray), response.issues[0]);
                    },
                );
                notify.show('New issue created!', 'success', 5000, successColour);
                setShowNewIssueModal(false);
                setUpdateIssues(true);
            }
        });
    };

    const setArrayList = (issues: Issue[]): void => {
        setIssueArray(issues);
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
                    updateIssueData={setArrayList}
                    updatingIssuesList={(): void => setUpdateIssues(false)}
                    updateIssueList={updateIssues}
                />
            </div>
        </div>
    );
});

export default BacklogPlanning;
