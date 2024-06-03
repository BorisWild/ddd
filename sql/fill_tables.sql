-- Filling of users
INSERT INTO users (full_name, phone, phone_ver, password, role)
VALUES ('Путин Владимир Владимирович', '+79777068266', false, '$2a$10$XahrrTL22BeIOPbtHCGA6OBY47dQnXrsRyaDimr7Armgs5sxTiLES', 3)
;

INSERT INTO users (full_name, email, password, role)
VALUES ('Ротай Антон Сергеевич', 'tonyrotay@vk.com', '$2a$10$f9K7QcR9ru8/Avt8iLmrTefwPrS0zOykQpPoRMnkqVZ50J4RDC2cm', 1)
;

INSERT INTO users (full_name, email, password, role)
VALUES ('Образцов Олег Александрович', 'olegrasputina@gmail.com', '$2a$10$f9K7QcR9ru8/Avt8iLmrTefwPrS0zOykQpPoRMnkqVZ50J4RDC2cm', 2)
;

INSERT INTO users (full_name, email, password, role)
VALUES ('Образцов Олег Александрович', 'oaobraztsov@gmail.com', '$2a$10$f9K7QcR9ru8/Avt8iLmrTefwPrS0zOykQpPoRMnkqVZ50J4RDC2cm', 1)
;

-- Filling of restrictions

INSERT INTO restrictions (max_length, min_length, max_width, min_width, max_height, min_height,
                        vh_ration, facade_ratio, ribs_status)
VALUES (0, 0, 0, 0, 0, 0, 0, 0, false)
;

-- Filling of textures
INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;

INSERT INTO textures (name, type, image, status)
VALUES ('Древесина', 'Каркас', '{"src":"src/files/texture/images/default.png"}', true)
;


