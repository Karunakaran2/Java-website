package com.karan.backend.portal.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamMemberSetupVO {

	 private Long id;
	    private String name;
	    private String position;

	    private String email;
	    private String phone;
	    private Integer level;
	    private Integer sortOrder;

	    private Long parentId;

	    private String linkedinUrl;
	    private String twitterUrl;
	    private String photoUrl;
	    private String isActive;
}
