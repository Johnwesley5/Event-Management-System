package com.example.EventMngtbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.EventMngtbackend.model.Admin;
import com.example.EventMngtbackend.repository.AdminRepository;

@CrossOrigin(origins= "http://localhost:3000")
@RestController
public class AdminController {
    
    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/adminRegistration")
    public ResponseEntity<?> newAdminRegister(@RequestBody Admin newAdmin){
    Admin savedAdmin = adminRepository.save(newAdmin);
    if(savedAdmin != null) {
        return new ResponseEntity<>(savedAdmin, HttpStatus.CREATED);
    } else {
        return new ResponseEntity<>("Error saving admin", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

    @PostMapping("/adminLogin")
    public ResponseEntity<String> login(@RequestBody Admin admin) {
        Admin foundAdmin = adminRepository.findByName(admin.getName());

        if (foundAdmin != null && foundAdmin.getPassword().equals(admin.getPassword())) {
            return new ResponseEntity<>("Login successful!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }
    }
}
