import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { IssueCard } from 'components/Cards/issue';
import { Conditional } from 'components/Conditional';
import { IssueFilter } from 'components/Filter/issues';
import { Modal } from 'components/Modal';
import { issues } from 'data';

const BacklogPlanning: FunctionalComponent = () => {
    const [showModal, setShowModal] = useState(false);

    const tempOnClick = (): void => console.log('clicked');

    const updateIssueFilter = (filterFor: string): void => console.log(filterFor);

    return (
        <div class={showModal ? 'modal-active' : ''}>
            <div class="create-bar">
                <h1 class="page-heading">Backlog Planning</h1>
                <button class="btn-create my-auto" onClick={(): void => setShowModal(true)}>
                    New Issue
                </button>
            </div>
            <IssueFilter setFilter={updateIssueFilter} />
            <Conditional if={showModal}>
                <Modal
                    title="Create Issue"
                    content={<div>Test Test Test</div>}
                    submit={(): void => setShowModal(false)}
                    close={(): void => setShowModal(false)}
                />
            </Conditional>
            <div class="rounded bg-white overflow-hidden shadow-lg">
                {issues.map((issue, index) => {
                    return <IssueCard key={index} issue={issue} onClick={tempOnClick} />;
                })}
            </div>
        </div>
    );
};

export default BacklogPlanning;
