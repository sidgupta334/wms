package com.wms.authservice.controller;

import com.wms.authservice.dto.*;
import com.wms.authservice.service.AuthService;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/create")
    public EmployeeCreateResultResponse createUsers(@Valid @RequestBody CreateEmployeesDto dto) {
        return authService.createEmployees(dto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> generateAuthToken(@Valid @RequestBody LoginDto loginDto) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));
        if (authenticate.isAuthenticated()) {
            String token = authService.generateToken(loginDto.getEmail());
            AuthUserResponse authUser = authService.getAuthUserByEmail(loginDto.getEmail());
            if (authUser == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user");
            LoginResponse response = LoginResponse.builder()
                    .token(token)
                    .email(authUser.getEmail())
                    .isAdmin(authUser.isAdmin())
                    .externalId(authUser.getExternalId())
                    .build();
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Credentials");
        }
    }

    @GetMapping("me")
    public ResponseEntity<?> getMyDetails(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        EmployeesResponse user = authService.getMeDetails(token);
        return ResponseEntity.ok(user);
    }

    @GetMapping("validate/{token}")
    public String validateAuthToken(@PathVariable("token") String token) {
        authService.validateToken(token);
        return "Valid";
    }

    @GetMapping("extract/{token}")
    public AuthUserResponse extractTokenPayload(@PathVariable("token") String token) {
        return authService.extractUserInfo(token);
    }

    @GetMapping("/email/{email}")
    public AuthUserResponse getAuthByEmail(@PathVariable("email") String email) {
        return authService.getAuthUserByEmail(email);
    }

}
