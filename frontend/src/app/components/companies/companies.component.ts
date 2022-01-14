import { Component, OnInit } from '@angular/core';
import { DataService } from "src/app/service/data.service";
import { Company } from 'src/app/models/company';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies: Company[] = [];

  constructor(
    private dataService:DataService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getCompaniesData();
  }

  getCompaniesData() {
    this.spinner.show();
    this.dataService.getData('companies').subscribe((res:any) => {
      this.companies = res;
      this.spinner.hide();
    });
  }

  deleteData(id: string) {
    this.spinner.show();
    this.dataService.deleteData('companies', id).subscribe(res => {
      console.log(res);
      this.getCompaniesData();
      this.spinner.hide();
    });
  }

}
