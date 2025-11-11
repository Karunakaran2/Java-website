package com.karan.backend.retrofit;


import com.karan.backend.conflogin.dto.UserBean;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.Headers;
import retrofit2.http.POST;

public interface ApiInterface {

	@POST("authenticate")
	Call<UserBean> authenticate(@Body UserBean userBean);

	@Headers({ "Content-Type: application/json;charset=UTF-8" })
	@POST("login/authenticateUser")
	Call<UserBean> authenticateUser(@Body UserBean userBean, @Header("Authorization") String sessionToken);


}