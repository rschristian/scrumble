import { FunctionalComponent, h } from 'preact';
import NewIssue from '../../components/Issue/createIssues';
import EditIssue from '../../components/Issue/editIssues';
import DeleteIssue from '../../components/Issue/deleteIssue';
import { IssueCard } from 'components/Cards/issue';
import { Conditional } from 'components/Conditional';
import { IssueFilter } from 'components/Filter/issues';
import { Modal } from 'components/Modal';
import { useState, useEffect } from 'preact/hooks';
import { issues } from 'data';
import { Issue } from 'models/Issue';

const BacklogPlanning: FunctionalComponent = () => {
    const [showNewIssueModal, setShowNewIssueModal] = useState(false);
    const [showEditIssueModal, setShowEditIssueModal] = useState(false);
    const [showDeleteIssueModal, setShowDeleteIssueModal] = useState(false);
    const [currentIssue, setCurrentIssue] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(issues);
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
        <div class={showNewIssueModal ? 'modal-active' : ''}>
            <div class="create-bar">
                <h1 class="page-heading">Backlog Planning</h1>
                <button class="btn-create my-auto" onClick={(): void => setShowNewIssueModal(true)}>
                    New Issue
                </button>
            </div>
            <IssueFilter setFilter={updateIssueFilter} />
            <Conditional if={showNewIssueModal}>
                <Modal
                    title="Create Issue"
                    content={<NewIssue close={(): void => setShowNewIssueModal(false)} addNewIssue={addNewIssue} />}
                    close={(): void => setShowNewIssueModal(false)}
                />
            </Conditional>
            <Conditional if={showEditIssueModal}>
                <Modal
                    title="Edit Issue"
                    content={
                        <EditIssue
                            close={(): void => setShowEditIssueModal(false)}
                            editIssue={editIssue}
                            index={currentIndex}
                            issue={currentIssue}
                        />
                    }
                    close={(): void => setShowEditIssueModal(false)}
                />
            </Conditional>
            <Conditional if={showDeleteIssueModal}>
                <Modal
                    title="Are you sure you want to delete this issue?"
                    content={
                        <DeleteIssue
                            close={(): void => setShowDeleteIssueModal(false)}
                            deleteIssue={deleteIssue}
                            index={currentIndex}
                        />
                    }
                    close={(): void => setShowDeleteIssueModal(false)}
                />
            </Conditional>
            <div class="rounded bg-white overflow-hidden shadow-lg">
                {data.map((issue, index) => {
                    return (
                        <IssueCard
                            key={index}
                            issue={issue}
                            onClick={tempOnClick}
                            index={index}
                            delete={(): void => setShowDeleteIssueModal(true)}
                            edit={(): void => setShowEditIssueModal(true)}
                            setCurrentIndex={(index: number): void => setCurrentIndex(index)}
                            setCurrentIssue={(issue: Issue): void => setCurrentIssue(issue)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default BacklogPlanning;
