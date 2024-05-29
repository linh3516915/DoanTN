-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 28, 2024 lúc 07:09 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `doantn_db`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chi_tiet_cau_hinh`
--

CREATE TABLE `chi_tiet_cau_hinh` (
  `id` int(11) NOT NULL,
  `ten_ctch` varchar(255) NOT NULL,
  `san_pham_id` int(11) NOT NULL,
  `cpu` varchar(225) NOT NULL,
  `size_man_hinh` varchar(225) NOT NULL,
  `he_dieu_hanh` varchar(100) NOT NULL,
  `camera` varchar(255) NOT NULL,
  `pin` varchar(50) NOT NULL,
  `sim` varchar(100) NOT NULL,
  `gpu` varchar(100) NOT NULL,
  `toc_do_cpu` varchar(100) NOT NULL,
  `gps` varchar(50) NOT NULL,
  `ngay_ra_mat` date NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chi_tiet_don_hang`
--

CREATE TABLE `chi_tiet_don_hang` (
  `id` int(11) NOT NULL,
  `don_hang_id` int(11) NOT NULL,
  `chi_tiet_san_pham_id` int(11) NOT NULL,
  `so_luong_mua` int(11) NOT NULL,
  `gia` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chi_tiet_nhap_hang`
--

CREATE TABLE `chi_tiet_nhap_hang` (
  `id` int(11) NOT NULL,
  `phieu_nhap_id` int(11) NOT NULL,
  `san_pham_id` int(11) NOT NULL,
  `so_luong` int(11) NOT NULL,
  `thanh_tien` int(11) NOT NULL,
  `gia_nhap` int(11) NOT NULL,
  `gia_ban` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chi_tiet_san_pham`
--

CREATE TABLE `chi_tiet_san_pham` (
  `id` int(11) NOT NULL,
  `ten` varchar(60) NOT NULL,
  `san_pham_id` int(11) NOT NULL,
  `dung_luong_id` int(11) NOT NULL,
  `mau_sac_id` int(11) NOT NULL,
  `ram_id` int(11) NOT NULL,
  `so_luong` int(11) NOT NULL,
  `gia` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `chi_tiet_san_pham`
--

INSERT INTO `chi_tiet_san_pham` (`id`, `ten`, `san_pham_id`, `dung_luong_id`, `mau_sac_id`, `ram_id`, `so_luong`, `gia`, `created_at`, `updated_at`) VALUES
(1, 'iPhone 15 Plus 128GB Xanh lá - Chính hãng VN/A', 10, 1, 1, 1, 30, 22190000, '0000-00-00', '0000-00-00'),
(2, 'iPhone 15 Plus 128GB Đen - Chính hãng VN/A', 10, 1, 2, 1, 30, 22590000, '0000-00-00', '0000-00-00'),
(3, 'iPhone 15 Plus 128GB Xanh dương - Chính hãng VN/A', 10, 1, 3, 1, 30, 22490000, '0000-00-00', '0000-00-00'),
(4, 'iPhone 15 Plus 128GB Hồng - Chính hãng VN/A', 10, 1, 4, 1, 30, 22190000, '0000-00-00', '0000-00-00'),
(5, 'iPhone 15 Plus 128GB Vàng - Chính hãng VN/A', 10, 1, 5, 1, 30, 22590000, '0000-00-00', '0000-00-00'),
(6, 'iPhone 15 Plus 256GB Xanh lá - Chính hãng VN/A', 10, 2, 1, 1, 30, 24390000, '0000-00-00', '0000-00-00'),
(7, 'iPhone 15 Plus 256GB Xanh dương - Chính hãng VN/A', 10, 2, 3, 1, 30, 24590000, '0000-00-00', '0000-00-00'),
(8, 'iPhone 15 Plus 256GB Đen - Chính hãng VN/A', 10, 2, 2, 1, 30, 24590000, '0000-00-00', '0000-00-00'),
(9, 'iPhone 15 Plus 256GB Hồng - Chính hãng VN/A', 10, 2, 4, 1, 30, 24590000, '0000-00-00', '0000-00-00'),
(10, 'iPhone 15 Plus 256GB Vàng - Chính hãng VN/A', 10, 2, 5, 1, 30, 24590000, '0000-00-00', '0000-00-00'),
(11, 'iPhone 15 Plus 512GB Xanh lá - Chính hãng VN/A', 10, 3, 1, 1, 30, 32490000, '0000-00-00', '0000-00-00'),
(12, 'iPhone 15 Plus 512GB Đen - Chính hãng VN/A', 10, 3, 2, 1, 30, 32490000, '0000-00-00', '0000-00-00'),
(13, 'iPhone 15 Plus 512GB Xanh dương - Chính hãng VN/A', 10, 3, 3, 1, 30, 32490000, '0000-00-00', '0000-00-00'),
(14, 'iPhone 15 Plus 512GB Hồng - Chính hãng VN/A', 10, 3, 4, 1, 30, 32490000, '0000-00-00', '0000-00-00'),
(15, 'iPhone 15 Plus 512GB Vàng - Chính hãng VN/A', 10, 3, 5, 1, 30, 32490000, '0000-00-00', '0000-00-00'),
(16, 'iPhone 15 Pro 128GB Titan Trắng - Chính hãng VN/A - MTUX3VN/', 11, 1, 6, 6, 30, 24790000, '0000-00-00', '0000-00-00'),
(17, 'iPhone 15 Pro 128GB Titan Tự nhiên - Chính hãng VN/A - MTUX3', 11, 1, 7, 6, 30, 24990000, '0000-00-00', '0000-00-00'),
(18, 'iPhone 15 Pro 128GB Titan Xanh - Chính hãng VN/A - MTUX3VN/A', 11, 1, 8, 6, 30, 24990000, '0000-00-00', '0000-00-00'),
(19, 'iPhone 15 Pro 128GB Titan Đen - Chính hãng VN/A - MTUX3VN/A', 11, 1, 9, 6, 30, 24990000, '0000-00-00', '0000-00-00'),
(20, 'iPhone 15 Pro 256GB Titan Tự nhiên - Chính hãng VN/A - MTUX3', 11, 2, 7, 6, 30, 27690000, '0000-00-00', '0000-00-00'),
(21, 'iPhone 15 Pro 256GB Titan Trắng - Chính hãng VN/A - MTUX3VN/', 11, 2, 6, 6, 30, 27890000, '0000-00-00', '0000-00-00'),
(22, 'iPhone 15 Pro 256GB Titan Đen - Chính hãng VN/A - MTUX3VN/A', 11, 2, 9, 6, 30, 27890000, '0000-00-00', '0000-00-00'),
(23, 'iPhone 15 Pro 256GB Titan Xanh - Chính hãng VN/A - MTUX3VN/A', 11, 2, 8, 6, 30, 27890000, '0000-00-00', '0000-00-00'),
(24, 'iPhone 15 Pro 512GB Titan Tự nhiên - Chính hãng VN/A - MTUX3', 11, 3, 7, 6, 30, 34690000, '0000-00-00', '0000-00-00'),
(25, 'iPhone 15 Pro 512GB Titan Trắng - Chính hãng VN/A - MTUX3VN/', 11, 3, 6, 6, 30, 34690000, '0000-00-00', '0000-00-00'),
(26, 'iPhone 15 Pro 512GB Titan Đen - Chính hãng VN/A - MTUX3VN/A', 11, 3, 9, 6, 30, 34690000, '0000-00-00', '0000-00-00'),
(27, 'iPhone 15 Pro 512GB Titan Xanh - Chính hãng VN/A - MTUX3VN/A', 11, 3, 8, 6, 30, 34690000, '0000-00-00', '0000-00-00'),
(28, 'iPhone 15 Pro 1TB Titan Tự nhiên - Chính hãng VN/A - MTUX3VN', 11, 4, 7, 6, 30, 39490000, '0000-00-00', '0000-00-00'),
(29, 'iPhone 15 Pro 1TB Titan Đen  - Chính hãng VN/A - MTUX3VN/A', 11, 4, 9, 6, 30, 39490000, '0000-00-00', '0000-00-00'),
(30, 'iPhone 15 Pro 1TB Titan Xanh  - Chính hãng VN/A - MTUX3VN/A', 11, 4, 8, 6, 30, 39490000, '0000-00-00', '0000-00-00'),
(31, 'iPhone 15 Pro 1TB Titan Trắng  - Chính hãng VN/A - MTUX3VN/A', 11, 4, 6, 6, 30, 39490000, '0000-00-00', '0000-00-00'),
(32, 'iPhone 15 128GB Vàng Quốc Tế', 12, 1, 5, 1, 30, 17490000, '0000-00-00', '0000-00-00'),
(33, 'iPhone 15 128GB Đen Quốc Tế', 12, 1, 2, 1, 30, 17499000, '0000-00-00', '0000-00-00'),
(34, 'iPhone 15 128GB Xanh lá Quốc Tế', 12, 1, 1, 1, 30, 17899000, '0000-00-00', '0000-00-00'),
(35, 'iPhone 15 128GB Xanh Quốc Tế', 12, 1, 3, 1, 30, 17899000, '0000-00-00', '0000-00-00'),
(36, 'iPhone 15 128GB Hồng Quốc Tế', 12, 1, 4, 1, 30, 18099000, '0000-00-00', '0000-00-00'),
(37, 'iPhone 15 256GB Vàng Quốc Tế', 12, 2, 5, 1, 30, 23199000, '0000-00-00', '0000-00-00'),
(38, 'iPhone 15 256GB Đen Quốc Tế', 12, 2, 2, 1, 30, 22299000, '0000-00-00', '0000-00-00'),
(39, 'iPhone 15 256GB Hồng Quốc Tế', 12, 2, 4, 1, 30, 22299000, '0000-00-00', '0000-00-00'),
(40, 'iPhone 15 256GB Xanh lá Quốc Tế', 12, 2, 1, 1, 30, 22299000, '0000-00-00', '0000-00-00'),
(41, 'iPhone 15 256GB Xanh Quốc Tế', 12, 2, 3, 1, 30, 22399000, '0000-00-00', '0000-00-00'),
(42, 'iPhone 15 512GB Xanh lá Quốc Tế', 12, 3, 1, 1, 30, 25799000, '0000-00-00', '0000-00-00'),
(43, 'iPhone 15 512GB Đen Quốc Tế', 12, 3, 2, 1, 30, 26999000, '0000-00-00', '0000-00-00'),
(44, 'iPhone 15 512GB Hồng Quốc Tế', 12, 3, 4, 1, 30, 28599000, '0000-00-00', '0000-00-00'),
(45, 'iPhone 15 512GB Xanh Quốc Tế', 12, 3, 3, 1, 30, 28899000, '0000-00-00', '0000-00-00'),
(46, 'iPhone 15 512GB Vàng Quốc Tế', 12, 3, 5, 1, 30, 30599000, '0000-00-00', '0000-00-00'),
(47, 'Điện thoại Samsung Galaxy Z Flip5 5G 8GB/256GB Xanh Mint', 15, 2, 12, 6, 30, 19990000, '0000-00-00', '0000-00-00'),
(48, 'Điện thoại Samsung Galaxy Z Flip5 5G 8GB/256GB Tím nhạt', 15, 2, 10, 6, 30, 19990000, '0000-00-00', '0000-00-00'),
(49, 'Điện thoại Samsung Galaxy Z Flip5 5G 8GB/256GB Kem', 15, 2, 13, 6, 30, 19990000, '0000-00-00', '0000-00-00'),
(50, 'Điện thoại Samsung Galaxy Z Flip5 5G 8GB/256GB Xám', 15, 2, 11, 6, 30, 19990000, '0000-00-00', '0000-00-00'),
(51, 'Điện thoại Samsung Galaxy Z Flip5 5G 8GB/512GB Xanh Mint', 15, 3, 12, 6, 30, 21990000, '0000-00-00', '0000-00-00'),
(52, 'Điện thoại Samsung Galaxy Z Flip5 5G 8GB/512GB Kem', 15, 3, 13, 6, 30, 21990000, '0000-00-00', '0000-00-00'),
(53, 'Điện thoại Samsung Galaxy Z Flip5 5G 8GB/512GB Tím nhạt', 15, 3, 9, 6, 30, 21990000, '0000-00-00', '0000-00-00'),
(54, 'Điện thoại Samsung Galaxy Z Flip5 5G 8GB/512GB Xám', 15, 3, 11, 6, 30, 21990000, '0000-00-00', '0000-00-00'),
(55, 'vivo Y100 8GB/128GB Xanh nhạt', 17, 1, 3, 6, 30, 7290000, '0000-00-00', '0000-00-00'),
(56, 'vivo Y100 8GB/128GB Đen', 17, 1, 2, 6, 30, 7290000, '0000-00-00', '0000-00-00'),
(57, 'vivo Y100 8GB/256GB Xanh nhạt', 17, 2, 3, 6, 30, 7690000, '0000-00-00', '0000-00-00'),
(58, 'vivo Y100 8GB/256GB Đen', 17, 2, 2, 6, 30, 7690000, '0000-00-00', '0000-00-00'),
(59, 'vivo V30E 5G/8GB 256GB Nâu', 18, 2, 14, 6, 30, 9490000, '0000-00-00', '0000-00-00'),
(60, 'vivo V30E 5G/8GB 256GB Trắng', 18, 2, 15, 6, 30, 9490000, '0000-00-00', '0000-00-00'),
(61, 'vivo V30E 5G/12GB 256GB Nâu', 18, 2, 14, 7, 30, 10490000, '0000-00-00', '0000-00-00'),
(62, 'vivo V30E 5G/12GB 256GB Trắng', 18, 2, 15, 7, 30, 10490000, '0000-00-00', '0000-00-00'),
(63, 'Vivo X100 Pro 5G/12GB 256GB Trắng ', 19, 2, 15, 7, 30, 16899000, '0000-00-00', '0000-00-00'),
(64, 'Vivo X100 Pro 5G/12GB 256GB Xanh', 19, 2, 3, 7, 30, 16999000, '0000-00-00', '0000-00-00'),
(65, 'Vivo X100 Pro 5G/12GB 256GB Cam', 19, 2, 16, 7, 30, 17099000, '0000-00-00', '0000-00-00'),
(66, 'Vivo X100 Pro 5G/12GB 256GB Đen', 19, 2, 2, 7, 30, 17099000, '0000-00-00', '0000-00-00'),
(67, 'Vivo X100 Pro 5G/16GB 512GB Đen', 19, 3, 2, 8, 30, 18399000, '0000-00-00', '0000-00-00'),
(68, 'Vivo X100 Pro 5G/16GB 512GB Cam', 19, 3, 16, 8, 30, 18599000, '0000-00-00', '0000-00-00'),
(69, 'Vivo X100 Pro 5G/16GB 512GB Xanh', 19, 3, 3, 8, 30, 18599000, '0000-00-00', '0000-00-00'),
(70, 'Vivo X100 Pro 5G/16GB 512GB Trắng', 19, 3, 15, 8, 30, 18899000, '0000-00-00', '0000-00-00'),
(71, 'Vivo X100 Pro 5G/16GB 1TB Trắng', 19, 4, 15, 8, 30, 19999000, '0000-00-00', '0000-00-00'),
(72, 'Vivo X100 Pro 5G/16GB 1TB Đen', 19, 4, 2, 8, 30, 19999000, '0000-00-00', '0000-00-00'),
(73, 'Vivo X100 Pro 5G/16GB 1TB Xanh', 19, 4, 3, 8, 30, 19999000, '0000-00-00', '0000-00-00'),
(74, 'Vivo X100 Pro 5G/16GB 1TB Cam', 19, 4, 16, 8, 30, 20399000, '0000-00-00', '0000-00-00'),
(75, 'Xiaomi Redmi 13C 6GB 128GB Xanh lá', 20, 1, 1, 1, 30, 3290000, '0000-00-00', '0000-00-00'),
(76, 'Xiaomi Redmi 13C 6GB 128GB Xanh dương', 20, 1, 3, 1, 30, 3290000, '0000-00-00', '0000-00-00'),
(77, 'Xiaomi Redmi 13C 6GB 128GB Đen', 20, 1, 2, 1, 30, 3290000, '0000-00-00', '0000-00-00'),
(78, 'Xiaomi Redmi 13C 4GB 128GB Xanh lá ', 20, 1, 1, 9, 30, 2890000, '0000-00-00', '0000-00-00'),
(79, 'Xiaomi Redmi 13C 4GB 128GB Đen', 20, 1, 2, 9, 30, 2890000, '0000-00-00', '0000-00-00'),
(80, 'Xiaomi Redmi 13C 4GB 128GB Xanh dương', 20, 1, 3, 9, 30, 2890000, '0000-00-00', '0000-00-00'),
(81, ' Samsung Galaxy S24 Ultra 5G 12GB 256GB Xám', 14, 2, 11, 7, 30, 31990000, '0000-00-00', '0000-00-00'),
(82, ' Samsung Galaxy S24 Ultra 5G 12GB 256GB Tím', 14, 2, 10, 7, 30, 31990000, '0000-00-00', '0000-00-00'),
(83, ' Samsung Galaxy S24 Ultra 5G 12GB 256GB Đen', 14, 2, 2, 7, 30, 31990000, '0000-00-00', '0000-00-00'),
(84, ' Samsung Galaxy S24 Ultra 5G 12GB 256GB Vàng', 14, 2, 5, 7, 30, 31990000, '0000-00-00', '0000-00-00'),
(85, 'Samsung Galaxy S24 Ultra 5G 12GB 512GB Xám', 14, 3, 11, 7, 30, 35490000, '0000-00-00', '0000-00-00'),
(86, 'Samsung Galaxy S24 Ultra 5G 12GB 512GB Vàng', 14, 3, 5, 7, 30, 35490000, '0000-00-00', '0000-00-00'),
(87, 'Samsung Galaxy S24 Ultra 5G 12GB 512GB Đen', 14, 3, 2, 7, 30, 35490000, '0000-00-00', '0000-00-00'),
(88, 'Samsung Galaxy S24 Ultra 5G 12GB 512GB Tím', 14, 3, 10, 7, 30, 35490000, '0000-00-00', '0000-00-00'),
(89, 'Samsung Galaxy S24 Ultra 5G 12GB 1TB Xám ', 14, 4, 11, 7, 30, 42490000, '0000-00-00', '0000-00-00'),
(90, 'Samsung Galaxy S24 Ultra 5G 12GB 1TB Vàng', 14, 4, 5, 7, 30, 42490000, '0000-00-00', '0000-00-00'),
(91, 'Samsung Galaxy S24 Ultra 5G 12GB 1TB Đen', 14, 4, 2, 7, 30, 42490000, '0000-00-00', '0000-00-00'),
(92, 'Samsung Galaxy S24 Ultra 5G 12GB 1TB Tím', 14, 4, 10, 7, 30, 42490000, '0000-00-00', '0000-00-00'),
(93, 'Xiaomi 14 Ultra 12GB 256GB Trắng', 21, 2, 15, 7, 30, 21499000, '0000-00-00', '0000-00-00'),
(94, 'Xiaomi 14 Ultra 12GB 256GB Đen', 21, 2, 2, 7, 30, 21599000, '0000-00-00', '0000-00-00'),
(95, 'Xiaomi 14 Ultra 12GB 256GB Xanh', 21, 2, 3, 7, 30, 21599000, '0000-00-00', '0000-00-00'),
(96, 'Xiaomi 14 Ultra 16GB 512GB Đen', 21, 3, 2, 8, 30, 24299000, '0000-00-00', '0000-00-00'),
(97, 'Xiaomi 14 Ultra 16GB 512GB Xanh', 21, 3, 3, 8, 30, 24499000, '0000-00-00', '0000-00-00'),
(98, 'Xiaomi 14 Ultra 16GB 512GB Trắng', 21, 3, 15, 8, 30, 24499000, '0000-00-00', '0000-00-00'),
(99, 'Xiaomi 14 Ultra 16GB 1TB Đen', 21, 4, 2, 8, 30, 25699000, '0000-00-00', '0000-00-00'),
(100, 'Xiaomi 14 Ultra 16GB 1TB Xanh', 21, 4, 3, 8, 30, 26299000, '0000-00-00', '0000-00-00'),
(101, 'Xiaomi 14 Ultra 16GB 1TB Trắng', 21, 4, 15, 8, 30, 26299000, '0000-00-00', '0000-00-00'),
(102, 'Xiaomi Redmi A2 2GB 32GB Xanh lá', 22, 7, 1, 10, 30, 1690000, '0000-00-00', '0000-00-00'),
(103, 'Xiaomi Redmi A2 2GB 32GB Xanh Dương', 22, 7, 3, 10, 30, 1690000, '0000-00-00', '0000-00-00'),
(104, 'Xiaomi Redmi A2 2GB 32GB Đen', 22, 7, 2, 10, 30, 1690000, '0000-00-00', '0000-00-00'),
(105, 'Realme 10 Pro 5G 8GB 256GB Đen Snap 695 5G New 100% Nobox', 23, 2, 2, 6, 30, 4190000, '0000-00-00', '0000-00-00'),
(106, 'Realme 10 Pro 5G 8GB 256GB Xanh Snap 695 5G New 100% Nobox', 23, 2, 3, 6, 30, 4190000, '0000-00-00', '0000-00-00'),
(107, 'Realme 10 Pro 5G 8GB 256GB Vàng Snap 695 5G New 100% Nobox', 23, 2, 5, 6, 30, 4190000, '0000-00-00', '0000-00-00'),
(108, 'Realme GT5 5G 12GB 256GB Bạc Snap 8 Gen 2 New Nobox', 24, 2, 18, 7, 30, 8590000, '0000-00-00', '0000-00-00'),
(109, 'Realme GT5 5G 12GB 256GB Xanh lá Snap 8 Gen 2 New Nobox', 24, 2, 1, 7, 30, 8590000, '0000-00-00', '0000-00-00'),
(110, 'Realme GT Neo5 SE 5G 12GB 256GB Đen Snap 7+ Gen 2 New 100% N', 25, 2, 2, 7, 30, 5690000, '0000-00-00', '0000-00-00'),
(111, 'Realme GT Neo5 SE 5G 12GB 256GB Trắng Snap 7+ Gen 2 New 100%', 25, 2, 15, 7, 30, 5690000, '0000-00-00', '0000-00-00'),
(112, 'Lenovo Legion Y70 8GB 128GB Trắng', 26, 1, 15, 6, 30, 6690000, '0000-00-00', '0000-00-00'),
(113, 'Lenovo Legion Y70 8GB 128GB Đen', 26, 1, 2, 6, 30, 6790000, '0000-00-00', '0000-00-00'),
(114, 'Lenovo Legion Y70 12GB 256GB Trắng', 26, 2, 15, 7, 30, 8290000, '0000-00-00', '0000-00-00'),
(115, 'Lenovo Legion Y70 12GB 256GB Đen', 26, 2, 2, 7, 30, 8290000, '0000-00-00', '0000-00-00'),
(116, 'Lenovo Legion Y90 12GB 256GB Đen', 27, 2, 2, 7, 30, 10990000, '0000-00-00', '0000-00-00'),
(117, 'Lenovo Legion Y90  16GB 256GB  Đen', 27, 2, 2, 8, 30, 12490000, '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `don_hang`
--

CREATE TABLE `don_hang` (
  `id` int(11) NOT NULL,
  `khach_hang_id` int(11) NOT NULL,
  `ngay_dat` varchar(225) NOT NULL,
  `tong_tien` int(11) NOT NULL,
  `trang_thai` varchar(225) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dung_luong`
--

CREATE TABLE `dung_luong` (
  `id` int(11) NOT NULL,
  `kich_thuoc` varchar(225) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `dung_luong`
--

INSERT INTO `dung_luong` (`id`, `kich_thuoc`, `created_at`, `updated_at`) VALUES
(1, '128GB', '0000-00-00', '0000-00-00'),
(2, '256GB', '0000-00-00', '0000-00-00'),
(3, '512GB', '0000-00-00', '0000-00-00'),
(4, '1TB', '0000-00-00', '0000-00-00'),
(7, '32GB', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `gio_hang`
--

CREATE TABLE `gio_hang` (
  `id` int(11) NOT NULL,
  `chi_tiet_san_pham_id` int(11) NOT NULL,
  `khach_hang_id` int(11) NOT NULL,
  `trang_thai` int(225) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hinh_anh`
--

CREATE TABLE `hinh_anh` (
  `id` int(11) NOT NULL,
  `ten_hinh_anh` varchar(225) NOT NULL,
  `san_pham_id` int(11) NOT NULL,
  `chi_tiet_san_pham_id` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khach_hang`
--

CREATE TABLE `khach_hang` (
  `id` int(11) NOT NULL,
  `email` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  `ho_ten` varchar(60) NOT NULL,
  `trang_thai` int(1) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `dien_thoai` varchar(11) NOT NULL,
  `dia_chi` varchar(60) NOT NULL,
  `ngay_sinh` date NOT NULL,
  `hinh_anh` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `mau_sac`
--

CREATE TABLE `mau_sac` (
  `id` int(11) NOT NULL,
  `ten_mau_sac` varchar(225) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `mau_sac`
--

INSERT INTO `mau_sac` (`id`, `ten_mau_sac`, `created_at`, `updated_at`) VALUES
(1, 'Xanh lá', '0000-00-00', '0000-00-00'),
(2, 'Đen', '0000-00-00', '0000-00-00'),
(3, 'Xanh dương', '0000-00-00', '0000-00-00'),
(4, 'Hồng', '0000-00-00', '0000-00-00'),
(5, 'Vàng', '0000-00-00', '0000-00-00'),
(6, 'Titan Trắng', '0000-00-00', '0000-00-00'),
(7, 'Titan Tự nhiên\r\n', '0000-00-00', '0000-00-00'),
(8, 'Titan Xanh', '0000-00-00', '0000-00-00'),
(9, 'Titan Đen', '0000-00-00', '0000-00-00'),
(10, 'Tím', '0000-00-00', '0000-00-00'),
(11, 'Xám', '0000-00-00', '0000-00-00'),
(12, 'Mint', '0000-00-00', '0000-00-00'),
(13, 'Kem', '0000-00-00', '0000-00-00'),
(14, 'Nâu', '0000-00-00', '0000-00-00'),
(15, 'Trắng\r\n', '0000-00-00', '0000-00-00'),
(16, 'cam', '0000-00-00', '0000-00-00'),
(17, 'Titan Xám\r\n', '0000-00-00', '0000-00-00'),
(18, 'Bạc', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nha_cung_cap`
--

CREATE TABLE `nha_cung_cap` (
  `id` int(11) NOT NULL,
  `ten` varchar(50) NOT NULL,
  `dia_chi` varchar(225) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `nha_cung_cap`
--

INSERT INTO `nha_cung_cap` (`id`, `ten`, `dia_chi`, `created_at`, `updated_at`) VALUES
(5, 'Apple', '', '0000-00-00', '0000-00-00'),
(7, 'Samsung', '', '0000-00-00', '0000-00-00'),
(9, 'Vivo', '', '0000-00-00', '0000-00-00'),
(11, 'Xiaomi', '', '0000-00-00', '0000-00-00'),
(13, 'Redmi', '', '0000-00-00', '0000-00-00'),
(15, 'Lenovo', '', '0000-00-00', '0000-00-00'),
(17, 'Huawei', '', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ram`
--

CREATE TABLE `ram` (
  `id` int(11) NOT NULL,
  `loai_ram` varchar(60) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `ram`
--

INSERT INTO `ram` (`id`, `loai_ram`, `created_at`, `updated_at`) VALUES
(1, '6GB', '0000-00-00', '0000-00-00'),
(6, '8GB', '0000-00-00', '0000-00-00'),
(7, '12GB', '0000-00-00', '0000-00-00'),
(8, '16GB', '0000-00-00', '0000-00-00'),
(9, '4GB', '0000-00-00', '0000-00-00'),
(10, '2GB', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `san_pham`
--

CREATE TABLE `san_pham` (
  `id` int(11) NOT NULL,
  `ten` varchar(225) NOT NULL,
  `nha_cung_cap_id` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `san_pham`
--

INSERT INTO `san_pham` (`id`, `ten`, `nha_cung_cap_id`, `created_at`, `updated_at`) VALUES
(10, 'iPhone 15 Plus - Chính hãng VN/A', 5, '0000-00-00', '0000-00-00'),
(11, 'iPhone 15 Pro - Chính hãng VN/A - MTUX3VN/A', 5, '0000-00-00', '0000-00-00'),
(12, 'iPhone 15 128GB Quốc Tế', 5, '0000-00-00', '0000-00-00'),
(13, 'Samsung Galaxy S20+ 5G', 7, '0000-00-00', '0000-00-00'),
(14, 'Samsung Galaxy S24 Ultra 5G', 7, '0000-00-00', '0000-00-00'),
(15, 'Samsung Galaxy Z Flip 5 5G Chính hãng', 7, '0000-00-00', '0000-00-00'),
(17, 'vivo Y100', 9, '0000-00-00', '0000-00-00'),
(18, 'vivo V30E', 9, '0000-00-00', '0000-00-00'),
(19, 'Vivo X100', 9, '0000-00-00', '0000-00-00'),
(20, 'Xiaomi Redmi 13C Chính Hãng', 11, '0000-00-00', '0000-00-00'),
(21, 'Xiaomi 14 Ultra ', 11, '0000-00-00', '0000-00-00'),
(22, 'Xiaomi Redmi A2 Chính Hãng', 11, '0000-00-00', '0000-00-00'),
(23, 'Realme 10 Pro 5G Snap 695 5G New 100% Nobox', 13, '0000-00-00', '0000-00-00'),
(24, 'Realme GT5 5G Snap 8 Gen 2 New Nobox', 13, '0000-00-00', '0000-00-00'),
(25, 'Realme GT Neo5 SE 5G Snap 7+ Gen 2 New 100% Nobox', 13, '0000-00-00', '0000-00-00'),
(26, 'Lenovo Legion Y70  mới fullbox nguyên seal', 15, '0000-00-00', '0000-00-00'),
(27, 'Lenovo Legion Y90 256GB Mới 100% ', 15, '0000-00-00', '0000-00-00'),
(28, 'Lenovo Legion Pro', 15, '0000-00-00', '0000-00-00'),
(29, 'Huawei Pura 70 ', 17, '0000-00-00', '0000-00-00'),
(30, 'Huawei Nova 12', 17, '0000-00-00', '0000-00-00'),
(31, 'Huawei Nova 3', 17, '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Phan Chí Đạt', 'dat0335405877@gmail.com', NULL, '$2y$10$7s3xRP5DxZ7aGRzf4FwZ8.J3NlQJ2p.UWPdYrUjERAAlj1Or07PIi', NULL, '2024-05-26 10:43:50', '2024-05-26 10:43:50');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `chi_tiet_cau_hinh`
--
ALTER TABLE `chi_tiet_cau_hinh`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `chi_tiet_don_hang`
--
ALTER TABLE `chi_tiet_don_hang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ctdh_dh` (`don_hang_id`);

--
-- Chỉ mục cho bảng `chi_tiet_nhap_hang`
--
ALTER TABLE `chi_tiet_nhap_hang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ctpn_nhap` (`phieu_nhap_id`),
  ADD KEY `fk_ctpn_sp` (`san_pham_id`);

--
-- Chỉ mục cho bảng `chi_tiet_san_pham`
--
ALTER TABLE `chi_tiet_san_pham`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ctsp_sp` (`san_pham_id`),
  ADD KEY `fk_dl_sp` (`dung_luong_id`),
  ADD KEY `fk_sp_ms` (`mau_sac_id`),
  ADD KEY `fk_ctsp_ram` (`ram_id`);

--
-- Chỉ mục cho bảng `don_hang`
--
ALTER TABLE `don_hang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_dh_kh` (`khach_hang_id`);

--
-- Chỉ mục cho bảng `dung_luong`
--
ALTER TABLE `dung_luong`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Chỉ mục cho bảng `gio_hang`
--
ALTER TABLE `gio_hang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_gh_ctsp` (`chi_tiet_san_pham_id`);

--
-- Chỉ mục cho bảng `hinh_anh`
--
ALTER TABLE `hinh_anh`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sp_anh` (`san_pham_id`);

--
-- Chỉ mục cho bảng `khach_hang`
--
ALTER TABLE `khach_hang`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `mau_sac`
--
ALTER TABLE `mau_sac`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `nha_cung_cap`
--
ALTER TABLE `nha_cung_cap`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Chỉ mục cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Chỉ mục cho bảng `ram`
--
ALTER TABLE `ram`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sp_ncc` (`nha_cung_cap_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `chi_tiet_cau_hinh`
--
ALTER TABLE `chi_tiet_cau_hinh`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `chi_tiet_don_hang`
--
ALTER TABLE `chi_tiet_don_hang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT cho bảng `chi_tiet_nhap_hang`
--
ALTER TABLE `chi_tiet_nhap_hang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `chi_tiet_san_pham`
--
ALTER TABLE `chi_tiet_san_pham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT cho bảng `don_hang`
--
ALTER TABLE `don_hang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT cho bảng `dung_luong`
--
ALTER TABLE `dung_luong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `gio_hang`
--
ALTER TABLE `gio_hang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT cho bảng `hinh_anh`
--
ALTER TABLE `hinh_anh`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `khach_hang`
--
ALTER TABLE `khach_hang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `mau_sac`
--
ALTER TABLE `mau_sac`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `nha_cung_cap`
--
ALTER TABLE `nha_cung_cap`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `ram`
--
ALTER TABLE `ram`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chi_tiet_don_hang`
--
ALTER TABLE `chi_tiet_don_hang`
  ADD CONSTRAINT `chi_tiet_don_hang_ibfk_1` FOREIGN KEY (`don_hang_id`) REFERENCES `don_hang` (`id`);

--
-- Các ràng buộc cho bảng `chi_tiet_san_pham`
--
ALTER TABLE `chi_tiet_san_pham`
  ADD CONSTRAINT `fk_ctsp_ram` FOREIGN KEY (`ram_id`) REFERENCES `ram` (`id`),
  ADD CONSTRAINT `fk_ctsp_sp` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`id`),
  ADD CONSTRAINT `fk_dl_sp` FOREIGN KEY (`dung_luong_id`) REFERENCES `dung_luong` (`id`),
  ADD CONSTRAINT `fk_sp_ms` FOREIGN KEY (`mau_sac_id`) REFERENCES `mau_sac` (`id`);

--
-- Các ràng buộc cho bảng `don_hang`
--
ALTER TABLE `don_hang`
  ADD CONSTRAINT `don_hang_ibfk_1` FOREIGN KEY (`khach_hang_id`) REFERENCES `khach_hang` (`id`);

--
-- Các ràng buộc cho bảng `hinh_anh`
--
ALTER TABLE `hinh_anh`
  ADD CONSTRAINT `fk_sp_anh` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`id`);

--
-- Các ràng buộc cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  ADD CONSTRAINT `san_pham_ibfk_1` FOREIGN KEY (`nha_cung_cap_id`) REFERENCES `nha_cung_cap` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
