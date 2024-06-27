# Eternal Return Client Auth
* Um autenticador simples para pegar o token da conta do ERBS para usar a Api do client.
* Pegue os endpoints com **Wireshark**

# Configurando
* No arquivo .env coloque o **login** e **senha** da sua conta da **Steam**
* Inicie o projeto e adicione o código do **Steam Guard**

# Endpoints
* Deixei os endpoints que eu estava testando enquanto fazia o projeto
* myAccount - Retorna todas as informações da sua conta;
* changeNickname - Altere seu nickname. NP será descontado da sua conta (Pode usar esse endpoint para fazer um "nick sniper");
* searchUser - Retorna **userNum, userName e userCode** do jogador desejado;

# Algumas informações
* Os tokens resetam a cada 1 hora mais ou menos.
* Se você gerar o token da sua conta, e você entrar na conta o token vai expirar.
* Se você não quiser ficar gerando o token toda hora, você pode fazer algo assim **[CLIQUE AQUI!](https://github.com/Eternal-Return-Community/renewalSession)**

# Vantagens de usar Api do Client
* Sem rate limit
* Os endpoints retornam mais informações do que api pública.

Caso precise falar comigo me envie mensagem no discord **@nicaksks**