import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { EmployeesService } from '../../../services/employees.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-employee',
  imports: [
    ReactiveFormsModule,
    NgIf,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css',
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editEmployeeForm = this.fb.group({
      id: [{ value: 0, disabled: true }],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      position: ['', [Validators.required, Validators.maxLength(50)]],
      salary: ['', [Validators.required, Validators.min(0)]],
    });

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = Number(params.get('id'));
        if (id) {
          this.employeeService.getEmployee(id).subscribe({
            next: (response) => {
              this.editEmployeeForm.patchValue(response);
            },
          });
        }
      },
    });
  }

  updateEmployee(): void {
    if (this.editEmployeeForm.valid) {
      const updatedEmployee = this.editEmployeeForm.getRawValue();
      this.employeeService
        .updateEmployee(updatedEmployee.id, updatedEmployee)
        .subscribe({
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

  deleteEmployee(id: number) {
    const confirmed = confirm('Are you sure you want to delete this employee?');

    if (confirmed) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (response) => {
          console.error(response);
        },
      });
    }
  }
}
