import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Employee } from '../../../models/employee.model';
import { EmployeesService } from '../../../services/employees.service';

@Component({
  selector: 'app-employees-list',
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css',
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] = [];
  pagedEmployees: Employee[] = [];
  pageSize: number = 5;
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(private employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.employeesService.getAllEmployess().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.totalPages = Math.ceil(this.employees.length / this.pageSize);
        this.updatePagedEmployees();
      },
      error: (response) => {
        console.error(response);
      },
    });
  }

  updatePagedEmployees(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.pagedEmployees = this.employees.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.updatePagedEmployees();
    }
  }
}
