package com.karan.backend.portal.service.impl;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.karan.backend.portal.entities.BlogCategory;
import com.karan.backend.portal.entities.BlogPost;
import com.karan.backend.portal.entities.CareerApplication;
import com.karan.backend.portal.entities.Careers;
import com.karan.backend.portal.entities.CaseStudy;
import com.karan.backend.portal.entities.Event;
import com.karan.backend.portal.entities.GalleryGroup;
import com.karan.backend.portal.entities.GalleryMedia;
import com.karan.backend.portal.entities.Whitepaper;
import com.karan.backend.portal.repo.BlogCategoryRepository;
import com.karan.backend.portal.repo.BlogPostRepository;
import com.karan.backend.portal.repo.CareerApplicationRepository;
import com.karan.backend.portal.repo.CareerRepository;
import com.karan.backend.portal.repo.CaseStudyRepository;
import com.karan.backend.portal.repo.EventRepository;
import com.karan.backend.portal.repo.GalleryGroupRepository;
import com.karan.backend.portal.repo.GalleryMediaRepository;
import com.karan.backend.portal.repo.WhitepaperRepository;
import com.karan.backend.portal.service.AdminService;
import com.karan.backend.portal.vo.BlogPostFormVO;
import com.karan.backend.portal.vo.CareerApplicationFormVO;
import com.karan.backend.portal.vo.CaseStudyVO;

@Service
public class AdminServiceImpl implements AdminService {

	@Value("${application.uploadsdirectory}")
	private String uploadDirectory;

	@Autowired
	WhitepaperRepository whitepaperRepository;
	@Autowired
	private EventRepository eventRepository;
	@Autowired
	private GalleryGroupRepository galleryGroupRepository;
	@Autowired
	private GalleryMediaRepository galleryMediaRepository;
	@Autowired
	private CareerRepository careerRepository;
	@Autowired
	private CareerApplicationRepository careerApplicationRepository;
	@Autowired
	private BlogCategoryRepository blogCategoryRepository;
	@Autowired
	private BlogPostRepository blogPostRepository;
	@Autowired
	private CaseStudyRepository caseStudyRepository;

	@Override
	public List<Whitepaper> getAllWhitepapers() {
		return whitepaperRepository.findAll(Sort.by(Sort.Direction.DESC, "publishedDate"));
	}

