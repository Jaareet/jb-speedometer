$(function(){
    console.log("JB-SPEEDOMETER STARTED\nScript -->")
    showProgress(true)
    showDamage(true)
    function showDamage(bool){
        if (bool) {
            $(".damage").animate(
                {
                    "bottom": "1.8vw"
                }
            )
        } else {
            $(".damage").animate(
                {
                    "bottom": "0vw"
                }
            )
        }
    }
    function showProgress(bool){
        if (bool) {
            $(".progressSpeedo").animate(
                {
                    "bottom": "0vw"
                }
            )
        } else {
            $(".progressSpeedo").animate(
                {
                    "bottom": "5vw"
                }
            )
        }
    }
    function showFuelLow(bool){
        if (bool) {
            $(".alert-fuel").animate(
                {
                    "bottom": ".6vw"
                }
            )
        } else {
            $(".alert-fuel").animate(
                {
                    "bottom": "0vw"
                }
            )
        }
    }
    function showCarHud(bool) {
        if (bool) {
            $("#speedo").fadeIn(300);
        } else {
            $("#speedo").fadeOut(300);
        }
    }
    function initCarhud(data) {
        let km = Math.round(data.speed); 
        let className = ".progressBar";
        let engine = Math.round(data.engine);
        let engineClassName = "#changeColor";
        let KMClassName = "#changeColorKM";
        let fuel = Math.round(data.fuel);
        $(".kilometer").text(Math.round(data.speed) + " KM");
        $(".fuelLevel").text(Math.round(data.fuel) + " %");
        $(".damageLevel").text(Math.round(data.damage)/10 + " %");
        $(".engineLevel").text(Math.round(data.engine));
        $(".progressBar").css("width", (data.speed) * 1 + "");
        showCarHud(true)
        // VELOCITY
        if (km < 49) {
            let color = "white";
            $(`${className}`).css({
                backgroundColor: `${color}`,
                boxShadow: `0 0 .2vw ${color},0 0 .2vw ${color}, 0 0 .2vw ${color}`
            })
        } else if (km > 50 && km < 90) {
            let color = "#bfbfbf";
            $(`${className}`).css({
                backgroundColor: `${color}`,
                boxShadow: `0 0 .2vw ${color},0 0 .2vw ${color}, 0 0 .2vw ${color}`
            })
        } else if (km > 91 && km < 130) {
            let color = "#8c8c8c";
            $(`${className}`).css({
                backgroundColor: `${color}`,
                boxShadow: `0 0 .2vw ${color},0 0 .2vw ${color}, 0 0 .2vw ${color}`
            })
        } else if (km > 131 && km < 150) {
            let color = "#737373";
            $(`${className}`).css({
                backgroundColor: `${color}`,
                boxShadow: `0 0 .2vw ${color},0 0 .2vw ${color}, 0 0 .2vw ${color}`
            })
        } else if (km > 180) {
            let color = "#595959";
            $(`${className}`).css({
                backgroundColor: `${color}`,
                boxShadow: `0 0 .2vw ${color},0 0 .2vw ${color}, 0 0 .2vw ${color}`
            })
        } 

        // ENGINE
        if (engine == 1) {
            let color = "white";
            $(`${engineClassName}`).css({
                backgroundColor: `${color}`,
                boxShadow: `0 0 .2vw ${color},0 0 .2vw ${color}, 0 0 .2vw ${color}`
            })
        } else if (engine == 2) {
            let color = "green";
            $(`${engineClassName}`).css({
                backgroundColor: `${color}`,
                boxShadow: `0 0 .2vw ${color},0 0 .2vw ${color}, 0 0 .2vw ${color}`
            })
        } else if (engine == 3) {
            let color = "yellowgreen";
            $(`${engineClassName}`).css({
                backgroundColor: `${color}`,
                boxShadow: `0 0 .2vw ${color},0 0 .2vw ${color}, 0 0 .2vw ${color}`
            })
        } else if (engine == 4) {
            let color = "orange";           $(`${engineClassName}`).css({
                backgroundColor: `${color}`,
                boxShadow: `0 0 .2vw ${color},0 0 .2vw ${color}, 0 0 .2vw ${color}`
            })
        } else if (engine == 5) {
            let color = "orangered";
            $(`${engineClassName}`).css({
                backgroundColor: `${color}`,
                boxShadow: `0 0 .2vw ${color},0 0 .2vw ${color}, 0 0 .2vw ${color}`
            })
        }else if (engine == 6) {
            let color = "red";
            $(`${engineClassName}`).css({
                backgroundColor: `${color}`,
                boxShadow: `0 0 .2vw ${color},0 0 .2vw ${color}, 0 0 .2vw ${color}`
            })
        }
        //FUEL
        if (fuel < 69) {
            let color = "red";
            $(`${KMClassName}`).css({
                textShadow: `0 0 .2vw ${color},0 0 .2vw ${color}, 0 0 .2vw ${color}`
            })
            showFuelLow(true)
            setTimeout(() => {
                $(".alert-fuel").fadeOut();
            }, 1000);
        }
    }
    window.addEventListener('message',  function(event){
        let v =  event.data;
        if (v.action == 'speedometer') {
            initCarhud(v)
        } else if (v.action == 'hideSpeedo') {
            showCarHud(false)
        }
    })
})