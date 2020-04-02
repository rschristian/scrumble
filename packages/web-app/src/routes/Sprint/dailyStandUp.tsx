import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';

import { useStore } from 'stores';

const DailyStandUp: FunctionalComponent = () => {
    const userLocationStore = useStore().userLocationStore;

    useEffect(() => {
        userLocationStore.setActiveSideBarItem(0);
    }, [userLocationStore]);

    return (
        <Fragment>
            <div class="create-bar">
                <h1 class="page-heading">Daily Stand-up</h1>
            </div>
        </Fragment>
    );
};

export default DailyStandUp;
