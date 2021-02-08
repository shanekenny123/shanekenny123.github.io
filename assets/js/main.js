!(function($) {
  "use strict";
  //TODO: SHOULD THE RETURN DAYS BE CALCULATED FOR YOU DEPENDING ON DEPARTURE DAYS AND TRIP LENGTH SPECIFIED???
  //TODO: BY DOING SO COULD GET RID OF RETURN DAY AS FIELD

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  $('#dateRangeStartOW').change(function() {
      document.getElementById("dateRangeEndOW").value = document.getElementById("dateRangeStartOW").value;
      document.getElementById("dateRangeEndOW").setAttribute("min", document.getElementById("dateRangeStartOW").value);
  });

  $('#dateRangeStartOWM').change(function() {
      document.getElementById("dateRangeEndOWM").value = document.getElementById("dateRangeStartOWM").value;
      document.getElementById("dateRangeEndOWM").setAttribute("min", document.getElementById("dateRangeStartOWM").value);
  });

  $('#dateRangeStartR').change(function() {
      document.getElementById("dateRangeEndR").value = document.getElementById("dateRangeStartR").value;
      document.getElementById("dateRangeEndR").setAttribute("min", document.getElementById("dateRangeStartR").value);
  });

  $('#dateRangeStartRM').change(function() {
      document.getElementById("dateRangeEndRM").value = document.getElementById("dateRangeStartRM").value;
      document.getElementById("dateRangeEndRM").setAttribute("min", document.getElementById("dateRangeStartRM").value);
  });

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 21;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('bx bx-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="bx bx-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('bx bx-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('bx bx-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first, .mobile-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

  $('#searchButtonOW').click(function() {

      var outDateStart = document.getElementById('dateRangeStartOW').valueAsDate;
      var outDateEnd = document.getElementById('dateRangeEndOW').valueAsDate;
      var depDays = [];

      var i = 0;
      $('#departureDayOW option:selected').each(function() {

          if (parseInt(this.value) == 7)
              this.value = 0;
          depDays[i] = parseInt(this.value);
          i++;
      });

      //Get number of different days in date range
      var difference = outDateEnd.getTime() - outDateStart.getTime();
      var numOfDaysBetweenDates = (Math.ceil(difference / (1000 * 3600 * 24)) + 1); //Add 1 as end date is inclusive

      //If number of days in date range is less than 7, then check if all the outbound days specified are possible
      var check = 0;
      var dayInDateRange = outDateStart.getDay();
      var increment = 0;

      if (numOfDaysBetweenDates < 7) {

          for (var k = 0 ; k < numOfDaysBetweenDates; k++) {

              if(depDays.includes((parseInt(dayInDateRange) + parseInt(increment))))
                  check++;

              increment++;

              if(dayInDateRange + increment == 7) {
                  dayInDateRange = 0;
                  increment = 0;
              }
          }

          //Throw error as some days specified in out days don't fall in outbound date range
          if (check != depDays.length) {
             alert("Some of the days specified in the fly out days don't occur in the departure date range!");
             return false;
          }
      }
  });

  $('#searchButtonOW').click(function() {

      var outDateStart = document.getElementById('dateRangeStartOWM').valueAsDate;
      var outDateEnd = document.getElementById('dateRangeEndOWM').valueAsDate;
      var depDays = [];

      var i = 0;
      $('#departureDayOWM option:selected').each(function() {

          if (parseInt(this.value) == 7)
              this.value = 0;
          depDays[i] = parseInt(this.value);
          i++;
      });

      //Get number of different days in date range
      var difference = outDateEnd.getTime() - outDateStart.getTime();
      var numOfDaysBetweenDates = (Math.ceil(difference / (1000 * 3600 * 24)) + 1); //Add 1 as end date is inclusive

      //If number of days in date range is less than 7, then check if all the outbound days specified are possible
      var check = 0;
      var dayInDateRange = outDateStart.getDay();
      var increment = 0;

      if (numOfDaysBetweenDates < 7) {

          for (var k = 0 ; k < numOfDaysBetweenDates; k++) {

              if(depDays.includes((parseInt(dayInDateRange) + parseInt(increment))))
                  check++;

              increment++;

              if(dayInDateRange + increment == 7) {
                  dayInDateRange = 0;
                  increment = 0;
              }
          }

          //Throw error as some days specified in out days don't fall in outbound date range
          if (check != depDays.length) {
             alert("Some of the days specified in the fly out days don't occur in the departure date range!");
             return false;
          }
      }
  });

  $('#searchButtonR').click(function() {

    var outDateStart = document.getElementById('dateRangeStartR').valueAsDate;
    var outDateEnd = document.getElementById('dateRangeEndR').valueAsDate;
    var depDays = [];

    var i = 0;
    $('#departureDayR option:selected').each(function() {

        if (parseInt(this.value) == 7)
            this.value = 0;
        depDays[i] = parseInt(this.value);
        i++;
    });

    //Get number of different days in date range
    var difference = outDateEnd.getTime() - outDateStart.getTime();
    var numOfDaysBetweenDates = (Math.ceil(difference / (1000 * 3600 * 24)) + 1); //Add 1 as end date is inclusive

    //If number of days in date range is less than 7, then check if all the outbound days specified are possible
    var check = 0;
    var dayInDateRange = outDateStart.getDay();
    var increment = 0;

    if (numOfDaysBetweenDates < 7) {

        for (var k = 0 ; k < numOfDaysBetweenDates; k++) {

            if(depDays.includes((parseInt(dayInDateRange) + parseInt(increment))))
                check++;

            increment++;

            if(dayInDateRange + increment == 7) {
                dayInDateRange = 0;
                increment = 0;
            }
        }

        //Throw error as some days specified in out days don't fall in outbound date range
        if (check != depDays.length) {
           alert("Some of the days specified in the fly out days don't occur in the departure date range!");
           return false;
        }
    }
  });

  $('#searchButtonRM').click(function() {

    var outDateStart = document.getElementById('dateRangeStartRM').valueAsDate;
    var outDateEnd = document.getElementById('dateRangeEndRM').valueAsDate;
    var depDays = [];

    var i = 0;
    $('#departureDayRM option:selected').each(function() {

        if (parseInt(this.value) == 7)
            this.value = 0;
        depDays[i] = parseInt(this.value);
        i++;
    });

    //Get number of different days in date range
    var difference = outDateEnd.getTime() - outDateStart.getTime();
    var numOfDaysBetweenDates = (Math.ceil(difference / (1000 * 3600 * 24)) + 1); //Add 1 as end date is inclusive

    //If number of days in date range is less than 7, then check if all the outbound days specified are possible
    var check = 0;
    var dayInDateRange = outDateStart.getDay();
    var increment = 0;

    if (numOfDaysBetweenDates < 7) {

        for (var k = 0 ; k < numOfDaysBetweenDates; k++) {

            if(depDays.includes((parseInt(dayInDateRange) + parseInt(increment))))
                check++;

            increment++;

            if(dayInDateRange + increment == 7) {
                dayInDateRange = 0;
                increment = 0;
            }
        }

        //Throw error as some days specified in out days don't fall in outbound date range
        if (check != depDays.length) {
           alert("Some of the days specified in the fly out days don't occur in the departure date range!");
           return false;
        }
    }
  });

})(jQuery);