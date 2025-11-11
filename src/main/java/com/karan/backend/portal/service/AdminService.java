package com.karan.backend.portal.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.karan.backend.portal.entities.BlogPost;
import com.karan.backend.portal.entities.CareerApplication;
import com.karan.backend.portal.entities.Careers;
import com.karan.backend.portal.entities.CaseStudy;
import com.karan.backend.portal.entities.Event;
import com.karan.backend.portal.entities.GalleryGroup;
import com.karan.backend.portal.entities.GalleryMedia;
import com.karan.backend.portal.entities.Whitepaper;
import com.karan.backend.portal.vo.BlogPostFormVO;
import com.karan.backend.portal.vo.CareerApplicationFormVO;
import com.karan.backend.portal.vo.CaseStudyVO;

public interface AdminService {
	/**
	 * Developed by: Sivanand G Kamath
	 *  GitHub: https://github.com/sgk125 Project:
	 * Spring Boot CMS Backend Date: July 21, 2025 Description: This class handles admin
	 * user actions for the CMS application.
	 */

	List<Whitepaper> getAllWhitepapers();

	void saveWhitepaper(String title, String description, LocalDate publishedDate, MultipartFile pdfFile,
			MultipartFile imageFile) throws IOException;

	ResponseEntity<Resource> getWhitepaperPdf(Long id) throws IOException;

	ResponseEntity<Resource> getWhitepaperImage(Long id) throws IOException;

	void updateWhitepaper(Long id, String title, String description, LocalDate publishedDate, MultipartFile pdfFile,
			MultipartFile imageFile) throws IOException;

	public List<Whitepaper> getEnabledWhitepapersForPublic();

	void updateWhitepaperStatus(Long id, String string);

	List<Event> getAllEvents();

	List<Event> getAllEventsForPublic();

	void saveEvent(Event event);

	void updateEventDisableStatus(Long id, String status);

	Event getEventById(Long id);

	Object getAllGalleryGroups();

	void saveGalleryGroup(GalleryGroup galleryGroup, MultipartFile img);

	GalleryGroup updateGalleryGroup(Long id, GalleryGroup galleryGroup, MultipartFile coverImage);

	List<GalleryMedia> getGalleryMediaByGroupId(Long id);

	void saveGalleryMediaFiles(Long groupId, List<MultipartFile> mediaFiles);

	boolean deleteGalleryMediaById(Long id);

	boolean toggleStatusById(Long id, String status);

	List<Map<String, String>> getGalleryMediaByGroupIdForPublic(Long groupId);

	void addJobPost(Careers career);

	List<Careers> getAllJobPostings();

	void updateCareerById(Long id, Careers updatedCareer);

	void toggleCareerStatus(Long id, String status);

	List<Careers> getActiveCareers();

	Careers getJobDetailsById(Long id);

	public List<CareerApplication> getAllCareerApplications();

	void submitApplication(CareerApplicationFormVO form) throws IOException;

	void saveBlogPost(BlogPostFormVO form) throws IOException;

	List<BlogPost> getAllBlogs();

	void toggleBlogStatus(Long blogId, String status);

	List<BlogPost> getRecentThreeBlogs();
	
	 List<BlogPost> getLatestPublishedPosts();

	BlogPost findPublishedBlogBySlug(String slug);

	public Page<BlogPost> getAllPublishedBlogs(Pageable pageable);

	List<BlogPost> getPublishedBlogsByCategory(String category);

	List<BlogPost> findRecentlyPublishedBlogs();

	List<BlogPost> findRecentTwoPublishedBlogs();

	Page<CaseStudy> getPublishedCaseStudiesLatest(Pageable pageable);

	List<CaseStudy> getAllCaseStudies();

	void addCaseStudy(CaseStudyVO vo) throws IOException;

	void updateCaseStudy(CaseStudyVO form) throws IOException;

	CaseStudyVO getCaseStudyById(Long id);

	CaseStudy findCaseStudyBySlug(String slug);

	List<CaseStudy> findFourRelatedCaseStudies(Long id, String author);

	List<CaseStudy> getFeaturedCaseStudies();

	boolean toggleCaseStudyPublishStatus(Long id);

	boolean toggleCaseStudyFeatureStatus(Long id);

	List<CareerApplication> getAllJobApplications();

	List<Careers> findAllCareers();

	List<CareerApplication> getFilteredJobApplications(Long careerId, LocalDate startDate, LocalDate endDate);

	List<GalleryGroup> findGalleryGroupsForPublic();
	
	Page<GalleryGroup> findAllActiveGalleryGroups(Pageable pageable);

	void updateBlogPost(BlogPostFormVO form);

	List<CareerApplication> getAllCareerApplicationFromLast3Days();

	ResponseEntity<Resource> getWhitepaperPdfBySlug(String slug) throws IOException;

	ResponseEntity<Resource> getResumeResponse(Long applicationId) throws IOException;
	
}