	@Override
	public void saveWhitepaper(String title, String description, LocalDate publishedDate, MultipartFile pdfFile,
			MultipartFile imageFile) throws IOException {

		// Validate PDF
		validateFile(pdfFile, List.of("application/pdf"), 10, "PDF");

		// Validate Image (optional)
		if (imageFile != null && !imageFile.isEmpty()) {
			validateFile(imageFile, List.of("image/png", "image/jpeg", "image/jpg", "image/gif"), 5, "Image");
		}

		// Create paths
		String pdfDir = uploadDirectory + "/whitepapers/pdfs/";
		String imageDir = uploadDirectory + "/whitepapers/images/";

		Files.createDirectories(Paths.get(pdfDir));
		Files.createDirectories(Paths.get(imageDir));

		// Save PDF file
		String slug = generateSlug(title);
		String pdfFileName = slug + ".pdf";
		//String pdfFileName = System.currentTimeMillis() + "_" + pdfFile.getOriginalFilename().replaceAll("\\s+", "_");
		Path pdfPath = Paths.get(pdfDir + pdfFileName);
		Files.copy(pdfFile.getInputStream(), pdfPath, StandardCopyOption.REPLACE_EXISTING);

		// Save image file
		Path imagePath = null;
		String imageFileName = null;
		if (imageFile != null && !imageFile.isEmpty()) {
			imageFileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename().replaceAll("\\s+", "_");
			imagePath = Paths.get(imageDir + imageFileName);
			Files.copy(imageFile.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
		}

		// Save to DB
		Whitepaper whitepaper = new Whitepaper();
		whitepaper.setTitle(title);
		whitepaper.setSlug(slug);
		whitepaper.setDescription(description);
		whitepaper.setPublishedDate(publishedDate);
		whitepaper.setPdfPathName(pdfPath.toString());
		whitepaper.setImagePathName(imageFileName != null ? imagePath.toString() : null);
		whitepaper.setCreatedAt(LocalDateTime.now());
		whitepaper.setUpdatedAt(LocalDateTime.now());

		whitepaperRepository.save(whitepaper);
	}

	public ResponseEntity<Resource> getWhitepaperPdfBySlug(String slug) throws IOException {
	    Whitepaper wp = whitepaperRepository.findBySlug(slug)
	        .orElseThrow(() -> new FileNotFoundException("Whitepaper not found"));

	    Path pdfPath = Paths.get(wp.getPdfPathName());
	    if (!Files.exists(pdfPath)) {
	        throw new FileNotFoundException("PDF not found");
	    }

	    Resource resource = new UrlResource(pdfPath.toUri());
	    return ResponseEntity.ok()
	        .contentType(MediaType.APPLICATION_PDF)
	        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + pdfPath.getFileName().toString() + "\"")
	        .body(resource);
	}

	
	@Override
	public ResponseEntity<Resource> getWhitepaperPdf(Long id) throws IOException {
		Whitepaper whitepaper = whitepaperRepository.findById(id)
				.orElseThrow(() -> new FileNotFoundException("Whitepaper not found"));

		Path filePath = Paths.get(whitepaper.getPdfPathName());
		Resource resource = new UrlResource(filePath.toUri());

		if (!resource.exists() || !resource.isReadable()) {
			throw new FileNotFoundException("PDF file not found or not readable");
		}

		return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF)
				.header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filePath.getFileName() + "\"")
				.body(resource);
	}

	@Override
	public ResponseEntity<Resource> getWhitepaperImage(Long id) throws IOException {
		Whitepaper whitepaper = whitepaperRepository.findById(id)
				.orElseThrow(() -> new FileNotFoundException("Whitepaper not found"));

		if (whitepaper.getImagePathName() == null) {
			throw new FileNotFoundException("Image not attached");
		}

		Path filePath = Paths.get(whitepaper.getImagePathName());
		System.out.println("image path:" + filePath);
		Resource resource = new UrlResource(filePath.toUri());
		System.out.println("image resource path:" + resource);

		if (!resource.exists() || !resource.isReadable()) {
			throw new FileNotFoundException("Image file not found or not readable");
		}

		String contentType = Files.probeContentType(filePath);
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filePath.getFileName() + "\"")
				.body(resource);
	}

	@Override
	public void updateWhitepaper(Long id, String title, String description, LocalDate publishedDate,
			MultipartFile pdfFile, MultipartFile imageFile) throws IOException {

		Whitepaper whitepaper = whitepaperRepository.findById(id)
				.orElseThrow(() -> new FileNotFoundException("Whitepaper not found"));

		whitepaper.setTitle(title);
		whitepaper.setDescription(description);
		whitepaper.setPublishedDate(publishedDate);
		whitepaper.setUpdatedAt(LocalDateTime.now());
		// Base directories
		String pdfDir = uploadDirectory + "/pdfs/";
		String imageDir = uploadDirectory + "/images/";

		// Replace PDF if new file is uploaded
		if (pdfFile != null && !pdfFile.isEmpty()) {
			validateFile(pdfFile, List.of("application/pdf"), 10, "PDF");

			Files.createDirectories(Paths.get(pdfDir));
			String pdfFileName = System.currentTimeMillis() + "_"
					+ pdfFile.getOriginalFilename().replaceAll("\\s+", "_");
			Path pdfPath = Paths.get(pdfDir + pdfFileName);
			Files.copy(pdfFile.getInputStream(), pdfPath, StandardCopyOption.REPLACE_EXISTING);
			whitepaper.setPdfPathName("/uploads/whitepapers/pdfs/" + pdfFileName);
		}

		// Replace Image if new file is uploaded
		if (imageFile != null && !imageFile.isEmpty()) {
			validateFile(imageFile, List.of("image/png", "image/jpeg", "image/jpg", "image/gif"), 5, "Image");

			Files.createDirectories(Paths.get(imageDir));
			String imageFileName = System.currentTimeMillis() + "_"
					+ imageFile.getOriginalFilename().replaceAll("\\s+", "_");
			Path imagePath = Paths.get(imageDir + imageFileName);
			Files.copy(imageFile.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
			whitepaper.setImagePathName("/uploads/whitepapers/images/" + imageFileName);
		}

		whitepaperRepository.save(whitepaper);
	}

	@Override
	public void updateWhitepaperStatus(Long id, String status) {
		Whitepaper whitepaper = whitepaperRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Whitepaper not found"));
		whitepaper.setDisableStatus(status); // "Y" or "N"
		whitepaper.setUpdatedAt(LocalDateTime.now());
		whitepaperRepository.save(whitepaper);
	}

	@Override
	public List<Whitepaper> getEnabledWhitepapersForPublic() {
		return whitepaperRepository.findByDisableStatusOrderByPublishedDateDesc("N");
	}

	private void validateFile(MultipartFile file, List<String> allowedTypes, long maxSizeMB, String fieldName) {
		if (file.isEmpty()) {
			throw new IllegalArgumentException(fieldName + " file is required.");
		}

		if (!allowedTypes.contains(file.getContentType())) {
			throw new IllegalArgumentException(fieldName + " file must be of type: " + String.join(", ", allowedTypes));
		}

		long maxSizeBytes = maxSizeMB * 1024 * 1024;
		if (file.getSize() > maxSizeBytes) {
			throw new IllegalArgumentException(fieldName + " file exceeds max size of " + maxSizeMB + "MB.");
		}
	}

	@Override
	public List<Event> getAllEvents() {
		return eventRepository.findAllByOrderByEventDateDesc();
	}

	@Override
	public List<Event> getAllEventsForPublic() {
		return eventRepository.findByDisableStatusAndDeleteStatusOrderByEventDateDesc("N", "N");
	}

	@Override
	public void saveEvent(Event event) {
		eventRepository.save(event);
	}

	public void updateEventDisableStatus(Long id, String status) {
		Event event = eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
		event.setDisableStatus(status);
		event.setUpdatedAt(LocalDateTime.now());
		eventRepository.save(event);
	}

	public Event getEventById(Long id) {
		return eventRepository.findById(id).orElse(null);
	}

	public List<GalleryGroup> getAllGalleryGroups() {
//		return galleryGroupRepository.findAll();
		 return galleryGroupRepository.findAllActiveGalleryGroups();
	}

	public void saveGalleryGroup(GalleryGroup galleryGroup, MultipartFile coverImage) {
		if (coverImage != null && !coverImage.isEmpty()) {

			String uploadDir = uploadDirectory + "/gallery/cover/";
			String fileName = UUID.randomUUID() + "_" + coverImage.getOriginalFilename();
			Path filePath = Paths.get(uploadDir, fileName);

			try {
				Files.createDirectories(filePath.getParent());
			} catch (IOException e) {
				e.printStackTrace();
			}

			try {
				coverImage.transferTo(filePath.toFile());
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
			}

			galleryGroup.setCoverImagePath("/uploads/gallery/cover/" + fileName);
		}

		if (galleryGroup.getId() == null) {
			galleryGroup.setCreatedAt(LocalDateTime.now());
		}
		galleryGroup.setUpdatedAt(LocalDateTime.now());

		galleryGroupRepository.save(galleryGroup);
	}

	public GalleryGroup updateGalleryGroup(Long id, GalleryGroup updatedGroup, MultipartFile coverImage) {
		Optional<GalleryGroup> optional = galleryGroupRepository.findById(id);

		if (optional.isPresent()) {
			GalleryGroup existing = optional.get();

			existing.setTitle(updatedGroup.getTitle());
			existing.setType(updatedGroup.getType());
			existing.setEventDate(updatedGroup.getEventDate());
			existing.setLocation(updatedGroup.getLocation());
			existing.setDescription(updatedGroup.getDescription());
			existing.setUpdatedAt(LocalDateTime.now());

			if (coverImage != null && !coverImage.isEmpty()) {
				try {
					String uploadDir = uploadDirectory + "/gallery/cover/";
					String fileName = UUID.randomUUID() + "_" + coverImage.getOriginalFilename();
					Path filePath = Paths.get(uploadDir, fileName);

					Files.createDirectories(filePath.getParent());
					coverImage.transferTo(filePath.toFile());

					existing.setCoverImagePath("/uploads/gallery/cover/" + fileName);
				} catch (IOException e) {
					e.printStackTrace(); // log properly in production
				}
			}

			return galleryGroupRepository.save(existing);
		}

		return null;
	}

	@Override
	@Transactional
	public boolean toggleStatusById(Long id, String status) {
		try {
			Optional<GalleryGroup> optional = galleryGroupRepository.findById(id);
			if (optional.isPresent()) {
				GalleryGroup group = optional.get();
				group.setDeactiveStatus(status); // e.g., "Y" or "N"
				galleryGroupRepository.save(group);
				return true;
			}
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public Optional<GalleryGroup> getGalleryGroupById(Long id) {
		return galleryGroupRepository.findById(id);
	}

	@Override
	public void saveGalleryMediaFiles(Long groupId, List<MultipartFile> mediaFiles) {
		String uploadDir = uploadDirectory + "/gallery/media/";

		for (MultipartFile file : mediaFiles) {
			if (file.isEmpty())
				continue;

			try {
				// Generate unique filename
				String originalName = file.getOriginalFilename();
				String extension = originalName != null && originalName.contains(".")
						? originalName.substring(originalName.lastIndexOf("."))
						: "";
				String fileName = UUID.randomUUID() + extension;

				// Create directory
				Path fullPath = Paths.get(uploadDir, fileName);
				Files.createDirectories(fullPath.getParent());

				// Save file to disk
				file.transferTo(fullPath.toFile());

				// Determine type (image/video)
				String contentType = file.getContentType();
				String type = contentType != null && contentType.startsWith("video") ? "V" : "I";

				// Save metadata to DB
				GalleryMedia media = new GalleryMedia();
				media.setGalleryGroupId(groupId);
				media.setFilePath("/uploads/gallery/media/" + fileName);
				media.setFileType(type);
				media.setFileSizeKb((int) file.getSize() / 1024);
				media.setCreatedAt(LocalDateTime.now());
				galleryMediaRepository.save(media);

			} catch (IOException e) {
				e.printStackTrace(); // Optionally log
			}
		}
	}

	public List<GalleryMedia> getGalleryMediaByGroupId(Long groupId) {
		return galleryMediaRepository.findByGalleryGroupIdAndDeleteStatus(groupId, "N");
	}

	@Override
	@Transactional
	public boolean deleteGalleryMediaById(Long id) {
		try {
			Optional<GalleryMedia> mediaOptional = galleryMediaRepository.findById(id);
			if (mediaOptional.isPresent()) {
				GalleryMedia media = mediaOptional.get();
				media.setDeleteStatus("Y");
				galleryMediaRepository.save(media);
				return true;
			}
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<Map<String, String>> getGalleryMediaByGroupIdForPublic(Long groupId) {
		List<GalleryMedia> mediaList = galleryMediaRepository.findByGalleryGroupIdAndHiddenFalseAndDeleteStatus(groupId,
				"N");

		return mediaList.stream().map(media -> {
			Map<String, String> mediaMap = new HashMap<>();
			mediaMap.put("url", media.getFilePath());
			mediaMap.put("type", media.getFileType().equalsIgnoreCase("v") ? "video" : "image");

			if (media.getFileType().equalsIgnoreCase("v")) {
				mediaMap.put("thumbnailUrl", "/website/img/events/video.png");
			} else {
				mediaMap.put("thumbnailUrl", media.getFilePath());
			}

			return mediaMap;
		}).collect(Collectors.toList());
	}

	@Override
	public void addJobPost(Careers career) {
		careerRepository.save(career);

	}

	@Override
	public List<Careers> getAllJobPostings() {
		return careerRepository.findAll();
	}

	@Override
	@Transactional
	public void updateCareerById(Long id, Careers updatedCareer) {
		Careers existing = careerRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Career not found with ID: " + id));

		existing.setTitle(updatedCareer.getTitle());
		existing.setDepartment(updatedCareer.getDepartment());
		existing.setJobType(updatedCareer.getJobType());
		existing.setExperience(updatedCareer.getExperience());
		existing.setLocation(updatedCareer.getLocation());
		existing.setGenderPreference(updatedCareer.getGenderPreference());
		existing.setLastDate(updatedCareer.getLastDate());
		existing.setNoOfVacancies(updatedCareer.getNoOfVacancies());
		existing.setJobDescription(updatedCareer.getJobDescription());
		existing.setRequirements(updatedCareer.getRequirements());
		existing.setResponsibilities(updatedCareer.getResponsibilities());
		existing.setSkillSet(updatedCareer.getSkillSet());
		existing.setEducation(updatedCareer.getEducation());
		existing.setAdditionalTags(updatedCareer.getAdditionalTags());
		existing.setUpdatedAt(LocalDate.now());

		careerRepository.save(existing);
	}

	@Override
	@Transactional
	public void toggleCareerStatus(Long id, String status) {
		Careers career = careerRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Career not found with ID: " + id));

		if ("Y".equals(career.getActiveStatus())) {
			career.setActiveStatus("N");
		} else {
			career.setActiveStatus("Y");
			career.setPostingDate(LocalDate.now()); // Set active date now
		}

		career.setUpdatedAt(LocalDate.now());
		careerRepository.save(career);
	}

	@Override
	public List<Careers> getActiveCareers() {
		return careerRepository.findByActiveStatusAndDeleteStatusOrderByPostingDateDesc("Y", "N");
	}

	@Override
	public Careers getJobDetailsById(Long id) {
		return careerRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Career not found with ID: " + id));
	}

	@Override
	public List<CareerApplication> getAllCareerApplications() {
		return careerApplicationRepository.findAllByOrderByAppliedOnDesc();
	}

	@Override
	@Transactional
	public void submitApplication(CareerApplicationFormVO form) throws IOException {
		Careers job = careerRepository.findById(form.getCareerId())
				.orElseThrow(() -> new EntityNotFoundException("Invalid career ID"));

		CareerApplication application = new CareerApplication();
		application.setCareer(job);
		application.setFullName(form.getFullName());
		application.setEmail(form.getEmail());
		application.setPhone(form.getPhone());
		application.setCoverLetter(form.getCoverLetter());
		application.setApplicationStatus("Pending");
		application.setDeleteStatus("N");

		MultipartFile resume = form.getResume();
		if (resume != null && !resume.isEmpty()) {
			try {
				String originalName = resume.getOriginalFilename();
				String extension = originalName != null && originalName.contains(".")
						? originalName.substring(originalName.lastIndexOf("."))
						: "";
				String serverName = UUID.randomUUID() + extension;

				// Example: /uploads/resumes/
				String uploadDir = uploadDirectory + "/resumes";
				Path fullPath = Paths.get(uploadDir, serverName);
				Files.createDirectories(fullPath.getParent());

				// Save to disk
				resume.transferTo(fullPath.toFile());

				// Save metadata
				application.setResumeFileName(originalName);
				application.setResumeNameInServer("/uploads/resumes/" + serverName);

			} catch (IOException e) {
				e.printStackTrace();
				throw new IOException("Error saving resume");
			}
		}

		careerApplicationRepository.save(application);
	}

	@Override
	@Transactional
	public void saveBlogPost(BlogPostFormVO form) throws IOException {
		BlogPost blog = new BlogPost();

		blog.setTitle(form.getTitle());
		blog.setSlug(generateSlug(form.getTitle()));
		blog.setAuthorName(form.getAuthorName());
		blog.setSummary(form.getSummary());
		blog.setContent(form.getContent());
		blog.setPublished("N");

		if (form.getPublishedAt() != null) {
			blog.setPublishedAt(form.getPublishedAt().atStartOfDay());
		}

		// Category
		BlogCategory category = blogCategoryRepository.findById(form.getCategoryId())
				.orElseThrow(() -> new EntityNotFoundException("Invalid category ID"));
		blog.setCategory(category);

		// Cover Image
		if (form.getCoverImage() != null && !form.getCoverImage().isEmpty()) {
			try {
				MultipartFile coverImage = form.getCoverImage();
				String originalName = coverImage.getOriginalFilename();
				String extension = originalName != null && originalName.contains(".")
						? originalName.substring(originalName.lastIndexOf("."))
						: "";
				String serverName = UUID.randomUUID() + extension;

				String uploadDir = uploadDirectory + "/blogs"; // base path from application.properties or class field
				Path fullPath = Paths.get(uploadDir, serverName);
				Files.createDirectories(fullPath.getParent());

				coverImage.transferTo(fullPath.toFile());

				blog.setCoverImage(serverName); // save file name in DB

			} catch (IOException e) {
				e.printStackTrace();
				throw new IOException("Error saving cover image");
			}
		}
		if (form.getThumbnailImage() != null && !form.getThumbnailImage().isEmpty()) {
			try {
				MultipartFile thumbnail = form.getThumbnailImage();
				String originalName = thumbnail.getOriginalFilename();
				String extension = originalName != null && originalName.contains(".")
						? originalName.substring(originalName.lastIndexOf("."))
						: "";
				String serverName = UUID.randomUUID() + extension;

				String uploadDir = uploadDirectory + "/blogs/thumbnails";
				Path fullPath = Paths.get(uploadDir, serverName);
				Files.createDirectories(fullPath.getParent());

				thumbnail.transferTo(fullPath.toFile());

				blog.setThumbnailImage(serverName);
			} catch (IOException e) {
				e.printStackTrace();
				throw new IOException("Error saving thumbnail image");
			}
		}

		blogPostRepository.save(blog);
	}

	@Transactional
	public void updateBlogPost(BlogPostFormVO form) {
		BlogPost blog = blogPostRepository.findById(form.getId())
				.orElseThrow(() -> new EntityNotFoundException("Blog not found"));

		blog.setTitle(form.getTitle());
		blog.setSummary(form.getSummary());
		blog.setContent(form.getContent());
		blog.setAuthorName(form.getAuthorName());
		blog.setUpdatedAt(LocalDateTime.now());

		if (form.getPublishedAt() != null) {
			blog.setPublishedAt(form.getPublishedAt().atStartOfDay());
		}

		// Update category
		BlogCategory category = blogCategoryRepository.findById(form.getCategoryId())
				.orElseThrow(() -> new EntityNotFoundException("Invalid category ID"));
		blog.setCategory(category);

		// Replace cover image if present
		MultipartFile coverImage = form.getCoverImage();
		if (coverImage != null && !coverImage.isEmpty()) {
			String serverName = UUID.randomUUID()
					+ coverImage.getOriginalFilename().substring(coverImage.getOriginalFilename().lastIndexOf("."));
			String uploadDir = uploadDirectory + "/blogs";
			Path fullPath = Paths.get(uploadDir, serverName);
			try {
				Files.createDirectories(fullPath.getParent());
				coverImage.transferTo(fullPath.toFile());
				blog.setCoverImage(serverName);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		// Replace thumbnail image if present
		MultipartFile thumbnailImage = form.getThumbnailImage();
		if (thumbnailImage != null && !thumbnailImage.isEmpty()) {
			String serverName = UUID.randomUUID() + thumbnailImage.getOriginalFilename()
					.substring(thumbnailImage.getOriginalFilename().lastIndexOf("."));
			String uploadDir = uploadDirectory + "/blogs/thumbnails";
			Path fullPath = Paths.get(uploadDir, serverName);
			try {
				Files.createDirectories(fullPath.getParent());
				thumbnailImage.transferTo(fullPath.toFile());
				blog.setThumbnailImage(serverName);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		blogPostRepository.save(blog);
	}

	private String generateSlug(String title) {
		return title.toLowerCase().replaceAll("[^a-z0-9\\s]", "").replaceAll("\\s+", "-").replaceAll("-{2,}", "-");
	}

	@Override
	public List<BlogPost> getAllBlogs() {
		return blogPostRepository.findAllByOrderByCreatedAt();
	}

	@Override
	public void toggleBlogStatus(Long blogId, String status) {
		BlogPost blog = blogPostRepository.findById(blogId).orElseThrow(() -> new RuntimeException("Blog not found"));

		blog.setPublished(status); // 'Y' or 'N'
		blog.setUpdatedAt(LocalDateTime.now());

		blogPostRepository.save(blog);
	}

	@Override
	public BlogPost findPublishedBlogBySlug(String slug) {
		Optional<BlogPost> blog = Optional.of(blogPostRepository.findBySlugAndPublished(slug, "Y"));
		if (blog.isPresent()) {
			BlogPost blogpost = blog.get();
			blogpost.setReadCount(blogpost.getReadCount() + 1);
			blogPostRepository.save(blogpost);
			return blogpost;
		}
		return new BlogPost();
	}

	@Override
	public List<BlogPost> getLatestPublishedPosts() {
		return blogPostRepository.findTop4ByPublishedOrderByPublishedAtDesc("Y");
	}

	@Override
	public List<BlogPost> getRecentThreeBlogs() {
		return blogPostRepository.findTop3ByPublishedOrderByPublishedAtDesc("Y");
	}

	@Override
	public Page<BlogPost> getAllPublishedBlogs(Pageable pageable) {
		return blogPostRepository.findAllByPublishedOrderByCreatedAtDesc("Y", pageable);
	}

	@Override
	public List<BlogPost> getPublishedBlogsByCategory(String categoryName) {
		return blogPostRepository.findByCategory_NameAndPublishedOrderByCreatedAtDesc(categoryName, "Y");
	}

	@Override
	public List<BlogPost> findRecentlyPublishedBlogs() {
		return blogPostRepository.findTop2ByPublishedOrderByCreatedAtDesc("Y");
	}

	@Override
	public List<BlogPost> findRecentTwoPublishedBlogs() {
		return blogPostRepository.findTop2ByPublishedOrderByCreatedAtDesc("Y");
	}

	@Override
	public Page<CaseStudy> getPublishedCaseStudiesLatest(Pageable pageable) {
		return caseStudyRepository.findAllByPublishedOrderByCreatedAtDesc("Y", pageable);
	}

	@Override
	public List<CaseStudy> getAllCaseStudies() {
		return caseStudyRepository.findAllByOrderByCreatedAt();
	}

	@Override
	@Transactional
	public void addCaseStudy(CaseStudyVO form) throws IOException {
		CaseStudy caseStudy = new CaseStudy();

		caseStudy.setTitle(form.getTitle());
		caseStudy.setSlug(generateSlug(form.getTitle()));
		caseStudy.setAuthor(form.getAuthorName());
		caseStudy.setBody(form.getBody());
		caseStudy.setInBrief(form.getInBrief());
		caseStudy.setPublished(form.getPublished());
		caseStudy.setViewCount(0);
		caseStudy.setPublished("N");	
		
		if (form.getPublishedAt() != null) {
			caseStudy.setPublishedAt(form.getPublishedAt().atStartOfDay());
		}

		// Upload thumbnail image
		if (form.getThumbnailImage() != null && !form.getThumbnailImage().isEmpty()) {
			try {
				MultipartFile thumbnail = form.getThumbnailImage();
				String originalName = thumbnail.getOriginalFilename();
				String extension = originalName != null && originalName.contains(".")
						? originalName.substring(originalName.lastIndexOf("."))
						: "";
				String serverName = UUID.randomUUID() + extension;

				String uploadDir = uploadDirectory + "/case-studies/thumbnails";
				Path fullPath = Paths.get(uploadDir, serverName);
				Files.createDirectories(fullPath.getParent());

				thumbnail.transferTo(fullPath.toFile());
				caseStudy.setThumbnailImage(serverName);

			} catch (IOException e) {
				e.printStackTrace();
				throw new IOException("Error saving thumbnail image");
			}
		}

		// Upload PDF file
		if (form.getPdfFile() != null && !form.getPdfFile().isEmpty()) {
			try {
				MultipartFile pdf = form.getPdfFile();
				String originalName = pdf.getOriginalFilename();
				String extension = originalName != null && originalName.contains(".")
						? originalName.substring(originalName.lastIndexOf("."))
						: "";
				String serverName = UUID.randomUUID() + extension;

				String uploadDir = uploadDirectory + "/case-studies/pdfs";
				Path fullPath = Paths.get(uploadDir, serverName);
				Files.createDirectories(fullPath.getParent());

				pdf.transferTo(fullPath.toFile());
				caseStudy.setPdfFileName(serverName);

			} catch (IOException e) {
				e.printStackTrace();
				throw new IOException("Error saving PDF file");
			}
		}

		caseStudyRepository.save(caseStudy);
	}

	@Override
	@Transactional
	public void updateCaseStudy(CaseStudyVO form) throws IOException {
		CaseStudy cs = caseStudyRepository.findById(form.getId())
				.orElseThrow(() -> new EntityNotFoundException("Invalid case study ID"));

		cs.setTitle(form.getTitle());
		cs.setAuthor(form.getAuthorName());
		cs.setBody(form.getBody());
		cs.setInBrief(form.getInBrief());
		cs.setPublished(form.getPublished());

		if (form.getPublishedAt() != null) {
			cs.setPublishedAt(form.getPublishedAt().atStartOfDay());
		}

		// Replace PDF if present
		if (form.getPdfFile() != null && !form.getPdfFile().isEmpty()) {
			String original = form.getPdfFile().getOriginalFilename();
			String ext = original != null ? original.substring(original.lastIndexOf(".")) : "";
			String filename = UUID.randomUUID() + ext;
			Path path = Paths.get(uploadDirectory, "case-studies", "pdfs", filename);
			Files.createDirectories(path.getParent());
			form.getPdfFile().transferTo(path.toFile());
			cs.setPdfFileName(filename);
			;
		}

		// Replace Thumbnail if present
		if (form.getThumbnailImage() != null && !form.getThumbnailImage().isEmpty()) {
			String original = form.getThumbnailImage().getOriginalFilename();
			String ext = original != null ? original.substring(original.lastIndexOf(".")) : "";
			String filename = UUID.randomUUID() + ext;
			Path path = Paths.get(uploadDirectory, "case-studies", "thumbnails", filename);
			Files.createDirectories(path.getParent());
			form.getThumbnailImage().transferTo(path.toFile());
			cs.setThumbnailImage(filename);
		}

		caseStudyRepository.save(cs);
	}

	@Override
	public CaseStudyVO getCaseStudyById(Long id) {
		CaseStudy cs = caseStudyRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Case Study not found with ID: " + id));

		CaseStudyVO dto = new CaseStudyVO();
		dto.setId(cs.getId());
		dto.setTitle(cs.getTitle());
		dto.setAuthorName(cs.getAuthor());
		dto.setBody(cs.getBody());
		dto.setInBrief(cs.getInBrief());
		dto.setPublished(cs.getPublished());
		dto.setPdfFileName(cs.getPdfFileName()); // assume it's just file name, not full path
		dto.setThumbnailImageName(cs.getThumbnailImage());
		return dto;
	}

	@Override
	public CaseStudy findCaseStudyBySlug(String slug) {
		Optional<CaseStudy> optionalCaseStudy = caseStudyRepository.findBySlug(slug);
		if (optionalCaseStudy.isPresent()) {
			CaseStudy caseStudy = optionalCaseStudy.get();
			caseStudy.setViewCount(caseStudy.getViewCount() + 1);
			caseStudyRepository.save(caseStudy);
			return caseStudy;
		}
		return null;
	}

	@Override
	public List<CaseStudy> findFourRelatedCaseStudies(Long casestudyId, String author) {
		return caseStudyRepository.findTop4ByAuthorAndIdNotAndPublishedOrderByCreatedAtDesc(author, casestudyId, "Y");
	}

	@Override
	public List<CaseStudy> getFeaturedCaseStudies() {
		return caseStudyRepository.findByFeaturedStatus("Y");
	}

	@Override
	public boolean toggleCaseStudyPublishStatus(Long id) {
	    System.out.println("ok");
	    Optional<CaseStudy> optional = caseStudyRepository.findById(id);
	    if (optional.isPresent()) {
	        CaseStudy cs = optional.get();
	        
	        // Add null check for published field
	        String currentStatus = cs.getPublished();
	        if (currentStatus == null) {
	            // If null, default to "N" (not published)
	            cs.setPublished("Y");
	        } else {
	            cs.setPublished(currentStatus.equalsIgnoreCase("Y") ? "N" : "Y");
	        }
	        
	        caseStudyRepository.save(cs);
	        return true;
	    }
	    return false;
	}

	@Override
	public boolean toggleCaseStudyFeatureStatus(Long id) {
		Optional<CaseStudy> optional = caseStudyRepository.findById(id);
		if (optional.isPresent()) {
			CaseStudy cs = optional.get();
			cs.setFeaturedStatus(cs.getFeaturedStatus().equalsIgnoreCase("Y") ? "N" : "Y");
			caseStudyRepository.save(cs);
			return true;
		}
		return false;
	}

	@Override
	public List<CareerApplication> getAllJobApplications() {
		return careerApplicationRepository.findAllByOrderByAppliedOnDesc();
	}

	@Override
	public List<Careers> findAllCareers() {
		return careerRepository.findAll();
	}

	public List<CareerApplication> getFilteredJobApplications(Long careerId, LocalDate startDate, LocalDate endDate) {
		// Delegate to repository
		return careerApplicationRepository.findByFilters(careerId, startDate, endDate);
	}

	@Override
	public List<GalleryGroup> findGalleryGroupsForPublic() {
//		return galleryGroupRepository.findAllByDeactiveStatus("N", pageable);
		 return galleryGroupRepository.findAllActiveGalleryGroups();
	}

	@Override
	public List<CareerApplication> getAllCareerApplicationFromLast3Days() {
		LocalDateTime threeDaysAgo = LocalDateTime.now().minusDays(3);
		return careerApplicationRepository.findAllFromLast3Days(threeDaysAgo);
	}
	
	@Override
	public ResponseEntity<Resource> getResumeResponse(Long applicationId) throws IOException {
	    CareerApplication application = careerApplicationRepository.findById(applicationId)
	        .orElseThrow(() -> new FileNotFoundException("Application not found"));

	    Path resumePath = Paths.get(application.getResumeNameInServer());
	    if (!Files.exists(resumePath)) {
	        throw new FileNotFoundException("Resume file not found");
	    }

	    Resource resource = new UrlResource(resumePath.toUri());

	    return ResponseEntity.ok()
	        .contentType(MediaType.APPLICATION_PDF)
	        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resumePath.getFileName().toString() + "\"")
	        .body(resource);
	}

	@Override
	public Page<GalleryGroup> findAllActiveGalleryGroups(Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}



}
