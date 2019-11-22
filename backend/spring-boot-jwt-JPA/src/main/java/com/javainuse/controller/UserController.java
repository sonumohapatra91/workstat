package com.javainuse.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.javainuse.dto.UserDTO;
import com.javainuse.model.Role;
import com.javainuse.model.User;
import com.javainuse.service.JwtUserDetailsService;

import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {

    @Autowired
    private JwtUserDetailsService userService;
    
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value="/admin", method = RequestMethod.GET)
    public List<User> listUser(){
        return userService.findAll();
    }
    
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
    public User getOne(@PathVariable(value = "id") Long id){
        return userService.findById(id);
    }
    
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @RequestMapping(value = "/role/{id}", method = RequestMethod.GET)
    public Set<Role> getRole(@PathVariable(value = "id") Long id){
        return userService.findById(id).getRoles();
    }


    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @RequestMapping(value = "/roles/{username}", method = RequestMethod.GET)
    public Set<Role> getRoleByName(@PathVariable(value = "username") String username){
        return userService.findOne(username).getRoles();
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> saveUser(@RequestBody UserDTO user) throws Exception {
		return ResponseEntity.ok(userService.save(user));
	}
}


