(function($) {
	// TYPEWRITE
	var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid black}";
        document.body.appendChild(css);
    };

    // Clients carousel (uses the Owl Carousel library)
    var carousel = function() {

        // Clients carousel (uses the Owl Carousel library)
        $(".clients-carousel").owlCarousel({
            autoplay: true,
            dots: true,
            loop: true,
            responsive: {
                0: {
                    items: 2
                },
                768: {
                    items: 4
                },
                900: {
                    items: 6
                }
            }
        });

        $('.carousel-testimony').owlCarousel({
            autoplay: true,
            center: true,
            loop: true,
            items:1,
            margin: 30,
            stagePadding: 0,
            nav: true,
            navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
            responsive:{
                0:{
                    items: 1
                },
                600:{
                    items: 2
                },
                1000:{
                    items: 3
                }
            }
        });
    };
    carousel();

    var a = 0;
    $(window).scroll(function() {
        var oTop = $('#counter').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
            $('.counter-number').each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-number');
                $({
                    countNum: $this.text()
                }).animate({
                        countNum: countTo
                    },
                    {

                        duration: 5000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                            //alert('finished');
                        }

                    });
            });
            a = 1;
        }
    });

    // loader
    var loader = function() {
        setTimeout(function() {
            if($('#ftco-loader').length > 0) {
                $('#ftco-loader').removeClass('show');
            }
        }, 1);
    };
    loader();

    var contentWayPoint = function() {
        var i = 0;
        $('.ftco-animate').waypoint( function( direction ) {

            if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

                i++;

                $(this.element).addClass('item-animate');
                setTimeout(function(){

                    $('body .ftco-animate.item-animate').each(function(k){
                        var el = $(this);
                        setTimeout( function () {
                            var effect = el.data('animate-effect');
                            if ( effect === 'fadeIn') {
                                el.addClass('fadeIn ftco-animated');
                            } else if ( effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft ftco-animated');
                            } else if ( effect === 'fadeInRight') {
                                el.addClass('fadeInRight ftco-animated');
                            } else {
                                el.addClass('fadeInUp ftco-animated');
                            }
                            el.removeClass('item-animate');
                        },  k * 50, 'easeInOutExpo' );
                    });

                }, 100);

            }

        } , { offset: '95%' } );
    };
    contentWayPoint();

	

})(jQuery);

