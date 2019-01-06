import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as common from './common';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private headers: HttpHeaders;
  private accessPointUrl: string = common.accessPointUrlBase + 'cards';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  // public get() {
  //   return this.http.get(this.accessPointUrl, {headers: this.headers});
  // }

  public add(payload: Card, password: string) {
    return this.http.post(this.accessPointUrl, payload, {headers: common.generateHeaders(password)});
  }

  public remove(payload: Card, password: string) {
    return this.http.delete(this.accessPointUrl + '/' + payload.id, {headers: common.generateHeaders(password)});
  }

  public update(payload: Card, password: string) {
    return this.http.put(this.accessPointUrl + '/' + payload.id, payload, {headers: common.generateHeaders(password)});
  }
}

export class Card {
  public id: number
  constructor(public title: string, public description: string, public cardCollectionId: number) {}
}
