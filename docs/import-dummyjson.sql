-- ============================================================
-- 🚀 IMPORT TOÀN BỘ DỮ LIỆU VÀO DUYBAO DATABASE
-- Database: bookstore (MySQL)
-- Ngày: 24/06/2026
-- Bao gồm: Users + Categories (Blog) + Posts + Gaming Gear (12 SP) + DummyJSON (38 SP)
-- Cách dùng: Chạy file này SAU KHI đã migrate database (dotnet ef database update)
-- ============================================================

-- ⚠️ XÓA DỮ LIỆU CŨ TRƯỚC KHI IMPORT (nếu có)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `Reviews`;
TRUNCATE TABLE `OrderDetails`;
TRUNCATE TABLE `Orders`;
TRUNCATE TABLE `Products`;
TRUNCATE TABLE `CategoriesProducts`;
TRUNCATE TABLE `Posts`;
TRUNCATE TABLE `Categories`;
TRUNCATE TABLE `Users`;
TRUNCATE TABLE `Customers`;
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- BƯỚC 0: Users (tài khoản đăng nhập)
-- ============================================================
INSERT INTO `Users` (`Id`, `Username`, `PasswordHash`, `FullName`, `Role`) VALUES
(1, 'admin', '123456', 'Quản trị viên hệ thống', 'Admin'),
(2, 'thai_gv', 'thai1969', 'Nguyễn Cao Thái', 'Editor'),
(3, 'sv_01', 'student1', 'Nguyễn Văn A', 'User'),
(4, 'sv_02', 'student2', 'Trần Thị B', 'User'),
(5, 'moderator', 'mod789', 'Lê Văn C', 'Moderator');

-- ============================================================
-- BƯỚC 1: Blog Categories
-- ============================================================
INSERT INTO `Categories` (`Id`, `Name`, `Description`) VALUES
(1, 'Gaming Gear', 'Tin tức, review về gaming gear mới nhất'),
(2, 'Hướng dẫn & Thủ thuật', 'Hướng dẫn cài đặt, tối ưu thiết bị gaming'),
(3, 'Sự kiện & Khuyến mãi', 'Thông tin sự kiện và ưu đãi gaming gear'),
(4, 'Esports', 'Tin tức về thể thao điện tử, giải đấu'),
(5, 'Lập trình & Công nghệ', 'Tài liệu ASP.NET Core và công nghệ web');

-- ============================================================
-- BƯỚC 2: Blog Posts
-- ============================================================
INSERT INTO `Posts` (`Id`, `Title`, `Content`, `ImageUrl`, `CategoryId`, `CreatedDate`) VALUES
(1, 'Top 5 chuột gaming không dây tốt nhất 2026', 'Khám phá những mẫu chuột gaming không dây với hiệu năng đỉnh cao.', 'https://placehold.co/600x350/1a1a2e/fff?text=Gaming+Mouse', 1, '2026-06-10'),
(2, 'Cách chọn bàn phím cơ phù hợp cho game thủ', 'Hướng dẫn chọn switch, layout, kích thước bàn phím cơ.', 'https://placehold.co/600x350/16213e/fff?text=Mechanical+Keyboard', 2, '2026-06-08'),
(3, 'HyperX Cloud III - Review chi tiết sau 1 tháng sử dụng', 'Đánh giá toàn diện tai nghe HyperX Cloud III mới nhất.', 'https://placehold.co/600x350/0f3460/fff?text=HyperX+Cloud+III', 1, '2026-06-05'),
(4, 'So sánh Logitech G Pro X Superlight vs Razer DeathAdder V3', 'Hai đối thủ nặng ký trong làng chuột gaming không dây.', 'https://placehold.co/600x350/533483/fff?text=Mouse+Comparison', 1, '2026-06-03'),
(5, 'LMHT: CKTG 2026 sẽ tổ chức tại Hà Nội', 'Tin vui cho fan LMHT Việt Nam - Chung Kết Thế Giới 2026 chính thức được tổ chức tại Hà Nội.', 'https://placehold.co/600x350/e94560/fff?text=CKTG+2026', 4, '2026-06-01');

