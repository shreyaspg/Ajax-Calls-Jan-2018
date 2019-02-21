

// Search Functionality
$(document).ready(function(){
    $('.search-box input[type="text"]').on("keyup input", function(){
        /* Get input value on change */
        var inputVal = $(this).val();
        console.log(inputVal);
        var resultDropdown = $(this).siblings(".result");
        console.log(resultDropdown);
        if(inputVal.length){
            $.get("script/ajax/backend-search.php", {term: inputVal}).done(function(data){
                // Display the returned data in browser
                resultDropdown.html(data);
            });
        } else{
            resultDropdown.empty();
        }
    });
    
    // Set search input value on click of result item
    $(document).on("click", ".result p", function(){
        $(this).parents(".search-box").find('input[type="text"]').val($(this).text());
        $(this).parent(".result").empty();
    });
});

// function to load details
// function to validate the date consistency
function formSubmitted(){
	var fromDate = document.getElementById("fromDate").value;
	var toDate = document.getElementById("toDate").value;
	if(fromDate>toDate){
		alert("Invalid date");
	}else{
		$.ajax({
	    	type: "get",
 	   		url: "script/ajax/test.php",//'get' call to update db
  	  		data:{returnId:returnId,fromDate:fromDate,toDate:toDate},
  	  		success: function(res){
                var snackBar=document.getElementById("snackbar");
                snackBar.className="show";
                setTimeout(function(){snackBar.className=snackBar.className.replace("show","");},3000);
  	  			console.log("success");
   	       		loadTable();//reload table after db update

   	 		},
			error:function(error){
				console.log(error);
			}
		});
	}
}

// function to load table dynamically
function loadTable(){
	$.ajax({
		type: "get",
    	url: "script/ajax/loadTable2.php",
    	data:{returnId:returnId},
    	success: function(res){
        	$('#replacable2').html(res);
    	},
		error:function(error){
			console.log(error);
		}
	});

	$.ajax({
		type: "get",
    	url: "script/ajax/loadTable.php",
    	data:{returnId:returnId},
    	success: function(res){
        	$('#replacable').html(res);
    	},
		error:function(error){
			console.log(error);
		}
	});
}


// function to load date form dynamically
var returnId="";
function myFunction(currentRow){
    // alert("hello");
    returnId=document.getElementsByClassName("tableid")[currentRow].innerHTML;
    returnStatus=document.getElementsByClassName("tablestatus")[currentRow].innerHTML;
   
   // alert(returnStatus);
    // modifying for form entry
    if(returnStatus=="busy"){
       // alert("This storage is already reserved");
        $('#alertModal').modal();

    }
    $.ajax({
        type: "get",
        url: "script/ajax/form.php",
         data:{returnId:returnId},
        success: function(res){
            // $('#replacable3').modal()
            $('#replacable3').hide().html(res).fadeIn('slow');
            $('#myModal').modal();

            },
        error:function(error){
            console.log(error);
        }
    })
}
// function to load details dynamically
var returnId="";
function loadDetails(currentRow){
    // alert("hello");
	returnId=document.getElementsByClassName("tableid")[currentRow].innerHTML;
	// modifying for form entry
    // alert(returnId);
	$.ajax({
    	type: "get",
    	url: "script/ajax/details.php",
   		 data:{returnId:returnId},
    	success: function(res){
			$('#replacable5').hide().html(res).fadeIn('slow');
			$('#detailsModal').modal();
			
  		},
		error:function(error){
			console.log(error);
		}
	});
}
function freeRes(currentRow){
	returnId=document.getElementsByClassName("tableid2")[currentRow].innerHTML;
	// modifying for form entry
	$.ajax({
    	type: "get",
    	url: "script/ajax/freeRes.php",
   		 data:{returnId:returnId},
    	success: function(res){
            
			window.location.href = "welcome.php";
            alert('The storage is free again!..');
  		},
		error:function(error){
			console.log(error);
		}
	});
}


