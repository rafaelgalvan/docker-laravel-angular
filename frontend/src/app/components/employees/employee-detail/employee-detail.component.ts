import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { Employee } from 'src/app/models/employee';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  private id: string = '';
  employee = new Employee();

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
    this.dataService.getById('employees', this.id).subscribe((res:any) => {
      this.employee = res;
      this.spinner.hide();
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 10000);
  }

}
