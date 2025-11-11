package com.karan.backend.conflogin.dto;

import lombok.Data;

@Data
public class UserDetail {
	private Long hierarchyId;
	private Long seatUserAllotId;
	private Long userId;
	private String userName;
	private String hierarchyName;
	private String hierarchyCode;
	private String type;
}