package com.karan.backend.portal.exception;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request, Model model) {
        String path = (String) request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI);
        Integer status = (Integer) request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        model.addAttribute("statusCode", status);

        if (path != null && path.startsWith("/admin")) {
            return "/karan/admin/error/fallback";
        } else {
            return "error/404";
        }
    }
}