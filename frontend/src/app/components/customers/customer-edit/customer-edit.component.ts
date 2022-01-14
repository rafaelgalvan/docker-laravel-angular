import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Customer } from "src/app/models/customer";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  private id: string = '';
  customer = new Customer();

  constructor(
    private route:ActivatedRoute,
    private dataService:DataService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.dataService.getById('customers', this.id).subscribe((res:any) => {
      this.customer = res;
      this.spinner.hide();
    })
  }

}
