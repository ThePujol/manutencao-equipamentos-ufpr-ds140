package com.repairio.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.repairio.backend.model.ViaCepResponse;

@Service
public class ViaCepService {

    private final RestTemplate restTemplate;

    public ViaCepService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ViaCepResponse buscarEnderecoPorCep(String cep) {
        String url = String.format("https://viacep.com.br/ws/%s/json/", cep);
        return restTemplate.getForObject(url, ViaCepResponse.class);
    }
}
