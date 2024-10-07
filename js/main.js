var windowWidth;
var windowHeight;
var keuze;
var besparingTot = 0;
var glasBesp = 0;
var gasBesp = 0;
var radiatorBesp = 0;
var warmtepompBesp = 0;
var kozijnenBesp = 0;
var spouwBesp = 0;

$('document').ready(checkResolution());

function checkResolution() {
    windowHeight = $(window).height();
    windowWidth = $(window).width();

    if ((windowWidth < 1366) || (windowHeight < 846)) {
        alert('Je resolutie is te klein voor een goede ervaring. De minimale breedte is 1366px');
    }
}

// add begin image 
$.ajax({
    // url: 'template-parts/verhaal.php',
    url: 'template-parts/begin.php',

    success: function (data) {
        $('div.container').append(data);
    }

})

// end video
function endVideo() {
    console.log('video ended');
    var tumbUrl = 'template-parts/verhaal.php';

    $.ajax({
        url: tumbUrl,

        success: function (data) {
            $('div.container').empty();
            $('div.container').append(data);
        }
    });
};

// to next page
$("body").on("click", "a.button.begin", (function (event) {
    event.preventDefault();
    $(this).addClass('clicked');

    var tumbUrl = $(this).attr("href");
    if (tumbUrl == 'template-parts/plattegrond.php') {
        $('div.container').addClass('scrollable')
    }

    $.ajax({
        url: tumbUrl,

        success: function (data) {
            $('div.container').empty();
            $('div.container').append(data);
            if (tumbUrl == 'template-parts/einde.php') {
                besparing();
            }

        }
    });
}));

// naar keuze
$('body').on("click", "img.plattegrond-img", (function (event) {
    event.preventDefault();
    $('div.container').empty();
    var thumbUrl = 'template-parts/keuzes/' + $(this).attr('id') + '.php'

    $.ajax({
        url: thumbUrl,

        success: function (data) {
            $('div.container').append(data);
        }
    });

}));

$('body').on('click', 'div.keuze', (function (event) {
    event.preventDefault();
    var infoText = 'Info over ';
    $('div.info h4').remove();
    $('div.info').fadeIn();

    if ($(this).hasClass('keuze1')) {
        $(this).addClass('gekozen');
        $('div.keuze2').removeClass('gekozen');

        var keuzeText = $('div.keuze1 p').text();
        var h3Text = infoText + keuzeText;
        $('div.info').prepend('<h4>' + h3Text + '</h4>');

        $('p.info1').fadeIn();
        $('p.info2').css({ 'display': 'none' });


    } else if ($(this).hasClass('keuze2')) {
        $(this).addClass('gekozen');
        $('div.keuze1').removeClass('gekozen');

        var keuzeText = $('div.keuze2 p').text();
        var h3Text = infoText + keuzeText;


        $('div.info').prepend('<h4>' + h3Text + '</h4>');

        $('p.info2').fadeIn();
        $('p.info1').css({ 'display': 'none' });

    };

}));

// naar plattegrond/home
$('body').on('click', '#home-btn', (function (event) {
    event.preventDefault();
    $('div.container').empty();
    var thumbUrl = 'template-parts/plattegrond.php'

    $.ajax({
        url: thumbUrl,

        success: function (data) {
            $('div.container').append(data);
            besparing();
        }
    })

}));

// terug naar je keuze
$('body').on('click', '#terug-btn', (function (event) {
    event.preventDefault();
    $('div.container').empty();
    var thumbUrl = 'template-parts/keuzes/' + keuze + '.php'

    $.ajax({
        url: thumbUrl,

        success: function (data) {
            $('div.container').append(data);
        }
    })
}));

// naar je keuze
$('body').on('click', 'a.button.choices', (function (event) {
    event.preventDefault();
    keuze = $('div.box').attr('id');
    
    if ($('div.keuze1').hasClass('gekozen')) {
        var thumbUrl = 'template-parts/keuzes/' + keuze + '-keuze1.php';
        $('div.container').empty();
        

        $.ajax({
            url: thumbUrl,

            success: function (data) {
                $('div.container').append(data);
                calcImgMargin();
            }
        });

        if (keuze == 'glas') {
            glasBesp = 22;
        } else if (keuze == 'gas') {
            gasBesp = 0;
        } else if (keuze == 'radiator') {
            radiatorBesp = 10;
        } else if (keuze == 'warmtepomp') {
            warmtepompBesp = 15;
        } else if (keuze == 'kozijnen') {
            kozijnenBesp = 9;
        } else if (keuze == 'spouwmuren') {
            spouwBesp = 0;
        }

    } else if ($('div.keuze2').hasClass('gekozen')) {
        var thumbUrl = 'template-parts/keuzes/' + keuze + '-keuze2.php';
        $('div.container').empty();

        $.ajax({
            url: thumbUrl,

            success: function (data) {
                $('div.container').append(data);

                calcImgMargin();
            }
        });

        if (keuze == 'glas') {
            glasBesp = 30;
        } else if (keuze == 'gas') {
            gasBesp = 0;
        } else if (keuze == 'radiator') {
            radiatorBesp = 11;
        } else if (keuze == 'warmtepomp') {
            warmtepompBesp = 16;
        } else if (keuze == 'kozijnen') {
            kozijnenBesp = 9;
        } else if (keuze == 'spouwmuren') {
            spouwBesp = 21;
        }

    } else {
        alert('Maak een keuze.');
    }

}));


function besparing() {
    $('.besparingTotaal').empty();

    besparingTot = glasBesp + gasBesp + radiatorBesp + warmtepompBesp + kozijnenBesp;

    $('div.besparingTotaal').append('<h3>Besparing: €' + besparingTot + ',- per maand</h3>');

    $('h2.besparingTotaal').append('€' + besparingTot + ',-');
    console.log(besparingTot);
}

function calcImgMargin() {  
    $('.infoImg img').on('load', function(){
        var infoImgHeight = (($('div.infoImg').height() - $('.infoImg img').height()) / 2);

        $('.infoImg img').css({
            'margin-top': infoImgHeight
        });
    
        console.log($('.infoImg img').height());
    });

}


