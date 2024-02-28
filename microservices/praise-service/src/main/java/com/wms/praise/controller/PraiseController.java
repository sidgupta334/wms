package com.wms.praise.controller;

import com.wms.praise.dto.PraiseDto;
import com.wms.praise.dto.PraiseResponseDto;
import com.wms.praise.service.PraiseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/praiseAndEndorsement")
public class PraiseController {
    @Autowired
    private PraiseService praiseService;

    @GetMapping("/get")
    @ResponseStatus(HttpStatus.OK)
    public List<PraiseResponseDto> getAllOpportunities() {
        return praiseService.getAllPraise();
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public boolean createPraise(@Valid @RequestBody PraiseDto praiseDto) {
        return praiseService.createPraise(praiseDto);
    }
}
