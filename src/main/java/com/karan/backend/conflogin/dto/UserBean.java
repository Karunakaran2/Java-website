package com.karan.backend.conflogin.dto;

import java.io.Serializable;


import lombok.Data;


@Data
public class UserBean implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long hierarchyId;
    private Long parentHierarchy;
    private String officeCategory;

    private Long seatUserAllotId;
    private Long oneTimeSeatUserAllotId;
    private Long userId;
    private String domain;
    private Long post;

    private Long ddoId;
    private Long directorateId;
    private Long departmentId;
    
    private String userName;
    private String hierarchyName;
	private String designation;
    private String hierarchyCode;
    private String officeName;
    private String password;
    private String sessionToken;
    private String mobile;
    private String email;
    private Long sessionId;

}