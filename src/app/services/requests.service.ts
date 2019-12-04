import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  protected url: string = "http://niisku.lamk.fi/~Aliaksei17001/WebFrameworks19/courses/";
  constructor(private http: HttpClient) {}
  addItem(item: any, req: string):Observable<any>{
    return this.http.post<any>(this.url+req, item);
  }
  getItem(req:string):Observable<any>{
    return this.http.get<any>(this.url+req);
  }
  updateItem(item: any, req: string):Observable<any>{
    return this.http.put<any>(this.url+req, item);
  }
  deleteItem(req: string):Observable<any>{
    return this.http.delete(this.url+req);
  }
}
