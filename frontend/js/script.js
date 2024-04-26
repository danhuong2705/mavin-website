
var script = function(){

    var win = $(window);
    var html = $('html');
    var body = $('body');

    var mMenu = function(){


        var m_nav_btn=$('.menu-btn');
        var m_nav=$('.main-bar');
        var nav = m_nav.children('.main-nav');

        m_nav.find("ul li").each(function() {
            if($(this).find("ul>li").length > 0){
                $(this).prepend('<i></i>');
            }
        });

        m_nav_btn.click(function(){
            
            if(nav.is(":hidden")){
                $(this).children('i').removeClass('menu-btn-bar').addClass('menu-btn-close');
                nav.slideDown(200);
            }
            else {
                nav.slideUp(200);
                $(this).children('i').removeClass('menu-btn-close').addClass('menu-btn-bar');
            }
        });

        m_nav.find("li i").click(function(){
            var ul = $(this).nextAll("ul");
            if(ul.is(":hidden") === true){

                ul.parent('li').parent('ul').children('li').children('ul').slideUp(200);
                ul.parent('li').parent('ul').children('li').children('i').removeClass('active');
                
                $(this).addClass("active");
                ul.slideDown(200);
            }
            else{
                $(this).removeClass("active");
                ul.slideUp();
                // ul.find('ul').slideUp(200);
                // ul.find('li>i').removeClass("active");
            }
        });

        win.resize(function() {
            if($(this).width()>991){
                nav.show();
                nav.find('ul').show();
                nav.find('li > i').removeClass("active");
            }
            else{
                nav.hide();
                m_nav_btn.children('i').removeClass('menu-btn-close').addClass('menu-btn-bar');
            }
        });

    }

    var backToTop = function(){
        var back_top = $('.back-to-top');

        if(win.scrollTop() > 300){ back_top.fadeIn(); }

        back_top.click(function(){
            $("html, body").animate({ scrollTop: 0 }, 800 );
            return false;
        });

        // win.resize(function() {
        //     if($(this).width()>991){
        //         back_top.fadeOut();
        //     }
        // });

        win.scroll(function() {    
            if(win.scrollTop() > 300) back_top.fadeIn();
            else back_top.fadeOut();
        });
    }

    var uiClickShow = function(){
        var ani = 200;
        $('[data-show]').each(function() {
            var this_ = $(this);
            var ct = $(this_.attr('data-show'));

            this_.click(function(e) {
                e.preventDefault();
                ct.slideToggle(ani);

                if(this_.hasClass('active')) this_.removeClass('active');
                else this_.addClass('active');
            });
        });

        win.click(function(e) {
            // if($(this).width() > 991){
                $('[data-show]').each(function() {
                    var this_ = $(this);
                    var ct = $(this_.attr('data-show'));
                    if(ct.has(e.target).length == 0 && !ct.is(e.target) && this_.has(e.target).length == 0 && !this_.is(e.target)){
                        ct.slideUp(ani);
                        this_.removeClass('active');
                    }
                })
            // }
        });
    }

    var uiDrop = function(){
        $('.drop').each(function() {
            var this_ = $(this);
            var label = this_.children('a');
            var ct = this_.children('ul');
            var item = ct.children('li').children('a');

            this_.click(function() {
                ct.slideToggle(150);
            });

            item.click(function(e) {
                e.preventDefault();
                label.html($(this).html());
            });

            win.click(function(e) {
                if(this_.has(e.target).length == 0 && !this_.is(e.target)){
                    this_.children('ul').slideUp(150);
                }
            })
        });  
    }

    function doAnimations( elems ) {
        var animEndEv = 'webkitAnimationEnd animationend';
        elems.each(function () {
            var $this = $(this),
            $animationType = $this.data('animation');
            $this.addClass($animationType).one(animEndEv, function () {
                $this.removeClass($animationType);
            });
        });
    }

    var uiSlider = function(){
        var $myCarousel = $('#slider');
        $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");     
        $myCarousel.carousel();   
        doAnimations($firstAnimatingElems);
        $myCarousel.on('slide.bs.carousel', function (e) {
            var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
            doAnimations($animatingElems);
        });
    }
    var uiSlick = function(){
        $('.parter-cas').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            nextArrow: '<img src="' + template_url + 'frontend/images/next.png" alt="next" class="smooth next">',
            prevArrow: '<img src="' + template_url + 'frontend/images/prev.png" alt="prev" class="smooth prev">',
            autoplay: true,
            swipeToSlide: true,
            autoplaySpeed: 4000,
            responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 660,
                settings: {
                    slidesToShow: 2,
                }
            },
            ],
        })

        $('.testi-cas').slick({
            dots: true,
            arrows: false,
        })

        $('.h-post-cas').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            nextArrow: '<span class="smooth next"><img src="' + template_url + 'frontend/images/next.png" alt="next"></span>',
            prevArrow: '<span class="smooth prev"><img src="' + template_url + 'frontend/images/prev.png" alt="prev"></span>',
            autoplay: true,
            swipeToSlide: true,
            autoplaySpeed: 4000,
            responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                }
            },
            ],
        })

        $('.service-cas').slick({
            autoplay: true,
            swipeToSlide: true,
            autoplaySpeed: 8000,
            dots: true,
            fade: true,
            nextArrow: '<span class="smooth next"><img src="' + template_url + 'frontend/images/next2.png" alt="next"></span>',
            prevArrow: '<span class="smooth prev"><img src="' + template_url + 'frontend/images/prev2.png" alt="prev"></span>',
            responsive: [
            {
                breakpoint: 767,
                settings: {
                    arrows: false,
                }
            }, 
            ],
        })

        $('.cate-tag a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $('.service-cas').slick('setPosition');
        })
        $('.scate-tab a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $('.service-cas').slick('setPosition');
        })



        $('.prize-cas').slick({
            nextArrow: '<span class="smooth next"><img src="' + template_url + 'frontend/images/next.png" alt="next"></span>',
            prevArrow: '<span class="smooth prev"><img src="' + template_url + 'frontend/images/prev.png" alt="prev"></span>',
            autoplay: true,
            swipeToSlide: true,
            autoplaySpeed: 15000,
        })

        $('.year-cas').slick({
            nextArrow: '<span class="fa fa-angle-down next smooth"></span>',
            prevArrow: '<span class="fa fa-angle-up prev smooth"></span>',
            autoplay: true,
            swipeToSlide: true,
            autoplaySpeed: 10000,
            vertical: true,
            verticalSwiping: true,
            infinite: false,
            asNavFor: '.his-cas',
        })
        $('.his-cas').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            nextArrow: '<span class="smooth next"><img src="' + template_url + 'frontend/images/next.png" alt="next"></span>',
            prevArrow: '<span class="smooth prev"><img src="' + template_url + 'frontend/images/prev.png" alt="prev"></span>',
            swipeToSlide: true,
            focusOnSelect: true,
            centerMode: true,
            centerPadding: '0px',
            asNavFor: '.year-cas',
            infinite: false,
            responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                    arrows: false,
                    dots: true,
                }
            },],
        })

        // $('.his-cas').waterwheelCarousel({

        // })
    }

    var uiflowerFall = function(){
        $('.flower').each(function(index, el) {
            var h = $(el).parent('.flower-fn').innerHeight() - $(el).innerHeight() - parseInt($(el).css('top'));
            var flTop = $(el).offset().top;

            $(el).children('.fl').children('img').each(function(index2, el2) {
                var tm = Math.floor(Math.random() * 8) * 1000 + 12000;
                $(el2).css({
                    '-webkit-animation-duration': tm/5000+'s',
                    'animation-duration': tm/5000+'s',
                });

                function flowerFall(){
                    $(el2).fadeIn(200).addClass('in');
                    $(el2).animate(
                        {bottom: - h + 10},
                        tm,
                        'linear',
                        function() {

                        }
                        );
                }

                if($(window).scrollTop() >= (flTop - 100) && $(el).innerHeight() + flTop > $(window).scrollTop() + 150){
                    flowerFall();
                }
                else{
                    $(window).scroll(function(e) {
                        if($(window).scrollTop() >= (flTop - 100) && $(el).innerHeight() + flTop > $(window).scrollTop() + 150){
                            flowerFall();
                        }
                    });
                }
            });
        });
    }

    var uiMap = function(){
        var map = $('.map');
        map.each(function() {
            var this_ = $(this);
            this_.click(function () {
                this_.children().css("pointer-events", "auto");
            });
            this_.children().mouseleave(function() {
                $(this).css("pointer-events", "none"); 
            });
        });   
    }

    var uiScrollbar = function(){
        $(".service-cas-wr .ct .s-content").mCustomScrollbar({
            theme: "ser-scrollbar",
        });
    }

    var uiFancybox= function(){
        $(".gal-fancy").fancybox({
            transitionIn  :   'elastic',
            transitionOut :   'elastic',
            speedIn       :   600, 
            speedOut      :   200, 
            overlayShow   :   false,
            autoScale: true,
            wrapCSS: 'fancy-md',
            // helpers: {
            //     thumbs: {
            //         width: 50,
            //         height: 50
            //     }
            // },
            // afterLoad : function() {
            //     this.title = 'Ảnh ' + (this.index + 1) + ' / ' + this.group.length + (this.title ? ' - ' + this.title : '');
            // }
        });
    }

    var uiExpand = function(){
        $('.mission').hover(function() {
            $(this).addClass('active');
        }, function() {
            if(!$(this).find('.expand-ct').hasClass('active')){
                $(this).removeClass('active');
            }
        });

        function showBtn(){
            $('.expand').each(function(index, el) {  
                var ct = $(el).find('.expand-ct');   
                if(ct.prop('scrollHeight') > Number(ct.attr('data-height'))){
                    ct.after('<button type="button"></button>');
                }

                $(el).on('click','button',function(e) {
                    if ($(this).hasClass('open')) {
                        ct.removeClass('active');
                        $(this).removeClass('open');
                        $(this).parents('.mission').removeClass('active');
                    }
                    else{
                        $('.expand-ct').removeClass('active');
                        $('.expand button').removeClass('open');
                        $('.mission').removeClass('active');

                        $(this).parents('.mission').addClass('active');

                        ct.addClass('active');
                        $(this).addClass('open');


                    }

                })
            });
        }

        if($('.expand').parents('.tab-content').length <= 0){
            showBtn();
        }
        
        $('.customer-tab a[data-toggle="tab"]').on('shown.bs.tab', function () {
            showBtn();
        })

        $('.mission .img,.mission .m-img').click(function(e) {
            $(this).parents('.mission').find('.expand button').click();
        });
    }

    return {

        uiInit: function($fun){
            switch ($fun) {
                case 'mMenu':
                mMenu();
                break;
                case 'backToTop':
                backToTop();
                break;
                case 'uiSlider':
                uiSlider();
                break;
                case 'uiSlick':
                uiSlick();
                break;
                case 'uiClickShow':
                uiClickShow();
                break;
                case 'uiflowerFall':
                uiflowerFall();
                break;
                case 'uiDrop':
                uiDrop();
                break;
                case 'uiMap':
                uiMap();
                break; 
                case 'uiScrollbar':
                uiScrollbar();
                break;
                case 'uiFancybox':
                uiFancybox();
                break;
                case 'uiExpand':
                uiExpand();
                break;

                default:
                mMenu();
                backToTop();
                uiSlider();
                uiSlick();
                uiClickShow();
                uiflowerFall();
                uiDrop();
                uiMap();
                uiScrollbar();
                uiFancybox();
                uiExpand();
            }
        }
    }

}();


