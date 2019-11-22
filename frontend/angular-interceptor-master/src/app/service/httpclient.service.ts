import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Employee {
  constructor(
    public empid: string,        
    public project: string,
    public customer: string,
    public manager: string,
    public tstatus: string,
    public tools: string,
    public env: string,
    public psdate: string,
    public pedate: string,
    public asdate: string,
    public aedate: string,
    public cstatus: string,
    public resources: string,
    public remark: string,
    public today: string
  ) { }
}
export class Performance {
  constructor(
    public empid: string,        
    public project: string,
    public customer: string,
    public manager: string,
    public tstatus: string,
    public tools: string,
    public env: string,
    public psdate: string,
    public pedate: string,
    public asdate: string,
    public aedate: string,
    public cstatus: string,
    public resources: string,
    public remark: string,
    public today: string,
    public bugid: string,
    public users: string,
    public scenarios: string
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
 private cfgApiBaseUrl: string ='http://***.***.***.**:9999/jwt-app/';
 //private cfgApiBaseUrl: string ='http://localhost:8080/';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getEmployees() {
    return this.httpClient.get<Employee[]>(this.cfgApiBaseUrl + "employees");
  }

  getEmployeesbyId(employee) {
    return this.httpClient.get<Employee[]>(this.cfgApiBaseUrl + "employees/" + employee.empid);
  }

  public updateDetails(employee) {
    return this.httpClient.put<Employee>(this.cfgApiBaseUrl + "employees/" + employee.empid, employee);
  }

  public deleteEmployee(employee) {
    return this.httpClient.delete<Employee>(this.cfgApiBaseUrl + "employees/" + employee.empid);
  }

  public createEmployee(employee) {
    return this.httpClient.post<Employee>(this.cfgApiBaseUrl + "employees", employee);
  }
  public deleteAllEmployee() {
    return this.httpClient.delete<Performance>(this.cfgApiBaseUrl + "employees/sakujo");
  }
  
  getPerfEmployees() {    
    return this.httpClient.get<Performance[]>(this.cfgApiBaseUrl + "performance" );
  }

  getPerfEmployeesbyId(employee) {
    return this.httpClient.get<Performance[]>(this.cfgApiBaseUrl + "performance/" + employee.empid);
  }

  public updatePerfDetails(employee) {
    return this.httpClient.put<Performance>(this.cfgApiBaseUrl + "performance/" + employee.empid, employee);
  }

  public deletePerfEmployee(employee) {
    return this.httpClient.delete<Performance>(this.cfgApiBaseUrl + "performance/" + employee.empid);
  }

  public deleteAllPerfEmployee() {
    return this.httpClient.delete<Performance>(this.cfgApiBaseUrl + "performance/sakujo");
  }

  public createPerfEmployee(employee) {
    return this.httpClient.post<Performance>(this.cfgApiBaseUrl + "performance", employee);
  }
}