[checkmark]: https://raw.githubusercontent.com/mozgbrasil/mozgbrasil.github.io/master/assets/images/logos/logo_32_32.png "MOZG"
![valid XHTML][checkmark]

[requerimentos]: http://mozgbrasil.github.io/requerimentos/
[getcomposer]: https://getcomposer.org/
[uninstall-mods]: https://getcomposer.org/doc/03-cli.md#remove
[git-releases]: https://github.com/mozgbrasil/magento-base-php56/releases
[artigo-composer]: http://mozg.com.br/ubuntu/composer
[ioncube-loader]: http://www.ioncube.com/loaders.php
[acordo]: http://mozg.com.br/acordo-licenca-usuario-final/

# Mozg\Base

## Sinopse

Módulo requerido para funcionamento dos demais módulos

## Motivação

Atender o mercado de módulos para Magento oferecendo um excelente suporte

## Característica técnica


## Instalação - Atualização - Desinstalação - Desativação

--

Este módulo destina-se a ser instalado usando o [Composer][getcomposer]

Execute o seguinte comando no terminal, para visualizar a existencia do Composer e sua versão

	composer --version

Caso não tenha o Composer em seu ambiente, sugiro ler o seguinte artigo [Clique aqui][artigo-composer]

--

É necessário que o servidor tenha o suporte a extensão [ionCube PHP Loader][ioncube-loader]

Para visualizar se essa extensão está ativa em seu servidor

Certique se da presença do arquivo phpinfo.php na raiz do seu projeto

	<?php phpinfo(); ?>

Caso não exista o arquivo phpinfo.php na raiz do projeto Magento, crie o mesmo adicionado o conteúdo acima

Acesse o arquivo pelo browser

Em seguida pesquise pelo termo "ionCube PHP Loader"

Caso o seu servidor não tenha o suporte a extensão, [Clique aqui][ioncube-loader]

Em "Loader Downloads API", efetue download do pacote compatível com o seu servidor

Descompacte o pacote e faça upload do arquivo "loader-wizard.php" para seu servidor, onde será demonstrado o passo a passo para a ativação da extensão

[Clique aqui](https://youtu.be/GZ2J6MLkko4) para ver os processos executados

--

Para utilizar o(s) módulo(s) da MOZG é necessário aceitar o [Acordo de licença do usuário final][acordo]

--

Sugiro manter um ambiente de testes para efeito de testes e somente após os devidos testes aplicar os devidos procedimento no ambiente de produção

--

Sugiro efetuar backup da plataforma Magento e do banco de dados

--

Antes de efetuar qualquer atualização no Magento sempre mantenha o Compiler e o Cache desativado

--

Certique se da presença do arquivo composer.json na raiz do seu projeto Magento e que o mesmo tenha os parâmetros semelhantes ao modelo JSON abaixo

	{
	  "minimum-stability": "dev",
	  "prefer-stable": true,
	  "license": [
	    "proprietary"
	  ],
	  "repositories": [
	    {
	      "type": "composer",
	      "url": "https?://packages.firegento.com"
	    }
	  ],
	  "extra": {
	    "magento-root-dir": "./",
	    "magento-deploystrategy": "copy",
	    "magento-force": true
	  }
	}

Caso não exista o arquivo composer.json na raiz do projeto Magento, crie o mesmo adicionado o conteúdo acima

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

1. Antes de efetuar qualquer processo que envolva atualização sobre o Magento é necessário manter o Compiler e Cache desativado

2. Caso queira desativar os módulos da MOZG renomeie a seguinte pasta app/code/local/Mozg

A desativação do módulo pode ser usado para detectar se determinada ocorrência tem relação com o módulo

## Como configurar o método

Para configurar o método, acesse no backend em:

	STORES -> Configuration -> MOZG -> Geral

Você terá os campos a seguir

### • **Ativar estilo ao IWD_Opc**

Deve aplicar estilo ao IWD_Opc

## Perguntas mais frequentes "FAQ"

### Como remover arquivos do projeto

A seguir é efetuado pesquisa nos diretórios pelas nomenclaturas

	find /var/www/bazar1mais1.com.br/web/ambiente_01/ -type d -name 'Mozg*'

	find /var/www/bazar1mais1.com.br/web/ambiente_01/ -type d -name 'mozg*'

Como vemos que são retornado somente as pastas vinculada a MOZG, podemos excluir os diretório

	find /var/www/bazar1mais1.com.br/web/ambiente_01/ -type d -name 'Mozg*' | xargs rm -rf

	find /var/www/bazar1mais1.com.br/web/ambiente_01/ -type d -name 'mozg*' | xargs rm -rf

Execute a primeira instrução somente para efeito de conferencia

Em seguida exclua a pasta vendor na raiz do projeto e se necessário atualize os requerimentos do Composer

## COMO ?

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
