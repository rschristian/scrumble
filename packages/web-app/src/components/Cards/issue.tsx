import { FunctionalComponent, h } from 'preact';
import { useContext, useState } from 'preact/hooks';

import { Modal } from 'components/Modal';
import { CreateOrEditIssue } from 'components/Issue/createOrEditIssue';
import { Issue } from 'models/Issue';
import { editIssue } from 'services/api/issues';
import { observer } from 'services/mobx';
import { WorkspaceStoreContext } from 'stores';
import { User } from 'models/user';

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
    return (
        <div class="lst-itm-container cursor-move">
            {showEditIssueModal ? (
                <Modal
                    title="Edit Issue"
                    content={
                        <CreateOrEditIssue
                            issue={props.issue}
                            submit={handleIssueEdit}
                            edit={true}
                            close={(): void => setShowEditIssueModal(false)}
                            error={errorMessage}
                        />
                    }
                    close={(): void => setShowEditIssueModal(false)}
                />
            ) : null}
            <div class="px-4 py-2 flex min-w-0">
                <div class="truncate">{props.issue.title}</div>
            </div>
            <div class="px-4 py-2 z-1">
                {props.issue.storyPoints !== undefined && <span class="story-pnt">{props.issue.storyPoints}</span>}
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
                    </div>
                ) : null}
            </div>
        </div>
    );
});
