import { FunctionalComponent, h } from 'preact';

import Error from 'components/Error';

const NotFound: FunctionalComponent = () => {
    return (
        <div className="main-content overflow-hidden">
            <div className="mt-20 sm:w-4/5 lg:w-3/5 block">
                <Error message="I think you're lost there chief" />
            </div>
        </div>
    );
};

export default NotFound;
