function drag(obj,options){
    var options=options||{};
    var clientW=document.documentElement.clientWidth;
    var clientH=document.documentElement.clientHeight;
    var offsetW=obj.offsetWidth;
    var offsetH=obj.offsetHeight;
    var  x=options.x===undefined?true:options.x;
    var  y=options.y===undefined?true:options.y;
    var  animate=options.animate===undefined?true:options.animate;
    var  minx=options.minx||0;
    var  maxx=options.maxx|| clientW-offsetW;
    var  miny=options.miny||0;
    var  maxy=options.maxy|| clientH-offsetH;
    obj.onmousedown=function(e){
        var e=e||window.event;
        var ox= e.offsetX;
        var oy= e.offsetY;
        var startx= e.clientX,starty= e.clientY,endx,endy,lenx,leny;
        console.log(startx+"--"+starty);
        document.onmousemove=function(e){
            var e=e||window.event;
            var cx= e.clientX;
            var cy= e.clientY;
            var left=cx-ox;
            var top=cy-oy;
            if(left<minx){
                left=minx;
            }
            if(left>maxx){
                left=maxx
            }
            if(top<miny){
                top=miny;
            }
            if(top>maxy){
                top=maxy
            }
            if(x) {
                obj.style.left = left + "px";
            }
            if(y) {
                obj.style.top = top + "px";
            }

            if(e.preventDefault){
                e.preventDefault()
            }else{
                e.returnValue=false;
            }

            endx=cx;
            endy=cy;
            lenx=endx-startx;
            leny=endy-starty;
            startx=endx;
            starty=endy;
            e.stopPropagation()
        }

        document.onmouseup=function(){
            if(animate) {
                // console.log(lenx+"--"+leny);
                var speed = 0.6;

                var t = setInterval(function () {
                    lenx *= speed;
                    leny *= speed;
                    var resultx = obj.offsetLeft + lenx;
                    var resulty = obj.offsetTop + leny;

                    if(resultx<minx){
                        resultx=minx;
                    }
                    if(resultx>maxx){
                        resultx=maxx
                    }
                    if(resulty<miny){
                        resulty=miny;
                    }
                    if(resulty>maxy){
                        resulty=maxy
                    }
                    if (x) {
                        obj.style.left = resultx + "px";
                    }
                    if (y) {
                        obj.style.top = resulty + "px";
                    }
                    if (Math.abs(lenx) > Math.abs(leny)) {
                        if (Math.abs(lenx) < 0.1) {
                            clearInterval(t);

                        }
                    } else {
                        if (Math.abs(leny) < 0.1) {
                            clearInterval(t);
                        }
                    }
                }, 60)
            }
            document.onmousemove=null;
            document.onmouseup=null;
        }

        if(e.preventDefault){
            e.preventDefault()
        }else{
            e.returnValue=false;
        }
    }

}