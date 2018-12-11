export default {
  init() {
    // JavaScript to be fired on all pages
    /*
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    */
    $('.hamburger').click(function() {
      $(this).toggleClass('is-active');
    });

    $('body').click(function() {
      if( $( this ).hasClass("shiftnav-open") ) {
        console.log(" menu");
        $(".hamburger.shiftnav-toggle").removeClass("is-active");
      }else {
        console.log("no menu");
      }
    });

     
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};
