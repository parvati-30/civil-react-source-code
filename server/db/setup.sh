#!/usr/bin/env bash
# Set up MariaDB database for J.Giridhar Construction Company
set -e

DB_USER="${DB_USER:-giridhar}"
DB_PASS="${DB_PASS:-giridhar_db_2024}"
DB_NAME="${DB_NAME:-giridhar_construction}"

echo "Creating database '$DB_NAME' and user '$DB_USER'..."
mysql -e "CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Create user if not exists and grant privileges
mysql -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';"
mysql -e "CREATE USER IF NOT EXISTS '$DB_USER'@'127.0.0.1' IDENTIFIED BY '$DB_PASS';"
mysql -e "GRANT ALL PRIVILEGES ON \`$DB_NAME\`.* TO '$DB_USER'@'localhost';"
mysql -e "GRANT ALL PRIVILEGES ON \`$DB_NAME\`.* TO '$DB_USER'@'127.0.0.1';"
mysql -e "FLUSH PRIVILEGES;"

echo "Loading schema and seed data..."
mysql "$DB_NAME" < "$(dirname "$0")/init.sql"

echo "Database setup complete."
