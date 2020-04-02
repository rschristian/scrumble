/* eslint-disable @typescript-eslint/camelcase */

import { Issue, IssueStatus } from 'models/Issue';
import { Project } from 'models/Project';
import { Sprint, SprintStatus } from 'models/Sprint';

export const sprints: Sprint[] = [
    {
        id: 133,
        iid: 1,
        projectId: 7381,
        title: 'Sprint 1',
        description: 'Insert insightful and creative description of a sprint here',
        status: SprintStatus.closed,
        startDate: new Date(2020, 2, 11),
        dueDate: new Date(2020, 2, 20),
        totalStoryPoint: 35,
        totalNumberOfIssues: 15,
    },
    {
        id: 134,
        iid: 1,
        projectId: 7381,
        title: 'Sprint 2',
        description: 'Insert insightful and creative description of a sprint here',
        status: SprintStatus.closed,
        startDate: new Date(2020, 2, 20),
        dueDate: new Date(2020, 2, 5),
        totalStoryPoint: 40,
        totalNumberOfIssues: 20,
    },
    {
        id: 140,
        iid: 1,
        projectId: 7381,
        title: 'Sprint 3',
        description: 'Insert insightful and creative description of a sprint here',
        status: SprintStatus.active,
        startDate: new Date(2020, 2, 5),
        dueDate: new Date(2020, 2, 19),
        totalStoryPoint: 45,
        totalNumberOfIssues: 17,
    },
];

