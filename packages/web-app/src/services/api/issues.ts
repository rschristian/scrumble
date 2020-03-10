import { apiService } from 'ts-api-toolkit';

import { Issue } from 'models/Issue';

export async function fetchIssueTest(): Promise<Issue | string> {
    return await apiService
        .get('/issues/1')
        .then(({ data }) => {
            return data;
        })
        .catch(({ response }) => {
            if (response.data !== '') {
                return response.data.message;
            }
            return 'Unknown error';
        });
}
