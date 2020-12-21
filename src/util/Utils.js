

export function getProperty(busObject)
{
    if(!isEmpty(busObject))
    {
        return busObject;
    }
    else
    {
        return {};
    }
};

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

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