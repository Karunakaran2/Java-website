var token = $('#_csrf').attr('content');
var header = $('#_csrf_header').attr('content');

window.addEventListener('DOMContentLoaded', event => {
	getGrievanceRequestpiechart();
	getGrievanceCategoryPieChart();
	getGrievanceregisteredLineChart();

});

function getGrievanceregisteredLineChart() {
	$.ajax({
		type: "GET",
		url: "/grievance/dashboard/getGrievanceRegisteredCountbyYear",
		success: function(result) {
			loadlinechart(result);
		}
	});
}

function getGrievanceCategoryPieChart(year) {
	$.ajax({
		type: "GET",
		url: "/grievance/dashboard/getGrievanceRequesCountByCategory?year=" + year,
		success: function(result) {
			loadCategorypiechart(result);
		}
	});
}

function getGrievanceRequestpiechart(year) {
	$.ajax({
		type: "GET",
		url: "/grievance/dashboard/getGrievanceRequestTotalCount?year=" + year,
		success: function(result) {
			loadCasefiledpiechart(result);
		}
	});
}
function loadlinechart(data) {
    var years = data.years; // Change from data.yearList to data.years
    var consentTypesData1 =  JSON.parse(data.consentTypesData1); // Remove JSON.parse

    Highcharts.chart('container3', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Year Wise Grievances'
        },
        subtitle: {
            text: ' Grievances Registered Across Each Year'
        },
        xAxis: {
            categories: years, // Set the years as x-axis categories
            title: {
                text: 'Year' // Set the x-axis title
            }
        },
        yAxis: {
            title: {
                text: 'Count'
            }
        },
        credits : {
			    enabled :false
		},
        tooltip: {
            formatter: function () {
                return '<strong>' + this.x + ': </strong>' + this.y;
            }
        },
        series: [{
            data: consentTypesData1[0].data
        }]
    });
}




//function loadlinechart(data) {
//    var years = data.yearList.split(',');
//    const grievanceData = JSON.parse(data.consentTypesData1);
//
//    Highcharts.chart('container4', {
//        chart: {
//            type: 'line'
//        },
//        title: {
//            text: 'Grievance Counts Over Years'
//        },
//        xAxis: {
//            categories: years,
//            title: {
//                text: 'Years'
//            }
//        },
//        yAxis: {
//            title: {
//                text: 'Grievance Count'
//            }
//        },
//        series: [{
//            name: 'Grievances',
//            data: grievanceData.data
//        }]
//    });
//}



function loadCasefiledpiechart(data) {

	const colors = Highcharts.getOptions().colors.map((c, i) =>

		Highcharts.color(Highcharts.getOptions().colors[0])

			.brighten((i - 3) / 7)

			.get()

	);

	Highcharts.chart('container2', {

		chart: {

			plotBackgroundColor: null,

			plotBorderWidth: null,

			plotShadow: false,

			type: 'pie'

		},

		title: {

			text: 'Grievant Type Wise Request',

			align: 'center'

		},
		subtitle: {
            text: 'Requests Categorized by Grievant Types'
        },

		tooltip: {

			pointFormat: '<b>{point.name} Request</b>: {point.y}'

		},
		credits : {
			    enabled :false
		},

		plotOptions: {

			pie: {

				allowPointSelect: true,

				cursor: 'pointer',

				colors,

				borderRadius: 5,

				dataLabels: {

					enabled: true,

					format: '<b>{point.name} Request</b>: {point.y}',

					distance: -50,

					filter: {

						property: 'percentage',

						operator: '>',

						value: 4

					}

				}

			}

		},

		series: [{

			name: 'Share',

			colorByPoint: true,

			data: data.map(item => ({

				name: item.requestType,

				y: item.count

			}))

		}]

	});

}



function loadCategorypiechart(data) {
  Highcharts.chart('container4', {
    chart: {
      type: 'column' // Change the chart type to 'column'
    },
    title: {
      text: 'Grievance Request Counts by Category' 
    },
    subtitle: {
            text: 'Grievance Request Counts Across Different Categories'
        },
    xAxis: {
      categories: JSON.parse(data.consentTypesData1).map(item => item.name), // Categories on the X-axis
      title: {
        text: ''
      }
    },
    yAxis: {
      title: {
        text: 'Counts'
      }
    },
    credits : {
			    enabled :false
		},
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}'
        }
      }
    },
    series: [{
      name: 'Categories',
      data: JSON.parse(data.consentTypesData1).map(item => item.y), // Counts on the Y-axis
      animation: {
        duration: 1000,
        easing: 'easeOutBounce'
      },
      colorByPoint: true,
      colors: [
        '#6A0572',
        '#FF5757',
        '#f15c80',
        '#FFD700',
        '#FFB74D',
        '#2196F3',
        '#9C27B0',
        '#4CAF50',
        '#FF6F61',
        '#FFD700',
        '#00A86B'
      ],
      enableMouseTracking: true
    }]
  });
}






























