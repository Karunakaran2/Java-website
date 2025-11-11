package com.karan.backend.portal.repo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.karan.backend.portal.entities.GalleryGroup;

@Repository
public interface GalleryGroupRepository extends JpaRepository<GalleryGroup, Long> {

	Page<GalleryGroup> findAllByDeactiveStatus(String string, Pageable pageable);

	@Query("SELECT g FROM GalleryGroup g WHERE g.deactiveStatus = 'N' ORDER BY g.id DESC")
	Page<GalleryGroup> findAllActiveGalleryGroups(Pageable pageable);

	@Query("SELECT g FROM GalleryGroup g WHERE g.deactiveStatus = 'N' ORDER BY g.id DESC")
	List<GalleryGroup> findAllActiveGalleryGroups();
}
