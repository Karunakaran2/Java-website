package com.karan.backend.retrofit;

import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by Sujith Mohan On 30-10-2019.
 */
public class ApiClient {
	//public static final String BASE_URL = "http://192.168.3.40:8081/mfpservices/";
	public static final String BASE_URL = "http://demo1.kran.in/assamfinanceservices/";

	public static Retrofit retrofit = null;

	static OkHttpClient okHttpClient = new OkHttpClient.Builder()
											.connectTimeout(1, TimeUnit.MINUTES)
											.readTimeout(6, TimeUnit.HOURS)
											.writeTimeout(6, TimeUnit.HOURS).build();

	public static Retrofit getRetrofitApiClient() {
		if (retrofit == null) {
			retrofit = new Retrofit.Builder().baseUrl(BASE_URL)
											 .client(okHttpClient)
											 .addConverterFactory(GsonConverterFactory.create()).build();
		}
		return retrofit;
	}

	public static Retrofit getRetrofitApiClient(String BASE_URL_FROM_ACTION) {
		retrofit = new Retrofit.Builder().baseUrl(BASE_URL_FROM_ACTION)
											.client(okHttpClient)
											.addConverterFactory(GsonConverterFactory.create())
											.build();

		return retrofit;
	}

}