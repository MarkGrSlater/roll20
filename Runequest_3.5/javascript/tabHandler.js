const buttonlist = ["attributes","combat","skills","equipment","spirit","divine","dragon","sorcery","devices", "notes"];
buttonlist.forEach(button => {
    on(`clicked:${button}`, function() {
        setAttrs({
            sheetTab: button
        });
    });
});

const locationList = ["human", "fourlegged", "griffin", "wyrm"];
locationList.forEach(button => {
    on(`clicked:${button}`, function () {
        setAttrs({
            sheetLocation: button
        });
    });
});
