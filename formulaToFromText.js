function formulaToFromText(data) {
	data = data.toLowerCase().replace(/ /g, '');
	var returnedText = false;
	
	for (var i=0; i<formulas.length; i++) {
		for (var x=0; x<formulas[i].length; x++) {
			
			if (data === formulas[i][x][0]) returnedText = formulas[i][x][1];
			//If they entered a formula with html
			if (data === formulas[i][x][1].toLowerCase().replace(/ /g, '')) returnedText = formulas[i][x][0];
			//If they entered a formula without html
			if (data === formulas[i][x][1].replace(/sub/g,'').replace(/sup/g,'').replace(/sub/g,'').replace(/</g,'').replace(/\//g,'').replace(/>/g,'').toLowerCase().replace(/ /g, '')) returnedText = formulas[i][x][0];
		}
	}
	
	return returnedText;
}

var formulas = [
	[["ammonium","NH<sub>4</sub><sup>+</sup></div>"]] 
,	[["acetate","C<sub>2</sub>H<sub>3</sub>O<sub>2</sub><sup>-</sup>"],["bicarbonate(orhydrogencarbonate)","HCO<sub>3</sub><sup>-</sup>"],["bisulfate(orhydrogensulfate)","HSO<sub>4</sub><sup>-</sup>"],["chlorate","ClO<sub>3</sub><sup>-</sup>"],["chlorite","ClO<sub>2</sub><sup>-</sup>"],["cyanate","OCN<sup>-</sup>"],["cyanide","CN<sup>-</sup>"],["dihydrogenphosphate","H<sub>2</sub>PO<sub>4</sub><sup>-</sup>"],["hydroxide","OH<sup>-</sup>"],["nitrate","NO<sub>3</sub><sup>-</sup>"],["nitrite","NO<sub>2</sub><sup>-</sup>"],["perchlorate","ClO<sub>4</sub><sup>-</sup>"],["permanganate","MnO<sub>4</sub><sup>-</sup>"],["thiocyanate","SCN<sup>-</sup>"]]
, 	[["carbonate","CO<sub>3</sub><sup>2-</sup>"],["chromate","CrO<sub>4</sub><sup>2-</sup>"],["dichromate","Cr<sub>2</sub>O<sub>7</sub><sup>2-</sup>"],["hydrogenphosphate","HPO<sub>4</sub><sup>2-</sup>"],["peroxide","O<sub>2</sub><sup>2-</sup>"],["sulfate","SO<sub>4</sub><sup>2-</sup>"],["sulfite","SO<sub>3</sub><sup>2-</sup>"],["thiosulfate","S<sub>2</sub>O<sub>3</sub><sup>2-</sup>"]]
,	[["borate","BO<sub>3</sub><sup>3-</sup>"],["phosphate","PO<sub>4</sub><sup>3-</sup>"]]
]
