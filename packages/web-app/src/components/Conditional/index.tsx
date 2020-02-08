import preact from 'preact';

interface IProps {
    if: boolean;
    children: preact.VNode;
}

const Conditional: preact.FunctionalComponent<IProps> = (props: IProps) => {
    return props.if ? props.children : null;
};

export default Conditional;
