import { FunctionalComponent, h } from 'preact';
import { useEffect, useContext } from 'preact/hooks';
import { WorkspaceCard } from 'components/Cards/workspace';
import { SearchBar } from 'components/SearchBar';
import { workspaces } from 'data';
import { fetchIssues } from 'services/api/issues';
import { UserStoreContext } from 'stores';
import { fetchUserInfo } from 'services/api/auth';
import { observer } from 'services/mobx';

const Home: FunctionalComponent = observer(() => {
    const userStore = useContext(UserStoreContext);

    useEffect(() => {
        fetchUserInfo().then((response) => {
            userStore.setCurrentUser(response);
        });
    }, [userStore]);
    return (
        <div class="mt-16 flex justify-center bg-blue-100">
            <div class="mx-3 flex justify-center flex-col w-3/4">
                <div class="create-bar">
                    <h1 class="page-heading">Your Workspaces</h1>
                    <button onClick={fetchIssues} class="btn-create my-auto">
                        New Workspace
                    </button>
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
});

export default Home;
