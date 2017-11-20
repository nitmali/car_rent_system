package com.example.carrentsys.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Objects;

public class MyInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        String usertype = (String) httpServletRequest.getSession().getAttribute("usertype");
        String uri = httpServletRequest.getRequestURI();
        if (usertype == null) {
            httpServletResponse.sendRedirect("/");
            return false;
        } else if (Objects.equals(usertype, "client") && uri.matches("/manage/(.*)")) {
            httpServletResponse.sendRedirect("/");
            return false;
        } else {
            return true;
        }
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
