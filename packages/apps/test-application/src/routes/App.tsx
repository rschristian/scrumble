import preact, { h } from 'preact';
import GanttChart from 'gantt_chart';

const App: preact.FunctionalComponent = () => {

    return (
        <div id="app">
            <GanttChart />
        </div>
    );
};

export default App;
