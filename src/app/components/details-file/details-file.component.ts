import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedApiService } from "src/app/core/services/shared-api.service";
import { FileManager } from "src/app/core/models/file-manager.model";
import { FileManagerService } from "src/app/core/services/file-manager.service";

@Component({
  selector: 'app-details-file',
  templateUrl: './details-file.component.html',
  styleUrls: ['./details-file.component.css']
})
export class DetailsFileComponent implements OnInit {
  fileData: FileManager ;
  
  constructor(public route: Router, public share: SharedApiService, public fileS: FileManagerService) { 
  }

  ngOnInit(): void {
    this.fileS.file.subscribe(message => this.fileData = message);
    console.log(this.fileData);
    
  }

}
