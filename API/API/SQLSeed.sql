-- SEED DEMO AssetTracker

BEGIN TRANSACTION;

-- Declare global variablse for test user
DECLARE @UserEmail NVARCHAR(100) = 'testuser@test.com';
DECLARE @UserName  NVARCHAR(100) = 'Test';

-- Cleanup (Delete existing records)
DELETE FROM IssueReports;
DELETE FROM AssignmentHistories;
DELETE FROM Assets;

-- Assets Insert
INSERT INTO Assets (
    AssetTag, AssetType, Manufacturer, Model, SerialNumber,
    Status, CurrentOwnerEmail, CurrentOwnerName,
    PurchaseDate, WarrantyExpiry, NextMaintenanceDate,
    Location, Notes, CreatedDate, UpdatedDate
)
VALUES
('LAP-001', 'Laptop', 'Lenovo', 'ThinkPad X1 Carbon Gen 11', 'SN-LEN-X1C-0001',
 'Assigned', @UserEmail, @UserName,
 '2024-03-10', '2027-03-10', DATEADD(month, 6, GETUTCDATE()),
 'Copenhagen', 'Primary development laptop', GETUTCDATE(), GETUTCDATE()),

('MON-001', 'Monitor', 'Dell', 'UltraSharp U2723QE', 'SN-DELL-27U-0001',
 'Assigned', @UserEmail, @UserName,
 '2024-02-15', '2027-02-15', NULL,
 'Copenhagen', 'Main workstation monitor', GETUTCDATE(), GETUTCDATE()),

('MOUS-001', 'Mouse', 'Logitech', 'MX Master 3', 'SN-LOGI-MX3-0001',
 'Assigned', @UserEmail, @UserName,
 '2024-01-20', '2026-01-20', NULL,
 'Copenhagen', 'Work mouse', GETUTCDATE(), GETUTCDATE()),

('LAP-002', 'Laptop', 'Lenovo', 'ThinkBook 14 Gen 5', 'SN-LEN-TB14-0002',
 'Available', NULL, NULL,
 '2024-04-25', '2027-04-25', NULL,
 'Vejle', 'Backup team laptop', GETUTCDATE(), GETUTCDATE()),

('KEYB-001', 'Keyboard', 'Logitech', 'MX Keys', 'SN-LOGI-MXK-0001',
 'Available', NULL, NULL,
 '2024-01-20', '2026-01-20', NULL,
 'Copenhagen', 'For new onboarding setup', GETUTCDATE(), GETUTCDATE()),

('PHO-001', 'Phone', 'Apple', 'iPhone 15', 'SN-IPH15-0001',
 'Assigned', 'sara.larsen@company.com', 'Sara Larsen',
 '2024-05-05', '2026-05-05', NULL,
 'Vejle', 'Work smartphone (iOS)', GETUTCDATE(), GETUTCDATE()),

('PHO-002', 'Phone', 'Samsung', 'Galaxy S24', 'SN-SAMS-S24-0001',
 'Assigned', 'bob.johnson@company.com', 'Bob Johnson',
 '2024-07-01', '2026-07-01', NULL,
 'Copenhagen', 'Android test device', GETUTCDATE(), GETUTCDATE());

 -- Declare Assets IDs - you cannot hardcode it, because DB can assign different ID's
DECLARE 
    @LAP001 INT = (SELECT Id FROM Assets WHERE AssetTag = 'LAP-001'),
    @LAP002 INT = (SELECT Id FROM Assets WHERE AssetTag = 'LAP-002'),
    @MON001 INT = (SELECT Id FROM Assets WHERE AssetTag = 'MON-001'),
    @MOUS001 INT = (SELECT Id FROM Assets WHERE AssetTag = 'MOUS-001'),
    @KEYB001 INT = (SELECT Id FROM Assets WHERE AssetTag = 'KEYB-001'),
    @PHO001 INT = (SELECT Id FROM Assets WHERE AssetTag = 'PHO-001'),
    @PHO002 INT = (SELECT Id FROM Assets WHERE AssetTag = 'PHO-002');

-- AssignmentHistories Seed
INSERT INTO AssignmentHistories
(AssetId, EmployeeEmail, EmployeeName, AssignedDate, ReturnedDate, AssignmentNotes)
VALUES
(@LAP001, @UserEmail, @UserName, DATEADD(month, -1, GETUTCDATE()), NULL, 'Primary laptop issued.'),
(@MON001, @UserEmail, @UserName, DATEADD(month, -1, GETUTCDATE()), NULL, 'Monitor paired with laptop.'),
(@MOUS001, @UserEmail, @UserName, DATEADD(month, -6, GETUTCDATE()), NULL, 'Assigned for ergonomic setup.'),
(@PHO001, 'sara.larsen@company.com', 'Sara Larsen', DATEADD(month, -2, GETUTCDATE()), NULL, 'Issued to marketing.'),
(@PHO002, 'bob.johnson@company.com', 'Bob Johnson', DATEADD(month, -2, GETUTCDATE()), NULL, 'Issued to QA / testing.');

-- Issue Reports Seed
INSERT INTO IssueReports
(AssetId, ReportedByEmail, ReportedByName, IssueDate, Description,
 Status, Priority, ResolvedDate, ResolvedByEmail, ResolvedByName, ResolutionNotes)
VALUES
(@LAP001, @UserEmail, @UserName, DATEADD(day, -5, GETUTCDATE()),
 'Fan occasionally gets noisy under heavy load.',
 'Open', 'Medium', NULL, NULL, NULL, NULL),
(@MON001, @UserEmail, @UserName, DATEADD(day, -15, GETUTCDATE()),
 'Occasional flicker after resume from sleep.',
 'InProgress', 'Low', NULL, 'it.admin@company.com', 'IT Admin', 'Investigating cable or driver.'),
(@PHO001, 'sara.larsen@company.com', 'Sara Larsen', DATEADD(day, -10, GETUTCDATE()),
 'Touch ID intermittently fails to register.',
 'Open', 'Low', NULL, NULL, NULL, NULL);

 COMMIT TRANSACTION;