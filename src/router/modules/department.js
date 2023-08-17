
import Layout from '@/layout'

export default
    {
        path: '/department',
        name: 'department',

        component: Layout,
        // redirect: '/department',
        children: [{
            path: 'department',
            name: 'department',
            component: () => import('@/views/department/index'),
            meta: { title: '组织', icon: 'dashboard' }
        }]
    }