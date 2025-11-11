package com.karan.backend.portal.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.karan.backend.conflogin.entities.HitCount;
import com.karan.backend.portal.entities.BlogCategory;
import com.karan.backend.portal.entities.BlogPost;
import com.karan.backend.portal.entities.CareerApplication;
import com.karan.backend.portal.entities.Careers;
import com.karan.backend.portal.entities.CaseStudy;
import com.karan.backend.portal.entities.ContactForm;
import com.karan.backend.portal.entities.Event;
import com.karan.backend.portal.entities.GalleryGroup;
import com.karan.backend.portal.entities.GalleryMedia;
import com.karan.backend.portal.entities.Whitepaper;
import com.karan.backend.portal.service.AdminService;
import com.karan.backend.portal.service.ContactFormService;
import com.karan.backend.portal.service.DashboardService;
import com.karan.backend.portal.service.SetupService;
import com.karan.backend.portal.vo.BlogPostFormVO;
import com.karan.backend.portal.vo.CaseStudyVO;
import com.karan.backend.portal.vo.DashboardStatsVo;

@Controller
public class AdminController {

	@Autowired
	private DashboardService dashboardService;

	@Autowired
	private ContactFormService contactFormService;

	@Autowired
	private AdminService adminService;

	@Autowired
	private SetupService setupService;

	@GetMapping(value = "/admin/dashboard")
	public ModelAndView gotoAdminDashboard() {
		ModelAndView modelAndView = new ModelAndView();
		DashboardStatsVo stats = dashboardService.getDashboardStats();
		// Latest 3-day job applications
	    List<CareerApplication> jobApplications = adminService.getAllCareerApplicationFromLast3Days();

	    // Latest 3-day contact form submissions
	    List<ContactForm> contactForms = contactFormService.getAllContactsFromLast3Days();

	    // Last 7-day hit counts
	    Map<String, Integer> last7DaysHits = dashboardService.getHitCountsForLast7Days();

	    // Add to model
	    modelAndView.addObject("hitLabels", new ArrayList<>(last7DaysHits.keySet()));
	    modelAndView.addObject("hitCounts", new ArrayList<>(last7DaysHits.values()));
	    modelAndView.addObject("jobApplications", jobApplications);
	    modelAndView.addObject("contactForms", contactForms);
	    modelAndView.addObject("last7DaysHits", last7DaysHits);
		modelAndView.addObject("stats", stats);
		modelAndView.addObject("activeTab", "dashboard");
		modelAndView.setViewName("karan/admin/dashboard");
		return modelAndView;
	}

	@GetMapping(value = "/admin/contact-applications")
	public ModelAndView goToContactApplications() {
		ModelAndView modelAndView = new ModelAndView();
		List<ContactForm> contactForms = contactFormService.getAllContactsSortedByRecent();
		modelAndView.addObject("contactForms", contactForms);
		modelAndView.addObject("activeTab", "contacts");
		modelAndView.setViewName("karan/admin/contactApplications");
		return modelAndView;
	}

	@GetMapping(value = "/admin/whitepapers")
	public ModelAndView showWhitepaperList() {
		ModelAndView modelAndView = new ModelAndView();
		List<Whitepaper> whitepapers = adminService.getAllWhitepapers();
		modelAndView.addObject("whitepapers", whitepapers);
		modelAndView.addObject("activeTab", "whitepapers");
		modelAndView.setViewName("karan/admin/whitepaperList");
		return modelAndView;
	}

