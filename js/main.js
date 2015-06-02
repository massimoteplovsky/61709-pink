

(function() {

//numeric fields updating

var elements = document.querySelectorAll(".input-numeric");

for (var i = 0; i < elements.length; i++) {

	counter(elements[i]);

	}

	function counter(parent){

		var input = parent.querySelector("input");
		var minus = parent.querySelector(".minus");
		var plus = parent.querySelector(".plus");

		minus.addEventListener("click", function() {

 			changeValue(false);

 		});

 		plus.addEventListener("click", function() {

 			changeValue(true);

 		});

 		function changeValue(operation){

			var fieldValue = Number(input.value);

			if(isNaN(fieldValue)){
				fieldValue = 0;
			}

			if (operation) { 
				minus.classList.remove("disable");
				input.value = fieldValue + 1; 

			} else { 
				if(fieldValue <= 1){
					input.value = 0;
					minus.classList.add("disable");
				} else{
			 		input.value = fieldValue - 1; 
				}


			 }

		}

	}





// form sending

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

 	console.log(xhr.responseText); 

 }

 }); 

 xhr.send(data); 

 });

 

})();