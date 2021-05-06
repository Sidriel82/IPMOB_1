onmessage = function (e) {

  function changeLetterSize(str) {
    var s = '';
    var i = 0;
    while (i < str.length) {
      var n = str.charAt(i);
      if (n == n.toUpperCase()) {
        n = n.toLowerCase();
      } else {
        n = n.toUpperCase();
      }
      i += 1;
      s += n; 
    }
    return s;
  }

  var data = JSON.parse(e.data);
  Object.keys(data).forEach(function (key) { 
    data[key] = changeLetterSize(data[key]);
  })

  self.postMessage(JSON.stringify(data));
};