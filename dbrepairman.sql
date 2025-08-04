DROP DATABASE IF EXISTS REPAIRMAN;
CREATE DATABASE REPAIRMAN;
USE REPAIRMAN;

-- ============================================
-- TABLA CLIENTE
-- ============================================
CREATE TABLE CLIENTE(
    CLIENTE_ID INT NOT NULL AUTO_INCREMENT,
    FIRST_NAME VARCHAR(50) NOT NULL,
    LAST_NAME VARCHAR(50) NOT NULL,
    EMAIL VARCHAR(100) NOT NULL UNIQUE,       -- evita duplicados
    PHONENUMBER CHAR(10) UNIQUE,              -- único, pero permite NULL
    PASSWORD VARCHAR(60) NOT NULL,            -- almacenar hash
    CREATED_AT TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (CLIENTE_ID)
);

-- TRIGGER: Validar longitud mínima de PASSWORD (>=8) en MySQL 5.7
DELIMITER //
CREATE TRIGGER trg_cliente_password_check
BEFORE INSERT ON CLIENTE
FOR EACH ROW
BEGIN
    IF CHAR_LENGTH(NEW.PASSWORD) < 8 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La contraseña debe tener al menos 8 caracteres';
    END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_cliente_password_update_check
BEFORE UPDATE ON CLIENTE
FOR EACH ROW
BEGIN
    IF CHAR_LENGTH(NEW.PASSWORD) < 8 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La contraseña debe tener al menos 8 caracteres';
    END IF;
END;
//
DELIMITER ;