-- Filling of elements
INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Профиль 125', 'Профиль', '125x20x20', 25, '{"src":"src/files/element/files/Profile_125.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Профиль 270', 'Профиль', '270x20x20', 25, '{"src":"src/files/element/files/Profile_270.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Профиль 415', 'Профиль', '415x20x20', 25, '{"src":"src/files/element/files/Profile_415.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Профиль 560', 'Профиль', '560x20x20', 25, '{"src":"src/files/element/files/Profile_560.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('2 Пальца (90 градусов)', 'Коннектор', '2x90', 25, '{"src":"src/files/element/files/2_Fingers_90.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('2 Пальца (180 градусов)', 'Коннектор', '2x180', 25, '{"src":"src/files/element/files/2_Fingers_180.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('3 Пальца (180 градусов)', 'Коннектор', '3x180', 25, '{"src":"src/files/element/files/3_Fingers_180.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('3 Пальца (90 градусов)', 'Коннектор', '3x90', 25, '{"src":"src/files/element/files/3_Fingers_90.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('4 Пальца (вниз)', 'Коннектор', '4', 25, '{"src":"src/files/element/files/4_Fingers_bottom.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('4 Пальца (+)', 'Коннектор', '4', 25, '{"src":"src/files/element/files/4_Fingers_+.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Штифт 6', 'Штифт', '6x1x1', 25, '{"src":"src/files/element/files/Shtift_6.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Штифт 20', 'Штифт', '20x1x1', 25, '{"src":"src/files/element/files/Shtift_20.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Штифт 30', 'Штифт', '30x1x1', 25, '{"src":"src/files/element/files/Shtift_30.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Штифт без шл 16', 'Штифт', '16x1x1', 25, '{"src":"src/files/element/files/Shtift_straight_16.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Штифт без шл 30', 'Штифт', '30x1x1', 25, '{"src":"src/files/element/files/Shtift_straight_30.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Штифт без шл 40', 'Штифт', '40x1x1', 25, '{"src":"src/files/element/files/Shtift_straight_40.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Пластиковая шайба', 'Шайба', '1x1x1', 25, '{"src":"src/files/element/files/Shayba.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 122x122', 'Ящик', '122x122x122', 25, '{"src":"src/files/element/files/Box_122x122x122.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 122x267', 'Ящик', '122x267x122', 25, '{"src":"src/files/element/files/Box_122x267x122.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 122x412', 'Ящик', '122x412x122', 25, '{"src":"src/files/element/files/Box_122x412x122.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 122x557', 'Ящик', '122x557x122', 25, '{"src":"src/files/element/files/Box_122x557x122.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 267x267', 'Ящик', '267x267x122', 25, '{"src":"src/files/element/files/Box_267x267x122.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 267x412', 'Ящик', '267x412x122', 25, '{"src":"src/files/element/files/Box_267x412x122.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 267x557', 'Ящик', '267x557x122', 25, '{"src":"src/files/element/files/Box_267x557x122.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 412x412', 'Ящик', '412x412x122', 25, '{"src":"src/files/element/files/Box_412x412x122.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 412x557', 'Ящик', '412x557x122', 25, '{"src":"src/files/element/files/Box_412x557x122.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 557x557', 'Ящик', '557x557x122', 25, '{"src":"src/files/element/files/Box_557x557x122.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 122x122', 'Ящик', '122x122x267', 25, '{"src":"src/files/element/files/Box_122x122x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 122x267', 'Ящик', '122x267x267', 25, '{"src":"src/files/element/files/Box_122x267x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 122x412', 'Ящик', '122x412x267', 25, '{"src":"src/files/element/files/Box_122x412x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 122x557', 'Ящик', '122x557x267', 25, '{"src":"src/files/element/files/Box_122x557x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 267x267', 'Ящик', '267x267x267', 25, '{"src":"src/files/element/files/Box_267x267x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 267x412', 'Ящик', '267x412x267', 25, '{"src":"src/files/element/files/Box_267x412x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 267x557', 'Ящик', '267x557x267', 25, '{"src":"src/files/element/files/Box_267x557x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 412x412', 'Ящик', '412x412x267', 25, '{"src":"src/files/element/files/Box_412x412x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 412x557', 'Ящик', '412x557x267', 25, '{"src":"src/files/element/files/Box_412x557x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 557x557', 'Ящик', '557x557x267', 25, '{"src":"src/files/element/files/Box_557x557x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 122x122', 'Ящик', '122x122x412', 25, '{"src":"src/files/element/files/Box_122x122x412.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 122x267', 'Ящик', '122x267x412', 25, '{"src":"src/files/element/files/Box_122x267x412.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 122x412', 'Ящик', '122x412x412', 25, '{"src":"src/files/element/files/Box_122x412x412.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 122x557', 'Ящик', '122x557x412', 25, '{"src":"src/files/element/files/Box_122x557x412.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 267x267', 'Ящик', '267x267x412', 25, '{"src":"src/files/element/files/Box_267x267x412.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 267x412', 'Ящик', '267x412x412', 25, '{"src":"src/files/element/files/Box_267x412x412.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 267x557', 'Ящик', '267x557x412', 25, '{"src":"src/files/element/files/Box_267x557x412.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 412x412', 'Ящик', '412x412x412', 25, '{"src":"src/files/element/files/Box_412x412x412.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 412x557', 'Ящик', '412x557x412', 25, '{"src":"src/files/element/files/Box_412x557x412.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 557x557', 'Ящик', '557x557x412', 25, '{"src":"src/files/element/files/Box_557x557x412.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 122x122', 'Ящик', '122x122x557', 25, '{"src":"src/files/element/files/Box_122x122x557.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 122x267', 'Ящик', '122x267x557', 25, '{"src":"src/files/element/files/Box_122x267x557.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 122x412', 'Ящик', '122x412x557', 25, '{"src":"src/files/element/files/Box_122x412x557.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 122x557', 'Ящик', '122x557x557', 25, '{"src":"src/files/element/files/Box_122x557x557.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 267x267', 'Ящик', '267x267x557', 25, '{"src":"src/files/element/files/Box_267x267x557.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 267x412', 'Ящик', '267x412x557', 25, '{"src":"src/files/element/files/Box_267x412x557.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 267x557', 'Ящик', '267x557x557', 25, '{"src":"src/files/element/files/Box_267x557x557.glb"}')
;


INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 412x412', 'Ящик', '412x412x557', 25, '{"src":"src/files/element/files/Box_412x412x557.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 412x557', 'Ящик', '412x557x557', 25, '{"src":"src/files/element/files/Box_412x557x557.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Ящик 557x557', 'Ящик', '557x557x557', 25, '{"src":"src/files/element/files/Box_557x557x557.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Заглушка для ножек', 'Заглушка', '20x20x21', 25, '{"src":"src/files/element/files/Zaglushka_leg.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Панель 125x125', 'Панель', '125x125x20', 25, '{"src":"src/files/element/files/Panel_125x125.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Панель 125x270', 'Панель', '125x270x20', 25, '{"src":"src/files/element/files/Panel_125x270.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Панель 125x415', 'Панель', '125x415x20', 25, '{"src":"src/files/element/files/Panel_125x415.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Панель 125x560', 'Панель', '125x560x20', 25, '{"src":"src/files/element/files/Panel_125x560.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Панель 270x270', 'Панель', '270x270x20', 25, '{"src":"src/files/element/files/Panel_270x270.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Панель 270x415', 'Панель', '270x415x20', 25, '{"src":"src/files/element/files/Panel_270x415.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Панель 270x560', 'Панель', '270x560x20', 25, '{"src":"src/files/element/files/Panel_270x560.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Панель 415x415', 'Панель', '415x415x20', 25, '{"src":"src/files/element/files/Panel_415x415.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Панель 415x560', 'Панель', '415x560x20', 25, '{"src":"src/files/element/files/Panel_415x560.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Панель 560x560', 'Панель', '560x560x20', 25, '{"src":"src/files/element/files/Panel_560x560.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 267x122', 'Дверная панель', '267x122x20', 25, '{"src":"src/files/element/files/Door_Panel_267x122.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 412x122', 'Дверная панель', '412x122x20', 25, '{"src":"src/files/element/files/Door_Panel_412x122.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 557x122', 'Дверная панель', '557x122x20', 25, '{"src":"src/files/element/files/Door_Panel_557x122.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 267x267', 'Дверная панель', '267x267x20', 25, '{"src":"src/files/element/files/Door_Panel_267x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 412x267', 'Дверная панель', '412x267x20', 25, '{"src":"src/files/element/files/Door_Panel_412x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 412x412', 'Дверная панель', '412x412x20', 25, '{"src":"src/files/element/files/Door_Panel_412x412.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 557x267', 'Дверная панель', '557x267x20', 25, '{"src":"src/files/element/files/Door_Panel_557x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 702x267', 'Дверная панель', '702x267x20', 25, '{"src":"src/files/element/files/Door_Panel_702x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 847x267', 'Дверная панель', '847x267x20', 25, '{"src":"src/files/element/files/Door_Panel_847x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 992x267', 'Дверная панель', '992x267x20', 25, '{"src":"src/files/element/files/Door_Panel_992x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 1137x267', 'Дверная панель', '1137x267x20', 25, '{"src":"src/files/element/files/Door_Panel_1137x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 1282x267', 'Дверная панель', '1282x267x20', 25, '{"src":"src/files/element/files/Door_Panel_1282x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 1427x267', 'Дверная панель', '1427x267x20', 25, '{"src":"src/files/element/files/Door_Panel_1427x267.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 557x412', 'Дверная панель', '557x412x20', 25, '{"src":"src/files/element/files/Door_Panel_557x412.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 702x412', 'Дверная панель', '702x412x20', 25, '{"src":"src/files/element/files/Door_Panel_702x412.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 847x412', 'Дверная панель', '847x412x20', 25, '{"src":"src/files/element/files/Door_Panel_847x412.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 992x412', 'Дверная панель', '992x412x20', 25, '{"src":"src/files/element/files/Door_Panel_992x412.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 1137x412', 'Дверная панель', '1137x412x20', 25, '{"src":"src/files/element/files/Door_Panel_1137x412.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 1282x412', 'Дверная панель', '1282x412x20', 25, '{"src":"src/files/element/files/Door_Panel_1282x412.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 1427x412', 'Дверная панель', '1427x412x20', 25, '{"src":"src/files/element/files/Door_Panel_1427x412.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 557x557', 'Дверная панель', '557x557x20', 25, '{"src":"src/files/element/files/Door_Panel_557x557.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 702x557', 'Дверная панель', '702x557x20', 25, '{"src":"src/files/element/files/Door_Panel_702x557.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 847x557', 'Дверная панель', '847x557x20', 25, '{"src":"src/files/element/files/Door_Panel_847x557.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 992x557', 'Дверная панель', '992x557x20', 25, '{"src":"src/files/element/files/Door_Panel_992x557.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 1137x557', 'Дверная панель', '1137x557x20', 25, '{"src":"src/files/element/files/Door_Panel_1137x557.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 1282x557', 'Дверная панель', '1282x557x20', 25, '{"src":"src/files/element/files/Door_Panel_1282x557.glb"}')
;

INSERT INTO elements (name, type, dimensions, weight, file)
VALUES ('Дверная панель 1427x557', 'Дверная панель', '1427x557x20', 25, '{"src":"src/files/element/files/Door_Panel_1427x557.glb"}')
;

-- Filling of categories
INSERT INTO categories (name)
VALUES ('Стелажи')
;

INSERT INTO categories (name)
VALUES ('Комоды и тумбы')
;

INSERT INTO categories (name)
VALUES ('Столы')
;

INSERT INTO categories (name)
VALUES ('Полки')
;

-- Filling of subcategories
INSERT INTO subcategories (name, category_id, video_link)
VALUES ('Серванты', 1, '{"src":"src/files/subcategory/videos/default.mp4"}')
;

INSERT INTO subcategories (name, category_id, video_link)
VALUES ('Книжные шкафы', 1, '{"src":"src/files/subcategory/videos/default.mp4"}')
;

INSERT INTO subcategories (name, category_id, video_link)
VALUES ('Шкафы-купе', 1, '{"src":"src/files/subcategory/videos/default.mp4"}')
;

INSERT INTO subcategories (name, category_id, video_link)
VALUES ('Серванты', 2, '{"src":"src/files/subcategory/videos/default.mp4"}')
;

INSERT INTO subcategories (name, category_id, video_link)
VALUES ('Книжные шкафы', 2, '{"src":"src/files/subcategory/videos/default.mp4"}')
;

INSERT INTO subcategories (name, category_id, video_link)
VALUES ('Шкафы-купе', 3, '{"src":"src/files/subcategory/videos/default.mp4"}')
;

INSERT INTO subcategories (name, category_id, video_link)
VALUES ('Серванты', 3, '{"src":"src/files/subcategory/videos/default.mp4"}')
;

INSERT INTO subcategories (name, category_id, video_link)
VALUES ('Книжные шкафы', 4, '{"src":"src/files/subcategory/videos/default.mp4"}')
;

INSERT INTO subcategories (name, category_id, video_link)
VALUES ('Шкафы-купе', 4, '{"src":"src/files/subcategory/videos/default.mp4"}')
;

-- Filling of solution
INSERT INTO solution (name, image, file, length, height, width, weight, subcategory_id, user_id)
VALUES ('Стелаж обычный', '{"src":"src/files/solution/images/default.png"}',
        '{"src":"src/files/solution/files/default.txt"}', 2480, 600, 1200, 5200, 3, 1)
;

INSERT INTO solution (name, image, file, length, height, width, weight, subcategory_id, user_id)
VALUES ('Стелаж обычный', '{"src":"src/files/solution/images/default.png"}',
        '{"src":"src/files/solution/files/default.txt"}', 2480, 600, 1200, 5200, 1, 4)
;

INSERT INTO solution (name, image, file, length, height, width, weight, subcategory_id, user_id)
VALUES ('Стелаж обычный', '{"src":"src/files/solution/images/default.png"}',
        '{"src":"src/files/solution/files/default.txt"}', 2480, 600, 1200, 5200, 3, 4)
;

INSERT INTO solution (name, image, file, length, height, width, weight, subcategory_id, user_id)
VALUES ('Стелаж обычный', '{"src":"src/files/solution/images/default.png"}',
        '{"src":"src/files/solution/files/default.txt"}', 2480, 600, 1200, 5200, 2, 3)
;

INSERT INTO solution (name, image, file, length, height, width, weight, subcategory_id, user_id)
VALUES ('Стелаж обычный', '{"src":"src/files/solution/images/default.png"}',
        '{"src":"src/files/solution/files/default.txt"}', 2480, 600, 1200, 5200, 1, 3)
;


-- Filling of element2texture
INSERT INTO saved (user_id, solution_id)
VALUES (1, 4)
;

INSERT INTO saved (user_id, solution_id)
VALUES (1, 1)
;

INSERT INTO saved (user_id, solution_id)
VALUES (1, 1)
;

INSERT INTO saved (user_id, solution_id)
VALUES (1, 5)
;

INSERT INTO saved (user_id, solution_id)
VALUES (1, 5)
;

INSERT INTO saved (user_id, solution_id)
VALUES (1, 5)
;

INSERT INTO saved (user_id, solution_id)
VALUES (1, 2)
;

INSERT INTO saved (user_id, solution_id)
VALUES (2, 1)
;

INSERT INTO saved (user_id, solution_id)
VALUES (2, 5)
;

INSERT INTO saved (user_id, solution_id)
VALUES (2, 4)
;

INSERT INTO saved (user_id, solution_id)
VALUES (2, 3)
;

INSERT INTO saved (user_id, solution_id)
VALUES (1, 1)
;


-- Filling of element2texture
INSERT INTO element2texture (element_id, texture_id, cost)
VALUES (1, 1, 250.00)
;

INSERT INTO element2texture (element_id, texture_id, cost)
VALUES (1, 2, 550.00)
;

INSERT INTO element2texture (element_id, texture_id, cost)
VALUES (3, 3, 225.00)
;

INSERT INTO element2texture (element_id, texture_id, cost)
VALUES (4, 3, 675.00)
;

INSERT INTO element2texture (element_id, texture_id, cost)
VALUES (5, 1, 250.00);

-- Filling of solution2element
INSERT INTO solution2element (element2texture_id, solution_id, quantity)
VALUES (1, 5, 10)
;

INSERT INTO solution2element (element2texture_id, solution_id, quantity)
VALUES (2, 1, 5)
;

INSERT INTO solution2element (element2texture_id, solution_id, quantity)
VALUES (3, 2, 0)
;

INSERT INTO solution2element (element2texture_id, solution_id, quantity)
VALUES (4, 5, 10)
;

INSERT INTO solution2element (element2texture_id, solution_id, quantity)
VALUES (5, 2, 50)
;

-- Filling of user_box
INSERT INTO user_box (user_id, element_id, quantity)
VALUES (1, 1, 10)
;

INSERT INTO user_box (user_id, element_id, quantity)
VALUES (2, 3, 4)
;

INSERT INTO user_box (user_id, element_id, quantity)
VALUES (1, 2, 10)
;

INSERT INTO user_box (user_id, element_id, quantity)
VALUES (2, 4, 15)
;

-- Filling of delivery_methods
INSERT INTO delivery_methods (name, description, cost)
VALUES ('СДЕК пункт выдачи', 'Доставка курьерской службой СДЕК. Заказ будет доставлен в ближайший пункт самовывоза СДЕК',
        650.00)
;

INSERT INTO delivery_methods (name, description, cost)
VALUES ('СДЕК курьером', 'Доставка курьерской службой СДЕК. Заказ будет доставлен курьером СДЕК',
        650.00)
;

INSERT INTO delivery_methods (name, description, cost)
VALUES ('PICKPOINT пункты выдачи', 'Доставка курьерской службой PICKPOINT. Заказ будет доставлен в ближайший пункт самовывоза PICKPOINT',
        650.00)
;

INSERT INTO delivery_methods (name, description, cost)
VALUES ('PICKPOINT курьером', 'Доставка курьерской службой PICKPOINT. Заказ будет доставлен курьером PICKPOINT',
        650.00)
;

-- Filling of payment methods
INSERT INTO payment_methods (name, description)
VALUES ('Картой ОНЛАЙН', 'Наличными или банковской картой')
;

INSERT INTO payment_methods (name, description)
VALUES ('Картой ОНЛАЙН', 'Наличными или банковской картой')
;

INSERT INTO payment_methods (name, description)
VALUES ('Картой ОНЛАЙН', 'Наличными или банковской картой')
;

-- Filling of orders
INSERT INTO orders (user_id, solution_id, status, city,
                street, building, flat, payment_method_id, delivery_method_id)
VALUES (1, 3, 'Не оплачен', 'Москва', 'ул. Мясницкая', 'д. 2', '3 этаж', 2, 1)
;

INSERT INTO orders (user_id, solution_id, status, city,
                street, building, flat, payment_method_id, delivery_method_id)
VALUES (2, 2, 'Отменен', 'Москва', 'ул. Мясницкая', 'д. 2', '3 этаж', 1, 1)
;

INSERT INTO orders (user_id, solution_id, status, city,
                street, building, flat, payment_method_id, delivery_method_id)
VALUES (1, 5, 'Отменен', 'Москва', 'ул. Мясницкая', 'д. 2', '3 этаж', 2, 2)
;

INSERT INTO orders (user_id, solution_id, status, city,
                street, building, flat, payment_method_id, delivery_method_id)
VALUES (2, 4, 'Оплачен', 'Москва', 'ул. Мясницкая', 'д. 2', '3 этаж', 2, 1)
;

-- Filling of instruments
INSERT INTO instruments (name, comment, cost, image)
VALUES ('Рожковый ключ 6x7мм STANLEY STMT72837-8', 'Для сборки панелей и профилей',
        72, '{"src":"src/files/instruments/images/default.png"}')
;

INSERT INTO instruments (name, comment, cost, image)
VALUES ('Шестигранный ключ 6мм, покрытие ХРОМ GRIFF 031115', 'Для сборки панелей и профилей',
        30, '{"src":"src/files/instruments/images/default.png"}')
;

INSERT INTO instruments (name, comment, cost, image)
VALUES ('Черная резиновая киянка STAYER 450 Г 2054-65', 'Понадобится для соединения панелей',
        400, '{"src":"src/files/instruments/images/default.png"}')
;

INSERT INTO instruments (name, comment, cost, image)
VALUES ('Комбинированный ключ NORGAU 6мм 060223097', 'Для сборки панелей и профилей',
        650, '{"src":"src/files/instruments/images/default.png"}')
;

-- Filling of instruments
INSERT INTO instrument2order (instrument_id, order_id, quantity)
VALUES (1, 1, 5)
;

INSERT INTO instrument2order (instrument_id, order_id, quantity)
VALUES (1, 4, 2)
;

INSERT INTO instrument2order (instrument_id, order_id, quantity)
VALUES (1, 3, 5)
;

INSERT INTO instrument2order (instrument_id, order_id, quantity)
VALUES (3, 1, 10)
;

INSERT INTO instrument2order (instrument_id, order_id, quantity)
VALUES (2, 2, 2)
;

INSERT INTO instrument2order (instrument_id, order_id, quantity)
VALUES (3, 3, 3)
;

INSERT INTO instrument2order (instrument_id, order_id, quantity)
VALUES (2, 3, 1)
;

INSERT INTO instrument2order (instrument_id, order_id, quantity)
VALUES (2, 4, 1)
;

SELECT pg_reload_conf();
