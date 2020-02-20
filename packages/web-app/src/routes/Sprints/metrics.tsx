import { FunctionalComponent, h } from 'preact';

import Sidebar from 'components/Navigation/Sidebar';
import { sideNavItems } from 'routes/Sprints/util';
import MetricBubble from 'components/Metrics/bubble';
import burndown from 'assets/burndown.png';

const SprintMetrics: FunctionalComponent = () => {
    return (
        <div class="page">
            <div class="flex">
                <Sidebar items={sideNavItems} />
                <div className="main-content">
                    <h1 className="user-path">CUBRIC > Skyall > Metrics</h1>
                    <div className="create-bar">
                        <h1 className="page-heading">Metrics</h1>
                    </div>
                    <div class="bubble-container justify-between">
                        <MetricBubble
                            metric="Story Points Planned"
                            value="22/33"
                            bgColour="orange-500"
                            borderColour="orange-300"
                        />
                        <MetricBubble metric="Issues In Todo" value="22/30" bgColour="red-500" borderColour="red-300" />
                        <MetricBubble
                            metric="Issues In Progress"
                            value="22/30"
                            bgColour="purple-500"
                            borderColour="purple-300"
                        />
                        <MetricBubble
                            metric="Issues Closed"
                            value="10/15"
                            bgColour="green-500"
                            borderColour="green-300"
                        />
                        <MetricBubble
                            metric="Story Points Closed"
                            value="22/30"
                            bgColour="teal-500"
                            borderColour="teal-300"
                        />
                    </div>
                    <div>
                        <img src={burndown} class="mt-10 mb-5 mx-auto shadow-xl w-5/6" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SprintMetrics;
