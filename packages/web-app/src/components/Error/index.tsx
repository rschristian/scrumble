import { Fragment, FunctionalComponent, h } from 'preact';

import burndown from 'assets/burndown.png';

interface IProps {
    message: string;
}

const Error: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <Fragment>
            <div className="create-bar">
                <h1 className="page-heading">{props.message}</h1>
                <img src={burndown} />
            </div>
        </Fragment>
    );
};

export default Error;
