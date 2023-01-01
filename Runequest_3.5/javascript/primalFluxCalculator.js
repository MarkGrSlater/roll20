on("change:pow_total change:number_worshippers change:number_souls change:deities_base change:number_shrines " +
    "change:number_temples change:number_greater change:number_miniplanes change:number_planes", function () {
    console.log("***** start primal calculator *****");
    getAttrs(["pow_enchant", "pow", "number_worshippers", "number_souls", "deities_base", "number_shrines", "number_temples",
        "number_greater", "number_miniplanes", "number_planes"], function (pvalue) {
        let update = {};
        let total = 0;
        let sqRoot = 0;
        let primal_base = parseInt(pvalue.pow) + parseInt(pvalue.pow_enchant)

        console.log('Power current = ' + pvalue.pow);
        console.log('Power enchant = ' + pvalue.pow_enchant);
        console.log('Primal base = ' + primal_base);
        console.log('# of worshippers = ' + pvalue.number_worshippers);
        console.log('# of souls = ' + pvalue.number_souls);
        console.log('deities base = ' + pvalue.deities_base);
        console.log('# shrines = ' + pvalue.number_shrines);
        console.log('# of temples ' + pvalue.number_temples);
        console.log('# of greater temples ' + pvalue.number_greater);
        console.log('# of mini planes = ' + pvalue.number_miniplanes);
        console.log('# of planes = ' + pvalue.number_planes);

        if (parseInt(pvalue.number_worshippers) > 0) {
            console.log("Calculating square root of number of worshippers (" + pvalue.number_worshippers + ')');
            sqroot = Math.sqrt(parseInt(pvalue.number_worshippers));
            total = Math.floor(sqroot);
            console.log('Square root of num worshippers (' + pvalue.number_worshippers + ') is ' + sqroot)
            console.log('Total is ' + total);
        }

        if (parseInt(pvalue.number_souls) > 0) {
            sqroot = Math.sqrt(parseInt(pvalue.number_souls));
            console.log('Square root of num souls (' + pvalue.number_souls + ') is ' + sqroot);
            total = total + Math.floor(sqroot / 10);
            console.log('Total is ' + total);
        }

        if (parseInt(pvalue.deities_base) > 0) {
            console.log('Adding 10% of captured deities base (' + pvalue.deities_base + ')');
            total = total + Math.floor(parseInt(pvalue.deities_base) / 10);
            console.log('Total is ' + total);
        }

        if (parseInt(pvalue.number_shrines) > 0) {
            console.log('Adding 5 * number of shrines (' + pvalue.number_shrines + ')');
            total = total + parseInt(pvalue.number_shrines) * 5;
            console.log('Total is ' + total);
        }

        if (parseInt(pvalue.number_temples) > 0) {
            console.log('Adding 10 * number of temples (' + pvalue.number_temples + ')');
            total = total + parseInt(pvalue.number_temples) * 10;
            console.log('Total is ' + total);
        }

        if (parseInt(pvalue.number_greater) > 0) {
            console.log('Adding 20 * number of greater temples (' + pvalue.number_greater + ')');
            total = total + parseInt(pvalue.number_greater) * 20;
            console.log('Total is ' + total);
        }

        if (parseInt(pvalue.number_miniplanes) > 0) {
            console.log('Adding 100 * number of miniplanes (' + pvalue.number_miniplanes + ')');
            total = total + parseInt(pvalue.number_miniplanes) * 100;
            console.log('Total is ' + total);
        }

        if (parseInt(pvalue.number_planes) > 0) {
            console.log('Adding 1000 * number of planes (' + pvalue.number_planes + ')');
            total = total + parseInt(pvalue.number_planes) * 1000;
            console.log('Total is ' + total);
        }

        if (primal_base > 0) {
            console.log('Adding 10% of primal base (' + primal_base + ')');
            total = total + Math.floor((primal_base / 10));
            console.log('Total is ' + total);
        } else {
            console.log('No primal base = no primal flux')
            total = 0;
            console.log('Total is ' + total);
        }
        update['total_flux'] = total;
        console.log("Calculated primal flux at " + update['total_flux']);
        setAttrs(update);
    });
    }
);
