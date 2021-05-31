onmessage = function (e) {
    function sumLetters(str) {
      var sum = 0;
      for (var i = 0; i < str.length; ++i) {
        sum += str.charCodeAt(i);
      }
      return sum;
    }
    
    var data = JSON.parse(e.data);
    var sum = 0;
    Object.keys(data).forEach(function (key) { 
      sum += sumLetters(data[key]);
    })
    var r = sum % 255;
    const new_data = {
      R: r, 
      G: 255 - (sum % 255),
      B: (0.5 * r > 125) ? 99 : 199
    }
    self.postMessage(JSON.stringify(new_data));
  };
