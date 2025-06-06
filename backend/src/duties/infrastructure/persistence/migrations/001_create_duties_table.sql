CREATE TABLE IF NOT EXISTS duties (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  type_id UUID NOT NULL REFERENCES types(id),
  deleted BOOLEAN NOT NULL DEFAULT FALSE
); 