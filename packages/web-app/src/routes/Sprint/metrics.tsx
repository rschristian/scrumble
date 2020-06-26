import { Fragment, FunctionalComponent, h } from 'preact';

import burndown from 'assets/burndown.png';
import GenericMetrics from 'components/CommonRoutes/Metrics';
import MetricBubble from 'components/CommonRoutes/Metrics/bubble';

const SprintMetrics: FunctionalComponent = () => {
    return (
        <GenericMetrics
            metricsContent={
                <Fragment>
                    <div class="bubble-container justify-between">
                        <MetricBubble
                            metric="Story Points Planned"
                            value="22/33"
                            bgColour="bg-orange-500"
                            borderColour="border-orange-300"
                        />
                        <MetricBubble
                            metric="Issues In Todo"
                            value="22/30"
                            bgColour="bg-red-500"
                            borderColour="border-red-300"
                        />
                        <MetricBubble
                            metric="Issues In Progress"
                            value="22/30"
                            bgColour="bg-purple-500"
                            borderColour="border-purple-300"
                        />
                        <MetricBubble
                            metric="Issues Closed"
                            value="10/15"
                            bgColour="bg-green-500"
                            borderColour="border-green-300"
                        />
                        <MetricBubble
                            metric="Story Points Closed"
                            value="22/30"
                            bgColour="bg-teal-500"
                            borderColour="border-teal-300"
                        />
                    </div>
                    <div>
                        <img
                            src={burndown}
                            class="mt-10 mb-5 mx-auto shadow-xl w-5/6"
                            alt="Placeholder burndown chart"
                        />
                    </div>
                </Fragment>
            }
        />
    );
};

export default SprintMetrics;
