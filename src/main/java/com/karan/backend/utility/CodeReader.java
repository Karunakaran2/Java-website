package com.karan.backend.utility;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.ResourceBundle;

import javax.imageio.ImageIO;

import org.apache.commons.io.FilenameUtils;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.NotFoundException;
import com.google.zxing.Result;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

public class CodeReader {
	private static final String CHARSET = "UTF-8";
	private static Random random = new Random();

	public static File createQRCode(String qrCodeData, String uploadDirectory) throws WriterException, IOException {

		ResourceBundle resource = ResourceBundle.getBundle("templates-alerts");
		String url = resource.getString("QR_URL");

		StringBuilder qrFilePath = new StringBuilder(uploadDirectory);
		qrFilePath.append(File.separator);
		qrFilePath.append("temp");
		qrFilePath.append(File.separator);
		qrFilePath.append(random.nextInt(10000) + "_QRCode.png");

		File file = new File(qrFilePath.toString());
		if (!file.exists()) {
			file.mkdirs();
		}

		Map<EncodeHintType, ErrorCorrectionLevel> hintMap = new HashMap<EncodeHintType, ErrorCorrectionLevel>();
		hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);

		BitMatrix matrix = new MultiFormatWriter().encode(new String((url + qrCodeData).getBytes(CHARSET), CHARSET),
				BarcodeFormat.QR_CODE, 200, 200, hintMap);
		MatrixToImageWriter.writeToPath(matrix, FilenameUtils.getExtension(file.getName()), file.toPath());

		return file;
	}

	public static String readQRCode(String filePath, String charset, Map<EncodeHintType, ErrorCorrectionLevel> hintMap)
			throws FileNotFoundException, IOException, NotFoundException {
		BinaryBitmap binaryBitmap = new BinaryBitmap(
				new HybridBinarizer(new BufferedImageLuminanceSource(ImageIO.read(new FileInputStream(filePath)))));
		Result qrCodeResult = new MultiFormatReader().decode(binaryBitmap);
		return qrCodeResult.getText();
	}

}
