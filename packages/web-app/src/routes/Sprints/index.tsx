import { FunctionalComponent, h } from 'preact';

import SprintNav from 'components/Navigation/SprintNav';
import Issues from 'routes/Issues';

const SprintView: FunctionalComponent = () => {
    return (
        <div class="w-screen block">
            <div class="flex">
                <SprintNav />
                <div class="main-content">
                    <Issues />
                </div>
            </div>
        </div>
    );
};

export default SprintView;