//Highcharts.chart('container', {
//	chart: {
//		plotBackgroundColor: null,
//		plotBorderWidth: null,
//		plotShadow: false,
//		type: 'pie'
//	},
//	title: {
//		text: 'Grievances by Complaint Category',
//		align: 'left'
//	},
//	subtitle: {
//		text: '[ Data populated based on above year selected ]',
//		align: 'left'
//	},
//	tooltip: {
//		pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//	},
//	accessibility: {
//		point: {
//			valueSuffix: '%'
//		}
//	},
//	plotOptions: {
//		pie: {
//			allowPointSelect: true,
//			cursor: 'pointer',
//			dataLabels: {
//				enabled: true,
//				format: '<b>{point.name}</b>: {point.percentage:.1f} %'
//			}
//		}
//	},
//	series: [{
//		name: 'Grievant Type',
//		colorByPoint: true,
//		data: [{
//			name: 'Delayed Process',
//			y: 7
//		}, {
//			name: 'Financial Irregularity',
//			y: 10
//		}, {
//			name: 'Pay and Benefits',
//			y: 8
//		}, {
//			name: 'Work Conditions',
//			y: 12,
//			sliced: true,
//			selected: true
//		}, {
//			name: 'Workload',
//			y: 5
//		}, {
//			name: 'Harrasment in Work place',
//			y: 6
//		}, {
//			name: 'Corruption',
//			y: 9
//		}, {
//			name: 'Administrative Irregularity',
//			y: 11
//		}, {
//			name: 'Bullying',
//			y: 4
//		}, {
//			name: 'Certification Issue',
//			y: 7
//		}, {
//			name: 'Misuse of Funds',
//			y: 6
//		}, {
//			name: 'Quality Issue',
//			y: 8
//		}, {
//			name: 'Service Matters',
//			y: 6
//		}, {
//			name: 'Others',
//			y: 6
//		}]
//	}]
//});
//
//
//
//
//
//var colors = Highcharts.getOptions().colors,
//	categories = [
//		'Public',
//		'Public - Anonymous',
//		'Units',
//		'SEEPZ Internal'
//	],
//	data = [
//		{
//			y: 25,
//			color: colors[2],
//			drilldown: {
//				name: 'Public',
//				categories: [
//					'Public Open',
//					'Public Closed'
//				],
//				data: [
//					22,
//					78
//				]
//			}
//		},
//		{
//			y: 25,
//			color: colors[3],
//			drilldown: {
//				name: 'Public - Anonymous',
//				categories: [
//					'Anonymous - Closed',
//					'Anonymous - Open'
//				],
//				data: [
//					58.5,
//					41.5
//				]
//			}
//		},
//		{
//			y: 25,
//			color: colors[5],
//			drilldown: {
//				name: 'Units',
//				categories: [
//					'Units - Closed',
//					'Units - Open'
//				],
//				data: [
//					77,
//					23
//				]
//			}
//		},
//		{
//			y: 25,
//			color: colors[1],
//			drilldown: {
//				name: 'SEEPZ - Internal',
//				categories: [
//					'Internal - Closed',
//					'Internal - Open'
//				],
//				data: [
//					60,
//					40
//				]
//			}
//		}
//	],
//	browserData = [],
//	versionsData = [],
//	i,
//	j,
//	dataLen = data.length,
//	drillDataLen,
//	brightness;
//
//
//// Build the data arrays
//for (i = 0; i < dataLen; i += 1) {
//
//	// add browser data
//	browserData.push({
//		name: categories[i],
//		y: data[i].y,
//		color: data[i].color
//	});
//
//	// add version data
//	drillDataLen = data[i].drilldown.data.length;
//	for (j = 0; j < drillDataLen; j += 1) {
//		brightness = 0.2 - (j / drillDataLen) / 5;
//		versionsData.push({
//			name: data[i].drilldown.categories[j],
//			y: data[i].drilldown.data[j],
//			color: Highcharts.color(data[i].color).brighten(brightness).get()
//		});
//	}
//}

