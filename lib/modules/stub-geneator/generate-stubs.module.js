import fs from 'fs';
import hashString from 'string-hash';
import path from 'path';
import Storage from 'node-storage';
import { FileSystemService } from '../../services/file-system.service';
import { StubsConfigUtil } from './utils/stubs-config.util';
import { StubsFileUtil } from './utils/stubs-files.util';

//@todo: move fileSytem to one service
// remove repeated functionalities 
export class StubsGenerator {    

    constructor(response, scenarioName) {
        this.response = response;
        this.scenarioName = scenarioName;
        this.stubsFileUtils = new StubsFileUtil(scenarioName); 
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
        return this.stubsFileUtils.saveBodyFile(urlHash, content);
    }

    setUpFolder() {
        return this.stubsFileUtils.setUpFolder();
    }

    getUrlHash() {
        return hashString(this.url);
    }
}