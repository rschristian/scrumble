import { Fragment, FunctionalComponent, h, VNode } from 'preact';

interface IProps {
    metricsContent: VNode;
}

export const GenericMetrics: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <Fragment>
            <div class="create-bar">
                <h1 class="page-heading">Metrics</h1>
            </div>
            {props.metricsContent}
        </Fragment>
    );
};
