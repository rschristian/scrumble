import regression, { DataPoint } from 'regression';

export const linearRegression = (data: DataPoint[], storyPoint: number): number => {
    const result = regression.linear(data);
    return result.predict(storyPoint)[1];
};

export const timeConvertion = (time: number): string => {
    let tmp: number = time;
    let timeString = '';
    if (tmp >= 576000) {
        const round = Math.floor(tmp / 576000);
        timeString = `${timeString + round}mo`;
        tmp = tmp - round * 576000;
    }
    if (tmp >= 144000) {
        const round = Math.floor(tmp / 144000);
        timeString = `${timeString + round}w`;
        tmp = tmp - round * 144000;
    }
    if (tmp >= 28800) {
        const round = Math.floor(tmp / 28800);
        timeString = `${timeString + round}d`;
        tmp = tmp - round * 28800;
    }
    if (tmp >= 3600) {
        const round = Math.floor(tmp / 3600);
        timeString = `${timeString + round}h`;
        tmp = tmp - round * 3600;
    }
    return timeString;
};
