package com.karan.backend.config;

import java.text.ParseException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.format.AnnotationFormatterFactory;
import org.springframework.format.Formatter;
import org.springframework.format.Parser;
import org.springframework.format.Printer;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class UnMaskParamAnnotationFormatterFactory
        implements AnnotationFormatterFactory<UnMaskParam> {

    @Override
    public Set<Class<?>> getFieldTypes() {
        Set<Class<?>> fieldTypes = new HashSet<>();
        fieldTypes.add(Integer.class);
        fieldTypes.add(Long.class);
        fieldTypes.add(String.class);
        return Collections.unmodifiableSet(fieldTypes);
    }

    @Override
    public Printer<?> getPrinter(UnMaskParam annotation, Class<?> fieldType) {
        return configureFormatterFrom(annotation, fieldType);
    }

    @Override
    public Parser<?> getParser(UnMaskParam annotation, Class<?> fieldType) {
        return configureFormatterFrom(annotation, fieldType);
    }

    private Formatter<?> configureFormatterFrom(UnMaskParam annotation, Class<?> fieldType) {
        return new Formatter<Object>() {

            @Override
            public String print(Object object, Locale locale) {
                return object.toString();
            }

            @Override
            public Object parse(String text, Locale locale) throws ParseException {
                if (text != null && !text.isBlank()) {
                    ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder
                            .currentRequestAttributes();
                    // Get the current request object
                    HttpServletRequest request = attr.getRequest();
                    // Get the session object from the request object
                    HttpSession session = request.getSession();
                    String target = request.getRequestURI();

                    Map<String, String> map = (Map<String, String>) session.getAttribute(text);

                    String key = map.keySet().iterator().next();
                    String param = null;
                    if (key.equals("none")) {
                        param = map.get(key);
                    } else if (target.contains(key)) {
                        param = map.get(key);
                    } else {
                    }
                    if (param != null) {
                        if (fieldType.equals(Integer.class)) {
                            return Integer.parseInt(param);
                        } else if (fieldType.equals(Long.class)) {
                            return Long.parseLong(param);
                        } else {
                            return param;
                        }
                    }

                }
                return text;
            }

        };
    }

}
