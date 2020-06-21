import { ComponentChild, FunctionalComponent, h } from 'preact';
import { createPortal } from 'preact/compat';
import { X } from 'preact-feather';

interface IProps {
    title: string;
    content: ComponentChild;
    submit?: () => void | Promise<void>;
    close: () => void;
}

export const Modal: FunctionalComponent<IProps> = (props: IProps) => {
    return createPortal(
        <div class="modal">
            <div class="modal-overlay" onClick={props.close} />
            <div class="modal-container md:max-w-xl">
                <div class="modal-content">
                    <div class="flex justify-between items-center pb-3">
                        <p class="text-2xl font-bold">{props.title}</p>
                        <div class="modal-close" onClick={props.close}>
                            <X />
                        </div>
                    </div>

                    {props.content}

                    {props.submit !== undefined && (
                        <div class="flex justify-end pt-2">
                            <button
                                class="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
                                onClick={props.submit}
                            >
                                Confirm
                            </button>
                            <button
                                class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
                                onClick={props.close}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.getElementById('modal'),
    );
};
