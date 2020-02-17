import { FunctionalComponent, h } from 'preact';
import { Workspace } from 'models/Workspace';
import { Link } from 'preact-router';

const ListItem: FunctionalComponent<Workspace> = (props: Workspace) => {
    return (
        <div class="border-b border-gray-300">
            <div class="mt-5 w-9/12">
                <div class="px-6 py-4">
                    <Link href={props.href}>{props.name}</Link>
                    <p class="text-gray-700 text-base">{props.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ListItem;
