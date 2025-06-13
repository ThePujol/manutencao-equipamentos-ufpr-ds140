package com.repairio.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * Serviço responsável pelo envio de e-mails.
 */
@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    /**
     * Envia um e-mail contendo a senha para o usuário.
     * @param to destinatário
     * @param password senha a ser enviada
     */
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
            logger.info("E-mail enviado com sucesso para {}", to);
        } catch (IllegalArgumentException e) {
            logger.warn("Erro de validação ao enviar e-mail: {}", e.getMessage());
            throw e;
        } catch (MailException e) {
            logger.error("Erro ao enviar e-mail para {}: {}", to, e.getMessage());
            throw new RuntimeException("Erro ao enviar e-mail", e);
        } catch (Exception e) {
            logger.error("Erro inesperado ao enviar e-mail para {}: {}", to, e.getMessage());
            throw new RuntimeException("Erro inesperado ao enviar e-mail", e);
        }
    }
}
