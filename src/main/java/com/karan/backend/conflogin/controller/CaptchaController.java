package com.karan.backend.conflogin.controller;

import java.awt.Color;
import java.awt.Font;
import java.awt.GradientPaint;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.context.annotation.Scope;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("captcha")
@Scope("prototype")
public class CaptchaController {
	private Random randomPassword = new Random();
	@GetMapping(value = "getCaptcha", produces = MediaType.IMAGE_PNG_VALUE)
	@ResponseBody
	public byte[] getCaptcha(HttpServletRequest request, HttpServletResponse response) throws IOException {
		HttpSession session = request.getSession(true);

		int i = randomPassword.nextInt(100000);

		String no = "" + i + "";
		int width = 75;
		int height = 20;
		
		BufferedImage bufferedImage = new BufferedImage(75, 20, 1);
		Graphics2D g2d = bufferedImage.createGraphics();
		
		Font font = new Font("Helvetica", 0, 14);
		g2d.setFont(font);
		
		RenderingHints rh = new RenderingHints(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		rh.put(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
		g2d.setRenderingHints(rh);
		GradientPaint gp = new GradientPaint(0.0F, 0.0F, new Color(238, 238, 238), 0.0F, height / 2f,
				new Color(238, 238, 238), true);
		g2d.setPaint(gp);
		g2d.fillRect(0, 0, width, height);
		g2d.setColor(Color.BLACK);
		char[] digits = no.toCharArray();
		
		int x = 0;
		int y = 20;
		for (int c = 0; c < digits.length; c++) {
			x += 12;
			y -= 3;
			if (c % 2 == 0) {
				g2d.rotate(Math.toRadians(3.0D));
			} else {
				g2d.rotate(Math.toRadians(0.0D));
			}
			g2d.drawChars(digits, c, 1, x, y);
		}
		g2d.dispose();

		try {
			ByteArrayOutputStream output = new ByteArrayOutputStream();
			ImageIO.write(bufferedImage, "png", output);

			session.setAttribute("captcha", no);
			return output.toByteArray();
		} catch (IOException ex) {
			return null;
		}
	}

}
