package com.karan.backend.portal.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.karan.backend.portal.entities.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByDisableStatusAndDeleteStatusOrderByEventDateDesc(String disableStatus, String deleteStatus);

	List<Event> findAllByOrderByEventDateDesc();
}