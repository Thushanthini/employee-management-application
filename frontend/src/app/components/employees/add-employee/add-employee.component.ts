import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { EmployeesService } from '../../../services/employees.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm!: FormGroup;

  constructor(
    private employeeService: EmployeesService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addEmployeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      position: ['', [Validators.required, Validators.maxLength(50)]],
      salary: [0, [Validators.required, Validators.min(0)]],
    });
  }

  addEmployee(): void {
    if (this.addEmployeeForm.valid) {
      this.employeeService.addEmployee(this.addEmployeeForm.value).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (response) => {
          console.error(response);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
