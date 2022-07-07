import { reqGoodsInfo, reqAddOrUpdateShop } from '../api/index'
import { getUUID } from '../utils/uuid_token'

export default {
    namespaced: true,
    state: {
        goodInfo: {},
        // 游客的临时身份
        uuid: getUUID(),
    },
    actions: {
        async getGoodInfo(context, value) {
            try {
                let result = await reqGoodsInfo(value);
                if (result.code == 200) {
                    context.commit('GETGOODINFO', result.data);
                }
            } catch (error) {

            }

        },
        // 加入购物车
        async addOrUpdateShop(context, { skuId, skuNum }) {
            let result = await reqAddOrUpdateShop(skuId, skuNum);
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        }
    },
    mutations: {
        GETGOODINFO(state, goodInfo) {
            state.goodInfo = goodInfo;
        },
    },
    getters: {
        // 路径导航简化的数据
        categoryView(state) {
            return state.goodInfo.categoryView || {};
        },
        // 简化产品信息数据
        skuInfo(state) {
            return state.goodInfo.skuInfo || {};
        },
        // 产品售卖属性的简化
        spuSaleAttrList(state) {
            return state.goodInfo.spuSaleAttrList || [];
        }

    }
}
