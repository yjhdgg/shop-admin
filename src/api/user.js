import request from "@/utils/request.js";

export function login(userName, password) {
    return request.post("/admin/login", {
        username: userName,
        password: password
    })
}

export function logout() {
    return request.post("/admin/logout")
}

export function getUserInfo() {
    return request.post("/admin/getinfo")
}

export function resetPwd(oldPwd, newPwd, checkPwd) {
    return request.post("/admin/updatepassword", {
        oldpassword: oldPwd,
        password: newPwd,
        repassword: checkPwd
    })
}