jQuery(function($) {
    var wow = new WOW({offset:50,mobile:false}); wow.init();
    script.uiInit();

    // $('.corner-30').corner('30px bite');

    $('.add-item > button').click(function(e) {
        $('.add-item > .ct').not($(this).nextAll('.ct')).slideUp();
        $('.add-item > button').not($(this)).removeClass('active');
        $(this).nextAll('.ct').slideToggle();

        if($(this).hasClass('active')) $(this).removeClass('active');
        else $(this).addClass('active');
    });

    
    $('.psy-btn').click(function(e) {
        e.preventDefault();
        $('html,body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 800);
    });
    
    

    $('.modal-cas').slick({
        autoplay: false,
        swipeToSlide: true,
        autoplaySpeed: 5000,
        nextArrow: '<span class="smooth next"><img src="' + template_url + 'frontend/images/next2.png" alt="next"></span>',
        prevArrow: '<span class="smooth prev"><img src="' + template_url + 'frontend/images/prev2.png" alt="prev"></span>',
        speed: 500
    });
    $('.myModal').on('shown.bs.modal', function () {
        $('.modal-cas').slick('setPosition');
    })


});


$(window).bind("load", function() {
    $('body').append('<div id="fb-root"></div>');
    $.ajax({
        global: false,
        url: template_url + "frontend/js/social.js",
        dataType: "script"
    });
    $.ajax({
        global: false,
        url: "https://apis.google.com/js/platform.js",
        dataType: "script"
    });
    window.___gcfg = {
        lang: 'vi',
        parsetags: 'onload'
    };

    var arr = $('.yt-iframe');
    var arrLe = arr.length;
    for (var i = 0; i < arrLe; i++) {
        var item = $(arr[i]);
        item.append('<iframe src="'+item.attr('data-src')+'?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>');
    }
});


function initMap() {
    /*var m = document.getElementById('md-map');

    if(m){
        var dt_latlng = m.getAttribute("data-latlng");

        var array = dt_latlng.split(",");

        latlng = {lat: Number(array[0])  ,lng: Number(array[1])}
        map = new google.maps.Map(m, {
            zoom: 15,
            center: latlng,
        });

        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
        });
    }*/
}


$('#h-ser-slider li a.more').click(function(e) {
    e.stopPropagation();
});
$('.boss-item .img').click(function(e) {
    e.preventDefault();
    $(this).nextAll('button').click();
});