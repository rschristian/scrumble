import { FunctionalComponent, h } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

import { IssueCard } from 'components/Cards/issue';
import { IssueFilter } from 'components/Filter/issues';
import { CreateOrEditIssue } from 'components/Issue/createOrEditIssue';
import { Modal } from 'components/Modal';
import { Issue } from 'models/Issue';
import { observer } from 'services/mobx';
import { WorkspaceStoreContext } from 'stores';
import { fetchIssues, createIssue } from 'services/api/issues';
import { fetchUserInfo, fetchSpecificUser } from 'services/api/auth';
import { User } from 'models/user';

const BacklogPlanning: FunctionalComponent = observer(() => {
    const workspaceStore = useContext(WorkspaceStoreContext);
    const [showNewIssueModal, setShowNewIssueModal] = useState(false);
    const [issuesArray, setIssuesArray] = useState<Issue[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [user, setUser] = useState<User>(null);

    const handleIssueCreation = async (newIssue: Issue, projectId: number): Promise<void> => {
        return await createIssue(projectId, newIssue).then((error) => {
            if (error) {
                setErrorMessage(error);
            } else {
                setIssuesArray((oldData) => [...oldData, newIssue]);
                setShowNewIssueModal(false);
                updateIssues();
            }
        });
    };

    const updateIssues = () => {
        const issueArray: Issue[] = [];
        fetchIssues().then((response) => {
            response.forEach((issue: any) => {
                const newIssue: Issue = {
                    iid: issue.iid,
                    title: issue.title,
                    description: issue.description,
                    storyPoints: issue.labels[0],
                    projectId: issue.project_id,
                };
                issueArray.push(newIssue);
                setIssuesArray(issueArray);
            });
        });
    };

    useEffect(() => {
        fetchUserInfo().then((response) => {
            const user: User = {
                id: response.sub,
                name: response.name,
                username: response.nickname,
            };
            setUser(user);
            getUserDetails();
        });
        fetchIssues().then((response) => {
            response.forEach((issue: any) => {
                const newIssue: Issue = {
                    iid: issue.iid,
                    title: issue.title,
                    description: issue.description,
                    storyPoints: issue.labels[0],
                    projectId: issue.project_id,
                };
                setIssuesArray((oldData) => [...oldData, newIssue]);
            });
        });
    }, []);

    const getUserDetails = () => {
        fetchSpecificUser(user.id).then((response) => {
            const user: User = {
                id: response.id,
                name: response.name,
                username: response.username,
                isAdmin: response.is_admin,
            };
            setUser(user);
        });
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
                    return <IssueCard key={index} issue={issue} updateList={updateIssues} user={user} />;
                })}
            </div>
        </div>
    );
});

export default BacklogPlanning;
