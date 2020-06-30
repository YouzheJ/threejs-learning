export default {
    path: '/learning',
    name: 'learning',
    component: () => import('./index.vue'),
    children: [
        {
            path: 'test1',
            name: 'test1',
            component: () => import('./chapter1/test1.vue'),
        },
        {
            path: 'test2',
            name: 'test2',
            component: () => import('./chapter1/test2.vue'),
        },
        {
            path: 'test3',
            name: 'test3',
            component: () => import('./chapter1/test3.vue'),
        },
        {
            path: 'test4',
            name: 'test4',
            component: () => import('./chapter1/test4.vue'),
        },
    ],
}