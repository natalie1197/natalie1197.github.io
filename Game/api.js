
let nasaKey = 'q0hdhsb5VNi5MGzCeADwrWwMsZWZRZULgOgbj292'

export async function nasaAPOD() {
    const result = await axios({
        method: 'get',
        url: 'https://api.nasa.gov/planetary/apod',
        
        params: {
            api_key: 'q0hdhsb5VNi5MGzCeADwrWwMsZWZRZULgOgbj292',
            count: 6,
        }
    }).then((result) => {return result.data});
    return result;
} 

export async function quoteApi() {
    const result = await axios({
        method: 'get',
        url: "https://icanhazdadjoke.com/",
        headers: {
            'Accept': 'text/plain'
        }
    }).then((result) => {return result.data});
    return result;
} 

export async function catApi() {
    const result = await axios({
        method: 'get',
        url: 'https://api.thecatapi.com/v1/images/search',
        headers: {
            'x-api-key': '0b7675ef-f27b-4d80-b1ff-7bffa0955a10'
        },
        parameters: {
            limit:1,
        }
    }).then((result) => {return result.data});
    return result;
} 








/*

$(async function() {
    let img =  await nasaAPOD(nasaKey);
    let img1 = img[0].url;
    console.log(img);

   // $('.grid-item').css('background-image', `url(${img})`);  
   


   
   // document.body.style.backgroundImage = `url(${img})`
    //document.body.style.backgroundSize = 'cover'
   




    
}) */