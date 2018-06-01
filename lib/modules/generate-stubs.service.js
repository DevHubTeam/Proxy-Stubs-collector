import fs from 'fs';
import hashString from 'string-hash';
import path from 'path';
var Storage = require('node-storage');

export class StubsGenerator {

    constructor(response, scenarioName) {
        this.response = response;
        this.scenarioName = scenarioName;
    }

    async save() {
        await this.setUpFolder();
        const urlHash = this.getUrlHash();
        await this.saveBodyFile(urlHash, this.body());
        await this.generateFileConfig();
        this.store = new Storage(`stubs_folder/${this.scenarioName}/config.json`);
        this.saveConfigToStorage();
    }

    saveBodyFile(urlHash, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(`stubs_folder/${this.scenarioName}/${urlHash}.json`, content, 'utf8', function (err) {
                console.log("The file was saved!");
                resolve();
            });
        });
    }

    setUpFolder() {
        const dir = `stubs_folder/${this.scenarioName}`;

        return new Promise((resolve, reject) => {
            if (!fs.existsSync(dir)) {
                fs.mkdir(dir, function (err) {
                    console.log("Directory created successfully!");
                    resolve();
                });
            } else {
                resolve();
            }
        });

    }

    body() {
        return this.response.body;
    }

    url() {
        const {
            uri
        } = this.response.request;
        return uri.href;
    }

    generateHashString(url) {
        return hashString(url);
    }

    generateFileConfig() {
        const dir = `stubs_folder/${this.scenarioName}/config.json`;
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(dir)) {
                fs.writeFile(dir, '{}', 'utf8', function (err) {
                    console.log("The file was saved!");
                    resolve();
                });
            }
            resolve();
        });
    }

    getUrlHash() {
        return hashString(this.url());
    }

    saveConfigToStorage() {
        let configs = this.store.get(`${this.scenarioName}`);
        console.log('check', configs);
        if (!configs) {
            configs = {};
        }
        configs[this.url()] = this.getUrlHash();

        this.store.put(`${this.scenarioName}`, configs);
    }
}