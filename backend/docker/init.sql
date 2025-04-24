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
    type_id UUID NOT NULL REFERENCES types(id),
    deleted BOOLEAN DEFAULT FALSE
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

-- Insert sample duties (including some deleted ones)
INSERT INTO duties (id, name, description, completed, created_at, updated_at, type_id, deleted) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Complete project documentation', 'Write comprehensive documentation for the project including API endpoints and database schema', false, NOW(), NOW(), '11111111-1111-1111-1111-111111111111', false),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Go to the gym', 'Complete a 1-hour workout session focusing on strength training', true, NOW(), NOW(), '44444444-4444-4444-4444-444444444444', false),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Buy groceries', 'Purchase weekly groceries including fruits, vegetables, and household items', false, NOW(), NOW(), '33333333-3333-3333-3333-333333333333', false),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Call family', 'Schedule a video call with family members to catch up', false, NOW(), NOW(), '22222222-2222-2222-2222-222222222222', false),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Old task 1', 'This is a deleted task', true, NOW(), NOW(), '11111111-1111-1111-1111-111111111111', true),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Old task 2', 'Another deleted task', false, NOW(), NOW(), '22222222-2222-2222-2222-222222222222', true);

-- Insert duty logs for creation of each duty
INSERT INTO duty_logs (id, duty_id, action, details, created_at) VALUES
    ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'CREATE', 'Duty created: Complete project documentation', NOW()),
    ('22222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'CREATE', 'Duty created: Go to the gym', NOW()),
    ('33333333-3333-3333-3333-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'CREATE', 'Duty created: Buy groceries', NOW()),
    ('44444444-4444-4444-4444-444444444444', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'CREATE', 'Duty created: Call family', NOW()),
    ('55555555-5555-5555-5555-555555555555', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'CREATE', 'Duty created: Old task 1', NOW()),
    ('66666666-6666-6666-6666-666666666666', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'CREATE', 'Duty created: Old task 2', NOW()); 