import { Fragment, FunctionalComponent, h } from 'preact';
import NewIssue from './createIssues';
import EditIssue from './editIssues';
import { IssueListItem } from 'components/ListItems/issue';
import { IssueCard } from 'components/Cards/issue';
import { Conditional } from 'components/Conditional';
import { IssueFilter } from 'components/Filter/issues';
import { Modal } from 'components/Modal';
import { useState, useEffect } from 'preact/hooks';
import { issues } from 'data';
import { Conditional } from 'components/Conditional';
import { Issue } from 'models/Issue';

const BacklogPlanning: FunctionalComponent = () => {
    const [newIssue, setNewIssue] = useState(false);
    const [edittingIssue, setEdittingIssue] = useState(false);
    const [currentEditingIssue, setCurrentEdittingIssue] = useState(null);
    const [data, SetData] = useState([]);

    useEffect(() => {
        SetData(issues);
    }, []);
    const addNewIssue = (value: Issue): void => {
        data.push(value);
    };
    const deleteIssue = (value: number): void => {
        data.splice(value, 1);
    };
    const editIssue = (index: number, issue: Issue): void => {
        data[index] = issue;
    };

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
                    content={<NewIssue close={(): void => setNewIssue(false)} addNewIssue={addNewIssue} />}
                    close={(): void => setNewIssue(false)}
                />
            </Conditional>
            <Conditional if={edittingIssue}>
                <Modal
                    title="Edit Issue"
                    content={
                        <EditIssue
                            close={(): void => setEdittingIssue(false)}
                            editIssue={editIssue}
                            issue={currentEditingIssue}
                        />
                    }
                    close={(): void => setEdittingIssue(false)}
                />
            </Conditional>
            <div className="rounded bg-white overflow-hidden shadow-lg">
                {data.map((issue, index) => {
                    return (
                        <IssueListItem
                            key={index}
                            id={issue.id}
                            name={issue.name}
                            description={issue.description}
                            storyPoint={issue.storyPoint}
                            project={issue.project}
                            index={index}
                            deleteIssue={deleteIssue}
                            edit={(): void => setEdittingIssue(true)}
                            editing={(issue: Issue): void => setCurrentEdittingIssue(issue)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default BacklogPlanning;
