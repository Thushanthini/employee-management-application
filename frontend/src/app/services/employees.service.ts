import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  getAllEmployess(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseApiUrl + '/api/employees');
  }

  addEmployee(addEmployeeRequest: Employee): Observable<Employee> {
    return this.http.post<Employee>(
      this.baseApiUrl + '/api/employees',
      addEmployeeRequest
    );
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.baseApiUrl + '/api/employees/' + id);
  }

  updateEmployee(
    id: number,
    updateEmployeeRequest: Employee
  ): Observable<Employee> {
    return this.http.put<Employee>(
      this.baseApiUrl + '/api/employees/' + id,
      updateEmployeeRequest
    );
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(this.baseApiUrl + '/api/employees/' + id);
  }
}
