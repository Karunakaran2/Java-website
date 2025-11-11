package com.karan.backend.portal.vo;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class BlogPostFormVO {

	private Long id;
	
    @NotBlank
    private String title;

    @NotNull
    private Long categoryId;

    private String authorName;

    private String summary;

    @NotBlank
    private String content;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate publishedAt;

    private MultipartFile coverImage;
    
    private MultipartFile thumbnailImage;
}