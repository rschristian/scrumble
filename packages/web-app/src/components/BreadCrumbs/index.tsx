import { Fragment, FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router';

interface IProps {
    workspaceId: number;
    workspaceName: string;
    currentPage: string;
    sprintId?: number;
    sprintName?: string;
}

export const BreadCrumbs: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <h1 class="user-path">
            <Link href="/">Workspaces</Link> &gt;{' '}
            <Link href={`/workspace/${props.workspaceId}`}>{props.workspaceName}</Link> &gt;{' '}
            {props.sprintId !== undefined && (
                <Fragment>
                    {' '}
                    Sprints &gt;{' '}
                    <Link href={`/workspace/${props.workspaceId}/sprint/${props.sprintId}`}>
                        {props.sprintName}
                    </Link>{' '}
                    &gt;{' '}
                </Fragment>
            )}
            {props.currentPage}
        </h1>
    );
};
