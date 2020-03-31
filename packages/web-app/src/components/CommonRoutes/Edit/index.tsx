import { Fragment, FunctionalComponent, h, VNode } from 'preact';

interface IProps {
    editForm: VNode;
    onSubmit: () => void;
}

export const GenericEdit: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <Fragment>
            <div class="create-bar">
                <h1 class="page-heading">Edit</h1>
            </div>
            <div class="form-container form-height overflow-y-auto relative">
                {props.editForm}
                <button class="btn-create mx-auto mb-4 ml-4 absolute left-0 bottom-0" onClick={props.onSubmit}>
                    Save Changes
                </button>
            </div>
        </Fragment>
    );
};
