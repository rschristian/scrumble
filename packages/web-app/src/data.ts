/* eslint-disable @typescript-eslint/camelcase */

import { Workspace } from 'models/Workspace';
import { Issue } from 'models/Issue';
import { GLMilestone, GLMilestoneStatus } from 'models/Milestone';

export const workspaces: Workspace[] = [
    { id: 1, name: 'CUBRIC', description: 'Brain Tinder' },
    { id: 2, name: 'Sappo', description: 'Frogs n stuff' },
    { id: 3, name: 'Spot a Bee', description: 'Bees and Foxgloves' },
];

export const sprints: GLMilestone[] = [
    {
        id: 133,
        iid: 1,
        project_id: 7381,
        title: 'Sprint 1',
        description: 'Insert insightful and creative description of a sprint here',
        status: GLMilestoneStatus.closed,
        start_date: new Date(2020, 2, 11),
        due_date: new Date(2020, 2, 20),
    },
    {
        id: 134,
        iid: 1,
        project_id: 7381,
        title: 'Sprint 2',
        description: 'Insert insightful and creative description of a sprint here',
        status: GLMilestoneStatus.closed,
        start_date: new Date(2020, 2, 20),
        due_date: new Date(2020, 2, 5),
    },
    {
        id: 140,
        iid: 1,
        project_id: 7381,
        title: 'Sprint 3',
        description: 'Insert insightful and creative description of a sprint here',
        status: GLMilestoneStatus.open,
        start_date: new Date(2020, 2, 5),
        due_date: new Date(2020, 2, 19),
    },
];

