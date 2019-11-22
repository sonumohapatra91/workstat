package com.javainuse.dto;

import java.util.List;

public class UserDTO {
	private Long userid;
	private String username;
	private String password;
	 private List<String> role;
		

	public Long getUserid() {
		return userid;
	}

	public void setUserid(long id) {
		this.userid = id;
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

	public List<String> getRole() {
		return role;
	}

	public void setRole(List<String> role) {
		this.role = role;
	}

	
}