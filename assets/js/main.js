var imgId = ""
var flipedImg = "";
var count = 0;
var found = 0;

var images = $(".cards").children()
var init_time = "00:00:00"
var time = init_time.split(":")


function init()
{
	$("img").css("visibility", "hidden")
	//$("img").hide()
	$(".cards .holder").on('click', showImage)
	mixup()
	startTimer()
}


function reorderCards(min, max)
{
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function mixup()
{
	var img = $(".cards .holder")

	//console.log(imagenes)
	//console.log(imagen)
	
	var array_image = new Array()
	for (i=0; i<images.length; i++) {
		array_image[i] = $(".holder:nth-child("+(i+1)+")"+" img").attr("src")
	}
	//console.log(array_image)

	for (z=0; z<images.length; z++) {
		randIdx = reorderCards(0, array_image.length - 1)
		$(".holder:nth-child("+(z+1)+")"+" img").attr("src", array_image[randIdx])
		array_image.splice(randIdx, 1)
	}
	//console.log(array_image)
}

function showImage()
{
	id = $(this).attr("id")
	//console.log( $("#"+id+" img").css('visibility') )


	if ( $("#"+id+" img").css('visibility') == 'hidden' ) {

		$(".cards .holder").unbind("click", showImage)
		$("#"+id+" img").css("visibility", 'visible')
		
		if (flipedImg == "") {
			imgId = id
			flipedImg = $("#"+id+" img").attr("src")
			setTimeout(function() {
               $(".cards .holder").on("click", showImage)
            }, 300);
		} else {
			current = $("#"+id+" img").attr("src")
			if (flipedImg != current) {
				setTimeout(function(){
					
					$("#"+id+" img").css("visibility", 'hidden')
					$("#"+imgId+" img").css("visibility", 'hidden')

					imgId = ""
					flipedImg = ""
				}, 400)
			} else {
				$("#"+id+" img").addClass("opacity")
				$("#"+imgId+" img").addClass("opacity")
				found++
				imgId = ""
				flipedImg = ""
			}

			setTimeout(function(){
				$(".cards .holder").on('click', showImage)
			}, 400)
		}
		count++

	}


	if (found == Math.floor(images.length/2)) {
		$(".messageBox").html("<p>You've finished the game within "+count+" movements</p>")
	}

}


function startTimer() 
{
	if (time[2] < 59) { 
		if (time[2] < 9) {
			time[2] = "0" + (parseInt(time[2]) + 1)
		} else {
			time[2] = (parseInt(time[2]) + 1).toString()
		}
	} else { // check if seconds are greater than 59 in order to increase minutes
		time[2] = "00"
		if (time[1] < 59) { // check if minutes are greater than 59 in order to increase hours
			if (time[1] < 9) {
				time[1] = "0" + (parseInt(time[1]) + 1)
			} else {
				time[1] = (parseInt(time[1]) + 1).toString()
			}
		} else { 
			time[1] = "00"
			if (time[0] < 9) {
				time[0] = "0" + (parseInt(time[0]) + 1)
			} else {
				time[0] = (parseInt(time[0]) + 1).toString()
			}
			
		}
		
	}
	

	//console.log(time)
	$("#time").html(time[0] + ":" + time[1] + ":" + time[2]);
	if (found<Math.floor(images.length/2)) {
		setTimeout('startTimer()', 1000);
	}

}
