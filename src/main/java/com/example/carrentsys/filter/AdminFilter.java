package com.example.carrentsys.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;


@WebFilter(filterName = "AdminFilter", urlPatterns = "/manage/pages/*")
public class AdminFilter implements Filter {

    public void destroy() {
    }

    public void init(FilterConfig fConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        boolean flag = true;
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        String usertype = (String) request.getSession().getAttribute("usertype");
        String URI = request.getRequestURI();

        if (Objects.equals(usertype, "admin")) {
            flag = false;
        }

        if (URI.contains("login.html") || URI.contains("register.html")) {
            flag = false;
        }

        if (flag) {
            System.out.println("过滤器AdminFilter正在执行...");
            response.sendRedirect("/");
        } else {
            filterChain.doFilter(servletRequest, servletResponse);
        }

    }

}