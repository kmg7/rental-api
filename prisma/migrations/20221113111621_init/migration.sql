BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [role] VARCHAR(20) NOT NULL CONSTRAINT [User_role_df] DEFAULT 'NotVerified',
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [User_role_key] UNIQUE NONCLUSTERED ([role]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Rental] (
    [id] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [plate] NVARCHAR(1000) NOT NULL,
    [brand] NVARCHAR(1000) NOT NULL,
    [model] NVARCHAR(1000) NOT NULL,
    [year] INT NOT NULL,
    [travelled] INT NOT NULL,
    [priceMonthly] FLOAT(53) NOT NULL,
    [priceDayly] FLOAT(53) NOT NULL,
    [clientId] NVARCHAR(1000),
    CONSTRAINT [Rental_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Rental_plate_key] UNIQUE NONCLUSTERED ([plate])
);

-- CreateTable
CREATE TABLE [dbo].[Bill] (
    [id] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [travelled] INT NOT NULL,
    [charge] FLOAT(53) NOT NULL,
    [rentalId] NVARCHAR(1000) NOT NULL,
    [clientId] NVARCHAR(1000) NOT NULL,
    [isCharged] BIT NOT NULL CONSTRAINT [Bill_isCharged_df] DEFAULT 0,
    CONSTRAINT [Bill_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Rental] ADD CONSTRAINT [Rental_clientId_fkey] FOREIGN KEY ([clientId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Bill] ADD CONSTRAINT [Bill_rentalId_fkey] FOREIGN KEY ([rentalId]) REFERENCES [dbo].[Rental]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Bill] ADD CONSTRAINT [Bill_clientId_fkey] FOREIGN KEY ([clientId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
