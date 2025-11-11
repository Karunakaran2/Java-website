package com.karan.backend.utility;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.List;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.text.TextPosition;

public class PrintTextLocations extends PDFTextStripper {
	private static String search_key;

	private static int page = 0;
	private static float x;
	private static float y;

	public PrintTextLocations() throws IOException {
		x = -1;
		y = -1;
	}

	public float[] getCoordiantes(File input, String searchstring) throws IOException {
		PDDocument document = Loader.loadPDF(input);
		search_key = searchstring;

		PDFTextStripper stripper = new PrintTextLocations();
		for (int pageNumber = 1; pageNumber <= document.getNumberOfPages(); pageNumber++) {
			stripper.setSortByPosition(true);
			stripper.setStartPage(pageNumber);
			stripper.setEndPage(pageNumber);
			stripper.writeText(document, new OutputStreamWriter(new ByteArrayOutputStream()));

			if (x != -1) {
				page = pageNumber;
				break;
			}
		}

		y = stripper.getCurrentPage().getMediaBox().getHeight() - y;
		return new float[] { page, x, y };
	}

	@Override
	protected void writeString(String searchstring, List<TextPosition> textPositions) throws IOException {
		if (searchstring.contains(search_key)) {
			TextPosition text = textPositions.get(0);
			if (x == -1) {
				x = text.getXDirAdj();
				y = text.getYDirAdj();
			}
		}
	}

	public static void main(String[] args) throws IOException {
		System.out.println(EncryptDecrypt.encrypt("1"));
	}

}