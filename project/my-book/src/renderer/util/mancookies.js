/**
 * cookie设置
 * 键名：userId
 * 键值：token
 */
const storage = window.localStorage; // 解决页面刷新 vuex数据不存在的问题
export function getLocalKey() {
    return storage.key(0);
}
export function getToken() {
    return storage.getItem(getLocalKey());
}
export function setToken(TokenKey, token) {
    return storage.setItem(TokenKey, token);
}
export function removeToken() {
    return storage.removeItem(getLocalKey());
}