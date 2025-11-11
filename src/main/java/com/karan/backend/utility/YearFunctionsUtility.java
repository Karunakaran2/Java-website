package com.karan.backend.utility;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Data;

@Data
public class YearFunctionsUtility {

		List<String> yearlist;

		public List<String> years(int startYear) {
			if (startYear == 0) {
				startYear = 2015;
			}

			String currentmonth = new SimpleDateFormat("MM").format(new Date());
			String currentyear = new SimpleDateFormat("yyyy").format(new Date());
			Integer currentyears;
			if (Integer.parseInt(currentmonth) < 4) {
				currentyears = Integer.parseInt(currentyear) - 1;
			} else {
				currentyears = Integer.parseInt(currentyear);
			}
			DecimalFormat df = new DecimalFormat("00");

			yearlist = new ArrayList<String>();
			/*for (int i = startYear, j = (startYear % 100); i <= (currentyears + 1); i++, j++) {
				yearlist.add(i + "-" + df.format(j + 1));
			}*/
			int j;
			for (int i = startYear; i <= (currentyears + 1); i++) {
				j=i+1;
				yearlist.add(i + "-" + j);
			}
			return yearlist;
		}
public String currentFinancialYear()
{
	String currentFinYear;
	int year = Calendar.getInstance().get(Calendar.YEAR);

    int month = Calendar.getInstance().get(Calendar.MONTH) + 1;
    //System.out.println("Financial month : " + month);
    if (month < 4) {
    	currentFinYear= (year - 1) + "-" + year;
    } else {
    	currentFinYear= year + "-" + (year + 1);
    }
	return currentFinYear;
}
		//
		String[] belowTens = { "", " One", " Two", " Three", " Four", " Five", " Six", " Seven", " Eight", " Nine", " Ten",
				" Eleven", " Twelve", " Thirteen", " Fourteen", " Fifteen", " Sixteen", " Seventeen", " Eighteen",
				" Nineteen" };
		String[] tens = { "", "Ten", " Twenty", " Thirty", " Forty", " Fifty", " Sixty", " Seventy", " Eighty", " Ninety" };
		String[] aboveTens = { "", " Hundred", " Thousand", " Lakh", " Crore", "Hundred Crore" };

		public String IntegerIntoWords(int num) {
			String Str = "", ltr = "";
			int len = 0, q = 0, r = 0;
			while (num > 0) {
				len = numberCount(num);
				// ***TAKE THE LENGTH OF THE NUMBER AND DO LETTER CONVERSION***//
				switch (len) {
				case 9:
				case 8:
					q = num / 10000000;
					r = num % 10000000;
					ltr = twoDigits(q);
					Str = Str + ltr + aboveTens[4];
					num = r;
					break;
				case 7:
				case 6:
					q = num / 100000;
					r = num % 100000;
					ltr = twoDigits(q);
					Str = Str + ltr + aboveTens[3];
					num = r;
					break;

				case 5:
				case 4:

					q = num / 1000;
					r = num % 1000;
					ltr = twoDigits(q);
					Str = Str + ltr + aboveTens[2];
					num = r;
					break;
				case 3:
					if (len == 3) {
						r = num;
					}
					ltr = threeDigits(r);
					Str = Str + ltr;
					num = 0;
					break;
				case 2:

					ltr = twoDigits(num);
					Str = Str + ltr;
					num = 0;
					break;
				case 1:
					Str = Str + belowTens[num];
					num = 0;
					break;
				default:
					num = 0;
				}
				if (num == 0) {
					// System.out.println(Str);
				}
			}
			return Str;
		}

		public String ToWords(Double num1) {
			int num = num1.intValue();
			String Str = "", ltr = "";
			int len = 0, q = 0, r = 0;
			while (num > 0) {
				len = numberCount(num);
				// ***TAKE THE LENGTH OF THE NUMBER AND DO LETTER CONVERSION***//
				switch (len) {
				case 11:
				case 10:
					q = num / 1000000000;
					r = num % 1000000000;
					ltr = twoDigits(q);
					Str = Str + ltr + aboveTens[4];
					num = r;
					break;
				case 9:
				case 8:
					q = num / 10000000;
					r = num % 10000000;
					ltr = twoDigits(q);
					Str = Str + ltr + aboveTens[4];
					num = r;
					break;
				case 7:
				case 6:
					q = num / 100000;
					r = num % 100000;
					ltr = twoDigits(q);
					Str = Str + ltr + aboveTens[3];
					num = r;
					break;

				case 5:
				case 4:

					q = num / 1000;
					r = num % 1000;
					ltr = twoDigits(q);
					Str = Str + ltr + aboveTens[2];
					num = r;
					break;
				case 3:
					if (len == 3) {
						r = num;
					}
					ltr = threeDigits(r);
					Str = Str + ltr;
					num = 0;
					break;
				case 2:

					ltr = twoDigits(num);
					Str = Str + ltr;
					num = 0;
					break;
				case 1:
					Str = Str + belowTens[num];
					num = 0;
					break;
				default:
					num = 0;
				}
				if (num == 0) {
				}
			}
			return Str;
		}

