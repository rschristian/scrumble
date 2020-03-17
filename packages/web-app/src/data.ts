/* eslint-disable @typescript-eslint/camelcase */

import { Issue } from 'models/Issue';
import { Project } from 'models/Project';
import { Sprint, SprintStatus } from 'models/Sprint';
import { Workspace } from 'models/Workspace';

export const workspaces: Workspace[] = [
    { id: 1, name: 'CUBRIC', description: 'Brain Tinder' },
    { id: 2, name: 'Sappo', description: 'Frogs n stuff' },
    { id: 3, name: 'Spot a Bee', description: 'Bees and Foxgloves' },
];

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
    },
    {
        id: 140,
        iid: 1,
        projectId: 7381,
        title: 'Sprint 3',
        description: 'Insert insightful and creative description of a sprint here',
        status: SprintStatus.open,
        startDate: new Date(2020, 2, 5),
        dueDate: new Date(2020, 2, 19),
    },
];

export const issues: Issue[] = [
    {
        iid: 1,
        id: 1,
        state: 'opened',
        title: 'empower dynamic e-commerce',
        description:
            'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.',
        storyPoint: 11,
        projectId: 1,
    },
    {
        iid: 2,
        id: 2,
        state: 'closed',
        title: 'engage innovative synergies',
        description:
            'Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
        storyPoint: 2,
        projectId: 2,
    },
    {
        iid: 3,
        id: 3,
        state: 'opened',
        title: 'harness value-added eyeballs',
        description:
            'Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
        storyPoint: 9,
        projectId: 3,
    },
    {
        iid: 4,
        id: 4,
        state: 'opened',
        title: 'innovate B2C infrastructures',
        description:
            'Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        storyPoint: 12,
        projectId: 4,
    },
    {
        iid: 5,
        id: 5,
        state: 'opened',
        title: 'matrix sexy markets',
        description:
            'Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
        storyPoint: 5,
        projectId: 5,
    },
    {
        iid: 6,
        id: 6,
        state: 'opened',
        title: 'seize revolutionary deliverables',
        description: 'In hac habitasse platea dictumst.',
        storyPoint: 2,
        projectId: 1,
    },
    {
        iid: 7,
        id: 7,
        state: 'closed',
        title: 'syndicate rich technologies',
        description:
            'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti.',
        storyPoint: 7,
        projectId: 2,
    },
    {
        iid: 8,
        id: 8,
        state: 'closed',
        title: 'iterate intuitive networks',
        description:
            'Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus.',
        storyPoint: 6,
        projectId: 3,
    },
    {
        iid: 9,
        id: 9,
        state: 'opened',
        title: 'synthesize compelling ROI',
        description: 'Etiam justo.',
        storyPoint: 11,
        projectId: 4,
    },
    {
        iid: 10,
        id: 10,
        state: 'opened',
        title: 'productize turn-key e-tailers',
        description:
            'Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
        storyPoint: 13,
        projectId: 5,
    },
    {
        iid: 11,
        id: 11,
        state: 'opened',
        title: 'evolve plug-and-play synergies',
        description: 'Suspendisse potenti. Nullam porttitor lacus at turpis.',
        storyPoint: 6,
        projectId: 1,
    },
    {
        iid: 12,
        id: 12,
        state: 'closed',
        title: 'morph frictionless paradigms',
        description:
            'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.',
        storyPoint: 3,
        projectId: 2,
    },
    {
        iid: 13,
        id: 13,
        state: 'closed',
        title: 'exploit synergistic solutions',
        description:
            'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
        storyPoint: 11,
        projectId: 3,
    },
    {
        iid: 14,
        id: 14,
        state: 'closed',
        title: 'expedite intuitive metrics',
        description:
            'Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
        storyPoint: 11,
        projectId: 4,
    },
    {
        iid: 15,
        id: 15,
        state: 'closed',
        title: 'brand clicks-and-mortar bandwidth',
        description:
            'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
        storyPoint: 11,
        projectId: 5,
    },
    {
        iid: 16,
        id: 16,
        state: 'closed',
        title: 'generate user-centric relationships',
        description:
            'Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti.',
        storyPoint: 1,
        projectId: 1,
    },
    {
        iid: 17,
        id: 17,
        state: 'opened',
        title: 'architect sexy markets',
        description:
            'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero.',
        storyPoint: 4,
        projectId: 2,
    },
    {
        iid: 18,
        id: 18,
        state: 'opened',
        title: 'strategize extensible infomediaries',
        description:
            'Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor.',
        storyPoint: 13,
        projectId: 3,
    },
    {
        iid: 19,
        id: 19,
        state: 'opened',
        title: 'target user-centric channels',
        description:
            'Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.',
        storyPoint: 6,
        projectId: 4,
    },
    {
        iid: 20,
        id: 20,
        state: 'opened',
        title: 'transition synergistic paradigms',
        description:
            'Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis.',
        storyPoint: 1,
        projectId: 5,
    },
    {
        iid: 21,
        id: 21,
        state: 'opened',
        title: 'seize 24/365 relationships',
        description:
            'Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.',
        storyPoint: 9,
        projectId: 1,
    },
    {
        iid: 22,
        id: 22,
        state: 'opened',
        title: 'enhance proactive channels',
        description:
            'Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
        storyPoint: 6,
        projectId: 2,
    },
    {
        iid: 23,
        id: 23,
        state: 'opened',
        title: 'reintermediate leading-edge e-tailers',
        description:
            'Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.',
        storyPoint: 5,
        projectId: 3,
    },
    {
        iid: 24,
        id: 24,
        state: 'opened',
        title: 'target robust convergence',
        description:
            'In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc.',
        storyPoint: 8,
        projectId: 4,
    },
    {
        iid: 25,
        id: 25,
        state: 'opened',
        title: 'matrix transparent vortals',
        description: 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
        storyPoint: 5,
        projectId: 5,
    },
    {
        iid: 26,
        id: 26,
        state: 'opened',
        title: 'utilize back-end mindshare',
        description:
            'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna.',
        storyPoint: 10,
        projectId: 1,
    },
    {
        iid: 27,
        id: 27,
        state: 'opened',
        title: 'extend mission-critical vortals',
        description: 'Duis at velit eu est congue elementum. In hac habitasse platea dictumst.',
        storyPoint: 6,
        projectId: 2,
    },
    {
        iid: 28,
        id: 28,
        state: 'opened',
        title: 'iterate frictionless deliverables',
        description: 'Duis bibendum. Morbi non quam nec dui luctus rutrum.',
        storyPoint: 12,
        projectId: 3,
    },
    {
        iid: 29,
        id: 29,
        state: 'closed',
        title: 'cultivate sticky metrics',
        description:
            'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.',
        storyPoint: 9,
        projectId: 4,
    },
    {
        iid: 30,
        id: 30,
        state: 'closed',
        title: 'whiteboard killer e-commerce',
        description: 'Donec quis orci eget orci vehicula condimentum.',
        storyPoint: 7,
        projectId: 5,
    },
    {
        iid: 31,
        id: 31,
        state: 'closed',
        title: 'redefine cross-platform eyeballs',
        description:
            'Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
        storyPoint: 6,
        projectId: 1,
    },
    {
        iid: 32,
        id: 32,
        state: 'closed',
        title: 'strategize synergistic infomediaries',
        description:
            'Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
        storyPoint: 6,
        projectId: 2,
    },
    {
        iid: 33,
        id: 33,
        state: 'closed',
        title: 'grow scalable schemas',
        description: 'Nullam varius. Nulla facilisi.',
        storyPoint: 12,
        projectId: 3,
    },
    {
        iid: 34,
        id: 33,
        state: 'closed',
        title: 'monetize bricks-and-clicks experiences',
        description:
            'In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna.',
        storyPoint: 12,
        projectId: 4,
    },
    {
        iid: 35,
        id: 35,
        state: 'opened',
        title: 'maximize vertical systems',
        description:
            'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
        storyPoint: 13,
        projectId: 5,
    },
    {
        iid: 36,
        id: 36,
        state: 'opened',
        title: 'incubate cutting-edge action-items',
        description:
            'Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
        storyPoint: 9,
        projectId: 1,
    },
    {
        iid: 37,
        id: 37,
        state: 'opened',
        title: 'innovate synergistic niches',
        description:
            'Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
        storyPoint: 11,
        projectId: 2,
    },
    {
        iid: 38,
        id: 38,
        state: 'closed',
        title: 'benchmark back-end e-services',
        description:
            'Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula.',
        storyPoint: 9,
        projectId: 3,
    },
    {
        iid: 39,
        id: 39,
        state: 'opened',
        title: 'e-enable 24/7 e-commerce',
        description: 'In hac habitasse platea dictumst.',
        storyPoint: 5,
        projectId: 4,
    },
    {
        iid: 40,
        id: 40,
        state: 'closed',
        title: 'synergize scalable infrastructures',
        description:
            'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.',
        storyPoint: 2,
        projectId: 5,
    },
];

export const projects: Project[] = [
    {
        id: 1,
        name: 'Fix San',
        url: 'www.pm.com',
    },
    {
        id: 2,
        name: 'Zamit',
        url: 'www.cw.com',
    },
    {
        id: 3,
        name: 'Fixflex',
        url: 'www.rots.com',
    },
    {
        id: 4,
        name: 'Asoka',
        url: 'www.rots.com',
    },
    {
        id: 5,
        name: 'Domainer',
        url: 'www.rots.com',
    },
];

// Vehemently disagree with this, so disabled for now
// export const storyPoints: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
