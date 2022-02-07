function imageResize(ele, maxHeight) {
    height = ele.height();
    width = ele.width();
    scale = maxHeight / height;
    ele.css("height", maxHeight);
    ele.css("width", width * scale);
}

function imagePreview() {
    offset = 25;
    maxHeight = 200;
    $("a.preview").hover(
        function(ele) {
            $("body").append("<p id='preview'><img src='" + this.href + "'></p>");
            $("#preview").fadeIn("fast");
        }, function() {
            $("#preview").remove();
        }
    );
    $("a.preview").mousemove(
        function(ele) {
            if($("#preview img").height() > maxHeight) {
                imageResize($("#preview img"), maxHeight);
            }
            yOffset = -offset - $("#preview img").height() / 2;
            $("#preview").css("top", (ele.pageY + yOffset) + "px");
            $("#preview").css("left", (ele.pageX + offset) + "px");
        }
    );
};

$(document).ready(function(){ imagePreview(); });
