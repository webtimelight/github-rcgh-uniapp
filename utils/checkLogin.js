const checkLogin = (backpage, backtype) => {
    const eap_user_token = uni.getStorageSync('eap_user_token');
    if (!eap_user_token) {
        uni.redirectTo({ url: '/pages/login/login?backpage=' + backpage + '&backtype=' + backtype });
        return false
    }
    return true
}
export default checkLogin