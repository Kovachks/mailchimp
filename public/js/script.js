console.log("connected")
$(document).ready(function() {

    // Setting submit click handler in order to send data to the Mailchimp API
    $("#sendApi").click(function() {

        // preventing button default event
        event.preventDefault()

        //Setting info object to be passed to API
        let info = {
            "email_address": $("#email").val(),
            "status": "subscribed",
            "merge_fields":{
                "FNAME": $("#firstName").val(),
                "LNAME": $("#lastName").val()
            }
        }
        
        console.log(info)

        //Initiating get route to send info to API
        $.get("/send", info, function(data) {
            console.log("data: " + data)
        })
    })    
})

