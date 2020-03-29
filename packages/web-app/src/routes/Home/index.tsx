import { FunctionalComponent, h } from 'preact';
import { useEffect, useContext, useState } from 'preact/hooks';

import { notify } from 'react-notify-toast';

import { WorkspaceCard } from 'components/Cards/workspace';
import { SearchBar } from 'components/SearchBar';
import { fetchUserInfo } from 'services/api/auth';
import { createWorkspace, getWorkspaces } from 'services/api/workspaces';
import { Workspace } from 'models/Workspace';
import { CreateWorkspaceModal } from 'components/Modal/createWorkspaceModal';
import { AuthStoreContext, UserLocationStoreContext } from 'stores';
import { errorColour, successColour } from 'services/Notification/colours';

const Home: FunctionalComponent = () => {
    const authStore = useContext(AuthStoreContext);
    const userLocationStore = useContext(UserLocationStoreContext);

    const [workspacesArray, setWorkspacesArray] = useState<Workspace[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        getWorkspaces().then((res) => {
            if (typeof res !== 'string') {
                setWorkspacesArray(res);
            } else {
                notify.show(res, 'error', 5000, errorColour);
            }
        });
    }, []);

    const handleOnKeyDown = (e: KeyboardEvent): void => {
        if (e.key === 'Enter') console.log('Enter selected');
    };

    const submitNewWorkspace = (name: string, description: string): void => {
        createWorkspace(name, description).then((res) => {
            if (typeof res !== 'string') {
                setWorkspacesArray([...workspacesArray, res]);
                closeModal();
                notify.show('Workspace created!', 'success', 5000, successColour);
            } else {
                notify.show(res, 'error', 5000, errorColour);
            }
        });
    };

    const closeModal = (): void => {
        setShowCreateModal(false);
    };

    const handleOnInput = (e: any): void => console.log((e.target as HTMLSelectElement).value);

    useEffect(() => {
        fetchUserInfo().then((response) => authStore.setCurrentUser(response));
        userLocationStore.setActiveSideBarItem(0);
    }, [authStore, userLocationStore]);

    return (
        <div class="mt-16 flex justify-center bg-blue-100">
            {showCreateModal ? <CreateWorkspaceModal close={closeModal} submit={submitNewWorkspace} /> : null}
            <div class="mx-3 flex justify-center flex-col w-3/4">
                <div class="create-bar">
                    <h1 class="page-heading">Your Workspaces</h1>
                    <button class="btn-create my-auto" onClick={() => setShowCreateModal(true)}>
                        New Workspace
                    </button>
                </div>
                <SearchBar
                    placeholder="Search by name"
                    handleOnInput={handleOnInput}
                    handleOnKeyDown={handleOnKeyDown}
                />
                <div class="rounded bg-white overflow-hidden shadow-lg">
                    {workspacesArray.map((workspace, index) => {
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
