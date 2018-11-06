-- MySQL Workbench Synchronization
-- Generated: 2018-11-06 18:39
-- Model: crudDB
-- Version: 1.0
-- Project: test-full-stack
-- Author: Rafael Muto

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `crudDB` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `crudDB`.`usuarios` (
  `usuario_id` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `data` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`usuario_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `crudDB`.`produtos` (
  `produto_id` INT(11) NOT NULL AUTO_INCREMENT,
  `fk_usuario_id` INT(11) NOT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `imagem` VARCHAR(255) NOT NULL,
  `valor` INT(11) NOT NULL,
  `categoria` INT(11) NOT NULL,
  `data` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`produto_id`),
  INDEX `fk_produtos_cat_produto_idx` (`categoria` ASC),
  INDEX `fk_produtos_usuarios1_idx` (`fk_usuario_id` ASC),
  CONSTRAINT `fk_produtos_cat_produto`
    FOREIGN KEY (`categoria`)
    REFERENCES `crudDB`.`cat_produto` (`cat_produto_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_produtos_usuarios1`
    FOREIGN KEY (`fk_usuario_id`)
    REFERENCES `crudDB`.`usuarios` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `crudDB`.`publicacoes` (
  `pub_id` INT(11) NOT NULL AUTO_INCREMENT,
  `fk_usuario_id` INT(11) NOT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(45) NOT NULL,
  `conteudo` VARCHAR(512) NOT NULL,
  `imagem` VARCHAR(45) NOT NULL,
  `categoria` INT(11) NOT NULL,
  `data` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pub_id`),
  INDEX `fk_publicacoes_cat_publicacao1_idx` (`categoria` ASC),
  INDEX `fk_publicacoes_usuarios1_idx` (`fk_usuario_id` ASC),
  CONSTRAINT `fk_publicacoes_cat_publicacao1`
    FOREIGN KEY (`categoria`)
    REFERENCES `crudDB`.`cat_publicacao` (`cat_publicacao_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_publicacoes_usuarios1`
    FOREIGN KEY (`fk_usuario_id`)
    REFERENCES `crudDB`.`usuarios` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `crudDB`.`cat_produto` (
  `cat_produto_id` INT(11) NOT NULL AUTO_INCREMENT,
  `cat_nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cat_produto_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `crudDB`.`cat_publicacao` (
  `cat_publicacao_id` INT(11) NOT NULL AUTO_INCREMENT,
  `cat_nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cat_publicacao_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Placeholder table for view `crudDB`.`view1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `crudDB`.`view1` (`id` INT);


USE `crudDB`;

-- -----------------------------------------------------
-- View `crudDB`.`view1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `crudDB`.`view1`;
USE `crudDB`;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
