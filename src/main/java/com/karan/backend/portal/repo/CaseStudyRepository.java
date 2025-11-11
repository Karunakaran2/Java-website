package com.karan.backend.portal.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.karan.backend.portal.entities.CaseStudy;

@Repository
public interface CaseStudyRepository extends JpaRepository<CaseStudy, Long> {
    Optional<CaseStudy> findBySlugAndPublished(String slug, boolean published);
    List<CaseStudy> findAllByPublishedOrderByCreatedAtDesc(boolean published);
	Page<CaseStudy> findAllByPublishedOrderByCreatedAtDesc(String string, Pageable pageable);
	List<CaseStudy> findAllByOrderByCreatedAt();
	Optional<CaseStudy> findBySlug(String slug);
	List<CaseStudy> findTop4ByAuthorAndIdNotAndPublishedOrderByCreatedAtDesc(String author, Long casestudyId,
			String string);
	List<CaseStudy> findByFeaturedStatus(String featured);
}
