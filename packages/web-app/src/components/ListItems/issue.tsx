import { FunctionalComponent, h } from 'preact';
import { Issue } from 'models/Issue';
import { Link } from 'preact-router';

interface IProps {
    index: number;
    id: number;
    name: string;
    storyPoint: number;
    project: string;
    description: string;
    deleteIssue?: (value: number) => void;
    edit?: () => void;
    editing?: (issue: Issue) => void;
}

export const IssueListItem: FunctionalComponent<IProps> = (props: IProps) => {
    const deleteIssue = (): void => {
        props.deleteIssue(props.index);
    };
    const editIssue = (): void => {
        const issue: Issue = {
            id: Date.now(),
            name: props.name,
            description: props.description,
            storyPoint: props.storyPoint,
            project: props.project,
            index: props.index,
        };
        props.edit();
        props.editing(issue);
    };
    return (
        <Link href={`/issue/${props.id}`} className="lst-itm-container">
            <div className="px-4 py-2 flex min-w-0">
                <div class="truncate">{props.name}</div>
            </div>
            <div className="flex px-4 py-2 z-1">
                <span className="story-pnt">{props.storyPoint}</span>
                <span className="text-gray-700">{props.project}</span>
                <button className="float-right btn-delete my-auto" onClick={deleteIssue}>
                    {' '}
                    Delete{' '}
                </button>
                {props.edit === undefined ? null : (
                    <button className="float-right btn-edit my-auto" onClick={editIssue}>
                        {' '}
                        Edit{' '}
                    </button>
                )}
            </div>
        </Link>
    );
};
