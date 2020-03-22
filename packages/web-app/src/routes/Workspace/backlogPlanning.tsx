import { FunctionalComponent, h } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

import { IssueCard } from 'components/Cards/issue';
import { CreateOrEditIssue } from 'components/Issue/createOrEditIssue';
import { Modal } from 'components/Modal';
import { Issue } from 'models/Issue';
import { createIssue, fetchWorkspaceIssues } from 'services/api/issues';
import { observer } from 'services/mobx';
import { WorkspaceStoreContext } from 'stores';
import { IssueFilter } from 'components/Filter/issues';

const BacklogPlanning: FunctionalComponent = observer(() => {
    const workspaceStore = useContext(WorkspaceStoreContext);

    const [showNewIssueModal, setShowNewIssueModal] = useState(false);
    const [issuesArray, setIssuesArray] = useState<Issue[]>([]);
    const [issueFilter, setIssueFilter] = useState<string>('all');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [currentPageNum, setCurrentPageNum] = useState<number>(0);
    const [currentProjectId, setCurrentProjectId] = useState<number>(0);
    const [areMoreIssues, setAreMoreIssues] = useState<boolean>(true);

    const updateIssueFilter = (filterFor: string): void => {
        setCurrentPageNum(0);
        setCurrentProjectId(0);
        setIssuesArray([]);
        setIssueFilter(filterFor);
    };

    useEffect(() => {
        fetchMore();
    }, [issueFilter]);

    const handleIssueCreation = async (newIssue: Issue, projectId: number): Promise<void> => {
        return await createIssue(workspaceStore.currentWorkspace, projectId, newIssue).then((error) => {
            if (error) setErrorMessage(error);
            else setIssuesArray((oldData) => [...oldData, newIssue]);
        });
    };

    const fetchMore = () => {
        fetchWorkspaceIssues(23, issueFilter, currentProjectId, currentPageNum).then((issuePagination) => {
            setIssuesArray(issuesArray.concat(issuePagination.issues));
            const projectId = issuePagination.projectPageData.projectId;
            const pageNumber = issuePagination.projectPageData.pageNumber;

            if (projectId == 0 && pageNumber == 0) {
                setAreMoreIssues(false);
            } else {
                setCurrentProjectId(projectId);
                setCurrentPageNum(pageNumber);
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
            <IssueFilter setFilter={updateIssueFilter} />

            <div class="w-full">
                <button class={`btn-create ${areMoreIssues ? 'block' : 'block'}`} onClick={fetchMore}>
                    Fetch 100 more
                </button>
            </div>

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