-- ============================================================
-- BƯỚC 3: CategoryProduct — Gaming Gear (4 danh mục gốc)
-- ============================================================
INSERT INTO `CategoriesProducts` (`Id`, `Name`, `Description`) VALUES
(1, 'Chuột Gaming', 'Chuột chuyên dụng cho game thủ'),
(2, 'Bàn phím Gaming', 'Bàn phím cơ, switch cao cấp'),
(3, 'Tai nghe Gaming', 'Tai nghe surround, micro chống ồn'),
(4, 'Lót chuột Gaming', 'Lót chuột kích thước lớn, bề mặt tối ưu');

-- ============================================================
-- BƯỚC 4: Products — Gaming Gear (12 sản phẩm)
-- ============================================================
INSERT INTO `Products` (`Id`, `Name`, `Description`, `Price`, `DiscountPercentage`, `Rating`, `StockQuantity`, `ImageUrl`, `Images`, `Brand`, `Sku`, `CategoryProductId`) VALUES
-- ── Chuột Gaming (1) ──
(1, 'Logitech G Pro X Superlight', 'Chuột gaming không dây siêu nhẹ 63g, cảm biến HERO 25K, pin 70 giờ.', 3290000, 12, 4.8, 25, 'https://resource.logitechg.com/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-black-gallery-1.png', NULL, 'Logitech', 'LOG-GPX-001', 1),
(2, 'Razer DeathAdder V3', 'Chuột gaming công thái học 59g, cảm biến Focus Pro 30K, switch quang học thế hệ 3.', 2190000, 5, 4.6, 30, 'https://assets2.razerzone.com/images/pnx.assets/57c7af3e20e8a7b27b5a0e3a21e6a2b2/razer-deathadder-v3.png', NULL, 'Razer', 'RAZ-DAV3-002', 1),
(3, 'Corsair Scimitar RGB Elite', 'Chuột MMO 17 nút lập trình, cảm biến 18.000 DPI, Key Slider điều chỉnh bàn phím số.', 1890000, 0, 4.3, 15, 'https://www.corsair.com/medias/sys_master/images/images/hf7/h6f/9540533280798/-CH-9304211-NA-Gallery-SCIMITAR-RGB-ELITE-01.png', NULL, 'Corsair', 'COR-SCI-003', 1),
-- ── Bàn phím Gaming (2) ──
(4, 'Corsair K70 RGB PRO', 'Bàn phím cơ Cherry MX, switch PBT doubleshot, RGB per-key, khung nhôm.', 3490000, 10, 4.7, 20, 'https://www.corsair.com/medias/sys_master/images/images/h9b/hcd/9540513792030/-CH-9109412-NA-Gallery-K70-RGB-PRO-01.png', NULL, 'Corsair', 'COR-K70-004', 2),
(5, 'Razer Huntsman V3 Pro', 'Bàn phím cơ switch Analog quang học, Rapid Trigger, phím PBT doubleshot.', 4890000, 8, 4.5, 10, 'https://assets2.razerzone.com/images/pnx.assets/ea2e2da7b6a4e08f8e6a1c2e3d4f5b6c/razer-huntsman-v3-pro.png', NULL, 'Razer', 'RAZ-HV3-005', 2),
(6, 'Logitech G915 TKL', 'Bàn phím cơ không dây low-profile, switch GL Tactile, RGB Lightsync.', 4290000, 15, 4.4, 12, 'https://resource.logitechg.com/d_transparent.gif/content/dam/gaming/en/products/g915-tkl/g915-tkl-gallery-1.png', NULL, 'Logitech', 'LOG-G915-006', 2),
-- ── Tai nghe Gaming (3) ──
(7, 'HyperX Cloud II Wireless', 'Tai nghe không dây 7.1 surround, pin 30 giờ, micro chống ồn, driver 53mm.', 2690000, 20, 4.9, 35, 'https://media.kingston.com/hyperx/cloud/hhsc1x-ba-xxl/cloud-ii-wireless-gallery-1.jpg', NULL, 'HyperX', 'HYX-CC2-007', 3),
(8, 'SteelSeries Arctis Nova 7', 'Tai nghe không dây 360° Spatial Audio, Bluetooth + 2.4GHz, pin 38 giờ.', 3190000, 10, 4.7, 18, 'https://media.steelseriescdn.com/thumbs/catalog/items/61486/7a3f3b3b3b3b3b3b3b3b3b3b3b3b3b3b/61486_Arctis_Nova_7_Black_1.png', NULL, 'SteelSeries', 'SS-AN7-008', 3),
(9, 'Razer BlackShark V2 Pro', 'Tai nghe không dây eSports, driver TriForce 50mm, microphone HyperClear Super Wideband.', 3890000, 7, 4.6, 22, 'https://assets2.razerzone.com/images/pnx.assets/5c6b7d8e9f0a1b2c3d4e5f6a7b8c9d0e/razer-blackshark-v2-pro.png', NULL, 'Razer', 'RAZ-BSV2-009', 3),
-- ── Lót chuột Gaming (4) ──
(10, 'SteelSeries QcK Heavy XXL', 'Lót chuột kích thước lớn 900x400mm, bề mặt vải micro-woven, đế cao su chống trượt.', 690000, 0, 4.8, 40, 'https://media.steelseriescdn.com/thumbs/catalog/items/63824/63824_QcK_Heavy_XXL_1.png', NULL, 'SteelSeries', 'SS-QCK-010', 4),
(11, 'Razer Gigantus V2 XXL', 'Lót chuột 940x410mm, bề mặt sợi dệt siêu mịn, tối ưu tracking cho mọi cảm biến.', 590000, 5, 4.5, 35, 'https://assets2.razerzone.com/images/pnx.assets/d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9/razer-gigantus-v2-xxl.png', NULL, 'Razer', 'RAZ-GIG-011', 4),
(12, 'Logitech G840 XL', 'Lót chuột 900x400mm, bề mặt tối ưu cho game thủ, tương thích Logitech G Powerplay.', 790000, 10, 4.3, 20, 'https://resource.logitechg.com/d_transparent.gif/content/dam/gaming/en/products/g840-xl/g840-xl-gallery-1.png', NULL, 'Logitech', 'LOG-G840-012', 4);

