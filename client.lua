JB = {
    sendNUI = SendNUIMessage,
    thread  = CreateThread,
    addCommand = RegisterCommand,
    sendNotification = function (str)
        SetNotificationTextEntry('STRING')
        AddTextComponentString(str)
        DrawNotification(0,1)
    end,
    sleep   = function(msec)
        return Wait(msec)
    end,
    playerPed = function()
        return PlayerPedId()
    end,
    getVehicle = function()
        return GetVehiclePedIsIn(JB.playerPed())
    end,
    getSpeed = function()
        return GetEntitySpeed(JB.playerPed());
    end,    
    getVehClass = function()
        return GetVehicleClass(GetVehiclePedIsIn(JB.playerPed(), false));
    end,    
    isInVehicle = function()
        return IsPedInAnyVehicle(JB.playerPed());
    end,    
    setVehicleSeat = function(seat)
        return GetPedInVehicleSeat(JB.getVehicle(), seat);
    end,
    speedoMeter = {
        Init = function()
            while true do 
                local seatBelt = false
                local cruiser = false
                local inHelicopter = false
                local inAirPlane = false
                local inAnyBoat = false 
                local inBike = false 
                local inAnyCar = false
                local inMotorcycle = false
                local sleep = 1000
                local km = (JB.getSpeed()* 3.6)
                local fuelLevel = GetVehicleFuelLevel(JB.getVehicle());
                if JB.isInVehicle() then 
                    sleep = 100
                    inHelicopter = false
                    inAirPlane = false
                    inAnyBoat = false 
                    inBike = false 
                    inAnyCar = false
                    inMotorcycle = false
                    local vc = JB.getVehClass()
                    if( (vc >= 0 and vc <= 7) or (vc >= 9 and vc <= 12) or (vc >= 17 and vc <= 20)) then
                        inAnyCar = true
                    elseif(vc == 8) then
                        inMotorcycle = true
                    elseif(vc == 13) then
                        inBike = true
                    elseif(vc == 14) then
                        inAnyBoat = true
                    elseif(vc == 15) then
                        inHelicopter = true
                    elseif(vc == 16) then
                        inAirPlane = true
                    end
                    JB.sendNUI({
                        action = "speedometer";
                        fuel   = GetVehicleFuelLevel(JB.getVehicle());
                        damage = GetVehicleEngineHealth(JB.getVehicle());
                        engine    = GetVehicleCurrentGear(JB.getVehicle());
                        speed  = km;
                    })
                else
                    JB.sendNUI({
                        action = 'hideSpeedo';
                    })
                end
                JB.sleep(sleep)
            end
        end
    }
}

JB.thread(JB.speedoMeter.Init)