 //prefixes of implementation that we want to test
 window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

 //prefixes of window.IDB objects
 window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
 window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

 if (!window.indexedDB) {
     window.alert("Brak wsparcia IndexedDB na twoja przegladarke.")
 };

 const employeeData = [{
     id: 1,
     name: "Jan",
     surname: "Kowalski",
     email: "example@wp.pl",
     company: "Exbud",
     city: "Olsztyn",
     postal: "11-130",
     address: "ul. Różana 6a/9",
     phone: "721-721-721",
     
 }];

 var db;
 var request = window.indexedDB.open("newDatabase", 1);

 request.onerror = function (event) {
     console.log("error: ");
 };

 request.onsuccess = function (event) {
     db = request.result;
     console.log("success: ", db);
     loadTable();
 };

 request.onupgradeneeded = function (event) {
     var db = event.target.result;
     var objectStore = db.createObjectStore("employee", {
         keyPath: "id"
     });
     for (var i in employeeData) {
         objectStore.add(employeeData[i]);
     }
 }

 function loadTable() {
     var employees = "";
     $('.employee').remove();

     var objectStore = db.transaction("employee").objectStore("employee");
     objectStore.openCursor().onsuccess = function (event) {
         var cursor = event.target.result;
         if (cursor) {
             employees = employees.concat(
                 '<tr class="employee">' +
                 '<td class="ID">' + cursor.key + '</td>' +
                 '<td class="Imie">' + cursor.value.name + '</td>' +
                 '<td class="Nazwisko">' + cursor.value.surname + '</td>' +
                 '<td class="Email">' + cursor.value.email + '</td>' +
                 '<td class="CompanyName">' + cursor.value.company + '</td>' +
                 '<td class="CityName">' + cursor.value.city + '</td>' +
                 '<td class="PostalNumber">' + cursor.value.postal + '</td>' +
                 '<td class="AddressCity">' + cursor.value.address + '</td>' +
                 '<td class="PhoneNumber">' + cursor.value.phone + '</td>' +
                 '<td><button class="tableFilds" style="background-color:red;" onClick="deleteEmployee(\'' + cursor.key +'\')">X</button>' +
                 '<td><button class="tableFilds" style="background-color:yellow;" onClick="editEmployee(\'' + cursor.key +'\')">-></button>' +
                 '<td class="checkUser"><input type="checkbox" class ="users" id="userID" value="' + cursor.key +'"></td>' +
                 '</tr>');
         } else {
             $('thead').after(employees); // no more events
         }
         cursor.continue();
     };
 }

 function addEmployee() {
     var employeeID = parseInt($('#add_id').val());
     var name = $('#add_name').val();
     var surname = $('#add_surname').val();
     var email = $('#add_email').val();
     var company = $('#add_company').val();
     var city = $('#add_city').val();
     var postal = $('#add_postal').val();
     var address = $('#add_address').val();
     var phone = $('#add_phone').val();
     // console.log(picture);
     
     var request = db.transaction(["employee"], "readwrite")
         .objectStore("employee")
         .add({
             id: employeeID,
             name: name,
             surname: surname,
             email: email,
             company: company,
             city: city,
             postal: postal,
             address: address,
             phone: phone,
         });
     request.onsuccess = function (event) {
         loadTable();
         clearButtons();
     };
 }

 function deleteEmployee(x) {
     var employeeID = parseInt(x);
     var request = db.transaction(["employee"], "readwrite")
         .objectStore("employee")
         .delete(employeeID);

     request.onsuccess = function (event) {
         loadTable();
         clearButtons();
     };
 };

 function clearButtons() {
     $('#add_id').val("");
     $('#add_name').val("");
     $('#add_surname').val("");
     $('#add_email').val("");
     $('#add_company').val("");
     $('#add_city').val("");
     $('#add_postal').val("");
     $('#add_address').val("");
     $('#add_phone').val("");
 };

 const alphabet = "abcdefghijklmnopqrstuvwxyz";
 const bigAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

 function randomText(textArray) {
     var randomIndex = Math.floor(Math.random() * textArray.length);
     var randomElement = textArray[randomIndex];
     return randomElement;
 }

 function generateRandomAddress() {
     var street = ['ul. Olsztyńska', 'ul. Zamkowa', 'ul. Klasztorna', 'ul. Kosucińskiego', 'ul. Piotrkowska',
         'ul. 1-go Maja'
     ];
     var house = Math.floor(Math.random() * 99) + 1 + alphabet[Math.floor(Math.random() * alphabet.length)] +
         '/' + Math.floor(Math.random() * 9) + 1;
     return randomText(street) + " " + house.toString();
 }

 function generateData() {
     var IDnumber = parseInt(document.querySelector(".employee:nth-last-child(1) td").innerHTML);
     IDnumber += 1;
     document.getElementById("add_id").value = IDnumber
     document.getElementById("add_name").value = randomText(["Artur", "Tomasz", "Filip", "Ferdek", "Wacek", "Jack", "Halina", "Grazyna"]);
     document.getElementById("add_surname").value = randomText(["Malko", "Finlandzki", "Krupinski", "Stok", "Daniels", "Martini", "Beherov", "Bols"]);
     document.getElementById("add_email").value = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5) + '@gmail.com';
     document.getElementById("add_company").value = randomText(['Mrówka', 'Żabka', 'Biedronka', 'Lidl','Auchan','Dino', 'BP', 'Lewiatan']);
     document.getElementById("add_city").value = randomText(['Olsztyn', 'Dobre Miasto', 'Wrocław', 'Zgierz','Pabianice', 'Gdynia', 'Sopot']);
     document.getElementById("add_postal").value = Math.floor((Math.random() * 89) + 10).toString() + '-' +Math.floor((Math.random() * 899) + 100).toString();
     document.getElementById("add_address").value = generateRandomAddress();
     document.getElementById("add_phone").value = Math.floor(Math.random() * 899 + 100).toString() + '-' +Math.floor(Math.random() * 899 + 100).toString() + '-' + Math.floor(Math.random() * 899 + 100).toString();
 }

 function editEmployee(x) {
     var employeeID = parseInt(x);
     var request = db.transaction(["employee"], "readwrite").objectStore("employee").delete(employeeID);

     var name = $('#add_name').val();
     var surname = $('#add_surname').val();
     var email = $('#add_email').val();
     var company = $('#add_company').val();
     var city = $('#add_city').val();
     var postal = $('#add_postal').val();
     var address = $('#add_address').val();
     var phone = $('#add_phone').val();

     var request = db.transaction(["employee"], "readwrite").objectStore("employee").add({
                 id: employeeID,
                 name: name,
                 surname: surname,
                 email: email,
                 company: company,
                 city: city,
                 postal: postal,
                 address: address,
                 phone: phone,
             });
     request.onsuccess = function (event) {
         loadTable();
         clearButtons();
     };
 };
 
 document.querySelector("#search").addEventListener('input', function() {
     // console.log(document.querySelector("#search").value);
     var employees = "";
     $('.employee').remove();
     var objectStore = db.transaction("employee").objectStore("employee");
     objectStore.openCursor().onsuccess = function (event) {
         var cursor = event.target.result;
         if (cursor) {
             if ((cursor.value.name.toLowerCase() +
                     cursor.value.surname.toLowerCase() +
                     cursor.value.email.toString() +
                     cursor.value.company.toLowerCase() +
                     cursor.value.city.toString() +
                     cursor.value.postal.toLowerCase() +
                     cursor.value.address.toLowerCase() +
                     cursor.value.phone.toLowerCase()).includes($('#search').val().toLowerCase().replace(
                     / /g,
                     ''))) {
                 employees = employees.concat(
                     '<tr class="employee">' +
                     '<td class="ID">' + cursor.key + '</td>' +
                     '<td class="Imie">' + cursor.value.name + '</td>' +
                     '<td class="Nazwisko">' + cursor.value.surname + '</td>' +
                     '<td class="Email">' + cursor.value.email + '</td>' +
                     '<td class="CompanyName">' + cursor.value.company + '</td>' +
                     '<td class="CityName">' + cursor.value.city + '</td>' +
                     '<td class="PostalNumber">' + cursor.value.postal + '</td>' +
                     '<td class="AddressCity">' + cursor.value.address + '</td>' +
                     '<td class="PhoneNumber">' + cursor.value.phone + '</td>' +
                     '<td><button class="tableFilds" style="background-color:red;" onClick="deleteEmployee(\'' + cursor.key + '\')">X</button>' +
                     '<td><button class="tableFilds" style="background-color:yellow;" onClick="editEmployee(\'' + cursor.key +'\')">-></button>' +
                         '<td class="checkUser"><input type="checkbox" class ="users" id="userID" value="' + cursor.key +'"></td>' +
                     '</tr>');
             }
         } else {
             $('thead').after(employees); // no more events
         }
         cursor.continue();
     };     
 });


 function invoice(){
     let items = Array.from(document.querySelectorAll(`.items`)); 
     let pickItems="";
     items.forEach(function(item){
         if(item.checked){
             pickItems += `${item.value}; `;
         }
     });
     console.log(pickItems);

     let users = Array.from(document.querySelectorAll(`.employee`));
     let imie = "";
     let nazwisko = "";
     let email = "";
     let firma = "";
     let miasto = "";
     let pocztowa = "";
     let adres = "";
     let telefonu = "";
     users.forEach(function(user){
         if(user.querySelector(".checkUser #userID").checked){
            imie += `Imie: ${user.querySelector(`.Imie`).innerText}`;
            nazwisko += `Nazwisko: ${user.querySelector(`.Nazwisko`).innerText}`;
            email += `Email: ${user.querySelector(`.Email`).innerText}`;
            firma += `Nazwa firmy: ${user.querySelector(`.CompanyName`).innerText}`;
            miasto += `Miasto: ${user.querySelector(`.CityName`).innerText}`;
            pocztowa += `Kod pocztowy: ${user.querySelector(`.PostalNumber`).innerText}`;
            adres += `Adres: ${user.querySelector(`.AddressCity`).innerText}`;
            telefonu += `Numer telefonu: ${user.querySelector(`.PhoneNumber`).innerText}`;
         }});

    var opened = window.open("");
    opened.document.write(`<html><head><title>Nowa strona HTML</title><body> <div>Kjupiono: ${pickItems}</div><br>
     <div>${imie}</div><br>
     <div>${nazwisko}</div><br>
     <div>${email}</div><br>
     <div>${firma}</div><br>
     <div>${miasto}</div><br>
     <div>${pocztowa}</div><br>
     <div>${adres}</div><br>
     <div>${telefonu}</div><br></body></head></html>`);
     document.close();
 }
