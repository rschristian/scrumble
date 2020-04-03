import { Fragment, FunctionalComponent, h } from 'preact';
import { Issue, IssueStatus } from 'models/Issue';

interface IProps {
    issue: Issue;
}
export const IssueInformation: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <Fragment>
            <div class="table w-full capitalize">
                <div class="table-row-group">
                    <div class="info-label">
                        Project:
                    </div>
                    <div class="table-row">
                        <span class="text-gray-700"> {props.issue.projectName} </span>
                    </div>
                    <div class="info-label">
                        Created At:
                    </div>
                    <div class="table-row">
                        <span class="text-gray-700"> {props.issue.createdAt} </span>
                    </div>
                    <div class="info-label">
                        Created By:
                    </div>
                    <div class="table-row">
                        <span class="text-gray-700">{props.issue.author.name} </span>
                    </div>
                    <div class="info-label">
                        Assigned To:
                    </div>
                    <div class="table-row">
                        <span class="text-gray-700">{props.issue.assignee !== null ? props.issue.assignee.name : "Unassigned"}</span>
                    </div>
                    <div class="info-label">
                        Story Point:
                    </div>
                    <div class="table-row">
                         <span class="story-pnt"> {props.issue.storyPoint} </span>
                    </div>
                    <div class="info-label">
                        State:
                    </div>
                    <div class="table-row">
                        <span class={props.issue.status === IssueStatus.open ? "open" : "closed" }>{props.issue.status}</span>
                    </div>
                    <div class="info-label">
                        Description:
                    </div>
                    <div class="table-row normal-case">
                        <span class="text-gray-700"> {props.issue.description.trim() != "" ? props.issue.description :<span class="italic"> No Description Given</span>}</span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}