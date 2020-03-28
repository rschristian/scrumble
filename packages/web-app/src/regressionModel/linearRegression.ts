import { Issue } from 'models/Issue';

// Grabs data to feed model
export const dataGrabber = (issues: Issue[]): number[][] => {
    const dataPoints: number[][] = [];
    issues.forEach((issue) => {
        if (issue.timeSpent !== null) {
            dataPoints.push([issue.storyPoints, issue.timeSpent]);
        }
    });
    return dataPoints;
};
