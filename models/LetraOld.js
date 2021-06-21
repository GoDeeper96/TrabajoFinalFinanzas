class Letra {
    constructor(id,ownerId,title,imageUrl,description,price,nombre,plazot,tasa,fechaDescuento,gastoInicial,gastoFinal,fechaEmision,retencion,TipoTasa,unidadMonetaria,cantidadMonetaria,valorNominal,tasaDescuento)
    {
        this.id = id; //nosetoca*
        this.ownerId = ownerId; //nosetoca*
        this.title = title; //nosetoca*
        this.imageUrl = imageUrl; //nosetoca*
        this.description = description; //nosetoca*
        this.price = price; //nosetoca*
        this.nombre = nombre; //Nombre referencial*
        this.plazot = plazot; //PLAZO DE TASA
        this.tasa = tasa; //VALOR NUMERICO
        this.fechaDescuento = fechaDescuento;
        this.gastoInicial = gastoInicial;
        this.gastoFinal = gastoFinal;
        this.fechaEmision = fechaEmision;
        this.fechaPago = fechaPago;
        this.retencion = retencion;
        this.TipoTasa = TipoTasa; //STRING 
        this.unidadMonetaria = unidadMonetaria;
        this.cantidadMonetaria = cantidadMonetaria;
        this.valorNominal = valorNominal;
        this.tasaDescuento = tasaDescuento;
    }
}
export default Letra;

