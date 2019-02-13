// import external dependencies
import 'jquery';

// Import everything from autoload
import "./autoload/**/*"

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import home from './routes/home';
import aboutUs from './routes/about';

/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  // Home page
  home,
  // About Us page, note the change from about-us to aboutUs.
  aboutUs,
});

var faculty = ["buemi", "soli", "mancini", "piazzi", "costumato"];
//var coord = ["meneguzzo", "amici", "porcedda"];
var facultyLength = faculty.length;
	
faculty.forEach(addEnterEvent);
faculty.forEach(addLeaveEvent);
//faculty.forEach(addClickEvent);
//coord.forEach(addClickEvent);

/*
function addClickEvent(item, index) {
  jQuery(('.foto_profili.foto_'+item)).on('click touch', function() {
    console.log ("AO "+item+" "+index);
  })
}
*/

function addEnterEvent(item) {
  //demoP.innerHTML = demoP.innerHTML + "index[" + index + "]: " + item + "<br>"; 
  console.log('.foto_profili.foto_'+item);
  jQuery(('.foto_profili.foto_'+item)).mouseenter(function() {
    console.log("daie");
    for (var i = 0; i < facultyLength; i++) {
      //alert(faculty[i]);
      jQuery(('.team_header_'+faculty[i])).css("display", "none");
      jQuery(('.paragrafo_normale.t_bianco.desc_'+faculty[i])).css("display", "none");
      jQuery((".foto_profili.foto_"+faculty[i]+" img")).css("border","0px solid #ffffff");	
      //Do something
	}
	jQuery((".foto_profili.foto_"+item+ " img")).css("border","8px solid #ffffff");
    jQuery(('.team_header_'+item)).css("display", "block");
    jQuery(('.paragrafo_normale.t_bianco.desc_'+item)).css("display", "block");

     if (checkTouchDevice()) {
      jQuery([document.documentElement, document.body]).animate({
        scrollTop: jQuery(('.team_header_'+item)).offset().top,
      }, 1000);
	}
  })
}

function addLeaveEvent(item) {
  //demoP.innerHTML = demoP.innerHTML + "index[" + index + "]: " + item + "<br>"; 
  jQuery(('.foto_profili.foto_'+item)).mouseleave(function() {
	jQuery((".foto_profili.foto_"+item+ "img")).css("border","0px solid #ffffff");
    jQuery(('.team_header_'+item)).css("display", "none");
    jQuery(('.paragrafo_normale.t_bianco.desc_'+item)).css("display", "none");
  })
}

/* TEAMS */

jQuery('.foto_profili.foto_meneguzzo').mouseenter(function() {
  jQuery(".foto_profili.foto_meneguzzo img").css("border","8px solid #ffffff");
  jQuery(".foto_profili.foto_amici img").css("border","0px solid #ffffff");
  jQuery(".foto_profili.foto_porcedda img").css("border","0px solid #ffffff");


  jQuery('.team_header_meneguzzo').css("display", "block");
  jQuery('.paragrafo_normale.t_bianco.desc_meneguzzo').css("display", "block");

  jQuery('.team_header_amici').css("display", "none");
  jQuery('.paragrafo_normale.t_bianco.desc_amici').css("display", "none");

  jQuery('.team_header_porcedda').css("display", "none");
  jQuery('.paragrafo_normale.t_bianco.desc_porcedda').css("display", "none");

  if (checkTouchDevice()) {
    console.log("meneguzzo");
    jQuery([document.documentElement, document.body]).animate({
      scrollTop: jQuery('.team_header_meneguzzo').offset().top,
    }, 1000);
  }
});

