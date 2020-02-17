import { FunctionalComponent, h } from 'preact';
import SprintNav from '../../components/SprintNav';
import Issues from '../Issues';

const SprintView: FunctionalComponent = () => {
    return (
        <div class="w-screen">
            <div class="flex">
                <SprintNav />
                <div class="flex flex-col content-center mx-auto w-3/4">
                    <Issues />
                </div>
            </div>
        </div>
    );
};

export default SprintView;