	@PostMapping("/admin/whitepapers/add")
	public String saveWhitepaper(@RequestParam("title") String title, @RequestParam("description") String description,
			@RequestParam("publishedDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate publishedDate,
			@RequestParam("pdf") MultipartFile pdfFile, @RequestParam("image") MultipartFile imageFile,
			RedirectAttributes redirectAttributes) {
		try {
			adminService.saveWhitepaper(title, description, publishedDate, pdfFile, imageFile);
			redirectAttributes.addFlashAttribute("success", "Whitepaper added successfully!");
		} catch (Exception e) {
			e.printStackTrace();
			redirectAttributes.addFlashAttribute("error", "Something went wrong while saving the whitepaper.");
		}
		return "redirect:/admin/whitepapers";
	}

	@GetMapping("/admin/whitepapers/pdf/{id}")
	public ResponseEntity<Resource> viewPdf(@PathVariable Long id) throws IOException {
		return adminService.getWhitepaperPdf(id);
	}

	@GetMapping("/admin/whitepapers/image/{id}")
	public ResponseEntity<Resource> viewImage(@PathVariable Long id) throws IOException {
		return adminService.getWhitepaperImage(id);
	}

	@PostMapping("/admin/whitepapers/edit")
	public String editWhitepaper(@RequestParam("id") Long id, @RequestParam("title") String title,
			@RequestParam("description") String description,
			@RequestParam("publishedDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate publishedDate,
			@RequestParam(value = "pdf", required = false) MultipartFile pdfFile,
			@RequestParam(value = "image", required = false) MultipartFile imageFile,
			RedirectAttributes redirectAttributes) {
		try {
			adminService.updateWhitepaper(id, title, description, publishedDate, pdfFile, imageFile);
			redirectAttributes.addFlashAttribute("success", "Whitepaper updated successfully!");
		} catch (Exception e) {
			e.printStackTrace();
			redirectAttributes.addFlashAttribute("error", "Error updating whitepaper: " + e.getMessage());
		}
		return "redirect:/admin/whitepapers";
	}

	@PostMapping("/admin/whitepapers/toggle/{id}")
	public String toggleWhitepaperStatus(@PathVariable Long id, @RequestParam("status") String status,
			RedirectAttributes redirectAttributes) {
		try {
			adminService.updateWhitepaperStatus(id, status);
			redirectAttributes.addFlashAttribute("success", "Whitepaper status updated successfully.");
		} catch (Exception e) {
			redirectAttributes.addFlashAttribute("error", "Failed to update whitepaper status.");
		}
		return "redirect:/admin/whitepapers";
	}

	@GetMapping(value = "/admin/events")
	public ModelAndView showEventsList() {
		ModelAndView modelAndView = new ModelAndView();
		List<Event> events = adminService.getAllEvents();
		modelAndView.addObject("events", events);
		modelAndView.addObject("activeTab", "events");
		modelAndView.setViewName("karan/admin/eventList");
		return modelAndView;
	}

	@PostMapping("/admin/events/add")
	public String addEvent(@ModelAttribute Event event, RedirectAttributes redirectAttributes) {
		try {
			event.setCreatedAt(LocalDateTime.now());
			event.setUpdatedAt(LocalDateTime.now());
			event.setDisableStatus("N");
			event.setDeleteStatus("N");

			adminService.saveEvent(event);

			redirectAttributes.addFlashAttribute("success", "Event added successfully!");
		} catch (Exception e) {
			e.printStackTrace();
			redirectAttributes.addFlashAttribute("error", "Failed to add event.");
		}

		return "redirect:/admin/events";
	}

	@PostMapping("/admin/events/edit/{id}")
	public String editEvent(@PathVariable Long id, @ModelAttribute Event event, RedirectAttributes redirectAttributes) {
		try {
			Event existing = adminService.getEventById(id);
			if (existing != null) {
				// Update fields manually to avoid overwriting metadata
				existing.setTitle(event.getTitle());
				existing.setBrief(event.getBrief());
				existing.setEventDate(event.getEventDate());
				existing.setLocation(event.getLocation());
				existing.setIconPathName(event.getIconPathName());
				existing.setType(event.getType());
				existing.setSupportContact(event.getSupportContact());
				existing.setMethodologies(event.getMethodologies());
				existing.setDescription(event.getDescription());
				existing.setRegistrationUrl(event.getRegistrationUrl());
				existing.setUpdatedAt(LocalDateTime.now());

				adminService.saveEvent(existing);
				redirectAttributes.addFlashAttribute("success", "Event updated successfully!");
			} else {
				redirectAttributes.addFlashAttribute("error", "Event not found.");
			}
		} catch (Exception e) {
			e.printStackTrace();
			redirectAttributes.addFlashAttribute("error", "Failed to update event.");
		}
		return "redirect:/admin/events";
	}

	@PostMapping("/admin/events/toggle/{id}")
	public String toggleEventStatus(@PathVariable Long id, @RequestParam String status,
			RedirectAttributes redirectAttributes) {
		try {
			adminService.updateEventDisableStatus(id, status);
			redirectAttributes.addFlashAttribute("success", "Event status updated!");
		} catch (Exception e) {
			redirectAttributes.addFlashAttribute("error", "Failed to update event.");
		}
		return "redirect:/admin/events";
	}

	@GetMapping(value = "/admin/gallery")
	public ModelAndView gotoGallery() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("galleryGroups", adminService.getAllGalleryGroups());
		modelAndView.addObject("activeTab", "gallery");
		modelAndView.setViewName("karan/admin/galleryList");
		return modelAndView;
	}

	@PostMapping("/admin/gallery/add")
	public String addGalleryGroup(@ModelAttribute GalleryGroup galleryGroup, RedirectAttributes redirectAttributes) {
		MultipartFile coverImage = galleryGroup.getCoverImageFile(); // get it from transient field
		adminService.saveGalleryGroup(galleryGroup, coverImage);

		redirectAttributes.addFlashAttribute("success", "Gallery group added.");
		return "redirect:/admin/gallery";
	}

	@PostMapping("/admin/gallery/edit/{id}")
	public String updateGalleryGroup(@PathVariable Long id, @ModelAttribute GalleryGroup galleryGroup,
			@RequestParam(name = "coverImageFile", required = false) MultipartFile coverImage,
			RedirectAttributes redirectAttributes) {

		try {
			GalleryGroup updated = adminService.updateGalleryGroup(id, galleryGroup, coverImage);

			if (updated != null) {
				redirectAttributes.addFlashAttribute("success", "Gallery group updated successfully.");
			} else {
				redirectAttributes.addFlashAttribute("error", "Gallery group not found or could not be updated.");
			}

		} catch (Exception e) {
			e.printStackTrace(); // Log this properly in production
			redirectAttributes.addFlashAttribute("error", "An error occurred while updating the gallery group.");
		}
		return "redirect:/admin/gallery";
	}

	@GetMapping("/admin/gallery/{id}/media")
	@ResponseBody
	public ResponseEntity<List<GalleryMedia>> getMediaForGroup(@PathVariable Long id) {
		List<GalleryMedia> mediaList = adminService.getGalleryMediaByGroupId(id);
		return ResponseEntity.ok(mediaList);
	}

	@PostMapping("/admin/gallery/media/upload")
	@ResponseBody
	public ResponseEntity<Map<String, String>> uploadGalleryMedia(@RequestParam("groupId") Long groupId,
			@RequestParam("mediaFiles") List<MultipartFile> mediaFiles) {

		Map<String, String> response = new HashMap<>();

		if (mediaFiles == null || mediaFiles.isEmpty()) {
			response.put("status", "error");
			response.put("message", "No media files received.");
			return ResponseEntity.badRequest().body(response);
		}

		try {
			adminService.saveGalleryMediaFiles(groupId, mediaFiles);
			response.put("status", "success");
			response.put("message", "Media uploaded successfully.");
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			e.printStackTrace();
			response.put("status", "error");
			response.put("message", "Error occurred during upload.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@PostMapping("/admin/gallery/media/delete/{id}")
	@ResponseBody
	public ResponseEntity<Map<String, String>> deleteMedia(@PathVariable Long id) {
		boolean success = adminService.deleteGalleryMediaById(id); // Your logic
		Map<String, String> response = new HashMap<>();
		if (success) {
			response.put("status", "success");
			response.put("message", "Media removed successfully.");
			return ResponseEntity.ok(response);
		} else {
			response.put("status", "error");
			response.put("message", "Could not delete media.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@PostMapping("/admin/gallery/toggle/{id}")
	public String toggleGalleryGroupStatus(@PathVariable Long id, @RequestParam String status,
			RedirectAttributes redirectAttributes) {
		boolean updated = adminService.toggleStatusById(id, status);
		if (updated) {
			redirectAttributes.addFlashAttribute("message", "Gallery status updated successfully.");
		} else {
			redirectAttributes.addFlashAttribute("message", "Failed to update gallery status.");
		}
		return "redirect:/admin/gallery";
	}

	@GetMapping(value = "/admin/job-posting")
	public ModelAndView goToJobPostings() {
		ModelAndView modelAndView = new ModelAndView();
		List<Careers> jobs = adminService.getAllJobPostings();
		modelAndView.addObject("jobs", jobs);
		modelAndView.addObject("activeTab", "jobs");
		modelAndView.setViewName("karan/admin/jobPosting");
		return modelAndView;
	}

	@PostMapping("/admin/job-posting/add")
	public String saveCareer(@ModelAttribute Careers career) {
		career.setPostingDate(LocalDate.now());
		career.setCreatedAt(LocalDate.now());
		career.setUpdatedAt(LocalDate.now());
		adminService.addJobPost(career);
		return "redirect:/admin/job-posting"; // or your listing page
	}

	@PostMapping("/admin/job-posting/edit/{id}")
	public String updateCareer(@PathVariable Long id, @ModelAttribute Careers updatedCareer) {
		adminService.updateCareerById(id, updatedCareer);
		return "redirect:/admin/job-posting";
	}

	@PostMapping("/admin/job-posting/toggle/{id}")
	public String toggleJobStatus(@PathVariable Long id, @RequestParam("status") String status) {
		adminService.toggleCareerStatus(id, status);
		return "redirect:/admin/job-posting";
	}

	@GetMapping(value = "/admin/blogs")
	public ModelAndView showBlogsList() {
		ModelAndView modelAndView = new ModelAndView();
		List<BlogCategory> blogCategories = setupService.getAllBlogCategories();
		List<BlogPost> blogs = adminService.getAllBlogs();
		modelAndView.addObject("blogs", blogs);
		modelAndView.addObject("blogCategories", blogCategories);
		modelAndView.addObject("activeTab", "blogs");
		modelAndView.setViewName("karan/admin/blog-posts");
		return modelAndView;
	}

	@PostMapping("/admin/blogs/add")
	public String saveBlogPost(@ModelAttribute BlogPostFormVO form, RedirectAttributes redirectAttributes) {
		try {
			adminService.saveBlogPost(form);
			redirectAttributes.addFlashAttribute("success", "Blog post saved successfully!");
		} catch (Exception e) {
			e.printStackTrace();
			redirectAttributes.addFlashAttribute("error", "Failed to save blog post.");
		}
		return "redirect:/admin/blogs";
	}

	@PostMapping("/admin/blogs/edit")
	public String editBlogPost(@ModelAttribute BlogPostFormVO form,
	                           @RequestParam(value = "coverImage", required = false) MultipartFile coverImage,
	                           @RequestParam(value = "thumbnailImage", required = false) MultipartFile thumbnailImage) {
	    form.setCoverImage(coverImage);
	    form.setThumbnailImage(thumbnailImage);
	    adminService.updateBlogPost(form);
	    return "redirect:/admin/blogs";
	}
	
	@PostMapping("/admin/blogs/toggle/{id}")
	public String toggleBlogPublishStatus(@PathVariable("id") Long blogId, @RequestParam("status") String status,
			RedirectAttributes redirectAttributes) {
		try {
			adminService.toggleBlogStatus(blogId, status);
			redirectAttributes.addFlashAttribute("success",
					"Blog " + ("Y".equals(status) ? "published" : "unpublished") + " successfully.");
		} catch (Exception e) {
			redirectAttributes.addFlashAttribute("error", "Error updating blog status.");
		}

		return "redirect:/admin/blogs";
	}

	@GetMapping(value = "/admin/case-studies")
	public ModelAndView showCaseStudyList() {
		ModelAndView modelAndView = new ModelAndView();
		List<BlogCategory> blogCategories = setupService.getAllBlogCategories();
		List<CaseStudy> casestudies = adminService.getAllCaseStudies();
		modelAndView.addObject("casestudies", casestudies);
		modelAndView.addObject("blogCategories", blogCategories);
		modelAndView.addObject("activeTab", "casestudies");
		modelAndView.setViewName("karan/admin/case-studies");
		return modelAndView;
	}

	@PostMapping("/admin/case-studies/add")
	public String addCaseStudy(@ModelAttribute CaseStudyVO vo, RedirectAttributes redirectAttributes) {
		try {
			adminService.addCaseStudy(vo);
			redirectAttributes.addFlashAttribute("message", "Case study added successfully.");
		} catch (Exception e) {
			e.printStackTrace();
			redirectAttributes.addFlashAttribute("message", "Failed to add case study.");
		}
		return "redirect:/admin/case-studies";
	}

	@PostMapping("/admin/case-studies/edit")
	public String editCaseStudy(@ModelAttribute CaseStudyVO form) {
		try {
			adminService.updateCaseStudy(form);
		} catch (IOException e) {
			e.printStackTrace(); // optionally add logging
		}
		return "redirect:/admin/case-studies";
	}

	@GetMapping("/admin/case-studies/{id}")
	@ResponseBody
	public ResponseEntity<CaseStudyVO> getCaseStudy(@PathVariable Long id) {
		try {
			CaseStudyVO dto = adminService.getCaseStudyById(id);
			return ResponseEntity.ok(dto);
		} catch (EntityNotFoundException e) {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/admin/case-studies/publish/{id}")
	@ResponseBody
	public String togglePublish(@PathVariable Long id) {
		boolean updated = adminService.toggleCaseStudyPublishStatus(id);
		return updated ? "success" : "fail";
	}

	@PostMapping("/admin/case-studies/feature/{id}")
	@ResponseBody
	public String toggleFeature(@PathVariable Long id) {
		boolean updated = adminService.toggleCaseStudyFeatureStatus(id);
		return updated ? "success" : "fail";
	}

	
//	@GetMapping(value = "/admin/job-applications")
//	public ModelAndView goToJobApplications(@RequestParam(value = "careerId", required = false) Long careerId, Model model) {
//		ModelAndView modelAndView = new ModelAndView();
//		List<CareerApplication> careerApplications = adminService.getAllJobApplications();
//		List<Careers> careers = adminService.findAllCareers();
//		modelAndView.addObject("careerApplications", careerApplications);
//		modelAndView.addObject("careers", careers);
//		modelAndView.addObject("careerFilter", careerId);
//		//modelAndView.addObject("startDate", startDate);
//		//modelAndView.addObject("careers", careers);
//		modelAndView.addObject("activeTab", "jobApplications");
//		modelAndView.setViewName("karan/admin/jobApplications");
//		return modelAndView;
//	}
	
	@GetMapping(value = "/admin/job-applications")
	public ModelAndView goToJobApplications(
	    @RequestParam(value = "careerId", required = false) Long careerId,
	    @RequestParam(value = "startDate", required = false)
	    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
	    @RequestParam(value = "endDate", required = false)
	    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
	    Model model) {

	    ModelAndView modelAndView = new ModelAndView();

	    List<CareerApplication> careerApplications = adminService.getFilteredJobApplications(careerId, startDate, endDate);
	    List<Careers> careers = adminService.findAllCareers();

	    modelAndView.addObject("careerApplications", careerApplications);
	    modelAndView.addObject("careers", careers);
	    modelAndView.addObject("careerFilter", careerId);
	    modelAndView.addObject("startDate", startDate);
	    modelAndView.addObject("endDate", endDate);
	    modelAndView.addObject("activeTab", "jobApplications");
	    modelAndView.setViewName("karan/admin/jobApplications");
	    return modelAndView;
	}
	
	@GetMapping("/admin/applications/resume/{id}")
	public ResponseEntity<Resource> viewResume(@PathVariable Long id) throws IOException {
	    return adminService.getResumeResponse(id);
	}


}
