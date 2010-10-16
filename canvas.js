window.App = {
    "config" : {},
    "main" : function() {
        var canvas = $('#canvas'),
            ctx = canvas.getContext('2d'),
            imgd = ctx.createImageData(canvas.width, canvas.height),
            px = imgd.data,
            timer,
            xd = 2.5, yd = 2, xc = -0.5, yc = -0.5, maxiter = 100, globaliter = 0,
            startTime = +new Date();

        this.config = {
            canvasWidth : canvas.width,
            canvasHeight : canvas.height,
            xd : xd,
            yd : yd,
            xc : xc,
            yc : yc,
            maxiter : maxiter
        };

        $("#maxiter").value = maxiter;
        $("output[for*=maxiter]").innerHTML = maxiter;
        $("#maxiter").onchange = function() {
            maxiter = this.value;
            $("output[for*=maxiter]").innerHTML = this.value;
        }

        function $(query) {
            var el = document.querySelectorAll(query);
            return (el.length == 1) ? el[0] : el;
        }

        function animate() {
            var time = (+new Date()) - startTime;
            $("h1 i").innerHTML = Number(1000 / time).toFixed(2) + " fps";
            startTime = +new Date();

            // Start a new worker
            var worker = new Worker('worker.js');
            worker.postMessage(App.config);
            worker.onmessage = function(event) {
                px = event.data;
            }

            globaliter++;
            $("h1 b").innerHTML = globaliter;

            timer = setTimeout(function() {
                ctx.putImageData(imgd, 0, 0);
                xd -= 0.1;
                yd -= 0.1;
                xc -= 0.05;
                yc -= 0.05;
                animate();
            }, 40);
        }

        $("#start").onclick = function() {
            animate();
        }

        $("#stop").onclick = function() {
            clearTimeout(timer);
        }
    }
};