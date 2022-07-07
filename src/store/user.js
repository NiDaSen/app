import { reqGetCodeByPhone, reqRegister, reqUserLogin, reqGetUserInfo, reqLogout } from '@/api/index'
import { setToken, getToken, removeToken, permanentlySetToken, permanentlyGetToken, permanentlyRemoveToken } from '../utils/token'
export default {
    namespaced: true,
    state: {
        getCode: '',
        token: getToken() || permanentlyGetToken() || '',
        getUserInfo: {} //用户的信息
    },
    actions: {
        //通过收集手机号获取验证码
        async getCodeByPhone(context, phone) {
            let result = await reqGetCodeByPhone(phone);
            if (result.code == 200) {
                context.commit('GETCODEBYPHONE', result.data);
                return 'ok'
            } else {
                return Promise.reject(result.error);
            }
        },
        // 注册
        async completeRegister(context, data) {
            let result = await reqRegister(data)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error(result.error));
            }
        },
        //根据用户名和密码获取token
        async userLogin(context, data) {
            let result = await reqUserLogin(data);
            if (result.code == 200) {
                // 临时保存token
                data.isChecked ? permanentlySetToken(result.data.token) : setToken(result.data.token);
                context.commit('USERLOGIN', result.data.token);
                return 'ok'
            } else {
                return Promise.reject(result.error);
            }
        },
        // 获取用户信息根据请求头token
        async reqGetUserInfo(context) {
            let result = await reqGetUserInfo();
            if (result.code == 200) {
                context.commit('GETUSERINFO', result.data)
                return 'ok'
            } else {
                return Promise.reject(result.error, 'getUserInfos');
            }
        },
        //退出登录
        async logOut(context) {
            let result = await reqLogout();
            if (result.code == 200) {
                context.commit('CLEARLOGOUT')
                return 'ok'
            } else {
                return Promise.reject(result.error);
            }
        }

    },
    mutations: {
        GETCODEBYPHONE(state, getCode) {
            state.getCode = getCode
        },
        // 获取token用的唯一标识
        USERLOGIN(state, token) {
            state.token = token
        },
        // 用户的信息
        GETUSERINFO(state, getUserInfo) {
            state.getUserInfo = getUserInfo
        },
        // 退出登录
        CLEARLOGOUT(state) {
            state.token = '';
            state.getUserInfo = {}
            removeToken();
            permanentlyRemoveToken();
        }
    },
    getters: {
    }
}
