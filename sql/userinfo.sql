-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-06-2023 a las 03:23:19
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `form_data`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userinfo`
--

CREATE TABLE `userinfo` (
  `rut` varchar(12) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `alias` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `region` varchar(60) NOT NULL,
  `comuna` varchar(60) NOT NULL,
  `candidato` varchar(60) NOT NULL,
  `formato` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `userinfo`
--

INSERT INTO `userinfo` (`rut`, `nombre`, `alias`, `email`, `region`, `comuna`, `candidato`, `formato`) VALUES
('19574562-5', 'asd', 'asd42', 'asd@hotmail.com', '1ra', '1ra', '1ra', 'wena');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`rut`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
