package com.wms.praise.controller;

import com.wms.praise.dto.AuthUserResponse;
import com.wms.praise.dto.PraiseDto;
import com.wms.praise.dto.PraiseResponseDto;
import com.wms.praise.service.PraiseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/praiseAndEndorsement")
public class PraiseController {
    @Autowired
    private PraiseService praiseService;

    @GetMapping("/get")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?>  getAllPraises(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {

        AuthUserResponse loggedInUser = praiseService.getLoggedInUser(token);
        if (!loggedInUser.isValid()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is Unauthorized");
        }
        return ResponseEntity.ok(praiseService.getAllPraise());
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public boolean createPraise(@Valid @RequestBody PraiseDto praiseDto) {
        return praiseService.createPraise(praiseDto);
    }
}
