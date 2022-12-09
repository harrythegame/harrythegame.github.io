var Buildings;
(function (Buildings) {
    /*
    The formula for building prices and production is

    THIS PART IS OUTDATED SORRY NEED TO FIND A NEW FORMULA TO REPRESENT CURRENT PRICES
    Cost: pr * 10 * t
    pr is the production of the previous building
    t is the time, which increases per building index (1 minute, 10 minutes, 1 hour, 10 hours, 100 hours, etc.)

    this part is indated (it is correct)
    Production: pr * (i * 4)
    pr is the production of the previous building
    i is the index of the building (starting at 1)

    This does a good job of making the prices seem random but actually are still controlled in the eyes of the developer
    The times may seem a bit harsh as well but when you factor in upgrades, and probably ascension (which I hope to add at some point), it really isn't that bad

    Some numbers are rounded so the real one is put next to it
    */
    const BUILDING_MULT = 1.15;
    Buildings.BuildingList = [
        {
            Name: "Amogus",
            DisplayName: "Amogus",
            BasePrice: 20,
            Price: 20,
            PriceMult: BUILDING_MULT,
            BaseToesPerSecond: 2,
            ToesPerSecond: 2,
            Amount: 0,
            Factors: [],
            Functions: [],
        },
        {
            Name: "SpleenConverter",
            DisplayName: "Spleen Converter",
            BasePrice: 1200,
            Price: 1200,
            PriceMult: BUILDING_MULT,
            BaseToesPerSecond: 32,
            ToesPerSecond: 32,
            Amount: 0,
            Factors: [],
            Functions: [],
        },
        {
            Name: "Farm",
            DisplayName: "Farm",
            BasePrice: 8400,
            Price: 8400,
            PriceMult: BUILDING_MULT,
            BaseToesPerSecond: 400,
            ToesPerSecond: 400,
            Amount: 0,
            Factors: [],
            Functions: [],
        },
        {
            Name: "City",
            DisplayName: "City",
            BasePrice: 504000,
            Price: 504000,
            PriceMult: BUILDING_MULT,
            BaseToesPerSecond: 5000,
            ToesPerSecond: 5000,
            Amount: 0,
            Factors: [],
            Functions: [],
        }
    ];
    Buildings.AllBuildings = structuredClone(Buildings.BuildingList);
    function UpdateToesPerSecond() {
        Game.ToesPerSecond = 0;
        Game.ToesPerClick = Game.BaseToesPerClick;
        for (let building of Buildings.AllBuildings) {
            building.ToesPerSecond = building.BaseToesPerSecond;
            //Factor in our factors
            for (let fac of building.Factors) {
                building.ToesPerSecond *= fac;
            }
            for (let func of building.Functions) {
                //FIXME: should be one index instead of a thousand
                if (!func)
                    continue;
                func();
            }
            Game.ToesPerSecond += building.ToesPerSecond * building.Amount;
            $(`#${building.Name}-production`).html(`Toes Per Second: ${Beautify(Math.floor(building.ToesPerSecond * building.Amount))} (${Beautify(Math.floor(building.ToesPerSecond))} per building)`);
        }
    }
    Buildings.UpdateToesPerSecond = UpdateToesPerSecond;
    //Helper function to get a building index from it's name
    function GetBuildingIndexFromName(name) {
        let i = 0;
        for (let building of Buildings.AllBuildings) {
            if (building.Name == name) {
                break;
            }
            i++;
        }
        if (i == Buildings.AllBuildings.length) {
            console.error(`No building found with the name ${name}`);
        }
        else {
            return i;
        }
    }
    Buildings.GetBuildingIndexFromName = GetBuildingIndexFromName;
    function Buy(name) {
        //We can do this because of JavaScript object tomfoolery (this is more a pointer, not a copy of the object)
        let Building = Buildings.AllBuildings[GetBuildingIndexFromName(name)];
        if (Game.Toes >= Building.Price) {
            Building.Amount += 1;
            Game.Toes -= Building.Price;
            Building.BasePrice *= Building.PriceMult;
            Building.Price = Building.BasePrice;
            UpdateToesPerSecond();
            $(`#${Building.Name}-amount`).html(Building.Amount.toString());
            $(`#${Building.Name}-price`).html(`Price: ${Beautify(Math.round(Building.Price))} toes`);
        }
    }
    Buildings.Buy = Buy;
    //This is just buy except most instructions are reversed
    function Destroy(name) {
        let Building = Buildings.AllBuildings[GetBuildingIndexFromName(name)];
        Building.Amount -= 1;
        UpdateToesPerSecond();
        Building.Price /= Building.PriceMult;
        $(`#${Building.Name}-amount`).html(Building.Amount.toString());
        $(`#${Building.Name}-price`).html(`Price: ${Beautify(Math.round(Building.Price))} toes`);
    }
    Buildings.Destroy = Destroy;
    function AddProductionFactor(name, factor, priority) {
        let Building = Buildings.AllBuildings[GetBuildingIndexFromName(name)];
        Building.Factors.splice(priority - 1, 0, factor);
    }
    Buildings.AddProductionFactor = AddProductionFactor;
    function EditProductionFactor(name, newFactor, priority) {
        let Building = Buildings.AllBuildings[GetBuildingIndexFromName(name)];
        Building.Factors[priority - 1] = newFactor;
    }
    Buildings.EditProductionFactor = EditProductionFactor;
    function AddProductionFunction(name, func, priority) {
        let Building = Buildings.AllBuildings[GetBuildingIndexFromName(name)];
        Building.Functions[priority - 1] = func;
    }
    Buildings.AddProductionFunction = AddProductionFunction;
    function EditProductionFunction(name, newFunc, priority) {
        let Building = Buildings.AllBuildings[GetBuildingIndexFromName(name)];
        Building.Functions[priority - 1] = newFunc;
    }
    Buildings.EditProductionFunction = EditProductionFunction;
    function ShowBuilding(name) {
        //Safeguard
        if (document.getElementById(name)) {
            console.error(`Attempted to call ShowBuilding on ${name} twice. The function call has been dropped.`);
            return;
        }
        let SelectedBuilding;
        for (let building of Buildings.AllBuildings) {
            if (building.Name == name) {
                SelectedBuilding = building;
            }
        }
        if (!SelectedBuilding) {
            console.error('Attempt to get building that does not exist.');
            return;
        }
        $('#buildings').append(`
        <div class = 'building' id = '${SelectedBuilding.Name}'>
            <p class = 'building-name' id = '${SelectedBuilding.Name}-name'>${SelectedBuilding.DisplayName}</p>
            <p class = 'building-production' id = '${SelectedBuilding.Name}-production'>Toes Per Second: 0 (${Beautify(SelectedBuilding.ToesPerSecond)} per building)</p>
            <p class = 'building-price' id = '${SelectedBuilding.Name}-price'>Price: ${Beautify(SelectedBuilding.Price)} toes</p>
            <p class = 'building-amount' id = '${SelectedBuilding.Name}-amount'>0</p>
            <button class = 'building-buy' id = '${SelectedBuilding.Name}-button'>Buy</button>
        </div>
        `);
        $(`#${SelectedBuilding.Name}-button`).on('click', function () {
            Buy(SelectedBuilding.Name);
        });
    }
    Buildings.ShowBuilding = ShowBuilding;
})(Buildings || (Buildings = {}));
setInterval(() => {
    for (let building of Buildings.AllBuildings) {
        UpdateIfPriceAvailableOnElement($(document.getElementById(`${building.Name}-price`)), building.Price);
    }
});
