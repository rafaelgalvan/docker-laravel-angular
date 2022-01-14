import { Component, OnInit } from '@angular/core';
import { DataService } from "src/app/service/data.service";
import { Customer } from 'src/app/models/customer';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];

  constructor(
    private dataService:DataService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getCustomersData();
  }

  getCustomersData() {
    this.spinner.show();
    this.dataService.getData('customers').subscribe((res:any) => {
      this.customers = res;
      this.spinner.hide();
    });
  }

  deleteData(id: string) {
    this.spinner.show();
    this.dataService.deleteData('customers', id).subscribe(res => {
      console.log(res);
      this.getCustomersData();
      this.spinner.hide();
    });
  }
}
