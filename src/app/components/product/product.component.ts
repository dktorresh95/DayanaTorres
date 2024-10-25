import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private productService: ProductService, private route: Router) { }

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
    this.route.navigate(['/create-product'])
  }

  search(event: any) {
    const inputValue = event.target.value.toLowerCase();
     if(inputValue){
      this.productList = this.productList.filter(value => {
        const nameMatch = value.name?.toLowerCase().includes(inputValue);
        const descrMatch = value.description?.toLowerCase().includes(inputValue);
        const dateRevisionMatch = value.date_revision?.toLowerCase().includes(inputValue);
        const dateReleaseMatch = value.date_revision?.toLowerCase().includes(inputValue);
        return nameMatch || descrMatch || dateReleaseMatch || dateRevisionMatch;
      });
     } else {
      this.getProductList();
     }
  }
}
