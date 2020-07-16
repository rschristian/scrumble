import { FunctionalComponent, h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { useSelector } from 'react-redux';
import { notify } from 'react-notify-toast';

import Modal from 'components/Modal';
import SprintCard from 'components/Cards/sprint';
import CreateOrEditSprint from 'components/CreateOrEdit/sprint';
import Filter, { FilterType } from 'components/Filters';
import { Sprint, SprintStatus } from 'models/Sprint';
import { apiFetchSprints } from 'services/api/sprints';
import { errorColour } from 'services/notification/colours';
import { RootState } from 'stores';
import { useLtsWarning } from 'services/notification/hooks';

const SprintList: FunctionalComponent = () => {
    const { currentWorkspace } = useSelector((state: RootState) => state.userLocation);

    const [showNewSprintModal, setShowNewSprintModal] = useState(false);
    const [sprintStatusFilter, setSprintStatusFilter] = useState(SprintStatus.active.toString());
    const [sprintTermFilter, setSprintTermFilter] = useState(SprintStatus.active.toString());
    const [sprints, setSprints] = useState<Sprint[]>([]);

    const fetchSprints = useCallback(async () => {
        try {
            setSprints(await apiFetchSprints(currentWorkspace.id, 'none'));
        } catch (error) {
            notify.show(error, 'error', 5000, errorColour);
        }
    }, [currentWorkspace]);

    useEffect(() => {
        fetchSprints();
    }, [fetchSprints]);

    function updateSprintFilter(sprintStatus: string, sprintTerm: string): void {
        setSprintStatusFilter(sprintStatus);
        setSprintTermFilter(sprintTerm);
    }

    function scrollToLoadMore(e: HTMLDivElement): void {
        // if (e.scrollHeight - e.scrollTop === e.clientHeight && pageNumber.current !== 0) {
        //     fetchSprints();
        // }
    }

    return (
        <div>
            {showNewSprintModal && (
                <Modal
                    title="Create Sprint"
                    content={
                        <CreateOrEditSprint submit={useLtsWarning} close={(): void => setShowNewSprintModal(false)} />
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
                <Filter filterType={FilterType.sprint} setFilter={updateSprintFilter} />
            </div>
            <div
                class="md:ml-4 rounded bg-white overflow-hidden shadow-lg"
                onScroll={(e): void => scrollToLoadMore(e.target as HTMLDivElement)}
            >
                {sprints.map((sprint, index) => {
                    {
                        /* TODO Replace this with a system like issues. Don't filter on the front end */
                    }
                    if (sprintStatusFilter === 'all' || sprint.status.toString() === sprintStatusFilter) {
                        return (
                            <SprintCard
                                key={index}
                                sprint={sprint}
                                closed={sprint.status === SprintStatus.closed}
                                updateSprint={useLtsWarning}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default SprintList;