-- ============================================================
-- BƯỚC 5: Reviews — Gaming Gear
-- ============================================================
INSERT INTO `Reviews` (`Id`, `ProductId`, `Rating`, `Comment`, `ReviewerName`, `CreatedDate`) VALUES
(1, 1, 5, 'Chuột quá nhẹ, cảm giác cầm cực tốt!', 'GamerPro99', '2026-06-15'),
(2, 1, 4, 'Pin trâu, không dây nhưng không lag.', 'TechReviewer', '2026-06-18'),
(3, 4, 5, 'Switch Cherry êm, build chắc tay!', 'KeyboardFan', '2026-06-10'),
(4, 7, 5, 'Âm thanh surround cực hay, đeo lâu không đau tai.', 'SoundMaster', '2026-06-12'),
(5, 10, 5, 'Lót chuột to, bề mặt mịn, rê chuột không bị cấn.', 'MousePadKing', '2026-06-20');

-- ============================================================
-- BƯỚC 6: CategoryProduct — DummyJSON (thêm 4 danh mục công nghệ)
-- ============================================================
INSERT INTO `CategoriesProducts` (`Id`, `Name`, `Description`) VALUES
(5, 'Laptop', 'Laptop gaming & văn phòng'),
(6, 'Phụ kiện công nghệ', 'Tai nghe, sạc, chuột, bàn phím'),
(7, 'Điện thoại', 'Smartphone các hãng'),
(8, 'Tablet', 'Máy tính bảng');

