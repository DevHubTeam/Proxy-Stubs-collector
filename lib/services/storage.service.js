import Storage from 'node-storage';

export class StorageService {

    isInitialized=false;
    pathToStorage;
    store;
   
    constructor(path) {
        this.pathToStorage = path;
    }
    
    init(){
        this.store = new Storage(this.pathToStorage);
        this.isInitialized = true;
    }

    checkInitialized(){
        if(!this.isInitialized) throw new Error('Storage need to be Initialized!');
    }

    getItem(key){
        this.checkInitialized();

        return this.store.get(key);
    }

    setItem(key, value){
        this.checkInitialized();
        
        return this.store.put(key, value);
    }
}