// Create the chart
//Highcharts.chart('container2', {
//	chart: {
//		type: 'pie'
//	},
//	title: {
//		text: 'Grievant Type Wise Status',
//		align: 'left'
//	},
//	subtitle: {
//		text: '[ Data populated based on above year selected ]',
//		align: 'left'
//	},
//	plotOptions: {
//		pie: {
//			shadow: false,
//			center: ['50%', '50%']
//		}
//	},
//	tooltip: {
//		valueSuffix: '%'
//	},
//	series: [{
//		name: 'Grievance',
//		data: browserData,
//		size: '60%',
//		dataLabels: {
//			color: '#ffffff',
//			distance: -30
//		}
//	}, {
//		name: 'Versions',
//		data: versionsData,
//		size: '80%',
//		innerSize: '60%',
//		dataLabels: {
//			format: '<b>{point.name}:</b> <span style="opacity: 0.5">{y}%</span>',
//			filter: {
//				property: 'y',
//				operator: '>',
//				value: 1
//			},
//			style: {
//				fontWeight: 'normal'
//			}
//		},
//		id: 'versions'
//	}],
//	responsive: {
//		rules: [{
//			condition: {
//				maxWidth: 400
//			},
//			chartOptions: {
//				series: [{
//				}, {
//					id: 'versions',
//					dataLabels: {
//						enabled: false
//					}
//				}]
//			}
//		}]
//	}
//});


//HIGHCHARTS.CHART('CONTAINER3', {
//
//	TITLE: {
//		TEXT: 'TREND OF GRIEVANCES IN LAST 6 MONTHS',
//		ALIGN: 'LEFT'
//	},
//
//	SUBTITLE: {
//		TEXT: '[ LATEST 6 MONTHS DATA ]',
//		ALIGN: 'LEFT'
//	},
//
//	YAXIS: {
//		TITLE: {
//			TEXT: 'GRIEVANCE COUNT'
//		}
//	},
//
//	XAXIS: {
//		CATEGORIES: ['APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER'],
//		TITLE: {
//			TEXT: 'MONTHS'
//		},
//		ACCESSIBILITY: {
//			RANGEDESCRIPTION: 'RANGE: APRIL TO SEPTEMBER'
//		}
//	},
//
//	LEGEND: {
//		LAYOUT: 'VERTICAL',
//		ALIGN: 'RIGHT',
//		VERTICALALIGN: 'MIDDLE'
//	},
//
//	PLOTOPTIONS: {
//		SERIES: {
//			LABEL: {
//				CONNECTORALLOWED: FALSE
//			},
//		}
//	},
//
//	SERIES: [{
//		NAME: 'PUBLIC',
//		DATA: [215, 117, 201, 189, 199, 210]
//	}, {
//		NAME: 'PUBLIC - ANONYMOUS',
//		DATA: [51, 59, 40, 31, 61, 45]
//	}, {
//		NAME: 'UNITS',
//		DATA: [101, 77, 85, 64, 121, 99]
//	}, {
//		NAME: 'SEEPZ INTERNAL',
//		DATA: [20, 11, 10, 19, 7, 14]
//	}],
//
//	RESPONSIVE: {
//		RULES: [{
//			CONDITION: {
//				MAXWIDTH: 500
//			},
//			CHARTOPTIONS: {
//				LEGEND: {
//					LAYOUT: 'HORIZONTAL',
//					ALIGN: 'CENTER',
//					VERTICALALIGN: 'BOTTOM'
//				}
//			}
//		}]
//	}
//
//});

//const chart = Highcharts.chart('container4', {
//	title: {
//		text: 'Month wise SLA breached count',
//		align: 'left'
//	},
//	subtitle: {
//		text: '[ Data populated based on above year selected ]',
//		align: 'left'
//	},
//	colors: [
//		'#4caefe',
//		'#3fbdf3',
//		'#35c3e8',
//		'#2bc9dc',
//		'#20cfe1',
//		'#16d4e6',
//		'#0dd9db',
//		'#03dfd0',
//		'#00e4c5',
//		'#00e9ba',
//		'#00eeaf',
//		'#23e274'
//	],
//	xAxis: {
//		categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//	},
//	series: [{
//		type: 'column',
//		name: 'Grievance',
//		borderRadius: 5,
//		colorByPoint: true,
//		data: [33, 25, 40, 17, 21, 10, 35, 7,
//			15, 28, 9, 13],
//		showInLegend: false
//	}]
//});










