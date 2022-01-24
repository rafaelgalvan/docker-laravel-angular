import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Customer } from "src/app/models/customer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  private id: string = '';
  customer = new Customer();
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

  createForm() {
    this.form = this.formBuilder.group({
      customer: this.formBuilder.group({
        name: [null, [Validators.required, Validators.pattern('^[a-zA-Z\\s\u00C0-\u00FF]*$'), Validators.maxLength(120)]],
        email: [null, [Validators.required, Validators.email, Validators.maxLength(60)]],
        cpf: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
        password: [null, [Validators.required, Validators.maxLength(64)]],
        login: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(30)]],
      }),
      address: this.formBuilder.group({
        street: [null, Validators.required],
        number: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
        district: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zip: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      }),
    });
  }

  /**
   * retrieves the data about the customer from the database
   */
  getData() {
    this.spinner.show();
    this.dataService.getById('customers', this.id).subscribe((res:any) => {
      this.customer = res;
      this.populateForm();
      this.spinner.hide();
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  /**
   * Handle the update customer request
   */
  updateCustomer() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.spinner.show();
    this.mapCustomer();
    this.dataService.updateData('customers', this.customer, this.id).subscribe((res:any) => {
      this.customer = res;
      this.spinner.hide();
      this.router.navigate(['/customers/detail/', this.customer.id]);
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  /**
   * Workaround to assign the readonly properties from the object returned from the database to a complete customer object
   * needed to access the methods on the class
   */
  mapCustomer() {
    this.customer = Object.assign(new Customer(), this.form.value);
  }

  private populateForm() {
    this.form.setValue({
      customer: {
        name: this.customer.name,
        email: this.customer.email,
        cpf: this.customer.cpf,
        login: this.customer.login,
        password: this.customer.password,
      },
      address: {
        street: this.customer.address.street,
        number: this.customer.address.number,
        district: this.customer.address.district,
        city: this.customer.address.city,
        state: this.customer.address.state,
        zip: this.customer.address.zip
      }
    });
  }
}
