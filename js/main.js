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

    const previewLinks = document.querySelectorAll("img.preview");

    previewLinks.forEach(function(link) {
        link.addEventListener("mouseover", function(event) {
            const previewEle = document.createElement("p");
            previewEle.id = "preview";
            previewEle.innerHTML = "<img src='" + this.src + "'>";
            document.body.appendChild(previewEle);
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
        let spans = items[i].querySelectorAll("span");
        for (let j=0; j<spans.length-1; j++) {
            spans[j].innerHTML += " /";
        }
    }

    for (let i=0; i<authors.length; i++) {
        let spans = authors[i].querySelectorAll("span");
        for (let j=0; j<spans.length-1; j++) {
            spans[j].innerHTML += ",";
        }
    }
}

function setBookFormat() {
    const books = document.getElementsByClassName("book");

    for (let i=0; i<books.length; i++) {
        let booktitle = books[i].querySelector(".booktitle");
        booktitle.innerHTML = "<i>" + booktitle.innerHTML + "</i>,";

        let highlights = books[i].querySelector(".highlights");
        if (highlights) {
            highlights.innerHTML = "(" + highlights.innerHTML + ")";

            let year = books[i].querySelector(".year");
            year.style.marginRight = "6px";
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    setPreview();
    setDelimiter();
    setBookFormat();
});

