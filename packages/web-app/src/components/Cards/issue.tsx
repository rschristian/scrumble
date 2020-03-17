import { FunctionalComponent, h } from 'preact';
import { useContext, useState } from 'preact/hooks';

import { Modal } from 'components/Modal';
import { CreateOrEditIssue } from 'components/Issue/createOrEditIssue';
import { Issue } from 'models/Issue';
import { editIssue, deleteIssue } from 'services/api/issues';
import { observer } from 'services/mobx';
import { WorkspaceStoreContext } from 'stores';
import { User } from 'models/user';
import { issues } from 'data';

export const IssueBoardCard: FunctionalComponent<Issue> = (props: Issue) => {
    return (
        <div class="bg-white relative rounded-md shadow-lg m-2 min-h-48 m-4">
            <div class="px-4 py-2 h-40">
                <p class="">{props.title}</p>
            </div>
            <div class="absolute bottom-0 left-0 px-4 py-2">
                <div class="flex">
                    <span class="story-pnt">{props.storyPoints}</span>
                    <p class="font-hairline text-gray-700">{props.projectId}</p>
                </div>
            </div>
        </div>
    );
};

interface IProps {
    issue: Issue;
    user?: User;
    updateList?: () => void;
}

export const IssueCard: FunctionalComponent<IProps> = observer((props: IProps) => {
    const workspaceStore = useContext(WorkspaceStoreContext);

    const [showEditIssueModal, setShowEditIssueModal] = useState(false);
    const [showDeleteIssueModal, setShowDeleteIssueModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleIssueEdit = async (issue: Issue): Promise<void> => {
        return await editIssue(props.issue.projectId, issue).then((error) => {
            if (error) {
                setErrorMessage(error);
            } else {
                setShowEditIssueModal(false);
                props.updateList();
            }
        });
    };
    const handleIssueDeletion = async (): Promise<void> => {
        return await deleteIssue(props.issue.projectId, props.issue.iid).then((error) => {
            if (error) setErrorMessage(error);
            else setShowDeleteIssueModal(false);
        });
    };
    return (
        <div class="lst-itm-container cursor-move">
            {showEditIssueModal ? (
                <Modal
                    title="Edit Issue"
                    content={
                        <CreateOrEditIssue
                            issue={props.issue}
                            edit={handleIssueEdit}
                            close={(): void => setShowEditIssueModal(false)}
                            error={errorMessage}
                        />
                    }
                    close={(): void => setShowEditIssueModal(false)}
                />
            ) : showDeleteIssueModal ? (
                <Modal
                    title="Are you sure you want to delete this issue?"
                    content={<div className="error">{errorMessage}</div>}
                    submit={async (): Promise<void> => await handleIssueDeletion()}
                    close={(): void => setShowDeleteIssueModal(false)}
                />
            ) : null}
            <div class="px-4 py-2 flex min-w-0">
                <div class="truncate">{props.issue.title}</div>
            </div>
            <div class="px-4 py-2 z-1">
                {props.issue.storyPoints.length === 0 ? null : <span class="story-pnt">{props.issue.storyPoints}</span>}
                <span class="text-gray-700"> Project ID: {props.issue.projectId}</span>
                {props.updateList != undefined ? (
                    <div>
                        <button
                            className="float-right btn-edit my-auto"
                            onClick={(): void => {
                                setShowEditIssueModal(true);
                                setErrorMessage('');
                            }}
                        >
                            Edit
                        </button>
                        <button
                            disabled={props.user.isAdmin === undefined}
                            class={
                                props.user.isAdmin === undefined
                                    ? 'float-right btn-disable my-auto'
                                    : 'float-right btn-delete my-auto'
                            }
                            title={
                                props.user.isAdmin === undefined
                                    ? 'You do not have permisson to delete this issue'
                                    : null
                            }
                            onClick={(): void => {
                                setShowDeleteIssueModal(true);
                                setErrorMessage('');
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
});
