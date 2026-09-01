-- J.Giridhar Construction Company - Database Schema & Seed Data
-- Run as: mysql < server/db/init.sql

CREATE DATABASE IF NOT EXISTS giridhar_construction
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE giridhar_construction;

DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE,
  sector VARCHAR(120) NOT NULL DEFAULT '',
  website VARCHAR(200) DEFAULT '',
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
INSERT INTO clients (name, sector, website) VALUES
  ('Assetz Property Group', 'Real Estate Developer', 'https://www.assetzproperty.com'),
  ('Puravankara', 'Real Estate Developer', 'https://www.puravankara.com'),
  ('Provident Housing', 'Real Estate Developer', 'https://www.providenthousing.com'),
  ('Nambiar Builders', 'Real Estate Developer', 'https://www.nambiarbuilders.com'),
  ('Sattva Group', 'Real Estate Developer', 'https://www.sattvagroup.com'),
  ('Shirasa Construction', 'Infrastructure & Construction', ''),
  ('Other', 'Various', '');

-- Seed projects
INSERT INTO projects
  (client_id, title, project_type, status, location, description, start_date, end_date, image_url) VALUES
  (1, 'Assetz The Secret Lake', 'Infrastructure', 'Under Progress', 'Bengaluru, Karnataka',
   'Comprehensive external infrastructure, internal road networks, storm water drainage, RCC drains and paving works for Assetz The Secret Lake township.',
   '2024-05-10', NULL,
   '/projects/site-01.jpg'),
  (3, 'Provident Deansgate', 'Road Work', 'Under Progress', 'IVC Road, Bengaluru, Karnataka',
   'External road development, asphalt paving, concrete approaches, and external civil infrastructure for Provident Deansgate development.',
   '2024-08-15', NULL,
   '/projects/site-05.jpg'),
  (4, 'Nambiar District 25', 'Infrastructure', 'Under Progress', 'Sarjapur Road, Bengaluru, Karnataka',
   'Large-scale township internal roads, RCC retaining walls, storm water drain network, and asphalt road construction for Nambiar District 25.',
   '2024-09-01', NULL,
   '/projects/site-12.jpg'),
  (6, 'Sattva - Shirasa Construction Pvt Ltd', 'External Civil', 'Under Progress', 'Bengaluru, Karnataka',
   'External civil works, retaining walls, RCC drains, concrete pavement and asphalt works for Sattva - Shirasa Construction project.',
   '2024-11-20', NULL,
   '/projects/site-20.jpg'),
  (4, 'Nambiar Enterprises LLP - Nambiar Bannerghatta Bilwardahalli Ph-01', 'Road Work', 'Under Progress', 'Bannerghatta - Bilwardahalli, Bengaluru, Karnataka',
   'Phase 01 road infrastructure, paver installation, kerb works, site grading, and asphalt paving for Nambiar Bannerghatta development.',
   '2025-01-10', NULL,
   '/projects/site-28.jpg'),
  (2, 'Puravankara Sounds of Water', 'Road Work', 'Completed', 'Bannerghatta Road, Bengaluru, Karnataka',
   'Premium internal asphalt road network, designer paver work, hardscape features and comprehensive drainage infrastructure.',
   '2023-01-15', '2023-09-30',
   '/projects/site-35.jpg'),
  (5, 'Sattva Green Groves', 'Infrastructure', 'Completed', 'Nelamangala, Bengaluru, Karnataka',
   'Complete plotted layout infrastructure, asphalt roads, RCC drain network, retaining walls, and utility corridors.',
   '2023-04-10', '2023-12-20',
   '/projects/site-42.jpg'),
  (5, 'Sattva Bhumi', 'Concrete', 'Completed', 'Bengaluru, Karnataka',
   'PQC concrete roads, heavy-duty asphalt main corridors, paver walkways, and external civil works.',
   '2023-08-01', '2024-04-15',
   '/projects/site-48.jpg'),
  (1, 'Assetz Marq', 'Hardscape', 'Completed', 'Whitefield, Bengaluru, Karnataka',
   'High-specification internal asphalt roads, perimeter RCC drains, hardscaping, paver walkways, and external civil finishing.',
   '2023-10-05', '2024-06-30',
   '/projects/site-53.jpg'),
  (1, 'Assetz Bloom and Dell', 'Paver', 'Completed', 'Whitefield, Bengaluru, Karnataka',
   'External civil infrastructure, asphalt roads, interlocking paver blocks, retaining structures, and landscape hardscape.',
   '2024-02-12', '2024-11-25',
   '/projects/site-58.jpg');
