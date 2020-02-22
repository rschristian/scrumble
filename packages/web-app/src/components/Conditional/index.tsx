import { FunctionalComponent, VNode } from 'preact';

interface IProps {
    if: boolean;
    children: VNode;
}

export const Conditional: FunctionalComponent<IProps> = (props: IProps) => {
    return props.if ? props.children : null;
};
