var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    imgd = ctx.createImageData(canvas.width, canvas.height),
    px = imgd.data,
    timer,
    xd = 2.5, yd = 2, xc = -0.5, yc = -0.5, max_iteration = 100;

function computeColor(x, y) {
    x = xd * (x /canvas.width + xc);
    y = yd * (y /canvas.height + yc);

    var x0 = x,
        y0 = y,
        iteration = 0;

    while (x * x + y * y <= 4 && iteration < max_iteration ) {
        var xtemp = x*x - y*y + x0;
        y = 2*x*y + y0;
        x = xtemp;
        iteration++;
    }

    return Math.round(255 * iteration / max_iteration);
}

function setPixel(x,y,c) {
    var i = (x + y * canvas.width) * 4;
    px[i + 0] = c[0];
    px[i + 1] = c[1];
    px[i + 2] = c[2];
    px[i + 3] = c[3] || 255;
}

function animate() {
    for (x = 0; x < canvas.width; x++) {
        for (y = 0; y < canvas.height; y++) {
            var c = computeColor(x,y);
            setPixel(x,y, [255, 0, 0, c]);
        }
    }

    timer = setTimeout(function() {
        ctx.putImageData(imgd, 0, 0);
        xd -= 0.1;
        yd -= 0.1;
        // xc += 0.1;
        animate();
    }, 40);
}

animate();