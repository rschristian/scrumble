import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useSelector } from 'react-redux';

import { Issue, IssueStatus } from 'models/Issue';
import { User } from 'models/User';
import { RootState } from 'stores';

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
    avatarUrl: '',
    projectIds: [],
};

const IssueBoardColumn: FunctionalComponent<IssuesBoardProps> = (props: IssuesBoardProps) => {
    const { currentWorkspace } = useSelector((state: RootState) => state.userLocation);

    const [issuesList, setIssueList] = useState<Issue[]>([]);

    unassigned.projectIds = currentWorkspace.projectIds;

    useEffect(() => {
        props.issues.map((issue) => {
            if (issue.status === props.status && !issuesList.includes(issue)) {
                setIssueList((oldValues) => oldValues.concat(issue));
            }
        });
    }, [issuesList, props.issues, props.status]);

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
            title: updatedIssue.title,
            description: updatedIssue.description,
            status: updatedIssue.status,
            author: updatedIssue.author,
            assignee: updatedIssue?.assignee || unassigned,
            createdAt: new Date(),
            storyPoint: updatedIssue.storyPoint,
            project: updatedIssue.project,
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
                                    const issueStatus =
                                        IssueStatus[(e.target as HTMLSelectElement).value as keyof typeof IssueStatus];
                                    if (issueStatus) {
                                        issue.status = issueStatus;
                                        props.updateIssueBoard(handleUpdate(issue));
                                    }
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
                                {issue.assignee?.name ? issue.assignee.name : 'Unassigned'}
                            </p>
                        </div>
                        <div class="bottom-0 left-0 px-4 py-2">
                            <div class="flex">
                                {issue.storyPoint !== 0 && <span class="story-pnt">{issue.storyPoint}</span>}
                                <p class="text-gray-700">
                                    {issue.project.name} (#{issue.iid})
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default IssueBoardColumn;
