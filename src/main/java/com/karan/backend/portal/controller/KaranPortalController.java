package com.karan.backend.portal.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.karan.backend.conflogin.service.MailService;
import com.karan.backend.portal.entities.BlogCategory;
import com.karan.backend.portal.entities.BlogPost;
import com.karan.backend.portal.entities.Careers;
import com.karan.backend.portal.entities.CaseStudy;
import com.karan.backend.portal.entities.ContactForm;
import com.karan.backend.portal.entities.GalleryGroup;
import com.karan.backend.portal.entities.Whitepaper;
import com.karan.backend.portal.service.AdminService;
import com.karan.backend.portal.service.ContactFormService;
import com.karan.backend.portal.service.SetupService;
import com.karan.backend.portal.vo.CareerApplicationFormVO;

@Controller
public class KaranPortalController {

	@Autowired
	private ContactFormService contactFormService;

	@Autowired
	private MailService mailService;

	@Autowired
	private AdminService adminService;
	
	@Autowired
	private SetupService setupService;

	@GetMapping(value = "/")
	public ModelAndView goToAuctionNotificationDetails(@RequestParam(defaultValue = "0") int page, Model model) {
		ModelAndView modelAndView = new ModelAndView();
		List<BlogPost> blogPage = adminService.getLatestPublishedPosts();
		modelAndView.addObject("blogs",blogPage);
		
		
		int totalItemsToFetch = 8;
		PageRequest request = PageRequest.of(0, totalItemsToFetch);
		Page<CaseStudy> caseStudyCards = adminService.getPublishedCaseStudiesLatest(request);
		modelAndView.addObject("caseStudyCards", caseStudyCards);
		
		List<BlogCategory> blogCategories = setupService.getAllBlogCategories();
		List<BlogPost> allBlogs = new ArrayList<>();
		for (int i = 0; i <= page; i++) {
			Page<BlogPost> blogPage1 = adminService.getAllPublishedBlogs(PageRequest.of(i, 6));
			allBlogs.addAll(blogPage1.getContent());
			// Set hasNext only for the last page fetched
			if (i == page) {
				modelAndView.addObject("hasNext", blogPage1.hasNext());
			}
		}
		
		List<Whitepaper> whitepapers = adminService.getEnabledWhitepapersForPublic();
		modelAndView.addObject("whitepapers", whitepapers);
		
		modelAndView.addObject("marketingBlogs", adminService.getPublishedBlogsByCategory("Marketing"));
		modelAndView.addObject("technologyBlogs", adminService.getPublishedBlogsByCategory("Technology"));
		modelAndView.addObject("currentPage", page);
		modelAndView.addObject("allBlogs", allBlogs);
		modelAndView.addObject("blogCategories", blogCategories);
		
		modelAndView.setViewName("/karan/karanportal");
		return modelAndView;
	}

