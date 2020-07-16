import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useDispatch } from 'react-redux';

import { setActiveSideBarMenuItem } from 'stores/userLocationStore';

import Backlog from './issues';
import SprintList from './sprints';

const SprintPlanning: FunctionalComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveSideBarMenuItem(0));
    }, [dispatch]);

    return (
        <Fragment>
            <div class="flex">
                <div class="md:border-r border-gray-300 w-11/12 md:w-1/2 md:block overflow-x-hidden pl-1">
                    <Backlog />
                </div>
                <div class="md:border-l border-gray-300 w-11/12 md:w-1/2 md:block overflow-x-hidden pr-1">
                    <SprintList />
                </div>
            </div>
        </Fragment>
    );
};

export default SprintPlanning;
