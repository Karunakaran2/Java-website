package com.karan.backend.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GeneralValidations {

	public static boolean validateEmail(String email) {
		String regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
		Pattern pattern = Pattern.compile(regex);
		return pattern.matcher(email).find();
	}

	public static boolean validateMobileNumber(String mobileNumber) {
		Pattern numeric = Pattern.compile("^[6-9]\\d{9}$", Pattern.CASE_INSENSITIVE);
		return numeric.matcher(mobileNumber).find();
	}

	public static boolean validateName(String name) {
		Pattern numeric = Pattern.compile("^[a-zA-Z ]*$", Pattern.CASE_INSENSITIVE);
		return numeric.matcher(name).find();
	}
	
	public static boolean validatePassportNumber(String passportNumber) {
		String regex = "^[A-PR-WYa-pr-wy][1-9]\\d"
                + "\\s?\\d{4}[1-9]$";
       Pattern p = Pattern.compile(regex);
       Matcher m = p.matcher(passportNumber);
       return m.matches();   
	}
	
    public static boolean validatePinNumber(String pinCode)
    {
        String regex
            = "^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$";
        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(pinCode);
        return m.matches();
    }


	public static boolean isNumeric(String strNum) {
		if (strNum == null || strNum.isBlank()) {
			return false;
		}
		try {
			double d = Double.parseDouble(strNum);
		} catch (NumberFormatException nfe) {
			return false;
		}
		return true;
	}

}
