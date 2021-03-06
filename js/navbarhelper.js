function closeBanner(target){
  // close banner if click is not a banner navigation item (otherwise the banner starts to close and freezes on transition)
  if ($('.navbar-nav-collapse').hasClass('show') && !$(target).parents().is('dd') && !$(target).parents().is('.nav-header')){
    // console.log('close banner called');
    // $('.navbar-nav-collapse').removeClass('notransition');
    $(".navbar-nav-collapse").collapse('hide').removeClass('notransition');
    $('.nav-item').removeClass('active');
  }
}

function changeBanner(event){
  if ($('.navbar-nav-collapse').hasClass('show')){
    // console.log('has show')
    $('.navbar-nav-collapse').addClass('notransition'); //remove transition
    $(".navbar-nav-collapse").collapse('hide'); //hide the previous dropdown
  } 
}

$(document).ready(function () {
  $('.js-search,.js-search-adv').hide();
  $('[data-toggle="tooltip"]').tooltip({
    delay: { "show": 100, "hide": 100 }
  });
  $('[data-toggle="popover"]').popover();

  $('.nav-link').click(function(e) {
    $('.nav-item').removeClass('active');
    $('.nav-item a').blur();
    $('.navbar-nav-collapse').removeClass('notransition');
  });

  $(".js-search-btn, .js-search-label").click(function (e) {
        e.preventDefault();
        var jssearchisVisible = $(".js-search").is(":visible");
        var jssearchisBlank = $(".js-search").val().length === 0;
        // console.log(jssearchisBlank);
        if (jssearchisVisible === false || jssearchisBlank === true) {
            $(".js-search").animate({ width: 'toggle' });
            $(".js-search-adv").animate({ width: 'toggle' });
            $(".js-search").focus();
        } else {
            window.location.href = "https://www.leg.state.mn.us/search?q=" + $('#main-search').val();
        };
    });
    $("#main-search").on("keydown", function (event) {
        if (event.which === 13)
            window.location.href = "https://www.leg.state.mn.us/search?q=" + $('#main-search').val();
    });

    $(".js-sm-search").on("keydown", function (event) {
      
        if (event.which === 13){
          event.preventDefault();
            window.location.href = "https://www.leg.state.mn.us/search?q=" + $('.js-sm-search').val();
        }
    });
    $(".js-search-sm-btn").click(function (event) {
        
            window.location.href = "https://www.leg.state.mn.us/search?q=" + $('#sm-search').val();
    });


  //switch active class and change banner if already open
  $('.navbar-nav-collapse').on('show.bs.collapse', function () {
    $('.nav-item').removeClass('active');
    var li = $(this).prev();    
    if (li.not('active')){
      // console.log('banner open, need to toggle')
      changeBanner($(this))
      li.addClass('active');
    } 
  });

  // hide navbar-nav-collapse when user clicks away from navigation menu
  $(document).click(function (e) {
    var target = $(e.target);
    if (!target.hasClass('nav-link') || !target.closest('.bg-dark')){
      // console.log('here')
      if($('.navbar-nav-collapse').hasClass('notransition')){
        $(".navbar-nav-collapse").removeClass('notransition')
      }
      closeBanner(target);
    } 
  });

  $('.js-more-accordian').on('shown.bs.collapse', function () {
    var textOption = $(this).attr('data-child');
    $(textOption).html('Fewer Links');
  });
  $('.js-more-accordian').on('hidden.bs.collapse', function () {
    var textOption = $(this).attr('data-child');
    $(textOption).html('More Links');
  });

});