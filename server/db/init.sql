-- J.Giridhar Construction Company - Complete Database Schema & Seed Dump
-- Import using: mysql -u <user> -p < server/db/init.sql

CREATE DATABASE IF NOT EXISTS giridhar_construction
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE giridhar_construction;

DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE,
  sector VARCHAR(120) NOT NULL DEFAULT 'Real Estate Developer',
  website VARCHAR(200) DEFAULT '',
  project_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  project_type ENUM('Road Work','Infrastructure','Concrete','Asphalt','Paver','Hardscape','External Civil') NOT NULL,
  status ENUM('Completed','Under Progress') NOT NULL DEFAULT 'Under Progress',
  location VARCHAR(200) DEFAULT '',
  description TEXT,
  start_date DATE DEFAULT NULL,
  end_date DATE DEFAULT NULL,
  image_url VARCHAR(300) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_projects_client
    FOREIGN KEY (client_id) REFERENCES clients(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- Seed key clients
INSERT INTO clients (id, name, sector, website, project_count) VALUES
  (1, 'Assetz Property Group', 'Real Estate Developer', 'https://www.assetzproperty.com', 3),
  (2, 'Puravankara Limited', 'Real Estate Developer', 'https://www.puravankara.com', 2),
  (3, 'Provident Housing', 'Real Estate Developer', 'https://www.providenthousing.com', 1),
  (4, 'Nambiar Builders', 'Real Estate Developer', 'https://www.nambiarbuilders.com', 3),
  (5, 'Sattva Group', 'Real Estate Developer', 'https://www.sattvagroup.com', 2),
  (6, 'Shirasa Construction', 'Infrastructure & Construction', '', 1),
  (7, 'Sobha Limited', 'Real Estate Developer', 'https://www.sobha.com', 2),
  (8, 'Kalpataru International Pvt Ltd', 'Real Estate Developer', '', 1);

-- Seed projects
INSERT INTO projects
  (id, client_id, title, project_type, status, location, description, start_date, end_date, image_url) VALUES
  (1, 1, 'Assetz The Secret Lake', 'Infrastructure', 'Under Progress', 'Bengaluru, Karnataka',
   'Comprehensive external infrastructure, internal road networks, storm water drainage, RCC drains and paving works for Assetz The Secret Lake township.',
   '2024-05-10', NULL,
   '/projects/site-01.jpg'),
  (2, 3, 'Provident Deansgate', 'Road Work', 'Under Progress', 'IVC Road, Bengaluru, Karnataka',
   'External road development, asphalt paving, concrete approaches, and external civil infrastructure for Provident Deansgate development.',
   '2024-08-15', NULL,
   '/projects/site-05.jpg'),
  (3, 4, 'Nambiar District 25', 'Infrastructure', 'Under Progress', 'Sarjapur Road, Bengaluru, Karnataka',
   'Large-scale township internal roads, concentric paver avenues, RCC retaining walls, storm water drain network, and asphalt road construction for Nambiar District 25.',
   '2024-09-01', NULL,
   '/projects/district-25/01.jpg'),
  (4, 6, 'Sattva - Shirasa Construction Pvt Ltd', 'External Civil', 'Under Progress', 'Bengaluru, Karnataka',
   'External civil works, retaining walls, RCC drains, concrete pavement and asphalt works for Sattva - Shirasa Construction project.',
   '2024-11-20', NULL,
   '/projects/site-20.jpg'),
  (5, 4, 'Nambiar Enterprises LLP - Nambiar Bannerghatta Bilwardahalli Ph-01', 'Road Work', 'Under Progress', 'Bannerghatta - Bilwardahalli, Bengaluru, Karnataka',
   'Phase 01 road infrastructure, paver installation, kerb works, site grading, and asphalt paving for Nambiar Bannerghatta development.',
   '2025-01-10', NULL,
   '/projects/site-28.jpg'),
  (6, 8, 'Provident Equinox Ph-01', 'Asphalt', 'Completed', 'Mysore Road, Bengaluru, Karnataka',
   'Comprehensive asphalt road laying, heavy compaction, sub-base preparation, and external civil infrastructure execution for Provident Equinox Phase 01.',
   '2023-01-10', '2023-08-25',
   '/projects/provident-equinox/01.jpg'),
  (7, 7, 'Sobha Town Park', 'Road Work', 'Completed', 'Hosur Road, Bengaluru, Karnataka',
   'Internal road construction, heavy asphalt surfacing, roadside kerbs, RCC storm drainage channels, and external pavement infrastructure.',
   '2023-03-05', '2023-11-15',
   '/projects/town-park/01.jpg'),
  (8, 2, 'Purva Kenso Hills', 'Infrastructure', 'Completed', 'Bengaluru Rural, Karnataka',
   'Large plotted layout infrastructure, comprehensive sub-grade earthwork, WMM, asphalt road carpeting, and boundary kerb works.',
   '2023-06-12', '2024-02-28',
   '/projects/kenso-hills/01.jpg'),
  (9, 7, 'Sobha Oakshire', 'Paver', 'Completed', 'Devanahalli, Bengaluru, Karnataka',
   'Designer interlocking concrete paver driveways, pedestrian walkways, RCC edge restraints, and luxury villa community road infrastructure.',
   '2023-09-01', '2024-05-20',
   '/projects/oakshire/01.jpg'),
  (10, 4, 'Nambiar Ellegenza Phase-01', 'Hardscape', 'Completed', 'Sarjapur Road, Bengaluru, Karnataka',
   'Complete external civil hardscaping, driveway paver systems, storm water drainage, retaining walls, and asphalt approach roads for luxury villa township.',
   '2023-11-15', '2024-07-30',
   '/projects/ellegenza/01.jpg'),
  (11, 2, 'Puravankara Sounds of Water', 'Road Work', 'Completed', 'Bannerghatta Road, Bengaluru, Karnataka',
   'Premium internal asphalt road network, designer paver work, hardscape features and comprehensive drainage infrastructure.',
   '2023-01-15', '2023-09-30',
   '/projects/site-35.jpg'),
  (12, 5, 'Sattva Green Groves', 'Infrastructure', 'Completed', 'Nelamangala, Bengaluru, Karnataka',
   'Complete plotted layout infrastructure, asphalt roads, RCC drain network, retaining walls, and utility corridors.',
   '2023-04-10', '2023-12-20',
   '/projects/site-42.jpg'),
  (13, 5, 'Sattva Bhumi', 'Concrete', 'Completed', 'Bengaluru, Karnataka',
   'PQC concrete roads, heavy-duty asphalt main corridors, paver walkways, and external civil works.',
   '2023-08-01', '2024-04-15',
   '/projects/site-48.jpg'),
  (14, 1, 'Assetz Marq', 'Hardscape', 'Completed', 'Whitefield, Bengaluru, Karnataka',
   'High-specification internal asphalt roads, perimeter RCC drains, hardscaping, paver walkways, and external civil finishing.',
   '2023-10-05', '2024-06-30',
   '/projects/site-53.jpg'),
  (15, 1, 'Assetz Bloom and Dell', 'Paver', 'Completed', 'Whitefield, Bengaluru, Karnataka',
   'External civil infrastructure, asphalt roads, interlocking paver blocks, retaining structures, and landscape hardscape.',
   '2024-02-12', '2024-11-25',
   '/projects/site-58.jpg');

