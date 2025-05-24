package com.repairio.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordEmail(String to, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Sua senha de acesso");
        message.setText(
                "Olá!\n\nSua senha de acesso é: " + password + "\n\nPor favor, altere-a após o primeiro login.");
        mailSender.send(message);
    }
}
