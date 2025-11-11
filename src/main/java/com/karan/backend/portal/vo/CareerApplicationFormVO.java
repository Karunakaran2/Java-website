package com.karan.backend.portal.vo;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CareerApplicationFormVO {

	@NotNull
    private Long careerId;

    @NotBlank(message = "Full name is required")
    @Size(max = 45, message = "Name must not exceed 45 characters")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email")
    @Size(max = 45)
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9+\\-() ]{10,20}$", message = "Enter a valid phone number")
    private String phone;

    @NotBlank(message = "Cover letter is required")
    @Size(max = 1000, message = "Cover letter must be under 1000 characters")
    private String coverLetter;

    private MultipartFile resume;

    @AssertTrue(message = "Resume file is required")
    public boolean isResumeUploaded() {
        return resume != null && !resume.isEmpty();
    }
}
