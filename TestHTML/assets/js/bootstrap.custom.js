var filterList = {

  init: function() {

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

  hoverEffect: function() {
    // Simple parallax effect
    $('#portfoliolist .portfolio').hover(
      function() {
        $(this).find('.info').stop().animate({ bottom: 0 }, 200, 'easeOutQuad');
        $(this).find('img').stop().animate({ top: "100%" }, 500, 'easeOutQuad');
      },
      function() {
        $(this).find('.info').stop().animate({ bottom: "100%" }, 200, 'easeInQuad');
        $(this).find('img').stop().animate({ top: 0 }, 300, 'easeOutQuad');
      }
    );
  }
};

! function($) {

  $(function() {

    $('.features-content').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: false,
      responsive: [{
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

    $('.our-team-slider').slick({
      dots: true,
      infinite: false,
      speed: 300,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [{
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

    // if HTML DOM Element that contains the map is found...
    if (document.getElementById('map')) {

      // Coordinates to center the map
      var myLatlng = new google.maps.LatLng(5.376964, 100.399383);

      // Other options for the map, pretty much selfexplanatory
      var mapOptions = {
        zoom: 14,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      // Attach a map to the DOM Element, with the defined settings
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      var marker = new RichMarker({
        position: myLatlng,
        map: map,
        draggable: false,
        flat: true,
        anchor: RichMarkerPosition.MIDDLE,
        content: '<i class="fa fa-map-marker" style="color: #0eb493; font-size: 60px;" ></i>'
      });

      marker.setMap(map);

    }


  });

}(window.jQuery);