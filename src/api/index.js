import request from "@/utils/request.js";

export function getFirstStatistics() {
    return request.get("/admin/statistics1")
}
export function getSecondStatistics() {
    return request.get("/admin/statistics2")
}
export function getThirdStatistics(type) {
    return request.get("/admin/statistics3?type="+type)
}
