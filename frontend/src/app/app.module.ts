import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';

import { NgxMaskModule, IConfig } from 'ngx-mask'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeEditComponent } from './components/employees/employee-edit/employee-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyEditComponent } from './components/companies/company-edit/company-edit.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerEditComponent } from './components/customers/customer-edit/customer-edit.component';
import { EmployeeDetailComponent } from './components/employees/employee-detail/employee-detail.component';
import { CustomerDetailComponent } from './components/customers/customer-detail/customer-detail.component';
import { CompanyDetailComponent } from './components/companies/company-detail/company-detail.component';
import { EmployeeCreateComponent } from './components/employees/employee-create/employee-create.component';
import { CustomerCreateComponent } from './components/customers/customer-create/customer-create.component';
import { CompanyCreateComponent } from './components/companies/company-create/company-create.component';
import { InterceptorService } from './service/interceptor.service';

const appRoutes: Routes = [
  // Employees
  { path: 'employees', component:EmployeesComponent },
  { path: 'employees/edit/:id', component:EmployeeEditComponent },
  { path: 'employees/detail/:id', component:EmployeeDetailComponent },
  { path: 'employees/create', component:EmployeeCreateComponent },

  // Customers
  { path: 'customers', component:CustomersComponent },
  { path: 'customers/edit/:id', component:CustomerEditComponent },
  { path: 'customers/detail/:id', component:CustomerDetailComponent },
  { path: 'customers/create', component:CustomerCreateComponent },

  // Companies
  { path: 'companies', component:CompaniesComponent },
  { path: 'companies/edit/:id', component:CompanyEditComponent },
  { path: 'companies/detail/:id', component:CompanyDetailComponent },
  { path: 'companies/create', component:CompanyCreateComponent }
];

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    NavbarComponent,
    EmployeeEditComponent,
    CompaniesComponent,
    CompanyEditComponent,
    CustomersComponent,
    CustomerEditComponent,
    EmployeeDetailComponent,
    CustomerDetailComponent,
    CompanyDetailComponent,
    EmployeeCreateComponent,
    CustomerCreateComponent,
    CompanyCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(maskConfigFunction),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