-- ============================================
-- TABLA REPARACION
-- ============================================
CREATE TABLE REPARACION(
    REPARACION_ID INT NOT NULL AUTO_INCREMENT,
    CLIENTE_ID INT NOT NULL,
    MARCA VARCHAR(50) NOT NULL,
    MODELO VARCHAR(50) NOT NULL,
    PROBLEMA VARCHAR(100) NOT NULL, 
    DESCRIPCION TEXT,
    PRECIO DECIMAL(10,2) NOT NULL,
    CREATED_AT TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (REPARACION_ID),
    FOREIGN KEY (CLIENTE_ID) REFERENCES CLIENTE(CLIENTE_ID) 
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Trigger para validar precio >= 0 en MySQL 5.7
DELIMITER //
CREATE TRIGGER trg_reparacion_precio_check
BEFORE INSERT ON REPARACION
FOR EACH ROW
BEGIN
    IF NEW.PRECIO < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El precio no puede ser negativo';
    END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_reparacion_precio_update_check
BEFORE UPDATE ON REPARACION
FOR EACH ROW
BEGIN
    IF NEW.PRECIO < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El precio no puede ser negativo';
    END IF;
END;
//
DELIMITER ;

-- ============================================
-- TABLA COMPRA
-- ============================================
CREATE TABLE COMPRA(
    COMPRA_ID INT NOT NULL AUTO_INCREMENT,
    CLIENTE_ID INT NOT NULL,
    MARCA VARCHAR(50) NOT NULL,
    MODELO VARCHAR(50) NOT NULL,
    ESTADO_EQUIPO VARCHAR(100) NOT NULL, 
    DESCRIPCION TEXT,
    PRECIO DECIMAL(10,2) NOT NULL,
    CREATED_AT TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (COMPRA_ID),
    FOREIGN KEY (CLIENTE_ID) REFERENCES CLIENTE(CLIENTE_ID) 
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Trigger precio >= 0 para COMPRA
DELIMITER //
CREATE TRIGGER trg_compra_precio_check
BEFORE INSERT ON COMPRA
FOR EACH ROW
BEGIN
    IF NEW.PRECIO < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El precio no puede ser negativo';
    END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_compra_precio_update_check
BEFORE UPDATE ON COMPRA
FOR EACH ROW
BEGIN
    IF NEW.PRECIO < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El precio no puede ser negativo';
    END IF;
END;
//
DELIMITER ;

-- ============================================
-- TABLA VENTA
-- ============================================
CREATE TABLE VENTA(
    VENTA_ID INT NOT NULL AUTO_INCREMENT,
    CLIENTE_ID INT NULL,
    MARCA VARCHAR(50) NOT NULL,
    MODELO VARCHAR(50) NOT NULL,
    ESTADO_EQUIPO VARCHAR(100) NOT NULL, 
    DESCRIPCION TEXT,
    PRECIO DECIMAL(10,2) NOT NULL,
    CREATED_AT TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (VENTA_ID),
    FOREIGN KEY (CLIENTE_ID) REFERENCES CLIENTE(CLIENTE_ID) 
        ON DELETE SET NULL ON UPDATE CASCADE
);

-- Trigger precio >= 0 para VENTA
DELIMITER //
CREATE TRIGGER trg_venta_precio_check
BEFORE INSERT ON VENTA
FOR EACH ROW
BEGIN
    IF NEW.PRECIO < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El precio no puede ser negativo';
    END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_venta_precio_update_check
BEFORE UPDATE ON VENTA
FOR EACH ROW
BEGIN
    IF NEW.PRECIO < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El precio no puede ser negativo';
    END IF;
END;
//
DELIMITER ;

-- ============================================
-- INSERTS DE PRUEBA (SIN CAMBIOS)
-- ============================================
INSERT INTO CLIENTE (FIRST_NAME, LAST_NAME, EMAIL, PHONENUMBER, PASSWORD) VALUES
('Juan', 'Pérez', 'juan.perez@example.com', '5512345678', 'hashpass01'),
('María', 'López', 'maria.lopez@example.com', '5523456789', 'hashpass02'),
('Carlos', 'Ramírez', 'carlos.ramirez@example.com', '5534567890', 'hashpass03'),
('Ana', 'García', 'ana.garcia@example.com', '5545678901', 'hashpass04'),
('Luis', 'Hernández', 'luis.hernandez@example.com', '5556789012', 'hashpass05'),
('Laura', 'Torres', 'laura.torres@example.com', '5567890123', 'hashpass06'),
('Pedro', 'Sánchez', 'pedro.sanchez@example.com', '5578901234', 'hashpass07'),
('Sofía', 'Martínez', 'sofia.martinez@example.com', '5589012345', 'hashpass08'),
('Jorge', 'Castro', 'jorge.castro@example.com', '5590123456', 'hashpass09'),
('Valeria', 'Ríos', 'valeria.rios@example.com', '5511122233', 'hashpass10');

INSERT INTO REPARACION (CLIENTE_ID, MARCA, MODELO, PROBLEMA, DESCRIPCION, PRECIO) VALUES
(1, 'Apple', 'iPhone 12', 'Pantalla rota', 'Pantalla totalmente dañada', 3500.00),
(2, 'Samsung', 'Galaxy S21', 'Batería defectuosa', 'No carga correctamente', 1200.00),
(3, 'Xiaomi', 'Redmi Note 9', 'Altavoz dañado', 'Sonido distorsionado', 800.00),
(4, 'Huawei', 'P30', 'Cámara no funciona', 'Error al abrir aplicación cámara', 1500.00),
(5, 'Motorola', 'G9 Plus', 'Conector de carga', 'Puerto USB suelto', 950.00),
(6, 'Apple', 'iPhone 11', 'Batería hinchada', 'Necesita reemplazo inmediato', 2000.00),
(7, 'Samsung', 'A52', 'Problema de software', 'Se reinicia constantemente', 700.00),
(8, 'LG', 'G8 ThinQ', 'Pantalla táctil fallando', 'No responde en algunas zonas', 1800.00),
(9, 'Sony', 'Xperia 5', 'Micrófono dañado', 'No se escucha en llamadas', 900.00),
(10, 'Apple', 'iPhone SE', 'Cristal trasero roto', 'Requiere reemplazo', 1300.00);

INSERT INTO COMPRA (CLIENTE_ID, MARCA, MODELO, ESTADO_EQUIPO, DESCRIPCION, PRECIO) VALUES
(1, 'Apple', 'iPhone X', 'Usado - Bueno', 'Equipo con leve desgaste', 4000.00),
(2, 'Samsung', 'Galaxy S10', 'Usado - Excelente', 'Funciona perfecto', 3500.00),
(3, 'Huawei', 'Mate 20', 'Usado - Regular', 'Batería desgastada', 2500.00),
(4, 'Xiaomi', 'Mi 10', 'Usado - Excelente', 'Equipo casi nuevo', 4200.00),
(5, 'Motorola', 'Edge', 'Usado - Bueno', 'Ligero rayón en pantalla', 2800.00),
(6, 'Apple', 'iPhone 8', 'Usado - Bueno', 'Funciona bien', 3000.00),
(7, 'Samsung', 'Note 9', 'Usado - Regular', 'Rayones en carcasa', 2600.00),
(8, 'LG', 'V50', 'Usado - Excelente', 'Equipo en gran estado', 3100.00),
(9, 'Sony', 'Xperia XZ2', 'Usado - Bueno', 'Batería al 80%', 2200.00),
(10, 'Apple', 'iPhone 7', 'Usado - Regular', 'Cristal trasero con grietas', 2000.00);

INSERT INTO VENTA (CLIENTE_ID, MARCA, MODELO, ESTADO_EQUIPO, DESCRIPCION, PRECIO) VALUES
(1, 'Apple', 'iPhone 13', 'Nuevo', 'Caja sellada, garantía 1 año', 19000.00),
(2, 'Samsung', 'Galaxy S22', 'Nuevo', 'Garantía de fábrica', 15000.00),
(3, 'Xiaomi', 'Mi 11', 'Nuevo', 'Equipo sellado', 12000.00),
(4, 'Huawei', 'P40', 'Nuevo', 'Caja cerrada', 13000.00),
(5, 'Apple', 'iPhone 12 Mini', 'Reacondicionado', 'Garantía 6 meses', 10000.00),
(6, 'Samsung', 'A72', 'Nuevo', 'Equipo libre', 9500.00),
(7, 'Motorola', 'G100', 'Nuevo', 'Garantía de fábrica', 8500.00),
(8, 'Sony', 'Xperia 1', 'Reacondicionado', 'Garantía 3 meses', 7000.00),
(9, 'Apple', 'iPhone XR', 'Usado - Excelente', 'Batería 90%', 6500.00),
(NULL, 'Apple', 'iPhone 14', 'Nuevo', 'Venta sin cliente registrado', 22000.00);
