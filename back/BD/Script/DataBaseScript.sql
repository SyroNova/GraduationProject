-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema thesis
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema thesis
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `thesis` DEFAULT CHARACTER SET utf8mb3 ;
USE `thesis` ;

-- -----------------------------------------------------
-- Table `thesis`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`role` (
  `idRole` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRole`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`user` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `name` VARCHAR(45) NOT NULL,
  `document` VARCHAR(45) NOT NULL,
  `documentType` ENUM('CC', 'TI', 'CE') NOT NULL COMMENT 'Enum contiene los tipos de cedula',
  `passwordHash` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `birthDate` DATE NULL DEFAULT NULL,
  `actualCity` VARCHAR(45) NULL DEFAULT NULL,
  `gender` VARCHAR(45) NULL DEFAULT 'NA',
  `idRole` INT NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `iduser_UNIQUE` (`idUser` ASC) VISIBLE,
  UNIQUE INDEX `document_UNIQUE` (`document` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_user_role_idx` (`idRole` ASC) VISIBLE,
  CONSTRAINT `fk_user_role`
    FOREIGN KEY (`idRole`)
    REFERENCES `thesis`.`role` (`idRole`))
ENGINE = InnoDB
AUTO_INCREMENT = 29
DEFAULT CHARACTER SET = utf8mb3
COMMENT = 'Terminar de hacer el typeCC ';


