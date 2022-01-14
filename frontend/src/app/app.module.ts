import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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

const appRoutes: Routes = [
  // Employees
  { path: 'employees', component:EmployeesComponent },
  { path: 'employees/edit/:id', component:EmployeeEditComponent },
  { path: 'employees/detail/:id', component:EmployeeDetailComponent },

  // Customers
  { path: 'customers', component:CustomersComponent },
  { path: 'customers/edit/:id', component:CustomerEditComponent },
  { path: 'customers/detail/:id', component:CustomerDetailComponent },

  // Companies
  { path: 'companies', component:CompaniesComponent },
  { path: 'companies/edit/:id', component:CompanyEditComponent },
  { path: 'companies/detail/:id', component:CompanyDetailComponent }
]

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
    CompanyDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
