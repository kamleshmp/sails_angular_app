app.directive('dashboardSlider',function(){
  return{
    link: function(scope,ele,attr){
      $("#dashboard-slider").responsiveSlides({
        auto: true,
        pager: false,
        nav: true,
        speed: 500,
        maxwidth: 800,
        namespace: "large-btns"
      });
    }
  }
})