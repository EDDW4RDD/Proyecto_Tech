BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Clientes" (
	"idCliente"	INTEGER,
	"nombresCliente"	TEXT NOT NULL,
	"direccion"	TEXT NOT NULL,
	"telefono"	TEXT NOT NULL CHECK(length("telefono") = 10),
	"correo"	TEXT NOT NULL,
	"contrasena"	TEXT NOT NULL,
	"tarjeta"	TEXT NOT NULL CHECK(length("tarjeta") = 16),
	"rfcCliente"	TEXT NOT NULL CHECK(length("rfcCliente") = 13),
	"status"	BOOLEAN NOT NULL,
	PRIMARY KEY("idCliente")
);
CREATE TABLE IF NOT EXISTS "Productos" (
	"idProducto"	INTEGER,
	"nombreProducto"	TEXT NOT NULL,
	"descripcion"	TEXT NOT NULL,
	"stock"	INTEGER NOT NULL,
	"precio"	REAL NOT NULL,
	"status"	BOOLEAN NOT NULL,
	"imagen"	TEXT(100) NOT NULL,
	"marca"	TEXT(100) NOT NULL,
	PRIMARY KEY("idProducto")
);
CREATE TABLE IF NOT EXISTS "Proveedores" (
	"idProveedor"	INTEGER,
	"nombreProveedor"	TEXT NOT NULL,
	"direccion"	TEXT NOT NULL,
	"telefono"	TEXT NOT NULL CHECK(length("telefono") = 10),
	"correo"	TEXT NOT NULL,
	"numeroCuenta"	TEXT NOT NULL CHECK(length("numeroCuenta") <= 20),
	"rfcProveedor"	TEXT NOT NULL CHECK(length("rfcProveedor") = 13),
	"status"	BOOLEAN NOT NULL,
	PRIMARY KEY("idProveedor")
);
CREATE TABLE IF NOT EXISTS "Administradores" (
	"idAdministrador"	INTEGER,
	"nombreAdministrador"	TEXT NOT NULL,
	"telefono"	TEXT NOT NULL CHECK(length("telefono") = 10),
	"correo"	TEXT NOT NULL,
	"contrasena"	TEXT NOT NULL,
	"status"	BOOLEAN NOT NULL,
	PRIMARY KEY("idAdministrador")
);
CREATE TABLE IF NOT EXISTS "Ventas" (
	"idVenta"	INTEGER,
	"cliente"	INTEGER NOT NULL,
	"fechaHora"	TEXT NOT NULL,
	"status"	BOOLEAN NOT NULL,
	FOREIGN KEY("cliente") REFERENCES "Clientes"("idCliente"),
	PRIMARY KEY("idVenta")
);
CREATE TABLE IF NOT EXISTS "DetalleVentas" (
	"venta"	INTEGER NOT NULL,
	"producto"	INTEGER NOT NULL,
	"cantidad"	INTEGER NOT NULL,
	"status"	BOOLEAN NOT NULL,
	FOREIGN KEY("venta") REFERENCES "Ventas"("idVenta"),
	FOREIGN KEY("producto") REFERENCES "Productos"("idProducto"),
	PRIMARY KEY("venta","producto")
);
CREATE TABLE IF NOT EXISTS "Compras" (
	"idCompra"	INTEGER,
	"proveedor"	INTEGER NOT NULL,
	"fechaHora"	TEXT NOT NULL,
	"status"	BOOLEAN NOT NULL,
	FOREIGN KEY("proveedor") REFERENCES "Proveedores"("idProveedor"),
	PRIMARY KEY("idCompra")
);
CREATE TABLE IF NOT EXISTS "DetalleCompras" (
	"compra"	INTEGER NOT NULL,
	"producto"	INTEGER NOT NULL,
	"cantidad"	INTEGER NOT NULL,
	"status"	BOOLEAN NOT NULL,
	FOREIGN KEY("producto") REFERENCES "Productos"("idProducto"),
	FOREIGN KEY("compra") REFERENCES "Compras"("idCompra"),
	PRIMARY KEY("compra","producto")
);
COMMIT;
