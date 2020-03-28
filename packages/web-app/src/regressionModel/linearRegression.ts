import regression, { DataPoint } from 'regression';
import { Issue } from 'models/Issue';

export const linearRegression = (data: DataPoint[], storyPoint: number): number => {
    if (data.length < 10) {
        const defaultData: DataPoint[] = [
            [1, 28800],
            [2, 86400],
            [3, 144000],
            [5, 201600],
            [8, 288000],
        ];
        const result = regression.linear(defaultData);
        return result.predict(storyPoint)[1];
    }
    const result = regression.linear(data);
    return result.predict(storyPoint)[1];
};

// Converts time from int to string based on the gitlab convertion:
// Default conversion rates are 1mo = 4w, 1w = 5d and 1d = 8h.
export const timeConvertion = (time: number): string => {
    let tmp: number = time;
    let timeString = '';
    if (tmp >= 576000) {
        const round: number = Math.floor(tmp / 576000); // equivilant to 1mo
        timeString = `${timeString + round}mo`;
        tmp = tmp - round * 576000;
    }
    if (tmp >= 144000) {
        const round: number = Math.floor(tmp / 144000); // equivilant to 1w
        timeString = `${timeString + round}w`;
        tmp = tmp - round * 144000;
    }
    if (tmp >= 28800) {
        const round = Math.floor(tmp / 28800); // equivilant to 1d
        timeString = `${timeString + round}d`;
        tmp = tmp - round * 28800;
    }
    if (tmp >= 3600) {
        const round: number = Math.floor(tmp / 3600); //equivilant to 1h
        timeString = `${timeString + round}h`;
        tmp = tmp - round * 3600;
    }
    return timeString;
};

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
