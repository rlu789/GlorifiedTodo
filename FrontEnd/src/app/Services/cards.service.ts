import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceBaseService } from './service-base.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private headers: HttpHeaders;
  private accessPointUrl: string = this.serviceBase.accessPointUrlBase + 'cards';

  constructor(private http: HttpClient, public serviceBase: ServiceBaseService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  // public get() {
  //   return this.http.get(this.accessPointUrl, {headers: this.headers});
  // }

  public add(payload: Card, password: string) {
    return this.serviceBase.call(this.serviceBase.Constants.Post, this.accessPointUrl,
      this.serviceBase.generateHeaders(password), payload);
  }

  public remove(payload: Card, password: string) {
    return this.serviceBase.call(this.serviceBase.Constants.Delete, this.accessPointUrl + '/' + payload.id,
      this.serviceBase.generateHeaders(password));
  }

  public update(payload: Card, password: string) {
    return this.serviceBase.call(this.serviceBase.Constants.Put, this.accessPointUrl + '/' + payload.id,
      this.serviceBase.generateHeaders(password), payload);
  }
}

export class Card {
  public id: number
  constructor(public title?: string, public description?: string, public cardCollectionId?: number) { }

  public clone(c: Card) {
    this.id = c.id;
    this.title = c.title;
    this.description = c.description;
    this.cardCollectionId = c.cardCollectionId;
  }
}
