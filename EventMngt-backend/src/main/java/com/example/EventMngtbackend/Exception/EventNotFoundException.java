package com.example.EventMngtbackend.Exception;

public class EventNotFoundException extends RuntimeException{
    public EventNotFoundException(Long id){
        super("Could not found the user with id "+id);
    }
}
