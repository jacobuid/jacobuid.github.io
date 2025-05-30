var successData = {
    role: "admin",
    amenities: true,
    markerSize: 20,
    icons: ["apartment", "garage", "water", "tree", "marker"],
    level: 0,
    levels: {
        "0": {
            name: "Lobby",
            img: "src/floor-1.png",
            entities: {
                "1101": {
                    name: "1101",
                    icon: "apartment",
                    x: 60.24,
                    y: 79.41,
                    assigned: false,
                },
                "1102": {
                    name: "1102",
                    icon: "apartment",
                    x: 66.06,
                    y: 80.15,
                    assigned: false,
                },
                "1103": {
                    name: "1103",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1104": {
                    name: "1104",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1105": {
                    name: "1105",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1106": {
                    name: "1106",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1107": {
                    name: "1107",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1108": {
                    name: "1108",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1109": {
                    name: "1109",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1110": {
                    name: "1110",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1111": {
                    name: "1111",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1112": {
                    name: "1112",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1113": {
                    name: "1113",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1114": {
                    name: "1114",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1115": {
                    name: "1115",
                    icon: "apartment",
                    x: 28.3,
                    y: 45.75,
                    assigned: false,
                },
                "1116": {
                    name: "1116",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1117": {
                    name: "1117",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1118": {
                    name: "1118",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1119": {
                    name: "1119",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1120": {
                    name: "1120",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1121": {
                    name: "1121",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1122": {
                    name: "1122",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1123": {
                    name: "1123",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "1124": {
                    name: "1124",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                Garage: {
                    name: "Garage",
                    icon: "garage",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "Water Fountain": {
                    name: "Water Fountain",
                    icon: "water",
                    x: null,
                    y: null,
                    assigned: false,
                },
                Trees: {
                    name: "Trees",
                    icon: "tree",
                    x: null,
                    y: null,
                    assigned: false,
                },
            },
        },
        "1": {
            name: "Second Floor",
            img: "src/floor-2.png",
            entities: {
                "2103": {
                    name: "2103",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "2110": {
                    name: "2110",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "2112": {
                    name: "2112",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "2118": {
                    name: "2118",
                    icon: "apartment",
                    x: 17.09,
                    y: 60.85,
                    assigned: true,
                },
            },
        },
        "2": {
            name: "Third Floor",
            img: "src/floor-3.png",
            entities: {
                "3101": {
                    name: "3101",
                    icon: "apartment",
                    x: 60.37,
                    y: 79,
                    assigned: true,
                },
                "3107": {
                    name: "3107",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "3112": {
                    name: "3112",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
                "3120": {
                    name: "3120",
                    icon: "apartment",
                    x: null,
                    y: null,
                    assigned: false,
                },
            },
        },
    },
};

(function () {
    $("#map1").addISM(successData);

    // Toggle Role, Development purpuses only, REMOVE BEFORE PROD
    $(".toggle-role").on("click", function () {
        if (InteractiveSiteMap.data.role === "admin") {
            InteractiveSiteMap.data.role = "user";
            $("#map1").html("").addISM(InteractiveSiteMap.data);
        } else {
            InteractiveSiteMap.data.role = "admin";
            $("#map1").html("").addISM(InteractiveSiteMap.data);
        }
    });
})();
