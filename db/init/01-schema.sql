-- Core tables
CREATE TABLE programs (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    abbreviation VARCHAR(10) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    data_collection_method ENUM('csv', 'excel', 'form') NOT NULL,
    data_collection_config JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE program_steps (
    program_id VARCHAR(36),
    step_name VARCHAR(50),
    is_enabled BOOLEAN DEFAULT true,
    PRIMARY KEY (program_id, step_name),
    FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
);

CREATE TABLE participants (
    id VARCHAR(36) PRIMARY KEY,
    program_id VARCHAR(36) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    property_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    assigned_advisor_id VARCHAR(36),
    on_hold BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (program_id) REFERENCES programs(id)
);

-- Team tables
CREATE TABLE energy_advisors (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    title VARCHAR(100),
    certification_level ENUM('JUNIOR', 'INTERMEDIATE', 'SENIOR') NOT NULL,
    total_contract_units INT NOT NULL DEFAULT 0,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE advisor_service_areas (
    advisor_id VARCHAR(36),
    service_area VARCHAR(100),
    PRIMARY KEY (advisor_id, service_area),
    FOREIGN KEY (advisor_id) REFERENCES energy_advisors(id) ON DELETE CASCADE
);

CREATE TABLE advisor_programs (
    advisor_id VARCHAR(36),
    program_id VARCHAR(36),
    PRIMARY KEY (advisor_id, program_id),
    FOREIGN KEY (advisor_id) REFERENCES energy_advisors(id) ON DELETE CASCADE,
    FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
);

CREATE TABLE advisor_preferred_days (
    advisor_id VARCHAR(36),
    day_of_week VARCHAR(10),
    PRIMARY KEY (advisor_id, day_of_week),
    FOREIGN KEY (advisor_id) REFERENCES energy_advisors(id) ON DELETE CASCADE
);

-- Audit and scheduling tables
CREATE TABLE audits (
    id VARCHAR(36) PRIMARY KEY,
    participant_id VARCHAR(36) NOT NULL,
    advisor_id VARCHAR(36) NOT NULL,
    type ENUM('INITIAL', 'FINAL') NOT NULL,
    scheduled_date DATE NOT NULL,
    scheduled_time TIME NOT NULL,
    status ENUM('SCHEDULED', 'COMPLETED', 'CANCELLED') NOT NULL,
    report_uploaded BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (participant_id) REFERENCES participants(id),
    FOREIGN KEY (advisor_id) REFERENCES energy_advisors(id)
);

-- Technical review and quotes tables
CREATE TABLE technical_reviews (
    id VARCHAR(36) PRIMARY KEY,
    audit_id VARCHAR(36) NOT NULL,
    reviewer_id VARCHAR(36) NOT NULL,
    status ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED') NOT NULL,
    notes TEXT,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (audit_id) REFERENCES audits(id)
);

CREATE TABLE contractors (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    is_preferred BOOLEAN DEFAULT false,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quotes (
    id VARCHAR(36) PRIMARY KEY,
    participant_id VARCHAR(36) NOT NULL,
    contractor_id VARCHAR(36) NOT NULL,
    status ENUM('DRAFT', 'SENT', 'RECEIVED', 'APPROVED', 'REJECTED') NOT NULL,
    total_amount DECIMAL(10,2),
    valid_until DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (participant_id) REFERENCES participants(id),
    FOREIGN KEY (contractor_id) REFERENCES contractors(id)
);

-- Work orders and completion tracking
CREATE TABLE work_orders (
    id VARCHAR(36) PRIMARY KEY,
    quote_id VARCHAR(36) NOT NULL,
    status ENUM('DRAFT', 'SENT', 'IN_PROGRESS', 'COMPLETED') NOT NULL,
    start_date DATE,
    completion_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quote_id) REFERENCES quotes(id)
);

-- Dynamic form data tables (created per program)
-- These will be created dynamically when a new program is added with custom form
-- Example: program_data_residential_savings
CREATE TABLE IF NOT EXISTS program_data_template (
    id VARCHAR(36) PRIMARY KEY,
    participant_id VARCHAR(36) NOT NULL,
    field_data JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (participant_id) REFERENCES participants(id)
);