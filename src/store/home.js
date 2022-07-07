import { reqGetBannerList, reqGetFloorList } from '../api/index'

export default {
    namespaced: true,
    state: {
        getBannerList: [],//LIstContainer轮播图数据轮播图的数据
        getFloorList: []//LIstContainer轮播图数据

    },
    actions: {
        // LIstContainer轮播图数据
        async getBannerList(context, value) {
            let result = await reqGetBannerList();
            if (result.code == 200) {
                context.commit('GETBANNERLIST', result.data);
            }
        },
        // floor轮播图数据
        async getFloorList(context) {
            let result = await reqGetFloorList();
            if (result.code == 200) {
                context.commit('GETFLOORLIST', result.data);
            }
        }

    },
    mutations: {
        // LIstContainer轮播图数据
        GETBANNERLIST(state, getBannerList) {
            state.getBannerList = getBannerList
        },
        //LIstContainer轮播图数据
        GETFLOORLIST(state, getFloorList) {
            state.getFloorList = getFloorList
        }
    },
    getters: {

    }

}