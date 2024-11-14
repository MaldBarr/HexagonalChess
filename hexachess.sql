-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-11-2024 a las 13:28:22
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hexachess`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `id_Administrador` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id_Administrador`, `email`, `password`, `username`) VALUES
(1, 'csmbcarlos@gmail.com', '0c547ac7a0c126e4753b457f8fa8390b2acdd2d8', 'ADMaldBarr');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lobbies`
--

CREATE TABLE `lobbies` (
  `id_Partida` int(11) NOT NULL,
  `id_player_white` int(11) NOT NULL,
  `id_player_black` int(11) NOT NULL,
  `iniciado` int(11) NOT NULL,
  `resultado` int(11) NOT NULL,
  `elo_white` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lobbies`
--

INSERT INTO `lobbies` (`id_Partida`, `id_player_white`, `id_player_black`, `iniciado`, `resultado`, `elo_white`) VALUES
(2, 1, 0, 1, 1, 1000),
(3, 1, 0, 1, 2, 1000),
(4, 1, 0, 1, 0, 1000),
(5, 1, 0, 1, 0, 1000),
(6, 1, 0, 1, 0, 1000),
(7, 1, 0, 1, 0, 1000),
(8, 1, 0, 1, 0, 1000),
(9, 1, 2, 1, 0, 1000),
(10, 1, 2, 1, 2, 1000),
(11, 1, 2, 1, 0, 1000),
(12, 1, 2, 1, 0, 1960),
(13, 1, 2, 1, 1, 1960),
(14, 2, 1, 1, 1, 1060),
(15, 1, 2, 1, 2, 1960);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `email` varchar(100) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `pais` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `rating` int(11) NOT NULL,
  `username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`email`, `id_usuario`, `pais`, `password`, `rating`, `username`) VALUES
('csmbcarlos@gmail.com', 1, 'Chile', '0c547ac7a0c126e4753b457f8fa8390b2acdd2d8', 1920, 'MaldBarr'),
('csmaldbarr.inf@gmail.com', 2, 'Chile', '0c547ac7a0c126e4753b457f8fa8390b2acdd2d8', 1080, 'MaldBarr2');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id_Administrador`);

--
-- Indices de la tabla `lobbies`
--
ALTER TABLE `lobbies`
  ADD PRIMARY KEY (`id_Partida`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id_Administrador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `lobbies`
--
ALTER TABLE `lobbies`
  MODIFY `id_Partida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
