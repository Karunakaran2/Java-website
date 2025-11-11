package com.karan.backend.utility;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.util.Scanner;

import javax.servlet.ServletContext;

import org.apache.tika.Tika;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

public class CustomFileUtilities {

	private CustomFileUtilities() {
		throw new IllegalStateException("UTILITY CLASS !");
	}

	public static MediaType getMediaTypeForFileName(ServletContext servletContext, String fileName) {
		String mimeType = servletContext.getMimeType(fileName);
		try {
			return MediaType.parseMediaType(mimeType);
		} catch (Exception e) {
			return MediaType.APPLICATION_OCTET_STREAM;
		}
	}

	public static File convert(MultipartFile file) throws IOException {
		File convFile = new File(file.getOriginalFilename());
		boolean status = convFile.createNewFile();
		if (status) {
			FileOutputStream fos = null;
			try {
				fos = new FileOutputStream(convFile);
				fos.write(file.getBytes());
			} catch (Exception e) {
				// TODO: handle exception
			} finally {
				if (fos != null)
					fos.close();
			}
		}
		return convFile;
	}

	public static boolean isPDF(File file) {
		if (file != null && file.length() < 1E10) {
			try {
				Scanner input = null;
				try {
					input = new Scanner(new FileReader(file));
					while (input.hasNextLine()) {
						final String checkline = input.nextLine();
						if (checkline.contains("%PDF-")) {
							return true;
						} else {
							return false;
						}
					}
					return false;
				} finally {
					if (input != null)
						input.close();
				}
			} catch (FileNotFoundException e) {
				return false;
			}
		}
		return false;
	}

	
	public static String probeFileExtension(File file) throws IOException {
        Tika tika = new Tika();
        String mimeType = tika.detect(file);

        if (mimeType.equals("application/pdf")) {
            if (!foundJavascriptInPDF(file)) {
                return mimeType;
            } else {
                return "";
            }
        } else {
            return mimeType;
        }
    }
	
	public static boolean foundJavascriptInPDF(File file) {
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) {
                if (line.toLowerCase().contains("javascript")) {
                    return true;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }

}