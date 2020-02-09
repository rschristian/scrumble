import { h, Fragment, FunctionalComponent} from 'preact';
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
            <div class={'column is-5' + (hidden ? ' is-hidden' : '') + (hiding ? ' hiding' : '')}>
                <figure class="image is-4by3">
                    {/*TODO Image looks stretched, work on scaling*/}
                    <img src={kanbanBoardExample} alt="Example of a Kanban Board" />
                </figure>
            </div>
            <div class={'column is-6 is-offset-1' + (hidden ? ' is-hidden' : '') + (hiding ? ' hiding' : '')}>
                <h1 class="title is-2">It appears that you do not have any Work Spaces</h1>
                <h2 class="subtitle is-4">Want to get started?</h2>
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
                        Begin
                    </a>
                </p>
            </div>
        </Fragment>
    );
};

export default Initial;
