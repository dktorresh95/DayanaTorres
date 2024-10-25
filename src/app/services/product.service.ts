import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  urlApi = 'http://localhost:3002/bp/products'
  constructor(private httpClient: HttpClient) { }


  getproducts() {
    return this.httpClient.get(this.urlApi);
  }

  addProducts(body: Product) {
    return this.httpClient.post(this.urlApi, body);
  }

  deleteProduct(id: string | undefined) {
    return this.httpClient.delete(this.urlApi + `/${id}`);
  }
}
