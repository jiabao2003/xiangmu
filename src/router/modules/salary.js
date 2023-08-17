
import Layout from '@/layout'
export default
    {
        path: '/salary',
        name: 'salary',

        component: Layout,
        // redirect: '/salary',
        children: [{
            path: 'salary',
            name: 'salary',
            component: () => import('@/views/salary/index'),
            meta: { title: '工资', icon: 'dashboard' }
        }]
    }