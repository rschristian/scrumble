import { Fragment, FunctionalComponent, h, VNode } from 'preact';

interface IProps {
    editForm: VNode;
    onSubmit?: () => void;
}

export const GenericEdit: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <Fragment>
            <div class="create-bar">
                <h1 class="page-heading">Edit</h1>
            </div>
            <div class="form-container form-height overflow-y-auto relative">{props.editForm}</div>
        </Fragment>
    );
};
