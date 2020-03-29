import { FunctionalComponent, h } from 'preact';
import { useContext, useState } from 'preact/hooks';

import { CreateOrEditIssue } from 'components/CreateOrEditIssue';
import { Modal } from 'components/Modal';
import { Issue } from 'models/Issue';
import { editIssue } from 'services/api/issues';
import { observer } from 'services/mobx';
import { UserLocationStoreContext } from 'stores';

export const IssueBoardCard: FunctionalComponent<Issue> = (props: Issue) => {
    return (
        <div class="bg-white relative rounded-md shadow-lg m-2 min-h-48 m-4">
            <div class="px-4 py-2 h-40">
                <p class="">{props.title}</p>
            </div>
            <div class="absolute bottom-0 left-0 px-4 py-2">
                <div class="flex">
                    <span class="story-pnt">{props.storyPoint}</span>
                    <p class="font-hairline text-gray-700">{props.projectId}</p>
                </div>
            </div>
        </div>
    );
};

interface IProps {
    issue: Issue;
}

export const IssueCard: FunctionalComponent<IProps> = observer((props: IProps) => {
    const userLocationStore = useContext(UserLocationStoreContext);

    const [showEditIssueModal, setShowEditIssueModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleIssueEdit = async (issue: Issue): Promise<void> => {
        return await editIssue(
            userLocationStore.currentWorkspace.id,
            props.issue.projectId,
            props.issue.iid,
            issue,
        ).then((error) => {
            if (error) setErrorMessage(error);
            else setShowEditIssueModal(false);
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
                <span class="story-pnt">{props.issue.storyPoint}</span>
                <span class="text-gray-700">{props.issue.projectId}</span>
                <button
                    class="float-right btn-edit my-auto"
                    onClick={(): void => {
                        setShowEditIssueModal(true);
                        setErrorMessage('');
                    }}
                >
                    Edit
                </button>
            </div>
        </div>
    );
});
