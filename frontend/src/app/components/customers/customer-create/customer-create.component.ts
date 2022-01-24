import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { Customer } from 'src/app/models/customer';
import { Company } from 'src/app/models/company';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { allowedFileTypes } from "src/app/app.module";

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  companies: Company[] = [];
  selectedCompanies: Company[] = [];
  customer = new Customer();
  form: any | FormGroup;
  submitted = false;
  file: any;
  formData: FormData = new FormData();

  constructor(
    private route:ActivatedRoute,
    private dataService:DataService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getCompaniesData();
  }

  createForm() {
    this.form = this.formBuilder.group({
      customer: this.formBuilder.group({
        name: [null, [Validators.required, Validators.pattern('^[a-zA-Z\\s\u00C0-\u00FF]*$'), Validators.maxLength(120)]],
        email: [null, [Validators.required, Validators.email, Validators.maxLength(60)]],
        cpf: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
        password: [null, [Validators.required, Validators.maxLength(64)]],
        login: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(30)]],
      }),
      file: [null, Validators.required],
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
   * Handle the create customer request
   */
  insertData() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.selectedCompanies.length < 1) {
      this.toastr.warning("Select at least one company",'', {
        timeOut: 5000,
        closeButton: true
      })
      return;
    }
    this.spinner.show();
    this.buildCustomer();
    this.dataService.insertDataWithFile("customers", this.formData).subscribe((res:any) => {
      this.customer = res;
      this.router.navigate(['/customers/detail/', this.customer.id])
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  /**
   * Retrieves all the companies from the database
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
   * Put the company on companies array or remove if already exists
   * @param company
   */
  selectCompany(company:any) {
    if (this.selectedCompanies.includes(company)) {
      this.selectedCompanies.splice(this.customer.companies.indexOf(company), 1);
    } else {
      this.selectedCompanies.push(company)
    }
  }

  handleFile(event: any) {
    if (allowedFileTypes.includes(event.target.files[0].type)) {
      this.file = event.target.files[0];
    } else {
      this.file = undefined;
      this.form.get('file').setValue(undefined);
    }
  }

  buildCustomer() {
    this.customer = Object.assign(new Customer(), this.form.value);
    this.customer.companies = this.selectedCompanies;
    this.formData.append('file', this.file);
    this.formData.append('json', JSON.stringify(this.customer));
  }
}
