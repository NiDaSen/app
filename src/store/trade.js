import { reqGetAddressInfo, reqOrderInfo } from '../api/index'
export default {
    namespaced: true,
    state: {
        userAddressList: [],//获取用户存储地址信息
        orderInfoList: {},//存储商品信息
    },
    actions: {
        //获取用户存储地址的信息
        async getTradeAddress({ commit }) {
            let result = await reqGetAddressInfo();
            console.log(result.data);
            if (result.code === 200) {
                commit('GETTRADEADDRESS', result.data);
            }
        },
        //获取用户商品清单的信息
        async getOrderInfo({ commit }) {
            let result = await reqOrderInfo();
            console.log(result.data);
            if (result.code === 200) {
                commit('GETORDERINFO', result.data);
            }
        }
    },
    mutations: {
        // 获取地址的信息
        GETTRADEADDRESS(state, userAddressList) {
            state.userAddressList = userAddressList
        },
        // 获取清单的信息
        GETORDERINFO(state, orderInfoList) {
            state.orderInfoList = orderInfoList
        }
    },
    getters: {
    }
}
