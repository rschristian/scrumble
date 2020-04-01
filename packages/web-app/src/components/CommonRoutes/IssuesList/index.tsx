// import { FunctionalComponent, h } from 'preact';
// import { useEffect, useState } from 'preact/hooks';
// import { notify } from 'react-notify-toast';
//
// import { IssueCard } from 'components/Cards/issue';
// import { Issue, IssueStatus } from 'models/Issue';
// import { fetchWorkspaceIssues } from 'services/api/issues';
// import { errorColour } from 'services/Notification/colours';
// import { useStore } from 'stores';
// import { IssuePagination } from 'models/IssuePagination';
//
// export const IssuesList: FunctionalComponent = () => {
//     const userLocationStore = useStore().userLocationStore;
//
//     const [issuesArray, setIssuesArray] = useState<Issue[]>([]);
//     const [issueFilter, setIssueFilter] = useState(IssueStatus.open.toString());
//     const [currentPageNum, setCurrentPageNum] = useState(0);
//     const [currentProjectId, setCurrentProjectId] = useState(0);
//     const [areMoreIssues, setAreMoreIssues] = useState(true);
//
//     useEffect(() => {
//         async function getWorkspaceIssues(): Promise<IssuePagination | string> {
//             return await fetchWorkspaceIssues(
//                 userLocationStore.currentWorkspace.id,
//                 issueFilter,
//                 currentProjectId,
//                 currentPageNum,
//             );
//         }
//
//         getWorkspaceIssues().then((result) => {
//             if (typeof result == 'string') notify.show(result, 'error', 5000, errorColour);
//             else {
//                 setIssuesArray(issuesArray.concat(result.issues));
//                 const projectId = result.nextResource.projectId;
//                 const pageNumber = result.nextResource.pageNumber;
//
//                 if (projectId == 0 && pageNumber == 0) setAreMoreIssues(false);
//                 else {
//                     setCurrentProjectId(projectId);
//                     setCurrentPageNum(pageNumber);
//                 }
//             }
//         });
//     }, [issuesArray, issueFilter, currentPageNum, currentProjectId, userLocationStore.currentWorkspace.id]);
//
//     return (
//         <div class="mr-4">
//             <div class="rounded bg-white overflow-hidden shadow-lg overflow-y-scroll issuesList">
//                 {issuesArray.map((issue, index) => {
//                     return <IssueCard key={index} issue={issue} />;
//                 })}
//             </div>
//         </div>
//     );
// };
