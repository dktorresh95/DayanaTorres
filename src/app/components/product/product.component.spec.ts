import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ProductService } from '../../services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Product } from 'src/app/models/product.model';
import { ModalComponent } from '../modal/modal.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: ProductService;
  const mockProducts: Product[] = [
    { id: 'Uno', name: 'Nombre producto', description: 'Descripción producto uno', date_release: '2025-01-01', date_revision: '2028-01-10' },
  
  ];
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProductComponent, ModalComponent ],
      providers: [ProductService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return complete list when input search is null', () => {
    const inputValue = { target: { value: '' } };
    component.productList = mockProducts;
    component.search(inputValue);
    expect(component.productList.length).toBe(mockProducts.length);
  });

  it('should return complete list when input search is Un', () => {
    const inputValue = { target: { value: 'Un' } };
    component.productList = mockProducts;
    component.search(inputValue);
    expect(component.productList.length).toBe(1);
  });

  it('should validate edit', () => {
    component.edit();
    expect(component.isDropdownOpen).toBeNull();
  });

  it('should validate behavior of dropdown', () => {
    component.isDropdownOpen = 2;
    component.toggleDropdown(0);
    expect(component.isDropdownOpen).toBe(0);
  });

  it('should validate behavior of dropdown 2', () => {
    component.isDropdownOpen = 0;
    component.toggleDropdown(0);
    expect(component.isDropdownOpen).toBeNull();
  });

  it('should validate values of modal', () => {
    component.showModalInfo('message', 'Info');
    expect(component.message).toBe('message');
    expect(component.titleModal).toBe('Info');
    expect(component.buttonMessageTwo).toBe('Aceptar');
    expect(component.showConfirm).toBeFalsy();
  });

  it('should validate confirm modal', () => {
    component.showConfirmModal('Id uno');
    expect(component.message).toBe('Está seguro de eliminar el registro Id uno?');
    expect(component.buttonMessage).toBe('Confirmar');
    expect(component.buttonMessageTwo).toBe('Cancelar');
    expect(component.showConfirm).toBeTruthy();
  });
});
