package com.javainuse.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javainuse.dao.DAOPerformance;
import com.javainuse.dao.PerformanceRepository;
import com.javainuse.exception.ResourceNotFoundException;

@CrossOrigin()
@RestController
@RequestMapping({ "/performance" })
public class PerfController {
	@Autowired
	private PerformanceRepository performanceRepository;

	@GetMapping(produces = "application/json")	
	
	public List<DAOPerformance> getAllPerfEmployees() {
		return performanceRepository.findAll();
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/{empid}")
	public ResponseEntity<DAOPerformance> getPerfEmployeeById(@PathVariable(value = "empid") Long employeeId)
			throws ResourceNotFoundException {
		DAOPerformance employee = performanceRepository.findById(employeeId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + employeeId));
		return ResponseEntity.ok().body(employee);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("")
	public DAOPerformance createPerfEmployee(@Valid @RequestBody DAOPerformance employee) {
		return performanceRepository.save(employee);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{empid}")
	public ResponseEntity<DAOPerformance> updatePerfEmployee(@PathVariable(value = "empid") Long employeeId,
			@Valid @RequestBody DAOPerformance employeeDetails) throws ResourceNotFoundException {
		DAOPerformance employee = performanceRepository.findById(employeeId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id : " + employeeId));

		employee.setEmpid(employeeDetails.getEmpid());
		employee.setProject(employeeDetails.getProject());	
		employee.setCustomer(employeeDetails.getCustomer());
        employee.setManager(employeeDetails.getManager());
        employee.setTstatus(employeeDetails.getTstatus());
        employee.setTools(employeeDetails.getTools());
        employee.setEnv(employeeDetails.getEnv());
        employee.setPsdate(employeeDetails.getPsdate());
		employee.setPedate(employeeDetails.getPedate());
		employee.setAsdate(employeeDetails.getAsdate());
		employee.setAedate(employeeDetails.getAedate()); 
		employee.setCstatus(employeeDetails.getCstatus());
		employee.setResources(employeeDetails.getResources());
		employee.setRemark(employeeDetails.getRemark());
		employee.setRemark(employeeDetails.getRemark());
		employee.setToday(employeeDetails.getToday());
		
		
		final DAOPerformance updatedEmployee = performanceRepository.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping(path = { "/{empid}" })
	public Map<String, Boolean> deletePerfEmployee(@PathVariable(value = "empid") Long employeeId)
			throws ResourceNotFoundException {
		DAOPerformance employee = performanceRepository.findById(employeeId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + employeeId));
		

		performanceRepository.delete(employee);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;		
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping(path = { "/sakujo" })
	public Map<String, Boolean> deleteAllPerfEmployee()
			throws ResourceNotFoundException {
		List<DAOPerformance> perfemployees = performanceRepository.findAll();
		performanceRepository.deleteAll(perfemployees);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
	
}