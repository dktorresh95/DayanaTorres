import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormProductComponent } from './form-product.component';
import { ProductService } from '../../services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('FormProductComponent', () => {
  let component: FormProductComponent;
  let fixture: ComponentFixture<FormProductComponent>;
  let productService: ProductService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [FormProductComponent, ModalComponent],
      providers: [ProductService, 
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'Uno' }),
          },
        },],
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

  it('should validate values of modal', () => {
    component.showModalInfo('message', 'Info');
    expect(component.message).toBe('message');
    expect(component.titleModal).toBe('Info');
    expect(component.buttonMessageTwo).toBe('Aceptar');
    expect(component.showConfirm).toBeFalsy();
  });
});
