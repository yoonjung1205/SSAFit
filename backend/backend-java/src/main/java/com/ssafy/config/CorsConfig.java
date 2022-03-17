package com.ssafy.config;

import com.ssafy.common.util.JwtTokenUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

public class CorsConfig {
   private final List<String> allowedOrigins = Arrays.asList("http://localhost:3000");

   public CorsFilter corsFilter() {
      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      CorsConfiguration config = new CorsConfiguration();
      config.setAllowCredentials(true);
      config.addAllowedHeader("*");  // Access-Control-Request-Headers
      config.addAllowedMethod("*"); // Access-Control-Request-Method
      config.setAllowedOrigins(allowedOrigins);
      config.addExposedHeader(JwtTokenUtil.HEADER_STRING);
      config.setMaxAge(3600L);
      source.registerCorsConfiguration("/**", config);
      return new CorsFilter(source);
   }

}
