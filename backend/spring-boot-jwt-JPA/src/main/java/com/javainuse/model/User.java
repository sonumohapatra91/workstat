package com.javainuse.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.javainuse.dto.UserDTO;

import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.*;

@Entity
@Table(name = "user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
	private String username;
	@Column
	@JsonIgnore
	private String password;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "USER_ROLES", joinColumns = { @JoinColumn(name = "USER_ID") }, inverseJoinColumns = {
			@JoinColumn(name = "ROLE_ID") })
	private Set<Role> roles;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	 public UserDTO toUserDto(){
	        UserDTO userDto = new UserDTO();
	        userDto.setUserid(this.id);
	        userDto.setUsername(this.username);
	        userDto.setRole(this.roles.stream().map(role -> role.getName().toString()).collect(Collectors.toList()));
	        return userDto;
	    }

}