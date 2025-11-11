package com.karan.backend.conflogin.dto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.kran.utility.encryption.EncryptUsingDES;

import lombok.Data;

@Data
public class ModuleSetupVO {

	private Long moduleId;
	private String idEncrypted;
	private String moduleName;
	private String moduleLabel;
	private String moduleDescription;
	private Date activeDate;
	private Date deactiveDate;
	private String activeStatus = "Y";
	private String moduleType = "U";
	private String moduleLink;
	private String version;
	private String activeDateStr;
	private String deactiveDateStr;
	private String allotStatus;

	public String getIdEncrypted() {
		idEncrypted = new EncryptUsingDES().encrypt(moduleId + "");
		return idEncrypted;
	}

	public void setActiveDateStr(String activeDateStr) {
		this.activeDateStr = activeDateStr;
		if (null != activeDateStr) {
			try {
				activeDate = new SimpleDateFormat("yyyy-MM-dd").parse(activeDateStr);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	public void setDeactiveDateStr(String deactiveDateStr) {
		this.deactiveDateStr = deactiveDateStr;
		if (null != deactiveDateStr) {
			try {
				deactiveDate = new SimpleDateFormat("yyyy-MM-dd").parse(deactiveDateStr);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	public String getDeactiveDateStr() {
		if (null != deactiveDate) {
			deactiveDateStr = new SimpleDateFormat("yyyy-MM-dd").format(deactiveDate);
		}
		return deactiveDateStr;
	}

	public String getActiveDateStr() {
		if (null != activeDate) {
			activeDateStr = new SimpleDateFormat("yyyy-MM-dd").format(activeDate);
		}
		return activeDateStr;
	}
}
