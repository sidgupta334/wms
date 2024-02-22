package com.wms.authservice.service;

import com.wms.authservice.dto.AuthUserResponse;
import com.wms.authservice.model.UserCredential;
import com.wms.authservice.repository.UserCredentialRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class JWTService {

    @Autowired
    private UserCredentialRepository userCredentialRepository;

    public static final String SECRET = "04ca023b39512e46d0c2cf4b48d5aac61d34302994c87ed4eff225dcf3b0a218739f3897051a057f9b846a69ea2927a587044164b7bae5e1306219d50b588cb1";

    public void validateToken(final String token) {
        Jwts.parser()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token);
    }

    public AuthUserResponse extractJWTAdminPayloadData(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return AuthUserResponse.builder()
                .email(claims.get("email", String.class))
                .isAdmin(claims.get("isAdmin", Boolean.class))
                .externalId(claims.get("externalId", String.class))
                .build();
    }

    public String generateToken(String email) {
        Map<String, Object> claims = new HashMap<>();
        Optional<UserCredential> userCredentialOptional = userCredentialRepository.findByEmail(email);
        if (userCredentialOptional.isEmpty()) {
            throw new ValidationException("No user found!!!");
        }
        UserCredential userCredential = userCredentialOptional.get();
        claims.put("email", userCredential.getEmail());
        claims.put("isAdmin", userCredential.getIsAdmin());
        claims.put("externalId", userCredential.getExternalId());
        claims.put("user", userCredentialRepository.findByEmail(email));
        return createToken(claims, email);
    }

    private String createToken(Map<String, Object> claims, String email) {
        return Jwts.builder()
                .claims(claims)
                .subject(email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 100 * 60 * 24))
                .signWith(getSignKey())
                .compact();
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
