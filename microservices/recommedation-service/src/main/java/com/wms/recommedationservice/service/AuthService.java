package com.wms.recommedationservice.service;

import com.wms.recommedationservice.dto.AuthUserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class AuthService {

    @Autowired
    private WebClient.Builder webClientBuilder;

    public AuthUserResponse getLoggedInUser(String token) {
        return webClientBuilder.build()
                .get()
                .uri("http://AUTH-SERVICE/api/auth/extract/" + token)
                .retrieve()
                .bodyToMono(AuthUserResponse.class)
                .block();
    }
}
