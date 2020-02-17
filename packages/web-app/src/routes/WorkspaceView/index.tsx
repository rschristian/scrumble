import { FunctionalComponent, h } from 'preact';
import { IWorkspaceView } from '../../propTypes/IWorkspaceView';
import Sprints from '../../components/Sprints';
import WorkspaceNav from '../../components/WorkspaceNav';

const WorkspaceView: FunctionalComponent<IWorkspaceView> = (props: IWorkspaceView) => {
    return (
        // <div class="w-screen">
        //     <div class="mt-5 list-reset flex flex-col">
        //         <ul class="flex justify-center mx-auto w-3/6 border-b">
        //             <li class="-mb-px">
        //                 <a class="bg-white inline-block border-l focus:bg-orange-500 focus:text-white border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#">Issues</a>
        //             </li>
        //             <li class="">
        //                 <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">Projects</a>
        //             </li>
        //             <li class="">
        //                 <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">Sprints</a>
        //             </li>
        //             <li class="">
        //                 <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">Metrics</a>
        //             </li>
        //         </ul>
        //         <Sprints />
        //     </div>
        // </div>
        <div class="w-screen">
            <div class="flex">
                <WorkspaceNav />
                <div class="flex flex-col content-center mx-auto w-3/4">
                    <Sprints />
                </div>
            </div>
        </div>
    );
};

export default WorkspaceView;
