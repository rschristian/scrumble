import { FunctionalComponent, h } from 'preact';
import { Issue } from 'models/Issue';
import { Link } from 'preact-router';

export const IssueListItem: FunctionalComponent<any> = (props: any) => {
    const deleteIssue = (): void => {
        props.store.deleteIssue(props.index);
    };
    const editIssue = (): void => {
        const issue: object = {
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
                <button className="float-right btn-edit my-auto" onClick={editIssue}>
                    {' '}
                    Edit{' '}
                </button>
            </div>
        </Link>
    );
};
