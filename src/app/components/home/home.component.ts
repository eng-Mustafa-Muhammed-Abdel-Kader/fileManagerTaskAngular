import { Component, OnInit } from '@angular/core';
import { FileManagerService } from "src/app/core/services/file-manager.service";
import { SharedApiService } from "src/app/core/services/shared-api.service";
import { Response } from "src/app/core/models/response.model";
import { FileManager } from "src/app/core/models/file-manager.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listFilesData: FileManager[] = [];
  message: string = "";
  p: number = 1;
  ResponseData: Response = new Response;

  showLoading: boolean = false;
  showSuccess: boolean = false;
  showError: boolean = false;

  constructor(public fileS: FileManagerService, public share: SharedApiService, public router: Router) { }

  ngOnInit(): void {
    this.showLoading = true;
    this.fileS.getAllFiles().subscribe(res => {
      this.ResponseData = res as Response;
      if (this.ResponseData.status == 1) {
        this.listFilesData = this.ResponseData.data as FileManager[];
        this.showLoading = false;
      } else {
        this.message = this.ResponseData.message;
        this.showLoading = false;
        this.showError = true;
      }
    })
  }

  showDeatils(item: FileManager) {
    this.fileS.changeObservable(item);
    this.router.navigate(['/details-file']);

  }

}
