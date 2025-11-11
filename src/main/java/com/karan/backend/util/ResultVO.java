package com.karan.backend.util;

import java.util.Map;

import lombok.Data;

@Data
public class ResultVO {
	private String result;
	private Map<String, String> fieldErrors;
	private Object resultObject;
	private String userFullName;
	

}