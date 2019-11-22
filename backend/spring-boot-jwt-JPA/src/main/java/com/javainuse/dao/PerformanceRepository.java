package com.javainuse.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PerformanceRepository extends JpaRepository<DAOPerformance, Long>  {
	
	 @Query("FROM #{#entityName} ORDER BY psdate ASC")	
	 List<DAOPerformance> findAll();	
	} 
