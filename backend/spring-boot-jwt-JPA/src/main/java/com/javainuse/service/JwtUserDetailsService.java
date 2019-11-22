package com.javainuse.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.javainuse.dao.RoleDao;
import com.javainuse.dao.UserDao;
import com.javainuse.dto.UserDTO;
import com.javainuse.model.RoleType;
import com.javainuse.model.User;

@Service(value = "userService")
public class JwtUserDetailsService implements UserDetailsService, UserService {

	private static final Logger log = LoggerFactory.getLogger(JwtUserDetailsService.class);

	@Autowired
	private UserDao userDao;

	@Autowired
	private RoleDao roleDao;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userDao.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				getAuthority(user));
	}

	private Set<SimpleGrantedAuthority> getAuthority(User user) {
		Set<SimpleGrantedAuthority> authorities = new HashSet<>();
		user.getRoles().forEach(role -> {

			authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
		});
		return authorities;
		// return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
	}

	public UserDTO save(UserDTO userDto) {

		User userWithDuplicateUsername = userDao.findByUsername(userDto.getUsername());
		if (userWithDuplicateUsername != null && userDto.getUserid() != userWithDuplicateUsername.getId()) {
			log.error(String.format("Duplicate username %", userDto.getUsername()));
			throw new RuntimeException("Duplicate username.");
		}

		User newUser = new User();
		newUser.setUsername(userDto.getUsername());
		newUser.setPassword(bcryptEncoder.encode(userDto.getPassword()));

		// [ROLE_USER, ROLE_ADMIN,..]
		List<RoleType> roleTypes = new ArrayList<>();
		userDto.getRole().stream().map(role -> roleTypes.add(RoleType.valueOf(role)));

		newUser.setRoles(roleDao.find(userDto.getRole()));
		userDao.save(newUser);
		return userDto;
	}

	@Override
	public List<User> findAll() {
		List<User> list = new ArrayList<>();
		userDao.findAll().iterator().forEachRemaining(list::add);
		return list;
	}

	@Override
	public void delete(long id) {
		userDao.deleteById(id);

	}

	@Override
	public User findOne(String username) {
		return userDao.findByUsername(username);
	}

	@Override
	public User findById(Long id) {		
		return userDao.findById(id);
	}
	

}