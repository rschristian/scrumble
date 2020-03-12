import { FunctionalComponent, h } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';
import { observer as mobxObserver } from 'mobx-react-lite';

import { IssueCard } from 'components/Cards/issue';
import { IssueFilter } from 'components/Filter/issues';
import { CreateOrEditIssue } from 'components/Issue/createOrEditIssue';
import { Modal } from 'components/Modal';
import { issues } from 'data';
import { Issue } from 'models/Issue';
import { createIssue } from 'services/api/issues';
import { WorkspaceStoreContext } from 'stores';

function observer<P>(props: P): any {
    return mobxObserver(props as any);
}

const BacklogPlanning: FunctionalComponent = observer(() => {
    const workspaceStore = useContext(WorkspaceStoreContext);

    const [showNewIssueModal, setShowNewIssueModal] = useState(false);
    const [issuesArray, setIssuesArray] = useState<Issue[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        setIssuesArray(issues);
    }, []);

    const handleIssueCreation = async (projectId: number, newIssue: Issue): Promise<void> => {
        return await createIssue(workspaceStore.currentWorkspace, projectId, newIssue).then((error) => {
            if (error) setErrorMessage(error);
            else setIssuesArray((oldData) => [...oldData, newIssue]);
        });
    };

    // Both here to fulfill mandatory props until we decide what to do with them
    const tempOnClick = (): void => console.log('clicked');
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
                    return <IssueCard key={index} issue={issue} onClick={tempOnClick} />;
                })}
            </div>
        </div>
    );
});

export default BacklogPlanning;
