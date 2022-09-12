var Buildings;
(function (Buildings) {
    //Constant for now because I don't see a reason to change multipliers right now
    var BUILDING_MULT = 1.15;
    Buildings.BuildingList = [
        {
            Name: "Amogus",
            Price: 20,
            PriceMult: BUILDING_MULT,
            ToesPerSecond: 2,
            Amount: 0
        },
        {
            Name: "Spleen Converter",
            Price: 10000,
            PriceMult: BUILDING_MULT,
            ToesPerSecond: 300,
            Amount: 0
        }
    ];
    Buildings.AllBuildings = structuredClone(Buildings.BuildingList);
    function UpdateToesPerSecond() {
        Game.ToesPerSecond = 0;
        for (var _i = 0, AllBuildings_1 = Buildings.AllBuildings; _i < AllBuildings_1.length; _i++) {
            var building = AllBuildings_1[_i];
            Game.ToesPerSecond += building.ToesPerSecond * building.Amount;
            $(document.getElementById("".concat(building.Name, ":production"))).html("Toes Per Second: ".concat(Beautify(building.ToesPerSecond * building.Amount), " (").concat(Beautify(building.ToesPerSecond), " per building)"));
        }
    }
    Buildings.UpdateToesPerSecond = UpdateToesPerSecond;
    function ShowBuilding(name) {
        var SelectedBuilding;
        var i = -1;
        for (var _i = 0, AllBuildings_2 = Buildings.AllBuildings; _i < AllBuildings_2.length; _i++) {
            var building = AllBuildings_2[_i];
            i++;
            if (building.Name == name) {
                SelectedBuilding = building;
                break;
            }
        }
        if (!SelectedBuilding)
            console.error('Attempt to get building that does not exist.');
        $('#buildings').append("\n        <div class = 'building' id = '".concat(SelectedBuilding.Name, "'>\n            <p class = 'building-name' id = '").concat(SelectedBuilding.Name, ":name'>").concat(SelectedBuilding.Name, "</p>\n            <p class = 'building-production' id = '").concat(SelectedBuilding.Name, ":production'>Toes Per Second: 0 (").concat(Beautify(SelectedBuilding.ToesPerSecond), " per building)</p>\n            <p class = 'building-price' id = '").concat(SelectedBuilding.Name, ":price'>Price: ").concat(Beautify(SelectedBuilding.Price), " toes</p>\n            <p class = 'building-amount' id = '").concat(SelectedBuilding.Name, ":amount'>0</p>\n            <button class = 'building-buy' id = '").concat(SelectedBuilding.Name, ":button'>Buy</button>\n        </div>\n        "));
        $(document.getElementById("".concat(SelectedBuilding.Name, ":button"))).on('click', function () {
            if (Game.Toes >= Buildings.AllBuildings[i].Price) {
                Buildings.AllBuildings[i].Amount += 1;
                UpdateToesPerSecond();
                Game.Toes -= Buildings.AllBuildings[i].Price;
                Buildings.AllBuildings[i].Price *= Buildings.AllBuildings[i].PriceMult;
                $(document.getElementById("".concat(SelectedBuilding.Name, ":amount"))).html(Buildings.AllBuildings[i].Amount.toString());
                $(document.getElementById("".concat(SelectedBuilding.Name, ":price"))).html("Price: ".concat(Beautify(Math.round(Buildings.AllBuildings[i].Price)), " toes"));
            }
        });
    }
    Buildings.ShowBuilding = ShowBuilding;
    //This is just something used for testing purposes (not used in actual game)
    function TimeWarp(seconds) {
        Game.Toes += Game.ToesPerSecond * seconds;
    }
    Buildings.TimeWarp = TimeWarp;
})(Buildings || (Buildings = {}));
setInterval(function () {
    for (var _i = 0, _a = Buildings.AllBuildings; _i < _a.length; _i++) {
        var building = _a[_i];
        UpdateIfPriceAvailableOnElement($(document.getElementById("".concat(building.Name, ":price"))), building.Price);
    }
});
