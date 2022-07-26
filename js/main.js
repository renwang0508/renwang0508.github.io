function resizeImg(ele, maxHeight) {
    const height = ele.height();
    const width = ele.width();
    const scale = maxHeight / height;

    ele.css("height", maxHeight);
    ele.css("width", width * scale);
}

function setPreview() {
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
            if ($("#preview img").height() > maxHeight) {
                resizeImg($("#preview img"), maxHeight);
            }
            const yOffset = -xOffset - $("#preview img").height() / 2;
            $("#preview").css("top", (ele.pageY + yOffset) + "px");
            $("#preview").css("left", (ele.pageX + xOffset) + "px");
        }
    );
}

function setDelimiter() {
    function checkSpan(ele) {
        return ele.tagName === "SPAN";
    }

    const ua = window.navigator.userAgent;
    const isNotIE = !(/MSIE|Trident/.test(ua));
    const items = document.getElementsByClassName("items");
    const authors = document.getElementsByClassName("authors");
    let spans;

    for (let i=0; i<items.length; i++) {
        if (isNotIE) {
            spans = items[i].querySelectorAll(":scope > span");
        } else {
            spans = Array.prototype.filter.call(items[i].children, checkSpan);
        }
        for (let j=0; j<spans.length-1; j++) {
            spans[j].innerHTML += " /";
        }
    }

    for (let i=0; i<authors.length; i++) {
        if (isNotIE) {
            spans = authors[i].querySelectorAll(":scope > span");
        } else {
            spans = Array.prototype.filter.call(authors[i].children, checkSpan);
        }
        for (let j=0; j<spans.length-1; j++) {
            spans[j].innerHTML += ",";
        }
    }
}

$(document).ready(
    function() {
        setPreview();
        setDelimiter();
    }
);
