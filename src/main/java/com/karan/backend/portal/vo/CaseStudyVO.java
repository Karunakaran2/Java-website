package com.karan.backend.portal.vo;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class CaseStudyVO {
    private Long id;
    private String title;
    private String body;
    private String inBrief;
    private String authorName;
    private LocalDate publishedAt;
    private String published; // "Y" or "N"
    private Integer readCount;

    private MultipartFile pdfFile; // For uploading case study PDF
    private MultipartFile thumbnailImage;
    
    private String pdfFileName;
	private String thumbnailImageName;
}