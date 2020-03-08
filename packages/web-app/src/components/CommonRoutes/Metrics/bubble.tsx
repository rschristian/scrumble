import { FunctionalComponent, h } from 'preact';

interface IProps {
    metric: string;
    value: string;
    bgColour: string;
    borderColour: string;
}

export const MetricBubble: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <div class={`m-4 h-40 w-40 rounded-full shadow-xl border-8 ${props.bgColour} ${props.borderColour}`}>
            <div class="flex flex-col justify-center items-center mt-4">
                <span class="font-bold text-white text-center text-2xl">{props.value}</span>
                <span class="font-bold text-white text-center text-lg">{props.metric}</span>
            </div>
        </div>
    );
};