jQuery('.foto_profili.foto_amici').mouseenter(function() {
  jQuery(".foto_profili.foto_meneguzzo img").css("border","0px solid #ffffff");
  jQuery(".foto_profili.foto_amici img").css("border","8px solid #ffffff");
  jQuery(".foto_profili.foto_porcedda img").css("border","0px solid #ffffff");

  

  jQuery('.team_header_meneguzzo').css("display", "none");
  jQuery('.paragrafo_normale.t_bianco.desc_meneguzzo').css("display", "none");

  jQuery('.team_header_amici').css("display", "block");
  jQuery('.paragrafo_normale.t_bianco.desc_amici').css("display", "block");

  jQuery('.team_header_porcedda').css("display", "none");
  jQuery('.paragrafo_normale.t_bianco.desc_porcedda').css("display", "none");

  if (checkTouchDevice()) {
    console.log("amici");
    jQuery([document.documentElement, document.body]).animate({
      scrollTop: jQuery('.team_header_amici').offset().top,
    }, 1000);
  }
});

jQuery('.foto_profili.foto_meneguzzo').mouseleave(function() {
  jQuery('.team_header_meneguzzo').css("display", "none");
  jQuery('.paragrafo_normale.t_bianco.desc_meneguzzo').css("display", "none");
  jQuery(".foto_profili.foto_meneguzzo img").css("border","0px solid #ffffff");
});

jQuery('.foto_profili.foto_amici').mouseleave(function() {
  jQuery('.team_header_amici').css("display", "none");
  jQuery('.paragrafo_normale.t_bianco.desc_amici').css("display", "none");
  jQuery(".foto_profili.foto_amici img").css("border","0px solid #ffffff");
});

jQuery('.foto_profili.foto_porcedda').mouseleave(function() {
  jQuery('.team_header_porcedda').css("display", "none");
  jQuery('.paragrafo_normale.t_bianco.desc_porcedda').css("display", "none");
  jQuery(".foto_profili.foto_porcedda img").css("border","0px solid #ffffff");
});

jQuery('.foto_profili.foto_porcedda').mouseenter(function() {
  jQuery(".foto_profili.foto_meneguzzo img").css("border","0px solid #ffffff");
  jQuery(".foto_profili.foto_amici img").css("border","0px solid #ffffff");
  jQuery(".foto_profili.foto_porcedda img").css("border","8px solid #ffffff");


  jQuery('.team_header_meneguzzo').css("display", "none");
  jQuery('.paragrafo_normale.t_bianco.desc_meneguzzo').css("display", "none");

  jQuery('.team_header_amici').css("display", "none");
  jQuery('.paragrafo_normale.t_bianco.desc_amici').css("display", "none");

  jQuery('.team_header_porcedda').css("display", "block");
  jQuery('.paragrafo_normale.t_bianco.desc_porcedda').css("display", "block");

  if (checkTouchDevice()) {
    console.log("porcedda scroll");
    jQuery([document.documentElement, document.body]).animate({
      scrollTop: jQuery('.team_header_porcedda').offset().top,
    }, 1000);
  }else{
    console.log("porcedda no mobile");
  }
});


/*
if (checkTouchDevice()) {
   // Mobile device
   jQuery('.foto_profili.foto_meneguzzo').css("display", "none");
   jQuery('.foto_profili.foto_amici').css("display", "none");
   jQuery('.foto_profili.foto_porcedda').css("display", "none");
} else {
   // Desktop
   jQuery('.profilo.profilo_meneguzzo').css("display", "none");
   jQuery('.profilo.profilo_amici').css("display", "none");
   jQuery('.profilo.profilo_porcedda').css("display", "none");
}
*/

function checkTouchDevice() {
   return 'ontouchstart' in document.documentElement;
}


jQuery('.btn_partner').attr('data-toggle','modal');
jQuery('.btn_partner').attr('data-target','modal-partner');

jQuery('.btn_partner').click(function() {
  jQuery('#modal-partner').modal('show');
  console.log("modal Show");
})

jQuery('.modello-eumaps-btn').click(function() {
  jQuery('#modal-eumaps').modal('show');
  console.log("modal Show");
})

// Load Events
jQuery(document).ready(() => routes.loadEvents());