-- -----------------------------------------------------
-- Table `thesis`.`resume`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`resume` (
  `idResume` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NOT NULL,
  PRIMARY KEY (`idResume`),
  UNIQUE INDEX `user_iduser_UNIQUE` (`idUser` ASC) VISIBLE,
  INDEX `fk_resume_user1_idx` (`idUser` ASC) VISIBLE,
  CONSTRAINT `fk_resume_user1`
    FOREIGN KEY (`idUser`)
    REFERENCES `thesis`.`user` (`idUser`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`academic_experience`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`academic_experience` (
  `idAcademicExperience` INT NOT NULL AUTO_INCREMENT,
  `idResume` INT NOT NULL,
  `degree` VARCHAR(45) NOT NULL,
  `institution` VARCHAR(45) NOT NULL,
  `dateStart` DATE NOT NULL,
  `dateEnd` DATE NULL DEFAULT NULL,
  `description` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`idAcademicExperience`),
  INDEX `fk_academic_experience_resume1_idx` (`idResume` ASC) VISIBLE,
  CONSTRAINT `fk_academic_experience_resume1`
    FOREIGN KEY (`idResume`)
    REFERENCES `thesis`.`resume` (`idResume`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`audit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`audit` (
  `idAudit` INT NOT NULL AUTO_INCREMENT,
  `actorId` INT NULL DEFAULT NULL,
  `actorType` ENUM('USER', 'COMPANY', 'ADMIN', 'SYSTEM') NOT NULL,
  `action` VARCHAR(15) NOT NULL,
  `entityType` VARCHAR(50) NOT NULL,
  `entityId` INT NOT NULL,
  `oldValue` JSON NULL DEFAULT NULL,
  `newValue` JSON NOT NULL,
  `ipAddress` VARCHAR(45) NOT NULL,
  `userAgent` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idAudit`))
ENGINE = InnoDB
AUTO_INCREMENT = 49
DEFAULT CHARACTER SET = utf8mb3
COMMENT = 'Finish the enum of actorType';


-- -----------------------------------------------------
-- Table `thesis`.`company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`company` (
  `idCompany` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`idCompany`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`offers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`offers` (
  `idOffer` INT NOT NULL AUTO_INCREMENT,
  `idCompany` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `salaryMin` INT NOT NULL,
  `salaryMax` INT NULL DEFAULT NULL,
  `description` TEXT NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `contractType` ENUM('MEDIO_TIEMPO', 'TIEMPO_COMPLETO', 'POR_HORAS', 'TEMPORAL') NOT NULL,
  `expireDate` DATETIME NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idOffer`),
  INDEX `fk_Offers_Company1_idx` (`idCompany` ASC) VISIBLE,
  CONSTRAINT `fk_Offers_Company1`
    FOREIGN KEY (`idCompany`)
    REFERENCES `thesis`.`company` (`idCompany`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`comments` (
  `idComment` INT NOT NULL AUTO_INCREMENT,
  `idOffer` INT NOT NULL,
  `idUser` INT NULL DEFAULT NULL,
  `idCompany` INT NULL DEFAULT NULL,
  `idParentComment` INT NULL DEFAULT NULL,
  `content` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idComment`),
  INDEX `fk_Comments_Offers1_idx` (`idOffer` ASC) VISIBLE,
  INDEX `fk_Comments_User1_idx` (`idUser` ASC) VISIBLE,
  INDEX `fk_comments_company1_idx` (`idCompany` ASC) VISIBLE,
  CONSTRAINT `fk_comments_company1`
    FOREIGN KEY (`idCompany`)
    REFERENCES `thesis`.`company` (`idCompany`),
  CONSTRAINT `fk_Comments_Offers1`
    FOREIGN KEY (`idOffer`)
    REFERENCES `thesis`.`offers` (`idOffer`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_Comments_User1`
    FOREIGN KEY (`idUser`)
    REFERENCES `thesis`.`user` (`idUser`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`documents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`documents` (
  `idDocument` INT NOT NULL AUTO_INCREMENT,
  `file` MEDIUMBLOB NOT NULL,
  `fileName` VARCHAR(255) NOT NULL,
  `mimeType` VARCHAR(100) NOT NULL,
  `fileSize` INT UNSIGNED NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idDocument`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`notifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`notifications` (
  `idNotification` INT NOT NULL AUTO_INCREMENT,
  `recipientId` INT NOT NULL,
  `recipientType` ENUM('USER', 'COMPANY') NOT NULL,
  `type` ENUM('COMMENT_REPORTED', 'COMMENT_REPLY', 'OFFER_COMMENT', 'OFFER_REPORTED', 'COMPANY_REPORTED') NULL DEFAULT NULL,
  `referenceId` INT NOT NULL,
  `message` VARCHAR(255) NOT NULL,
  `isRead` TINYINT(1) NULL DEFAULT '0',
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `readAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`idNotification`),
  INDEX `idx_recipient` (`recipientId` ASC, `recipientType` ASC, `isRead` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`occupations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`occupations` (
  `idOccupation` CHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idOccupation`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`offers_documents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`offers_documents` (
  `idOffer` INT NOT NULL,
  `idDocument` INT NOT NULL,
  PRIMARY KEY (`idOffer`, `idDocument`),
  INDEX `fk_Offers_has_Documents_Documents1_idx` (`idDocument` ASC) VISIBLE,
  INDEX `fk_Offers_has_Documents_Offers1_idx` (`idOffer` ASC) VISIBLE,
  CONSTRAINT `fk_Offers_has_Documents_Documents1`
    FOREIGN KEY (`idDocument`)
    REFERENCES `thesis`.`documents` (`idDocument`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_Offers_has_Documents_Offers1`
    FOREIGN KEY (`idOffer`)
    REFERENCES `thesis`.`offers` (`idOffer`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`professional_profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`professional_profile` (
  `idProfessionalProfile` INT NOT NULL AUTO_INCREMENT,
  `idResume` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `resume` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idProfessionalProfile`),
  INDEX `fk_Professional_profile_Resume1_idx` (`idResume` ASC) VISIBLE,
  CONSTRAINT `fk_Professional_profile_Resume1`
    FOREIGN KEY (`idResume`)
    REFERENCES `thesis`.`resume` (`idResume`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`reports`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`reports` (
  `idReport` INT NOT NULL AUTO_INCREMENT,
  `reporterType` ENUM('USER', 'COMPANY') NOT NULL,
  `reporterId` INT NOT NULL,
  `targetType` ENUM('USER', 'COMPANY', 'OFFER', 'COMMENT') NOT NULL,
  `targetId` INT NOT NULL,
  `reason` MEDIUMTEXT NOT NULL,
  `status` ENUM('PENDING', 'REVIWED', 'RESOLVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `priority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'LOW',
  PRIMARY KEY (`idReport`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`resume_documents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`resume_documents` (
  `idResume` INT NOT NULL,
  `idDocument` INT NOT NULL,
  PRIMARY KEY (`idResume`, `idDocument`),
  INDEX `fk_Resume_has_Documents_Documents1_idx` (`idDocument` ASC) VISIBLE,
  INDEX `fk_Resume_has_Documents_Resume1_idx` (`idResume` ASC) VISIBLE,
  CONSTRAINT `fk_Resume_has_Documents_Documents1`
    FOREIGN KEY (`idDocument`)
    REFERENCES `thesis`.`documents` (`idDocument`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_Resume_has_Documents_Resume1`
    FOREIGN KEY (`idResume`)
    REFERENCES `thesis`.`resume` (`idResume`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`skills`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`skills` (
  `idSkill` CHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `type` ENUM('skill/competence', 'knowledge') NULL DEFAULT NULL,
  PRIMARY KEY (`idSkill`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`resume_skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`resume_skill` (
  `idResume` INT NOT NULL,
  `idSkill` CHAR(36) NOT NULL,
  `level` ENUM('principiante', 'intermedio', 'avanzado') NOT NULL,
  PRIMARY KEY (`idResume`, `idSkill`),
  INDEX `fk_Resume_has_Skills_Skills1_idx` (`idSkill` ASC) VISIBLE,
  INDEX `fk_Resume_has_Skills_Resume1_idx` (`idResume` ASC) VISIBLE,
  CONSTRAINT `fk_Resume_has_Skills_Resume1`
    FOREIGN KEY (`idResume`)
    REFERENCES `thesis`.`resume` (`idResume`),
  CONSTRAINT `fk_Resume_has_Skills_Skills1`
    FOREIGN KEY (`idSkill`)
    REFERENCES `thesis`.`skills` (`idSkill`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`session` (
  `idSession` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NOT NULL,
  `refreshToken` VARCHAR(500) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expiresAt` DATETIME NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idSession`),
  INDEX `idUser_idx` (`idUser` ASC) VISIBLE,
  CONSTRAINT `idUser`
    FOREIGN KEY (`idUser`)
    REFERENCES `thesis`.`user` (`idUser`))
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`skills_occupations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`skills_occupations` (
  `idSkill` CHAR(36) NOT NULL,
  `idOccupation` CHAR(36) NOT NULL,
  `relationType` ENUM('essential', 'optional', 'na') NULL DEFAULT NULL,
  PRIMARY KEY (`idSkill`, `idOccupation`),
  INDEX `fk_Skills_has_Occupations_Occupations1_idx` (`idOccupation` ASC) VISIBLE,
  INDEX `fk_Skills_has_Occupations_Skills1_idx` (`idSkill` ASC) VISIBLE,
  CONSTRAINT `fk_Skills_has_Occupations_Occupations1`
    FOREIGN KEY (`idOccupation`)
    REFERENCES `thesis`.`occupations` (`idOccupation`),
  CONSTRAINT `fk_Skills_has_Occupations_Skills1`
    FOREIGN KEY (`idSkill`)
    REFERENCES `thesis`.`skills` (`idSkill`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`sms_codes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`sms_codes` (
  `idSms` INT NOT NULL AUTO_INCREMENT,
  `phone` VARCHAR(45) NOT NULL,
  `code` VARCHAR(10) NOT NULL,
  `expiresAt` DATETIME NOT NULL,
  `attempts` INT NOT NULL DEFAULT '0',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idSms`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`user_fav_offers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`user_fav_offers` (
  `idUser` INT NOT NULL,
  `idOffer` INT NOT NULL,
  PRIMARY KEY (`idUser`, `idOffer`),
  INDEX `fk_user_has_ofertas_ofertas1_idx` (`idOffer` ASC) VISIBLE,
  INDEX `fk_user_has_ofertas_user1_idx` (`idUser` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_ofertas_ofertas1`
    FOREIGN KEY (`idOffer`)
    REFERENCES `thesis`.`offers` (`idOffer`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_user_has_ofertas_user1`
    FOREIGN KEY (`idUser`)
    REFERENCES `thesis`.`user` (`idUser`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thesis`.`work_experience`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`work_experience` (
  `idWorkExperience` INT NOT NULL AUTO_INCREMENT,
  `idResume` INT NOT NULL,
  `position` VARCHAR(255) NOT NULL,
  `dateStart` DATE NOT NULL,
  `dateEnd` DATE NULL DEFAULT NULL,
  `company` VARCHAR(45) NOT NULL,
  `description` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`idWorkExperience`),
  INDEX `fk_work_experience_resume1_idx` (`idResume` ASC) VISIBLE,
  CONSTRAINT `fk_work_experience_resume1`
    FOREIGN KEY (`idResume`)
    REFERENCES `thesis`.`resume` (`idResume`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;

USE `thesis` ;

-- -----------------------------------------------------
-- procedure sp_filter_offers
-- -----------------------------------------------------

DELIMITER $$
USE `thesis`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_filter_offers`(
    IN p_idUser INT,
    IN p_search VARCHAR(255),
    IN p_location VARCHAR(255),
    IN p_contractType VARCHAR(255),
    IN p_salaryMin INT,
    IN p_salaryMax INT,
    IN p_skills VARCHAR(255),
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    -- 1. Main paginated result set
    SELECT 
        o.*,
        c.name AS companyName, 
        c.location AS companyLocation,
        (ufo.idUser IS NOT NULL) AS isFavorite
    FROM offers o
    INNER JOIN company c ON o.idCompany = c.idCompany
    LEFT JOIN user_fav_offers ufo ON ufo.idOffer = o.idOffer AND ufo.idUser = p_idUser
    WHERE (p_search IS NULL OR p_search = '' OR o.title LIKE CONCAT('%', p_search, '%') OR o.description LIKE CONCAT('%', p_search, '%') OR c.name LIKE CONCAT('%', p_search, '%') OR o.location LIKE CONCAT('%', p_search, '%'))
      AND (p_location IS NULL OR p_location = '' OR o.location LIKE CONCAT('%', p_location, '%') OR c.location LIKE CONCAT('%', p_location, '%'))
      AND (p_contractType IS NULL OR p_contractType = '' OR FIND_IN_SET(o.contractType, p_contractType) > 0)
      AND (p_salaryMin IS NULL OR o.salaryMax >= p_salaryMin OR (o.salaryMax IS NULL AND o.salaryMin >= p_salaryMin))
      AND (p_salaryMax IS NULL OR o.salaryMin <= p_salaryMax)
      AND (p_skills IS NULL OR p_skills = '' OR o.title LIKE CONCAT('%', p_skills, '%') OR o.description LIKE CONCAT('%', p_skills, '%'))
    ORDER BY o.createdAt DESC
    LIMIT p_limit OFFSET p_offset;

    -- 2. Total count for pagination metadata
    SELECT COUNT(*) AS total
    FROM offers o
    INNER JOIN company c ON o.idCompany = c.idCompany
    WHERE (p_search IS NULL OR p_search = '' OR o.title LIKE CONCAT('%', p_search, '%') OR o.description LIKE CONCAT('%', p_search, '%') OR c.name LIKE CONCAT('%', p_search, '%') OR o.location LIKE CONCAT('%', p_search, '%'))
      AND (p_location IS NULL OR p_location = '' OR o.location LIKE CONCAT('%', p_location, '%') OR c.location LIKE CONCAT('%', p_location, '%'))
      AND (p_contractType IS NULL OR p_contractType = '' OR FIND_IN_SET(o.contractType, p_contractType) > 0)
      AND (p_salaryMin IS NULL OR o.salaryMax >= p_salaryMin OR (o.salaryMax IS NULL AND o.salaryMin >= p_salaryMin))
      AND (p_salaryMax IS NULL OR o.salaryMin <= p_salaryMax)
      AND (p_skills IS NULL OR p_skills = '' OR o.title LIKE CONCAT('%', p_skills, '%') OR o.description LIKE CONCAT('%', p_skills, '%'));
END$$

DELIMITER ;
USE `thesis`;

DELIMITER $$
USE `thesis`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `thesis`.`trg_user_delete`
AFTER DELETE ON `thesis`.`user`
FOR EACH ROW
BEGIN
INSERT INTO Audit(
    actorId,
    actorType,

    action,

    entityType,
    entityId,

    oldValue,
    newValue,

    ipAddress,
    userAgent
)
VALUES(
    @audit_actor_id,
    IFNULL(
        @audit_actor_type,
        'SYSTEM'
    ),

    'DELETE',

    'USER',
    OLD.idUser,

    JSON_OBJECT(
        'document', OLD.document,
        'name', OLD.name,
        'phone', OLD.phone
    ),

    NULL,

    IFNULL(
        @audit_ip,
        'UNKNOWN'
    ),

    IFNULL(
        @audit_user_agent,
        'UNKNOWN'
    )
);
END$$

USE `thesis`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `thesis`.`trg_user_insert`
AFTER INSERT ON `thesis`.`user`
FOR EACH ROW
BEGIN
	INSERT INTO Audit(
    actorId,
    actorType,

    action,

    entityType,
    entityId,

    oldValue,
    newValue,

    ipAddress,
    userAgent
)
VALUES(

    @audit_actor_id,

    IFNULL(
        @audit_actor_type,
        'SYSTEM'
    ),

    'INSERT',

    'USER',

    NEW.idUser,

    NULL,

    JSON_OBJECT(
        'document', NEW.document,
        'name', NEW.name,
        'phone', NEW.phone
    ),

    IFNULL(
        @audit_ip,
        'UNKNOWN'
    ),

    IFNULL(
        @audit_user_agent,
        'UNKNOWN'
    )
);
END$$

USE `thesis`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `thesis`.`trg_user_update`
AFTER UPDATE ON `thesis`.`user`
FOR EACH ROW
BEGIN
INSERT INTO Audit(
    actorId,
    actorType,

    action,

    entityType,
    entityId,

    oldValue,
    newValue,

    ipAddress,
    userAgent
)
VALUES(
    @audit_actor_id,
    IFNULL(
        @audit_actor_type,
        'SYSTEM'
    ),

    'UPDATE',

    'USER',
    NEW.idUser,

    JSON_OBJECT(
        'document', OLD.document,
        'name', OLD.name,
        'phone', OLD.phone
    ),

    JSON_OBJECT(
        'document', NEW.document,
        'name', NEW.name,
        'phone', NEW.phone
    ),

    IFNULL(
        @audit_ip,
        'UNKNOWN'
    ),

    IFNULL(
        @audit_user_agent,
        'UNKNOWN'
    )
);
END$$

USE `thesis`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `thesis`.`Offers_AFTER_DELETE`
AFTER DELETE ON `thesis`.`offers`
FOR EACH ROW
BEGIN
INSERT INTO Audit(
    actorId,
    actorType,

    action,

    entityType,
    entityId,

    oldValue,
    newValue,

    ipAddress,
    userAgent
)
VALUES(
    @audit_actor_id,
    IFNULL(
        @audit_actor_type,
        'SYSTEM'
    ),

    'DELETE',

    'OFFER',
    OLD.idOffer,

    JSON_OBJECT(
        'title', OLD.title,
        'salaryMin', OLD.salaryMin,
        'location', OLD.location,
        'description', OLD.description
    ),

    NULL,

    IFNULL(
        @audit_ip,
        'UNKNOWN'
    ),

    IFNULL(
        @audit_user_agent,
        'UNKNOWN'
    )
);
END$$

USE `thesis`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `thesis`.`Offers_AFTER_INSERT`
AFTER INSERT ON `thesis`.`offers`
FOR EACH ROW
BEGIN
INSERT INTO Audit(
    actorId,
    actorType,

    action,

    entityType,
    entityId,

    oldValue,
    newValue,

    ipAddress,
    userAgent
)
VALUES(
    @audit_actor_id,
    IFNULL(
        @audit_actor_type,
        'SYSTEM'
    ),

    'INSERT',

    'OFFER',
    NEW.idOffer,

    NULL,

    JSON_OBJECT(
        'title', NEW.title,
        'salaryMin', NEW.salaryMin,
        'location', NEW.location,
        'description', NEW.description
    ),

    IFNULL(
        @audit_ip,
        'UNKNOWN'
    ),

    IFNULL(
        @audit_user_agent,
        'UNKNOWN'
    )
);
END$$

USE `thesis`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `thesis`.`Offers_AFTER_UPDATE`
AFTER UPDATE ON `thesis`.`offers`
FOR EACH ROW
BEGIN
INSERT INTO Audit(
    actorId,
    actorType,

    action,

    entityType,
    entityId,

    oldValue,
    newValue,

    ipAddress,
    userAgent
)
VALUES(
    @audit_actor_id,
    IFNULL(
        @audit_actor_type,
        'SYSTEM'
    ),

    'UPDATE',

    'OFFER',
    NEW.idOffer,

    JSON_OBJECT(
        'title', OLD.title,
        'salaryMin', OLD.salaryMin,
        'location', OLD.location,
        'description', OLD.description
    ),

    JSON_OBJECT(
        'title', NEW.title,
        'salaryMin', NEW.salaryMin,
        'location', NEW.location,
        'description', NEW.description
    ),

    IFNULL(
        @audit_ip,
        'UNKNOWN'
    ),

    IFNULL(
        @audit_user_agent,
        'UNKNOWN'
    )
);
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
