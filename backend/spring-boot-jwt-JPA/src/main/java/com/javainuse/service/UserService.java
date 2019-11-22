package com.javainuse.service;


import java.util.List;

import com.javainuse.dto.UserDTO;
import com.javainuse.model.User;

public interface UserService {

    UserDTO save(UserDTO user);
    List<User> findAll();
    void delete(long id);
    User findOne(String username);
    User findById(Long id);
}