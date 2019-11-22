package com.javainuse.dao;


import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<DAOEmployee, Long>  {
   
	 @Query("FROM #{#entityName} ORDER BY psdate ASC")	
	 List<DAOEmployee> findAll();
	//List<DAOEmployee> findById(String empid);  
} 
