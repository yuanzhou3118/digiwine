function preloadimages(arr,percent) {
    var newimages = [], loadedimages = 0;
    var arr = (typeof arr != "object") ? [arr] : arr;
    function imageloadpost() {
        loadedimages++;
        if (loadedimages <= arr.length) {
            fnLoad(loadedimages, arr.length, percent);
            if (loadedimages == arr.length) {
                $(".loading").fadeOut()
                $("#container").fadeIn();
                initPage();
            }
        }
    }
    for (var i = 0; i < arr.length; i++) {
        newimages[i] = new Image();
        newimages[i].src = "images/" + arr[i];
        newimages[i].onload = function () {
            imageloadpost();
        }
        newimages[i].onerror = function () {
            imageloadpost();
        }
    }
}
function fnLoad(iNow, sum, percent) {
    percent.html(parseInt((iNow / sum) * 100) + "%");
    $('#p-bar').width(parseInt((iNow / sum) * 100) + "%");
}