	@GetMapping(value = "/under-construction")
	public ModelAndView underconstruction() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/karan/underConstruction");
		return modelAndView;
	}

	@GetMapping("/about-us")
	public ModelAndView aboutUs() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("team", setupService.getTeamMembersByLevelForPublic(1));
		modelAndView.addObject("ceo", setupService.getTeamMembersByLevelForPublic(0));
		modelAndView.setViewName("/karan/about-us");
		return modelAndView;
	}

	@GetMapping("/research-publications")
	public ModelAndView blogs(@RequestParam(defaultValue = "0") int page, Model model) {
		ModelAndView modelAndView = new ModelAndView();
		// Page<BlogPost> blogPage = adminService.getAllPublishedBlogs(PageRequest.of(page, 6));
		
		List<BlogCategory> blogCategories = setupService.getAllBlogCategories();
		List<BlogPost> allBlogs = new ArrayList<>();
		for (int i = 0; i <= page; i++) {
			Page<BlogPost> blogPage = adminService.getAllPublishedBlogs(PageRequest.of(i, 8));
			allBlogs.addAll(blogPage.getContent());
			// Set hasNext only for the last page fetched
			if (i == page) {
				modelAndView.addObject("hasNext", blogPage.hasNext());
			}
		}
		modelAndView.addObject("marketingBlogs", adminService.getPublishedBlogsByCategory("Marketing"));
		modelAndView.addObject("technologyBlogs", adminService.getPublishedBlogsByCategory("Technology"));
		modelAndView.addObject("currentPage", page);
		modelAndView.addObject("allBlogs", allBlogs);
		modelAndView.addObject("blogCategories", blogCategories);
		//modelAndView.addObject("hasNext", blogPage.hasNext());

		modelAndView.setViewName("/karan/blogs");
		return modelAndView;
	}

	@GetMapping("/research-publications/{slug}")
	public String viewBlogBySlug(@PathVariable String slug, Model model, RedirectAttributes redirectAttributes) {
		BlogPost blog = adminService.findPublishedBlogBySlug(slug);
		List<BlogPost> recentThree = adminService.getRecentThreeBlogs();
		List<CaseStudy> featuredCaseStudies = adminService.getFeaturedCaseStudies();
		if (blog == null) {
			redirectAttributes.addFlashAttribute("error", "Blog not found or not published.");
			return "redirect:/research-publications"; // Or to a 404 page
		}
		Collections.shuffle(featuredCaseStudies); // randomize
		List<CaseStudy> topThree = featuredCaseStudies.stream().limit(3) // pick top 3 after shuffle
				.collect(Collectors.toList());
		model.addAttribute("featuredCaseStudies", topThree);
		model.addAttribute("blog", blog);
		model.addAttribute("recentBlogs", recentThree);
		return "/karan/blog-details";
	}

	@GetMapping("/blog-details")
	public ModelAndView blogDetails() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/karan/blog-details");
		return modelAndView;
	}

	@GetMapping("/careers")
	public ModelAndView careers() {
		ModelAndView modelAndView = new ModelAndView();
		List<Careers> jobs = adminService.getActiveCareers();
		modelAndView.addObject("jobs", jobs);
		modelAndView.setViewName("/karan/careers");
		return modelAndView;
	}

	@GetMapping("/careers/apply/{id}")
	public ModelAndView showJobApplication(@PathVariable Long id, Model model) {
		ModelAndView modelAndView = new ModelAndView();

		try {
			Careers job = adminService.getJobDetailsById(id);
			modelAndView.addObject("job", job);

			CareerApplicationFormVO applicationForm;
			if (model.containsAttribute("applicationForm")) {
				applicationForm = (CareerApplicationFormVO) model.getAttribute("applicationForm");
			} else {
				applicationForm = new CareerApplicationFormVO();
				applicationForm.setCareerId(job.getId());
			}

			modelAndView.addObject("applicationForm", applicationForm);
			modelAndView.setViewName("/karan/apply-position");
		} catch (EntityNotFoundException e) {
			modelAndView.setViewName("error/404");
			modelAndView.addObject("message", "Job not found.");
		} catch (Exception e) {
			e.printStackTrace();
			modelAndView.setViewName("error/500");
			modelAndView.addObject("message", "Something went wrong.");
		}

		return modelAndView;
	}

	@PostMapping("/careers/apply/{id}")
	public String handleApplicationSubmit(@PathVariable Long id,
			@Valid @ModelAttribute("applicationForm") CareerApplicationFormVO form, BindingResult bindingResult,
			Model model, RedirectAttributes redirectAttributes) {

		if (bindingResult.hasErrors()) {
			Careers job = adminService.getJobDetailsById(id);
			model.addAttribute("job", job);
			return "karan/apply-position"; // Forward to form with errors
		}

		try {
			adminService.submitApplication(form);
			redirectAttributes.addFlashAttribute("message", "Application submitted successfully!");
		} catch (Exception e) {
			redirectAttributes.addFlashAttribute("message", "Failed to submit application.");
		}

		return "redirect:/careers/apply/" + id + "#applyForm";
	}

	@GetMapping("/case-studies")
	public ModelAndView caseStudies(@RequestParam(defaultValue = "0") int page, Model model) {
		ModelAndView modelAndView = new ModelAndView();
		List<CaseStudy> featuredCaseStudies = adminService.getFeaturedCaseStudies();
		int totalItemsToFetch = (page + 1) * 8;
		PageRequest request = PageRequest.of(0, totalItemsToFetch);
		Page<CaseStudy> caseStudyCards = adminService.getPublishedCaseStudiesLatest(request);
		modelAndView.addObject("caseStudyCards", caseStudyCards);
		modelAndView.addObject("hasMore", caseStudyCards.hasNext());
		modelAndView.addObject("featuredCaseStudies", featuredCaseStudies);
		modelAndView.setViewName("/karan/case-studies");
		return modelAndView;
	}

	@GetMapping("/case-studies/{slug}")
	public String viewCaseStudy(@PathVariable String slug, Model model) {
		CaseStudy caseStudy = adminService.findCaseStudyBySlug(slug);
		List<CaseStudy> relatedCaseStudies = adminService.findFourRelatedCaseStudies(caseStudy.getId(),
				caseStudy.getAuthor());
		List<CaseStudy> featuredCaseStudies = adminService.getFeaturedCaseStudies();
		model.addAttribute("relatedCaseStudies", relatedCaseStudies);
		model.addAttribute("featuredCaseStudies", featuredCaseStudies);
		model.addAttribute("caseStudy", caseStudy);
		return "/karan/case-study-details";
	}

	@GetMapping("/case-study-details")
	public ModelAndView caseStudyDetails() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/karan/case-study-details");
		return modelAndView;
	}

	@GetMapping("/events")
	public ModelAndView events() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("events", adminService.getAllEventsForPublic());
		modelAndView.setViewName("/karan/events");
		return modelAndView;
	}

	@GetMapping("/gallery")
	public ModelAndView gallery(@RequestParam(defaultValue = "0") int page) {
		ModelAndView modelAndView = new ModelAndView();
		List<GalleryGroup> galleryGroups = adminService.findGalleryGroupsForPublic();
		modelAndView.addObject("galleryGroups", galleryGroups);
//		modelAndView.addObject("currentPage", page);
		modelAndView.setViewName("/karan/gallery");
		return modelAndView;
	}

	@GetMapping("/gallery/group/{groupId}/media")
	@ResponseBody
	public List<Map<String, String>> getMediaByGroup(@PathVariable Long groupId) {
		return adminService.getGalleryMediaByGroupIdForPublic(groupId);
	}

	@GetMapping("/services")
	public ModelAndView services() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/karan/services");
		return modelAndView;
	}

	@GetMapping("/service-details")
	public ModelAndView serviceDetails(@RequestParam(defaultValue = "0") int page, Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("team", setupService.getTeamMembersByLevelForPublic(1));
		List<BlogCategory> blogCategories = setupService.getAllBlogCategories();
		List<BlogPost> allBlogs = new ArrayList<>();
		for (int i = 0; i <= page; i++) {
			Page<BlogPost> blogPage1 = adminService.getAllPublishedBlogs(PageRequest.of(i, 6));
			allBlogs.addAll(blogPage1.getContent());
			// Set hasNext only for the last page fetched
			if (i == page) {
				modelAndView.addObject("hasNext", blogPage1.hasNext());
			}
		}
		modelAndView.addObject("currentPage", page);
		modelAndView.addObject("allBlogs", allBlogs);
		modelAndView.addObject("blogCategories", blogCategories);
		modelAndView.setViewName("/karan/service-details");
		return modelAndView;
	}

	@GetMapping("/whitepapers")
	public ModelAndView whitepapers() {
		ModelAndView modelAndView = new ModelAndView();
		List<Whitepaper> whitepapers = adminService.getEnabledWhitepapersForPublic();
		modelAndView.addObject("whitepapers", whitepapers);
		modelAndView.setViewName("/karan/whitepapers");
		return modelAndView;
	}

	@GetMapping("/whitepapers/pdf/{id:[0-9]+}")
	public ResponseEntity<Resource> viewPdf(@PathVariable Long id) throws IOException {
		return adminService.getWhitepaperPdf(id);
	}

	@GetMapping("/whitepapers/image/{id}")
	public ResponseEntity<Resource> viewImage(@PathVariable Long id) throws IOException {
		return adminService.getWhitepaperImage(id);
	}
	
	@GetMapping("/whitepapers/pdf/{slug}")
	public ResponseEntity<Resource> viewPdf(@PathVariable String slug) throws IOException {
	    return adminService.getWhitepaperPdfBySlug(slug);
	}


	/*
	 * @GetMapping("/apply-position") public ModelAndView applyPosition() {
	 * ModelAndView modelAndView = new ModelAndView();
	 * modelAndView.setViewName("/karan/apply-position"); return modelAndView; }
	 */

	@GetMapping("/contact-us")
	public ModelAndView contactUs() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("contactForm", new ContactForm());
		modelAndView.setViewName("/karan/contact-us");
		return modelAndView;
	}
	
	@PostMapping("/contact-us")
	@ResponseBody
	public ResponseEntity<String> submitContactForm(@ModelAttribute ContactForm contactForm) {
		System.out.println("Received contact: " + contactForm.getName());
		CompletableFuture.runAsync(() -> sendEmails(contactForm));
		ContactForm savedForm = contactFormService.saveContact(contactForm);
		return ResponseEntity.ok("Thank you, " + contactForm.getName()
				+ "! We appreciate your interest in our consulting services. Our team will connect with you soon.");
	}

	private void sendEmails(ContactForm contact) {
		// HR/Admin notification
		String toAdmin = "karunakaran1.dn@gmail.com";
		String cc = "karunakaran1.dn@gmail.com";
//        String toAdmin = "karunakaran1.dn@gmail.com";
//        String cc = "karunakaran1.dn@gmail.com";

		StringBuilder adminBody = new StringBuilder();
		adminBody.append("<b>New Enquiry Received from karan Website</b><br><br>");
		adminBody.append("<b>Name:</b> ").append(contact.getName()).append("<br>");
		adminBody.append("<b>Email:</b> ").append(contact.getEmail()).append("<br>");
//        adminBody.append("<b>Phone:</b> ").append(contact.get()).append("<br>");
//        adminBody.append("<b>Subject:</b> ").append(contact.getSubject()).append("<br>");
		adminBody.append("<b>Message:</b> <br>").append(contact.getMessage()).append("<br>");

		mailService.sendMail(toAdmin, cc, "New Contact Form Submission - karan", adminBody.toString());

		// Acknowledgement to user
		StringBuilder userBody = new StringBuilder();
		userBody.append("Dear ").append(contact.getName()).append(",<br><br>");
		userBody.append("Thank you for reaching out to <b>karan</b>.<br>");
		userBody.append("We have received your enquiry and our team will respond shortly.<br><br>");
		userBody.append("Best Regards,<br>");
		userBody.append("Team karan<br><br>");
		userBody.append("<small><i>[This is an automated email. Please do not reply.]</i></small>");

		mailService.sendMail(contact.getEmail(), null, "Thank you for contacting karan", userBody.toString());
	}

}
