package com.karan.backend.config;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class MaskParam {

    private HttpSession session;

    public MaskParam() {
        // Get the current request attributes
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        // Get the current request object
        HttpServletRequest request = attr.getRequest();
        // Get the session object from the request object
        this.session = request.getSession();
    }

    public String mask(String target, String param) {
        String uuid = UUID.randomUUID().toString();
        Map<String, String> map = new HashMap<>();
        if (target == null) {
            target = "none";
        }
        map.put(target, param);
        session.setAttribute(uuid, map);
        return uuid;
    }

}
