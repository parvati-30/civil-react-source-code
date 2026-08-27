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
  ('Puravankara', 'Real Estate Developer', 'https://www.puravankara.com'),
  ('Sattva', 'Real Estate Developer', 'https://www.sattvagroup.com'),
  ('Lodha', 'Real Estate Developer', 'https://www.lodhagroup.com'),
  ('DENSGATE', 'Infrastructure Developer', ''),
  ('Phoenix', 'Real Estate & Retail', 'https://www.thephoenixmills.com'),
  ('Other', 'Various', '');

-- Seed projects
INSERT INTO projects
  (client_id, title, project_type, status, location, description, start_date, end_date, image_url) VALUES
  (1, 'Puravankara Road & Street Network', 'Road Work', 'Completed', 'Bengaluru, Karnataka',
   'Complete internal road network with asphalt paving for Puravankara residential township.',
   '2023-02-10', '2023-08-30',
   'https://images.unsplash.com/photo-1516000462788-5db3f4384d8c?w=900&q=80'),
  (1, 'Puravankara Township Concrete Pavement', 'Concrete', 'Under Progress', 'Bengaluru, Karnataka',
   'RCC concrete pavement for internal roads and hardstanding areas within the township.',
   '2024-11-01', NULL,
   'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80'),
  (2, 'Sattva Group Infrastructure Development', 'Infrastructure', 'Completed', 'Chennai, Tamil Nadu',
   'Site development including earthwork, drainage and approach roads for Sattva project.',
   '2023-06-15', '2024-03-20',
   'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80'),
  (2, 'Sattva Retaining Wall & RCC Drain Works', 'Infrastructure', 'Under Progress', 'Chennai, Tamil Nadu',
   'External development works including retaining walls, RCC drains and storm water channels for Sattva residential project.',
   '2025-01-05', NULL,
   'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80'),
  (3, 'Lodha Boulevard Road Works', 'Road Work', 'Completed', 'Thane, Maharashtra',
   'Main boulevard road construction with hot-mix asphalt layer for Lodha township.',
   '2022-09-12', '2023-04-28',
   'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=900&q=80'),
  (3, 'Lodha Concrete Internal Roads', 'Concrete', 'Completed', 'Thane, Maharashtra',
   'Cement concrete internal roads, 200mm thick, with expansion joints for Lodha phase 2.',
   '2023-05-02', '2023-12-15',
   'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80'),
  (3, 'Lodha Paver & Hardscape Development', 'Paver', 'Completed', 'Thane, Maharashtra',
   'Interlocking paver works, kerb works and external hardscape finishing for Lodha common areas.',
   '2024-01-10', '2024-06-20',
   'https://images.unsplash.com/photo-1516000462788-5db3f4384d8c?w=900&q=80'),
  (4, 'DENSGATE Industrial Zone Development', 'Infrastructure', 'Under Progress', 'Chakan, Maharashtra',
   'Industrial zone infrastructure including internal roads, storm water drains and utilities corridor.',
   '2024-08-01', NULL,
   'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=900&q=80'),
  (4, 'DENSGATE Asphalt Main Corridor', 'Asphalt', 'Completed', 'Chakan, Maharashtra',
   'Heavy-duty asphalt corridor for industrial traffic with DBM and BC layers.',
   '2023-10-10', '2024-06-25',
   'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80'),
  (5, 'Phoenix Mall Parking & Approach', 'Concrete', 'Completed', 'Pune, Maharashtra',
   'PQC concrete pavement for multi-level mall parking approach and service roads.',
   '2023-01-20', '2023-09-30',
   'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80'),
  (5, 'Phoenix External Civil & Hardscape Works', 'External Civil', 'Under Progress', 'Pune, Maharashtra',
   'External civil works including block masonry, plastering, kerb works and paver finishing for Phoenix development.',
   '2025-02-10', NULL,
   'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80'),
  (6, 'Mall Parking Paver & Kerb Works', 'Hardscape', 'Completed', 'Bengaluru, Karnataka',
   'Kerb works, paver block installation and walkway hardscape development for commercial retail plaza.',
   '2024-03-15', '2024-09-10',
   'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80');
