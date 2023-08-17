import { constantRoutes } from '@/router/index'

export default {
    namespaced: true,
    state: {
        routes: constantRoutes,
    },
    actions: {

    },
    mutations: {
        setRoutes(state, newRoutes) {
            state.routes = [...constantRoutes, ...newRoutes]
        }
    }
}