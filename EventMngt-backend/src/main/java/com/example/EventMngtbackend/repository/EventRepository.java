package com.example.EventMngtbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EventMngtbackend.model.Event;

public interface EventRepository extends JpaRepository<Event, Long>{
    
}
