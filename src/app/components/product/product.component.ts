import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ResponseData } from 'src/app/models/response.model';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  itemsPerPage = 5;
  currentPage = 1;
  productList: Product[] = [];
  totalPages = 0;

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
        this.totalPages = this.getCalculatedPages();
      },
      error => {
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error"
        });
      }
    )
  }

  /**
   * Navigate to page of create product
   */
  addProduct() {
    this.route.navigate(['/create-product'])
  }

  /**
   * Search any coincidence in all fields
   * @param event with keydown enter
   */
  search(event: any) {
    const inputValue = event.target.value.toLowerCase();
     if(inputValue){
      this.productList = this.productList.filter(value => {
        return this.getMatches(value, inputValue);
      });
      this.totalPages = this.getCalculatedPages();
     } else {
      this.getProductList();
     }
  }


  goToPage(page: number) {
    this.currentPage = page;
  }

  /**
   * 
   * @param value of product
   * @param inputValue of input
   * @returns boolean that indicates if is any coincidence
   */
  getMatches(value: Product, inputValue: string) {
    const nameMatch = value.name?.toLowerCase().includes(inputValue);
    const descrMatch = value.description?.toLowerCase().includes(inputValue);
    const dateRevisionMatch = value.date_revision?.toLowerCase().includes(inputValue);
    const dateReleaseMatch = value.date_revision?.toLowerCase().includes(inputValue);
    return nameMatch || descrMatch || dateReleaseMatch || dateRevisionMatch;
  }

  /**
   * 
   * @returns pages calculated
   */
  getCalculatedPages() {
    return Math.ceil(this.productList.length / this.itemsPerPage);
  }

  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.productList.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
