//Returning object to form based on parameter passed
export function getProperty(busObject)
{

    let defaultObject = {
    }

    if(!isEmpty(busObject))
    {
        return busObject;
    }
    else
    {
        return defaultObject;
    }
};

//Returning FormData object for POST api call
export function getFormData(busImage,busDetails)
{
    var formData = new FormData();
    const json = JSON.stringify(busDetails);

    const blob = new Blob([json], {
                type: 'application/json'
              });

            formData.append("busDetails",blob);
            formData.append("busImage",busImage);
            return formData;
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


//Bus Details Validation
export function validateBusDetails(busDetails)
{
    let errors = [];
    var isAirConditioned = busDetails['airConditioner'];
    if(!(isAirConditioned === "true" || isAirConditioned === "false"))
    {
        errors.push("Air Condition value must be either true or false");
    }
    var scheduledDate = Date.parse(busDetails['scheduledDate']);
    if(!scheduledDate)
    {
        errors.push("Date is invalid");
    }
    return errors;
}