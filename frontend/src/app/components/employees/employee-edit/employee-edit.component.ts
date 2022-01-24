import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Employee } from "src/app/models/employee";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  private id: string = '';
  employee = new Employee();
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
      employee: this.formBuilder.group({
        name: [null, [Validators.required, Validators.pattern('^[a-zA-Z\\s\u00C0-\u00FF]*$'), Validators.maxLength(120)]],
        email: [null, [Validators.required, Validators.email, Validators.maxLength(60)]],
        cpf: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
        password: [null, [Validators.required, Validators.maxLength(64)]],
        login: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(30)]],
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
   * retrieves the data about the employee from the database
   */
  getData() {
    this.spinner.show();
    this.dataService.getById('employees', this.id).subscribe((res:any) => {
      this.employee = res;
      this.populateForm();
      this.spinner.hide();
      this.spinner.hide();
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 10000);
  }

  /**
   * Handle the update employee request
   */
  updateEmployee() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.spinner.show();
    this.mapEmployee(this.employee);
    this.dataService.updateData('employees', this.employee, this.id).subscribe((res:any) => {
      this.employee = res;
      this.spinner.hide();
      this.router.navigate(['/employees/detail/', this.employee.id]);
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 10000);
  }

  /**
   * Workaround to assign the readonly properties from the object returned from the database to a complete employee object
   * needed to access the methods on the class
   * @param employee
   */
  mapEmployee(employee: Employee) {
    this.employee = Object.assign(new Employee(), this.form.value);
  }

  private populateForm() {
    this.form.setValue({
      employee: {
        name: this.employee.name,
        email: this.employee.email,
        cpf: this.employee.cpf,
        login: this.employee.login,
        password: this.employee.password,
      },
      address: {
        street: this.employee.address.street,
        number: this.employee.address.number,
        district: this.employee.address.district,
        city: this.employee.address.city,
        state: this.employee.address.state,
        zip: this.employee.address.zip
      }
    });
  }
}
