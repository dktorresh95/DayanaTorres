import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private productService: ProductService) {

  }
  ngOnInit(): void {
    this.initForm();
  }

  addProduct() {
    this.productService.addProducts(this.formGroup.value).subscribe(
      (res) => {

      }
    )
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      id: ['',[ Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_revision: ['', Validators.required],
      date_release: ['', Validators.required]
    });

  }

  hasErrorMinLength(label: string) {
    return this.formGroup.get(label)?.hasError('minlength');
  }
  hasErrorMaxLength(label: string) {
    return this.formGroup.get(label)?.hasError('maxlength');
  }
  isRequired(label: string) {
    return this.formGroup.get(label)?.hasError('required') && this.formGroup.get(label)?.touched;
  }
}
