var Cheats;
(function (Cheats) {
    $('#toeCreatorButton').on('click', function () {
        //in the name of typechecking
        let val = Number($('#toeCreatorInput').val());
        Game.Toes += val;
        Game.Stats.ToesEarned += val;
    });
    $('#timeWarpButton').on('click', function () {
        let val = Number($('#timeWarpInput').val());
        Game.Toes += Game.ToesPerSecond * val;
        Game.Stats.ToesEarned += Game.ToesPerSecond * val;
    });
    let prevInterrogationChance = InterrogationChance;
    $('#extremePersuasionButton').on('click', function () {
        //Chance the InterrogationChance depending on whether the cheat is on.
        if (InterrogationChance == 1) {
            InterrogationChance = prevInterrogationChance;
        }
        else {
            prevInterrogationChance = InterrogationChance;
            InterrogationChance = 1;
        }
        $('#extremePersuasionButton').html(InterrogationChance == 1 ? "ON" : "OFF");
        CannonInterrogationChance = [];
        RefillInterrogationChance(InterrogationChance);
    });
    let buyerInterval;
    $('#autoBuyerButton').on('click', function () {
        if (!buyerInterval) {
            $('#autoBuyerButton').html('ON');
            buyerInterval = setInterval(function () {
                for (let building of Buildings.AllBuildings) {
                    //Check if the building is currently being shown (and if we can afford it)
                    if ($(document.getElementById(building.Name))[0] && Game.Toes >= building.Price) {
                        $(document.getElementById(`${building.Name}-button`)).trigger('click');
                    }
                }
            }, 100);
        }
        else {
            $('#autoBuyerButton').html('OFF');
            clearInterval(buyerInterval);
            buyerInterval = null;
        }
    });
    let clickerInterval;
    $('#autoClickerButton').on('click', function () {
        if (!clickerInterval) {
            $('#autoClickerButton').html('ON');
            clickerInterval = setInterval(function () {
                $('#gainToe').trigger('click');
            });
        }
        else {
            $('#autoClickerButton').html('OFF');
            clearInterval(clickerInterval);
            clickerInterval = null;
        }
    });
    function Activate() {
        $('#cheatMenu').css('display', 'block');
    }
    Cheats.Activate = Activate;
    function Deactivate() {
        $('#cheatMenu').css('display', 'none');
    }
    Cheats.Deactivate = Deactivate;
})(Cheats || (Cheats = {}));
$('#cheatMenu').draggable({
    containment: $('#game')
});
