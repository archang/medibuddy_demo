//  $(document).ready(function () {

//       var data = [];
//       for (var i = 0; i < 720; i++) {
//         var base = .63*500000*.0833*(Math.pow(Math.E,(-0.00522*i))-Math.pow(Math.E,(-0.0833*i)))/67000/(.0833-0.00522)
//         if (i >= 120) {
//         	base += .63*250000*.0833*(Math.pow(Math.E,(-0.00522*(i-120)))-Math.pow(Math.E,(-0.0833*(i-120))))/67000/(.0833-0.00522)
//         }
//         if (i >= 360) {
//         	base += .63*500000*.0833*(Math.pow(Math.E,(-0.00522*(i-360)))-Math.pow(Math.E,(-0.0833*(i-360))))/67000/(.0833-0.00522)
//         }
//         data.push([i, base, base]);
//       }
//
//       // Shift one portion out of line.
//       // var highlight_start = 450;
//       // var highlight_end = 500;
//       // for (var i = highlight_start; i <= highlight_end; i++) {
//       //   data[i][2] += 5.0;
//       // }

//       new Dygraph(
//           document.getElementById("tylenol_graph"),
//           data,
//           {
//             labels: ['X', 'Est.', 'Actual'],
//             animatedZooms: true,
//             underlayCallback: function(canvas, area, g) {
//               // var bottom_left = g.toDomCoords(highlight_start, -20);
//               // var top_right = g.toDomCoords(highlight_end, +20);

//               // var left = bottom_left[0];
//               // var right = top_right[0];

//               canvas.fillStyle = "rgba(255, 255, 102, 1.0)";
//               // canvas.fillRect(left, area.y, right - left, area.h);
//             }

//           }
//       );
//     }
// );

function newTab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
  var dosage_history_amount = [];
  var dosage_history_time = [];
  var tylenol_therapeutic_range = [3,100];

function apply_dose(weight, height_ft, height_inch, drug, dose_amount, dose_time) {

if (weight.value == "0" || height_ft.value == "0" || height_inch.value == "0") {
  // alert
  console.log("nope");
}

  var data_tylenol = [];
  var data_alcohol = [];
  dosage_history_amount[dosage_history_amount.length] = dose_amount.value;
  dosage_history_time[dosage_history_time.length] = dose_time.value;
  var base_tylenol;

      for (var i = 0; i < 720; i++) {
        if (i >= dosage_history_time[0]) {
          base_tylenol = .63*(150/weight.value)*dosage_history_amount[0]*.0833*(Math.pow(Math.E,(-0.00522*(i-dosage_history_time[0])))-Math.pow(Math.E,(-0.0833*(i-dosage_history_time[0]))))/67000/(.0833-0.00522)
        }
        for (var j = 1; j < dosage_history_amount.length; j++) {
          if (i >= dosage_history_time[j]) {
            base_tylenol += .63*(150/weight.value)*dosage_history_amount[j]*.0833*(Math.pow(Math.E,(-0.00522*(i-dosage_history_time[j])))-Math.pow(Math.E,(-0.0833*(i-dosage_history_time[j]))))/67000/(.0833-0.00522)
          }
        }

        
        //   if (i >= dose_time.value) {
        //     base += .63*dose_amount.value*.0833*(Math.pow(Math.E,(-0.00522*(i-dose_time.value)))-Math.pow(Math.E,(-0.0833*(i-dose_time.value))))/67000/(.0833-0.00522)
        // }
        // if (i >= dose_time.value) {
        //   base = .63*dose_amount.value*.0833*(Math.pow(Math.E,(-0.00522*(i-360)))-Math.pow(Math.E,(-0.0833*(i-360))))/67000/(.0833-0.00522)          
        // }
        // var base = .63*500000*.0833*(Math.pow(Math.E,(-0.00522*i))-Math.pow(Math.E,(-0.0833*i)))/67000/(.0833-0.00522)
        
        // if (i >= 360) {
        //   base += .63*500000*.0833*(Math.pow(Math.E,(-0.00522*(i-360)))-Math.pow(Math.E,(-0.0833*(i-360))))/67000/(.0833-0.00522)
        // }
        // if (i >= dose_time.value) {
        //   base += .63*dose_amount.value*.0833*(Math.pow(Math.E,(-0.00522*(i-360)))-Math.pow(Math.E,(-0.0833*(i-360))))/67000/(.0833-0.00522)          
        // }
        data_tylenol.push([i, base_tylenol, base_tylenol]);
      }

      // var test;
      // test = document.getElementById("tylenol_history");
      // console.log(test);

      console.log(drug.value);
      // console.log("dose amount = " + dose_amount.value);
      // console.log("dose time = " + dose_time.value);
      // console.log("dosage_history_amount = [" + dosage_history_amount + "]");
      // console.log("dosage_history_time = [" + dosage_history_time + "]");

      // Shift one portion out of line.
      var highlight_start = 3;
      var highlight_end = 300;
      var toxic_highlight_top = 1000000000;

      // toxicCheckboxValue = document.getElementById("showToxicCheckbox").checked;

      // for (var i = highlight_start; i <= highlight_end; i++) {
      //   data[i][2] += 5.0;
      // }

      graph = new Dygraph(
          document.getElementById("tylenol_graph"),
          data_tylenol,
          {
            labels: ['X', 'Est.', 'Actual'],
            ylabel: 'mcg/ml',
            xlabel: 'minutes',
            animatedZooms: true,
            
            underlayCallback: function(canvas, area, g) {

              //Adults: 7.5-10 g
              //Children: 150 mg/kg; 200 mg/kg in healthy children aged 1-6 years
              var therapeutic_bottom = g.toDomYCoord(highlight_start);
              var therapeutic_top = g.toDomYCoord(highlight_end);
              var toxic_top = g.toDomYCoord(toxic_highlight_top);
              var notEnough_below = g.toDomYCoord(0);

        canvas.fillStyle = "rgba(0, 255, 0, 1.0)";
        canvas.fillRect(area.x, therapeutic_top, area.w, therapeutic_bottom - therapeutic_top);

        canvas.fillStyle = "rgba(255, 0, 0, 1.0)";
        canvas.fillRect(area.x, toxic_top, area.w, therapeutic_top - toxic_top);

        canvas.fillStyle = "rgba(255, 255, 0, 1.0)";
        canvas.fillRect(area.x, therapeutic_bottom, area.w, notEnough_below - therapeutic_bottom);        

            }

          }
      );


}