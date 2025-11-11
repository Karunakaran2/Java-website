package com.karan.backend.conflogin.entities.repo;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.karan.backend.conflogin.entities.HitCount;

@Repository
public interface HitCountRepository extends JpaRepository<HitCount, Long> {

    // Get latest 7 days' hit counts (sorted by hitDate DESC)
    @Query("SELECT h FROM HitCount h WHERE h.hitDate >= :startDate ORDER BY h.hitDate DESC")
    List<HitCount> findLast7Days(LocalDateTime startDate);

    @Query("SELECT h FROM HitCount h WHERE h.hitDate >= :fromDate ORDER BY h.hitDate")
    List<HitCount> findLast7DaysHits(@Param("fromDate") LocalDateTime fromDate);
}
