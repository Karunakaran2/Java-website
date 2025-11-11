package com.karan.backend.retrofit;

/**
 * Created by Sujith Mohan On 22-01-2020.
 */
public class ApiCalls {

	static ApiInterface apiInterface = ApiClient.getRetrofitApiClient().create(ApiInterface.class);
	String sessionToken;



}