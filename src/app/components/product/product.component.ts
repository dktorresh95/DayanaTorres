import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ResponseData } from 'src/app/models/response.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productList: Product[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  /**
   * Get list of products
   */
  getProductList() {
    this.productService.getproducts().subscribe(
      (response: ResponseData) => {
        this.productList = response.data || [];
      }
    )
  }

  addProduct() {
    this.productService.addProducts({}).subscribe(
      (res) => {

      }
    )
  }

}
