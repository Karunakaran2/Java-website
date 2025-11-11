package com.karan.backend.retrofit;

import java.util.Map;

import com.karan.backend.conflogin.dto.UserBean;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Created by Sujith Mohan On 30-10-2019.
 */
public class BearerToken {
	static String sessionToken=null;
    static ApiInterface apiInterface = ApiClient.getRetrofitApiClient().create(ApiInterface.class);
    
    /**
	 * For Getting the authentication string(BearerToken) from TSG Micro Services.
	 * and setting it to session.
	 */
	public static void getBearerTokenAsync(Map<String, Object> session) {
		UserBean loginmodel = new UserBean();
		loginmodel.setUserName("sujith");
		loginmodel.setPassword("@Sujith1511");
		/* For Retrofit Asynchronous Call */
		Call<UserBean> applogmodel = apiInterface.authenticate(loginmodel);
		applogmodel.enqueue(new Callback<UserBean>() {
			@Override
			public void onResponse(Call<UserBean> call, Response<UserBean> response) {
				if (response.code() == 401) {
					// Invalid Request.
				} else {
					UserBean response_model = response.body();
					sessionToken = response_model.getSessionToken();
					session.put("sessionToken", sessionToken);
				}
			}
			@Override
			public void onFailure(Call<UserBean> call, Throwable t) {
				// Request Failed.
			}
		});
	}
	
	public static String getBearerTokenSync(Map<String, Object> session) {
		String sessionToken = null;
		UserBean loginmodel = new UserBean();
		loginmodel.setUserName("sujith");
		loginmodel.setPassword("@Sujith1511");
		/* For Retrofit Synchronous Call */
		try {
			Call<UserBean> applogmodel = apiInterface.authenticate(loginmodel);
			Response<UserBean> response = applogmodel.execute();
			UserBean response_model = response.body();
			sessionToken = response_model.getSessionToken();
			session.put("sessionToken", sessionToken);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sessionToken;
	}

	public static String getBearerTokenWithoutSession() {
		String sessionToken = null;
		UserBean loginmodel = new UserBean();
		loginmodel.setUserName("sujith");
		loginmodel.setPassword("@Sujith1511");
		/* For Retrofit Synchronous Call */
		try {
			Call<UserBean> applogmodel = apiInterface.authenticate(loginmodel);
			Response<UserBean> response = applogmodel.execute();
			UserBean response_model = response.body();
			sessionToken = response_model.getSessionToken();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sessionToken;
	}  

}