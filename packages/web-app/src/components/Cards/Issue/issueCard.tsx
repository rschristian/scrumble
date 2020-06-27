import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { useSelector } from 'react-redux';
import { notify } from 'react-notify-toast';

import CreateOrEditIssue from 'components/CreateOrEdit/issue';
import Modal from 'components/Modal';
import { Issue, IssueStatus } from 'models/Issue';
import { apiUpdateIssue } from 'services/api/issues';
import { errorColour, successColour } from 'services/notification/colours';
import { RootState } from 'stores';

import IssueInformation from './issueInformation';

interface IProps {
    issue: Issue;
    updateIssue: (issue: Issue) => void;
}

const IssueCard: FunctionalComponent<IProps> = (props: IProps) => {
    const { currentWorkspace } = useSelector((state: RootState) => state.userLocation);

    const [showEditIssueModal, setShowEditIssueModal] = useState(false);
    const [showIssueCardInformation, setShowIssueCardInformation] = useState(false);

    const handleIssueEdit = async (updatedIssue: Issue): Promise<void> => {
        const result = await apiUpdateIssue(currentWorkspace.id, updatedIssue);
        if (result) notify.show(result, 'error', 5000, errorColour);
        else {
            notify.show('Issue successfully updated!', 'success', 5000, successColour);
            setShowEditIssueModal(false);
            props.updateIssue(updatedIssue);
        }
    };

    return (
        <div class="cursor-default capitalize">
            {showEditIssueModal && (
                <Modal
                    title="Edit Issue"
                    content={
                        <CreateOrEditIssue
                            issue={props.issue}
                            submit={handleIssueEdit}
                            close={(): void => setShowEditIssueModal(false)}
                        />
                    }
                    close={(): void => setShowEditIssueModal(false)}
                />
            )}
            {showIssueCardInformation && (
                <Modal
                    title={props.issue.title}
                    content={<IssueInformation issue={props.issue} />}
                    close={(): void => setShowIssueCardInformation(false)}
                />
            )}
            <div class="lst-itm-container cursor-default">
                <div class="px-4 py-2 flex min-w-0">
                    <div
                        class="truncate cursor-pointer underline font-semibold hover:text-blue-500"
                        onClick={(): void => {
                            setShowIssueCardInformation(true);
                        }}
                    >
                        {props.issue.title}
                    </div>
                </div>
                <div class="px-4 py-2 z-1">
                    <span class={props.issue.status === IssueStatus.closed ? 'closed' : 'open'}>
                        {props.issue.status === IssueStatus.closed ? 'Closed' : 'Opened'}
                    </span>
                    {props.issue.storyPoint !== 0 && <span class="story-pnt">{props.issue.storyPoint}</span>}
                    <span class="text-gray-700"> Project Name: {props.issue.projectName}</span>
                    <div>
                        <button class="float-right btn-edit my-auto" onClick={(): void => setShowEditIssueModal(true)}>
                            Edit
                        </button>
                        <span class="float-right text-gray-700 py-2 px-4">
                            <span class="font-medium">Author:</span> {props.issue.author.name}
                        </span>
                        <span class="float-left text-gray-700 py-2">
                            <span class="font-medium">Assignee:</span>{' '}
                            {props.issue.assignee?.name ? props.issue.assignee.name : 'Unassigned'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueCard;
