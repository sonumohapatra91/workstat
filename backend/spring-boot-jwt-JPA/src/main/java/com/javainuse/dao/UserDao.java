package com.javainuse.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.javainuse.model.User;

@Repository
public interface UserDao extends CrudRepository<User, Integer> {
	
	User findByUsername(String username);

	void deleteById(long id);

	User findById(long id);
	
}