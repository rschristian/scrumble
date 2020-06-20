import { Fragment, FunctionalComponent, h } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { notify } from 'react-notify-toast';

import { IssueCard } from 'components/Cards/issue';
import { CreateOrEditIssue } from 'components/CreateOrEdit/issue';
import { IssueFilter } from 'components/Filter/issue';
import { Modal } from 'components/Modal';
import { Issue, IssueStatus } from 'models/Issue';
import { createIssue, getIssues } from 'services/api/issues';
import { errorColour, infoColour, successColour } from 'services/notification/colours';
import { RootState } from 'stores';

const Backlog: FunctionalComponent = () => {
    const { currentWorkspace } = useSelector((state: RootState) => state.userLocation);

    const [showNewIssueModal, setShowNewIssueModal] = useState(false);

    const [issueFilter, setIssueFilter] = useState(IssueStatus.open.toString());
    const [issueFilterTerm, setIssueFilterTerm] = useState('');

    const [issuesArray, setIssuesArray] = useState<Issue[]>([]);
    const projectId = useRef(0);
    const pageNumber = useRef(0);

    const handleIssueCreation = async (newIssue: Issue): Promise<void> => {
        return await createIssue(currentWorkspace.id, newIssue).then((result) => {
            if (typeof result == 'string') notify.show(result, 'error', 5000, errorColour);
            else {
                notify.show('New issue created!', 'success', 5000, successColour);
                setShowNewIssueModal(false);
                updateIssue(result);
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
                else if (result.issues.length == 0)
                    notify.show('No issues found for your filter', 'custom', 5000, infoColour);
                else {
                    setIssuesArray((oldValues) => oldValues.concat(result.issues));
                    projectId.current = result.nextResource.projectId;
                    pageNumber.current = result.nextResource.pageNumber;
                }
            },
        );
    }, [currentWorkspace.id, issueFilter, issueFilterTerm]);

    const updateIssue = (updatedIssue: Issue): void => {
        const arrayCopy = [...issuesArray];
        const found = arrayCopy.some((issue) => updatedIssue.iid === issue.iid);
        if (found) {
            issuesArray.forEach((issue: Issue, index) => {
                if (issue.iid === updatedIssue.iid) {
                    updatedIssue.createdAt = DateTime.local().toLocaleString();
                    arrayCopy[index] = updatedIssue;
                    setIssuesArray(arrayCopy);
                }
            });
        } else {
            arrayCopy.unshift(updatedIssue);
            setIssuesArray(arrayCopy);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, [fetchIssues]);

    const scrollCheck = (e: HTMLDivElement): void => {
        if (e.scrollHeight - e.scrollTop === e.clientHeight && pageNumber.current !== 0) fetchIssues();
    };

    return (
        <Fragment>
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

            <div class="md:mr-4 create-bar">
                <h1 class="page-heading">Backlog</h1>
                <button class="btn-create my-auto" onClick={(): void => setShowNewIssueModal(true)}>
                    New Issue
                </button>
            </div>
            <div class="md:mr-4">
                <IssueFilter setFilter={updateIssueFilter} />
            </div>
            <div
                class="md:mr-4 rounded bg-white overflow-hidden shadow-lg overflow-y-scroll issuesList"
                onScroll={(e): void => scrollCheck(e.target as HTMLDivElement)}
            >
                {issuesArray.map((issue, index) => {
                    return <IssueCard key={index} issue={issue} updateIssue={updateIssue} />;
                })}
            </div>
        </Fragment>
    );
};

export default Backlog;
