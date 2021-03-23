import { Injectable } from '@angular/core';
import { SharedApiService } from './shared-api.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAndUploadFileService {

  constructor(public share: SharedApiService) { }

  checkFile(imageName: string) {
    var object = {
      "fileName": imageName
    }
    return this.share.postData("checkAndUploadFiles/checkFile", object)
  }

  uploadImage(file: any) {
    return this.share.postFile("checkAndUploadFiles/uploadFile", file)
  }
}
