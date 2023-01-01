    on("change:str change:str_enchant change:con change:con_enchant change:siz change:siz_enchant " +
        "change:int change:int_enchant change:dex change:dex_enchant change:pow change:pow_enchant " +
        "change:app change:app_enchant change:encumbrance_total", function() {
        console.log("***** start dex strike rank ***** at " + Date.now());
        getAttrs(["str", "str_enchant", "con", "con_enchant", "siz", "siz_enchant", "int", "int_enchant",
            "dex", "dex_enchant", "pow", "pow_enchant", "app", "app_enchant"], function(pvalue) {
				console.log("str value: " + pvalue.str);
				console.log("str enchant value: " + pvalue.str_enchant);
                console.log("con value: " + pvalue.con);
				console.log("con enchant value: " + pvalue.con_enchant);
                console.log("siz value: " + pvalue.siz);
				console.log("siz enchant value: " + pvalue.siz_enchant);
                console.log("int value: " + pvalue.int);
				console.log("int enchant value: " + pvalue.int_enchant);
                console.log("dex value: " + pvalue.dex);
				console.log("dex enchant value: " + pvalue.dex_enchant);
        		console.log("pow value: " + pvalue.dex);
				console.log("pow enchant value: " + pvalue.dex_enchant);
        		console.log("app value: " + pvalue.dex);
				console.log("app enchant value: " + pvalue.dex_enchant);

	            let totalStr = parseInt(pvalue.str) + parseInt(pvalue.str_enchant);
	            let totalCon = parseInt(pvalue.con) + parseInt(pvalue.con_enchant);
				let totalSiz = parseInt(pvalue.siz) + parseInt(pvalue.siz_enchant);
				let totalInt = parseInt(pvalue.int) + parseInt(pvalue.int_enchant);
	            let totalDex = parseInt(pvalue.dex) + parseInt(pvalue.dex_enchant);
	            let totalPow = parseInt(pvalue.pow) + parseInt(pvalue.pow_enchant);
	            let totalApp = parseInt(pvalue.app) + parseInt(pvalue.app_enchant);
                let secondaryMax = 10;

	            let damage = totalSiz + totalStr;
                let update = {};

                /*
                 *  Calculate Stamina
                 */
                update['stamina'] = totalStr + totalCon;

                /*
                 *  Calculate Strength skill modifiers
                 */
                console.log("Setting STR monifiers");
                update['str_primary'] = totalStr - secondaryMax;
                update['str_negative'] = secondaryMax - totalStr;
	            update['str_secondary'] = Math.ceil((totalStr - secondaryMax)/2);
	            if (update['str_secondary'] > secondaryMax) {
	                update['str_secondary'] = secondaryMax;
                }
                console.log("set STR primary = " + update['str_primary']);
                console.log("set STR negative = " + update['str_negative']);
                console.log("set STR secondary = " + update['str_secondary']);

	            /*
                 *  Calculate Constitution skill modifiers
                 */
                console.log("Setting CON monifiers");
                update['con_primary'] = totalCon - secondaryMax;
                update['con_negative'] = secondaryMax - totalCon;
	            update['con_secondary'] = Math.ceil((totalCon - secondaryMax)/2);
	            if (update['con_secondary'] > secondaryMax) {
	                update['con_secondary'] = secondaryMax;
                }
                console.log("set CON primary = " + update['con_primary']);
                console.log("set CON negative = " + update['con_negative']);
                console.log("set CON secondary = " + update['con_secondary']);

	            /*
                 *  Calculate Size skill modifiers
                 */
                console.log("Setting SIZ monifiers");
                update['siz_primary'] = totalSiz - secondaryMax;
                update['siz_negative'] = secondaryMax - totalSiz;
	            update['siz_secondary'] = Math.ceil((totalSiz - secondaryMax)/2);
	            if (update['siz_secondary'] > secondaryMax) {
	                update['siz_secondary'] = secondaryMax;
                }
                console.log("set SIZ primary = " + update['siz_primary']);
                console.log("set SIZ negative = " + update['siz_negative']);
                console.log("set SIZ secondary = " + update['siz_secondary']);

	            /*
                 *  Calculate Intelligence skill modifiers
                 */
                console.log("Setting INT monifiers");
                update['int_primary'] = totalInt - secondaryMax;
                update['int_negative'] = secondaryMax - totalInt;
	            update['int_secondary'] = Math.ceil((totalInt - secondaryMax)/2);
	            if (update['int_secondary'] > secondaryMax) {
	                update['int_secondary'] = secondaryMax;
                }
                console.log("set INT primary = " + update['int_primary']);
                console.log("set INT negative = " + update['int_negative']);
                console.log("set INT secondary = " + update['int_secondary']);

	            /*
                 *  Calculate Dexterity skill modifiers
                 */
                console.log("Setting DEX monifiers");
                update['dex_primary'] = totalDex - secondaryMax;
                update['dex_negative'] = secondaryMax - totalDex;
	            update['dex_secondary'] = Math.ceil((totalDex - secondaryMax)/2);
	            if (update['dex_secondary'] > secondaryMax) {
	                update['dex_secondary'] = secondaryMax;
                }
                console.log("set DEX primary = " + update['dex_primary']);
                console.log("set DEX negative = " + update['dex_negative']);
                console.log("set DEX secondary = " + update['dex_secondary']);

	            /*
                 *  Calculate Power skill modifiers
                 */
                console.log("Setting POW monifiers");
                update['pow_primary'] = totalPow - secondaryMax;
                update['pow_negative'] = secondaryMax - totalPow;
	            update['pow_secondary'] = Math.ceil((totalPow - secondaryMax)/2);
	            if (update['pow_secondary'] > secondaryMax) {
	                update['pow_secondary'] = secondaryMax;
                }
                console.log("set POW primary = " + update['pow_primary']);
                console.log("set POW negative = " + update['pow_negative']);
                console.log("set POW secondary = " + update['pow_secondary']);

	            /*
                 *  Calculate Power skill modifiers
                 */
                console.log("Setting APP monifiers");
                update['app_primary'] = totalApp - secondaryMax;
                update['app_negative'] = secondaryMax - totalApp;
	            update['app_secondary'] = Math.ceil((totalApp - secondaryMax)/2);
	            if (update['app_secondary'] > secondaryMax) {
	                update['app_secondary'] = secondaryMax;
                }
                console.log("set APP primary = " + update['app_primary']);
                console.log("set APP negative = " + update['app_negative']);
                console.log("set APP secondary = " + update['app_secondary']);

	            update['meleemod_dice'] = 0;
	            update['meleemod_sides'] = 6;

                if (damage < 13) {
                    update['missiledmod'] = '-1d8';
                    update['meleemod_dice'] = -1;
                    update['meleemod_sides'] = 4;
                } else if (damage > 71 ) {
                    damage = damage - 71;

                    let multiplier = Math.floor(damage / 16);
                    damage = 4 + multiplier;
                    update['meleemod_dice'] = damage;
                    update['missiledmod'] = '+' + damage + 'd3';
                } else if (damage > 56) {
                    update['meleemod_dice'] = 3;
                    update['missiledmod'] = '+3d3';
                } else if (damage > 40) {
                    update['meleemod_dice'] = 2;
                    update['missiledmod'] = '+2d3';
                } else if (damage > 32) {
                    update['meleemod_dice'] = 1;
                    update['missiledmod'] = '+1d3';
                } else if (damage > 24) {
                    update['meleemod_dice'] = 1;
                    update['meleemod_sides'] = 4;
                    update['missiledmod'] = '+1d2';
                } else {
                    update['missiledmod'] = '0';
                }

                if (update['meleemod_dice'] === 0) {
                    update['damagemod'] = 0;
                } else {
                    update['damagemod'] = update['meleemod_dice'] + 'd' + update['meleemod_sides'];
                }

	            if (totalDex > 19) {
                    console.log("Dex SR is 1");
                    update['dexsr'] = 1;
                } else if (totalDex > 15) {
                    console.log("Dex SR is 2");
                    update['dexsr'] = 2;
                } else if (totalDex > 9) {
                    console.log("Dex SR is 3");
                    update['dexsr'] = 3;
                } else {
	                update['dexsr'] = 4;
                }

	            if (totalSiz > 19) {
                    console.log("Size SR is 0");
                    update['sizsr'] = 0;
                } else if (totalSiz > 15) {
                    console.log("Size SR is 1");
                    update['sizsr'] = 1;
                } else if (totalSiz > 9) {
                    console.log("Size SR is 2");
                    update['sizsr'] = 2;
                } else {
	                update['sizsr'] = 3;
                }

	            update['meleesr'] = update['sizsr'] + update['dexsr'];

                console.log("Setting dexsr to " + update['dexsr']);
                console.log("Setting sizsr to " + update['sizsr']);
                console.log("Setting dexsr to " + update['meleesr']);
                setAttrs(update);
				});

        console.log("***** End Dex SR *****");
    });
