import { Issue, IssueStatus } from 'models/Issue';
import { Fragment, FunctionalComponent, h } from 'preact';

interface InformationProps {
    issue: Issue;
}

const IssueInformation: FunctionalComponent<InformationProps> = (props: InformationProps) => {
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
                                {props.issue.assignee?.name ? props.issue.assignee.name : 'Unassigned'}
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
                        {props.issue.description?.trim() !== '' ? (
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

export default IssueInformation;
