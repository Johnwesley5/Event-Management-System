package com.example.EventMngtbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EventMngtbackend.model.EventRegistration;
import java.util.List;


public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Long> {
    List<EventRegistration> findByEventId(Long id);
}
