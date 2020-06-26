import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from 'react-notify-toast';

import { SprintCard } from 'components/Cards/sprint';
import { CreateOrEditSprint } from 'components/CreateOrEdit/sprint';
import { SprintFilter } from 'components/Filter/sprint';
import { Modal } from 'components/Modal';
import { Sprint, SprintStatus } from 'models/Sprint';
import { apiCreateSprint, apiFetchSprints } from 'services/api/sprints';
import { errorColour, successColour } from 'services/notification/colours';
import { RootState } from 'stores';
import { reduxSetActiveSideBarMenuItem } from 'stores/userLocationStore';

import Backlog from './Backlog';

const SprintPlanning: FunctionalComponent = () => {
    const dispatch = useDispatch();
    const { currentWorkspace } = useSelector((state: RootState) => state.userLocation);

    // For mobile
    const [isSprintView, setIsSprintView] = useState(false);

    const [showNewSprintModal, setShowNewSprintModal] = useState(false);
    const [sprintFilter, setSprintFilter] = useState(SprintStatus.active.toString());
    const [sprints, setSprints] = useState<Sprint[]>([]);

    useEffect(() => {
        dispatch(reduxSetActiveSideBarMenuItem(0));
        async function fetchSprints(): Promise<void> {
            const result = await apiFetchSprints(currentWorkspace.id, 'none');
            typeof result === 'string' ? notify.show(result, 'error', 5000, errorColour) : setSprints(result);
        }
        fetchSprints();
    }, [currentWorkspace.id, dispatch]);

    const handleSprintCreation = async (newSprint: Sprint): Promise<void> => {
        const result = await apiCreateSprint(currentWorkspace.id, newSprint);
        if (typeof result === 'string') notify.show(result, 'error', 5000, errorColour);
        else {
            notify.show('New sprint created!', 'success', 5000, successColour);
            setShowNewSprintModal(false);
            setSprints([...sprints, result]);
        }
    };

    const updateSprint = (updatedSprint: Sprint): void => {
        const arrayCopy = [...sprints];
        if (arrayCopy.some((sprint) => updatedSprint.id === sprint.id)) {
            sprints.forEach((sprint: Sprint, index) => {
                if (sprint.id === updatedSprint.id) {
                    arrayCopy[index] = updatedSprint;
                    setSprints(arrayCopy);
                }
            });
        }
    };

    const updateSprintFilter = (filterFor: string): void => setSprintFilter(filterFor);

    return (
        <Fragment>
            {showNewSprintModal ? (
                <Modal
                    title="Create Sprint"
                    content={
                        <CreateOrEditSprint
                            submit={handleSprintCreation}
                            close={(): void => setShowNewSprintModal(false)}
                        />
                    }
                    close={(): void => setShowNewSprintModal(false)}
                />
            ) : null}

            <div class="flex">
                <div class={`w-11/12 md:w-1/2 md:block md:mr-4 ${!isSprintView ? '' : 'sm:hidden'}`}>
                    <Backlog />
                </div>
                <div
                    class={`md:border-l border-gray-300 w-11/12 md:w-1/2 md:block " ${isSprintView ? '' : 'sm:hidden'}`}
                >
                    <div class="create-bar">
                        <h1 class="md:ml-4 page-heading">Sprints</h1>
                        <button
                            onClick={(): void => setIsSprintView(!isSprintView)}
                            class="btn-create md:hidden my-auto mr-4"
                        >
                            Backlog
                        </button>
                        <button class="btn-create my-auto" onClick={(): void => setShowNewSprintModal(true)}>
                            New Sprint
                        </button>
                    </div>
                    <div class="md:ml-4">
                        <SprintFilter setFilter={updateSprintFilter} />
                    </div>
                    <div class="md:ml-4 rounded bg-white overflow-hidden shadow-lg">
                        {sprints.map((sprint, index) => {
                            if (sprintFilter === 'all' || sprint.status.toString() === sprintFilter) {
                                return (
                                    <SprintCard
                                        key={index}
                                        sprint={sprint}
                                        closed={sprint.status === SprintStatus.closed}
                                        updateSprint={updateSprint}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SprintPlanning;
