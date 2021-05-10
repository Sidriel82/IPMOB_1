// onmessage = function (e){
//     const alphabet = "abcdefghijklmnopqrstuvwxyz";
//     const bigAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     const numbertable = "0123456789";

//     var data = JSON.parse(e.data);
//     var colornumber = 0;
//     var i = 0;
//     while (i < data.length){
//         var l = data.charAt(i);
//         if(bigAlphabet.includes(l)){
//             colornumber += bigAlphabet.indexOf(l) + 31;
//         }
//         else if(alphabet.includes(l)){
//             colornumber += alphabet.indexOf(l) + 1;
//         }
//         else if(numbertable.includes(l)){
//             colornumber += numbertable.indexOf(l);
//         }
//         else
//         {
//             colornumber += 0;
//         }
//         i += 1;
//     }

//     var R = colornumber % 255;
//     var G = 255 - (colornumber % 255);
//     var B = (0,5 * R > 125) ? 99 : 199;
//     var RGBtable = [R,G,B]
//     self.postMessage(RGBtable);
// }

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
