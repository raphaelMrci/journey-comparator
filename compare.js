const destinations = require("./data.json")

console.log("Calcul en cours...");

let scenarios = [];

destinations.forEach((destination) => {
    console.log(destination);
    console.log("---------------");

    if (destination.hotel) {
        destination.hotels.forEach((hotel) => {

            if (destination.persons.length > 1) {
                destination.persons[0].aller.forEach((aller1) => {
                    destination.persons[0].retour.forEach((retour1) => {
                        destination.persons[1].aller.forEach((aller2) => {
                            destination.persons[1].retour.forEach((retour2) => {
                                let scenario = {price: 0, timeTogether: 0, destination: destination.name, hotel, aller1, aller2, retour1, retour2 };
                                scenario.price += hotel.price + aller1.price + aller2.price + retour1.price + retour2.price;
                                
                                scenario.timeTogether = timeTogetherCalculator(aller1, retour1, aller2, retour2);

                                scenarios.push(scenario);
                            });
                        });
                    });
                });
            } else {
                destination.persons[0].aller.forEach((aller) => {
                    destination.persons[0].retour.forEach((retour) => {
                        let scenario = {price: 0, timeTogether: 0, destination: destination.name, hotel, aller, retour };
                        scenario.price += hotel.price + aller.price + retour.price;

                        scenario.timeTogether = timeTogetherCalculator(aller, retour);

                        scenarios.push(scenario);
                    });
                });
            }
        });
    } else {
        if (destination.persons.length > 1) {
            destination.persons[0].aller.forEach((aller1) => {
                destination.persons[0].retour.forEach((retour1) => {
                    destination.persons[1].aller.forEach((aller2) => {
                        destination.persons[1].retour.forEach((retour2) => {
                            let scenario = {price: 0, timeTogether: 0, destination: destination.name, aller1, aller2, retour1, retour2 };
                            scenario.price += aller1.price + aller2.price + retour1.price + retour2.price;
                            
                            scenario.timeTogether = timeTogetherCalculator(aller1, retour1, aller2, retour2);

                            scenarios.push(scenario);
                        });
                    });
                });
            });
        } else {
            destination.persons[0].aller.forEach((aller) => {
                destination.persons[0].retour.forEach((retour) => {
                    let scenario = {price: 0, timeTogether: 0, destination: destination.name, aller, retour };
                    scenario.price += aller.price + retour.price;

                    scenario.timeTogether = timeTogetherCalculator(aller, retour);

                    scenarios.push(scenario);
                });
            });
        }
    }
});

scenarios.sort((a, b) => {
    if (a.timeTogether < b.timeTogether){
        return -1;
    } else {
        return 0;
    }
});

console.log(scenarios);

function timeToInt(time) {
    let splitted = time.split("h");
    let minutes = Math.floor(splitted[1]*100/60);

    let result = "";
    result = result.concat(Math.floor(splitted[0]),".", minutes);
    return parseInt(result);
}

function dateToHours(date) {
    let splitted = date.split("/");
    let result = 0;

    switch (splitted[1]){
        case "01":
            result = 0;
            break;
        case "02":
            result = 744;
            break;
        case "03":
            result = 1440;
            break;
        case "04":
            result = 2184;
            break;
        case "05":
            result = 2904;
            break;
        case "06":
            result = 3648;
            break;
        case "07":
            result = 4368;
            break;
        case "08":
            result = 5112;
            break;
        case "09":
            result = 5856;
            break;
        case "10":
            result = 6576;
            break;
        case "11":
            result = 7320;
            break;
        case "12":
            result = 8040;
            break;
    }
    result += (Math.floor(splitted[0]) * 24);
    return result;
}

function timeTogetherCalculator(aller1, retour1, aller2, retour2){
    if (aller2 != null){
        let retour = Math.min((dateToHours(retour1.depart_day)+timeToInt(retour1.departure)), (dateToHours(retour2.depart_day)+timeToInt(retour2.departure)));
        let arrivee = Math.max((dateToHours(aller1.arrive_day)+timeToInt(aller1.arrival)), (dateToHours(aller2.arrive_day)+timeToInt(aller2.arrival)));

        return retour - arrivee;
    } else {
        return (dateToHours(retour1.depart_day)+timeToInt(retour1.departure)) - (dateToHours(aller1.depart_day)+timeToInt(aller1.departure));
    }
}