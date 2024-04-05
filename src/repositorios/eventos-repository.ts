

const sql = "SELECT * FROM events";
//const respuesta = await client.query(sql);

//tercera parte de la travesia, aquí se ingresa la query y se obtiene la respuesta en rows
export class EventRepository{
    getAllEvents(name, cat, fecha, tag, pageSize, requestedPage) {
        //aca es donde hay que verificar si name, cat, fecha y tag son undefined o no
        //si son undefined, no se los tiene que pasar a la query

        const query = `select * from events limit ${pageSize} offset ${requestedPage} WHERE IF`;//hay que poner IF exists las variables
        const query1= `select count(*) from events`; //te da la cantidad de eventos 
        //const pizzasInDB = query.execute();

        //const values = client.query(sqlQuery);

        return [query,query1];//const [allEvents, cantidadEvents] en el service
    }

    getEeventName(name)
    {
        
    }
}