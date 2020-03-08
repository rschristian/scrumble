import { ComponentChild, FunctionalComponent, h } from 'preact';
import { X } from 'preact-feather';

interface IProps {
    title: string;
    content: ComponentChild;
    submit: () => void;
    close: () => void;
}

export const Modal: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <div className="modal">
            <div className="modal-overlay" onClick={props.close} />
            <div className="modal-container md:max-w-md">
                <div className="modal-content">
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold">{props.title}</p>
                        <div className="modal-close" onClick={props.close}>
                            <X />
                        </div>
                    </div>

                    {props.content}

                    <div className="flex justify-end pt-2">
                        <button
                            className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
                            onClick={props.submit}
                        >
                            Action
                        </button>
                        <button
                            className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
                            onClick={props.close}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
