package com.karan.backend.portal.service;

import java.util.Map;

import com.karan.backend.portal.vo.DashboardStatsVo;

public interface DashboardService {

	public DashboardStatsVo getDashboardStats();

	public Map<String, Integer> getHitCountsForLast7Days();
}
