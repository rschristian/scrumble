import { FunctionalComponent, h } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { notify } from 'react-notify-toast';

import { IssueCard } from 'components/Cards/issue';
import { CreateOrEditIssue } from 'components/CreateOrEdit/issue';
import { IssueFilter } from 'components/Filter/issue';
import { Modal } from 'components/Modal';
import { Issue, IssueStatus } from 'models/Issue';
import { createIssue, getIssues } from 'services/api/issues';
import { errorColour, successColour } from 'services/notification/colours';
import { useStore } from 'stores';

const Backlog: FunctionalComponent = () => {
    const currentWorkspace = useStore().userLocationStore.currentWorkspace;

    const [showNewIssueModal, setShowNewIssueModal] = useState(false);

    const [issueFilter, setIssueFilter] = useState(IssueStatus.open.toString());
    const [issueFilterTerm, setIssueFilterTerm] = useState('');

    const [issuesArray, setIssuesArray] = useState<Issue[]>([]);
    const projectId = useRef(0);
    const pageNumber = useRef(0);

    const handleIssueCreation = async (newIssue: Issue, projectId: number): Promise<void> => {
        return await createIssue(currentWorkspace.id, projectId, newIssue).then((error) => {
            if (error) notify.show(error, 'error', 5000, errorColour);
            else {
                notify.show('New issue created!', 'success', 5000, successColour);
                updateIssueFilter(issueFilter, issueFilterTerm);
            }
        });
    };

    const updateIssueFilter = useCallback((filterStatus: string, searchTerm: string): void => {
        projectId.current = 0;
        pageNumber.current = 0;
        setIssuesArray([]);
        setIssueFilter(filterStatus);
        setIssueFilterTerm(searchTerm);
    }, []);

    const fetchIssues = useCallback((): void => {
        getIssues(currentWorkspace.id, projectId.current, pageNumber.current, issueFilter, issueFilterTerm).then(
            (result) => {
                if (typeof result == 'string') notify.show(result, 'error', 5000, errorColour);
                else if (result.nextResource.pageNumber !== 0) {
                    setIssuesArray((oldValues) => oldValues.concat(result.issues));
                    projectId.current = result.nextResource.projectId;
                    pageNumber.current = result.nextResource.pageNumber;
                }
            },
        );
    }, [currentWorkspace.id, issueFilter, issueFilterTerm]);

    useEffect(() => {
        fetchIssues();
    }, [fetchIssues]);

    const scrollCheck = (e: HTMLDivElement): void => {
        if (e.scrollHeight - e.scrollTop === e.clientHeight) fetchIssues();
    };

    return (
        <div class={showNewIssueModal ? 'modal-active' : ''}>
            {showNewIssueModal ? (
                <Modal
                    title="Create Issue"
                    content={
                        <CreateOrEditIssue
                            submit={handleIssueCreation}
                            close={(): void => setShowNewIssueModal(false)}
                        />
                    }
                    close={(): void => setShowNewIssueModal(false)}
                />
            ) : null}

            <div class="create-bar">
                <h1 class="page-heading">Backlog Planning</h1>
                <button class="btn-create my-auto" onClick={(): void => setShowNewIssueModal(true)}>
                    New Issue
                </button>
            </div>
            <div>
                <IssueFilter setFilter={updateIssueFilter} />
            </div>
            <div
                class="rounded bg-white overflow-hidden shadow-lg overflow-y-scroll issuesList"
                onScroll={(e): void => scrollCheck(e.target as HTMLDivElement)}
            >
                {issuesArray.map((issue, index) => {
                    return <IssueCard key={index} issue={issue} refresh={fetchIssues} />;
                })}
            </div>
        </div>
    );
};

export default Backlog;
