import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { notify } from 'react-notify-toast';

import { WorkspaceCard } from 'components/Cards/workspace';
import { CreateOrEditWorkspace } from 'components/CreateOrEdit/workspace';
import { Modal } from 'components/Modal';
import { SearchBar } from 'components/SearchBar';
import { Workspace } from 'models/Workspace';
import { fetchUserInfo } from 'services/api/auth';
import { createWorkspace, getWorkspaces } from 'services/api/workspaces';
import { errorColour, successColour, warningColour } from 'services/notification/colours';
import { useStore } from 'stores';

const Home: FunctionalComponent = () => {
    const rootStore = useStore();
    const { authStore, userLocationStore } = rootStore;

    const [workspacesArray, setWorkspacesArray] = useState<Workspace[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        getWorkspaces().then((res) => {
            if (typeof res !== 'string') setWorkspacesArray(res);
            else notify.show(res, 'error', 5000, errorColour);
        });
    }, []);

    const submitNewWorkspace = (newWorkspace: Workspace): void => {
        if (newWorkspace.name === '') notify.show('You must provide a name', 'warning', 5000, warningColour);
        else {
            createWorkspace(newWorkspace).then((res) => {
                if (typeof res === 'string') notify.show(res, 'error', 5000, errorColour);
                else {
                    setWorkspacesArray([...workspacesArray, res]);
                    setShowCreateModal(false);
                    notify.show('Workspace created!', 'success', 5000, successColour);
                }
            });
        }
    };

    useEffect(() => {
        fetchUserInfo().then((response) => authStore.setCurrentUser(response));
        userLocationStore.setActiveSideBarItem(0);
    }, [authStore, userLocationStore]);

    return (
        <div class="mt-16 flex justify-center bg-blue-100">
            {showCreateModal ? (
                <Modal
                    title="Create New Workspace"
                    close={(): void => setShowCreateModal(false)}
                    content={
                        <CreateOrEditWorkspace
                            close={(): void => setShowCreateModal(false)}
                            submit={submitNewWorkspace}
                        />
                    }
                />
            ) : null}
            <div class="mx-3 flex justify-center flex-col w-3/4">
                <div class="create-bar">
                    <h1 class="page-heading">Your Workspaces</h1>
                    <button class="btn-create my-auto" onClick={(): void => setShowCreateModal(true)}>
                        New Workspace
                    </button>
                </div>
                <SearchBar handleOnInput={(term: string): void => console.log(term)} />
                <div class="rounded bg-white overflow-hidden shadow-lg">
                    {workspacesArray.map((workspace, index) => {
                        return (
                            <WorkspaceCard
                                key={index}
                                id={workspace.id}
                                name={workspace.name}
                                description={workspace.description}
                                projectIds={workspace.projectIds}
                                users={workspace.users}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;
