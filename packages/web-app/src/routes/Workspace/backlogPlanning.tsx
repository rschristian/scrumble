import { FunctionalComponent, h } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

import { IssueCard } from 'components/Cards/issue';
import ReactPaginate from 'react-paginate';
import { CreateOrEditIssue } from 'components/Issue/createOrEditIssue';
import { Modal } from 'components/Modal';
import { Issue } from 'models/Issue';
import { createIssue, fetchWorkspaceIssues } from 'services/api/issues';
import { observer } from 'services/mobx';
import { WorkspaceStoreContext } from 'stores';
import { IssueFilter } from '../../components/Filter/issues';

interface PageSelected {
    selected: number;
}

const BacklogPlanning: FunctionalComponent = observer(() => {
    const workspaceStore = useContext(WorkspaceStoreContext);

    const [showNewIssueModal, setShowNewIssueModal] = useState(false);
    const [issuesArray, setIssuesArray] = useState<Issue[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [currentPageNum, setCurrentPageNum] = useState<number>(1);
    const [totalIssues, setTotalIssues] = useState<number>(1);
    const [numOfPages, setNumOfPages] = useState<number>(1);

    useEffect(() => {
        fetchWorkspaceIssues(currentPageNum).then((issuePagination) => {
            setIssuesArray(issuePagination.issues);
            setTotalIssues(issuePagination.pageData.total);
            setNumOfPages(issuePagination.pageData.numberOfPages);
        });
    }, [currentPageNum]);

    const handleIssueCreation = async (newIssue: Issue, projectId: number): Promise<void> => {
        return await createIssue(workspaceStore.currentWorkspace, projectId, newIssue).then((error) => {
            if (error) setErrorMessage(error);
            else setIssuesArray((oldData) => [...oldData, newIssue]);
        });
    };

    const handlePageChange = (pageSelected: PageSelected) => {
        setCurrentPageNum(pageSelected.selected + 1);
    };

    // Both here to fulfill mandatory props until we decide what to do with them
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

            <div class="w-full">
                <span>Total Issues: {totalIssues}</span>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={numOfPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={'flex items-baseline'}
                    breakClassName={'btn-pagination'}
                    pageClassName={'btn-pagination'}
                    activeClassName={'btn-pagination-active'}
                    previousClassName={'btn-page-move'}
                    nextClassName={'btn-page-move'}
                />
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
