package com.example.carrentsys.configurer;

import com.example.carrentsys.interceptor.MyInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MyWebMvcConfigurerAdapter extends WebMvcConfigurerAdapter {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new MyInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/",
                        "/logout",
                        "/api/login/{usertype}",
                        "/adminRegister",
                        "/clientRegister");
        super.addInterceptors(registry);
    }
}
