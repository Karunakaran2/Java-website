var canvas = document.getElementById("pieChart");
Chart.defaults.global.defaultFontFamily = "Marcellus";
  Chart.defaults.global.defaultFontSize = 14;
var ctx = canvas.getContext('2d');

Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontSize = 16;
Chart.defaults.global.legend.position = 'left';
Chart.defaults.global.legend.labels.usePointStyle = false;
Chart.defaults.global.legend.labels.boxWidth = 15;
var theHelp = Chart.helpers;

var data = {
  labels: [" Industries Area. ", " Services Consult."," Customer Satisfy."],
  datasets: [{
    fill: true,
    backgroundColor: [
      '#ADC5E4',
      '#DAE6F2',
      '#CADAE9',
    ],
    data: [90, 95, 90],
  }]
};

var options = {
  rotation: -0.5 * Math.PI,
  legend: {
    display: true,
    
    // generateLabels changes from chart to chart,  check the source, 
    // this one is from the doughut :
    // https://github.com/chartjs/Chart.js/blob/master/src/controllers/controller.doughnut.js#L42
    labels: {
      generateLabels: function(chart) {
        var data = chart.data;
        if (data.labels.length && data.datasets.length) {
          return data.labels.map(function(label, i) {
            var meta = chart.getDatasetMeta(0);
            var ds = data.datasets[0];
            var arc = meta.data[i];
            var custom = arc && arc.custom || {};
            var getValueAtIndexOrDefault = theHelp.getValueAtIndexOrDefault;
            var arcOpts = chart.options.elements.arc;
            var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
            var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
            var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
              return {
              // And finally : 
              text: label,
              fillStyle: fill,
              lineWidth: bw,
              hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
              index: i
            };
          });
        }
        return [];
      }
    }
  }
};

// Chart declaration:
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: data,
  options: options
});

console.log(myPieChart.generateLegend());



//Plugin from githubExample:
//https://github.com/chartjs/Chart.js/blob/master/samples/data_labelling.html


Chart.plugins.register({
  afterDatasetsDraw: function(chartInstance, easing) {
    // To only draw at the end of animation, check for easing === 1
    var ctx = chartInstance.chart.ctx;
    chartInstance.data.datasets.forEach(function(dataset, i) {
      var meta = chartInstance.getDatasetMeta(i);
      if (!meta.hidden) {
        meta.data.forEach(function(element, index) {
          // Draw the text in black, with the specified font
          ctx.fillStyle = '#0D1720';
          var fontSize = 14;
          var fontStyle = 'bold';
          var fontFamily = 'Marcellus';
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
          // Just naively convert to string for now
          var dataString = dataset.data[index].toString();
          // Make sure alignment settings are correct
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var padding = 0;
          var position = element.tooltipPosition();
          ctx.fillText(dataString + '%', position.x, position.y - (fontSize / 2) - padding);
        });
      }
    });
  }
});
