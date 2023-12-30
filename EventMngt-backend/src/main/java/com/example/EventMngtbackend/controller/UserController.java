package com.example.EventMngtbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.EventMngtbackend.model.User;
import com.example.EventMngtbackend.repository.UserRepository;

@CrossOrigin(origins= "http://localhost:3000")
@RestController
public class UserController {
    
    @Autowired
    private UserRepository userRepository;


    // @PostMapping("/userRegistration")
    // User newUserRegister(@RequestBody User newUser){
    //     return userRepository.save(newUser);
    // }

    @PostMapping("/userRegistration")
    public ResponseEntity<?> newUserRegister(@RequestBody User newUser) {
    User savedUser = userRepository.save(newUser);
    if (savedUser != null) {
        return new ResponseEntity<>("Registration successful!", HttpStatus.CREATED);
    } else {
        return new ResponseEntity<>("Error registering user", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

    @PostMapping("/userLogin")
    public ResponseEntity<String> login(@RequestBody User user) {
        User foundUser = userRepository.findByName(user.getName());

        if (foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
            return new ResponseEntity<>("Login successful!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }
    }
}
