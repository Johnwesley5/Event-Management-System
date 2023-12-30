package com.example.EventMngtbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.EventMngtbackend.Exception.EventNotFoundException;
import com.example.EventMngtbackend.model.Event;
import com.example.EventMngtbackend.model.EventRegistration;
import com.example.EventMngtbackend.repository.EventRegistrationRepository;
import com.example.EventMngtbackend.repository.EventRepository;

@CrossOrigin(origins= "http://localhost:3000")
@RestController
public class EventRegistrationController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventRegistrationRepository eventRegistrationRepository;

    @PostMapping("/events/{eventId}/register")
    EventRegistration registerForevent(@PathVariable Long eventId, @RequestBody EventRegistration registration){
        Event event = eventRepository.findById(eventId)
            .orElseThrow(()-> new EventNotFoundException(eventId));
        registration.setEvent(event);
        return eventRegistrationRepository.save(registration);
   }

   @GetMapping("/events/{eventId}/registrations")
   List<EventRegistration> getRegistrationsForEvent(@PathVariable Long eventId){
    return eventRegistrationRepository.findByEventId(eventId);
   }

   @PutMapping("/events/{eventId}/registrations/{registrationId}")
   EventRegistration updateRegistration(@PathVariable Long eventId, @PathVariable Long registrationId, @RequestBody EventRegistration updatedRegistration){
    Event event= eventRepository.findById(eventId)
    .orElseThrow(() -> new EventNotFoundException(eventId));

    EventRegistration registration = eventRegistrationRepository.findById(registrationId)
    .orElseThrow(() -> new RuntimeException("Registration not found"));

    if (!registration.getEvent().getId().equals(eventId)) {
        throw new RuntimeException("Mismatch between event and registration");
   }
   return eventRegistrationRepository.save(updatedRegistration);
}

@DeleteMapping("/events/{eventId}/registrations")
    String deleteRegistrationsForEvent(@PathVariable Long eventId) {
        List<EventRegistration> registrations = eventRegistrationRepository.findByEventId(eventId);
        
        if (registrations.isEmpty()) {
            throw new RuntimeException("No registrations found for the event with ID: " + eventId);
        }
        
        // Delete each registration associated with the event
        for (EventRegistration registration : registrations) {
            eventRegistrationRepository.delete(registration);
        }

        return "All registrations for event with ID " + eventId + " have been deleted successfully.";
    }
}
