[checkmark]: https://raw.githubusercontent.com/mozgbrasil/mozgbrasil.github.io/master/assets/images/logos/logo_32_32.png "MOZG"
![valid XHTML][checkmark]

[requerimentos]: http://mozgbrasil.github.io/requerimentos/
[getcomposer]: https://getcomposer.org/
[uninstall-mods]: https://getcomposer.org/doc/03-cli.md#remove
[git-releases]: https://github.com/mozgbrasil/magento-base-php56/releases

# Mozg\Base

## Sinopse

Módulo requerido para funcionamento dos demais módulos

## Motivação

Atender o mercado de módulos para Magento oferecendo um excelente suporte

## Característica técnica


## Instalação - Atualização - Desinstalação - Desativação

Este módulo destina-se a ser instalado usando o [Composer][getcomposer]

Antes de executar os processos, [clique aqui][requerimentos] e leia os pré-requisitos e sugestões

--

Para qualquer atualização no Magento sempre mantenha o Compiler e o Cache desativado

--

### Para instalar o módulo execute o comando a seguir no terminal do seu servidor no diretório do seu projeto

	composer require mozgbrasil/magento-base-php56:dev-master

Você pode verificar se o módulo está instalado, indo ao backend em:

	STORES -> Configuration -> ADVANCED/Advanced -> Disable Modules Output

--

### Para atualizar o módulo execute o comando a seguir no terminal do seu servidor no diretório do seu projeto

Antes de efetuar qualquer processo que envolva atualização no Magento é recomendado manter o Compiler e Cache desativado

	composer clear-cache && composer update

Na ocorrência de erro, renomeie a pasta /vendor/mozgbrasil e execute novamente

Para checar a data do módulo execute o seguinte comando

	grep -ri --include=*.json 'time": "' ./vendor/mozgbrasil

### Para usar uma versão especifica do módulo

Primeiro acesse as versões disponibilizadas acessando os [releases][git-releases]https://github.com/mozgbrasil/magento-base-php56/releases

Utilize a versão que atenda a data correspondente a seu arquivo de licença

Para isso altere no arquivo composer.json para a devida versão

    "require" : {
        "mozgbrasil/magento-base-php56": "1.0.0"

Em seguida execute o comando a seguir no terminal do seu servidor

	composer update

--

### Para [desinstalar][uninstall-mods] o módulo execute o comando a seguir no terminal do seu servidor

	composer remove mozgbrasil/magento-base-php56 && composer clear-cache && composer update

--

### Para desativar o módulo

Renomeie a pasta do módulo

Cada módulo tem a sua pasta no diretório /vendor/mozgbrasil/

## Como configurar o método

Para configurar o método, acesse no backend em:

	STORES -> Configuration -> MOZG -> Geral

Você terá os campos a seguir

### • **Ativar estilo ao IWD_Opc**

Deve aplicar estilo ao IWD_Opc

## Contribuintes

Equipe Mozg

## License

[Comercial License](LICENSE.txt)

## Badges

[![Join the chat at https://gitter.im/mozgbrasil](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mozgbrasil/)
[![Latest Stable Version](https://poser.pugx.org/mozgbrasil/magento-base-php56/v/stable)](https://packagist.org/packages/mozgbrasil/magento-base-php56)
[![Total Downloads](https://poser.pugx.org/mozgbrasil/magento-base-php56/downloads)](https://packagist.org/packages/mozgbrasil/magento-base-php56)
[![Latest Unstable Version](https://poser.pugx.org/mozgbrasil/magento-base-php56/v/unstable)](https://packagist.org/packages/mozgbrasil/magento-base-php56)
[![License](https://poser.pugx.org/mozgbrasil/magento-base-php56/license)](https://packagist.org/packages/mozgbrasil/magento-base-php56)
[![Monthly Downloads](https://poser.pugx.org/mozgbrasil/magento-base-php56/d/monthly)](https://packagist.org/packages/mozgbrasil/magento-base-php56)
[![Daily Downloads](https://poser.pugx.org/mozgbrasil/magento-base-php56/d/daily)](https://packagist.org/packages/mozgbrasil/magento-base-php56)
[![Reference Status](https://www.versioneye.com/php/mozgbrasil:magento-base-php56/reference_badge.svg?style=flat-square)](https://www.versioneye.com/php/mozgbrasil:magento-base-php56/references)
[![Dependency Status](https://www.versioneye.com/php/mozgbrasil:magento-base-php56/1.0.0/badge?style=flat-square)](https://www.versioneye.com/php/mozgbrasil:magento-base-php56/1.0.0)

:cat2:
