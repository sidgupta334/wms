package com.wms.authservice.service;

import com.wms.authservice.model.UserCredential;
import com.wms.authservice.repository.UserCredentialRepository;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private UserCredentialRepository userCredentialRepository;

    @Value("${spring.mail.username}")
    String adminEmail;

    public void sendPasswordOnEmail(UserCredential user, String rawPassword) {
        MimeMessage msg = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(msg, false);
            helper.setTo(user.getEmail());
            helper.setFrom(adminEmail);
            helper.setSubject("Reset Your Password");
            String content = "<p> Hi User, </p>";
            content += "<h3> Greetings from WMS !!!</h3>";
            content += "Welcome to WMS, your account has been registered successfully, please use below credentials to login into your account:";
            content += "<h2 style='color: #013961'> Email: <b>" + user.getEmail() + "</b></h2>";
            content += "<h2 style='color: #270142'> Password: <b>" + rawPassword + "</b></h2>";
            content += "<br/>";
            content += "<div> Thanks and Regards, </div>";
            content += "<div> WMS System</div>";
            helper.setText(content, true);
            javaMailSender.send(msg);
        } catch (Exception e) {
            log.error("Something went wrong while sending email: ", e);
        }
    }
}
