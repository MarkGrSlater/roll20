#!/usr/bin/env bash

# build html file
outfile="runequest_3_5.html"
cp /dev/null ${outfile}

for i in $(cat list.txt)
do
    cat $i >> ${outfile}
done
echo ' ' >> ${outfile}
echo '<script type="text/worker">' >> ${outfile}
cat javascript/calcStrikeRanks_DamageBonus.js >> ${outfile}
cat javascript/primalFluxCalculator.js >> ${outfile}
cat javascript/sorcerySpellCalculator.js >> ${outfile}
cat javascript/spiritSkills.js >> ${outfile}
cat javascript/dodge.js >> ${outfile}
cat javascript/tabHandler.js >> ${outfile}
echo '</script>' >> ${outfile}

# build css file
cssoutfile="runequest_3_5.css"
cp /dev/null ${cssoutfile}

for i in $(cat csslist.txt)
do
    cat $i >> ${cssoutfile}
done
