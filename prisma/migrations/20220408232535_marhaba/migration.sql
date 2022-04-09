-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `user_name` VARCHAR(30) NOT NULL,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `email` VARCHAR(60) NOT NULL,
    `phone_number` VARCHAR(30) NOT NULL,
    `password` VARCHAR(120) NOT NULL,
    `role` VARCHAR(15) NOT NULL,
    `image` VARCHAR(60) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins` (
    `admin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clients` (
    `client_id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(120) NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `deliverers` (
    `deliverer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`deliverer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `announcement_meal` (
    `announcement_id` INTEGER NOT NULL,
    `meal_id` INTEGER NOT NULL,

    INDEX `meal_id`(`meal_id`),
    PRIMARY KEY (`announcement_id`, `meal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `announcements` (
    `announcement_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(120) NOT NULL,
    `description` TEXT NOT NULL,
    `price` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`announcement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `global_commands` (
    `command_number` INTEGER NOT NULL AUTO_INCREMENT,
    `total_price` INTEGER NOT NULL DEFAULT 0,
    `total_quantity` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(30) NOT NULL DEFAULT 'packaged',
    `taken` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`command_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoices` (
    `invoice_id` INTEGER NOT NULL AUTO_INCREMENT,
    `gl_command_num` INTEGER NOT NULL,
    `client_id` INTEGER NOT NULL,
    `delivery_date` DATETIME(0) NOT NULL,
    `payment_date` DATETIME(0) NOT NULL,

    INDEX `client_id`(`client_id`),
    INDEX `gl_command_num`(`gl_command_num`),
    PRIMARY KEY (`invoice_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meal_commands` (
    `command_id` INTEGER NOT NULL AUTO_INCREMENT,
    `meal_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `total_price` INTEGER NOT NULL,

    INDEX `meal_id`(`meal_id`),
    PRIMARY KEY (`command_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meal_pictures` (
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(120) NOT NULL,
    `meal_id` INTEGER NOT NULL,

    INDEX `meal_id`(`meal_id`),
    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meals` (
    `meal_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(120) NOT NULL,
    `description` TEXT NOT NULL,
    `price` INTEGER NOT NULL,
    `type` ENUM('starter', 'main', 'dessert', '') NOT NULL,

    PRIMARY KEY (`meal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taken_commands` (
    `deliverer_id` INTEGER NOT NULL,
    `gl_command_num` INTEGER NOT NULL,

    INDEX `gl_command_num`(`gl_command_num`),
    PRIMARY KEY (`deliverer_id`, `gl_command_num`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `announc_commands` (
    `command_id` INTEGER NOT NULL AUTO_INCREMENT,
    `announcement_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `total_price` INTEGER NOT NULL,

    INDEX `announcement_id`(`announcement_id`),
    PRIMARY KEY (`command_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `global_announ_commands` (
    `gl_command_num` INTEGER NOT NULL,
    `announ_command_id` INTEGER NOT NULL,

    INDEX `announ_command_id`(`announ_command_id`),
    PRIMARY KEY (`gl_command_num`, `announ_command_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `global_meals_commands` (
    `gl_command_num` INTEGER NOT NULL,
    `meal_command_id` INTEGER NOT NULL,

    INDEX `meal_command_id`(`meal_command_id`),
    PRIMARY KEY (`gl_command_num`, `meal_command_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `clients` ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `deliverers` ADD CONSTRAINT `deliverers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `announcement_meal` ADD CONSTRAINT `announcement_meal_ibfk_1` FOREIGN KEY (`announcement_id`) REFERENCES `announcements`(`announcement_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `announcement_meal` ADD CONSTRAINT `announcement_meal_ibfk_2` FOREIGN KEY (`meal_id`) REFERENCES `meals`(`meal_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients`(`client_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`gl_command_num`) REFERENCES `global_commands`(`command_number`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `meal_commands` ADD CONSTRAINT `meal_commands_ibfk_1` FOREIGN KEY (`meal_id`) REFERENCES `meals`(`meal_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `meal_pictures` ADD CONSTRAINT `meal_pictures_ibfk_1` FOREIGN KEY (`meal_id`) REFERENCES `meals`(`meal_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `taken_commands` ADD CONSTRAINT `taken_commands_ibfk_2` FOREIGN KEY (`deliverer_id`) REFERENCES `deliverers`(`deliverer_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `taken_commands` ADD CONSTRAINT `taken_commands_ibfk_1` FOREIGN KEY (`gl_command_num`) REFERENCES `global_commands`(`command_number`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `announc_commands` ADD CONSTRAINT `announc_commands_ibfk_1` FOREIGN KEY (`announcement_id`) REFERENCES `announcements`(`announcement_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `global_announ_commands` ADD CONSTRAINT `global_announ_commands_ibfk_1` FOREIGN KEY (`gl_command_num`) REFERENCES `global_commands`(`command_number`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `global_announ_commands` ADD CONSTRAINT `global_announ_commands_ibfk_2` FOREIGN KEY (`announ_command_id`) REFERENCES `announc_commands`(`command_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `global_meals_commands` ADD CONSTRAINT `global_meals_commands_ibfk_1` FOREIGN KEY (`gl_command_num`) REFERENCES `global_commands`(`command_number`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `global_meals_commands` ADD CONSTRAINT `global_meals_commands_ibfk_2` FOREIGN KEY (`meal_command_id`) REFERENCES `meal_commands`(`command_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
