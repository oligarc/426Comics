package com._C._Comics.seguridad;

import com._C._Comics.jwt.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SeguridadConfig {

    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private AuthenticationProvider authProvider;

    public SeguridadConfig(JwtAuthenticationFilter jwtAuthenticationFilter, AuthenticationProvider authProvider) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.authProvider = authProvider;
    }

    //NEW
    //private final JwtTokenProvider jwtTokenProvider;

    //NEW
    /*public SeguridadConfig(JwtTokenProvider jwtTokenProvider){
        this.jwtTokenProvider = jwtTokenProvider;
    }
     */

    /*@Bean
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

    */


    //Needed to configure CORS to permit communication between front and back

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:5173"); // Front
        configuration.addAllowedMethod("*"); // Gonna authorize every method
        configuration.addAllowedHeader("*"); // Gonna authorize every header, just to include the auth
        configuration.setAllowCredentials(true); // Sets true for cookies and headers to be sent

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply CORS to every API route
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.cors().configurationSource(corsConfigurationSource()); //We apply the cors configuration in the filterChain
        //http.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
        http.authorizeHttpRequests(configurer ->
                configurer

                        .requestMatchers(HttpMethod.GET,
                                "/api/comics/",
                                "/api/comics/{id}",
                                "/api/comics/author/{authorName}",
                                "/api/comics/title/{title}",
                                "/api/comics/publisherId/{publisherId}",
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
                                "/api/publishers/nameWithId/{publisherId}",
                                "/api/publishers/postalCode/{postalCode}",
                                "/api/publishers/province/{province}",
                                "/api/publishers/town/{town}",
                                "/api/reviews/id/{comicId}",
                                "/api/reviews/name/{comicName}",
                                "api/auth/**",
                                "api/users/me",
                                "api/collection/has/{comicId}/{userId}",
                                "api/collection/get/{userId}",
                                "api/lista/all",
                                "api/lista/id/{id}",
                                "api/lista/userId/{userId}",
                                "api/listaComic/",
                                "/api/listaComic/listId/{id}",
                                "/api/listaComic/comicId/{id}",
                                "/api/comentarios/get/{listaId}"
                                )
                        .authenticated()

                        .requestMatchers(HttpMethod.POST,
                                "api/auth/login",
                                "api/auth/register").permitAll()

                        .requestMatchers(HttpMethod.POST,
                                "/api/prueba/saludo").authenticated()
                        .requestMatchers(HttpMethod.POST,
                                "/api/collection/add/{comicId}/{userId}").authenticated()
                        .requestMatchers(HttpMethod.POST,
                                "/api/reviews/").authenticated()
                        .requestMatchers(HttpMethod.POST,
                                "/api/lista/add").authenticated()
                        .requestMatchers(HttpMethod.POST,
                                "/api/listaComic/add/{listId}/{comicId}").authenticated()
                        .requestMatchers(HttpMethod.POST,
                                "/api/comentarios/add").authenticated()

                        .requestMatchers(HttpMethod.PUT,
                                "api/reviews/update/{id}").authenticated()

                        .requestMatchers(HttpMethod.DELETE,
                                "/api/collection/delete/{comicId}/{userId}").authenticated()

                        .requestMatchers(HttpMethod.DELETE,
                                "/api/reviews/delete/{id}").authenticated()
                        .requestMatchers(HttpMethod.DELETE,
                                "/api/lista/delete/{id}").authenticated()

                        .requestMatchers(HttpMethod.DELETE,
                                "/api/listaComic/delete/{listId}/{comicId}").authenticated()
                        .requestMatchers(HttpMethod.DELETE,
                                "/api/comentarios/delete/{comentarioId}/{listaId}").authenticated()


                        /*.requestMatchers(HttpMethod.POST,
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
                        .hasRole("ADMIN")*/
        ).sessionManagement(sessioManager ->
                sessioManager
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);


        http.csrf(csrf -> csrf.disable());
        http.httpBasic(Customizer.withDefaults());
        return http.build();
    }
}
