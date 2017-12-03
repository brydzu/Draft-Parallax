$(window).scroll(function(){
  var wScroll = $(this).scrollTop();
  
})

  var datas = [{
    "logoUrl":"ciao",
    "bgCardUrl":"ciao",
    "title":"Nicola Tesla",
    "subTitle":"The Misunderstood",
    "social":{"facebook":"#1","linkedin":"#2","twitter":"#3","github":"#4"},
    "description":"text text text text text text text ",
    "dataHref":"Nikola_Tesla"
  },
   {
    "logoUrl":"ciao",
    "bgCardUrl":"ciao",
    "title":"Nicola Tesla",
    "subTitle":"The Misunderstood",
    "social":{"facebook":"#5","linkedin":"#6","twitter":"#7","github":"#8"},
    "description":"text text text text text text text ",
    "dataHref":"Nikola_Tesla"
    }];
//console.log(datas);
jQuery.each(datas, function(i, val) {
 console.log(val.social.facebook);

var view = {}; 
view.container = '<div class="o-card" id="Nikola_Tesla"></div>';
view.header = '<div class="o-card_header"><div class="o-card_headerHeroImg"  data-image="var"></div></div></div>';
view.socialItems;
view.social = '<ul class="o-card-headerList">'+
  '<li class="o-card-headerList--openIcons ">'+
  '<span></span>'+
  '<span></span>'+
  '<span></span>'+
  ' </li>'+
  view.socialItems+
  '</ul>';
view.logo = ' <div class="o-card_logo" style="background:url(var) center no-repeat;">';
view.body = '<div class="o-card_body">'+
  '<h2 class="o-card_title">var</h2>'+
  '<h3 class="o-card_subTitle">var</h3>'+
  '<p class="o-card_paragraph">var</p>'+
  '</div>';
view.footer = '<div class="o-card_footer">'+
  '<a data-href="Nikola_Tesla" target="_blank" class="a-readMore" data-modal="#first">Read More <i class="icon-right"></i></a>'+
  ' </div>';
view.modal = '<div class="o-modal">'+
  '<span class="o-modal__close">'+
  '<i class="icon-cancel-circled"></i>'+
  ' </span>'+
  '<h2 class="o-modal__title"></h2>'+
  '<div class="o-modal__inner"></div>'+
  '</div>';
view.loader =' <div class="a-loader">'+
  '<div class="a-loader__bar"></div>'+
  '<div class="a-loader__bar"></div>'+
  '<div class="a-loader__bar"></div>'+
  '</div>';

});
//console.log(view.social);

//view.social.innerHTML();

$(window).on("load", function() {
  //console.log(view);
  $(".o-card_headerHeroImg").each(function() {
    var bg = $(this).attr("data-image");
    $(this).css({ "background-image": "url(" + bg + ")" });
  });

  $(document).on("click touch", ".o-card-headerList--openIcons", function(e) {
    $(this).parent().toggleClass("isOpen");
    $(this).parent().next().toggleClass("isOpen");
    var btnOffset = $(this).offset(),
    xPos = e.pageX - btnOffset.left,
    yPos = e.pageY - btnOffset.top;
    //console.log(xPos +' / '+ yPos);
    return false;
  });
  
  $(document).on("click touch", ".o-card-headerList li", function(e) {
    e.stopPropagation();
    return false;
  });
  
  $(document).on("click touch", function() {
    $(".o-card-headerList,.o-card_logo").removeClass("isOpen");
  });
  
  $('.o-card_paragraph').each(function(){
    var _this = $(this);
    var pHeight = _this.height();
    console.log(pHeight);
    _this.after('<span class="a-more"></span>')
  });
  
  $(document).on( 'click' , '.a-more' , function(){
    $(this).prev('p').toggleClass('isToggle');
    $(this).toggleClass('isActive');
  });
  
  $('.a-readMore').on('click touch', function(event) {
    event.preventDefault();
    $(id_target).find('.o-modal__close').attr('data-close','');
    var this_target = $(this).attr('data-href');
    var _this = $(this);
    var id_target = '#'+this_target.replace(/\./g,'');
    console.log(id_target);
    $(id_target).find('.a-loader').show();
    $(id_target).find('.o-modal__close').attr('data-close',id_target);
    
    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php',
        data: {
            format: 'json',
            action: 'parse',
            page: this_target,
            prop:'text',
            section:0,
        },
        dataType: 'jsonp',
        success: function (data) {
        //console.log(data)
        $(id_target).find('.o-modal__inner').html('');
        $(id_target).find('.o-modal__title').html('').hide();    
        $(id_target).find('.o-modal').addClass('isOpen');
        if(!$(id_target).find('.a-more').hasClass('isActive')){
            $(id_target).find('.a-more').trigger('click');
         }
        var markup = data.parse.text['*'];
        var i = $('<div></div>').html(markup);
        i.find('a').each(function() { $(this).replaceWith($(this).html()); });
        i.find('sup').remove();
        i.find('.mw-ext-cite-error').remove();
         setTimeout(function() {
            $(id_target).find('.o-modal__title').html( data.parse.title).fadeIn(300);
            $(id_target).find('.o-modal__inner').html($(i).find('p'));
            $(id_target).find('.a-loader').hide();
          }, 1000);
        }
    });
  });
  
  $('.o-modal__close').on('click touch', function(){
    var close_target = $(this).attr('data-close');
    $(close_target).find('.o-modal').removeClass('isOpen');
    $(close_target).find('.o-modal__inner').html('');
    $(close_target).find('.o-modal__title').html('').hide();       
    $(close_target).find('.a-more').trigger('click');
  });
  
});