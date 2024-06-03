-- ALTER SYSTEM SET shared_buffers TO 2GB;
-- ALTER SYSTEM SET effective_cache_size TO 4GB;
-- ALTER SYSTEM SET work_mem TO 16MB;
-- ALTER SYSTEM SET maintenance_work_mem TO 512MB;
-- ALTER SYSTEM SET temp_file_limit TO 10GB;
-- ALTER SYSTEM SET log_min_duration_statement TO '200ms';
-- ALTER SYSTEM SET idle_in_transaction_session_timeout='10s';
-- ALTER SYSTEM SET lock_timeout TO 1s;
-- ALTER SYSTEM SET  statement_timeout TO 60s;
-- ALTER SYSTEM SET shared_preload_libraries TO 'pg_stat_statements';
-- ALTER SYSTEM SET pg_stat_statements.max = 10000;
-- ALTER SYSTEM SET pg_stat_statements.track = 'all'

CREATE TABLE IF NOT EXISTS elements (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  type varchar(255) NOT NULL,
  dimensions varchar(255) NOT NULL,
  weight float4 NOT NULL,
  file varchar(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS textures (
  id SERIAL PRIMARY KEY,
  type varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  image varchar(255),
  status boolean,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS element2texture (
  id SERIAL PRIMARY KEY,
  element_id int NOT NULL,
  texture_id int NOT NULL,
  cost DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS solution2element (
  id SERIAL PRIMARY KEY,
  element2texture_id int UNIQUE NOT NULL,
  solution_id int NOT NULL,
  quantity int NOT NULL
);

CREATE TABLE IF NOT EXISTS solution (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  image varchar(512),
  file varchar(512),
  length int,
  height int,
  width int,
  weight int,
  user_id int,
  subcategory_id int,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subcategories (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  category_id int,
  video_link varchar(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS delivery_methods (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  description varchar(5000),
  cost decimal(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payment_methods (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  description varchar(5000),
  payed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS restrictions (
  max_length int,
  max_width int,
  max_height int,
  min_length int,
  min_width int,
  min_height int,
  vh_ration int,
  facade_ratio int,
  ribs_status boolean
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id int NOT NULL,
  solution_id int,
  status varchar(255),
  city varchar(255),
  street varchar(255),
  building varchar(255),
  flat varchar(255),
  comment varchar(5000),
  payment_method_id int NOT NULL,
  delivery_method_id int NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name varchar(1048),
  phone varchar(50) UNIQUE,
  email varchar(255) UNIQUE,
  password varchar(255),
  email_ver boolean,
  phone_ver boolean,
  token varchar(512),
  role int NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_box (
  id SERIAL PRIMARY KEY,
  user_id int NOT NULL,
  element_id int UNIQUE NOT NULL,
  quantity int NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE saved (
  id SERIAL PRIMARY KEY,
  user_id int,
  solution_id int,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE instruments (
  id SERIAL PRIMARY KEY,
  name varchar(512),
  cost decimal(10, 2),
  image varchar(255),
  comment varchar(1024)
);

CREATE TABLE instrument2order (
  id SERIAL PRIMARY KEY,
  instrument_id int NOT NULL,
  order_id int NOT NULL,
  quantity int NOT NULL
);

ALTER TABLE instrument2order ADD FOREIGN KEY (instrument_id) REFERENCES instruments (id);

ALTER TABLE instrument2order ADD FOREIGN KEY (order_id) REFERENCES orders (id);

ALTER TABLE saved ADD FOREIGN KEY (solution_id) REFERENCES solution (id);

ALTER TABLE saved ADD FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE user_box ADD FOREIGN KEY (element_id) REFERENCES elements (id);

ALTER TABLE user_box ADD FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE solution ADD FOREIGN KEY (subcategory_id) REFERENCES subcategories (id);

ALTER TABLE subcategories ADD FOREIGN KEY (category_id) REFERENCES categories (id);

ALTER TABLE solution2element ADD FOREIGN KEY (solution_id) REFERENCES solution (id);

ALTER TABLE solution2element ADD FOREIGN KEY (element2texture_id) REFERENCES element2texture (id);

ALTER TABLE orders ADD FOREIGN KEY (solution_id) REFERENCES solution (id);

ALTER TABLE orders ADD FOREIGN KEY (delivery_method_id) REFERENCES delivery_methods (id);

ALTER TABLE orders ADD FOREIGN KEY (payment_method_id) REFERENCES payment_methods (id);

ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE element2texture ADD FOREIGN KEY (element_id) REFERENCES elements (id);

ALTER TABLE element2texture ADD FOREIGN KEY (texture_id) REFERENCES textures (id);