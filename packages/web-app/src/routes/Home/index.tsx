import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { notify } from 'react-notify-toast';

import { WorkspaceCard } from 'components/Cards/workspace';
import { Modal } from 'components/Modal';
import { SearchBar } from 'components/SearchBar';
import { Workspace } from 'models/Workspace';
import { fetchUserInfo } from 'services/api/auth';
import { createWorkspace, getWorkspaces } from 'services/api/workspaces';
import { errorColour, successColour } from 'services/Notification/colours';
import { useStore } from 'stores';

interface IProps {
    submit?: (name: string, description: string) => void;
    close: () => void;
}

const CreateWorkspace: FunctionalComponent<IProps> = (props: IProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    return (
        <Fragment>
            <div class="overflow-auto relative">
                <div class="m-4">
                    <label class="form-label">Workspace Name</label>
                    <input
                        class="form-input"
                        type="text"
                        placeholder="Workspace Name"
                        value={name}
                        onInput={(e): void => setName((e.target as HTMLInputElement).value)}
                    />
                </div>
                <div class="m-4">
                    <label class="form-label">Workspace Description</label>
                    <input
                        class="form-input"
                        type="text"
                        placeholder="Workspace Description"
                        value={description}
                        onInput={(e): void => setDescription((e.target as HTMLInputElement).value)}
                    />
                </div>
                <div className="flex justify-end pt-2">
                    <button
                        class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
                        onClick={(): void => props.submit(name, description)}
                    >
                        Save
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

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

    const handleOnKeyDown = (e: KeyboardEvent): void => {
        if (e.key === 'Enter') console.log('Enter selected');
    };

    const submitNewWorkspace = (name: string, description: string): void => {
        createWorkspace(name, description).then((res) => {
            if (typeof res === 'string') {
                notify.show(res, 'error', 5000, errorColour);
            } else {
                setWorkspacesArray([...workspacesArray, res]);
                setShowCreateModal(false);
                notify.show('Workspace created!', 'success', 5000, successColour);
            }
        });
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
                        <CreateWorkspace close={(): void => setShowCreateModal(false)} submit={submitNewWorkspace} />
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
                <SearchBar
                    placeholder="Search by name"
                    handleOnInput={(term: string): void => console.log(term)}
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
