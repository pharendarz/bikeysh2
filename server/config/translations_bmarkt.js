var translateAttributeLabel = [
    { GER: 'Hersteller', ENG: 'Manufacturer', fieldTag: 'manufacturer', regex: '' },
    { GER: 'Zustand', ENG: 'State', fieldTag: 'state', regex: '' },
    { GER: 'Versandkosten', ENG: 'Shipping Cost', fieldTag: 'shippingCost', regex: '' },
    { GER: 'Ort', ENG: 'Town', fieldTag: 'town', regex: '' },
    { GER: 'Farbe', ENG: 'Color', fieldTag: 'color', regex: '' },
    { GER: 'Angesehen', ENG: 'Watched Times', fieldTag: 'watchedTimes', regex: /(\d{1,4})/g },
    { GER: 'Händler', ENG: 'Dealer', fieldTag: 'dealer', regex: '' },
    { GER: 'Land', ENG: 'Country', fieldTag: 'country', regex: '' },
    { GER: 'Gewicht', ENG: 'Weight', fieldTag: 'weight', regex: '' },
    //[cranks]
    { GER: 'Kettenblattbefestigung', ENG: 'Chainring Mount Type', fieldTag: 'chainringMountType', regex: '' },
    { GER: 'Kurbelstandard', ENG: 'Crank Standard', fieldTag: 'crankStandard', regex: '' },
    { GER: 'Länge', ENG: 'Crank Arm Length', fieldTag: 'crankArmLength', regex: '' },
    { GER: 'Einbaubreite', ENG: 'Crank Width', fieldTag: 'crankWidth', regex: '' },
    //[dhFrames / enduroFrames]
    { GER: 'Rahmengröße', ENG: 'Frame Size', fieldTag: 'frameSize', regex: '' },
    { GER: 'Dämpfer-Einbaumaße', ENG: 'Rear Shock Dimension', fieldTag: 'rearShockDimension', regex: '' },
    { GER: 'Laufradgröße', ENG: 'Wheel Size', fieldTag: 'wheelSize', regex: '' },
    { GER: 'Sattelstützendurchmesser', ENG: 'Seat Clamp Size', fieldTag: 'seatClampSize', regex: '' },
    { GER: 'Material', ENG: 'Material', fieldTag: 'material', regex: '' },
    { GER: 'Federweg hinten', ENG: 'Rear Travel', fieldTag: 'rearTravel', regex: '' },
    //[hubs]
    { GER: 'Anzahl Speichen Vorderrad', ENG: 'Front Spokes No.', fieldTag: 'frontSpokesNo', regex: '' },
    { GER: 'Anzahl Speichen Hinterrad', ENG: 'Rear Spokes No.', fieldTag: 'rearSpokesNo', regex: '' },
    { GER: 'Nabenbreite vorn', ENG: 'Front Axle', fieldTag: 'frontAxle', regex: '' },
    { GER: 'Nabenbreite hinten', ENG: 'Rear Axle', fieldTag: 'rearAxle', regex: '' },
    //[wheels]
    { GER: 'Felgenbreite', ENG: 'Rim Width', fieldTag: 'rimWidth', regex: '' },
    {
        GER: 'Achsdurchmesser Vorderrad',
        ENG: 'Axle diameter front wheel',
        fieldTag: 'axleDiameterFrontWheel',
        regex: ''
    },
    {
        GER: 'Achsdurchmesser Hinterrad',
        ENG: 'Axle diameter rear wheel',
        fieldTag: 'axleDiameterRearWheel',
        regex: ''
    },
    { GER: 'Achstyp', ENG: 'Axle type', fieldTag: 'axleType', regex: '' },
    { GER: 'Description', ENG: 'Description', fieldTag: 'description', regex: '' },
    { GER: 'Pictures', ENG: 'Pictures', fieldTag: 'pictures', regex: '' }
];

exports.translation = (germanString, eng) => {
    eng(translateAttributes(germanString));
};

function translateAttributes(germanString) {
    var index = translateAttributeLabel.findIndex(x => x.GER == germanString);
    if (index !== -1) return translateAttributeLabel[index].ENG;
    else return 'skip';
}
exports.matchField = (artibutes, fieldCaption, arrayIndex) => {
    var i = 0;

    while (artibutes[i]) {
        var index = translateAttributeLabel.findIndex(x => x.ENG == artibutes[i].field);
        if (index !== -1 && fieldCaption === translateAttributeLabel[index].fieldTag)
            if (translateAttributeLabel[index].regex !== '') {
                var regexed = translateAttributeLabel[index].regex.exec(artibutes[i].value);
                if (regexed !== null) return regexed[0];
                else return null;
            } else {
                if (arrayIndex !== undefined) {
                    return artibutes[i].value[arrayIndex];
                } else {
                    if (artibutes[i].value !== undefined) return artibutes[i].value.trim();
                    else return null;
                }
            }
        i++;
    }
    return null;
};