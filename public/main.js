$("#slideshow > div:gt(0)").hide();

setInterval(function() {
    $('#slideshow > div:first')
        .fadeOut(1000)
        .next()
        .fadeIn(1000)
        .end()
        .appendTo('#slideshow');
}, 3000);

document.querySelector(".burger_menu").addEventListener("click", function (e){
        this.classList.toggle("active");
        document.querySelector(".menu").classList.toggle("show")
    }

);