-- ============================================================
-- BƯỚC 7: Products — LAPTOPS (5 sp) → CategoryProductId = 5
-- ============================================================
INSERT INTO `Products` (`Id`, `Name`, `Description`, `Price`, `DiscountPercentage`, `Rating`, `StockQuantity`, `ImageUrl`, `Images`, `Brand`, `Sku`, `CategoryProductId`) VALUES
(13, 'Apple MacBook Pro 14 Inch Space Grey', 'The MacBook Pro 14 Inch in Space Grey is a powerful and sleek laptop, featuring Apple''s M1 Pro chip for exceptional performance and a stunning Retina display.', 39999000, 4.69, 3.65, 24, 'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp","https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/2.webp","https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/3.webp"]', 'Apple', 'LAP-APP-MBP14', 5),
(14, 'Asus Zenbook Pro Dual Screen Laptop', 'The Asus Zenbook Pro Dual Screen Laptop is a high-performance device with dual screens, providing productivity and versatility for creative professionals.', 35999000, 11.14, 3.95, 45, 'https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/1.webp","https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/2.webp","https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/3.webp"]', 'Asus', 'LAP-ASU-ZEN', 5),
(15, 'Huawei Matebook X Pro', 'The Huawei Matebook X Pro is a slim and stylish laptop with a high-resolution touchscreen display, offering a premium experience for users on the go.', 27999000, 9.38, 4.98, 75, 'https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/1.webp","https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/2.webp","https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/3.webp"]', 'Huawei', 'LAP-HUA-MAT', 5),
(16, 'Lenovo Yoga 920', 'The Lenovo Yoga 920 is a 2-in-1 convertible laptop with a flexible hinge, allowing you to use it as a laptop or tablet, offering versatility and portability.', 21999000, 6.55, 2.86, 40, 'https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/1.webp","https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/2.webp","https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/3.webp"]', 'Lenovo', 'LAP-LEN-YOGA', 5),
(17, 'New DELL XPS 13 9300 Laptop', 'The New DELL XPS 13 9300 Laptop is a compact and powerful device, featuring a virtually borderless InfinityEdge display and high-end performance for various tasks.', 29999000, 11.89, 2.67, 74, 'https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/1.webp","https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/2.webp","https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/3.webp"]', 'Dell', 'LAP-DEL-XPS13', 5);

