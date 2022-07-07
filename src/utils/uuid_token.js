import { v4 } from 'uuid'
// 要生成一个随机的字符串，每次执行不能共发生变化，游客身份持久存储
export const getUUID = () => {
    let uuid = localStorage.getItem('uuid')
    if (!uuid) {
        uuid = v4();
        localStorage.setItem('uuid', uuid)
    }
    return uuid;
}