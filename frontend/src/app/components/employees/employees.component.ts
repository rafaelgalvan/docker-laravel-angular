import { Component, OnInit } from '@angular/core';
import { DataService } from "src/app/service/data.service";
import { Employee } from 'src/app/models/employee';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private dataService:DataService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getEmployeesData();
  }

  getEmployeesData() {
    this.spinner.show();
    this.dataService.getData('employees').subscribe((res:any) => {
      this.employees = res;
      this.spinner.hide();
    });
  }

  deleteData(id: string) {
    this.spinner.show();
    this.dataService.deleteData('employees', id).subscribe(res => {
      console.log(res);
      this.getEmployeesData();
      this.spinner.hide();
    });
  }
}
