import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router';
import { Sprint } from '../../models/Sprint';

const SprintListItem: FunctionalComponent<Sprint> = (props: Sprint) => {
    return (
        <div class="border-b border-gray-300">
            <div class="w-9/12">
                <div class="px-4 py-2">
                    <Link href={`/sprint/${props.id}`} class="truncate">
                        {props.name}
                    </Link>
                    <p class="text-gray-700 text-base truncate">{props.description}</p>
                </div>
            </div>
        </div>
    );
};

export default SprintListItem;
