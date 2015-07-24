

function datestring(){
var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
var newDate = new Date();
newDate.setDate(newDate.getDate());
$('#date').html(dayNames[newDate.getDay()] + ", " + monthNames[newDate.getMonth()] + ' ' + newDate.getDate() );
// $.getJSON("data/theme.json",function(data){
//   $.each(data, function(i,v){
//     if(v.month == (newDate.getMonth()+1) && v.date == newDate.getDate()){
//     $('#theme').html(v.theme);
//     }
//   });
// });
}

function timestring () {
  var t = new Date;
     var mid = 'am';
     var hours = t.getHours();
     var minutes = t.getMinutes();
     if(hours==0){
       hours=12;
       }else if(hours>12){
         hours=hours%12;
         mid='pm';
       }
      if(minutes < 10){
          $('#time').html(hours + ':0' + t.getMinutes()+' '+ mid);
      }else{
          $('#time').html(hours + ':' + t.getMinutes()+' '+ mid);
      }

  if(t.getHours() == 24 && t.getMinutes() == 0 && t.getSeconds() == 0){
    datestring();
  }
}

function updateClock(){
  timestring();
  setTimeout(updateClock, 1000);
}

function updateWeather(){
  var url = "http://api.openweathermap.org/data/2.5/find?q=new%20york&units=imperial";
  $.get(url, function (response) {
      var id = response.list[0].weather[0].id;
      var temp = response.list[0].main.temp;
      temp = Math.round(temp);
      $('#temp').html(temp + '°');
      if(id >=200 && id < 700 ){
      $('#weather-icon').attr('src', 'svg/weather-rain.svg');
    }else if(id ==800){
      $('#weather-icon').attr('src', 'svg/weather-sun.svg');
    }else if(id >800 && id < 900 ){
      $('#weather-icon').attr('src', 'svg/weather-cloud.svg');
    }else{
    }
    	});
    setTimeout(updateWeather, 1000*60);
}

$(document).ready(function(){
  datestring();
  updateClock();
  updateWeather();

  $("#slideshow > div:gt(0)").hide();
  setInterval(function() {
  $('#slideshow > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow');
  },  3000);

  $("#next").click(function(){
    $('#slideshow > div:first')
      .fadeOut(1000)
      .next()
      .fadeIn(1000)
      .end()
      .appendTo('#slideshow');
  });

});
