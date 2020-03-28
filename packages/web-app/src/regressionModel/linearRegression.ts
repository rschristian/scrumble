import { Issue } from 'models/Issue';

// Grabs data to feed model
export const dataGrabber = (issues: Issue[]): number[][] => {
    const dataPoints: number[][] = [];
    issues.forEach((issue) => {
        if (issue.timeSpent > 0) {
            dataPoints.push([issue.storyPoint, issue.timeSpent]);
        }
    });
    return dataPoints;
};
