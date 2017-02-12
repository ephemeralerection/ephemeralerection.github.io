//Smooth State Function
$(function(){
  'use strict';
  var $page = $('#main'),
      options = {
        debug: true,
        prefetch: true,
        cacheLength: 2,
        onStart: {
          duration: 500, // Duration of our animation
          render: function ($container) {
            // Add your CSS animation reversing class
            $container.addClass('is-exiting');
            // Restart your animation
            smoothState.restartCSSAnimations();          
          }
        },
        onReady: {
          duration: 0,
          render: function ($container, $newContent) {
            // Remove your CSS animation reversing class
            $container.removeClass('is-exiting');
            // Inject the new content
            $container.html($newContent);
            
          }
        },
        onAfter: function($container) {
          $container.onPageLoad();
        }
      },
      smoothState = $page.smoothState(options).data('smoothState');
});

(function($) {

    $.fn.onPageLoad = function() {

        
        //Big menu classes toggle
        var navIcon = document.getElementById('nav-icon4');
        var navigation = document.getElementsByClassName('navigation');
        var navLinks = document.getElementsByClassName('nav-links');
        var anchor = document.getElementsByClassName('anchor');
        var logo = document.getElementById('logo-link');
        var intro = document.getElementById('intro');
        var logoIcon = document.getElementsByClassName('logo');
        var subpageHeader = document.getElementsByClassName('subpage-header');
        var endNavigation = document.getElementsByClassName('end-navigation');
        var top = $(document).scrollTop();


        $(navIcon).click(function(){
            $(navigation).toggleClass('navigation-open');
            $(navLinks).toggleClass('nav-links-on');
            $(this).toggleClass('open');
        });

        $(anchor).on('click', function() {
          $(navigation).toggleClass('navigation-open');
          $(navLinks).toggleClass('nav-links-on');
          $(navIcon).toggleClass('open');
        });

        $(logo).on('click', function() {
            if($(navigation).hasClass('navigation-open')){
                $(navigation).toggleClass('navigation-open');
                $(navLinks).toggleClass('nav-links-on');
                $(navIcon).toggleClass('open');
            }
        });

        //Back to top on subpages
        if( $(endNavigation).length > 0) {
          $('html, body').animate({ scrollTop: 0 }, 500);
        }

        //Position triggered elements
        if($(logo).length) {
          //Dick icon
          $(window).scroll(function () {
              var y = $(this).scrollTop();
              var z = $(intro).offset().top-100;

              if (y >= z) {
                  $(logoIcon).addClass('logo-clip');
              }
              else{
                   $(logoIcon).removeClass('logo-clip');
              }
          });
      }
      else {
        //SubPage Header collapse
        $(window).scroll(function () {
            var subpageHeaderHeight = $(subpageHeader).css('height');
            var xy = $(this).scrollTop();
            var xz = $('.subpage-grey-bg').offset().top-300;

            if (xy >= xz) {
                $(subpageHeader).addClass('subpage-header-translate');
            }
            else{
                 $(subpageHeader).removeClass('subpage-header-translate');
            }
        });
      }

        //Subpage navigation links  
        var navigationSubpage = document.getElementsByClassName('category-navigation');
        var hidden = document.getElementsByClassName('previous-hidden');

        $(navigationSubpage).hover(
          function() {
            $(hidden).addClass('previous-show');
            $("html, body").animate({ scrollTop: $(document).height() }, 300);
          }, function() {
            $(hidden).removeClass('previous-show');
        });  

        //Smooth scrolling anchors
        $(function() {
          $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
              if (target.length) {
                if($(window).width() < 600){
                  $('html, body').animate({
                    scrollTop: target.offset().top
                  }, 1000);
                }  
                else {
                  $('html, body').animate({
                    scrollTop: target.offset().top-40
                  }, 1000);
                }
                return false;
              }
            }
          });
        });    
    }

}(jQuery));