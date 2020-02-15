import { FunctionalComponent, VNode } from 'preact';

interface IProps {
    if: boolean;
    children: VNode;
}

const Conditional: FunctionalComponent<IProps> = (props: IProps) => {
    return props.if ? props.children : null;
};

export default Conditional;
