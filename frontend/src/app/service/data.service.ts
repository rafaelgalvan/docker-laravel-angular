import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient:HttpClient) { }

  /**
   * Get all the database entries for the specified resource
   * @param resource word that completes the api URL to match the correspondent resource
   */
  getData(resource: string) {
    return this.httpClient.get(`http://localhost:8000/api/${resource}`, httpOptions);
  }

  /**
   * Insert a new resource in the database
   * @param resource word that completes the api URL to match the correspondent resource
   * @param data the object to insert in the database
   */
  insertData(resource: string, data: any) {
    return this.httpClient.post(`http://localhost:8000/api/${resource}`, data, httpOptions);
  }

  /**
   * Update an existing resource in the database
   * @param resource word that completes the api URL to match the correspondent resource
   * @param data the object to insert in the database
   * @param id id of the resource to update
   */
  updateData(resource: string, data: any, id: string) {
    return this.httpClient.put(`http://localhost:8000/api/${resource}/${id}`, data, httpOptions);
  }

  /**
   * Delete the specified resource from the database
   * @param resource word that completes the api URL to match the correspondent resource
   * @param id id of the resource to delete
   */
  deleteData(resource: string, id: string) {
    return this.httpClient.delete(`http://localhost:8000/api/${resource}/${id}`, httpOptions);
  }

  /**
   * Get a single database entry for the specified resource
   * @param resource word that completes the api URL to match the correspondent resource
   * @param id id of the resource to retrieve
   */
  getById(resource: string, id: string) {
    return this.httpClient.get(`http://localhost:8000/api/${resource}/${id}`, httpOptions);
  }

  insertDataWithFile(resource: string, data: FormData) {
    return this.httpClient.post(`http://localhost:8000/api/${resource}`, data);
  }
}
