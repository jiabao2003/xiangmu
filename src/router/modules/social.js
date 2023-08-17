
import Layout from '@/layout'
export default
    {
        path: '/social',
        component: Layout,
        name: 'social',
        // redirect: '/social',
        children: [{
            path: 'social',
            name: 'social',
            component: () => import('@/views/social/index'),
            meta: { title: '社保', icon: 'dashboard' }
        }]
    }