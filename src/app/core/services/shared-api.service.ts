import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SharedApiService {
  
  apiUrlFile: string = "http://localhost:56122";
  apiUrl: string = `${this.apiUrlFile}/api/`;
  apiUrlModify: string = "";

  constructor(public http: HttpClient) { }

  getData(url: string) {
    this.apiUrlModify = this.apiUrl + url;
    return this.http.get(this.apiUrlModify);
  }

  postData(url: string, data: any) {
    this.apiUrlModify = this.apiUrl + url;
    return this.http.post(this.apiUrlModify, data);
  }

  postFile(url: string, formData: string) {
    this.apiUrlModify = this.apiUrl + url;
    return this.http.post(this.apiUrlModify,formData, {reportProgress: true, observe: 'events'})
  }
}
