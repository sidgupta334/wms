package com.wms.authservice.service;

import com.netflix.discovery.converters.Auto;
import com.wms.authservice.dto.AuthUserResponse;
import com.wms.authservice.dto.CreateEmployeesDto;
import com.wms.authservice.dto.EmployeeCreateResultResponse;
import com.wms.authservice.dto.EmployeeDto;
import com.wms.authservice.model.UserCredential;
import com.wms.authservice.repository.UserCredentialRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

@Service
@Slf4j
public class AuthService {

    @Autowired
    private UserCredentialRepository userCredentialRepository;

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private EmailService emailService;

    public EmployeeCreateResultResponse createEmployees(CreateEmployeesDto createEmployeesDto) {
        EmployeeCreateResultResponse response = new EmployeeCreateResultResponse(0, 0);

        Arrays.stream(createEmployeesDto.getEmployees()).sequential().forEach(employeeDto -> {

            // Save Employee details in `employees` table.
            boolean res = createEmployee(employeeDto);
            String rawPassword = employeeDto.getPassword();

            UserCredential userCredential = UserCredential.builder()
                    .email(employeeDto.getEmail())
                    .externalId(employeeDto.getExternalId())
                    .isAdmin(employeeDto.getIsAdmin())
                    .password(passwordEncoder.encode(rawPassword))
                    .timestamps(new Date())
                    .build();

            if (res) {
                Optional<UserCredential> existingUser = userCredentialRepository.findByEmail(userCredential.getEmail());
                if (existingUser.isPresent()) {
                    response.setFailedCount(response.getFailedCount() + 1);
                    return;
                }
                userCredentialRepository.save(userCredential);
                emailService.sendPasswordOnEmail(userCredential, rawPassword);
                response.setSuccessCount(response.getSuccessCount() + 1);
            } else {
                response.setFailedCount(response.getFailedCount() + 1);
            }
        });

        return response;
    }

    public boolean createEmployee(EmployeeDto employeeDto) {
        try {
            return Boolean.TRUE.equals(webClientBuilder
                    .build()
                    .post()
                    .uri("http://EMPLOYEES-SERVICE/api/employees/create")
                    .bodyValue(employeeDto)
                    .retrieve()
                    .bodyToMono(Boolean.class)
                    .block());
        } catch (Exception e) {
            log.error("Something went wrong while calling EMPLOYEES-SERVICE, " + e);
            return false;
        }
    }

    public String generateToken(String email) {
        return jwtService.generateToken(email);
    }

    public void validateToken(String token) {
        jwtService.validateToken(token);
    }



    public AuthUserResponse getAuthUserByEmail(String email) {
        Optional<UserCredential> userCredential = userCredentialRepository.findByEmail(email);
        if (userCredential.isPresent()) {
            UserCredential authUser = userCredential.get();
            return mapToAuthUserResponse(authUser);
        }
        return null;
    }

    public AuthUserResponse extractUserInfo(String token) {
        token = token.substring(7);
        return jwtService.extractJWTAdminPayloadData(token);
    }

    private AuthUserResponse mapToAuthUserResponse(UserCredential userCredential) {
        return AuthUserResponse.builder()
                .email(userCredential.getEmail())
                .externalId(userCredential.getExternalId())
                .isAdmin(userCredential.getIsAdmin())
                .build();
    }

}
