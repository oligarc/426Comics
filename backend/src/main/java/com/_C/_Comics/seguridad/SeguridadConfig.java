package com._C._Comics.seguridad;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.Customizer;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

@Configuration
public class SeguridadConfig {

    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource) {
        JdbcUserDetailsManager manager = new JdbcUserDetailsManager(dataSource);

        // Query to get the users
        manager.setUsersByUsernameQuery(
                "select nick, password, active from user where nick = ?");

        // Query to get roles
        manager.setAuthoritiesByUsernameQuery(
                "SELECT u.nick, r.role FROM roles r " +
                        "INNER JOIN user u ON r.user_id = u.id " +
                        "WHERE u.nick = ?"
        );

        return manager;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(configurer ->
                configurer

                        .requestMatchers(HttpMethod.GET,
                                "/api/comics/",
                                "/api/comics/{id}",
                                "/api/comics/author/{authorName}",
                                "/api/comics/title/{title}",
                                "/api/comics/publisher/{publisherName}",
                                "/api/comics/isbn/{isbn}",
                                "/api/comics/page-range",
                                "/api/comics/price-range",
                                "/api/comics/stock-range",
                                "/api/authors/",
                                "/api/authors/id/{id}",
                                "/api/authors/name/{authorName}",
                                "/api/authors/nationality/{nationality}",
                                "/api/authors/birthdate/{startDate}/{endDate}",
                                "/api/authors/scripters",
                                "/api/authors/drawers",
                                "/api/publishers/",
                                "/api/publishers/name/{publisherName}",
                                "/api/publishers/postalCode/{postalCode}",
                                "/api/publishers/province/{province}",
                                "/api/publishers/town/{town}",
                                "/api/reviews/id/{comicId}",
                                "/api/reviews/name/{comicName}")
                        .permitAll()


                        .requestMatchers(HttpMethod.POST,
                                "/api/comics/",
                                "/api/authors/",
                                "/api/publishers/"
                                )
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/reviews/")
                        .hasAnyRole("ADMIN","USER")

                        .requestMatchers(HttpMethod.PUT,
                                "/api/comics/{id}",
                                "/api/authors/{id}",
                                "/api/publishers/{id}"
                        )
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.PUT,
                                "api/reviews/{id}")
                        .hasAnyRole("ADMIN","USER")

                        .requestMatchers(HttpMethod.DELETE,
                                "/api/comics/{id}",
                                "/api/authors/{id}",
                                "/api/publishers/{id}"
                        )
                        .hasRole("ADMIN")
        );


        http.csrf(csrf -> csrf.disable());
        http.httpBasic(Customizer.withDefaults());
        return http.build();
    }
}
