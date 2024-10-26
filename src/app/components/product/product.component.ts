import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { MessageResponse, ResponseData } from 'src/app/models/response.model';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('modal') modal!: ModalComponent;

  itemsPerPage = 5;
  currentPage = 1;
  productList: Product[] = [];
  totalPages = 0;
  isDropdownOpen: number | null = null;
  titleModal: string = '';
  message: string = '';
  buttonMessage: string = '';
  buttonMessageTwo: string = '';
  id: string = '';
  showConfirm: boolean = false;
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
        this.showModalInfo(error.message, 'Error')
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

  showConfirmModal(id:string | undefined) {
    this.closeDropdown();
    this.message = 'Está seguro de eliminar el registro ' + id + '?';
    this.buttonMessage = 'Confirmar';
    this.buttonMessageTwo = 'Cancelar';
    this.titleModal = 'Información';
    this.showConfirm = true;
    this.modal.open();
    this.id = id ? id: '';
  }

  showModalInfo (message: string | undefined, type: string) {
    this.message = message ? message : '';
    this.buttonMessageTwo = 'Aceptar';
    this.titleModal = type;
    this.showConfirm = false;
    this.modal.open();
  }

  delete() {
    this.productService.deleteProduct(this.id).subscribe( (res: MessageResponse) => {
      this.showModalInfo(res.message, 'Información')
      this.getProductList();
    },
    err => {
      this.showModalInfo(err.message, 'Error')
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
