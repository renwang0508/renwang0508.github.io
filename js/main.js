function getTextWidth(text, font) {
    if(!getTextWidth.canvas) {
        getTextWidth.canvas = document.createElement("canvas");
    }
    var context = getTextWidth.canvas.getContext("2d");
    context.font = font;
    return context.measureText(text).width;
}

function getCssStyle(ele, prop) {
    return window.getComputedStyle(ele, null).getPropertyValue(prop);
}

function getContextFont(ele) {
    const fontWeight = getCssStyle(ele, "font-weight");
    const fontSize = getCssStyle(ele, "font-size");
    const fontFamily = getCssStyle(ele, "font-family");
    return `${fontWeight} ${fontSize} ${fontFamily}`;
}

function addNewline() {
    const authors_set = document.getElementsByClassName("authors");
    const font_body = getContextFont(document.body);
    for(var i=0; i<authors_set.length; i++) {
        var width = authors_set[i].offsetWidth;
        var authors = authors_set[i].getElementsByTagName("span");
        var cum_len = 0;
        for(var j=0; j<authors.length; j++) {
            if(authors[j].innerHTML.includes("<br>")) {
                authors[j].innerHTML = authors[j].innerHTML.replace("<br>", "");
            }
            var font = getContextFont(authors[j]);
            var len = getTextWidth(authors[j].innerHTML, font) + getTextWidth(",", font_body);
            cum_len += len;
            if(cum_len > width) {
                authors[j].innerHTML = "<br>" + authors[j].innerHTML;
                cum_len = len;
            }
            cum_len += getTextWidth(" ", font_body);
        }
    }
}

window.onload = addNewline;
window.addEventListener('resize', function(event){ addNewline(); });
