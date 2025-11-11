package com.karan.backend.portal.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.karan.backend.portal.entities.BlogCategory;
import com.karan.backend.portal.entities.TeamMemberSetup;
import com.karan.backend.portal.repo.BlogCategoryRepository;
import com.karan.backend.portal.repo.TeamMemberSetupRepository;
import com.karan.backend.portal.service.SetupService;

@Service
public class SetupServiceImpl implements SetupService {

	@Value("${application.uploadsdirectory}")
	private String uploadDirectory;

	@Autowired
	private BlogCategoryRepository blogCategoryRepository;
	@Autowired
	private TeamMemberSetupRepository teamMemberRepository;

	@Override
	public void saveBlogCategory(BlogCategory vo) {
		BlogCategory category;
		if (vo.getId() != null) {
			category = blogCategoryRepository.findById(vo.getId())
					.orElseThrow(() -> new EntityNotFoundException("Category not found"));
		} else {
			category = new BlogCategory();
		}

		category.setName(vo.getName());
		category.setSlug(generateSlug(vo.getName()));
		blogCategoryRepository.save(category);
	}

	@Override
	public void toggleBlogCategory(Long id) {
		BlogCategory cat = blogCategoryRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Category not found"));
		cat.setDisableStatus("Y".equals(cat.getDisableStatus()) ? "N" : "Y");
		blogCategoryRepository.save(cat);
	}

	private String generateSlug(String input) {
		return input.trim().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("-+$", "");
	}

	@Override
	public List<BlogCategory> getAllBlogCategories() {
		return blogCategoryRepository.findByDisableStatus("N");
	}

	@Override
	public void saveTeamMember(TeamMemberSetup member, MultipartFile imageFile) throws IOException {
		if (imageFile != null && !imageFile.isEmpty()) {
			try {
				String originalName = imageFile.getOriginalFilename();
				String extension = originalName != null && originalName.contains(".")
						? originalName.substring(originalName.lastIndexOf("."))
						: "";
				String serverName = UUID.randomUUID() + extension;

				String uploadPath = uploadDirectory + "/team-members/photos";
				Path fullPath = Paths.get(uploadPath, serverName);
				Files.createDirectories(fullPath.getParent());

				imageFile.transferTo(fullPath.toFile());

				member.setPhotoUrl( "/uploads/team-members/photos/" + serverName);
			} catch (IOException e) {
				e.printStackTrace();
				throw new IOException("Failed to save team member image");
			}
		}

		member.setCreatedAt(LocalDate.now());
		member.setUpdatedAt(LocalDate.now());
		teamMemberRepository.save(member);
	}

	@Override
	public void deleteTeamMemberById(Long id) {
		 teamMemberRepository.findById(id).ifPresent(member -> {
		        member.setIsDeleted("Y");
		        member.setIsActive("N");
		        teamMemberRepository.save(member);
		    });
	}

	@Override
	public List<TeamMemberSetup> findAllTeamMembers() {
		List<TeamMemberSetup> members = teamMemberRepository.findAll(Sort.by("level").ascending().and(Sort.by("sortOrder").ascending()));
		return members;
	}
	@Override
	public TeamMemberSetup getTeamMemberById(Long id) {
	    return teamMemberRepository.findById(id).orElseThrow(() -> new RuntimeException("Member not found"));
	}

	@Override
	public void updateTeamMember(TeamMemberSetup updated, MultipartFile imageFile) throws IOException {
	    TeamMemberSetup existing = getTeamMemberById(updated.getId());

	    existing.setName(updated.getName());
	    existing.setPosition(updated.getPosition());
	    existing.setEmail(updated.getEmail());
	    existing.setPhone(updated.getPhone());
	    existing.setLinkedinUrl(updated.getLinkedinUrl());
	    existing.setTwitterUrl(updated.getTwitterUrl());
	    existing.setLevel(updated.getLevel());
	    existing.setSortOrder(updated.getSortOrder());

	    if (imageFile != null && !imageFile.isEmpty()) {
	        String originalName = imageFile.getOriginalFilename();
	        String extension = originalName != null && originalName.contains(".")
	                ? originalName.substring(originalName.lastIndexOf("."))
	                : "";
	        String serverName = UUID.randomUUID() + extension;

	        String uploadPath = uploadDirectory + "/team-members/photos";
	        Path fullPath = Paths.get(uploadPath, serverName);
	        Files.createDirectories(fullPath.getParent());

	        imageFile.transferTo(fullPath.toFile());

	        existing.setPhotoUrl("/uploads/team-members/photos/" + serverName);
	    }

	    existing.setUpdatedAt(LocalDate.now());
	    teamMemberRepository.save(existing);
	}

	@Override
	public void toggleActiveStatus(Long id) {
	    TeamMemberSetup member = getTeamMemberById(id);
	    member.setIsActive("Y".equals(member.getIsActive()) ? "N" : "Y");
	    teamMemberRepository.save(member);
	}
	
	public List<TeamMemberSetup> getTeamMembersByLevelForPublic(int level) {
	    return teamMemberRepository.findByLevelAndIsActiveAndIsDeleted(level, "Y", "N");
	}


}
