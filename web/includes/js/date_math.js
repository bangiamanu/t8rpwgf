/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function date_math_subtractDates(date1, date2)
{
    return date1.getTime() - date2.getTime();
}

function date_math_addMilliseconds(date1, milliseconds)
{
    return new Date(date1.getTime() + milliseconds);
}

function date_math_addHours(date1, hours)
{
    return date_math_addMilliseconds(date1, hours*60*60*1000);
}


function date_math_addDays(date1, days)
{
    return date_math_addMilliseconds(date1, days*24*60*60*1000);
}

function date_math_getMillisecondsSinceMidnight(date1){
    return date_math_subtractDates(date1, new Date((date1.getMonth() + 1) + "/" + date1.getDate() + "/" + date1.getFullYear()));
}