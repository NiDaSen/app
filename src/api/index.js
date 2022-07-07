// 当前模块：API进行统一管理
import requests from "./ajax";
import mockReqyests from "./mockAjax";

// 发请求:axios发请求返回结果是Promise对象
export const reqGetBannerList = () => mockReqyests.get('/mock/banner');
export const reqGetFloorList = () => mockReqyests.get('/mock/floor');
// 三级联动的接口
// get请求   无参数
export const reqCategoryList = () => requests.get('/api/product/getBaseCategoryList');
// 搜索模块请求的地址,post请求
export const reqSearchInfo = (params) => requests({ url: '/api/list', method: 'POST', data: params });
// 获得产品详情的信息接口
export const reqGoodsInfo = (skuId) => requests({ url: `/api/item/${skuId}`, method: 'get' });
// 将商品添加到购物车
export const reqAddOrUpdateShop = (skuId, skuName) => requests({ url: `/api/cart/addToCart/${skuId}/${skuName}`, method: 'post' });
//购物车的接口
export const reqShopCart = () => requests({ url: `/api/cart/cartList`, method: 'get' });
// 删除的接口
export const deleteShopCartById = (skuId) => requests({ url: `/api/cart/deleteCart/${skuId}`, method: 'delete' });
// 修改的接口/api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/api/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });
//注册的接口获取验证码
export const reqGetCodeByPhone = (phone) => requests({ url: `/api/user/passport/sendCode/${phone}`, method: 'get' });
// 完成注册的接口/api/user/passport/register
export const reqRegister = (data) => requests({ url: `/api/user/passport/register`, data, method: 'post' })
///api/user/passport/login登录的接口
export const reqUserLogin = (data) => requests({ url: '/api/user/passport/login', data, method: 'post' })
// / api / user / passport / auth / getUserInfo 根据token获取用户信息,用请求头获取用户信息
export const reqGetUserInfo = () => requests({ url: '/api/user/passport/auth/getUserInfo', method: 'get' })
//   / api / user / passport / logout
export const reqLogout = () => requests({ url: '/api/user/passport/logout' })
// 获取用户的保存地址/api/user/userAddress/auth/findUserAddressList
export const reqGetAddressInfo = () => requests({ url: '/api/user/userAddress/auth/findUserAddressList', method: 'GET' })
///api/order/auth/trade //获取提交订单信息
export const reqOrderInfo = () => requests({ url: '/api/order/auth/trade', method: 'GET' })
//提交订单/api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/api/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
//   / api / payment / weixin / createNative / { orderId } get 获取支付信息的
export const getPayInfo = (orderId) => requests({ url: `/api/payment/weixin/createNative/${orderId}`, method: 'GET' })


///api/payment/weixin/queryPayStatus/{orderId}   get
export const reqPayStatus = (orderId) => requests({ url: `/api/payment/weixin/queryPayStatus/{orderId}`, method: 'GET' })
// /api/order/auth/{page}/{limit}获取订单的信息 page 当前页码，limit一页显示多少条数据
export const getOrderInfo = (page, limit) => requests({ url: `/api/order/auth/${page}/${limit}`, method: 'GET' })




