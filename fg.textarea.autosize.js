/**
 * Prologue :
 *
 * Textarea autosize script
 * By Francois Gelinas
 * April 2012
 *
 * Require : jQuery 1.7 or earlier
 */

/* Chapter 1 : the setup */
(function( $, document ) {

    $.fn.textareaAutosize = function() {

        createMagicElement();

        /* Chapter 2 : meet the characters */
        this.each(function() {
            $(this).on( 'keydown.textareaAutosize', textareaKeyDown )
                   .on( 'keyup.textareaAutosize', textareaKeyUp )
                   .css( 'overflow', 'hidden' ); // prevent scrollbars
            adjustHeight.apply(this);
        });
    }

    /* Chapter 3 : Some action */
    var
        textareaKeyUp = function() {
            adjustHeight.apply(this);
        },

        textareaKeyDown = function() {
           // adjustHeight.apply(this);
        },

        adjustHeight = function() {
            var textarea = $(this),  // why yes I like to prefix jQuery element variable with a $
                content = textarea.val()
                                  .replace( /\n/g, '<br>' )
                                  + '<br><br>'; // add extras <br> cause it feels more responsive this way

            magicElement.css( 'font-size', textarea.css( 'font-size' ) )
                         .css( 'font-family', textarea.css( 'font-family') )
                         .html( content ) // replace carriage return with break rows
                         .css( 'width', textarea.width() );

            textarea.css( 'height', magicElement.height());
        },

        /* Chapter 4 : the magic - our helper element */
        magicElement = $('<div id="textareaAutosizeMagicHelper" style="display: inline-block; display: none"></div>'),
        createMagicElement = function() {
            if (magicElement.parent().typeName != 'body') {
                magicElement.appendTo('body');
            }
        };

})( jQuery, document );