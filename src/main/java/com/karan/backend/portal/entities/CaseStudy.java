package com.karan.backend.portal.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import groovy.transform.builder.Builder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "case_studies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CaseStudy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String body; // Rich text from CKEditor

    @Lob
    @Column(columnDefinition = "TEXT")
    private String inBrief; // rich text from CKEditor

    @Column(name = "pdf_file_name")
    private String pdfFileName;

    private String slug; 
    
    private String author;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "published_at")
    private LocalDateTime publishedAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    private String published = "N"; //Yes or No
    
    @Column(name = "thumbnail_image")
    private String thumbnailImage;
    
    @Column(name = "view_count")
    private int viewCount;
    
    @Column(name = "featured_status")
    private String featuredStatus = "N";
    
    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

