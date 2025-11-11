package com.karan.backend.utility;

import java.util.Random;

public class RandomNumberGenerator {
	
	public static String generateRandomNumber() {
        Random random = new Random();

        // Generate 3 random numbers
        int num1 = random.nextInt(1000);
        int num2 = random.nextInt(1000);
        int num3 = random.nextInt(1000);

        // Generate 4 random capital letters
        String letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder randomLetters = new StringBuilder();
        for (int i = 0; i < 4; i++) {
            char randomLetter = letters.charAt(random.nextInt(letters.length()));
            randomLetters.append(randomLetter);
        }

        // Format the result
        String result = String.format("%03d-%s-%03d", num1, randomLetters.toString(), num3);

        return result;
    }

}
