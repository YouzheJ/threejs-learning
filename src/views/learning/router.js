export default {
    path: '/learning',
    name: 'learning',
    component: () => import('./index.vue'),
    children: [
        {
            path: 'test1',
            name: 'test1',
            component: () => import('./test1.vue'),
        },
    ],
}