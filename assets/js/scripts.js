(function () {
    "use strict";

    // Preloader
    if ($('.preloader').length) {
        $(window).load(function () {
            $('.preloader').delay(400).fadeOut(500);
        })
    }

    $(document).ready(function () {

        // Navigation
        $("#ev-nav").navigation({
            offCanvasSide: "right",
            effect: "slide"
        });

        // Portfolio
        $('#grid-container').cubeportfolio({
            filters: '#filters-container',
            defaultFilter: '*',
            animationType: 'quicksand',
            gapHorizontal: 30,
            gapVertical: 30,

            // you can even add multiple filters here (e.g. `filters: '#filters-container1, #filters-container2, #filters-container3'`)
            plugins: {
                loadMore: {
                    element: '#js-loadMore-juicy-projects',
                    action: 'click',
                    loadItems: 4,
                },
                sort: {
                    element: '#js-sort-juicy-projects',
                }
            },
        });

        // Mailchimp
        if ($('#mc-form').length) {
            $('#mc-form').ajaxChimp({
                url: 'http://themeatom.us8.list-manage.com/subscribe/post?u=ff3692fd18ce8994d8d025404&amp;id=aab3b54290'
            });
        }

        // Owl Carousel
        $(".owl-carousel").owlCarousel({
            items: 2,
            loop: true,
            margin: 10,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayHoverPause: true,
            smartSpeed: 1000,
            autoplaySpeed: 1000,
            autoplayTimeout: 3500,
            responsive: {
                0: {
                    items: 1
                },
                767: {
                    items: 1
                },
                768: {
                    items: 2
                }
            }
        });

        $(".client-carousel").owlCarousel({
            items: 5,
            loop: true,
            margin: 10,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayHoverPause: true,
            smartSpeed: 1000,
            autoplaySpeed: 1000,
            autoplayTimeout: 2500,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        });
    });


    /* ---------------------------------------------
     CONTACT FORM
     --------------------------------------------- */
    $('#contact_form').on('submit', function (e) {
        e.preventDefault();
        var $this = $(this);

        $('button[type="submit"]', this).attr('disabled', 'disabled');
        $('.ast_loader', this).fadeIn();

        var form_data = $this.serialize();

        var required = 0;
        $(".required", this).each(function () {
            if ($(this).val() === '') {
                $(this).addClass('reqError');
                required += 1;
            } else {
                if ($(this).hasClass('reqError')) {
                    $(this).removeClass('reqError');
                    if (required > 0) {
                        required -= 1;
                    }
                }
            }
        });

        if (required === 0) {
            $.ajax({
                type: 'POST',
                url: 'ajax/mail.php',
                data: { form_data: form_data },
                success: function (data) {
                    $('button[type="submit"]', $this).removeAttr('disabled');
                    $('.ast_loader', $this).fadeOut();

                    $this.remove('.ast_con_message');
                    $('.ast_con_message', $this).fadeIn().html('Congratulation! Message successfully sent.');
                    setTimeout(function () {
                        $('.ast_con_message', $this).fadeOut().html('');
                    }, 5000);
                }
            });
        } else {
            $('button[type="submit"]', $this).removeAttr('disabled');
            $('.ast_loader', $this).fadeOut();
            $('.ast_con_message', $this).fadeOut().html('');
        }

    });

    $(".required").on('keyup', function () {
        $(this).removeClass('reqError');
    });

    // Sticky Nav
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 20) {
            $("#top-nav").addClass("ev-nav-fixed");
        } else {
            $("#top-nav").removeClass("ev-nav-fixed");
        }
    });


})();
