package com.wms.lightcastservice.service;

import com.wms.lightcastservice.dto.LightcastAuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class LightcastAuthService {

    @Autowired
    @Qualifier("webClientBuilderForExternalApi")
    private WebClient.Builder webClientBuilderForExternalApi;

    @Value("${app.lightcast.authUrl}")
    private String authUrl;

    @Value("${app.lightcast.clientId}")
    private String clientId;

    @Value("${app.lightcast.secret}")
    private String secret;

    @Value("${app.lightcast.scope}")
    private String scope;

    public String getAuthToken() {
        LightcastAuthResponse response = webClientBuilderForExternalApi.build().post()
                .uri(authUrl)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .body(BodyInserters.fromValue("client_id=" + clientId + "&client_secret=" + secret + "&grant_type=client_credentials&scope=" + scope))
                .retrieve()
                .bodyToMono(LightcastAuthResponse.class)
                .block();

        return response != null ? "Bearer " + response.getAccess_token() : null;
    }
}
