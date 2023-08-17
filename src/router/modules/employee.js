
import Layout from '@/layout'
export default
    {
        path: '/employee',
        name: 'employee',

        component: Layout,
        children: [{
            path: '',
            name: 'employee',
            component: () => import('@/views/employee/index'),
            meta: { title: '员工', icon: 'dashboard' }
        },
        {
            path: '/employee/detail',
            name: 'employ',
            hidden: true,
            component: () => import('@/views/employee/employ'),
            meta: { title: '员工添加', }
        },
        {
            path: `/employee/detail/:id?`,
            name: 'employ',
            hidden: true,
            component: () => import('@/views/employee/employ'),
            meta: { title: '员工添加', }
        }]
    }