export const issues: Issue[] = [
    {
        id: 1,
        name: 'empower dynamic e-commerce',
        description:
            'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.',
        storyPoint: 11,
        project: 'Fix San',
    },
    {
        id: 2,
        name: 'engage innovative synergies',
        description:
            'Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
        storyPoint: 2,
        project: 'Andalax',
    },
    {
        id: 3,
        name: 'harness value-added eyeballs',
        description:
            'Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
        storyPoint: 9,
        project: 'Tin',
    },
    {
        id: 4,
        name: 'innovate B2C infrastructures',
        description:
            'Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        storyPoint: 12,
        project: 'Stronghold',
    },
    {
        id: 5,
        name: 'matrix sexy markets',
        description:
            'Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
        storyPoint: 5,
        project: 'Opela',
    },
    {
        id: 6,
        name: 'seize revolutionary deliverables',
        description: 'In hac habitasse platea dictumst.',
        storyPoint: 2,
        project: 'Bitchip',
    },
    {
        id: 7,
        name: 'syndicate rich technologies',
        description:
            'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti.',
        storyPoint: 7,
        project: 'Tampflex',
    },
    {
        id: 8,
        name: 'iterate intuitive networks',
        description:
            'Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus.',
        storyPoint: 6,
        project: 'Sonsing',
    },
    {
        id: 9,
        name: 'synthesize compelling ROI',
        description: 'Etiam justo.',
        storyPoint: 11,
        project: 'Opela',
    },
    {
        id: 10,
        name: 'productize turn-key e-tailers',
        description:
            'Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
        storyPoint: 13,
        project: 'Overhold',
    },
    {
        id: 11,
        name: 'evolve plug-and-play synergies',
        description: 'Suspendisse potenti. Nullam porttitor lacus at turpis.',
        storyPoint: 6,
        project: 'Transcof',
    },
    {
        id: 12,
        name: 'morph frictionless paradigms',
        description:
            'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.',
        storyPoint: 3,
        project: 'Y-Solowarm',
    },
    {
        id: 13,
        name: 'exploit synergistic solutions',
        description:
            'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
        storyPoint: 11,
        project: 'Trippledex',
    },
    {
        id: 14,
        name: 'expedite intuitive metrics',
        description:
            'Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
        storyPoint: 11,
        project: 'Otcom',
    },
    {
        id: 15,
        name: 'brand clicks-and-mortar bandwidth',
        description:
            'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
        storyPoint: 11,
        project: 'Overhold',
    },
    {
        id: 16,
        name: 'generate user-centric relationships',
        description:
            'Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti.',
        storyPoint: 1,
        project: 'Duobam',
    },
    {
        id: 17,
        name: 'architect sexy markets',
        description:
            'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero.',
        storyPoint: 4,
        project: 'Voltsillam',
    },
    {
        id: 18,
        name: 'strategize extensible infomediaries',
        description:
            'Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor.',
        storyPoint: 13,
        project: 'Bitchip',
    },
    {
        id: 19,
        name: 'target user-centric channels',
        description:
            'Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.',
        storyPoint: 6,
        project: 'Lotlux',
    },
    {
        id: 20,
        name: 'transition synergistic paradigms',
        description:
            'Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis.',
        storyPoint: 1,
        project: 'Latlux',
    },
    {
        id: 21,
        name: 'seize 24/365 relationships',
        description:
            'Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.',
        storyPoint: 9,
        project: 'Flexidy',
    },
    {
        id: 22,
        name: 'enhance proactive channels',
        description:
            'Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
        storyPoint: 6,
        project: 'Flowdesk',
    },
    {
        id: 23,
        name: 'reintermediate leading-edge e-tailers',
        description:
            'Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.',
        storyPoint: 5,
        project: 'Keylex',
    },
    {
        id: 24,
        name: 'target robust convergence',
        description:
            'In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc.',
        storyPoint: 8,
        project: 'Asoka',
    },
    {
        id: 25,
        name: 'matrix transparent vortals',
        description: 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
        storyPoint: 5,
        project: 'Aerified',
    },
    {
        id: 26,
        name: 'utilize back-end mindshare',
        description:
            'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna.',
        storyPoint: 10,
        project: 'Asoka',
    },
    {
        id: 27,
        name: 'extend mission-critical vortals',
        description: 'Duis at velit eu est congue elementum. In hac habitasse platea dictumst.',
        storyPoint: 6,
        project: 'Zathin',
    },
    {
        id: 28,
        name: 'iterate frictionless deliverables',
        description: 'Duis bibendum. Morbi non quam nec dui luctus rutrum.',
        storyPoint: 12,
        project: 'Sonair',
    },
    {
        id: 29,
        name: 'cultivate sticky metrics',
        description:
            'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.',
        storyPoint: 9,
        project: 'Rank',
    },
    {
        id: 30,
        name: 'whiteboard killer e-commerce',
        description: 'Donec quis orci eget orci vehicula condimentum.',
        storyPoint: 7,
        project: 'Stringtough',
    },
    {
        id: 31,
        name: 'redefine cross-platform eyeballs',
        description:
            'Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
        storyPoint: 6,
        project: 'Holdlamis',
    },
    {
        id: 32,
        name: 'strategize synergistic infomediaries',
        description:
            'Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
        storyPoint: 6,
        project: 'It',
    },
    {
        id: 33,
        name: 'grow scalable schemas',
        description: 'Nullam varius. Nulla facilisi.',
        storyPoint: 12,
        project: 'Bitchip',
    },
    {
        id: 34,
        name: 'monetize bricks-and-clicks experiences',
        description:
            'In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna.',
        storyPoint: 12,
        project: 'Zoolab',
    },
    {
        id: 35,
        name: 'maximize vertical systems',
        description:
            'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
        storyPoint: 13,
        project: 'Regrant',
    },
    {
        id: 36,
        name: 'incubate cutting-edge action-items',
        description:
            'Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
        storyPoint: 9,
        project: 'Konklux',
    },
    {
        id: 37,
        name: 'innovate synergistic niches',
        description:
            'Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
        storyPoint: 11,
        project: 'Domainer',
    },
    {
        id: 38,
        name: 'benchmark back-end e-services',
        description:
            'Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula.',
        storyPoint: 9,
        project: 'Asoka',
    },
    {
        id: 39,
        name: 'e-enable 24/7 e-commerce',
        description: 'In hac habitasse platea dictumst.',
        storyPoint: 5,
        project: 'Fixflex',
    },
    {
        id: 40,
        name: 'synergize scalable infrastructures',
        description:
            'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.',
        storyPoint: 2,
        project: 'Zamit',
    },
];
