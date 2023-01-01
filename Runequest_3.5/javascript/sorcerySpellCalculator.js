on("change:spell_intensity change:spell_range change:spell_multispell change:spell_hold " +
    "change:spell_accuracy change:spell_ease change:spell_force change:spell_permanence " +
    "change:spell_reinforce change:spell_speed change:sorceryspell_baseskill " +
    "change:sorceryspell_ceremonypoints change:sorceryskill_ceremonybase change:sorceryskill_intensitybase " +
    "change:sorceryskill_rangebase change:sorceryskill_multispellbase change:sorceryskill_accuracybase " +
    "change:sorceryskill_easebase change:sorceryskill_forcebase change:sorceryskill_holdbase " +
    "change:sorceryskill_permanencebase change:sorceryskill_reinforcebase " +
    "change:sorceryskill_speedbase", function () {
    console.log("***** start sorcery spell calculator *****");
    getAttrs(["spell_intensity", "spell_multispell", "spell_range", "spell_accuracy", "spell_ease", "spell_force",
            "spell_hold", "spell_permanence", "spell_reinforce", "spell_speed", "int_primary", "pow_primary",
            "dex_secondary", "magb_enchant", "sorceryskill_intensitybase", "sorceryskill_rangebase",
            "sorceryskill_multispellbase", "sorceryskill_accuracybase", "sorceryskill_easebase",
            "sorceryskill_forcebase", "sorceryskill_holdbase", "sorceryskill_permanencebase",
            "sorceryskill_reinforcebase", "sorceryskill_speedbase", "sorceryspell_baseskill",
            "sorceryspell_ceremonypoints", "sorceryskill_ceremonybase"],
        function (pvalue) {

            let strike_rank = 0;
            let spell_skill_needed = 0;
            let lowest_skill = 1000;
            let highest_art = 0;
            let total_mp = 0;
            let ease = 0;

            let update = {
                'max_accuracy': '',
                'max_ease': '',
                'max_force': '',
                'max_hold': '',
                'max_intensity': '',
                'max_multispell': '',
                'max_permanence': '',
                'max_range': '',
                'max_reinforce': '',
                'max_speed': '',
                'range_meters': 10,
                'minimum_skill': 0,
                'maximum_skill': parseInt(pvalue.sorceryspell_baseskill),
                'sorceryspell_ceremonymax': parseInt(pvalue.sorceryskill_ceremonybase),
                'total_skill': 0,
                'total_magicpoints': 0,
                'total_strikeranks': 0
            };

            function get_bonus(modifier) {
                if (parseInt(modifier) > -10) {
                    return parseInt(modifier);
                }
                return 0;
            }
            let skill_bonus = get_bonus(pvalue.pow_primary) + get_bonus(pvalue.int_primary) +
                get_bonus(pvalue.dex_secondary) + get_bonus(pvalue.magb_enchant)

            console.log("Ceremony max = " + update['sorceryspell_ceremonymax']);
            console.log("skill bonus = " + skill_bonus);
            update['sorceryspell_ceremonymax'] += skill_bonus;
            console.log("Ceremony max is now = " + update['sorceryspell_ceremonymax']);

            let total_skill = parseInt(pvalue.sorceryspell_baseskill);
            let ceremonyMax = parseInt(pvalue.sorceryspell_ceremonypoints);

            if (ceremonyMax > 0) {

                if (ceremonyMax > total_skill) {
                    // ceremony cannot be greater than spell skill
                    ceremonyMax = total_skill;
                    // set ceremony points used to adjusted value
                    update['sorceryspell_ceremonypoints'] = ceremonyMax;
                }
                if (ceremonyMax > update['sorceryspell_ceremonymax']) {
                    // ceremony used cannot be greater than ceremony skill
                    ceremonyMax = update['sorceryspell_ceremonymax'];
                    // set ceremony points used to adjusted value
                    update['sorceryspell_ceremonypoints'] = ceremonyMax;
                }

                console.log("Adding base skill of " + parseInt(pvalue.sorceryspell_baseskill) +
                    " with ceremony points of " + ceremonyMax);
                total_skill += ceremonyMax;
                update['maximum_skill'] = total_skill;
            }


            function calculate_variables(skillbase, points, skill_bonus, max_indicator, min_value = 0, update_index='') {
                console.log("Called calculate_variables(skillbase=" + skillbase + ", skill_bonus=" + skill_bonus +
                    ", points=" + points + ", max_indicator=" + max_indicator + ", min_value=" + min_value +")");
                let points_given = 0;
                if (parseInt(skillbase) > 0) {
                    points_given = parseInt(points);

                    if (points_given > 0 && points_given < min_value && update_index !== '') {
                        points_given = min_value;
                        update[update_index] = min_value;
                    }
                    if (points_given > 0 && max_indicator === 'max_hold') {
                        // for hold points it must always be at least the highest art provided.
                        points_given = highest_art;
                        update['spell_hold'] = points_given;
                    }
                    if (highest_art < points_given) {
                        highest_art = points_given;
                    }
                    let max_skill = skill_bonus + parseInt(skillbase)
                    console.log("max_skill = " + max_skill);
                    if (max_skill > 89) {
                        console.log("Setting update['" + max_indicator + "'] to " + total_skill);
                        update[max_indicator] = total_skill;
                    } else {
                        console.log("Setting update['" + max_indicator + "'] to " + max_skill);
                        update[max_indicator] = max_skill;
                        if (lowest_skill > max_skill) {
                            lowest_skill = max_skill;
                        }
                        if (points_given > 0 && update['maximum_skill'] > max_skill) {
                            update['maximum_skill'] = max_skill;
                        }
                    }
                }

                if (max_indicator !== 'max_ease') {
                    // ease skill does not add to magic points
                    total_mp += points_given;
                }
                if (max_indicator !== 'max_speed') {
                    // speed skill does not add to strike ranks
                    strike_rank += points_given;
                }

                spell_skill_needed += points_given;
            }

            calculate_variables(pvalue.sorceryskill_intensitybase, pvalue.spell_intensity, skill_bonus,
                'max_intensity', 1, 'spell_intensity');

            calculate_variables(pvalue.sorceryskill_rangebase, pvalue.spell_range, skill_bonus,
                'max_range')

            function get_range_in_meters(range_mp) {
                let min_range_in_meters = 10;

                if (range_mp < 1) {
                    return min_range_in_meters;
                }

                return min_range_in_meters * Math.pow(2, range_mp);
            }

            update['range_meters'] = get_range_in_meters(parseInt(pvalue.spell_range));

            calculate_variables(pvalue.sorceryskill_multispellbase, pvalue.spell_multispell, skill_bonus,
                'max_multispell', 2, 'spell_multispell');

            calculate_variables(pvalue.sorceryskill_accuracybase, pvalue.spell_accuracy, skill_bonus,
                'max_accuracy');

            calculate_variables(pvalue.sorceryskill_forcebase, pvalue.spell_force, skill_bonus,
                'max_force');

            calculate_variables(pvalue.sorceryskill_permanencebase, pvalue.spell_permanence, skill_bonus,
                'max_permanence');

            calculate_variables(pvalue.sorceryskill_reinforcebase, pvalue.spell_reinforce, skill_bonus,
                'max_reinforce');

            calculate_variables(pvalue.sorceryskill_easebase, pvalue.spell_ease, skill_bonus,
                'max_ease');

            calculate_variables(pvalue.sorceryskill_speedbase, pvalue.spell_speed, skill_bonus,
                'max_speed');

            calculate_variables(pvalue.sorceryskill_holdbase, pvalue.spell_hold, skill_bonus,
                'max_hold');

            function add_ceremony_strike_ranks(ceremony_points) {
                if (ceremony_points > 0) {
                    // every 10 ceremony or part thereof adds 10 strike ranks to spell casting time
                    return (Math.ceil(ceremony_points / 10) * 10);
                }
                return 0;
            }
            strike_rank += add_ceremony_strike_ranks(pvalue.sorceryspell_ceremonypoints);

            if (parseInt(pvalue.spell_speed) > 0) {
                strike_rank -= parseInt(pvalue.spell_speed);

                if (strike_rank < 1) {
                    strike_rank = 1;
                }
            }

            if (parseInt(pvalue.spell_ease) > 0) {
                total_mp -= parseInt(pvalue.spell_ease);

                if (total_mp < ease) {
                    total_mp = parseInt(pvalue.spell_ease);
                }
            }

            if (spell_skill_needed > 1) {
                update['minimum_skill'] = ((spell_skill_needed - 1) * 10) + 1;
            } else {
                update['minimum_skill'] = '1';
            }

            update['sorcery_shortfall'] = update['minimum_skill'] - total_skill;
            console.log("setting short fall to " + update['sorcery_shortfall'] +
                 " = skill needed (" + update['minimum_skill'] + ") - total skill(" + total_skill + ")");
            update['total_magicpoints'] = total_mp;
            update['total_strikeranks'] = strike_rank;
            update['total_skill'] = total_skill;

            setAttrs(update);
    });
});
