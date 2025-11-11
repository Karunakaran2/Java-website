package com.karan.backend.utility;

import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;

public class CustomPasswordGenerator {

	public static String generatePassword() {
		PasswordGenerator gen = new PasswordGenerator();

		org.passay.CharacterData lowerCaseChars = EnglishCharacterData.LowerCase;
		CharacterRule lowerCaseRule = new CharacterRule(lowerCaseChars);
		lowerCaseRule.setNumberOfCharacters(2);

		org.passay.CharacterData upperCaseChars = EnglishCharacterData.UpperCase;
		CharacterRule upperCaseRule = new CharacterRule(upperCaseChars);
		upperCaseRule.setNumberOfCharacters(2);

		org.passay.CharacterData digitChars = EnglishCharacterData.Digit;
		CharacterRule digitRule = new CharacterRule(digitChars);
		digitRule.setNumberOfCharacters(2);

		String password = gen.generatePassword(8, lowerCaseRule, upperCaseRule, digitRule);
		return password;
	}

	public static void main(String[] args) {
		System.out.println(CustomPasswordGenerator.generatePassword());
	}

}
