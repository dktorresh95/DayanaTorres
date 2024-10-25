import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormProductComponent } from './form-product.component';
import { ProductService } from '../../services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormProductComponent', () => {
  let component: FormProductComponent;
  let fixture: ComponentFixture<FormProductComponent>;
  let productService: ProductService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [FormProductComponent],
      providers: [ProductService],
    }).compileComponents();

    fixture = TestBed.createComponent(FormProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should create the form with controls', () => {
    expect(component.formGroup.contains('id')).toBeTruthy();
    expect(component.formGroup.contains('name')).toBeTruthy();
    expect(component.formGroup.contains('description')).toBeTruthy();
    expect(component.formGroup.contains('logo')).toBeTruthy();
    expect(component.formGroup.contains('date_revision')).toBeTruthy();
    expect(component.formGroup.contains('date_release')).toBeTruthy();
  });
});
