import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { MessageResponse, ResponseData } from 'src/app/models/response.model';
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
  isDropdownOpen: number | null = null;

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

  showConfirm(id:string | undefined) {
    Swal.fire({
      title: "Está seguro de eliminar el registro?",
      showDenyButton: true,
      showCancelButton: false,
      showCloseButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#eeea05",
      cancelButtonText: `Cancelar`,
      cancelButtonColor: "#e3e1e1",
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(id)
      } else if (result.isDismissed) {
        Swal.close();
      }
    });
  }

  delete(id:string | undefined) {
    this.productService.deleteProduct(id).subscribe( (res: MessageResponse) => {
      Swal.fire({
        title: "Información",
        text: res.message,
        icon: "success"
      });
      this.getProductList();
    },
    err => {
      Swal.fire({
        title: "Error",
        text: err,
        icon: "error"
      });
    }
  )
    this.closeDropdown();
  }

  edit() {
    this.closeDropdown();
  }
  toggleDropdown(index: number) {
    this.isDropdownOpen = this.isDropdownOpen === index ? null : index;
  }
  closeDropdown() {
    this.isDropdownOpen = null;
  }
  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.productList.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
