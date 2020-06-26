import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useDispatch } from 'react-redux';

import { reduxSetActiveSideBarMenuItem } from 'stores/userLocationStore';

const DailyStandUp: FunctionalComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reduxSetActiveSideBarMenuItem(0));
    }, [dispatch]);

    return (
        <Fragment>
            <div class="create-bar">
                <h1 class="page-heading">Daily Stand-up</h1>
            </div>
        </Fragment>
    );
};

export default DailyStandUp;
