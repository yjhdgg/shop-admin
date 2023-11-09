import {defineStore} from "pinia";
import {getFirstStatistics, getSecondStatistics, getThirdStatistics} from "@/api/index.js";

export const useIndexStore = defineStore("useIndexStore", {
    state: () => ({}),
    getters: {},
    actions: {
        getFirstStatistics() {
            return new Promise((resolve, reject) => {
                getFirstStatistics()
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        getSecondStatistics() {
            return new Promise((resolve, reject) => {
                getSecondStatistics()
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        getThirdStatistics(type) {
            return new Promise((resolve, reject) => {
                getThirdStatistics(type)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        }

    }
});
