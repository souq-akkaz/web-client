import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedList } from 'src/app/core/models';

import { environment } from 'src/environments/environment';
import { Product } from '../models';

interface SearchProductCriteria {
  pageSize: number;
  pageIndex: number;
  searchTerm?: string;
  categoryId?: number;
  brandId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  storeApiV1Url = `${environment.storeUrl}/v1`;
  constructor(private _http: HttpClient) {}

  searchInProducts(searchCriteria: SearchProductCriteria) {
    return this._http.get<PagedList<Product>>(`${this.storeApiV1Url}/product/search`, {
      params: new HttpParams({ fromObject: { ...searchCriteria } })
    });
  }
}
