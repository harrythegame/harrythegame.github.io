var Upgrades;
(function (Upgrades) {
    Upgrades.CannonInterrogationPrice = 5;
    //I thought about having this exported and be called All, but I don't think it's needed anywhere else
    //Requires is optional, I just think it helps with being able to tell with what upgrades point to where
    Upgrades.AllUpgrades = {
        "juc1": {
            Id: "juc1",
            Title: "Juicier Toes",
            Description: "Gives all your toes 60% more juice, giving you +2 more toes per click.",
            Price: 10,
            Effect: function () {
                Game.BaseToesPerClick += 2;
            },
            Unlocks: ['juc2', 'bul1'],
            Requires: [],
        },
        'juc2': {
            Id: "juc2",
            Title: "Tastier Toe Juice",
            Description: "Gives toe juice extra flavor, giving you +2 more toes per click.",
            Price: 50,
            Effect: function () {
                Game.BaseToesPerClick += 2;
            },
            Unlocks: ['amg1'],
            Requires: ['juc1']
        },
        'bul1': {
            Id: 'bul1',
            Title: "Amogus",
            Description: "Get Harry's Among us figurines to make toes for you. For a price of course.",
            Price: 50,
            Effect: function () {
                Buildings.ShowBuilding('Amogus');
            },
            Unlocks: ['amg1'],
            Requires: ['juc1']
        },
        "amg1": {
            Id: "amg1",
            Title: "Sussier Imposters",
            Description: "By removing imposters from the workplace, we can double the efficiency of Amoguses.",
            Price: 100,
            Effect: function () {
                Buildings.AddProductionFactor("Amogus", 2, 1);
            },
            Unlocks: ['f000', 'juc3', 'amg2'],
            Requires: ['bul1', 'juc2']
        },
        'f000': {
            Id: 'f000',
            Title: 'Metal Press',
            Description: "Learn how to effectively create and operate a metal press, setting the stage for a new building. Does nothing by itself.",
            Price: 200,
            Effect: function () { },
            Unlocks: ['f001'],
            Requires: ['amg1']
        },
        'juc3': {
            Id: 'juc3',
            Title: 'The Anatomy of an Amogus',
            Description: "Learn more about the anatomy of an Amogus, and how you can attach toes to them. Adds 10 to the amount of toes you get per click.",
            Price: 200,
            Effect: function () {
                Game.BaseToesPerClick += 10;
            },
            Unlocks: ['f001', 'ptc1'],
            Requires: ['amg1']
        },
        'amg2': {
            Id: 'amg2',
            Title: 'Looser Suits',
            Description: "Considering I've never seen an Amogus without it's suit on, it's probably safe to say that this is a good idea. Increases Amogus production by 50%.",
            Price: 200,
            Effect: function () {
                Buildings.AddProductionFactor('Amogus', 2, 2);
            },
            Unlocks: ['ptc1'],
            Requires: ['amg1'],
        },
        "ptc1": {
            Id: 'ptc1',
            Title: 'Amogus Toes',
            Description: "Apply toes to your Amoguses. Your base toes per click is multiplied by 2% of Amogus production.",
            Price: 500,
            Effect: function () {
                Buildings.AddProductionFunction(Buildings.AllBuildings[Buildings.AllBuildings.length - 1].Name, function () {
                    Game.ToesPerClick *= Game.ToesPerSecond * 0.02;
                }, 21);
            },
            Unlocks: ['bul2'],
            Requires: ['juc3', 'amg2'],
        },
        'f001': {
            Id: 'f001',
            Title: 'Spleen Reserach',
            Description: "Do research on the chemical properties of the spleen. Does nothing on it's own.",
            Price: 500,
            Effect: function () { },
            Unlocks: ['amg3'],
            Requires: ['f000', 'juc3'],
        },
        'amg3': {
            Id: 'amg3',
            Title: 'Amogus Psychology',
            Description: "Study the psychology of an Amogus, giving us 50% more production for Amoguses.",
            Price: 1000,
            Effect: function () {
                Buildings.AddProductionFactor('Amogus', 1.5, 3);
            },
            Unlocks: ['tps1', 'amg4'],
            Requires: ['f001'],
        },
        'bul2': {
            Id: 'bul2',
            Title: "Spleen Converters",
            Description: "Get machines to convert donated spleens into toes.",
            Price: 1000,
            Effect: function () {
                Buildings.ShowBuilding('SpleenConverter');
            },
            Unlocks: ['spl1', 'f002'],
            Requires: ['ptc1'],
        },
        'tps1': {
            Id: 'tps1',
            Title: 'Workforces 101',
            Description: "Learn the basics of hiring and managing employees. Adds +10% to global toe production.",
            Price: 2000,
            Effect: function () {
                Buildings.AddProductionFunction(Buildings.AllBuildings[Buildings.AllBuildings.length - 1].Name, function () {
                    Game.ToesPerSecond *= 1.05;
                }, 20);
            },
            Unlocks: ['amg5'],
            Requires: ['amg3'],
        },
        'amg4': {
            Id: 'amg4',
            Title: 'Advanced Amogus Psychology',
            Description: "Learn more about the behavior of Amoguses, allowing us to control their behavior. Increase your Amogus efficiency by 50%",
            Price: 2000,
            Effect: function () {
                Buildings.AddProductionFactor('Amogus', 1.5, 4);
            },
            Unlocks: ['amg5', 'spl2'],
            Requires: ['amg3'],
        },
        'spl1': {
            Id: 'spl1',
            Title: 'Regenrative Amogus Spleens',
            Description: "Amogus spleens will now grow back after being removed, doubling the efficiency of Spleen Converters.",
            Price: 2000,
            Effect: function () {
                Buildings.AddProductionFactor('SpleenConverter', 2, 1);
            },
            Unlocks: ['spl2', 'f003'],
            Requires: ['bul2'],
        },
        'f002': {
            Id: 'f002',
            Title: 'Primitive Agriculture',
            Description: "Learn some basic knowledge of farming. But you don't plan on growing tomatoes with this knowledge. This upgrade does nothing by itself.",
            Price: 2000,
            Effect: function () { },
            Unlocks: ['f003'],
            Requires: ['bul2'],
        },
        'amg5': {
            Id: 'amg5',
            Title: 'Amogus Collaboration',
            Description: "Teach your Amoguses how to work together. +2% to Amogus production for each Amogus you have.",
            Price: 5000,
            Effect: function () {
                Buildings.AddProductionFunction('Amogus', function () {
                    Buildings.AllBuildings[0].ToesPerSecond *= (1 + Buildings.AllBuildings[0].Amount * 0.02);
                }, 1);
            },
            Unlocks: ['pfa1'],
            Requires: ['tps1', 'amg4'],
        },
        'spl2': {
            Id: 'spl2',
            Title: 'Machine Operating Permit',
            Description: "Your Amoguses will finally be able to legally operate machinery. Spleen Converter production increase by 25%.",
            Price: 5000,
            Effect: function () {
                Buildings.AddProductionFactor('SpleenConverter', 1.25, 2);
            },
            Unlocks: ['spl3', 'atsp'],
            Requires: ['amg4', 'spl1'],
        },
        'f003': {
            Id: 'f003',
            Title: 'Irrigation Techniques',
            Description: "Continue to learn more about how to farm effectively, paving the way for a third building. This upgrade does nothing on it's own.",
            Price: 5000,
            Effect: function () { },
            Unlocks: ['amg6', 'f004'],
            Requires: ['f002', 'spl1'],
        },
        'pfa1': {
            Id: 'pfa1',
            Title: 'Less Worker Rights',
            Description: "Learn how to get away with underpaying your employees. Amoguses become 5% cheaper.",
            Price: 10000,
            Effect: function () {
                Buildings.AddProductionFunction('Amogus', function () {
                    Buildings.AllBuildings[0].Price = Buildings.AllBuildings[0].BasePrice * 0.95;
                }, 2);
            },
            Unlocks: ['bul3'],
            Requires: ['amg5'],
        },
        'spl3': {
            Id: 'spl3',
            Title: 'Oiled Presses',
            Description: "Oil the presses on your Spleen Converters, increasing their efficiency by 25%.",
            Price: 10000,
            Effect: function () {
                Buildings.AddProductionFactor('SpleenConverter', 1.25, 3);
            },
            Unlocks: ['f005'],
            Requires: ['spl2'],
        },
        'atsp': {
            Id: 'atsp',
            Title: 'Amogus Machine Operation',
            Description: "+1% Spleen Converter production for every Amogus.",
            Price: 10000,
            Effect: function () {
                Buildings.AddProductionFunction('SpleenConverter', function () {
                    Buildings.AllBuildings[1].ToesPerSecond *= 1 + (0.01 * Buildings.AllBuildings[0].Amount);
                }, 1);
            },
            Unlocks: ['bul3'],
            Requires: ['spl2'],
        },
        'amg6': {
            Id: 'amg6',
            Title: 'Hydrated Amogus',
            Description: "Use your newfound knowledge of irrigation techniques to deliver water to your Amoguses, increasing their production by 50%.",
            Price: 10000,
            Effect: function () {
                Buildings.AddProductionFactor('Amogus', 1.5, 6);
            },
            Unlocks: ['bul3'],
            Requires: ['f003'],
        },
        'f004': {
            Id: 'f004',
            Title: 'Advanced Agriculture',
            Description: "Learn advanced farming techniques, so advanced that you might be able to grow more than just plants. Does nothing by itself.",
            Price: 10000,
            Effect: function () { },
            Unlocks: ['bul3'],
            Requires: ['f003'],
        },
        'f005': {
            Id: 'f005',
            Title: 'Urbanization',
            Description: "Learn more about creating small neighborhoods. Does nothing by itself.",
            Price: 20000,
            Effect: function () { },
            Unlocks: ['f006', 'can1'],
            Requires: ['spl3'],
        },
        'bul3': {
            Id: 'bul3',
            Title: 'Toe Farm',
            Description: "Use your knowledge of agriculture and human labor to begin the cultivation of toes.",
            Price: 20000,
            Effect: function () {
                Buildings.ShowBuilding('Farm');
            },
            Unlocks: ['amg7', 'frm1'],
            Requires: ['pfa1', 'atsp', 'amg6', 'f004'],
        },
        'f006': {
            Id: 'f006',
            Title: 'Apartments',
            Description: "Build vertically instead of horizontallly. Does nothing by itself.",
            Price: 50000,
            Effect: function () { },
            Unlocks: ['pfs1', 'f007'],
            Requires: ['f005'],
        },
        'can1': {
            Id: 'can1',
            Title: 'Practice Room Torture',
            Description: "Find a new method of torture involving a dark practice room and Harry. Interrogations are now 500 toes and only have a 1 and 24 chance of succeeding, but upgrades become much more powerful.",
            Price: 50000,
            Effect: function () {
                MaxInterrogationChance = 24;
                Upgrades.CannonInterrogationPrice = 500;
                InterrogationChance = Random(1, MaxInterrogationChance);
                $('#cannonInterrogationPrice').html("Price: 500 toes");
            },
            Unlocks: ['can2'],
            Requires: ['f005'],
        },
        'amg7': {
            Id: 'amg7',
            Title: "Jackson's Beansauce Delivery",
            Description: "Get some of Jackson's scrumptious beansauce, to improve Amogus producitivity by 33%.",
            Price: 50000,
            Effect: function () {
                Buildings.AddProductionFactor('Amogus', 1.33, 7);
            },
            Unlocks: ['f007', 'frm2', 'can3'],
            Requires: ['bul3'],
        },
        'frm1': {
            Id: 'frm1',
            Title: 'Fortune III',
            Description: "Who knew glowing books found on library shelves could be so useful? Triples all farm output.",
            Price: 50000,
            Effect: function () {
                Buildings.AddProductionFactor('Farm', 2, 1);
            },
            Unlocks: ['tps2'],
            Requires: ['bul3'],
        },
        'pfs1': {
            Id: 'pfs1',
            Title: 'Building Permit Bribes',
            Description: "Use questionable methods to obtain some building permits, making Spleen Converter construction 5% cheaper.",
            Price: 1e5,
            Effect: function () {
                Buildings.AddProductionFunction('SpleenConverter', function () {
                    Buildings.AllBuildings[1].Price = Buildings.AllBuildings[1].BasePrice * 0.95;
                }, 2);
            },
            Unlocks: ['tps3'],
            Requires: ['f006'],
        },
        'can2': {
            Id: 'can2',
            Title: 'Auto-Interrogator 2000',
            Description: "Invent a machine that will automatically interrogate Cannon for you. It will interrogate him once every three seconds.",
            Price: 1e5,
            Effect: function () {
                $('#autoInterrogatorLabel').css('display', 'inline');
                $('#autoInterrogatorButton').css('display', 'inline');
                $('#autoInterrogatorButton').on('click', function () {
                    if (Upgrades.AutoInterrogatorInterval) {
                        $('#autoInterrogatorButton').html('OFF');
                        clearInterval(Upgrades.AutoInterrogatorInterval);
                        Upgrades.AutoInterrogatorInterval = null;
                    }
                    else {
                        $('#autoInterrogatorButton').html('ON');
                        Upgrades.AutoInterrogatorInterval = setInterval(function () {
                            alertsOnUpgradePrompt = false;
                            $('#cannonInterrogationButton').trigger('click');
                            alertsOnUpgradePrompt = true;
                        }, 3000);
                    }
                });
            },
            Unlocks: ['tps3'],
            Requires: ['can1'],
        },
        'f007': {
            Id: 'f007',
            Title: 'Beansauce Lures',
            Description: "See if you can lure any creatues using some of the spare beansauce from Jackson. Continues the path towards the 4th building. Does nothing by itself.",
            Price: 1e5,
            Effect: function () { },
            Unlocks: ['tps3', 'atfr'],
            Requires: ['f006', 'amg7'],
        },
        'frm2': {
            Id: 'frm2',
            Title: 'Forklift Certification',
            Description: "Look cool, and increase Farm production by 12.5% at the same time!",
            Price: 1e5,
            Effect: function () {
                Buildings.AddProductionFactor('Farm', 1.125, 2);
            },
            Unlocks: ['atfr'],
            Requires: ['amg7'],
        },
        'can3': {
            Id: 'can3',
            Title: 'Denial',
            Description: "Gain the ability to throw away an upgrade for now.",
            Price: 1e5,
            Effect: function () {
                $('.denial-button').css('display', 'inline');
            },
            Unlocks: ['spl4'],
            Requires: ['amg7'],
        },
        'tps2': {
            Id: 'tps2',
            Title: "Jolt's Slerp Juice",
            Description: "Use Jolt's spherical linear interoplation juice to make everybody move a bit smoother, and increase your whole toe production by 5%.",
            Price: 1e5,
            Effect: function () {
                Buildings.AddProductionFunction(Buildings.AllBuildings[Buildings.AllBuildings.length - 1].Name, function () {
                    Game.ToesPerSecond *= 1.1;
                }, 20);
            },
            Unlocks: ['spl4', 'amg8'],
            Requires: ['frm1'],
        },
        'tps3': {
            Id: 'tps3',
            Title: 'Monkee Moment',
            Description: "Make this game a certified monkee moment, adding +10% to your total production multiplier (now 20%)",
            Price: 5e5,
            Effect: function () {
                Buildings.EditProductionFunction(Buildings.AllBuildings[Buildings.AllBuildings.length - 1].Name, function () {
                    Game.ToesPerSecond *= 1.2;
                }, 1000);
            },
            Unlocks: ['tps4', 'f008'],
            Requires: ['pfs1', 'can2', 'f007'],
        },
        'atfr': {
            Id: 'atfr',
            Title: 'Amogus Farmers',
            Description: "Employ your Amoguses to help at the farms. +1% farm production for every Amogus.",
            Price: 5e5,
            Effect: function () {
                Buildings.AddProductionFunction('Farm', function () {
                    Buildings.AllBuildings[Buildings.GetBuildingIndexFromName('Farm')].ToesPerSecond *= 1 + 0.01 * Buildings.AllBuildings[Buildings.GetBuildingIndexFromName('Amogus')].Amount;
                }, 1);
            },
            Unlocks: ['f008'],
            Requires: ['f007', 'frm2'],
        },
        'spl4': {
            Id: 'spl4',
            Title: '3D Printed Spleens',
            Description: "3D print spleens, increasing their production by 50%.",
            Price: 5e5,
            Effect: function () {
                Buildings.AddProductionFactor('SpleenConverter', 1.5, 4);
            },
            Unlocks: ['f008', 'ptc2'],
            Requires: ['can3', 'tps2'],
        },
        'amg8': {
            Id: 'amg6',
            Title: 'Unironically Funny Among Us Memes',
            Description: "Make all Among Us memes actually funny, ushering humanity into a new golden age. +25% to Amogus production",
            Price: 5e5,
            Effect: function () {
                Buildings.AddProductionFactor('Amogus', 1.25, 8);
            },
            Unlocks: ['ptc2'],
            Requires: ['tps2'],
        },
        'tps4': {
            Id: 'tps3',
            Title: 'So Much Monkee',
            Description: "Add 5% to the total production multiplier (now 25%).",
            Price: 1e6,
            Effect: function () {
                Buildings.EditProductionFunction(Buildings.AllBuildings[Buildings.AllBuildings.length - 1].Name, function () {
                    Game.ToesPerSecond *= 1.25;
                }, 1000);
            },
            Unlocks: ['can4'],
            Requires: ['tps3'],
        },
        'f008': {
            Id: 'f015',
            Title: 'Monkee Civilization',
            Description: "Learn how to make monkees live together, in perfect harmony.",
            Price: 1e6,
            Effect: function () { },
            Unlocks: ['bul4'],
            Requires: ['tps3', 'atfr', 'spl4'],
        },
        'ptc2': {
            Id: 'ptc2',
            Title: 'Monkee Toes',
            Description: "Apply toes to your Monkees, changing the percentage of toe production added to your base toes per click from 0.1% to 0.15%",
            Price: 1e6,
            Effect: function () {
                Buildings.EditProductionFunction(Buildings.AllBuildings[Buildings.AllBuildings.length - 1].Name, function () {
                    Game.ToesPerClick = Game.BaseToesPerClick + Game.ToesPerSecond * 0.15;
                }, 1000);
            },
            Unlocks: ['bul4'],
            Requires: ['spl4', 'amg8'],
        },
        'can4': {
            Id: 'can4',
            Title: 'Darker Practice Rooms',
            Description: "The chance of a succesful interrogation is now 1 in 20.",
            Price: 5e6,
            Effect: function () {
                MaxInterrogationChance = 20;
                InterrogationChance = Random(1, MaxInterrogationChance);
            },
            Unlocks: [],
            Requires: ['tps4'],
        },
        'bul4': {
            Id: 'bul4',
            Title: "Monkee City",
            Description: "Create a bustling city full of Monkees, all working 9 to 5 workdays 24/7 to create toes.",
            Price: 5e6,
            Effect: function () {
                Buildings.ShowBuilding('City');
            },
            Unlocks: [],
            Requires: ['f008', 'ptc2'],
        },
    };
    Upgrades.PossibleUpgrades = ["juc1"];
    Upgrades.CurrentUpgrades = [];
    Upgrades.UpgradePath = [];
    function ShowUpgrade(id) {
        //Safeguard
        if (Upgrades.CurrentUpgrades.indexOf(id) != -1 || Upgrades.UpgradePath.indexOf(id) != -1) {
            console.error(`ShowUpgrade has been called twice for the upgrade ${id} and the call has been dropped.`);
            return;
        }
        $('#upgrades').append(`
        <div id = '${id}' class = 'upgrade'>
            <p id = '${id}-header' class = 'upgrade-header'>${Upgrades.AllUpgrades[id].Title}</p>
            <p id = '${id}-description' class = 'upgrade-description'>${Upgrades.AllUpgrades[id].Description}</p>
            <p id = '${id}-price' class = 'upgrade-price'>Price: ${Upgrades.AllUpgrades[id].Price} toes</p>
            <button id = '${id}-button' class = 'upgrade-button'>Buy</button><button id = '${id}-denialbutton' class = 'upgrade-button denial-button'>Deny</button>
        </div>
        `);
        Upgrades.CurrentUpgrades.push(id);
        if (Upgrades.PossibleUpgrades.indexOf(id) != -1) {
            Upgrades.PossibleUpgrades.splice(Upgrades.PossibleUpgrades.indexOf(id), 1);
        }
        $(document.getElementById(`${id}-button`)).on('click', function () {
            if (Game.Toes >= Upgrades.AllUpgrades[id].Price) {
                Game.Toes -= Upgrades.AllUpgrades[id].Price;
                Upgrades.AllUpgrades[id].Effect();
                Buildings.UpdateToesPerSecond();
                //This needs to go first so the requirments system works
                Upgrades.CurrentUpgrades.splice(Upgrades.CurrentUpgrades.indexOf(id), 1);
                Upgrades.UpgradePath.push(id);
                for (let unlockId of Upgrades.AllUpgrades[id].Unlocks) {
                    let canUnlock = true;
                    for (let requirment of Upgrades.AllUpgrades[unlockId].Requires) {
                        if (Upgrades.UpgradePath.indexOf(requirment) == -1) {
                            canUnlock = false;
                            break;
                        }
                    }
                    if (canUnlock) {
                        Upgrades.PossibleUpgrades.push(unlockId);
                    }
                }
                $(document.getElementById(`${id}`)).remove();
            }
        });
        //Chgeck if they have the denial upgrade
        if (Upgrades.UpgradePath.indexOf('can3') != -1)
            $(`#${id}-denialbutton`).css('display', 'inline');
        $(`#${id}-denialbutton`).on('click', function () {
            Upgrades.CurrentUpgrades.splice(Upgrades.CurrentUpgrades.indexOf(id), 1);
            Upgrades.PossibleUpgrades.push(id);
            $(`#${id}`).remove();
        });
    }
    Upgrades.ShowUpgrade = ShowUpgrade;
})(Upgrades || (Upgrades = {}));
let MaxInterrogationChance = 12;
let InterrogationChance = MaxInterrogationChance;
let alertsOnUpgradePrompt = true;
$('#cannonInterrogationButton').on('click', function () {
    function CreateAlert(message) {
        if (!alertsOnUpgradePrompt)
            return;
        Game.CreateAlert(message);
    }
    if (Game.Toes >= Upgrades.CannonInterrogationPrice) {
        if (Upgrades.UpgradePath.length == Object.keys(Upgrades.AllUpgrades).length) {
            //We want to be sure even if this happens while using the Auto Interrogator the player still knows about it
            Game.CreateAlert("Cannon has run out of upgrades!");
            $('#cannonInterrogation').css('display', 'none');
            $('#cannonInterrogationButton').off('click');
            return;
        }
        if (Upgrades.CurrentUpgrades.length > 2) {
            CreateAlert("You can only have 3 upgrades out at a time, purchase an upgrade!");
            return;
        }
        if (Upgrades.PossibleUpgrades.length == 0) {
            CreateAlert("Cannon has no available upgrades right now! Buy some of the upgrades you have right now to unlock more.");
            return;
        }
        Game.Toes -= Upgrades.CannonInterrogationPrice;
        InterrogationChance -= 1;
        if (InterrogationChance < 1) {
            Game.Stats.SuccesfulInterrogations += 1;
            console.log(MaxInterrogationChance);
            InterrogationChance = Random(1, MaxInterrogationChance);
            let Index = ChooseIndex(Upgrades.PossibleUpgrades);
            if (Upgrades.PossibleUpgrades[Index] == 'bul1') {
                Game.CreateStoryChapter("A New Era", [
                    "After doing a bit of trolling on Cannon,",
                    "you've found a new way to make toes involving... Among Us?",
                    "You explain the process to Harry.",
                    "It involves using some toes, performing a ritual at 3 AM,",
                    "and Among Us figurines.",
                    "Harry tells you that his closet has lots of Among us figurines in it",
                    "and this plan could make toe production automatic.",
                    "All you need is just a bit of toes to start the ritaul.",
                ]);
            }
            if (Upgrades.PossibleUpgrades[Index] == 'bul2') {
                Game.CreateStoryChapter("But Why Spleens?", [
                    "And you thought the Amogus ritual was weird.",
                    "Harry's gotten some metal presses from IKEA to make more toes.",
                    "You've discovered that you can use a metal press on spleens to turn them into toes.",
                    "All you need are the spleens.",
                    "Harry says that he could get some from the Amogus, as they don't need them.",
                    "The extraction process involves lots of toes though.",
                    "Time to continue grinding.",
                ]);
            }
            if (Upgrades.PossibleUpgrades[Index] == 'bul3') {
                Game.CreateStoryChapter("Farming Simulator 69", [
                    "Harry's garden has now started growing toes, showing that it is possible.",
                    "You've taken initiative and prepared to create a toe farming empire.",
                    "You've hired workers to plant and harvest massive toe plantations.",
                    "You've defiled graves en masse to create some fertilizer.",
                    "You've smithed diamonds onto sticks to create hoes.",
                    "All that's left to do is to buy some land using toes.",
                ]);
            }
            /*
            if(Upgrades.PossibleUpgrades[Index] == 'bul4'){
                Game.CreateStoryChapter("Monkees Everywhere", [
                    "You've traveled out into the jungles of Cleveland, just like Cannon told you.",
                    "He said that in these jungles, there lie villages full of Monkee.",
                    "If you can find one, you will be absolutely rich.",
                    "Using some of your spare beansauce, you can turn all the monkees there into your... uh... workers!",
                    "You'll just need toes to buy the beansauce.",
                    "Honestly, what were you expecting?",
                ])
            }

            */
            Upgrades.ShowUpgrade(Upgrades.PossibleUpgrades[Index]);
        }
        else {
            Game.Stats.FailedInterrogations += 1;
            CreateAlert(`You interrogated Cannon, but only learned that ${Choose([
                "khachapuri is important to all aspects of life.",
                "Cannon's CoC is doing good.",
                "Cannon is so silly.",
                "Cannon doesn't do drugs (or the 🤓)",
                "Cannon studies sussy sciences.",
            ])}`);
        }
    }
});
//Price color changing
setInterval(() => {
    UpdateIfPriceAvailableOnElement($('#cannonInterrogationPrice'), Upgrades.CannonInterrogationPrice);
    for (let id of Upgrades.CurrentUpgrades) {
        //Return of the document.querySelector spaghetti
        UpdateIfPriceAvailableOnElement($(document.getElementById(`${id}-price`)), Upgrades.AllUpgrades[id].Price);
    }
}, 10);
//A some hacked in little tests to be sure everything works (for upgrades)
/*
window.onload = function(){
    //Check that all the upgrades function don't error
    for(let upgradeKey of Object.keys(Upgrades.AllUpgrades)){
        if(Upgrades.UpgradePath.indexOf(upgradeKey) == -1){
            Upgrades.AllUpgrades[upgradeKey].Effect();
            Upgrades.UpgradePath.push(upgradeKey);
        }
    }

    //Check all the upgrades link to each other and there are no invalid IDs
    let UpgradesToIndex = Upgrades.AllUpgrades
    for(let upgradeKey of Object.keys(UpgradesToIndex)){
        for(let unlock of UpgradesToIndex[upgradeKey].Unlocks){
            if(!UpgradesToIndex[unlock]) {
                console.error(`Attempt to unlock upgrade that does not exist (${unlock}) from ${upgradeKey}`)
                continue
            }
            if(UpgradesToIndex[unlock].Requires.indexOf(upgradeKey) == -1){
                console.log(UpgradesToIndex[unlock].Requires);
                console.log(upgradeKey);
                console.error(`Attempt to unlock upgrade ${unlock} when it is not required for ${upgradeKey}`);
                continue;
            }
            //UpgradesToIndex[unlock].Requires.splice(UpgradesToIndex[unlock].Requires.indexOf(upgradeKey) - 1, 1);
        }
    }
    for(let upgradeKey of Object.keys(UpgradesToIndex)){
        if(UpgradesToIndex[upgradeKey].Requires.length > 0){
            let str = `Upgrade ${upgradeKey} cannot be unlocked. Missing upgrades: `;
            for(let missing of UpgradesToIndex[upgradeKey].Requires){
                str += ` ${missing} `;
            }
            console.error(str);
        }
    }
}
*/
