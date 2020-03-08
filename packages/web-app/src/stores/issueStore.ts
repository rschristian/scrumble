import { observable, autorun } from 'mobx';
import { Issue } from 'models/Issue';
import { issues } from 'data';

class IssueStore {
    @observable issues: Issue[] = issues;
    addNewIssue(value: Issue): void {
        value.id = this.issues.length;
        this.issues.push(value);
    }
    deleteIssue(value: number): void {
        console.log(value);
        this.issues.splice(value, 1);
    }
}
const store = new IssueStore();

export default store;
