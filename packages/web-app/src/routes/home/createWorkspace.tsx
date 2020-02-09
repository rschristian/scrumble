import preact, { h, Fragment } from 'preact';

import icon from 'assets/icons/icon-1200x1200.png';

interface IProps {
    show: boolean;
}

const CreateWorkspace: preact.FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <Fragment>
            <div class={'column is-5' + (props.show ? '' : ' is-hidden')}>
                <figure class="image is-4by3">
                    {/*TODO Image looks stretched, work on scaling*/}
                    <img src={icon} alt="Example of a Kanban Board" />
                </figure>
            </div>
            <div class={'column is-6 is-offset-1' + (props.show ? '' : ' is-hidden')}>
                <h1 class="title is-2">Just a Test</h1>
            </div>
        </Fragment>
    );
};

export default CreateWorkspace;
