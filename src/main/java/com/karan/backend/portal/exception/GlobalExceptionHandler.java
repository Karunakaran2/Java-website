package com.karan.backend.portal.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;
import org.thymeleaf.exceptions.TemplateProcessingException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({TemplateProcessingException.class})
    public ModelAndView handleTemplateError(Exception ex) {
        ModelAndView mav = new ModelAndView("error/400");
        mav.addObject("message", "Template error occurred: " + ex.getMessage());
        return mav;
    }
}