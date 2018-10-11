import fs from 'fs';

export class FileSystemService {
    constructor() {}

    createFolder(path) {
        return new Promise((resolve, reject) => {
            if (!this.checkPathExists(path)) {
                fs.mkdir(path, function(err) {
                    if (err) reject(err);

                    console.log('Directory created successfully!');
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    createFile(path, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, content, 'utf8', function(err) {
                if (err) reject(err);

                console.log('File created successfully!');
                resolve();
            });
        });
    }

    checkPathExists(path) {
        return fs.existsSync(path);
    }
}
