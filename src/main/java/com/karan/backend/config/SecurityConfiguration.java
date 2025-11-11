package com.karan.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter.ReferrerPolicy;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.AnyRequestMatcher;

import com.karan.backend.conflogin.service.impl.CustomLoginServiceImpl;

@Configuration
@Order(2)
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private CustomLoginServiceImpl userDetailsService;

	@Autowired
	private CustomAuthenticationFailureHandler customAuthenticationFailureHandler;

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.antMatcher("/admin/**")
				.addFilterBefore(authenticationFilter(), UsernamePasswordAuthenticationFilter.class).authorizeRequests()
				.antMatchers("/","/favicon.ico", "/webjars/**", "/images/**", "/captcha/**", "/css/**",
						"/js/initializer/**", "/public/**", "/ui/**", "/website/**")
				.permitAll().anyRequest().authenticated().and().formLogin().failureUrl("/login?error=3") // Set a custom failure URL
				
				.failureHandler(customAuthenticationFailureHandler).loginPage("/admin/login").loginProcessingUrl("/admin/login").permitAll()
				.defaultSuccessUrl("/admin/dashboard", true).and().logout().invalidateHttpSession(true).clearAuthentication(true)
				.deleteCookies("JSESSONID").logoutRequestMatcher(new AntPathRequestMatcher("/admin/logout"))
				.logoutSuccessUrl("/login?logout").permitAll().and().headers().contentTypeOptions().disable().frameOptions().sameOrigin().and()
				.sessionManagement().maximumSessions(1).sessionRegistry(sessionRegistry()).expiredUrl("/admin/login?error=5");

		// HTTP Header - HTTP Strict Transport Security (HSTS)

		httpSecurity.headers().httpStrictTransportSecurity().requestMatcher(AnyRequestMatcher.INSTANCE)
				.includeSubDomains(true).maxAgeInSeconds(31536000);

		// To add X-XSS-Protection; tells the browser to block what looks like XSS.

//		httpSecurity.headers().xssProtection();

		// To specify which sources of content are allowed to be loaded by a web page

		httpSecurity.headers().contentSecurityPolicy(
				"default-src 'none'; connect-src 'self'; font-src 'self' data:;  form-action 'self'; frame-src 'self' blob:; img-src 'self' data:; object-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' ");

		// To specify what data is made available in the 'Referer' header.'Referer'
		// indicates the origin or web page URL the request was made from.

		httpSecurity.headers().referrerPolicy().policy(ReferrerPolicy.NO_REFERRER);

		// To disable exposing web server details in the reponse header.

//		httpSecurity.headers().addHeaderWriter(new StaticHeadersWriter("Server", "BLOCKED"));

	}

	public SimpleAuthenticationFilter authenticationFilter() throws Exception {
		SimpleAuthenticationFilter filter = new SimpleAuthenticationFilter();
		filter.setAuthenticationManager(authenticationManagerBean());
		filter.setAuthenticationFailureHandler(authenticationFailureHandler());
		return filter;
	}

	@Bean
	public AuthenticationFailureHandler authenticationFailureHandler() {
		return new CustomAuthenticationFailureHandler();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(authenticationProvider());
	}

	/*
	 * @Bean public PasswordEncoder passwordEncoder() { return new
	 * CustomPBKDF2PasswordEncoder(); }
	 */

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
		auth.setUserDetailsService(userDetailsService);
		auth.setPasswordEncoder(passwordEncoder());
		return auth;
	}

	/** TO-GET-SESSIONS-STORED-ON-SERVER */
	@Bean
	public SessionRegistry sessionRegistry() {
		return new SessionRegistryImpl();
	}

}