import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient:HttpClient) { }

  getData(resource: string) {
    return this.httpClient.get(`http://localhost:8000/api/${resource}`);
  }

  insertData(resource: string, data: any) {
    return this.httpClient.post(`http://localhost:8000/api/${resource}`, data);
  }

  deleteData(resource: string, id: string) {
    return this.httpClient.delete(`http://localhost:8000/api/${resource}/${id}`);
  }

  getById(resource: string, id: string) {
    return this.httpClient.get(`http://localhost:8000/api/${resource}/${id}`);
  }
}
