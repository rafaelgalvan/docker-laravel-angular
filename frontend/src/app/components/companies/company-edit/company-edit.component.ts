import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { Company } from 'src/app/models/company';
import { NgxSpinnerService } from 'ngx-spinner';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  private id: string = '';
  company = new Company();
  form: any | FormGroup;
  submitted = false;

  constructor(
    private route:ActivatedRoute,
    private dataService:DataService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getData();
    this.createForm();
  }

  /**
   * retrieves the data about the company selected on the datatable
   */
  getData() {
    this.spinner.show();
    this.dataService.getById('companies', this.id).subscribe((res:any) => {
      this.company = res;
      this.populateForm();
      this.spinner.hide();
    })
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
   * Handle the update request coming from the data table on /companies
   */
  updateCompany() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.spinner.show();
    this.mapCompany();
    this.dataService.updateData('companies', this.company, this.id).subscribe((res:any) => {
      this.company = res;
      this.spinner.hide();
      this.router.navigate(['/companies/detail/', this.company.id])
    });
  }

  /**
   * Workaround to assign the readonly properties from the object returned from the database to a complete company object
   * needed to access the methods on the class
   */
  mapCompany() {
    this.company = Object.assign(new Company(), this.form.value);
  }

  private populateForm() {
    this.form.setValue({
      company: {
        name: this.company.name,
        cnpj: this.company.cnpj,
      },
      address: {
        street: this.company.address.street,
        number: this.company.address.number,
        district: this.company.address.district,
        city: this.company.address.city,
        state: this.company.address.state,
        zip: this.company.address.zip
      }
    });
  }
}
