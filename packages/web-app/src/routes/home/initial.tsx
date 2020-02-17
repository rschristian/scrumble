import { h, Fragment, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';

import kanbanBoardExample from 'assets/kanban-board-example.png';

interface IProps {
    onBegin: () => void;
    show: boolean;
}

const Initial: FunctionalComponent<IProps> = (props: IProps) => {
    const [hiding, setHiding] = useState(false);
    const [hidden, setHidden] = useState(!props.show);

    return (
        <Fragment>
            <div class="flex">
                <div class={'lg:w-1/2 ' + (hidden ? ' is-hidden' : '') + (hiding ? ' hiding' : '')}>
                    <figure class="image is-4by3">
                        {/*TODO Image looks stretched, work on scaling*/}
                        <img
                            class="sm:h-64 md:h-20 lg:h-full xl p-6 rounded-lg shadow-2xl object-cover"
                            src={kanbanBoardExample}
                            alt="Example of a Kanban Board"
                        />
                    </figure>
                </div>
                <div class={'hidden lg:block lg:w-1/2 ' + (hidden ? ' is-hidden' : '') + (hiding ? ' hiding' : '')}>
                    <h1 class="text-3xl font-hairline">It appears that you do not have any Work Spaces</h1>
                    <h2 class="text-2xl font-hairline">Want to get started?</h2>
                    <br />
                    <p class="has-text-centered">
                        <a
                            class="button is-medium is-info is-outlined"
                            onClick={(): void => {
                                setHiding(true);
                                setTimeout(() => {
                                    setHiding(false);
                                    setHidden(true);
                                    props.onBegin();
                                }, 500);
                            }}
                        >
                            BeginS
                        </a>
                    </p>
                </div>
            </div>
        </Fragment>
    );
};

export default Initial;
