SOAP sirve para intercambiar información entre aplicaciones mediante mensajes XML con una estructura fija, en las pruebas pude notar que cada petición y cada respuesta viajan dentro de un sobre (envelope) con su body, así que cualquier cliente que entienda XML y HTTP puede procesarlo, sin importar el lenguaje del servidor.

WSDL es el contrato del servicio: describe las operaciones, los parámetros, los tipos de datos y la dirección donde se publica. Gracias a eso, otra persona o aplicación puede consumir el servicio sin ver mi código, comprobé además que los nombres del WSDL deben coincidir con la implementación, porque node-soap busca las operaciones por nombre.

Consultar un WSDL no es lo mismo que invocar una operación, por lo que primero es un GET con ?wsdl que solo devuelve la descripción del servicio; lo segundo es un POST con un sobre SOAP que ejecuta la operación y devuelve un resultado, como los 77 grados Fahrenheit que obtuve.

Separar las rutas en un Router conviene cuando la aplicación crece: app.js se limita a la configuración general y cada grupo de endpoints se registra en su propio archivo, asi que gregar un tercer servicio solo exigiría registrarlo en soapRoutes.js.

El middleware de registro se justifica porque esa tarea aplica por igual a la consulta de contratos y a todas las operaciones, al repetirla dentro de cada operación duplicaría código, sería fácil olvidarla en alguna y mezclaría el registro con la lógica del servicio. Como middleware lo escribí una vez y quedaron registradas todas mis pruebas.

SOAP con WSDL conviene cuando varios sistemas o instituciones deben integrarse bajo un contrato formal y estricto, por ejemplo entre un banco y sus proveedores, donde importa validar los tipos de datos. Una API REST con JSON es más sencilla para una aplicación web o móvil que solo consulta datos, porque los mensajes son más cortos y no requiere un contrato tan pesado.