package com.karan.backend.portal.service.impl;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.karan.backend.conflogin.entities.HitCount;
import com.karan.backend.conflogin.entities.repo.HitCountRepository;
import com.karan.backend.portal.repo.CareerApplicationRepository;
import com.karan.backend.portal.repo.ContactFormRepository;
import com.karan.backend.portal.service.DashboardService;
import com.karan.backend.portal.vo.DashboardStatsVo;

@Service
public class DashboardServiceImpl implements DashboardService {

	@Autowired
	ContactFormRepository contactFormRepository;
	@Autowired
	CareerApplicationRepository careerApplicationRepository;
	@Autowired
	HitCountRepository hitCountRepository;

	public DashboardStatsVo getDashboardStats() {
		DashboardStatsVo stats = new DashboardStatsVo();
		stats.setTotalContacts(contactFormRepository.count());
		stats.setTotalJobApplications(careerApplicationRepository.count());
		stats.setTotalHitCount(hitCountRepository.count());
		return stats;
	}

	 public Map<String, Integer> getHitCountsForLast7Days() {
		 LocalDateTime fromDateTime = LocalDateTime.now().minusDays(6); // Includes today

	        List<HitCount> last7Days = hitCountRepository.findLast7DaysHits(fromDateTime);

	        Map<String, Integer> result = new LinkedHashMap<>();

	        // Init labels: Mon, Tue, etc. with 0
	        for (int i = 6; i >= 0; i--) {
	            LocalDateTime dateTime = LocalDateTime.now().minusDays(i);
	            String label = dateTime.getDayOfWeek().toString().substring(0, 3); // MON, TUE
	            result.put(label, 0);
	        }

	        for (HitCount hit : last7Days) {
	            String label = hit.getHitDate().getDayOfWeek().toString().substring(0, 3);
	            result.put(label, hit.getHitCount());
	        }

	        return result;
	    }
}
