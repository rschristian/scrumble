import { ComponentChild, FunctionalComponent, h } from 'preact';
import { X } from 'preact-feather';

interface IProps {
    title: string;
    content: ComponentChild;
    submit?: () => void;
    close: () => void;
}

export const Modal: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={props.close} />

            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 text-left px-6">
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold">{props.title}</p>
                        <div className="modal-close cursor-pointer z-50" onClick={props.close}>
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
