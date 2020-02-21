import { Fragment, FunctionalComponent, h, VNode } from 'preact';

interface IProps {
    editForm: VNode;
}

export const GenericEdit: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <Fragment>
            <div className="create-bar">
                <h1 className="page-heading">Edit</h1>
            </div>
            <div className="form-container overflow-auto relative">
                {props.editForm}
                <button className="btn-create mx-auto mb-4 ml-4">Save Changes</button>
            </div>
        </Fragment>
    );
};
