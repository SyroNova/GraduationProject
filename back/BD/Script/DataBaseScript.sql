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
CREATE SCHEMA IF NOT EXISTS `thesis` DEFAULT CHARACTER SET utf8 ;
USE `thesis` ;

-- -----------------------------------------------------
-- Table `thesis`.`Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Role` (
  `idRole` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRole`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL,
  `name` VARCHAR(45) NOT NULL,
  `document` VARCHAR(45) NOT NULL,
  `documentType` ENUM('CC', 'TI', 'CE') NOT NULL COMMENT 'Enum contiene los tipos de cedula',
  `passwordHash` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `birthDate` DATE NULL,
  `actualCity` VARCHAR(45) NULL,
  `gender` VARCHAR(45) NULL DEFAULT 'NA',
  `idRole` INT NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `iduser_UNIQUE` (`idUser` ASC) VISIBLE,
  INDEX `fk_user_role_idx` (`idRole` ASC) VISIBLE,
  UNIQUE INDEX `document_UNIQUE` (`document` ASC) VISIBLE,
  CONSTRAINT `fk_user_role`
    FOREIGN KEY (`idRole`)
    REFERENCES `thesis`.`Role` (`idRole`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Terminar de hacer el typeCC ';


-- -----------------------------------------------------
-- Table `thesis`.`Company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Company` (
  `idCompany` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`idCompany`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`Offers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Offers` (
  `idOffer` INT NOT NULL AUTO_INCREMENT,
  `idCompany` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `salaryMin` INT NOT NULL,
  `salaryMax` INT NULL,
  `description` TEXT NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `contractType` ENUM("MEDIO_TIEMPO", "TIEMPO_COMPLETO", "POR_HORAS", "TEMPORAL") NOT NULL,
  `expireDate` DATETIME NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idOffer`),
  INDEX `fk_Offers_Company1_idx` (`idCompany` ASC) VISIBLE,
  CONSTRAINT `fk_Offers_Company1`
    FOREIGN KEY (`idCompany`)
    REFERENCES `thesis`.`Company` (`idCompany`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`User_Fav_Offers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`User_Fav_Offers` (
  `idUser` INT NOT NULL,
  `idOffer` INT NOT NULL,
  PRIMARY KEY (`idUser`, `idOffer`),
  INDEX `fk_user_has_ofertas_ofertas1_idx` (`idOffer` ASC) VISIBLE,
  INDEX `fk_user_has_ofertas_user1_idx` (`idUser` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_ofertas_user1`
    FOREIGN KEY (`idUser`)
    REFERENCES `thesis`.`User` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_ofertas_ofertas1`
    FOREIGN KEY (`idOffer`)
    REFERENCES `thesis`.`Offers` (`idOffer`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`Resume`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Resume` (
  `idResume` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NOT NULL,
  PRIMARY KEY (`idResume`),
  INDEX `fk_resume_user1_idx` (`idUser` ASC) VISIBLE,
  UNIQUE INDEX `user_iduser_UNIQUE` (`idUser` ASC) VISIBLE,
  CONSTRAINT `fk_resume_user1`
    FOREIGN KEY (`idUser`)
    REFERENCES `thesis`.`User` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`Professional_profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Professional_profile` (
  `idProfessionalProfile` INT NOT NULL AUTO_INCREMENT,
  `idResume` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `resume` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idProfessionalProfile`),
  INDEX `fk_Professional_profile_Resume1_idx` (`idResume` ASC) VISIBLE,
  CONSTRAINT `fk_Professional_profile_Resume1`
    FOREIGN KEY (`idResume`)
    REFERENCES `thesis`.`Resume` (`idResume`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`Work_experience`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Work_experience` (
  `idWorkExperience` INT NOT NULL AUTO_INCREMENT,
  `idResume` INT NOT NULL,
  `position` VARCHAR(45) NOT NULL,
  `dateStart` DATE NOT NULL,
  `dateEnd` DATE NULL,
  `company` VARCHAR(45) NOT NULL,
  `description` VARCHAR(100) NULL,
  PRIMARY KEY (`idWorkExperience`),
  INDEX `fk_work_experience_resume1_idx` (`idResume` ASC) VISIBLE,
  CONSTRAINT `fk_work_experience_resume1`
    FOREIGN KEY (`idResume`)
    REFERENCES `thesis`.`Resume` (`idResume`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`Academic_experience`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Academic_experience` (
  `idAcademicExperience` INT NOT NULL AUTO_INCREMENT,
  `idResume` INT NOT NULL,
  `degree` VARCHAR(45) NOT NULL,
  `institution` VARCHAR(45) NOT NULL,
  `dateStart` DATE NOT NULL,
  `dateEnd` DATE NULL,
  `description` VARCHAR(100) NULL,
  PRIMARY KEY (`idAcademicExperience`),
  INDEX `fk_academic_experience_resume1_idx` (`idResume` ASC) VISIBLE,
  CONSTRAINT `fk_academic_experience_resume1`
    FOREIGN KEY (`idResume`)
    REFERENCES `thesis`.`Resume` (`idResume`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`Audit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Audit` (
  `idAudit` INT NOT NULL AUTO_INCREMENT,
  `actorId` INT NULL,
  `actorType` ENUM('USER', 'COMPANY', 'ADMIN', 'SYSTEM') NOT NULL,
  `action` VARCHAR(15) NOT NULL,
  `entityType` VARCHAR(50) NOT NULL,
  `entityId` INT NOT NULL,
  `oldValue` JSON NULL,
  `newValue` JSON NOT NULL,
  `ipAddress` VARCHAR(45) NOT NULL,
  `userAgent` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idAudit`))
ENGINE = InnoDB
COMMENT = 'Finish the enum of actorType';


-- -----------------------------------------------------
-- Table `thesis`.`Comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Comments` (
  `idComments` INT NOT NULL AUTO_INCREMENT,
  `idOffers` INT NOT NULL,
  `idUser` INT NOT NULL,
  `content` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idComments`),
  INDEX `fk_Comments_Offers1_idx` (`idOffers` ASC) VISIBLE,
  INDEX `fk_Comments_User1_idx` (`idUser` ASC) VISIBLE,
  CONSTRAINT `fk_Comments_Offers1`
    FOREIGN KEY (`idOffers`)
    REFERENCES `thesis`.`Offers` (`idOffer`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comments_User1`
    FOREIGN KEY (`idUser`)
    REFERENCES `thesis`.`User` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`Reports`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Reports` (
  `idReports` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NOT NULL,
  `targetType` ENUM('USER', 'COMPANY', 'OFFER', 'COMMENT') NOT NULL,
  `targetId` INT NOT NULL,
  `reason` MEDIUMTEXT NOT NULL,
  `status` ENUM('PENDING', 'REVIWED', 'RESOLVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `priority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'LOW',
  PRIMARY KEY (`idReports`),
  INDEX `fk_Reports_User1_idx` (`idUser` ASC) VISIBLE,
  CONSTRAINT `fk_Reports_User1`
    FOREIGN KEY (`idUser`)
    REFERENCES `thesis`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`Session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Session` (
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
    REFERENCES `thesis`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`Sms_codes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Sms_codes` (
  `idSms` INT NOT NULL AUTO_INCREMENT,
  `phone` VARCHAR(45) NOT NULL,
  `code` VARCHAR(10) NOT NULL,
  `expiresAt` DATETIME NOT NULL,
  `attempts` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idSms`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`Documents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Documents` (
  `idDocument` INT NOT NULL AUTO_INCREMENT,
  `file` MEDIUMBLOB NOT NULL,
  `fileName` VARCHAR(255) NOT NULL,
  `mimeType` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idDocument`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`Offers_Documents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Offers_Documents` (
  `idOffer` INT NOT NULL,
  `idDocument` INT NOT NULL,
  PRIMARY KEY (`idOffer`, `idDocument`),
  INDEX `fk_Offers_has_Documents_Documents1_idx` (`idDocument` ASC) VISIBLE,
  INDEX `fk_Offers_has_Documents_Offers1_idx` (`idOffer` ASC) VISIBLE,
  CONSTRAINT `fk_Offers_has_Documents_Offers1`
    FOREIGN KEY (`idOffer`)
    REFERENCES `thesis`.`Offers` (`idOffer`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Offers_has_Documents_Documents1`
    FOREIGN KEY (`idDocument`)
    REFERENCES `thesis`.`Documents` (`idDocument`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`Resume_Documents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Resume_Documents` (
  `idResume` INT NOT NULL,
  `idDocument` INT NOT NULL,
  PRIMARY KEY (`idResume`, `idDocument`),
  INDEX `fk_Resume_has_Documents_Documents1_idx` (`idDocument` ASC) VISIBLE,
  INDEX `fk_Resume_has_Documents_Resume1_idx` (`idResume` ASC) VISIBLE,
  CONSTRAINT `fk_Resume_has_Documents_Resume1`
    FOREIGN KEY (`idResume`)
    REFERENCES `thesis`.`Resume` (`idResume`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Resume_has_Documents_Documents1`
    FOREIGN KEY (`idDocument`)
    REFERENCES `thesis`.`Documents` (`idDocument`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`Skills`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Skills` (
  `idSkill` CHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `type` ENUM('skill/competence', 'knowledge') NULL,
  PRIMARY KEY (`idSkill`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`Occupations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Occupations` (
  `idOccupation` CHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idOccupation`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`Skills_Occupations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Skills_Occupations` (
  `idSkill` CHAR(36) NOT NULL,
  `idOccupation` CHAR(36) NOT NULL,
  `relationType` ENUM('essential', 'optional', 'na') NULL,
  PRIMARY KEY (`idSkill`, `idOccupation`),
  INDEX `fk_Skills_has_Occupations_Occupations1_idx` (`idOccupation` ASC) VISIBLE,
  INDEX `fk_Skills_has_Occupations_Skills1_idx` (`idSkill` ASC) VISIBLE,
  CONSTRAINT `fk_Skills_has_Occupations_Skills1`
    FOREIGN KEY (`idSkill`)
    REFERENCES `thesis`.`Skills` (`idSkill`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Skills_has_Occupations_Occupations1`
    FOREIGN KEY (`idOccupation`)
    REFERENCES `thesis`.`Occupations` (`idOccupation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`Resume_Skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Resume_Skill` (
  `idResume` INT NOT NULL,
  `idSkill` CHAR(36) NOT NULL,
  `level` ENUM('principiante', 'intermedio', 'avanzado') NOT NULL,
  PRIMARY KEY (`idResume`, `idSkill`),
  INDEX `fk_Resume_has_Skills_Skills1_idx` (`idSkill` ASC) VISIBLE,
  INDEX `fk_Resume_has_Skills_Resume1_idx` (`idResume` ASC) VISIBLE,
  CONSTRAINT `fk_Resume_has_Skills_Resume1`
    FOREIGN KEY (`idResume`)
    REFERENCES `thesis`.`Resume` (`idResume`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Resume_has_Skills_Skills1`
    FOREIGN KEY (`idSkill`)
    REFERENCES `thesis`.`Skills` (`idSkill`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `thesis`;

DELIMITER $$
USE `thesis`$$
CREATE DEFINER = CURRENT_USER TRIGGER `thesis`.`trg_user_insert` AFTER INSERT ON `User` FOR EACH ROW
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
CREATE DEFINER = CURRENT_USER TRIGGER `thesis`.`trg_user_update` AFTER UPDATE ON `User` FOR EACH ROW
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
CREATE DEFINER = CURRENT_USER TRIGGER `thesis`.`trg_user_delete` AFTER DELETE ON `User` FOR EACH ROW
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
CREATE DEFINER = CURRENT_USER TRIGGER `thesis`.`Offers_AFTER_INSERT` AFTER INSERT ON `Offers` FOR EACH ROW
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
CREATE DEFINER = CURRENT_USER TRIGGER `thesis`.`Offers_AFTER_UPDATE` AFTER UPDATE ON `Offers` FOR EACH ROW
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

USE `thesis`$$
CREATE DEFINER = CURRENT_USER TRIGGER `thesis`.`Offers_AFTER_DELETE` AFTER DELETE ON `Offers` FOR EACH ROW
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


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
