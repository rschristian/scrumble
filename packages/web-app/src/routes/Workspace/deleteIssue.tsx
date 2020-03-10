import { Fragment, FunctionalComponent, h } from 'preact';

interface Iprops {
    index: number;
    deleteIssue: (index: number) => void;
    close: () => void;
}
const DeleteIssue: FunctionalComponent<Iprops> = (props: Iprops) => {
    const handleDelete = (): void => {
        props.deleteIssue(props.index);
        props.close();
    };
    return (
        <Fragment>
            <button className="btn-create my-auto" onClick={handleDelete}>
                {' '}
                Yes{' '}
            </button>
            <button className="btn-delete my-auto" onClick={props.close}>
                {' '}
                No{' '}
            </button>
        </Fragment>
    );
};

export default DeleteIssue;
