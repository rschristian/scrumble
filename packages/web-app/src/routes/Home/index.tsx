import { FunctionalComponent, h } from 'preact';

import { WorkspaceCard } from 'components/Cards/workspace';
import { SearchBar } from 'components/SearchBar';
import { workspaces } from 'data';
import { fetchWorkspaceIssues, fetchWorkspaceIssuesCached } from 'services/api/issues';

const Home: FunctionalComponent = () => {
    return (
        <div class="mt-16 flex justify-center bg-blue-100">
            <div class="mx-3 flex justify-center flex-col w-3/4">
                <div class="create-bar">
                    <h1 class="page-heading">Your Workspaces</h1>
                    <button onClick={fetchWorkspaceIssuesCached} class="btn-create my-auto">
                        Cached Issues
                    </button>
                    {/*<button onClick={fetchWorkspaceIssues} class="btn-create my-auto">*/}
                    {/*    New Issues*/}
                    {/*</button>*/}
                </div>
                <SearchBar placeholder="Search by name" />
                <div class="rounded bg-white overflow-hidden shadow-lg">
                    {workspaces.map((workspace, index) => {
                        return (
                            <WorkspaceCard
                                key={index}
                                id={workspace.id}
                                name={workspace.name}
                                description={workspace.description}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;
