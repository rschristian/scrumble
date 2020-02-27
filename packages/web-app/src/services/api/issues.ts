import axios, { AxiosResponse } from 'axios';

import { Issue } from 'models/Issue';

export async function fetchIssueTest(): Promise<AxiosResponse<Issue>> {
    return await axios.get('/issues/1').then((response) => {
        console.log(response);
        return response;
    });
}
