import fs from 'fs';
import hashString from 'string-hash';
import path from 'path';
import Storage from 'node-storage';
import { FileSystemService } from '../../services/file-system.service';
import { StubsConfigUtil } from './utils/stubs-config.util';

//@todo: move fileSytem to one service
// remove repeated functionalities 
export class StubsGenerator {

    FileSystemService;
    StorageService;
    minDir = 'stubs_folder';

    constructor(response, scenarioName) {
        this.response = response;
        this.scenarioName = scenarioName;
        this.FileSystemService = new FileSystemService();
    }

    get body() {
        return this.response.body;
    }

    get url() {
        const { uri } = this.response.request;
        return uri.href;
    }

    async save() {
        const urlHash = this.getUrlHash();
        const configInstance = new StubsConfigUtil(this.url, urlHash, this.scenarioName, `stubs_folder/${this.scenarioName}`);
        await this.setUpFolder();
        await this.saveBodyFile(urlHash, this.body);
        await configInstance.saveConfigs();
    }

    saveBodyFile(urlHash, content) {
        const path = `${this.minDir}/${this.scenarioName}/${urlHash}.json`

        return this.FileSystemService.createFile(path, content);
    }

    setUpFolder() {
        const dir = `stubs_folder/${this.scenarioName}`;

        return this.FileSystemService.createFolder(dir).catch((err)=>{
            console.log(err);
        });
    }

    getUrlHash() {
        return hashString(this.url);
    }
}