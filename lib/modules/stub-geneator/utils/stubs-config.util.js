import { StorageService } from '../../../services/storage.service';
import { FileSystemService } from '../../../services/file-system.service';


export class StubsConfigUtil {

    fileSystem = new FileSystemService();
    store;
    
    constructor(url, urlHash, scenarioName, path) {
        this.url = url;
        this.urlHash = urlHash;
        this.path = path+'/config.json';
        this.scenarioName = scenarioName;
        this.store = new StorageService(this.path);
    }

    async saveConfigs(){
        await this.generateConfigFile();
        this.store.init();
        this.saveConfigToStorage();
    }

    generateConfigFile() {
        if (this.fileSystem.checkPathExists(this.path)) return;
       
        let configMetaDetails = {
            scenarioName: this.scenarioName,
            date: new Date()
        }
    
        return this.fileSystem.createFile(path, JSON.stringify(configMetaDetails));
    }

    saveConfigToStorage() {
        let configs = this.store.getItem(this.scenarioName);

        if (!configs) {
            configs = {};
        }
        configs[this.url] = this.urlHash;

        this.store.setItem(this.scenarioName, configs);
    }
}