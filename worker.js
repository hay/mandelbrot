self.onmessage = function(event) {
    main(event.data);
}

function main(conf) {
    var px = [];

    function calc(x, y) {
        x = conf.xd * (x / conf.canvasWidth + conf.xc);
        y = conf.yd * (y / conf.canvasHeight + conf.yc);

        var x0 = x,
            y0 = y,
            iteration = 0;

        while (x * x + y * y <= 4 && iteration < conf.maxiter) {
            var xtemp = x*x - y*y + x0;
            y = 2*x*y + y0;
            x = xtemp;
            iteration++;
        }

        return Math.round(255 * iteration / conf.maxiter);
    }

    function setPixel(x, y, c) {
        var i = (x + y * conf.canvasWidth) * 4;
        px[i + 0] = c[0];
        px[i + 1] = c[1];
        px[i + 2] = c[2];
        px[i + 3] = c[3] || 255;
    }

    for (x = 0; x < conf.canvasWidth; x++) {
        for (y = 0; y < conf.canvasHeight; y++) {
            var c = calc(x,y);
            setPixel(x,y, [255, 0, 0, c]);
        }
    }
    
    postMessage(px);
}