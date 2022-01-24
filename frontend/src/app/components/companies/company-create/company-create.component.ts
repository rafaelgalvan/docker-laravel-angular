import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {
  company = new Company();
  form: any | FormGroup;
  submitted = false;

  constructor(
    private route:ActivatedRoute,
    private dataService:DataService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      company: this.formBuilder.group({
        name: [null, [Validators.required, Validators.pattern('^[a-zA-Z\\s\u00C0-\u00FF]*$'), Validators.maxLength(120)]],
        cnpj: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern('^[0-9]+$')]],
      }),
      address: this.formBuilder.group({
        street: [null, [Validators.required, Validators.maxLength(100)]],
        number: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(20)]],
        district: [null, [Validators.required, Validators.maxLength(100)]],
        city: [null, [Validators.required, Validators.maxLength(100)]],
        state: [null, [Validators.required, Validators.maxLength(2)]],
        zip: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      }),
    });
  }

  /**
   * Handle the create company request
   */
  insertData() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.spinner.show();
    this.buildCompany();
    this.dataService.insertData("companies", this.company).subscribe((res:any) => {
      this.company = res;
      this.spinner.hide();
      this.router.navigate(['/companies/detail/', this.company.id])
    });
  }

  private buildCompany() {
    this.company = Object.assign(new Company(), this.form.value);
  }


}
