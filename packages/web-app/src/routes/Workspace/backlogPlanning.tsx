import { FunctionalComponent, h } from 'preact';
import NewIssue from './createIssues';
import EditIssue from './editIssues';
import DeleteIssue from './deleteIssue';
import { IssueCard } from 'components/Cards/issue';
import { Conditional } from 'components/Conditional';
import { IssueFilter } from 'components/Filter/issues';
import { Modal } from 'components/Modal';
import { useState, useEffect } from 'preact/hooks';
import { issues } from 'data';
import { Issue } from 'models/Issue';

const BacklogPlanning: FunctionalComponent = () => {
    const [ShowNewIssueModal, SetShowNewIssueModal] = useState(false);
    const [ShowEditIssueModal, SetShowEditIssueModal] = useState(false);
    const [ShowDeleteIssueModal, SetShowDeleteIssueModal] = useState(false);
    const [CurrentIssue, SetCurrentIssue] = useState(null);
    const [CurrentIndex, SetCurrentIndex] = useState(null);
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
        <div className={ShowNewIssueModal ? 'modal-active' : ''}>
            <div className="create-bar">
                <h1 className="page-heading">Backlog Planning</h1>
                <button className="btn-create my-auto" onClick={(): void => SetShowNewIssueModal(true)}>
                    New Issue
                </button>
            </div>
            <IssueFilter setFilter={updateIssueFilter} />
            <Conditional if={ShowNewIssueModal}>
                <Modal
                    title="Create Issue"
                    content={<NewIssue close={(): void => SetShowNewIssueModal(false)} addNewIssue={addNewIssue} />}
                    close={(): void => SetShowNewIssueModal(false)}
                />
            </Conditional>
            <Conditional if={ShowEditIssueModal}>
                <Modal
                    title="Edit Issue"
                    content={
                        <EditIssue
                            close={(): void => SetShowEditIssueModal(false)}
                            editIssue={editIssue}
                            issue={CurrentIssue}
                        />
                    }
                    close={(): void => SetShowEditIssueModal(false)}
                />
            </Conditional>
            <Conditional if={ShowDeleteIssueModal}>
                <Modal
                    title="Are you sure you want to delete this issue?"
                    content={
                        <DeleteIssue
                            close={(): void => SetShowDeleteIssueModal(false)}
                            deleteIssue={deleteIssue}
                            index={CurrentIndex}
                        />
                    }
                    close={(): void => SetShowDeleteIssueModal(false)}
                />
            </Conditional>
            <div className="rounded bg-white overflow-hidden shadow-lg">
                {data.map((issue, index) => {
                    return (
                        <IssueCard
                            key={index}
                            issue={issue}
                            onClick={tempOnClick}
                            index={index}
                            delete={(): void => SetShowDeleteIssueModal(true)}
                            edit={(): void => SetShowEditIssueModal(true)}
                            CurrentIndex={(index: number): void => SetCurrentIndex(index)}
                            CurrentIssue={(issue: Issue): void => SetCurrentIssue(issue)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default BacklogPlanning;
