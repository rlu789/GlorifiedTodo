import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CardCollection } from './card-collections.service';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  private headers: HttpHeaders;
  private accessPointUrl: string = 'http://localhost:57115/api/boards';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  public get() {
    return this.http.get(this.accessPointUrl, {headers: this.headers});
  }

  public getSingle(id: number) {
    return this.http.get(this.accessPointUrl +'/'+id, {headers: this.headers});
  }

  public add(payload) {
    return this.http.post(this.accessPointUrl, payload, {headers: this.headers});
  }

  public remove(payload) {
    return this.http.delete(this.accessPointUrl + '/' + payload.id, {headers: this.headers});
  }

  public update(payload) {
    return this.http.put(this.accessPointUrl + '/' + payload.id, payload, {headers: this.headers});
  }
}

export class Board{
  public id: number;
  public cardCollections: Array<CardCollection>;
  constructor(public title: string){}
}