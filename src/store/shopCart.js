import { reqShopCart, deleteShopCartById, reqUpdateCheckedById } from '../api/index'

export default {
    namespaced: true,
    state: {
        shopCartList: []
    },
    actions: {
        async shopCartList(context) {
            let result = await reqShopCart();
            if (result.code === 200) {
                context.commit('SHOPCARTLIST', result.data);
            }
        },
        // 删除的接口
        async deleteShopCartById({ commit }, skuId) {
            try {
                let result = await deleteShopCartById(skuId);
                if (result.code === 200) {
                    return 'ok'
                }
            } catch (error) {
                return 'error'
            }
        },
        // 修改每一个产品的选中的状态
        async updateCheckedById({ commit }, { skuId, isChecked }) {
            let result = await reqUpdateCheckedById(skuId, isChecked);
            if (result.code === 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        // 删除全部选中的商品
        deleteAllChecked(context) {
            let cartInfoList = context.state.shopCartList[0].cartInfoList;
            let PromiseAll = []
            cartInfoList.forEach((item) => {
                if (item.isChecked == 1) {
                    let promise = context.dispatch('deleteShopCartById', item.skuId)
                    PromiseAll.push(promise)
                }
            })
            // 只要都成功才成功，如果有一个次失败就是都失败
            return Promise.all(PromiseAll)
        },
        // 全选按钮的状态修改
        updateAllChecked(context, isChecked) {
            let cartInfoList = context.state.shopCartList[0].cartInfoList;
            let PromiseAll = [];
            cartInfoList.forEach((item) => {
                let skuId = item.skuId
                let promise = context.dispatch('updateCheckedById', { skuId, isChecked })
                PromiseAll.push(promise)
            })
            return Promise.all(PromiseAll)
        }
    },
    mutations: {
        SHOPCARTLIST(state, shopCartList) {
            state.shopCartList = shopCartList
        }
    },
    getters: {
        cartList(state) {
            return state.shopCartList[0] || {}
        }
    }
}
