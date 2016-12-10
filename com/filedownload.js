$(document)
    .off('click', '#download-track, .actions-list :nth-child(2)')
    .on('click', '#download-track, .actions-list :nth-child(2)', function(e){
    var self = this;
    e.preventDefault();

    var opts = {
          lines: 13 // The number of lines to draw
        , length: 28 // The length of each line
        , width: 14 // The line thickness
        , radius: 42 // The radius of the inner circle
        , scale: 1 // Scales overall size of the spinner
        , corners: 1 // Corner roundness (0..1)
        , color: '#fff' // #rgb or #rrggbb or array of colors
        , opacity: 0.25 // Opacity of the lines
        , rotate: 0 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 1 // Rounds per second
        , trail: 60 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '46%' // Top position relative to parent
        , left: '50%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning
    }

    var spinner  = new Spinner(opts).spin();
    $('.content:visible').append(spinner.el)
    var filename = $(self).attr('download') + '.mp3';
    var url      = e.srcElement.href;
    var xhr      = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob"; // Force the HTTP response, response-type header to be blob

    xhr.onload = function() {
        var blob = xhr.response; //xhr.response is now a blob object
        saveAs(blob, filename);
        spinner.stop();
    }

    xhr.send();
});
