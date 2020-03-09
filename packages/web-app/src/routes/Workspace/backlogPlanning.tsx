import { Fragment, FunctionalComponent, h } from 'preact';
import NewIssue from './createIssues';
import EditIssue from './editIssues';
import { IssueListItem } from 'components/ListItems/issue';
import { IssueCard } from 'components/Cards/issue';
import { Conditional } from 'components/Conditional';
import { IssueFilter } from 'components/Filter/issues';
import { Modal } from 'components/Modal';
import { issues } from 'data';
import { useState } from 'preact/hooks';
import issueStore from 'stores/issueStore';
import { Issue } from 'models/Issue';

function observer<p>(props: p): any {
    return mobxObserver(props as any);
}

const BacklogPlanning: FunctionalComponent = observer(() => {
    const [newIssue, setNewIssue] = useState(false);
    const [editIssue, setEditIssue] = useState(false);
    const [currentEditingIssue, setCurrentEdittingIssue] = useState(null);

    const tempOnClick = (): void => console.log('clicked');

    const updateIssueFilter = (filterFor: string): void => console.log(filterFor);

    return (
        <div className={newIssue ? 'modal-active' : ''}>
            <div className="create-bar">
                <h1 className="page-heading">Backlog Planning</h1>
                <button className="btn-create my-auto" onClick={(): void => setNewIssue(true)}>
                    New Issue
                </button>
            </div>
            <IssueFilter />
            <Conditional if={newIssue}>
                <Modal
                    title="Create Issue"
                    content={<NewIssue close={(): void => setNewIssue(false)} store={issueStore} />}
                    close={(): void => setNewIssue(false)}
                />
            </Conditional>
            <Conditional if={editIssue}>
                <Modal
                    title="Edit Issue"
                    content={
                        <EditIssue
                            close={(): void => setEditIssue(false)}
                            store={issueStore}
                            issue={currentEditingIssue}
                        />
                    }
                    close={(): void => setEditIssue(false)}
                />
            </Conditional>
            <div className="rounded bg-white overflow-hidden shadow-lg">
                {issueStore.issues.map((issue, index) => {
                    return (
                        <IssueListItem
                            key={index}
                            id={issue.id}
                            name={issue.name}
                            description={issue.description}
                            storyPoint={issue.storyPoint}
                            project={issue.project}
                            store={issueStore}
                            index={index}
                            edit={(): void => setEditIssue(true)}
                            editing={(issue: Issue): void => setCurrentEdittingIssue(issue)}
                        />
                    );
                })}
            </div>
        </div>
    );
});

export default BacklogPlanning;
