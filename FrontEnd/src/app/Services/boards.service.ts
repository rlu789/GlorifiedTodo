import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CardCollection } from './card-collections.service';
import { ServiceBaseService } from './service-base.service';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private headers: HttpHeaders;
  private accessPointUrl: string = this.serviceBaseService.accessPointUrlBase + 'boards';

  constructor(private http: HttpClient, public serviceBaseService: ServiceBaseService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  public get() {
    return this.serviceBaseService.serviceCallBase(this.serviceBaseService.Constants.Get, this.accessPointUrl, this.headers);
  }

  public getSingle(id: number) {
    return this.serviceBaseService.serviceCallBase(this.serviceBaseService.Constants.Get, this.accessPointUrl + '/' + id, this.headers);
  }

  public add(payload: Board) {
    return this.serviceBaseService.serviceCallBase(this.serviceBaseService.Constants.Post, this.accessPointUrl, this.headers, payload);
  }

  public remove(payload: Board, password: string) {
    return this.serviceBaseService.serviceCallBase(this.serviceBaseService.Constants.Delete, this.accessPointUrl + '/' + payload.id, this.serviceBaseService.generateHeaders(password), payload);
  }

  // public update(payload: Board) {
  //   return this.http.put(this.accessPointUrl + '/' + payload.id, payload, {headers: this.headers});
  // }

  public authorize(id: number, password: string) {
    return this.serviceBaseService.serviceCallBase(this.serviceBaseService.Constants.Post, 
      this.accessPointUrl + '/' + id + '/authorize', this.serviceBaseService.generateHeaders(password));
  }
}

export class Board {
  public id: number;
  public cardCollection: Array<CardCollection>;
  public password: string;
  constructor(public title: string) { }
}