package com.wms.authservice.controller;

import com.wms.authservice.dto.AuthUserResponse;
import com.wms.authservice.dto.CreateEmployeesDto;
import com.wms.authservice.dto.EmployeeCreateResultResponse;
import com.wms.authservice.dto.LoginDto;
import com.wms.authservice.service.AuthService;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String generateAuthToken(@Valid @RequestBody LoginDto loginDto) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));
        if (authenticate.isAuthenticated()) {
            return authService.generateToken(loginDto.getEmail());
        } else {
            throw new ValidationException("Invalid credentials");
        }
    }

    @GetMapping("validate/{token}")
    public String validateAuthToken(@PathVariable("token") String token) {
        authService.validateToken(token);
        return "Valid";
    }

    @GetMapping("extract/{token}")
    public AuthUserResponse extractTokenPayload(@PathVariable("token") String token) {
        return authService.isLoggedInUserAdmin(token);
    }

    @GetMapping("/email/{email}")
    public AuthUserResponse getAuthByEmail(@PathVariable("email") String email) {
        return authService.getAuthUserByEmail(email);
    }

}
