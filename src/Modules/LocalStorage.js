import * as _ from 'lodash';

class LocalStorage {
    static initItem(key, initState) {
        if(!localStorage.getItem(key)) {
            this.setItem(key, initState);
        }
    }
    static setItem(key, value) {
        if(_.isObject(value)){
            value = JSON.stringify(value);
        }

        localStorage.setItem(key, value);
    }

    static getItem(key) {
        let storageItem = localStorage.getItem(key);

        if(!storageItem) {
            return null;
        }

        // Stored JSON
        if(storageItem[0] === '{') {
            return JSON.parse(storageItem);
        } else {
            return storageItem;
        }
    }

    static updateItem(key, cb){
        let updatedValue = cb(LocalStorage.getItem(key));
        LocalStorage.setItem(key, updatedValue);
    }
}

export default LocalStorage;