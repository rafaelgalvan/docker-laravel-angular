import { Component, OnInit } from '@angular/core';
import { DataService } from "src/app/service/data.service";
import { Company } from 'src/app/models/company';
import { NgxSpinnerService } from 'ngx-spinner';
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies: Company[] = [];
  company: Company = new Company();

  constructor(
    private dataService:DataService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getCompaniesData();
  }

  /**
   * Retrieves the companies' data from the database to populate the datatable on /companies
   */
  getCompaniesData() {
    this.spinner.show();
    this.dataService.getData('companies').subscribe((res:any) => {
      this.companies = res;
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  /**
   * Handle the delete request coming from the datatable on /companies
   * @param id id of the company
   */
  deleteData(id: string) {
    this.spinner.show();
    this.dataService.deleteData('companies', id).subscribe((res:any) => {
      if (res.status === true) {
        this.toastr.success(res.message, 'Success', {
          timeOut: 5000,
          closeButton: true
        });
        this.spinner.hide();
      }
      this.getCompaniesData();
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 8000);
  }

}
