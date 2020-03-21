import { FunctionalComponent, h } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

import { IssueCard } from 'components/Cards/issue';
import { IssueFilter } from 'components/Filter/issues';
import { CreateOrEditIssue } from 'components/Issue/createOrEditIssue';
import { Modal } from 'components/Modal';
import { Issue } from 'models/Issue';
import { observer } from 'services/mobx';
import { UserLocationStoreContext } from 'stores';
import { fetchIssues, createIssue } from 'services/api/issues';

const BacklogPlanning: FunctionalComponent = observer(() => {
    const userLocationStore = useContext(UserLocationStoreContext);

    const [showNewIssueModal, setShowNewIssueModal] = useState<boolean>(false);
    const [issuesArray, setIssuesArray] = useState<Issue[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleIssueCreation = async (newIssue: Issue, projectId: number): Promise<void> => {
        return await createIssue(userLocationStore.currentWorkspace.id, projectId, newIssue).then((error) => {
            if (error) setErrorMessage(error);
            else setIssuesArray((oldData) => [...oldData, newIssue]);
        });
    };

    useEffect(() => {
        fetchIssues(userLocationStore.currentWorkspace.id).then((issues) => {
            setIssuesArray(issues);
        });
    }, [userLocationStore]);

    // Here to fulfill mandatory props until we decide what to do with it
    const updateIssueFilter = (filterFor: string): void => console.log(filterFor);

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
            <IssueFilter setFilter={updateIssueFilter} />

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

            <div class="rounded bg-white overflow-hidden shadow-lg">
                {issuesArray.map((issue, index) => {
                    return <IssueCard key={index} issue={issue} />;
                })}
            </div>
        </div>
    );
});

export default BacklogPlanning;
