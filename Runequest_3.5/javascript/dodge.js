on("change:dodge_base change:dex change:dex_enchant change:str change:str_enchant change:siz " +
    "change:siz_enchant change:agil_enchant change:encumbrance_total", function () {
        console.log("**** Start Dodge Calculator **** at " + Date.now());
        getAttrs(["dodge_base", "dex_primary", "str_secondary", "siz_negative", "agil_enchant",
                "encumbrance_armour", "encumbrance_weapons", "encumbrance_equipment"],
            function (pvalue) {
                console.log("dodge base  = " + pvalue.dodge_base);
                console.log("dex primary = " + pvalue.dex_primary);
                console.log("str secondary = " + pvalue.str_secondary);
                console.log("siz negative = " + pvalue.siz_negative);
                console.log("agil_enchant = " + pvalue.agil_enchant);
                console.log("encumbrance armour = " + pvalue.encumbrance_armour);
                console.log("encumbrance weapons = " + pvalue.encumbrance_weapons);
                console.log("encumbrance equipment = " + pvalue.encumbrance_equipment);

                let update = {};

                /*
                 * calculate dodge total
                 */
                let dodgeMod = parseInt(pvalue.dex_primary) + parseInt(pvalue.str_secondary) +
                    parseInt(pvalue.siz_negative) + parseInt(pvalue.agil_enchant);
                console.log("Dodge skill = " + dodgeMod);
                update['dodge_modifier'] = dodgeMod;
                /*
                 * calculate encumbrance total
                 */
                let encumbrance = parseInt(pvalue.encumbrance_armour) + parseInt(pvalue.encumbrance_weapons) +
                    parseInt(pvalue.encumbrance_equipment);
                encumbrance = encumbrance * -1;
                console.log("Encumbrance total = " + encumbrance);
                update['dodge_encumbrance'] = encumbrance;

                /*
                 * calculate total dodge skill after encumbrance
                 */
                let totalDodge = parseInt(pvalue.dodge_base) + dodgeMod + encumbrance;
                console.log("Dodge after encumbrance = " + totalDodge);

                /*
                 * cannot have dodge less than 5%
                 */
                if (totalDodge < 5) {
                    totalDodge = 5;
                }
                update['dodge_total'] = totalDodge;
                console.log("Setting total dodge to " + totalDodge);
                setAttrs(update);
        });
});
