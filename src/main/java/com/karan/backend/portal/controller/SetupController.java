package com.karan.backend.portal.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.karan.backend.portal.entities.BlogCategory;
import com.karan.backend.portal.entities.TeamMemberSetup;
import com.karan.backend.portal.service.AdminService;
import com.karan.backend.portal.service.SetupService;

@Controller
@RequestMapping("/admin/setup/")
public class SetupController {

	@Autowired
	private AdminService adminService;
	@Autowired
	private SetupService setupService;
	
	@GetMapping("goto-blog-category-setup")
	public ModelAndView showBlogCategories() {
	    ModelAndView mv = new ModelAndView();
	    mv.addObject("blogCategories", setupService.getAllBlogCategories());
	    mv.addObject("setuptab", "setups");
	    mv.addObject("newCategory", new BlogCategory());
	    mv.addObject("activeTab", "blogCategories");
	    mv.setViewName("karan/setups/blogCategorySetup");
	    return mv;
	}

	@PostMapping("blog-categories/save")
	public String saveBlogCategory(@ModelAttribute BlogCategory vo, RedirectAttributes redirectAttributes) {
		setupService.saveBlogCategory(vo);
	    redirectAttributes.addFlashAttribute("success", "Category saved successfully!");
	    return "redirect:/admin/setup/goto-blog-category-setup";
	}

	@PostMapping("blog-categories/toggle/{id}")
	public String toggleCategory(@PathVariable Long id, RedirectAttributes redirectAttributes) {
		setupService.toggleBlogCategory(id);
	    return "redirect:/admin/setup/goto-blog-category-setup";
	}
	
	// TEAM MEMBERS

	@GetMapping("teams")
	public String showTeamMemberSetupPage(Model model) {
	    model.addAttribute("team", setupService.findAllTeamMembers());
	    model.addAttribute("newMember", new TeamMemberSetup());
	    model.addAttribute("isEdit", false);
	    model.addAttribute("setuptab", "setups");
	    model.addAttribute("activeTab", "memberSetups");
	    return "karan/setups/teamMemberSetup";
	}

	@PostMapping("/add-team-member")
	public String saveTeamMember(@ModelAttribute TeamMemberSetup newMember,
	                             @RequestParam("image") MultipartFile imageFile) throws IOException {
	    setupService.saveTeamMember(newMember, imageFile);
	    return "redirect:/admin/setup/teams";
	}

	@PostMapping("/update-team-member")
	public String updateTeamMember(@ModelAttribute TeamMemberSetup member,
	                               @RequestParam("image") MultipartFile imageFile) throws IOException {
	    setupService.updateTeamMember(member, imageFile);
	    return "redirect:/admin/setup/teams";
	}

	@GetMapping("/edit-team-member/{id}")
	public String editTeamMember(@PathVariable Long id, Model model) {
	    TeamMemberSetup member = setupService.getTeamMemberById(id);
	    model.addAttribute("newMember", member);
	    model.addAttribute("isEdit", true);
	    model.addAttribute("team", setupService.findAllTeamMembers());
	    return "karan/setups/teamMemberSetup";
	}

	@PostMapping("/toggle-team-member/{id}")
	public String toggleTeamMember(@PathVariable Long id) {
	    setupService.toggleActiveStatus(id);
	    return "redirect:/admin/setup/teams";
	}

	@PostMapping("/delete-team-member/{id}")
	public String deleteTeamMember(@PathVariable Long id) {
	    setupService.deleteTeamMemberById(id);
	    return "redirect:/admin/setup/teams";
	}


}
