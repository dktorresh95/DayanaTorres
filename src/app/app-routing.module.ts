import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { FormProductComponent } from './components/form-product/form-product.component';

const routes: Routes = [
  { path: 'products', component: ProductComponent },
  { path: 'product', component: FormProductComponent },
  { path: 'product/editar/:id', component: FormProductComponent },
  { path: '**', redirectTo: 'products' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