export const issues: Issue[] = [
    {
        iid: 1,
        status: IssueStatus.open,
        title: 'empower dynamic e-commerce',
        description:
            'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.',
        storyPoint: 11,
        projectId: 1,
    },
    {
        iid: 2,
        status: IssueStatus.closed,
        title: 'engage innovative synergies',
        description:
            'Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
        storyPoint: 2,
        projectId: 2,
    },
    {
        iid: 3,
        status: IssueStatus.open,
        title: 'harness value-added eyeballs',
        description:
            'Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
        storyPoint: 9,
        projectId: 3,
    },
    {
        iid: 4,
        status: IssueStatus.open,
        title: 'innovate B2C infrastructures',
        description:
            'Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        storyPoint: 12,
        projectId: 4,
    },
    {
        iid: 5,
        status: IssueStatus.open,
        title: 'matrix sexy markets',
        description:
            'Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
        storyPoint: 5,
        projectId: 5,
    },
    {
        iid: 6,
        status: IssueStatus.open,
        title: 'seize revolutionary deliverables',
        description: 'In hac habitasse platea dictumst.',
        storyPoint: 2,
        projectId: 1,
    },
    {
        iid: 7,
        status: IssueStatus.closed,
        title: 'syndicate rich technologies',
        description:
            'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti.',
        storyPoint: 7,
        projectId: 2,
    },
    {
        iid: 8,
        status: IssueStatus.closed,
        title: 'iterate intuitive networks',
        description:
            'Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus.',
        storyPoint: 6,
        projectId: 3,
    },
    {
        iid: 9,
        status: IssueStatus.closed,
        title: 'synthesize compelling ROI',
        description: 'Etiam justo.',
        storyPoint: 11,
        projectId: 4,
    },
    {
        iid: 10,
        status: IssueStatus.closed,
        title: 'productize turn-key e-tailers',
        description:
            'Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
        storyPoint: 13,
        projectId: 5,
    },
    {
        iid: 11,
        status: IssueStatus.open,
        title: 'evolve plug-and-play synergies',
        description: 'Suspendisse potenti. Nullam porttitor lacus at turpis.',
        storyPoint: 6,
        projectId: 1,
    },
    {
        iid: 12,
        status: IssueStatus.closed,
        title: 'morph frictionless paradigms',
        description:
            'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.',
        storyPoint: 3,
        projectId: 2,
    },
    {
        iid: 13,
        status: IssueStatus.closed,
        title: 'exploit synergistic solutions',
        description:
            'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
        storyPoint: 11,
        projectId: 3,
    },
    {
        iid: 14,
        status: IssueStatus.closed,
        title: 'expedite intuitive metrics',
        description:
            'Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
        storyPoint: 11,
        projectId: 4,
    },
    {
        iid: 15,
        status: IssueStatus.closed,
        title: 'brand clicks-and-mortar bandwidth',
        description:
            'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
        storyPoint: 11,
        projectId: 5,
    },
    {
        iid: 16,
        status: IssueStatus.closed,
        title: 'generate user-centric relationships',
        description:
            'Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti.',
        storyPoint: 1,
        projectId: 1,
    },
    {
        iid: 17,
        status: IssueStatus.open,
        title: 'architect sexy markets',
        description:
            'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero.',
        storyPoint: 4,
        projectId: 2,
    },
    {
        iid: 18,
        status: IssueStatus.open,
        title: 'strategize extensible infomediaries',
        description:
            'Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor.',
        storyPoint: 13,
        projectId: 3,
    },
    {
        iid: 19,
        status: IssueStatus.open,
        title: 'target user-centric channels',
        description:
            'Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.',
        storyPoint: 6,
        projectId: 4,
    },
    {
        iid: 20,
        status: IssueStatus.open,
        title: 'transition synergistic paradigms',
        description:
            'Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis.',
        storyPoint: 1,
        projectId: 5,
    },
    {
        iid: 21,
        status: IssueStatus.open,
        title: 'seize 24/365 relationships',
        description:
            'Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.',
        storyPoint: 9,
        projectId: 1,
    },
    {
        iid: 22,
        status: IssueStatus.open,
        title: 'enhance proactive channels',
        description:
            'Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
        storyPoint: 6,
        projectId: 2,
    },
    {
        iid: 23,
        status: IssueStatus.open,
        title: 'reintermediate leading-edge e-tailers',
        description:
            'Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.',
        storyPoint: 5,
        projectId: 3,
    },
    {
        iid: 24,
        status: IssueStatus.open,
        title: 'target robust convergence',
        description:
            'In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc.',
        storyPoint: 8,
        projectId: 4,
    },
    {
        iid: 25,
        status: IssueStatus.open,
        title: 'matrix transparent vortals',
        description: 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
        storyPoint: 5,
        projectId: 5,
    },
    {
        iid: 26,
        status: IssueStatus.open,
        title: 'utilize back-end mindshare',
        description:
            'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna.',
        storyPoint: 10,
        projectId: 1,
    },
    {
        iid: 27,
        status: IssueStatus.open,
        title: 'extend mission-critical vortals',
        description: 'Duis at velit eu est congue elementum. In hac habitasse platea dictumst.',
        storyPoint: 6,
        projectId: 2,
    },
    {
        iid: 28,
        status: IssueStatus.open,
        title: 'iterate frictionless deliverables',
        description: 'Duis bibendum. Morbi non quam nec dui luctus rutrum.',
        storyPoint: 12,
        projectId: 3,
    },
    {
        iid: 29,
        status: IssueStatus.closed,
        title: 'cultivate sticky metrics',
        description:
            'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.',
        storyPoint: 9,
        projectId: 4,
    },
    {
        iid: 30,
        status: IssueStatus.closed,
        title: 'whiteboard killer e-commerce',
        description: 'Donec quis orci eget orci vehicula condimentum.',
        storyPoint: 7,
        projectId: 5,
    },
    {
        iid: 31,
        status: IssueStatus.closed,
        title: 'redefine cross-platform eyeballs',
        description:
            'Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
        storyPoint: 6,
        projectId: 1,
    },
    {
        iid: 32,
        status: IssueStatus.closed,
        title: 'strategize synergistic infomediaries',
        description:
            'Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
        storyPoint: 6,
        projectId: 2,
    },
    {
        iid: 33,
        status: IssueStatus.closed,
        title: 'grow scalable schemas',
        description: 'Nullam varius. Nulla facilisi.',
        storyPoint: 12,
        projectId: 3,
    },
    {
        iid: 34,
        status: IssueStatus.closed,
        title: 'monetize bricks-and-clicks experiences',
        description:
            'In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna.',
        storyPoint: 12,
        projectId: 4,
    },
    {
        iid: 35,
        status: IssueStatus.open,
        title: 'maximize vertical systems',
        description:
            'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
        storyPoint: 13,
        projectId: 5,
    },
    {
        iid: 36,
        status: IssueStatus.open,
        title: 'incubate cutting-edge action-items',
        description:
            'Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
        storyPoint: 9,
        projectId: 1,
    },
    {
        iid: 37,
        status: IssueStatus.open,
        title: 'innovate synergistic niches',
        description:
            'Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
        storyPoint: 11,
        projectId: 2,
    },
    {
        iid: 38,
        status: IssueStatus.open,
        title: 'benchmark back-end e-services',
        description:
            'Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula.',
        storyPoint: 9,
        projectId: 3,
    },
    {
        iid: 39,
        status: IssueStatus.open,
        title: 'e-enable 24/7 e-commerce',
        description: 'In hac habitasse platea dictumst.',
        storyPoint: 5,
        projectId: 4,
    },
];

export const projects: Project[] = [
    {
        id: 1,
        name: 'Fix San',
    },
    {
        id: 2,
        name: 'Zamit',
    },
    {
        id: 3,
        name: 'Fixflex',
    },
    {
        id: 4,
        name: 'Asoka',
    },
    {
        id: 5,
        name: 'Domainer',
    },
];

// Vehemently disagree with this, so disabled for now
// export const storyPoints: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
