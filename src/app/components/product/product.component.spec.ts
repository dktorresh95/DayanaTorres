import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ProductService } from '../../services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Product } from 'src/app/models/product.model';

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
      declarations: [ProductComponent ],
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

  it('should return complete list when input search is date', () => {
    const inputValue = { target: { value: '2025' } };
    component.productList = mockProducts;
    component.search(inputValue);
    expect(component.productList.length).toBe(1);
  });
});
