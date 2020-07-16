import { Fragment, FunctionalComponent, h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useSelector } from 'react-redux';

import { CreateOrEditIssue } from 'components/CreateOrEdit/issue';
import { Modal } from 'components/Modal';
import { Issue, IssueStatus } from 'models/Issue';
import { User } from 'models/User';
import { RootState } from 'stores';
import { useLtsWarning } from 'services/notification/hooks';

interface IssuesBoardProps {
    issues: Issue[];
    status: string;
    headingColour: string;
    updateIssueBoard: (issue: Issue) => void;
}

const unassigned: User = {
    id: 0,
    name: 'Unassigned',
    username: 'unassigned',
    avatarUrl: null,
    projectIds: [],
};

export const IssueBoardCardList: FunctionalComponent<IssuesBoardProps> = (props: IssuesBoardProps) => {
    const { currentWorkspace } = useSelector((state: RootState) => state.userLocation);

    const [issuesList, setIssueList] = useState<Issue[]>([]);

    unassigned.projectIds = currentWorkspace.projectIds;

    useEffect(() => {
        props.issues.map((issue) => {
            if (issue.status === props.status && !issuesList.includes(issue)) {
                setIssueList((oldValues) => oldValues.concat(issue));
            }
        });
    }, [props.issues]);

    const handleUpdate = (updatedIssue: Issue): Issue => {
        const arrayCopy: Issue[] = [...issuesList];
        issuesList.forEach((issue: Issue, index) => {
            if (issue.iid === updatedIssue.iid) {
                arrayCopy.splice(index, 1);
                setIssueList(arrayCopy);
            }
        });
        return {
            iid: updatedIssue.iid || 0,
            status: updatedIssue.status,
            title: updatedIssue.title,
            description: updatedIssue.description,
            storyPoint: updatedIssue.storyPoint,
            projectId: updatedIssue.projectId,
            projectName: updatedIssue.projectName,
            author: updatedIssue.author,
            createdAt: new Date(),
            assignee: updatedIssue?.assignee || unassigned,
        };
    };

    return (
        <div class="issue-list">
            <div class={`issue-list-title-holder ${props.headingColour}`}>
                <h2 class="capitalize issue-list-title border-l border-deep-space-sparkle">{props.status}</h2>
            </div>
            {issuesList.map((issue) => {
                return (
                    <div class="bg-white relative rounded-md shadow-lg m-2 m-4">
                        <div class="px-4 py-2 text-gray-700">
                            <p class="capitalize">{issue.title}</p>
                            <select
                                class="form-input capitalize"
                                value={issue.status}
                                onInput={(e): void => {
                                    issue.status = (e.target as HTMLSelectElement).value;
                                    props.updateIssueBoard(handleUpdate(issue));
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
                                <span class="font-semibold">Author:</span> {issue.author.name}
                            </p>
                            <p>
                                <span class="font-semibold">Assignee:</span>{' '}
                                {issue.assignee !== null ? issue.assignee.name : 'Unassigned'}
                            </p>
                        </div>
                        <div class="bottom-0 left-0 px-4 py-2">
                            <div class="flex">
                                {issue.storyPoint !== 0 && <span class="story-pnt">{issue.storyPoint}</span>}
                                <p class="text-gray-700">
                                    {issue.projectName} (#{issue.iid})
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

interface IProps {
    issue: Issue;
}

export const IssueCard: FunctionalComponent<IProps> = (props: IProps) => {
    const [showEditIssueModal, setShowEditIssueModal] = useState(false);
    const [showIssueCardInformation, setShowIssueCardInformation] = useState(false);

    return (
        <div class="cursor-default capitalize">
            {showEditIssueModal && (
                <Modal
                    title="Edit Issue"
                    content={
                        <CreateOrEditIssue
                            issue={props.issue}
                            submit={useLtsWarning}
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
};

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
