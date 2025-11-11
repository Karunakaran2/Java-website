package com.karan.backend.utility;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.karan.backend.conflogin.dto.UserBean;

public class Utility {

	public static ArrayList<LabelValueBean> getMonthIdList() {
		ArrayList<LabelValueBean> monthIdList = new ArrayList<LabelValueBean>();
		monthIdList.add(new LabelValueBean(1, "January"));
		monthIdList.add(new LabelValueBean(2, "February"));
		monthIdList.add(new LabelValueBean(3, "March"));
		monthIdList.add(new LabelValueBean(4, "April"));
		monthIdList.add(new LabelValueBean(5, "May"));
		monthIdList.add(new LabelValueBean(6, "June"));
		monthIdList.add(new LabelValueBean(7, "July"));
		monthIdList.add(new LabelValueBean(8, "August"));
		monthIdList.add(new LabelValueBean(9, "September"));
		monthIdList.add(new LabelValueBean(10, "October"));
		monthIdList.add(new LabelValueBean(11, "November"));
		monthIdList.add(new LabelValueBean(12, "December"));
		return monthIdList;
	}

	public static Integer getCurrentYear() {
		String currentyear = new SimpleDateFormat("yyyy").format(new Date());
		Integer currentyears;
		currentyears = Integer.parseInt(currentyear);
		return currentyears;
	}

	public static ArrayList<LabelValueBean> yearlist() {
		ArrayList<LabelValueBean> yearlist = new ArrayList<LabelValueBean>();
		String currentyear = new SimpleDateFormat("yyyy").format(new Date());
		Integer currentyears;
		currentyears = Integer.parseInt(currentyear);
		for (int i = 2015; i <= currentyears; i++) {
			yearlist.add(new LabelValueBean(i, i + ""));
		}
		return yearlist;
	}

	public static Date incrementDateByYear(int increase, Date inputDate) {
		Calendar c = Calendar.getInstance();
		c.setTime(inputDate);
		c.add(Calendar.YEAR, increase); // number of days to add
		return c.getTime();
	}

	public static String convertToDDmmYYYY(Date inputDate) {
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
		return sdf.format(inputDate);
	}

	public static long getDifferenceDays(Date d1, Date d2) {
		long diff = d2.getTime() - d1.getTime();
		return TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
	}

	public static List<Integer> yearList() {
		String currentyear = new SimpleDateFormat("yyyy").format(new Date());
		Integer currentyears;
		currentyears = Integer.parseInt(currentyear);
		List<Integer> yearlist = new ArrayList<Integer>();
		for (int i = 2021; i <= currentyears; i++) {
			yearlist.add(i);
		}
		return yearlist;
	}

	static List<String> yearlist;
	public static List<String> finYearList() {

		String currentmonth = new SimpleDateFormat("MM").format(new Date());
		String currentyear = new SimpleDateFormat("yyyy").format(new Date());
		Integer currentyears;
		if (Integer.parseInt(currentmonth) < 4) {
			currentyears = Integer.parseInt(currentyear) - 1;
		} else {
			currentyears = Integer.parseInt(currentyear);
		}
		yearlist = new ArrayList<String>();
		for (int i = 2021, j = 21; i <= (currentyears + 1); i++, j++) {
			yearlist.add(i + "-" + (j + 1));
		}
		return yearlist;
	}

	public static String getCurrentFinancialYear() {

		String currentmonth = new SimpleDateFormat("MM").format(new Date());
		String currentyear = new SimpleDateFormat("yyyy").format(new Date());
		String currentyear1 = new SimpleDateFormat("yy").format(new Date());
		Integer currentyears;
		if (Integer.parseInt(currentmonth) < 4) {
			currentyears = Integer.parseInt(currentyear) - 1;
			currentyear1 = Integer.parseInt(currentyear1) - 1 + "";
		} else {
			currentyears = Integer.parseInt(currentyear);
		}
		currentyear = currentyears + "";
		Integer nextyear = (Integer.parseInt(currentyear1)) + 1;
		return currentyear + "-" + nextyear;
	}

}
