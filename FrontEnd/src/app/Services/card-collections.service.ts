import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from './cards.service';
import * as common from './common';

@Injectable({
  providedIn: 'root'
})
export class CardCollectionsService {
  private headers: HttpHeaders;
  private accessPointUrl: string = common.accessPointUrlBase + 'cardCollections';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  // public get() {
  //   return this.http.get(this.accessPointUrl, {headers: this.headers});
  // }

  public add(payload: CardCollection, password: string) {
    return this.http.post(this.accessPointUrl, payload, {headers: common.generateHeaders(password)});
  }

  public remove(payload: CardCollection, password: string) {
    return this.http.delete(this.accessPointUrl + '/' + payload.id, {headers: common.generateHeaders(password)});
  }

  // public update(payload: CardCollection) {
  //   return this.http.put(this.accessPointUrl + '/' + payload.id, payload, {headers: this.headers});
  // }
}

export class CardCollection{
  public id: number;
  constructor (public title: string, public boardId: number, public card: Array<Card>){}
}