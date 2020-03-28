import { Issue } from 'models/Issue';

// Grabs data to feed model
export const dataGrabber = (issues: Issue[]): Record<string, any> => {
    const xValues: number[] = [];
    const yValues: number[] = [];
    issues.forEach((issue) => {
        if (issue.timeSpent !== null) {
            xValues.push(issue.storyPoints);
            yValues.push(issue.timeSpent);
        }
    });
    return {
        storyPoints: xValues,
        timeSpent: yValues,
    };
};
