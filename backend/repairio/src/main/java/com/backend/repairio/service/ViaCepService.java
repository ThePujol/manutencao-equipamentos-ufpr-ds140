package com.backend.repairio.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.backend.repairio.model.Endereco;

@Service
public class ViaCepService {
    public Endereco buscarEnderecoPorCep(String cep) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://viacep.com.br/ws/" + cep + "/json/";
        return restTemplate.getForObject(url, Endereco.class);
    }
}
