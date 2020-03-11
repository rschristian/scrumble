import { Fragment, FunctionalComponent, h } from 'preact';

interface IProps {
    index: number;
    deleteIssue: (index: number) => void;
    close: () => void;
}

export const DeleteIssue: FunctionalComponent<IProps> = (props: IProps) => {
    const handleDelete = (): void => {
        props.deleteIssue(props.index);
        props.close();
    };

    return (
        <Fragment>
            <button class="btn-create my-auto" onClick={handleDelete}>
                Yes
            </button>
            <button class="btn-delete my-auto" onClick={props.close}>
                No
            </button>
        </Fragment>
    );
};
