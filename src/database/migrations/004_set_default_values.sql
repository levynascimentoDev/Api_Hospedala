INSERT IGNORE INTO places (
    id, title, description, type, region, sigla, city, max_people, default_value,
    owner_id, lat, lon, available
) VALUES
('HTL001', 'Hotel Central', 'Hotel confortável no centro da cidade', 'hotel', 'Sudeste', 'SP', 'São Paulo', 150, 350.00, 1, '-23.550520', '-46.633308', TRUE),
('HTL002', 'Hotel Imperial', 'Hotel de alto padrão com suítes luxuosas', 'hotel', 'Sudeste', 'SP', 'Campinas', 200, 520.00, 1, '-22.905560', '-47.060833', TRUE),
('PSS005', 'Pousada Flor', 'Ótimo custo-benefício e ambiente acolhedor', 'pousada', 'Sudeste', 'RJ', 'Niterói', 28, 150.00, 3, '-22.883056', '-43.103611', TRUE),
('RRT006', 'Resort Verde', 'Resort com piscinas e lazer completo', 'resort', 'Sudeste', 'MG', 'Belo Horizonte', 300, 780.50, 3, '-19.920830', '-43.937778', TRUE),
('RRT008', 'Resort Imperial', 'Resort 5 estrelas com atividades exclusivas', 'resort', 'Nordeste', 'PE', 'Recife', 320, 920.00, 4, '-8.047556', '-34.877000', TRUE),
('SIT009', 'Sítio da Serra', 'Sítio para eventos e lazer', 'sitio', 'Sul', 'RS', 'Porto Alegre', 50, 400.00, 4, '-30.034647', '-51.217658', TRUE),
('APT011', 'Apto Central', 'Apto mobiliado no centro comercial', 'apartamento', 'Sul', 'PR', 'Curitiba', 4, 180.00, 6, '-25.428954', '-49.273185', TRUE),
('APT012', 'Apto Luxo', 'Apartamento moderno com varanda gourmet', 'apartamento', 'Sudeste', 'SP', 'São José dos Campos', 5, 250.00, 6, '-23.189591', '-45.884827', TRUE),
('APT013', 'Apto Vista Mar', 'Apartamento com vista do mar', 'apartamento', 'Nordeste', 'CE', 'Fortaleza', 6, 300.00, 7, '-3.717220', '-38.543060', TRUE),
('CAB015', 'Cabana Raiz', 'Cabana simples e integrada à natureza', 'cabana', 'Sul', 'SC', 'Joinville', 2, 150.00, 8, '-26.304444', '-48.848611', TRUE),
('FZN016', 'Fazenda Esperança', 'Fazenda com cavalgadas e lago', 'fazenda', 'Sudeste', 'MG', 'Ouro Preto', 100, 500.00, 8, '-20.385556', '-43.503333', TRUE),
('FZN017', 'Fazenda Colonial', 'Ambiente rústico ideal para grupos', 'fazenda', 'Nordeste', 'BA', 'Porto Seguro', 90, 450.00, 9, '-16.445556', '-39.065556', TRUE),
('CAS018', 'Casa da Praia', 'Casa completa perto do mar', 'casa', 'Nordeste', 'PE', 'Olinda', 10, 380.00, 9, '-7.993889', '-34.845556', TRUE),
('CAS019', 'Casa das Palmeiras', 'Casa com jardim e piscina', 'casa', 'Sul', 'PR', 'Londrina', 12, 420.00, 10, '-23.304722', '-51.169722', TRUE),
('CAS020', 'Casa Montanha', 'Casa com lareira e vista para a serra', 'casa', 'Sudeste', 'SP', 'Campos do Jordão', 8, 390.00, 10, '-22.738611', '-45.583333', TRUE);



INSERT IGNORE INTO reviews (
    id,
    place_id,
    user_id,
    rating
) VALUES
(1, 'HTL001', 1, 5),
(2, 'HTL001', 2, 4),
(3, 'HTL002', 3, 5),
(4, 'HTL002', 1, 4),

(5, 'PSS003', 4, 5),
(6, 'PSS003', 2, 4),
(7, 'PSS004', 5, 3),
(8, 'PSS005', 6, 4),

(9, 'RRT006', 3, 5),
(10, 'RRT006', 7, 4),
(11, 'RRT007', 8, 5),
(12, 'RRT007', 5, 4),
(13, 'RRT008', 9, 5),

(14, 'SIT009', 6, 4),
(15, 'SIT010', 4, 3),

(16, 'APT011', 8, 5),
(17, 'APT012', 2, 4),
(18, 'APT013', 7, 5),

(19, 'CAB014', 9, 4),
(20, 'CAB015', 10, 3),
(21, 'FZN016', 1, 5),
(22, 'FZN017', 3, 4),

(23, 'CAS018', 10, 5),
(24, 'CAS019', 6, 4),
(25, 'CAS020', 9, 5);

INSERT IGNORE INTO media_places (id, place_id, url) VALUES
(1, 'HTL001', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop'),
(2, 'HTL002', 'https://images.unsplash.com/photo-1501117716987-c8e1ecb2101b?w=800&h=600&fit=crop'),
(3, 'PSS003', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop'),
(4, 'PSS004', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'),
(5, 'PSS005', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop'),
(6, 'RRT006', 'https://images.unsplash.com/photo-1501117716987-c8e1ecb2101b?w=800&h=600&fit=crop'),
(7, 'RRT007', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'),
(8, 'RRT008', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop'),
(9, 'SIT009', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'),
(10, 'SIT010', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=600&fit=crop'),
(11, 'APT011', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'),
(12, 'APT012', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop'),
(13, 'APT013', 'https://images.unsplash.com/photo-1600585154202-59c7d52f26df?w=800&h=600&fit=crop'),
(14, 'CAB014', 'https://images.unsplash.com/photo-1529518964332-56e0ef0a0ee0?w=800&h=600&fit=crop'),
(15, 'CAB015', 'https://images.unsplash.com/photo-1501707305551-9b2adda5e527?w=800&h=600&fit=crop'),
(16, 'FZN016', 'https://images.unsplash.com/photo-1519821172141-b5d8d5b3e9ca?w=800&h=600&fit=crop'),
(17, 'FZN017', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop'),
(18, 'CAS018', 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&h=600&fit=crop'),
(19, 'CAS019', 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5a?w=800&h=600&fit=crop'),
(20, 'CAS020', 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&h=600&fit=crop');
