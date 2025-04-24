-- Drop existing tables and indexes
DROP INDEX IF EXISTS idx_duties_type_id;
DROP TABLE IF EXISTS duty_logs;
DROP TABLE IF EXISTS duties;
DROP TABLE IF EXISTS types;

-- Create types table
CREATE TABLE types (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create duties table
CREATE TABLE duties (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    type_id UUID NOT NULL REFERENCES types(id)
);

-- Create duty_logs table
CREATE TABLE duty_logs (
    id UUID PRIMARY KEY,
    duty_id UUID NOT NULL REFERENCES duties(id),
    action VARCHAR(50) NOT NULL,
    details TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_duties_type_id ON duties(type_id);
CREATE INDEX idx_duty_logs_duty_id ON duty_logs(duty_id);

-- Insert initial types
INSERT INTO types (id, name) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Work'),
    ('22222222-2222-2222-2222-222222222222', 'Personal'),
    ('33333333-3333-3333-3333-333333333333', 'Shopping'),
    ('44444444-4444-4444-4444-444444444444', 'Health');

-- Insert sample duties
INSERT INTO duties (id, name, description, completed, created_at, updated_at, type_id) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Complete project documentation', 'Write comprehensive documentation for the project including API endpoints and database schema', false, NOW(), NOW(), '11111111-1111-1111-1111-111111111111'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Go to the gym', 'Complete a 1-hour workout session focusing on strength training', true, NOW(), NOW(), '44444444-4444-4444-4444-444444444444'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Buy groceries', 'Purchase weekly groceries including fruits, vegetables, and household items', false, NOW(), NOW(), '33333333-3333-3333-3333-333333333333'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Call family', 'Schedule a video call with family members to catch up', false, NOW(), NOW(), '22222222-2222-2222-2222-222222222222'); 