		// *****FOR-VALUES-OUT-OF-INT-RANGE*****//
		public String IntoWords(Double bigValue) {
			String amountInWords = "";


			int amntAboveCrore = (int) (bigValue.longValue() / 1E7);
			int amntBelowCrore;
			if (amntAboveCrore > 0) {
				amountInWords = IntegerIntoWords(amntAboveCrore) + " Crore";
				amntBelowCrore = (int) (bigValue.longValue() % 1E7);
			} else {
				amntBelowCrore = (int) (bigValue.longValue());
			}
			amountInWords += IntegerIntoWords(amntBelowCrore);

			return amountInWords;
		}

		public String BigIntoWords(Object bigValue) {
			Double doubleValue = 0d;
			if (bigValue instanceof BigInteger) {
				BigInteger value = new BigInteger(bigValue.toString());
				doubleValue = value.doubleValue();
			} else if (bigValue instanceof BigDecimal) {
				BigDecimal value = new BigDecimal(bigValue.toString());
				doubleValue = value.doubleValue();
			}
			return IntoWords(doubleValue);
		}

		int numberCount(int num) {
			int cnt = 0;
			while (num > 0) {
				cnt++;
				num = num / 10;
			}
			return cnt;
		}

		// ***METHOD FOR CONVERSION OF TWO DIGITS***//
		String twoDigits(int numq) {
			int numr, nq;
			String ltr = "";
			nq = numq / 10;
			numr = numq % 10;

			if (numq > 19) {
				ltr = ltr + tens[nq] + belowTens[numr];
			} else {
				ltr = ltr + belowTens[numq];
			}
			return ltr;
		}

		// ***METHOD FOR CONVERSION OF THREE DIGITS***//
		String threeDigits(int numq) {
			int numr, nq;
			String ltr = "";
			nq = numq / 100;
			numr = numq % 100;
			if (numr == 0) {
				ltr = ltr + belowTens[nq] + aboveTens[1];
			} else {
				ltr = ltr + belowTens[nq] + aboveTens[1] + " and" + twoDigits(numr);
			}
			return ltr;
		}

		/*
		 * public static void main(String[] args) { Double totalValue =
		 * Double.parseDouble(new DecimalFormat("###0.00000") .format(500.456)); Double
		 * totalInRs = totalValue ;
		 *
		 * AmountInWords amountInWords = new AmountInWords();
		 * System.out.println(amountInWords.IntoWords(totalInRs)); }
		 */
		public String generateToken() {
			String key = "655468576D5A7134743777217A25432A462D4A404E635266556A586E32723575";
			// This key is used inside superset. see step 2 security.py file

			String token = Jwts.builder().claim("user_name", "public_user")
					// provide a username as you wish but you have to create this user inside
					// superset with a strong password and allocate appropriate viewer privileges
					.setExpiration(Date.from(LocalDateTime.now(ZoneOffset.UTC).plusMinutes(30).toInstant(ZoneOffset.UTC)))
					// The token generated will expire after 30 mins
					.signWith(SignatureAlgorithm.HS256, key.getBytes(StandardCharsets.UTF_8)).compact();

			return token;
		}

		public String getFinancialYearFromDate(String finYear) throws ParseException {

			String currentyear = finYear.split("-")[0];
			return new SimpleDateFormat("dd/MM/yyyy").format(new SimpleDateFormat("dd-MM-yyyy").parse("01-04-" + currentyear));
		}

		public String getFinancialYearToDate(String finYear) throws ParseException {

			String currentyear = finYear.split("-")[1];
			return new SimpleDateFormat("yyyy-MM-dd").format(new SimpleDateFormat("dd-MM-yyyy").parse("31-03-" + currentyear));
		}



		/**
		 * @method : getCurrentFinancialYear
		 * @author : Arun
		 * @summary: To fetch current financial year
		 **/
		public String getCurrentFinancialYear() {
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
		public ArrayList<String> getQuarterList(String finYear) throws ParseException {
			String finStartDate,finEndDate;
			Date startDate,endDate;
			finStartDate = getFinancialYearFromDate(finYear);
			finEndDate = getFinancialYearToDate(finYear);
			startDate = new SimpleDateFormat("yyyy-MM-dd").parse(finStartDate);
			endDate = new SimpleDateFormat("yyyy-MM-dd").parse(finEndDate);
			ArrayList<String> scheduleList = new ArrayList<>();
			//Date start,end;
			for(int i=1;i<=4;i++)
			{
				startDate = getFirstDayOfQuarter(startDate);
				endDate = getLastDayOfQuarter(startDate);
				scheduleList.add(("Schedule for "+startDate.getMonth()+" to "+endDate.getMonth()));
			}
			System.out.println();
			return null;

		}
		private static Date getFirstDayOfQuarter(Date date) {
		    Calendar cal = Calendar.getInstance();
		    cal.setTime(date);
		    cal.set(Calendar.DAY_OF_MONTH, 1);
		    cal.set(Calendar.MONTH, cal.get(Calendar.MONTH)/3 * 3);
		    return cal.getTime();
		}

		private static Date getLastDayOfQuarter(Date date) {
		    Calendar cal = Calendar.getInstance();
		    cal.setTime(date);
		    cal.set(Calendar.DAY_OF_MONTH, 1);
		    cal.set(Calendar.MONTH, cal.get(Calendar.MONTH)/3 * 3 + 2);
		    cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		    return cal.getTime();
		}
	}



