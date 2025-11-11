package com.karan.backend.portal.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

import groovy.transform.builder.Builder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "career_applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CareerApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Foreign key relationship with careers table (can also be a Long if no entity relation is needed)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "career_id", referencedColumnName = "id")
    private Careers career;

    @Column(name = "full_name", length = 45)
    private String fullName;

    @Column(length = 45)
    private String email;

    @Column(length = 45)
    private String phone;

    @Column(name = "cover_letter", length = 1000)
    private String coverLetter;

    @Column(name = "resume_fileName", length = 255)
    private String resumeFileName;

    @Column(name = "resume_name_in_server", length = 255)
    private String resumeNameInServer;

    @Column(name = "applied_on")
    private LocalDateTime appliedOn;

    @Column(name = "delete_status", length = 45)
    private String deleteStatus = "N";

    @Column(name = "application_status", length = 45)
    private String applicationStatus;

    @Column(length = 500)
    private String remarks;

    @PrePersist
    protected void onCreate() {
        this.appliedOn = LocalDateTime.now();
    }
    
}