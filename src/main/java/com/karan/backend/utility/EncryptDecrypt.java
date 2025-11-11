package com.karan.backend.utility;

import com.kran.utility.encryption.EncryptUsingDES;

public class EncryptDecrypt {

	public static String encrypt(String data) {
		String encryptValue = new EncryptUsingDES().encrypt(data);
		encryptValue = encryptValue.replace("/", "$");
		return encryptValue;
	}

	public static String decrypt(String data) {
		data = data.replace("$", "/");
		data = data.replace(" ", "+");
		String decryptValue = new EncryptUsingDES().decrypt(data);
		return decryptValue;
	}
}
