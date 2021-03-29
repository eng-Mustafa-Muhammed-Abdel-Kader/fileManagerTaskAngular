import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FileManagerService } from "src/app/core/services/file-manager.service";
import { CheckAndUploadFileService } from "src/app/core/services/check-and-upload-file.service";
import { SharedApiService } from "src/app/core/services/shared-api.service";
import { Response } from "src/app/core/models/response.model";
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent implements OnInit {
  message: string = "";
  ResponseData: Response = new Response;

  showLoading: boolean = false;
  showSuccess: boolean = false;
  showError: boolean = false;


  fileForm: FormGroup;

    // variables for images
    image: any = "";
    fileType: string = "";
  
    public progress : number = 0;
    fileToUpload : File ;
    fileToUploadUpdate : File;
    // Dialog Variable
    @Output() public onUploadFinished = new EventEmitter();
    formData = new FormData();
    fullPath: string = "";
    api: string = "";
    imageName: any;
    // end variables for images

  constructor(public fileS: FileManagerService, public check: CheckAndUploadFileService, public share: SharedApiService, public builder: FormBuilder, public router: Router) { 
    this.fileForm = new FormGroup({
      descreption: new FormControl(this.fileS.oneFile.descreption, Validators.compose([Validators.required, Validators.minLength(20), Validators.maxLength(200), Validators.pattern(new RegExp('^[a-zA-Z\\s\\-_.]*$'))]))
    });
  }

  ngOnInit(): void {
    this.fileS.oneFile = {
      id: 0,
      descreption: '',
      creatationDate: new Date(),
      documentURL: '',
      fileType: ''
    }

  }

    
  loadFile(files: any) {
    if (files.Length === 0) {
      alert("Please Select The Image To Upload");
      this.showLoading = false;
      return;
    }

    this.showLoading = true;
    this.fileToUpload = <File>files[0];
    let fileToUploadfinish = files[0];
    this.fileType = this.fileToUpload.type;
      //Show image preview
      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.image = reader.result;
      }
      reader.readAsDataURL(fileToUploadfinish); 
    this.showLoading = false;
  }

  handleFileInput(file: File) {
    let fileToUploadfinish = file;

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageName = event.target.response;
    }
    reader.readAsDataURL(fileToUploadfinish);
  }

  saveData() {
    if (this.fileForm.invalid) {
      this.fileForm.controls['descreption'].markAsDirty();
      return;
    }

    if (this.fileToUpload.name == "") {
      this.message = "please Add File For You";
      this.showError = true;
      return 
    }

    this.showLoading = true;
    const formData = new FormData();
    formData.append('file',this.fileToUpload,this.fileToUpload.name);
    var filename: string = this.fileToUpload.name; 
    this.check.uploadImage(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.handleFileInput(this.fileToUpload);
      }
      else if (event.type === HttpEventType.Response){
        debugger
        this.onUploadFinished.emit(event.body);
        this.ResponseData = event.body as Response;
        let splitPath: string[] = (this.ResponseData.data as string).split('\\');
        this.fullPath = `/Resources/${splitPath[splitPath.length - 1]}`;
        this.fileS.oneFile.documentURL = this.fullPath;
        this.fileS.oneFile.fileType = this.fileToUpload.type;
        this.fileS.addNewFiles().subscribe(res => {
          this.ResponseData = res as Response;
          if (this.ResponseData.status == 1) {
            this.message = "data saved";
            this.showSuccess = true;
            this.showLoading = false;
            this.router.navigate(['/home'])
          } else {
            this.message = this.ResponseData.message;
            this.showLoading = false;
            this.showError = true;
          }
        })
      }
    });

  }

}
