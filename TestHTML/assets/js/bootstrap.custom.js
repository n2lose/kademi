var filterList = {
  
  init: function () {
  
    // MixItUp plugin
    // http://mixitup.io
    $('#portfoliolist').mixitup({
      targetSelector: '.portfolio',
      filterSelector: '.filter',
      effects: ['fade'],
      easing: 'snap',
      // call the hover effect
      onMixEnd: filterList.hoverEffect()
    });       
  
  },
  
  hoverEffect: function () {
  
    // Simple parallax effect
    $('#portfoliolist .portfolio').hover(
      function () {
        $(this).find('.info').stop().animate({bottom: 0}, 200, 'easeOutQuad');
        $(this).find('img').stop().animate({top: "100%"}, 500, 'easeOutQuad');       
      },
      function () {
        $(this).find('.info').stop().animate({bottom: "100%"}, 200, 'easeInQuad');
        $(this).find('img').stop().animate({top: 0}, 300, 'easeOutQuad');               
      }   
    );        
  
  }

};

!function ($) {

  $(function(){

  	$('.features-content').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });

    $('.our-team-slider').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });


    // Run the show!
    filterList.init();

  });

}(window.jQuery);




