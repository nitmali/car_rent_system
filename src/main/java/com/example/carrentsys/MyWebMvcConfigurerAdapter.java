package com.example.carrentsys;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MyWebMvcConfigurerAdapter extends WebMvcConfigurerAdapter {
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(new MyInterceptor())
//                .addPathPatterns("/**")
//                .excludePathPatterns("/",
//                        "/logout",
//                        "/adminLoginCheck",
//                        "/clientLoginCheck",
//                        "/adminRegister",
//                        "/clientRegister");
//        super.addInterceptors(registry);
//    }
}
