import { FunctionalComponent, h } from 'preact';
import { useState, useContext } from 'preact/hooks';

import { notify } from 'react-notify-toast';

import { CreateOrEditIssue } from 'components/Issue/createOrEditIssue';
import { Modal } from 'components/Modal';
import { Issue } from 'models/Issue';
import { IssuePagination } from 'models/IssuePagination';
import { observer } from 'services/mobx';
import { UserLocationStoreContext } from 'stores';
import { createIssue, fetchWorkspaceIssues, addEstimate } from 'services/api/issues';
import { IssuesList } from 'components/Lists/issues';
import { success } from 'services/Notification/colours';
import { dataGrabber } from 'regressionModel/linearRegression';

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
                notify.show('New issue created!', 'success', 5000, success);
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
