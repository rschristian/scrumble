import { ComponentChild, FunctionalComponent, h } from 'preact';
import { X } from 'preact-feather';

interface IProps {
    title: string;
    content: ComponentChild;
    close: () => void;
}

export const Modal: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <div class="modal">
            <div class="modal-overlay" onClick={props.close} />
            <div class="modal-container md:max-w-md">
                <div class="modal-content">
                    <div class="flex justify-between items-center pb-3">
                        <p class="text-2xl font-bold">{props.title}</p>
                        <div class="modal-close" onClick={props.close}>
                            <X />
                        </div>
                    </div>

                    {props.content}

                    <div className="flex justify-end pt-2" />
                </div>
            </div>
        </div>
    );
};
