import { Fragment, FunctionalComponent, h } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { useSelector } from 'react-redux';
import { notify } from 'react-notify-toast';

import IssueCard from 'components/Cards/Issue/issueCard';
import CreateOrEditIssue from 'components/CreateOrEdit/issue';
import Filter, { FilterType } from 'components/Filters';
import Modal from 'components/Modal';
import { Issue } from 'models/Issue';
import { IssueFilterStatus } from 'models/IssueFilterStatus';
import { apiFetchIssues } from 'services/api/issues';
import { errorColour, infoColour } from 'services/notification/colours';
import { useLtsWarning } from 'services/notification/hooks';
import { RootState } from 'stores';

const IssueList: FunctionalComponent = () => {
    const { currentWorkspace } = useSelector((state: RootState) => state.userLocation);

    const [showNewIssueModal, setShowNewIssueModal] = useState(false);
    const [issueStatusFilter, setIssueStatusFilter] = useState(IssueFilterStatus.unplanned.toString());
    const [issueTermFilter, setIssueTermFilter] = useState('');
    const [issues, setIssues] = useState<Issue[]>([]);

    const projectId = useRef(0);
    const pageNumber = useRef(0);

    const updateIssueFilter = useCallback((filterStatus: string, searchTerm: string): void => {
        projectId.current = 0;
        pageNumber.current = 0;
        setIssueStatusFilter(filterStatus);
        setIssueTermFilter(searchTerm);
    }, []);

    const fetchIssues = useCallback(
        async (append = false) => {
            try {
                const result = await apiFetchIssues(
                    currentWorkspace.id,
                    projectId.current,
                    pageNumber.current,
                    issueStatusFilter,
                    issueTermFilter,
                );

                if (result.issues.length === 0) {
                    notify.show('No issues found for your filter', 'custom', 5000, infoColour);
                } else {
                    if (append) {
                        setIssues((oldValues) => oldValues.concat(result.issues));
                    } else {
                        setIssues(result.issues);
                    }
                    projectId.current = result.nextResource.projectId;
                    pageNumber.current = result.nextResource.pageNumber;
                }
            } catch (error) {
                notify.show(error, 'error', 5000, errorColour);
            }
        },
        [currentWorkspace, issueStatusFilter, issueTermFilter],
    );

    useEffect(() => {
        fetchIssues();
    }, [fetchIssues]);

    function scrollToLoadMore(e: HTMLDivElement): void {
        if (e.scrollHeight - e.scrollTop === e.clientHeight && pageNumber.current !== 0) {
            fetchIssues(true);
        }
    }

    return (
        <Fragment>
            {showNewIssueModal && (
                <Modal
                    title="Create Issue"
                    content={
                        <CreateOrEditIssue submit={useLtsWarning} close={(): void => setShowNewIssueModal(false)} />
                    }
                    close={(): void => setShowNewIssueModal(false)}
                />
            )}

            <div class="md:mr-4 create-bar">
                <h1 class="md:mr-4 page-heading">Backlog</h1>
                <button class="btn-create my-auto" onClick={(): void => setShowNewIssueModal(true)}>
                    New Issue
                </button>
            </div>
            <div class="md:mr-4">
                <Filter filterType={FilterType.issue} setFilter={updateIssueFilter} />
            </div>
            <div
                class="md:mr-4 rounded bg-white overflow-hidden shadow-lg overflow-y-scroll issuesList"
                onScroll={(e): void => scrollToLoadMore(e.target as HTMLDivElement)}
            >
                {issues.map((issue, index) => {
                    return <IssueCard key={index} issue={issue} updateIssue={useLtsWarning} />;
                })}
            </div>
        </Fragment>
    );
};

export default IssueList;
