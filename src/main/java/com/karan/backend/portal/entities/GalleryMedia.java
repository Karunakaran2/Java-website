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
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "gallery_media")
public class GalleryMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "gallery_group_id", nullable = false)
    private Long galleryGroupId;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "file_type", length = 20)
    private String fileType;  // i = "image" or v ="video"

    @Column(name = "file_size_kb")
    private Integer fileSizeKb;

    @Column(name = "hidden")
    private Boolean hidden = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "delete_status")
    private String deleteStatus = "N";

}
