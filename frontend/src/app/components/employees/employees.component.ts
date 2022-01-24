import { Component, OnInit } from '@angular/core';
import { DataService } from "src/app/service/data.service";
import { Employee } from 'src/app/models/employee';
import { NgxSpinnerService } from 'ngx-spinner';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Company} from "../../models/company";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  companies: Company[] = [];

  constructor(
    private dataService:DataService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getCompaniesData();
    this.getEmployeesData();
  }

  /**
   * Retrieves the employees' data from the database to populate the datatable on /employees
   */
  getEmployeesData() {
    this.spinner.show();
    this.dataService.getData('employees').subscribe((res:any) => {
      this.employees = res;
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 10000);
  }

  /**
   * Retrieves the companies' data from the database to check if we can create a new employee
   */
  getCompaniesData() {
    this.spinner.show();
    this.dataService.getData('companies').subscribe((res:any) => {
      this.companies = res;
      this.spinner.hide();
    });
  }

  /**
   * Handle the delete request coming from the datatable on /employees
   * @param id id of the employee
   */
  deleteData(id: string) {
    this.spinner.show();
    this.dataService.deleteData('employees', id).subscribe((res:any) => {
      if (res.status === true) {
        this.toastr.success(res.message, 'Success', {
          timeOut: 5000,
          closeButton: true
        });
        this.spinner.hide();
      }
      this.getEmployeesData();
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 10000);
  }

  /**
   * If there's at least 1 company stored, this method redirect to employee form
   */
  createEmployee() {
    if (this.companies.length < 1) {
      this.toastr.warning("Please, first include at least one company.", '', {
        timeOut: 5000,
        closeButton: true
      });
      return;
    }
    this.router.navigate(['/employees/create/']);
  }
}
