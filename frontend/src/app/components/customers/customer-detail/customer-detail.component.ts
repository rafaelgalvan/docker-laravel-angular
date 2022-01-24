import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { Customer } from 'src/app/models/customer';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
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
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 10000);
  }

}
