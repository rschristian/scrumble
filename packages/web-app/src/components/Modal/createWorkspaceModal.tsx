import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { Modal } from './index';

interface IProps {
    submit?: (name: string, description: string) => void;
    close: () => void;
}

export const CreateWorkspaceModal: FunctionalComponent<IProps> = (props: IProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const formContent = (
        <div className="form-container overflow-auto relative">
            <div className="m-4">
                <label className="form-label">Workspace Name</label>
                <input
                    className="form-input"
                    type="text"
                    placeholder="Workspace Name"
                    value={name}
                    onInput={(e): void => setName((e.target as HTMLInputElement).value)}
                />
            </div>
            <div className="m-4">
                <label className="form-label">Workspace Description</label>
                <input
                    className="form-input"
                    type="text"
                    placeholder="Workspace Description"
                    value={description}
                    onInput={(e): void => setDescription((e.target as HTMLInputElement).value)}
                />
            </div>
            <button className="btn-create mx-auto mb-4 ml-4" onClick={() => props.submit(name, description)}>
                Save
            </button>
        </div>
    );

    return <Modal title="Create New Workspace" content={formContent} close={props.close} />;
};
