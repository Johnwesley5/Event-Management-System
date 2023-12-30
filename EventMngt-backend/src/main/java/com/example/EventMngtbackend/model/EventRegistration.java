package com.example.EventMngtbackend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class EventRegistration {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String email;
    private String phnNumber;
    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhnNumber() {
        return phnNumber;
    }
    public void setPhnNumber(String phnNumber) {
        this.phnNumber = phnNumber;
    }
    public Event getEvent() {

        
        return event;
    }
    public void setEvent(Event event) {
        this.event = event;
    }
}
