import { FunctionalComponent, h } from 'preact';

import { IssueListItem } from 'components/ListItems/issue';
import { IssueFilter } from 'components/Filter/issues';
import { issues } from 'data';
import { Modal } from 'components/Modal';
import { useState } from 'preact/hooks';
import { Conditional } from 'components/Conditional';

const BacklogPlanning: FunctionalComponent = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className={showModal ? 'modal-active' : ''}>
            <div className="create-bar">
                <h1 className="page-heading">Backlog Planning</h1>
                <button className="btn-create my-auto" onClick={(): void => setShowModal(true)}>
                    New Issue
                </button>
            </div>
            <IssueFilter />
            <Conditional if={showModal}>
                <Modal
                    title="Create Issue"
                    content={<div>Test Test Test</div>}
                    submit={(): void => {
                        setShowModal(false);
                    }}
                    close={(): void => setShowModal(false)}
                />
            </Conditional>
            <div className="rounded bg-white overflow-hidden shadow-lg">
                {issues.map((issue, index) => {
                    return (
                        <IssueListItem
                            key={index}
                            id={issue.id}
                            name={issue.name}
                            description={issue.description}
                            storyPoint={issue.storyPoint}
                            project={issue.project}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default BacklogPlanning;
