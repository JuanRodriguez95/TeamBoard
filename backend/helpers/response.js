

export const responseConstructor = (status,mensaje) =>{
    let response = new Response();
    response.status(status);
    response.statusText(mensaje);
    return response;
}