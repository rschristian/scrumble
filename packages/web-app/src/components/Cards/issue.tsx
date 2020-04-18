import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { notify } from 'react-notify-toast';

import { CreateOrEditIssue } from 'components/CreateOrEdit/issue';
import { Modal } from 'components/Modal';
import { Issue, IssueStatus } from 'models/Issue';
import { editIssue } from 'services/api/issues';
import { observer } from 'services/mobx';
import { errorColour, successColour } from 'services/notification/colours';
import { useStore } from 'stores';
import { User } from 'models/User';

interface IssuesBoardProps {
    issue: Issue;
    updateIssueBoard: (issue: Issue) => void;
}

const unassigned: User = {
    id: 0,
    name: 'Unassigned',
    username: 'unassigned',
    avatarUrl: null,
    projectIds: [],
};
export const IssueBoardCard: FunctionalComponent<IssuesBoardProps> = (props: IssuesBoardProps) => {
    const userLocationStore = useStore().userLocationStore;
    const currentWorkspace = userLocationStore.currentWorkspace;
    const [issueStatus, setIssueStatus] = useState(props.issue.status);

    unassigned.projectIds = currentWorkspace.projectIds;

    const handleUpdate = (issueStatus: string): Issue => {
        return {
            iid: props.issue?.iid || 0,
            status: issueStatus,
            title: props.issue.title,
            description: props.issue.description,
            storyPoint: props.issue.storyPoint,
            projectId: props.issue.projectId,
            projectName: props.issue.projectName,
            author: props.issue.author,
            createdAt: new Date(),
            assignee: props.issue?.assignee || unassigned,
        };
    };
    return (
        <div class="bg-white relative rounded-md shadow-lg m-2 min-h-48 m-4">
            <div class="px-4 py-2 h-40 text-gray-700">
                <p class="capitalize">{props.issue.title}</p>
                <select
                    class="form-input capitalize"
                    value={issueStatus}
                    onInput={(e): void => {
                        setIssueStatus((e.target as HTMLSelectElement).value);
                        props.updateIssueBoard(handleUpdate((e.target as HTMLSelectElement).value));
                    }}
                >
                    {Object.values(IssueStatus).map((issueStatus) => {
                        return (
                            <option class="form-option capitalize" value={issueStatus}>
                                {issueStatus}
                            </option>
                        );
                    })}
                </select>
                <p>
                    <span class="font-semibold">Author:</span> {props.issue.author.name}
                </p>
                <p>
                    <span class="font-semibold">Assignee:</span>{' '}
                    {props.issue.assignee !== null ? props.issue.assignee.name : 'Unassigned'}
                </p>
            </div>
            <div class="bottom-0 left-0 px-4 py-2">
                <div class="flex">
                    {props.issue.storyPoint !== 0 && <span class="story-pnt">{props.issue.storyPoint}</span>}
                    <p class="text-gray-700">
                        {props.issue.projectName} (#{props.issue.iid})
                    </p>
                </div>
            </div>
        </div>
    );
};

interface IProps {
    issue: Issue;
    updateIssue: (issue: Issue) => void;
}

export const IssueCard: FunctionalComponent<IProps> = observer((props: IProps) => {
    const userLocationStore = useStore().userLocationStore;

    const [showEditIssueModal, setShowEditIssueModal] = useState(false);
    const [showIssueCardInformation, setShowIssueCardInformation] = useState(false);

    const handleIssueEdit = async (issue: Issue): Promise<void> => {
        return await editIssue(userLocationStore.currentWorkspace.id, issue).then((error) => {
            if (error) notify.show(error, 'error', 5000, errorColour);
            else {
                notify.show('Issue successfully updated!', 'success', 5000, successColour);
                setShowEditIssueModal(false);
                props.updateIssue(issue);
            }
        });
    };

    return (
        <div class="cursor-default capitalize">
            {showEditIssueModal ? (
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
            ) : null}
            {showIssueCardInformation ? (
                <Modal
                    title={props.issue.title}
                    content={<IssueInformation issue={props.issue} />}
                    close={(): void => setShowIssueCardInformation(false)}
                />
            ) : null}
            <div class="lst-itm-container cursor-move">
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
                        <button
                            className="float-right btn-edit my-auto"
                            onClick={(): void => setShowEditIssueModal(true)}
                        >
                            Edit
                        </button>
                        <span class="float-right text-gray-700 py-2 px-4">
                            <span class="font-medium">Author:</span> {props.issue.author.name}
                        </span>
                        <span class="float-left text-gray-700 py-2">
                            <span class="font-medium">Assignee:</span>{' '}
                            {props.issue.assignee !== null ? props.issue.assignee.name : 'Unassigned'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
});

interface InformationProps {
    issue: Issue;
}
export const IssueInformation: FunctionalComponent<InformationProps> = (props: InformationProps) => {
    return (
        <Fragment>
            <div class="table w-full capitalize">
                <div class="table-row-group">
                    <div class="table-row">
                        <div class="table-cell py-2">
                            <span class="info-label"> Project: </span>
                            <span class="text-gray-700"> {props.issue.projectName} </span>
                        </div>
                        <div class="table-cell py-2">
                            <span class="info-label"> Created At: </span>
                            <span class="text-gray-700"> {props.issue.createdAt} </span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-cell py-2">
                            <span class="info-label"> Created By: </span>
                            <span class="text-gray-700">{props.issue.author.name} </span>
                        </div>
                        <div class="table-cell">
                            <span class="info-label"> Assigned To: </span>
                            <span class="text-gray-700">
                                {props.issue.assignee !== null ? props.issue.assignee.name : 'Unassigned'}
                            </span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-cell py-2">
                            <span class="info-label"> Story Point: </span>
                            <span class="story-pnt"> {props.issue.storyPoint} </span>
                        </div>
                        <div class="table-cell py-2">
                            <span class="info-label"> State: </span>
                            <span class={props.issue.status === IssueStatus.closed ? 'closed' : 'open'}>
                                {props.issue.status === IssueStatus.closed ? 'Closed' : 'Opened'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-2">
                <span class="info-label"> Description: </span>
                <div class="table-row normal-case">
                    <span class="text-gray-700">
                        {props.issue.description.trim() != '' ? (
                            props.issue.description
                        ) : (
                            <span class="italic"> No Description Given</span>
                        )}
                    </span>
                </div>
            </div>
        </Fragment>
    );
};
