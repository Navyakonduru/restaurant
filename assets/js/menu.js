// Menu list isotope and filter
  $(window).on('load', function() {
    var menuIsotope = $('.menu-container').isotope({
      itemSelector: '.menu-item',
      layoutMode: 'fitRows'
    });

    $('#menu-flters li').on('click', function() {
      $("#menu-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');
      $('.menu-container').show();

      menuIsotope.isotope({
        filter: $(this).data('filter')
      });
    });
  });

  $(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
  });