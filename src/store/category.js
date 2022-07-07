import { reqCategoryList } from "../api/index"


export default {
    namespaced: true,
    state: {
        // 根据接口的返回值初始化数据
        categoryLists: [],
    },
    actions: {
        async cateforyList(context) {
            let result = await reqCategoryList();
            if (result.code == 200) {
                context.commit('CATEGORYLIST', result.data);
            }

        }
    },
    mutations: {
        CATEGORYLIST(state, categoryLists) {
            state.categoryLists = categoryLists;
        }
    },
    getters: {

    }

}