function resizeImg(ele, maxHeight) {
    const height = ele.offsetHeight;
    const width = ele.offsetWidth;
    const scale = maxHeight / height;

    ele.style.height = maxHeight + "px";
    ele.style.width = (width * scale) + "px";
}

function setPreview() {
    const xOffset = 25;
    const maxHeight = 200;

    const previewLinks = document.querySelectorAll("a.preview");

    previewLinks.forEach(link => {
        link.addEventListener("mouseover", function(event) {
            const previewEle = document.createElement("p");
            const previewImg = document.createElement("img");

            previewEle.id = "preview";
            previewImg.src = this.href;
            previewEle.appendChild(previewImg);
            document.body.appendChild(previewEle);
            previewEle.style.display = "block";
            setTimeout(() => previewEle.style.opacity = "1", 0);
        });

        link.addEventListener("mouseout", function() {
            const previewEle = document.getElementById("preview");
            if (previewEle) {
                document.body.removeChild(previewEle);
            }
        });

        link.addEventListener("mousemove", function(event) {
            const previewEle = document.getElementById("preview");
            const previewImg = previewEle.querySelector("img");

            if (previewImg.offsetHeight > maxHeight) {
                resizeImg(previewImg, maxHeight);
            }

            const yOffset = -xOffset - previewImg.offsetHeight / 2;
            previewEle.style.top = (event.pageY + yOffset) + "px";
            previewEle.style.left = (event.pageX + xOffset) + "px";
        });
    });
}

function setDelimiter() {
    const items = document.getElementsByClassName("items");
    const authors = document.getElementsByClassName("authors");

    for (let i=0; i<items.length; i++) {
        let spans = items[i].querySelectorAll(":scope > span");
        for (let j=0; j<spans.length-1; j++) {
            spans[j].innerHTML += " /";
        }
    }

    for (let i=0; i<authors.length; i++) {
        let spans = authors[i].querySelectorAll(":scope > span");
        for (let j=0; j<spans.length-1; j++) {
            spans[j].innerHTML += ",";
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const ua = window.navigator.userAgent;
    const isIE = /MSIE|Trident/.test(ua);
    if (isIE) {
        alert("This page does not support IE.");
        return;
    }

    setPreview();
    setDelimiter();
});

