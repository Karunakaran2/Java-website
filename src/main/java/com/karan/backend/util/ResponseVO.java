package com.karan.backend.util;

import java.util.HashMap;
import java.util.Map;

public class ResponseVO {
	private Map<String, Object> response = new HashMap<>();
	 
    public Map<String, Object> getResponse() {
        return response;
    }
 
    public void setResponse(Map<String, Object> response) {
        this.response = response;
    }
 
	public void addError(String string) {
		// TODO Auto-generated method stub
	}
}