import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { Company } from 'src/app/models/company';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  private id: string = '';
  company = new Company();

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
    this.dataService.getById('companies', this.id).subscribe((res:any) => {
      this.company = res;
      this.spinner.hide();
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 10000);
  }

}
