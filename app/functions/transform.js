
function addZero(x, n) {

    while (x.toString().length < n) {
        x = '0' + x;
    }
    return x;
}

exports.transform = () => {
    days = new Date();
    console.log(days);

    years = new Date().getFullYear();
    month = new Date().getMonth();
    hours = addZero(days.getHours(), 2);
    mins = addZero(days.getMinutes(), 2);
    seconds = addZero(days.getSeconds(), 2);
    mseconds = addZero(days.getMilliseconds(), 3);



    return (`${years}${month}${days.getDate()}${hours}${mins}${seconds}${mseconds}${parseInt(Math.random() * 10000)}`);



}




exports.getv_code = () => {
   
    const chars ='qwertyuiopasdfghjklzxcvbnmQWRERTYUIOPASDFGHJKLMNBVCXZ@#$%^&*+123456789'

    var v_code =''
    for (let i = 0; i < 8; i++) {
        v_code = v_code + chars[parseInt(Math.random() * chars.length)]
        
        
    }


    return v_code;

}


exports.get_ticket = () => {
   
    const chars ='123456789'

    var v_code =''
    for (let i = 0; i < 8; i++) {
        v_code = v_code + chars[parseInt(Math.random() * chars.length)]
        
        
    }


    return v_code;

}
