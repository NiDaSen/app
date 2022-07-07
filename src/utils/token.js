// 临时保存
export const setToken = (token) => {
    sessionStorage.setItem('TOKEN', token)
}
export const getToken = () => {
    return sessionStorage.getItem('TOKEN')
}
export const removeToken = () => {
    sessionStorage.removeItem('TOKEN')
}
//长久的保存
export const permanentlySetToken = (token) => {
    localStorage.setItem('TOKEN', token)
}
export const permanentlyGetToken = () => {
    return localStorage.getItem('TOKEN')
}
export const permanentlyRemoveToken = () => {
    localStorage.removeItem('TOKEN')
    console.log(456);
    console.log(456);
}
