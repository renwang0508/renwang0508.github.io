function imageResize(ele, maxHeight) {
    const height = ele.height();
    const width = ele.width();
    const scale = maxHeight / height;
    ele.css("height", maxHeight);
    ele.css("width", width * scale);
}

function imagePreview() {
    const xOffset = 25;
    const maxHeight = 200;
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
            const yOffset = -xOffset - $("#preview img").height() / 2;
            $("#preview").css("top", (ele.pageY + yOffset) + "px");
            $("#preview").css("left", (ele.pageX + xOffset) + "px");
        }
    );
}

$(document).ready(function(){ imagePreview(); });

