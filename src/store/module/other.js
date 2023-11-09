import {defineStore} from "pinia";
import {
    addGalleryClass,
    deleteGalleryClass,
    getGalleryList,
    getGalleryListByClass,
    updateGalleryClass
} from "@/api/other.js";

export const useOtherStore = defineStore("useOtherStore", {
    state: () => ({}),
    getters: {

    },
    actions: {
        getGalleryList({page,size}) {
            return new Promise((resolve, reject) => {
                getGalleryList(page, size).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getGalleryListByClass({id,page,limit}) {
            return new Promise((resolve, reject) => {
                getGalleryListByClass(id, page, limit).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addGalleryClass({name, order}) {
            return new Promise((resolve, reject) => {
                addGalleryClass(name, order).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateGalleryClass({id,name,order}) {
            return new Promise((resolve, reject) => {
                updateGalleryClass(id,name,order).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteGalleryClass({id}) {
            return new Promise((resolve, reject) => {
                deleteGalleryClass(id).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
})
