import request from "@/utils/request.js";

export function getGalleryList(page, limit) {
    return request.get(`/admin/image_class/${page}?limit=${limit}`);
}

export function getGalleryListByClass(id, page, limit) {
    return request.get(`/admin/image_class/${id}/image/${page}?limit=${limit}`);
}

export function addGalleryClass(name, order) {
    return request.post('/admin/image_class', {
        name, order
    });
}
export function updateGalleryClass(id,name,order) {
    return request.post('/admin/image_class/'+id, {
        name, order
    });
}
export function deleteGalleryClass(id) {
    return request.post('/admin/image_class/'+id+'/delete');
}
