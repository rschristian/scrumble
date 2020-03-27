import { FunctionalComponent, h } from 'preact';
import { useEffect, useContext } from 'preact/hooks';

import { WorkspaceCard } from 'components/Cards/workspace';
import { SearchBar } from 'components/SearchBar';
import { workspaces } from 'data';
import { fetchUserInfo } from 'services/api/auth';
import { AuthStoreContext, UserLocationStoreContext } from 'stores';

const Home: FunctionalComponent = () => {
    const authStore = useContext(AuthStoreContext);
    const userLocationStore = useContext(UserLocationStoreContext);

    const handleOnKeyDown = (e: KeyboardEvent): void => {
        if (e.key === 'Enter') console.log('Enter selected');
    };

    const handleOnInput = (e: any): void => console.log((e.target as HTMLSelectElement).value);

    useEffect(() => {
        fetchUserInfo().then((response) => authStore.setCurrentUser(response));
        userLocationStore.setActiveSideBarItem(0);
    }, [authStore, userLocationStore]);

    return (
        <div className="mt-16 flex justify-center bg-blue-100">
            <div className="mx-3 flex justify-center flex-col w-3/4">
                <div className="create-bar">
                    <h1 className="page-heading">Your Workspaces</h1>
                    <button className="btn-create my-auto">New Workspace</button>
                </div>
                <SearchBar
                    placeholder="Search by name"
                    handleOnInput={handleOnInput}
                    handleOnKeyDown={handleOnKeyDown}
                />
                <div className="rounded bg-white overflow-hidden shadow-lg">
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
