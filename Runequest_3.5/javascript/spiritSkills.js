on("change:amplify_base change:combine_base change:distance_base change:prolong_base change:int_primary change:pow_primary change:dex_secondary change:magb_enchant", function () {
    console.log("**** start spirit skills calculator ****");
    getAttrs(["amplify_base", "combine_base", "distance_base", "prolong_base", "int_primary", "pow_primary",
        "dex_secondary", "magb_enchant"], function (pvalue) {
        /*
         * trace messages
         */
        console.log("amplify base = " + pvalue.amplify_base);
        console.log("combine base = " + pvalue.combine_base);
        console.log("distance base = " + pvalue.distance_base);
        console.log("prolong base = " + pvalue.prolong_base);
        console.log("int primary  = " + pvalue.int_primary);
        console.log("pow primary  = " + pvalue.pow_primary);
        console.log("dex seconary = " + pvalue.dex_secondary);
        console.log("magb_enchant = " + pvalue.magb_enchant);

        /*
         * internal declarations
         */
        let spiritupdate = {};
        let magicBonus = parseInt(pvalue.int_primary) + parseInt(pvalue.pow_primary) + parseInt(pvalue.dex_secondary) +
            parseInt(pvalue.magb_enchant);
        let amplifyBase  = parseInt(pvalue.amplify_base);
        let amplifyTotal = 0;
        let amplifyBoost = 0;

        let combineBase  = parseInt(pvalue.combine_base);
        let combineTotal = 0;
        let combineBoost = 0;

        let distanceBase  = parseInt(pvalue.distance_base);
        let distanceTotal = 0;
        let distanceBoost = 0;

        let prolongBase  = parseInt(pvalue.prolong_base);
        let prolongTotal = 0;
        let prolongBoost = 0;

        /*
         * calculate boost ability for amplify
         */
        if (amplifyBase > 0) {
            amplifyTotal = amplifyBase + magicBonus;
            amplifyBoost = Math.floor(amplifyTotal / 10);
        }
        console.log("Magic bonus  = " + magicBonus);
        spiritupdate['amplify_total'] = amplifyTotal;
        console.log("Updating amplify total to " + spiritupdate['amplify_total']);

        if (amplifyBoost > 0) {
            spiritupdate['amplify_boost'] = "Add up to " + amplifyBoost + " points";
        } else {
            spiritupdate['amplify_boost'] = "Not enough skill";
        }

        /*
         * calculate boost ability for combine
         */
        if (combineBase > 0) {
            combineTotal = combineBase + magicBonus;
            combineBoost = Math.floor(combineTotal / 10);
        }
        console.log("Magic bonus  = " + magicBonus);
        spiritupdate['combine_total'] = combineTotal;
        console.log("Updating combine total to " + spiritupdate['combine_total']);

        if (combineBoost > 0) {
            spiritupdate['combine_boost'] = "Combine up to " + combineBoost + " spells";
        } else {
            spiritupdate['combine_boost'] = "Not enough skill";
        }

        /*
         * calculate boost ability for distance
         */
        if (distanceBase > 0) {
            distanceTotal = distanceBase + magicBonus;
            distanceBoost = Math.floor(distanceTotal / 10) * 50;
        }
        console.log("Magic bonus  = " + magicBonus);
        spiritupdate['distance_total'] = distanceTotal;
        console.log("Updating distance total to " + spiritupdate['distance_total']);

        if (distanceBoost > 0) {
            spiritupdate['distance_boost'] = "Increase range up to " + distanceBoost + "m";
        } else {
            spiritupdate['distance_boost'] = "Not enough skill";
        }

        /*
         * calculate boost ability for prolong
         */
        if (prolongBase > 0) {
            prolongTotal = prolongBase + magicBonus;
            prolongBoost = Math.floor(prolongTotal / 10) * 5;
        }
        console.log("Magic bonus  = " + magicBonus);
        spiritupdate['prolong_total'] = prolongTotal;
        console.log("Updating prolong total to " + spiritupdate['prolong_total']);

        if (prolongBoost > 0) {
            spiritupdate['prolong_boost'] = "Increase duration up to " + prolongBoost + " mins";
        } else {
            spiritupdate['prolong_boost'] = "Not enough skill";
        }

        setAttrs(spiritupdate);
    });
});
