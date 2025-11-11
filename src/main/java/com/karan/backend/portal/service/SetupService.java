package com.karan.backend.portal.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.karan.backend.portal.entities.BlogCategory;
import com.karan.backend.portal.entities.TeamMemberSetup;

public interface SetupService {

	List<BlogCategory> getAllBlogCategories();
	
	void saveBlogCategory(BlogCategory vo);

	void toggleBlogCategory(Long id);

	Object findAllTeamMembers();

	void deleteTeamMemberById(Long id);

	void saveTeamMember(TeamMemberSetup newMember, MultipartFile imageFile) throws IOException ;

	void updateTeamMember(TeamMemberSetup member, MultipartFile imageFile)  throws IOException;

	TeamMemberSetup getTeamMemberById(Long id);

	void toggleActiveStatus(Long id);

	List<TeamMemberSetup> getTeamMembersByLevelForPublic(int level);
	
}
