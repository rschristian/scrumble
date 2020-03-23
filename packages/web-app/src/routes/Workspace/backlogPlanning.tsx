import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import toaster from 'toasted-notes';

import { CreateOrEditIssue } from 'components/Issue/createOrEditIssue';
import { Modal } from 'components/Modal';
import { Issue } from 'models/Issue';
import { createIssue } from 'services/api/issues';
import { observer } from 'services/mobx';
import IssuesList from 'components/Lists/issues';

const BacklogPlanning: FunctionalComponent = observer(() => {
    const [showNewIssueModal, setShowNewIssueModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleIssueCreation = async (newIssue: Issue, projectId: number): Promise<void> => {
        return await createIssue(projectId, newIssue).then((error) => {
            if (error) {
                setErrorMessage(error);
            } else {
                toaster.notify('Issue created!', {
                    duration: 2000,
                });
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
                        setErrorMessage('');
                    }}
                >
                    New Issue
                </button>
            </div>

            <IssuesList />

            {showNewIssueModal ? (
                <Modal
                    title="Create Issue"
                    content={
                        <CreateOrEditIssue
                            submit={handleIssueCreation}
                            close={(): void => setShowNewIssueModal(false)}
                            error={errorMessage}
                        />
                    }
                    close={(): void => setShowNewIssueModal(false)}
                />
            ) : null}
        </div>
    );
});

export default BacklogPlanning;
