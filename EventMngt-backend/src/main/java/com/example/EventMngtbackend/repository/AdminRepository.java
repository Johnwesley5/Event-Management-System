package com.example.EventMngtbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EventMngtbackend.model.Admin;

public interface AdminRepository extends JpaRepository<Admin , Long> {
    Admin findByName(String name);
}
