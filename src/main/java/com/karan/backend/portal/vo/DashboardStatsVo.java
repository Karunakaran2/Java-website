package com.karan.backend.portal.vo;

import lombok.Data;

@Data
public class DashboardStatsVo {

	private long totalContacts;
	private long totalHitCount;
    private long totalEnquiries;
    private long totalBlogs;
    private long totalCaseStudies;
    private long totalJobPosting;
    private long totalJobApplications;
    
}
