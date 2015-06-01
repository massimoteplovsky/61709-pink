(function() {

 if (!("FormData" in window)) { 

 return; 

 } 

 var form = document.querySelector(".page-form"); 

 form.addEventListener("submit", function(event) {

 event.preventDefault();

 var data = new FormData(form); 

 var xhr = new XMLHttpRequest(); 

 xhr.open("post", "http://simonenko.su/academy/echo"); 

 xhr.addEventListener("readystatechange", function() {

 if (xhr.readyState == 4) {

 alert(xhr.responseText); 

 }

 }); 

 xhr.send(data); 

 });

})();