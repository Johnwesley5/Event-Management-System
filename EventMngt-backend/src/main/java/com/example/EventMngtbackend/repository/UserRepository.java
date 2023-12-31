package com.example.EventMngtbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EventMngtbackend.model.User;

public interface UserRepository extends JpaRepository<User , Long> {
    User findByName(String name);
}
