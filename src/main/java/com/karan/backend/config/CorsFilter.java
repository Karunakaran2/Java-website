package com.karan.backend.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

//@Component
@Component("customCorsFilter")
public class CorsFilter extends OncePerRequestFilter {


   @Override

   protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

       response.setHeader("Access-Control-Allow-Origin", "*");

       response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

       response.setHeader("Access-Control-Max-Age", "3600");

       response.setHeader("Access-Control-Allow-Headers", "authorization, content-type, xsrf-token");

       response.addHeader("Access-Control-Expose-Headers", "xsrf-token");

       response.setHeader("Referrer-Policy", "same-origin");

       response.setHeader("Strict-Transport-Security","max-age=31536000; includeSubDomains; preload");
       
       response.setHeader("X-Frame-Options", "same-origin"); // or "SAMEORIGIN" as per your requirement

       if ("OPTIONS".equals(request.getMethod())) {

           response.setStatus(HttpServletResponse.SC_OK);

       } else { 

           filterChain.doFilter(request, response);

       }

   }

}