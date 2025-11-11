package com.karan.backend.portal.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.karan.backend.portal.entities.BlogCategory;

@Repository
public interface BlogCategoryRepository extends JpaRepository<BlogCategory, Long> {
    Optional<BlogCategory> findBySlug(String slug);
    boolean existsBySlug(String slug);
    List<BlogCategory> findByDisableStatus(String disableStatus);
}