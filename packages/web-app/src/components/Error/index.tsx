import { Fragment, FunctionalComponent, h } from 'preact';

interface IProps {
    message: string;
}

export const Error: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <Fragment>
            <div class="page w-full">
                <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 shadow-lg mx-auto mt-10" role="alert">
                    <h1 class="text-xl">Error</h1>
                    <p>{props.message}</p>
                </div>
            </div>
        </Fragment>
    );
};

export default Error;
