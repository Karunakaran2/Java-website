package com.karan.backend.portal.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.karan.backend.portal.entities.Whitepaper;

@Repository
public interface WhitepaperRepository extends JpaRepository<Whitepaper, Long> {

	List<Whitepaper> findByDisableStatusOrderByPublishedDateDesc(String string);

	Optional<Whitepaper> findBySlug(String slug);
}