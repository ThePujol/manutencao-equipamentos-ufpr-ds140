package com.repairio.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordEmail(String to, String password) {
        try {
            if (to == null || to.trim().isEmpty()) {
                throw new IllegalArgumentException("Destinatário do e-mail não pode ser vazio.");
            }
            if (!to.matches("^[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,}$")) {
                throw new IllegalArgumentException("Formato de e-mail inválido.");
            }
            if (password == null || password.trim().isEmpty()) {
                throw new IllegalArgumentException("Senha não pode ser vazia.");
            }

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Sua senha de acesso");
            message.setText(
                    "Olá!\n\nSua senha de acesso é: " + password + "\n\nPor favor, altere-a após o primeiro login.");
            mailSender.send(message);
        } catch (IllegalArgumentException e) {
            System.err.println("Erro de validação ao enviar e-mail: " + e.getMessage());
            throw e;
        } catch (MailException e) {
            System.err.println("Erro ao enviar e-mail: " + e.getMessage());
            throw new RuntimeException("Erro ao enviar e-mail", e);
        } catch (Exception e) {
            System.err.println("Erro inesperado ao enviar e-mail: " + e.getMessage());
            throw new RuntimeException("Erro inesperado ao enviar e-mail", e);
        }
    }
}
