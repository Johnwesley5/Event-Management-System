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
import com.example.EventMngtbackend.repository.EventRepository;

@CrossOrigin(origins= "http://localhost:3000")
@RestController
public class EventController {
    
    @Autowired
    private EventRepository eventRepository;

    @PostMapping("/eventCreate")
    Event newEvent(@RequestBody Event newEvent){
        return eventRepository.save(newEvent);
    }

    @GetMapping("/events")
    List<Event> getAllEvents(){
        return eventRepository.findAll();
    }

    @PutMapping("/event/{id}")
    Event updateEvent(@RequestBody Event newEvent, @PathVariable Long id ){
        return eventRepository.findById(id)
        .map(event -> {
            event.setEventName(newEvent.getEventName());
            event.setEventDescription(newEvent.getEventDescription());
            event.setEventVenue(newEvent.getEventVenue());
            event.setEventDate(newEvent.getEventDate());
            event.setOrganizer(newEvent.getOrganizer());
            event.setCategory(newEvent.getCategory());
            event.setDeadline(newEvent.getDeadline());
            event.setContactNumber(newEvent.getContactNumber());
            return eventRepository.save(event);
        }).orElseThrow(()->new EventNotFoundException(id));
    }

    @DeleteMapping("/event/{id}")
    String deleteEvent(@PathVariable Long id){
        if(!eventRepository.existsById(id)){
            throw new EventNotFoundException(id);
        }
        eventRepository.deleteById(id);
        return "Event with id "+id+" has been deleted successfully.";
    }
}
