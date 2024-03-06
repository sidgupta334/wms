package com.wms.praise.service;

import com.wms.praise.config.WebClientConfig;
import com.wms.praise.dto.*;
import com.wms.praise.model.Praise;
import com.wms.praise.model.PraisedSkills;
import com.wms.praise.repository.PraiseRepository;
import com.wms.praise.repository.PraiseSkillsRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.ValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class PraiseService {
    @Autowired
    private PraiseRepository praiseRepository;

    @Autowired
    private PraiseSkillsRepository praiseSkillsRepository;

    @Autowired
    private WebClientConfig webClientConfig;

    @Autowired
    private WebClient.Builder webClientBuilder;
    @Transactional
    public boolean createPraise(PraiseDto praiseDto) {

        List<JobTitleAndSkillResponseDto> skills = getSkillsFromIds(praiseDto.getSkills());
        if (skills == null ||(skills.size() < praiseDto.getSkills().length))
        {
            log.error("Some skills are invalid in the request");
            return false;
        }
        Praise praise = Praise.builder()
                .title(praiseDto.getTitle())
                .description(praiseDto.getDescription())
                .giverId(praiseDto.getGiverId())
                .receiverId(praiseDto.getReceiverId())
                .timestamp(new Date())
                .build();

        try {
            praiseRepository.save(praise);
            List<PraisedSkills> mappings = Arrays.stream(praiseDto.getSkills()).map(skill -> PraisedSkills.builder()
                    .praise(praise)
                    .skillId(skill)
                    .timestamp(new Date())
                    .build()
            ).toList();
            praiseSkillsRepository.saveAll(mappings);
            log.info("Praise with giver Id: " + praiseDto.getGiverId()+"and receiver_id "+praiseDto.getReceiverId() + " saved successfully...");
            return true;
        } catch (Exception e) {
            log.error("Something went wrong while creating praise..." + e);
            return false;
        }

    }

    public List<PraiseResponseDto> getAllPraise() {
        List<Praise> praises = praiseRepository.findAll();
        return praises.stream().map(this::mapToPraiseResponseDto).toList();
    }

    private PraiseResponseDto mapToPraiseResponseDto(Praise praise) {
        String entity = praise.getEntityId();
        List<PraisedSkills> mappings = getAllSkills(praise);
        String[] skillIds = mappings.stream().map(PraisedSkills::getSkillId).toArray(String[]::new);

        List<JobTitleAndSkillResponseDto> skills = getSkillsFromIds(skillIds);
        JobTitleAndSkillResponseDto jobTitle = getJobTitleFromId(praise.getGiverId());
        EmployeeSearchResponseDto employeeSearchResponseDto = getEmployeeById(praise.getGiverId());

        return PraiseResponseDto.builder()
                .entityId(entity)
                .title(praise.getTitle())
                .description(praise.getDescription())
                .giverId(employeeSearchResponseDto)
                .receiverId(praise.getReceiverId())
                .skills(skills)
                .build();
    }
    private List<JobTitleAndSkillResponseDto> getSkillsFromIds(String[] ids) {
        GetSkillsRequest request = new GetSkillsRequest(ids);
        JobTitleAndSkillResponseDto[] response = webClientBuilder.build().post()
                .uri("http://LIGHTCAST-SERVICE/api/skills")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(JobTitleAndSkillResponseDto[].class)
                .block();
        if (response == null) return null;
        return Arrays.stream(response).toList();
    }
    private EmployeeSearchResponseDto getEmployeeById(String id) {
        return webClientBuilder.build().get()
                .uri("http://RECOMMENDATION-SERVICE/api/search/employees/" + id)
                .retrieve()
                .bodyToMono(EmployeeSearchResponseDto.class)
                .block();
    }
    private JobTitleAndSkillResponseDto getJobTitleFromId(String id) {
        return webClientBuilder.build().get()
                .uri("http://LIGHTCAST-SERVICE/api/job-titles/" + id)
                .retrieve()
                .bodyToMono(JobTitleAndSkillResponseDto.class)
                .block();
    }

    public List<PraisedSkills> getAllSkills(Praise praise)
    {
       return praiseSkillsRepository.findByPraise(praise);
    }
    public AuthUserResponses getLoggedInUser(String token)
    {
        return webClientBuilder.build()
                .get()
                .uri("http://AUTH-SERVICE/api/auth/extract/" + token)
                .retrieve()
                .bodyToMono(AuthUserResponses.class)
                .block();
    }

    public List<PraiseResponseDto> getReceiverPraise(String receiver) {
        List<Praise> praises = praiseRepository.findByReceiverId(receiver);
        return praises.stream().map(this::mapToPraiseResponseDto).toList();
    }

    public List<PraiseResponseDto> getGiverPraise(String giver) {
        List<Praise> praises = praiseRepository.findByGiverId(giver);
        return praises.stream().map(this::mapToPraiseResponseDto).toList();
    }


    public boolean updatePraisedSkills(UpdatePraiseDto updatePraiseDto) {
        try{
            Praise praise = praiseRepository.findByEntityId(updatePraiseDto.getEntityId());
            if(praise == null)
            {
                log.error("Opportunity is invalid in the request");
                return false;
            }
            List<JobTitleAndSkillResponseDto> skills = getSkillsFromIds(updatePraiseDto.getSkills());

            if (skills == null ||(skills.size() < updatePraiseDto.getSkills().length))
            {
                log.error("Some skills are invalid in the request");
                return false;
            }
            praise.setGiverId(updatePraiseDto.getGiverId());
            praise.setReceiverId(updatePraiseDto.getReceiverId());
            praise.setTitle(updatePraiseDto.getTitle());
            praise.setDescription(updatePraiseDto.getDescription());
            praise.setTimestamp(new Date());
            praiseRepository.save(praise);
            List<PraisedSkills> opportunitySkillMappings = praiseSkillsRepository.findByPraise(praise);
            opportunitySkillMappings.forEach(mapping  -> {
                    praiseSkillsRepository.delete(mapping);
            });
            List<PraisedSkills> updatedMappings = skills.stream().map(skill -> PraisedSkills.builder()
                    .praise(praise)
                    .skillId(skill.getId())
                    .build()

            ).toList();
            return true;
        }
        catch (Exception e) {
            log.error("Something went wrong while updating employee.." + e);
            return false;
        }
    }

    public boolean deletePraise(String id, AuthUserResponses loggedInUser) {
        Praise praise = praiseRepository.findByEntityId(id);
        if(praise == null)
            return false;
         if (!loggedInUser.isAdmin() && !praise.getGiverId().equals(loggedInUser.getExternalId())) {
            throw new ValidationException("Invalid Request");
        }
        praiseSkillsRepository.deleteAllByPraise(praise);
        praiseRepository.delete(praise);
        return true;
    }
}
