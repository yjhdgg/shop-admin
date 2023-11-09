import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

const TabsKey = "Tabs-Key"

export function getTabs() {

    return Cookies.get(TabsKey) ? JSON.parse(Cookies.get(TabsKey)) : undefined;
}

export function setTabs(tabs) {
    return Cookies.set(TabsKey, JSON.stringify(tabs))
}

export function removeTabs() {
    return Cookies.remove(TabsKey)
}
