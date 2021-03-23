import { Injectable } from '@angular/core';
import { SharedApiService } from './shared-api.service';
import { FileManager } from "../models/file-manager.model";
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  public currentFile = new BehaviorSubject(new FileManager);
  file = this.currentFile.asObservable();

  oneFile: FileManager = new FileManager;
  constructor(public share: SharedApiService) { }

  getAllFiles() { 
    return this.share.getData("fileManager/getAllFiles");
  }

  addNewFiles() { 
    return this.share.postData("fileManager/addNewFiles", this.oneFile);
  }

  changeObservable(fileData: FileManager) {
    this.currentFile.next(fileData);
  }
}
