package com.karan.backend.portal.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.karan.backend.portal.entities.GalleryMedia;

@Repository
public interface GalleryMediaRepository extends JpaRepository<GalleryMedia, Long>{

	List<GalleryMedia> findByGalleryGroupId(Long groupId);

	List<GalleryMedia> findByGalleryGroupIdAndDeleteStatus(Long groupId, String deleteStatus);

	List<GalleryMedia> findByGalleryGroupIdAndHiddenFalseAndDeleteStatus(Long groupId, String string);

}
