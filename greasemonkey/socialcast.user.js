// ==UserScript==
// @name                Socialcast Toggle Monospace
// @author              Demian Johnston
// @namespace           http://infonet.factset.com/view/Main/DemianJohnston
// @description         Version 0.5 of Script to put a Toggle Fixed Width in the Gear Menu for socialcast messages
// @include             http://*.socialcast.com/*
// @include             https://*.socialcast.com/*
// ==/UserScript==

function letsJQuery()
{
      //Here we hijack SocialCasts Message Rendering Function so that we can add action elements as message come streaming in
      $.fn.streamMessage_orig=$.fn.streamMessage;
      $.fn.streamMessage=function(messageData) {      
        //first process the messageData with SocialCasts Code (we expect it to return the newly created message div)
        var message=$(this).streamMessage_orig(messageData);
        message.attr("djmod","2"); 
	var moreActions=$(this).find('.additional_actions:first');

        // We will append a new Element to the Gear Box with a click function that does the heavy lifting
        $('<a href="#">Toggle Fixed Width</a>').appendTo($("<li />").appendTo(moreActions)).click(function(e){ 
												    e.preventDefault();
												    if (message.attr('fixed') == 'true') {
												      message.attr('fixed','false');
												      message.find('.entry_details .comment_body').css('font-family','');
												      message.find('p').show();
												      message.find('pre').hide();
												    } else {
												      message.attr('fixed','true');
												      message.find('.entry_details .comment_body').css('font-family','monospace');
												      var content="";
												      message.find('.entry_details > p').each(function(i) { content += $(this).text() + "\n";});
												      if (message.find('.entry_details > pre').length == 0) {
													$('<pre />').appendTo(message.find('.entry_details:first')).html(content);
													message.find('.comment_body').each(function(i) {
																	     var lcontent="";
																	     $(this).find('p').each(function(j){ lcontent+=$(this).text() + "\n";});
																	     $('<pre />').appendTo(this).html(lcontent);
																	     $(this).find('p').hide();
																	   });
																	       
												      }
												      message.find('pre').show().css("white-space","pre-wrap");
												      message.find('p').hide();
												      
												    }
												  });


        return $(this);
      }
      
      // While we've replaced the code that generates new message divs, we need to capture the ones that have already been created
      $(".hentry:not(:has([djmod]))").each(function(j) { var message=$(this);$(this).find('.additional_actions:not(:has(a[fix]))').each(function(i) {$('<a href="#" fix="">Toggle Fixed Width</a>').appendTo($("<li />").appendTo($(this))).click(function(e){ 
        e.preventDefault();
        if (message.attr('fixed') == 'true') {
            message.attr('fixed','false');
            message.find('.entry_details .comment_body').css('font-family','');
            message.find('p').show();
            message.find('pre').hide();
        } else {
            message.attr('fixed','true');
            message.find('.entry_details .comment_body').css('font-family','monospace');
            var content="";
            message.find('.entry_details > p').each(function(i) { content += $(this).text() + "\n";});
            if (message.find('.entry_details > pre').length == 0) {
                $('<pre />').appendTo(message.find('.entry_details:first')).html(content);
                message.find('.comment_body').each(function(i) {
                var lcontent="";
                $(this).find('p').each(function(j){ lcontent+=$(this).text() + "\n";});
                                                    $('<pre />').appendTo(this).html(lcontent);
                                                    $(this).find('p').hide();
                                                    });
            }
            message.find('pre').show().css("white-space","pre-wrap");
            message.find('p').hide();
            
		}
        }); }); 
        message.attr('djmod','1');  });
  }

  
window.addEventListener('load',function(e) {
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ letsJQuery +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
		       },false);
