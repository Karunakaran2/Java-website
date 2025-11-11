package com.karan.backend.portal.vo;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlogPostVO {

    private Long id;
    private String title;
    private String slug;
    private Long categoryId; // ID only (not object)
    private String authorName;
    private String summary;
    private String content;
    private MultipartFile coverImageFile;
    private String published; // "Y" or "N"
}