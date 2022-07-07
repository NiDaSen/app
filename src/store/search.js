import { reqSearchInfo } from '../api/index'
export default {
    namespaced: true,
    state: {
        reqSearchInfo: {}
    },
    actions: {
        async searchInfo(context, value = {}) {
            // console.log(value);
            let result = await reqSearchInfo(value);
            if (result.code === 200) {
                context.commit('SEARCHINFO', result.data);
            }
        }
    },
    mutations: {
        SEARCHINFO(state, reqSearchInfo) {
            state.reqSearchInfo = reqSearchInfo
        }
    },
    getters: {
    }
}




