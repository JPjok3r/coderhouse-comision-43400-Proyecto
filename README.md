
# Proyecto CoderHouse Back-End

Este es mi proyecto de Coderhouse del curso de Backend en la comision 43400, mi nombre es Juan Pablo Saavedra


## Descripción

Bueno ustedes ya saben sobre el ¨npm install¨ antes de iniciar, pero nunca está de más un recordatorio.

```
    npm install
```

Dejo un objeto de prueba si quieren tomarlo en cuenta.
```
{
  "title": "PS5",
  "description": "Consola de videojuegos de ultima generacion",
  "code": "wer025",
  "price": 1050,
  "stock": 50,
  "category": "pruebas"
}
```
Para agregar productos, de igual manera con la pruebas que hice estan los archivos creados.

#### Tengo un error, un problemita en el cart lo que es el agregar producto al carrito, intente de todo pero no entiendo porque me crea otro id dentro del objeto que esta de esta manera:
```
[
  {
    product: new ObjectId("64e7a4229dd893fecb4b3f65"),
    quantity: 1,
    _id: new ObjectId("64e7e907b48fc81a61c72b8e") --> este id no entiendo porque lo crea y creo que esta causando problemas, esto es en CartsMongo.js que esta en mongoManagers y usa el model cart.
  },
  {
    product: new ObjectId("64e7a4229dd893fecb4b3f65"),
    quantity: 1,
    _id: new ObjectId("64e7e938b48fc81a61c72b94")
  }
]
```
#### Todo lo demas funciona espero que este bien.
## Autor

- [@JPjok3r](https://github.com/JPjok3r) Juan Pablo Saavedra Alanis

