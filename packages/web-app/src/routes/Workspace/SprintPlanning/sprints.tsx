import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useSelector } from 'react-redux';
import { notify } from 'react-notify-toast';

import Modal from 'components/Modal';
import SprintCard from 'components/Cards/sprint';
import CreateOrEditSprint from 'components/CreateOrEdit/sprint';
import SprintFilter from 'components/Filter/sprint';
import { isSprint, isSprintArray, Sprint, SprintStatus } from 'models/Sprint';
import { apiCreateSprint, apiFetchSprints } from 'services/api/sprints';
import { errorColour, successColour } from 'services/notification/colours';
import { RootState } from 'stores';

const SprintList: FunctionalComponent = () => {
    const { currentWorkspace } = useSelector((state: RootState) => state.userLocation);

    const [showNewSprintModal, setShowNewSprintModal] = useState<boolean>(false);
    const [sprintFilter, setSprintFilter] = useState<string>(SprintStatus.active.toString());
    const [sprints, setSprints] = useState<Sprint[]>([]);

    useEffect(() => {
        async function fetchSprints(): Promise<void> {
            const result = await apiFetchSprints(currentWorkspace.id, 'none');
            isSprintArray(result) ? setSprints(result) : notify.show(result, 'error', 5000, errorColour);
        }
        fetchSprints();
    }, [currentWorkspace.id]);

    const handleSprintCreation = async (newSprint: Sprint): Promise<void> => {
        const result = await apiCreateSprint(currentWorkspace.id, newSprint);
        if (isSprint(result)) {
            notify.show('New sprint created!', 'success', 5000, successColour);
            setShowNewSprintModal(false);
            setSprints([...sprints, result]);
        } else {
            notify.show(result, 'error', 5000, errorColour);
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

    const scrollCheck = (e: HTMLDivElement): void => {
        // if (e.scrollHeight - e.scrollTop === e.clientHeight && pageNumber.current !== 0) fetchSprints();
    };

    return (
        <div>
            {showNewSprintModal && (
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
            )}

            <div class="md:mr-4 create-bar">
                <h1 class="md:ml-4 page-heading">Sprints</h1>
                <button class="btn-create my-auto" onClick={(): void => setShowNewSprintModal(true)}>
                    New Sprint
                </button>
            </div>
            <div class="md:ml-4">
                <SprintFilter setFilter={updateSprintFilter} />
            </div>
            <div
                class="md:ml-4 rounded bg-white overflow-hidden shadow-lg"
                onScroll={(e): void => scrollCheck(e.target as HTMLDivElement)}
            >
                {sprints.map((sprint, index) => {
                    {
                        /* TODO Replace this with a system like issues. Don't filter on the front end */
                    }
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
    );
};

export default SprintList;
