function popupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}
var contact_map, contact_lat,contact_lng;
function attachSecretMessage(marker, message)
{
    var infowindow = new google.maps.InfoWindow(
        { content: message
        });
    infowindow.open(contact_map,marker);
}
window.dxmapLoadMap = function(title,address)
{
    var center = new google.maps.LatLng(contact_lat, contact_lng);
    var settings = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 16,
        scrollwheel: false,
        center: center
    };
    contact_map = new google.maps.Map(document.getElementById('md-map'), settings);

    var marker = new google.maps.Marker({
        position: center,
        title: title,
        map: contact_map
    });
    marker.setTitle(title.toString());
    attachSecretMessage(marker, '<strong>'+title+'</strong><br />' + address);
}
function changeMap(title,address){
    jQuery.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+address+'&sensor=false', function(data) {
        if(data.status == "ZERO_RESULTS"){
            contact_lat = false;
            contact_lng = false;
        }else{
            contact_lat = data.results[0].geometry.location.lat;
            contact_lng = data.results[0].geometry.location.lng;
        }

    }).complete(function(){
        if(contact_lat && contact_lng)  dxmapLoadMap(title,address);
    });
    return false;
}
function getArticles(e) {
    var page = $(e).attr('data-page'),
        api = $(e).attr('data-api'),
        category_id = $(e).attr('data-category'),
        $target = $($(e).attr('data-target'))
    ;
    $.ajax({
        url : api,
        type : 'GET',
        data: {page: page,category_id:category_id},
    }).done(function (data) {
        $target.html(data);
        console.log($target.size());
    }).fail(function () {
        alert('Posts could not be loaded.');
    });
    return false;
}
function str_random(length)
{
    length = length || 5;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function getDistricts(e)
{
    var province_id = $(e).find('option:selected').val(),
        api = $(e).attr('data-api'),
        $target = $($(e).attr('data-target'))
        ;
    $.ajax({
         url: api,
        data:{province_id:province_id},
        type:'GET',
        success:function (data) {
            $target.html(data);
        }
    });
}
function chooseBranch(e)
{
    var id = $(e).attr('data-id'),
        $target = $($(e).attr('data-target'))
        ;
    $target.attr('data-id',id);
}
function changeBranch(e)
{
    var id = $(e).attr('data-id'),
        old_id = $(e).attr('data-current'),
        url = $(e).attr('data-url');
    // if(id != old_id){
    if(id == 2){
        window.location.href ='https://panservices-hanoi.vn/';
    } else {
        window.location.href = url + '?branch='+id;
    }
}
function resetForm(e){
    $(e).find('input[type=text]').val('');
    $(e).find('input[type=password]').val('');
    $(e).find('input[type=email]').val('');
    $(e).find('input[type=number]').val(0);
    $(e).find('select').val(0);
    $(e).find('textarea').val('');
}
function social_sharing(e){
    var url = $(e).attr('data-url');
    popupCenter(url, null, 800,450);
}
function printHtml(e) {
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title  + '</h1>');
    mywindow.document.write(document.getElementById(e).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}
function changeLanguage(e) {
    var url = $(e).find('option:selected').val();
    window.location.href = url;
}
jQuery(document).ready(function ($) {
    document.onselectstart=new Function ("return false");
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
    $(document).keydown(function(event){
        if(event.keyCode==123){
            return false;
        }
        else if(event.ctrlKey && event.shiftKey && event.keyCode==73){
            return false;
        }
    });

    $('.modal-work-env').each(function () {
        $(this).on('shown.bs.modal', function () {
            $(this).find('.modal-cas').slick('setPosition');
        });
    });
    $('#h-ser-slider li a.more').click(function(e) {
        e.stopPropagation();
        var href = $(this).attr('href');
        window.location.href = href;
    });
    $('.mission .expand button').each(function () {
        $(this).click(function(e) {
            e.stopPropagation();
            var $this = $(this),
                $modal = $this.closest('.mission').find('.modal');
            $modal.modal('show');
        });
    });
    $('.leadership .expand button').each(function () {
        $(this).click(function(e) {
            e.stopPropagation();
            var $this = $(this),
                $modal = $this.closest('.leadership').find('.modal');
            $modal.modal('show');
        });
    });

    // form validation
    if ($.isFunction($.fn.validate)) {
        $.validator.setDefaults({
            highlight: function (element) {
                $(element).closest('.line').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.line').removeClass('has-error');
            },
            errorElement: 'span',
            errorClass: 'help-block',
            errorPlacement: function (error, element) {
                /*if(element.attr('data-validate-hide-message') == "1"){

                }
                else if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                }
                else if (element.parent('label').length) {
                    error.insertAfter(element.parent());
                }
                else {
                    error.insertAfter(element);
                }*/
            }
        });

        $('.form-validate').each(function () {
            var validator = $(this).validate();
            $(this).data('validator', validator);
        });

        $('.form-contact').submit(function () {
            var _this = this,
                $form = $(_this),
                $button = $form.find('.btn-submit'),
                $error = $form.find('.alert-danger'),
                $message = $form.find('.alert-success');
            $error.hide().html('');
            $message.hide().html('');
            if($form.valid()){
                $button.button('loading');
                $.ajax({
                    url: $form.attr('action'),
                    data: $form.serialize(),
                    dataType: 'json',
                    type: 'POST',
                    success:function (data) {
                        $button.button('reset');
                        if(data.error){
                            $error.show().html(data.error);
                        }else if(data.message){
                            resetForm(_this);
                            $message.show().html(data.message);
                        }
                    },
                    error:function () {
                        $error.show().html('Error');
                        $button.button('reset');
                    }
                });
            }
            return false;
        });
    }

    // datetimepicker
    $('.input-date-picker').datetimepicker({
        format : 'DD-MM-YYYY'
    });

    if($('#md-map').size() > 0){
        changeMap($('#md-map').data('title'),$('#md-map').data('address'));
    }
    // if($('#md-map').size() > 0){
    //     changeMap($('#md-map').data('title'),$('#md-map').data('address'));
    // }



    // add hyperlink to image in article content
    if($('.article-fulltext img').length > 0){
        // $('.article-fulltext img').each(function () {
        //     var _this = this, src = $(_this).attr('src'), hyperlink = '';
        //     hyperlink = '<a href="' + src + '" data-toggle="fancy-album"></a>';
        //     $(_this).wrap(hyperlink);
        // });
        // $('a[data-toggle=fancy-album]').each(function (e) {
        //     var _this = this, target = '.article-fulltext';
        //     $(_this).click(function (e2) {
        //         var images = [];
        //         $(target).find("a[data-toggle=fancy-album]").each(function (i) {
        //             var href = $(this).attr("href");
        //             images[i] = {'src':href};
        //         });
        //         $.fancybox.open(images,{
        //             type:'image',
        //             padding:0,
        //             loop: true,
        //             buttons : [
        //                 'close'
        //             ]
        //         });
        //         return false;
        //     });
        // });
    }

    // fancybox
    $('a[data-toggle=fancy-gallery]').each(function (e) {
        var _this = this,
            target = $(_this).data("target");
        $(_this).click(function (e2) {
            var images = [];
            $(target).find("a").each(function (i) {
                var href = $(this).attr("href");
                images[i] = {'src':href};
            });
            $.fancybox.open(images,{
                type:'image',
                padding:0,
                loop: true,
                buttons : [
                    'close'
                ]
            });
            return false;
        });
    });

    // mix content article
    var article_wrap = '.article-fulltext';
    if($(article_wrap).find('img').length > 0){
        $(article_wrap).find('img').each(function () {
            var _this = this, src = $(_this).attr('src'), hyperlink = '';
            hyperlink = '<a href="' + src + '" data-toggle="fancy-album"></a>';
            $(_this).wrap(hyperlink);
        });
    }

    // fancybox album
    var $links = $('a[data-toggle=fancy-album]');

    $links.on('click', function() {

        $.fancybox.open( $links, {
            padding:0,
            loop: true,
            buttons : [
                'close'
            ]
        }, $links.index( this ) );

        return false;
    });



    // $(".round").each(function () {
    //     $.fn.corner.defaults.useNative = false;
    //     $(this).find(".img").corner("bite top 30px");
    // });
    // $(".mask-content-inner").each(function () {
    //     $(this).corner("bite bottom 50px");
    // });

    $('.add-item > button').on('click', function(e) {
        var $this = $(this),
            $item = $('.add-item > button.active'),
            target = $this.attr('data-target'),
            selected = $this.attr('data-default'),
            $input = $(target).find('input[name=branch_id]');
        if($item.length > 0) {
            selected = $item.attr('data-value');
        }
        $input.val(selected);
    });



    $('.recruitment-tabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var $this = $(e.target);
        if($this.attr('href') == '#work-enviroment') {
            $('.h-post-cas').slick('setPosition');
            // $('.h-post-cas').slick({
            //     slidesToShow: 3,
            //     slidesToScroll: 1,
            //     nextArrow: '<span class="smooth next"><img src="' + template_url + 'frontend/images/next.png" alt="next"></span>',
            //     prevArrow: '<span class="smooth prev"><img src="' + template_url + 'frontend/images/prev.png" alt="prev"></span>',
            //     autoplay: true,
            //     swipeToSlide: true,
            //     autoplaySpeed: 4000,
            //     responsive: [
            //         {
            //             breakpoint: 991,
            //             settings: {
            //                 slidesToShow: 2,
            //             }
            //         },
            //         {
            //             breakpoint: 500,
            //             settings: {
            //                 slidesToShow: 1,
            //             }
            //         },
            //     ],
            // })
        }
    })

});