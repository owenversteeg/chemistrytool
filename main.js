Mousetrap.bind('enter', function() { parseText(); });

Mousetrap.bind('up', function() { increaseValue(5); });
Mousetrap.bind('down', function() { increaseValue(-5); });

function capitalize(text) {
  return text.substr(0,1).toUpperCase()+text.toLowerCase().substr(1)
}

function getElement(text) {
  if (Object.keys(elements)[parseInt(text, 10)-1]) return [elements[Object.keys(elements)[parseInt(text, 10)-1]], Object.keys(elements)[parseInt(text, 10)-1]]
  //User entered atomic number  

  text = capitalize(text);
  if (elements[text]) return [elements[text], text]
  //User entered atomic name
  
  for (var i=0; i<Object.keys(elements).length; i++) {
    if (elements[Object.keys(elements)[i]].symbol === text) return [elements[Object.keys(elements)[i]], Object.keys(elements)[i]]
  }
  //User entered atomic symbol
}

function makeElementReadable(element, elementName) {
  return elementName + ': <br>' + JSON.stringify(element).replace(/_/g,' ').replace(/:/g,': ').replace(/{/g,'').replace(/}/g,'').replace(/,/g,'<br>').replace(/"/g,'')
}

function parseText(doNotTrack) {
  var outputValue = '';
  var inputValue = document.getElementById('inputBox').value;

  outputValue = getColorOrWavelength(doNotTrack, inputValue);
  if (formulaToFromText(inputValue)) outputValue = formulaToFromText(inputValue);
  if (getElement(inputValue)) outputValue = makeElementReadable.apply(this,getElement(inputValue));
  
  //If we had no luck with anything
  if (outputValue.indexOf('Color: undefined') !== -1) outputValue = '<iframe src="http://en.wikipedia.org/wiki/' + inputValue + '"></iframe>';
  
  document.getElementById('outputText').innerHTML = outputValue;
}

function increaseValue(amt) {
  var value = document.getElementById('inputBox').value;
  if (parseFloat(value).toString().length == value.toString().length) {
    document.getElementById('inputBox').value = parseFloat(value) + amt;
  }
  getColorOrWavelength(true);
}

function shortenedHex(hex) {
  if (hex) {
    var x = hex.split(''); 
    return x[0]+x[1]+x[3]+x[5];
  } else return false;
}

function enlargedHex(hex) {
  var x = hex.split('');
  return x[0]+x[1]+x[1]+x[2]+x[2]+x[3]+x[3];
}

function getColorOrWavelength(doNotTrack, value) {
  var color, direction, error, frequency, energy;
  var nanometers = 0;
  
  if (value.indexOf('e') == -1 && parseFloat(value) && parseFloat(value).toString().length == value.toString().length) {
    //we have a value in nanometers
    nanometers = value;
    color = getColorFromWaveLength(nanometers);
    frequency = (299792458*1000000000)/nanometers;
    energy = 6.62606957e-34 * frequency;
    direction = "fromNanometers";
  }
  else if (value.indexOf('e') != -1 && (value.indexOf('14') != -1 || value.indexOf('-19') != -1)) {
    //I just evalled unsanitized user input. twice. dealwithit.gif
    //we have a number in sci-notation
    if (eval(value)>1e14 && eval(value)<1e15) {
      //frequency = speed of light/wavelength
      //wavelength = speed of light/frequency
      frequency = eval(value);
      energy = 6.62606957e-34 * frequency;
      direction = "fromFrequency";
    }
    else if (eval(value)>1e-20 && eval(value)<1e-18)  {
      energy = eval(value);
      frequency = energy/6.62606957e-34;
      direction = "fromEnergy"
    }
    nanometers = (299792458*1000000000)/frequency; //speed of light times a big number (to convert from m to nm)
    color = getColorFromWaveLength(nanometers);
  }
  else {
    direction = "fromColor"
    //we have a color
    if (colorNameToHex(value)) {
      //our color is a named color e.x. teal
      color = colorNameToHex(value);
    } else if (value.indexOf('#') != -1) {
      //we have a hex color, which is good
      if (value.length == 4) value = enlargedHex(value);
      color = value;
    }
  
    var step = 10;
    
    for (var i=350*step; i<780*step; i++) {
      if (shortenedHex(getColorFromWaveLength(i/step)) == shortenedHex(color)) nanometers = i/step;
    }
    
    if (nanometers != 0) {
    	frequency = (299792458*1000000000)/nanometers;
    	energy = 6.62606957e-34 * frequency;
    }
  }
  document.getElementById('outputColor').style.backgroundColor = color;

  var returnValue = false;

  if (nanometers != 0) { 
    returnValue = nanometers + " nanometers = "+color+" = "+Math.round(1000*frequency/1e14)/1000 + "e14 inverse seconds = " + Math.round(1000*energy/1e-19)/1000 +"e-19 J";
    error = "none";
  } else {
    returnValue = "Sorry! Your chosen color does not exist as one wavelength of light! Color: "+color; 
    error = "colorNotOneWavelength";
  }
  
  if (!doNotTrack) {
    mixpanel.track('getColorOrWavelength', {'color':color, 'wavelength':nanometers, 'direction': direction, 'error': error})
  }
  
  return returnValue;
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
