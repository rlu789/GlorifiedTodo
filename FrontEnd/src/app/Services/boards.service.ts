import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CardCollection } from './card-collections.service';
import * as common from './common';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  private headers: HttpHeaders;
  private accessPointUrl: string = common.accessPointUrlBase + 'boards';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  public get() {
    return this.http.get(this.accessPointUrl, {headers: this.headers});
  }

  public getSingle(id: number) {
    return this.http.get(this.accessPointUrl +'/'+id, {headers: this.headers});
  }

  public add(payload: Board) {
    return this.http.post(this.accessPointUrl, payload, {headers: this.headers});
  }

  public remove(payload: Board, password: string) {
    return this.http.delete(this.accessPointUrl + '/' + payload.id, {headers: common.generateHeaders(password)});
  }

  // public update(payload: Board) {
  //   return this.http.put(this.accessPointUrl + '/' + payload.id, payload, {headers: this.headers});
  // }

  public authorize(id: number, password: string){
    return this.http.post(this.accessPointUrl + '/' + id + '/authorize', undefined, {headers: common.generateHeaders(password)});
  }
}

export class Board{
  public id: number;
  public cardCollection: Array<CardCollection>;
  public password: string;
  constructor(public title: string){}
}