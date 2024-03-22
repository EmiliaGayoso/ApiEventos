export class EventService 
{
    getAllEventos(pageSize: number, requestedPage:number, name ?: string, cat ?: string, fecha ?: Date, tag ?: string) //el ?: (segun gemini) es para definir que el parametro es opcional
    {
        const query = `select * from events limit ${pageSize} offset ${requestedPage} WHERE $nombre AND $cat`;//hay que poner IF exists
        const query1= `select count(*) from events`; //te da la cantidad de eventos 
        //const pizzasInDB = query.execute();
      
        throw new Error("Error en el servicio  de eventos");
      
        return {
            collection: query,
            pagination: 
            {
              limit: pageSize, //la cantidad de elementos por pagina
              offset: requestedPage,// la pagina en la que estas
              nextPage: "http://localhost:3000/event?limit=15&offset=1",
              total: query1, // cantidad de elementos
            },
        };

    }


}