-- ============================================================
-- BƯỚC 8: Products — PHỤ KIỆN CÔNG NGHỆ (14 sp) → CategoryProductId = 6
-- ============================================================
INSERT INTO `Products` (`Id`, `Name`, `Description`, `Price`, `DiscountPercentage`, `Rating`, `StockQuantity`, `ImageUrl`, `Images`, `Brand`, `Sku`, `CategoryProductId`) VALUES
(18, 'Apple AirPods', 'The Apple Airpods offer a seamless wireless audio experience. With easy pairing, high-quality sound, and Siri integration, they are perfect for on-the-go listening.', 2599000, 15.54, 4.15, 67, 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/1.webp","https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/2.webp","https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/3.webp"]', 'Apple', 'ACC-APP-AIR', 6),
(19, 'Apple AirPods Max Silver', 'The Apple AirPods Max in Silver are premium over-ear headphones with high-fidelity audio, adaptive EQ, and active noise cancellation. Experience immersive sound in style.', 10999000, 13.67, 3.47, 59, 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp"]', 'Apple', 'ACC-APP-APM', 6),
(20, 'Beats Flex Wireless Earphones', 'The Beats Flex Wireless Earphones offer a comfortable and versatile audio experience. With magnetic earbuds and up to 12 hours of battery life, they are ideal for everyday use.', 999000, 5.73, 4.24, 50, 'https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/1.webp"]', 'Beats', 'ACC-BEA-FLX', 6),
(21, 'Apple HomePod Mini Cosmic Grey', 'The Apple HomePod Mini in Cosmic Grey is a compact smart speaker that delivers impressive audio and integrates seamlessly with the Apple ecosystem for a smart home experience.', 1999000, 18.10, 4.62, 27, 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-homepod-mini-cosmic-grey/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/mobile-accessories/apple-homepod-mini-cosmic-grey/1.webp"]', 'Apple', 'ACC-APP-HPM', 6),
(22, 'Amazon Echo Plus', 'The Amazon Echo Plus is a smart speaker with built-in Alexa voice control. It features premium sound quality and serves as a hub for controlling smart home devices.', 1999000, 12.07, 4.99, 61, 'https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/1.webp","https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/2.webp"]', 'Amazon', 'ACC-AMZ-ECHO', 6),
(23, 'Apple Airpower Wireless Charger', 'The Apple AirPower Wireless Charger provides a convenient way to charge your compatible Apple devices wirelessly. Simply place your devices on the charging mat for effortless charging.', 1599000, 4.48, 3.68, 1, 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/1.webp"]', 'Apple', 'ACC-APP-AWP', 6),
(24, 'Apple iPhone Charger', 'The Apple iPhone Charger is a high-quality charger designed for fast and efficient charging of your iPhone. Ensure your device stays powered up and ready to go.', 399000, 18.52, 4.15, 31, 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/1.webp","https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/2.webp"]', 'Apple', 'ACC-APP-CHG', 6),
(25, 'Apple MagSafe Battery Pack', 'The Apple MagSafe Battery Pack is a portable and convenient way to add extra battery life to your MagSafe-compatible iPhone. Attach it magnetically for a secure connection.', 1999000, 17.17, 3.62, 1, 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/1.webp","https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/2.webp"]', 'Apple', 'ACC-APP-MAG', 6),
(26, 'Apple Watch Series 4 Gold', 'The Apple Watch Series 4 in Gold is a stylish and advanced smartwatch with features like heart rate monitoring, fitness tracking, and a beautiful Retina display.', 6999000, 12.02, 2.74, 33, 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/1.webp","https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/2.webp","https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/3.webp"]', 'Apple', 'ACC-APP-AW4', 6),
(27, 'iPhone 12 Silicone Case with MagSafe Plum', 'The iPhone 12 Silicone Case with MagSafe in Plum is a stylish and protective case designed for the iPhone 12. It features MagSafe technology for easy attachment of accessories.', 599000, 13.85, 3.62, 69, 'https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/1.webp","https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/2.webp","https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/3.webp","https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/4.webp"]', 'Apple', 'ACC-APP-IP12C', 6),
(28, 'Monopod', 'The Monopod is a versatile camera accessory for stable and adjustable shooting. Perfect for capturing selfies, group photos, and videos with ease.', 399000, 8.58, 4.43, 48, 'https://cdn.dummyjson.com/product-images/mobile-accessories/monopod/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/mobile-accessories/monopod/1.webp","https://cdn.dummyjson.com/product-images/mobile-accessories/monopod/2.webp"]', 'TechGear', 'ACC-TEC-MONO', 6),
(29, 'Selfie Lamp with iPhone', 'The Selfie Lamp with iPhone is a portable and adjustable LED light designed to enhance your selfies and video calls. Attach it to your iPhone for well-lit photos.', 299000, 19.40, 3.55, 58, 'https://cdn.dummyjson.com/product-images/mobile-accessories/selfie-lamp-with-iphone/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/mobile-accessories/selfie-lamp-with-iphone/1.webp"]', 'GadgetMaster', 'ACC-GAD-SELF', 6),
(30, 'Selfie Stick Monopod', 'The Selfie Stick Monopod is a extendable and foldable device for capturing the perfect selfie or group photo. Compatible with smartphones and cameras.', 259000, 19.12, 3.88, 11, 'https://cdn.dummyjson.com/product-images/mobile-accessories/selfie-stick-monopod/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/mobile-accessories/selfie-stick-monopod/1.webp"]', 'SnapTech', 'ACC-SNA-STK', 6),
(31, 'TV Studio Camera Pedestal', 'The TV Studio Camera Pedestal is a professional-grade camera support system for smooth and precise camera movements in a studio setting. Ideal for broadcast and production.', 9999000, 8.31, 2.78, 15, 'https://cdn.dummyjson.com/product-images/mobile-accessories/tv-studio-camera-pedestal/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/mobile-accessories/tv-studio-camera-pedestal/1.webp"]', 'ProVision', 'ACC-PRO-TVCAM', 6);

-- ============================================================
-- BƯỚC 9: Products — SMARTPHONES (16 sp) → CategoryProductId = 7
-- ============================================================
INSERT INTO `Products` (`Id`, `Name`, `Description`, `Price`, `DiscountPercentage`, `Rating`, `StockQuantity`, `ImageUrl`, `Images`, `Brand`, `Sku`, `CategoryProductId`) VALUES
(32, 'iPhone 5s', 'The iPhone 5s is a classic smartphone known for its compact design and advanced features during its release. While it is an older model, it still provides a reliable user experience.', 3999000, 12.91, 2.83, 25, 'https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/1.webp","https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/2.webp","https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/3.webp"]', 'Apple', 'PHO-APP-IP5S', 7),
(33, 'iPhone 6', 'The iPhone 6 is a stylish and capable smartphone with a larger display and improved performance. It introduced new features and design elements, making it a popular choice in its time.', 5999000, 6.69, 3.41, 60, 'https://cdn.dummyjson.com/product-images/smartphones/iphone-6/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/smartphones/iphone-6/1.webp","https://cdn.dummyjson.com/product-images/smartphones/iphone-6/2.webp","https://cdn.dummyjson.com/product-images/smartphones/iphone-6/3.webp"]', 'Apple', 'PHO-APP-IP6', 7),
(34, 'iPhone 13 Pro', 'The iPhone 13 Pro is a cutting-edge smartphone with a powerful camera system, high-performance chip, and stunning display. It offers advanced features for users who demand top-notch technology.', 21999000, 9.37, 4.12, 56, 'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp","https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/2.webp","https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/3.webp"]', 'Apple', 'PHO-APP-IP13P', 7),
(35, 'iPhone X', 'The iPhone X is a flagship smartphone featuring a bezel-less OLED display, facial recognition technology (Face ID), and impressive performance. It represents a milestone in iPhone design and innovation.', 17999000, 19.59, 2.51, 37, 'https://cdn.dummyjson.com/product-images/smartphones/iphone-x/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/smartphones/iphone-x/1.webp","https://cdn.dummyjson.com/product-images/smartphones/iphone-x/2.webp","https://cdn.dummyjson.com/product-images/smartphones/iphone-x/3.webp"]', 'Apple', 'PHO-APP-IPX', 7),
(36, 'Oppo A57', 'The Oppo A57 is a mid-range smartphone known for its sleek design and capable features. It offers a balance of performance and affordability, making it a popular choice.', 4999000, 2.43, 3.94, 19, 'https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/1.webp","https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/2.webp","https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/3.webp"]', 'Oppo', 'PHO-OPP-A57', 7),
(37, 'Oppo F19 Pro Plus', 'The Oppo F19 Pro Plus is a feature-rich smartphone with a focus on camera capabilities. It boasts advanced photography features and a powerful performance for a premium user experience.', 7999000, 18.64, 3.51, 78, 'https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/1.webp","https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/2.webp","https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/3.webp"]', 'Oppo', 'PHO-OPP-F19', 7),
(38, 'Oppo K1', 'The Oppo K1 series offers a range of smartphones with various features and specifications. Known for their stylish design and reliable performance, the Oppo K1 series caters to diverse user preferences.', 5999000, 18.29, 4.25, 55, 'https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/1.webp","https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/2.webp","https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/3.webp","https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/4.webp"]', 'Oppo', 'PHO-OPP-K1', 7),
(39, 'Realme C35', 'The Realme C35 is a budget-friendly smartphone with a focus on providing essential features for everyday use. It offers a reliable performance and user-friendly experience.', 2999000, 15.30, 4.20, 48, 'https://cdn.dummyjson.com/product-images/smartphones/realme-c35/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/smartphones/realme-c35/1.webp","https://cdn.dummyjson.com/product-images/smartphones/realme-c35/2.webp","https://cdn.dummyjson.com/product-images/smartphones/realme-c35/3.webp"]', 'Realme', 'PHO-REA-C35', 7),
(40, 'Realme X', 'The Realme X is a mid-range smartphone known for its sleek design and impressive display. It offers a good balance of performance and camera capabilities for users seeking a quality device.', 5999000, 6.95, 3.70, 12, 'https://cdn.dummyjson.com/product-images/smartphones/realme-x/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/smartphones/realme-x/1.webp","https://cdn.dummyjson.com/product-images/smartphones/realme-x/2.webp","https://cdn.dummyjson.com/product-images/smartphones/realme-x/3.webp"]', 'Realme', 'PHO-REA-X', 7),
(41, 'Realme XT', 'The Realme XT is a feature-rich smartphone with a focus on camera technology. It comes equipped with advanced camera sensors, delivering high-quality photos and videos for photography enthusiasts.', 6999000, 11.51, 4.58, 80, 'https://cdn.dummyjson.com/product-images/smartphones/realme-xt/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/smartphones/realme-xt/1.webp","https://cdn.dummyjson.com/product-images/smartphones/realme-xt/2.webp","https://cdn.dummyjson.com/product-images/smartphones/realme-xt/3.webp"]', 'Realme', 'PHO-REA-XT', 7),
(42, 'Samsung Galaxy S7', 'The Samsung Galaxy S7 is a flagship smartphone known for its sleek design and advanced features. It features a high-resolution display, powerful camera, and robust performance.', 5999000, 19.55, 3.30, 67, 'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s7/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s7/1.webp","https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s7/2.webp","https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s7/3.webp"]', 'Samsung', 'PHO-SAM-S7', 7),
(43, 'Samsung Galaxy S8', 'The Samsung Galaxy S8 is a premium smartphone with an Infinity Display, offering a stunning visual experience. It boasts advanced camera capabilities and cutting-edge technology.', 9999000, 19.45, 4.40, 0, 'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/1.webp","https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/2.webp","https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/3.webp"]', 'Samsung', 'PHO-SAM-S8', 7),
(44, 'Samsung Galaxy S10', 'The Samsung Galaxy S10 is a flagship device featuring a dynamic AMOLED display, versatile camera system, and powerful performance. It represents innovation and excellence in smartphone technology.', 13999000, 5.59, 3.06, 19, 'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/1.webp","https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/2.webp","https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/3.webp"]', 'Samsung', 'PHO-SAM-S10', 7),
(45, 'Vivo S1', 'The Vivo S1 is a stylish and mid-range smartphone offering a blend of design and performance. It features a vibrant display, capable camera system, and reliable functionality.', 4999000, 10.17, 3.50, 50, 'https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/1.webp","https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/2.webp","https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/3.webp"]', 'Vivo', 'PHO-VIV-S1', 7),
(46, 'Vivo V9', 'The Vivo V9 is a smartphone known for its sleek design and emphasis on capturing high-quality selfies. It features a notch display, dual-camera setup, and a modern design.', 5999000, 17.67, 3.60, 82, 'https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/1.webp","https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/2.webp","https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/3.webp"]', 'Vivo', 'PHO-VIV-V9', 7),
(47, 'Vivo X21', 'The Vivo X21 is a premium smartphone with a focus on cutting-edge technology. It features an in-display fingerprint sensor, a high-resolution display, and advanced camera capabilities.', 9999000, 17.41, 4.26, 7, 'https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/1.webp","https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/2.webp","https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/3.webp"]', 'Vivo', 'PHO-VIV-X21', 7);

-- ============================================================
-- BƯỚC 10: Products — TABLETS (3 sp) → CategoryProductId = 8
-- ============================================================
INSERT INTO `Products` (`Id`, `Name`, `Description`, `Price`, `DiscountPercentage`, `Rating`, `StockQuantity`, `ImageUrl`, `Images`, `Brand`, `Sku`, `CategoryProductId`) VALUES
(48, 'iPad Mini 2021 Starlight', 'The iPad Mini 2021 in Starlight is a compact and powerful tablet from Apple. Featuring a stunning Retina display, powerful A-series chip, and a sleek design, it offers a premium tablet experience.', 9999000, 3.64, 3.18, 47, 'https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/1.webp","https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/2.webp","https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/3.webp","https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/4.webp"]', 'Apple', 'TAB-APP-IPADM', 8),
(49, 'Samsung Galaxy Tab S8 Plus Grey', 'The Samsung Galaxy Tab S8 Plus in Grey is a high-performance Android tablet by Samsung. With a large AMOLED display, powerful processor, and S Pen support, it is ideal for productivity and entertainment.', 11999000, 13.31, 4.68, 62, 'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/1.webp","https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/2.webp","https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/3.webp","https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/4.webp"]', 'Samsung', 'TAB-SAM-S8P', 8),
(50, 'Samsung Galaxy Tab White', 'The Samsung Galaxy Tab in White is a sleek and versatile Android tablet. With a vibrant display, long-lasting battery, and a range of features, it offers a great user experience for various tasks.', 6999000, 18.20, 3.72, 92, 'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/thumbnail.webp', '["https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/1.webp","https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/2.webp","https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/3.webp","https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/4.webp"]', 'Samsung', 'TAB-SAM-WHT', 8);

-- ============================================================
-- ✅ XONG! Kiểm tra kết quả:
-- ============================================================
-- ============================================================
-- BƯỚC 11: Reviews — DummyJSON
-- ============================================================
INSERT INTO `Reviews` (`ProductId`, `Rating`, `Comment`, `ReviewerName`, `CreatedDate`) VALUES
-- Reviews cho MacBook (Id=13)
(13, 5, 'Very happy with my purchase!', 'Hazel Evans', '2026-06-10'),
(13, 4, 'Very satisfied!', 'Aubrey Garcia', '2026-06-15'),
-- Reviews cho AirPods (Id=18)
(18, 5, 'Great product!', 'Emma Wilson', '2026-06-12'),
(18, 4, 'Excellent quality!', 'Xavier Wright', '2026-06-18'),
-- Reviews cho iPhone 13 Pro (Id=34)
(34, 5, 'Would buy again!', 'Christian Perez', '2026-06-08'),
(34, 5, 'Very satisfied!', 'Tristan Scott', '2026-06-20'),
-- Reviews cho iPad Mini (Id=48)
(48, 4, 'Highly impressed!', 'Eleanor Collins', '2026-06-05'),
(48, 5, 'Very happy with my purchase!', 'Leo Rivera', '2026-06-22'),
-- Reviews cho Samsung Tab S8 (Id=49)
(49, 5, 'Highly impressed!', 'Christopher West', '2026-06-14');

-- ============================================================
-- ✅ XONG! Kiểm tra kết quả:
-- ============================================================
-- SELECT * FROM Users;              -- 5 users
-- SELECT * FROM Categories;          -- 5 blog categories
-- SELECT * FROM Posts;               -- 5 blog posts
-- SELECT * FROM CategoriesProducts;  -- 8 danh mục (4 gaming + 4 dummyjson)
-- SELECT COUNT(*) FROM Products;     -- 50 sản phẩm (12 gaming + 38 dummyjson)
-- SELECT COUNT(*) FROM Reviews;      -- 14 reviews (5 gaming + 9 dummyjson)
