import { FileSystemService } from "../../../services/file-system.service";

const BASE_PATH = 'stubs_folder';

export class StubsFileUtil {

    fileSystemService = new FileSystemService();

    constructor(scenarioName) {
        this.path = `${BASE_PATH}/${scenarioName}`;    
    }

    saveBodyFile(urlHash, content) {
        const path = `${this.path}/${urlHash}.json`

        return this.fileSystemService.createFile(path, content);
    }

    setUpFolder() {
        return this.fileSystemService.createFolder(this.path);
    }

}