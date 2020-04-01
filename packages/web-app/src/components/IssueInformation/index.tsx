import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks/src';
import { Issue } from 'models/Issue';

interface IProps {
    issue: Issue;
}
export const IssueInformation: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <Fragment>
            <div class="table w-full">
                <div class="table-row-group">
                    <div class="table-row form-label">
                        <span>Created At:</span>
                    </div>
                    <div class="table-row">
                        <span class="text-gray-700"> {props.issue.createdAt} </span>
                    </div>
                    <div class="table-row form-label">
                        <span>Created By:</span>
                    </div>
                    <div class="table-row">
                        <span class="text-gray-700">{props.issue.author} </span>
                    </div>
                    <div class="table-row form-label">
                        <span>Assigned To:</span>
                    </div>
                    <div class="table-row">
                        <span class="text-gray-700">{props.issue.assignee}</span>
                    </div>
                    <div class="table-row form-label">
                        <span>Story Point:</span>
                    </div>
                    <div class="table-row">
                         <span class="text-gray-700"> {props.issue.storyPoint} </span>
                    </div>
                    <div class="table-row form-label">
                        <span>State:</span>
                    </div>
                    <div class="table-row">
                        <span class="text-gray-700">  {props.issue.state}</span>
                    </div>
                    <div class="table-row form-label">
                        <span>Description:</span>
                    </div>
                    <div class="table-row">
                        <span class="text-gray-700"> {props.issue.description.trim() != "" ? props.issue.description :<span class="italic"> No Description Given</span>}</span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}