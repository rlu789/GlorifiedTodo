import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceBaseService } from './service-base.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private headers: HttpHeaders;
  private accessPointUrl: string = this.serviceBaseService.accessPointUrlBase + 'cards';

  constructor(private http: HttpClient, public serviceBaseService: ServiceBaseService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  // public get() {
  //   return this.http.get(this.accessPointUrl, {headers: this.headers});
  // }

  public add(payload: Card, password: string) {
    return this.serviceBaseService.serviceCallBase(this.serviceBaseService.Constants.Post, this.accessPointUrl,
      this.serviceBaseService.generateHeaders(password), payload);
  }

  public remove(payload: Card, password: string) {
    return this.serviceBaseService.serviceCallBase(this.serviceBaseService.Constants.Delete, this.accessPointUrl + '/' + payload.id,
      this.serviceBaseService.generateHeaders(password));
  }

  public update(payload: Card, password: string) {
    return this.serviceBaseService.serviceCallBase(this.serviceBaseService.Constants.Put, this.accessPointUrl + '/' + payload.id,
      this.serviceBaseService.generateHeaders(password), payload);
  }
}

export class Card {
  public id: number
  constructor(public title: string, public description: string, public cardCollectionId: number) { }
}
