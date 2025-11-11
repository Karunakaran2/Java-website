package com.karan.backend.conflogin.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hit_count")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HitCount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hit_Date")
    private LocalDateTime hitDate;

    @Column(name = "hit_Count")
    private Integer hitCount;
}