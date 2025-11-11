package com.karan.backend.portal.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.karan.backend.portal.entities.BlogPost;

	@Repository
	public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
		
	    Optional<BlogPost> findBySlug(String slug);
	    
	    boolean existsBySlug(String slug);
	    
		List<BlogPost> findAllByOrderByCreatedAt();
	
		BlogPost findBySlugAndPublished(String slug, String string);
	
		List<BlogPost> findTop3ByPublishedOrderByPublishedAtDesc(String string);
	
		List<BlogPost> findAllByPublishedOrderByCreatedAtDesc(String publishedStatus);
	
		List<BlogPost> findByCategory_NameAndPublishedOrderByCreatedAtDesc(String categoryName, String string);
	
		List<BlogPost> findTop2ByPublishedOrderByCreatedAtDesc(String publishedStatus);
	
		Page<BlogPost> findAllByPublishedOrderByCreatedAtDesc(String publishedStatus, Pageable pageable);

		List<BlogPost> findTop4ByPublishedOrderByPublishedAtDesc(String string);
}