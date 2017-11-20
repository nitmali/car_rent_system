package com.example.carrentsys.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "ClientFilter", urlPatterns = "/user/pages/profile.html")
public class ClientFilter implements Filter {

    public void destroy() {
    }

    public void init(FilterConfig fConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        boolean flag = true;
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        if (request.getSession().getAttribute("username") != null) {
            if (request.getSession().getAttribute("usertype") != "admin") {
                flag = false;
            }
        }

        if (flag) {
            System.out.println("过滤器ServletFilter正在执行...");
            response.sendRedirect("/");
        } else {
            filterChain.doFilter(servletRequest, servletResponse);
        }

    }

}