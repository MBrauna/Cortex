/****************************************************************************************************
 * Autor: MBrauna & Lazarento                                                      Data: 21/02/2018 *
 ****************************************************************************************************
 *                                                                                                  *
 *                             ██╗  ██╗ █████╗ ███████╗██████╗  █████╗                              *
 *                             ██║ ██╔╝██╔══██╗██╔════╝██╔══██╗██╔══██╗                             *
 *                             █████╔╝ ███████║█████╗  ██████╔╝███████║                             *
 *                             ██╔═██╗ ██╔══██║██╔══╝  ██╔══██╗██╔══██║                             *
 *                             ██║  ██╗██║  ██║██║     ██║  ██║██║  ██║                             *
 *                             ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝                             *
 *                                                                                                  *
 *       ███╗   ███╗ ██████╗ ██████╗ ███████╗██████╗  █████╗ ██████╗  ██████╗ ██████╗  █████╗       *
 *       ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██╔══██╗      *
 *       ██╔████╔██║██║   ██║██║  ██║█████╗  ██████╔╝███████║██║  ██║██║   ██║██████╔╝███████║      *
 *       ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██╔══██╗██╔══██║██║  ██║██║   ██║██╔══██╗██╔══██║      *
 *       ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗██║  ██║██║  ██║██████╔╝╚██████╔╝██║  ██║██║  ██║      *
 *       ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝      *
 *                                                                                                  *
 ****************************************************************************************************/

// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ
let bib_requisicao      =   require('request')
   ,bib_underline       =   require('underscore')
   ,bib_wtf_wiki        =   require('wtf_wikipedia')
   ;
// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ

class bropedia
{
    construct()
    {
        console.log('[BROPEDIA] - BIBLIOTECA CARREGADA');
    } // construct()

    consultar(p_consulta, p_obj_msg, p_config)
    {
        // Tratamento de excessão
        try
        {
            // Prepara os dados iniciais para consulta na enciclopédia.
            let    v_termo_consulta     =   encodeURI(p_consulta.trim())
                  ,v_url_bropedia       =   `http://bropedia.net/api.php?action=query&list=search&srsearch=${v_termo_consulta}&utf8=&format=json`
                  ,v_resposta
                  ,v_pagina
                  ;

            this.v_obj_resposta         =   Object.assign({}, p_obj_msg);

            // Realiza uma chamada no webservice da enciclopédia
            bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) =>
            {
                // Coleta as informações cedidas pelo webservice - Retorno JSON - Consulta à enciclopédia
                v_resposta  =   JSON.parse(p_corpo);

                // Verifica quantidade de resultados obtidos
                if(v_resposta.query.searchinfo.totalhits == 0)
                {
                    console.log('123');
                    this.v_obj_resposta.embed.color              =  p_config.cor_vermelha.color;
                    this.v_obj_resposta.embed.title              =  'TERMO NÃO ENCONTRADO NA WIKI';
                    this.v_obj_resposta.embed.url                =  null;
                    this.v_obj_resposta.embed.description        =  'Desculpe ):';
                    this.v_obj_resposta.embed.fields             =  [
                                                                        {
                                                                            name: 'ZERO! NADA! VAZIO!'
                                                                           ,value: 'O termo "' + p_consulta + '" procurado não foi encontrado em minha base de dados!'
                                                                        }
                                                                    ];
                    console.log(this.v_obj_resposta);
                } // if(v_resposta.query.searchinfo.totalhits == 0)
                else
                {
                    console.log('456');
                    // Roda a consulta procurando por algo similar ao pesquisado
                    v_resposta.query.search.forEach((json_resp) =>
                    {
                        // Teste - Consulta similar
                        if(json_resp.title.toLowerCase() == p_consulta.trim().toLowerCase())
                        {
                            // Caso encontre: A página desejada se faz presente.
                            v_pagina    =   json_resp;
                        } // if(json_resp.title.toLowerCase() == p_consulta.trim().toLowerCase())
                    });

                    // Verifica se a página informada foi definida, caso não seja utiliza a primeira opção obtida na query
                    if(typeof v_pagina === 'undefined')
                    {
                        v_pagina        =   bib_underline.first(v_resposta.query.search);
                    } // if(typeof v_pagina === 'undefined')

                    console.log('789');
                    this.monta_resposta(v_pagina.title, p_obj_msg, p_config);

                } // else { ... }
            }); // bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) => {

            // Retorna a requisição
            console.log('-->> RESPOSTA');
            console.log(this.v_obj_resposta);
            return this.v_obj_resposta;
        } // try { ... }
        catch(p_erro)
        {
            // Em caso de erro, tenta montar uma nova mensagem, avisando sobre o erro
            try
            {
                console.log('ERRO 123');
                // Cria uma novo objeto para modificação.
                this.v_obj_resposta                         =   Object.assign({}, p_obj_msg);

                // Marca as informações
                this.v_obj_resposta.embed.color             =       p_config.cor_vermelha.color;
                this.v_obj_resposta.embed.title             =       'NÃO FOI POSSÍVEL CONSULTAR';
                this.v_obj_resposta.embed.url               =       null;
                this.v_obj_resposta.embed.description       =       'Não consegui GENTE!!!';
                this.v_obj_resposta.embed.fields            =       [
                                                                        {
                                                                            name: 'Ocorreu um erro durante a consulta'
                                                                           ,value: 'O termo "' + p_consulta + '" gerou um erro! Acha que é sentar e chorar? Nananinanão avise um administrador.'
                                                                        }
                                                                    ];
                // Informa sobre o erro
                return this.v_obj_resposta;
            } // try { ... }
            catch(p_erro_sec)
            {
                // Caso nada acima surgir efeito ...
                console.log('-- --> CONSULTAR <-- --');
                console.log(p_erro);
                console.log('-- --> CONSULTAR <-- --');
                console.log(p_erro_sec);
                console.log('-- --> CONSULTAR <-- --');
                console.trace();
                console.log('-- --> CONSULTAR <-- --');

            } // catch(p_erro_sec) { ... }

        } // catch(p_erro) { ... }
    } // consultar(p_consulta, p_obj_msg, p_config)


    monta_resposta(p_titulo, p_obj_msg, p_config)
    {
        try
        {
            // Declaração de variáveis - Criação da resposta
            let     v_url_bropedia      =   `http://bropedia.net/api.php?action=query&titles=${p_titulo}&prop=info|revisions&inprop=url&rvprop=content&format=json`
                   ,v_partes            =   []
                   ,v_redirecionamento  =   false
                   ,v_redirect
                   ,v_pagina
                   ,v_revisao
                   ,v_resposta
                   ;
            console.log('MNT 1');

            // Realiza uma chamada no webservice da enciclopédia
            bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) =>
            {
                console.log('MNT 2');
                // Monta os dados
                v_resposta          =   JSON.parse(p_corpo);
                v_pagina            =   v_resposta.query.pages[Object.keys(v_resposta.query.pages)[0]];
                v_revisao           =   bib_underline.first(v_pagina.revisions);

                console.log('MNT 3');
                // Veririca se a informação é um redirect
                if(!v_redirecionamento && !bib_underline.isEmpty(v_revisao) && v_revisao['*'].indexOf('#REDIRECIONAMENTO') > -1)
                {
                    // Marca a página que receberá o redirect
                    v_redirect      =   v_revisao['*'].replace('#REDIRECIONAMENTO [[','').replace(']]','');

                    // Chama o mesmo método para encontrar as informações
                    this.consultar(v_redirect, p_obj_msg, p_config);
                } // if(!v_redirecionamento && !bib_underline.isEmpty(v_revisao) && v_revisao['*'].indexOf('#REDIRECIONAMENTO') > -1)

                console.log('MNT 4');

                // Caso a página não tenha sido encontrada
                if(typeof v_pagina == 'undefined')
                {
                    console.log('MNT 5');
                    this.v_obj_resposta.embed.color             =   p_config.cor_vermelha.color;
                    this.v_obj_resposta.embed.title             =   'NÃO FOI POSSÍVEL CONSULTAR';
                    this.v_obj_resposta.embed.url               =   null;
                    this.v_obj_resposta.embed.description       =   'Não consegui GENTE!!!';
                    this.v_obj_resposta.embed.fields            =   [
                                                                        {
                                                                            name: 'Ocorreu um erro durante a consulta'
                                                                           ,value: 'O termo "' + p_titulo + '" gerou um erro! Acha que é sentar e chorar? Nananinanão avise um administrador.'
                                                                        }
                                                                    ];

                    // Informa sobre o erro
                } // if(typeof v_pagina == 'undefined')
                else
                {
                    console.log('MNT 6');
                    this.v_obj_resposta.embed.color             =   p_config.cor_verde.color;
                    this.v_obj_resposta.embed.title             =   v_pagina.title;
                    this.v_obj_resposta.embed.url               =   v_pagina.canonicalurl;
                    this.v_obj_resposta.embed.description       =   'Este é o resultado mais relevante para ' + p_titulo;
                    this.v_obj_resposta.embed.fields            =   [
                                                                        {
                                                                            name: v_pagina.title
                                                                           ,value: v_pagina.canonicalurl
                                                                        }
                                                                    ];
                } // else  { ... }
            }); // bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) =>
        } // try { ... }
        catch(p_erro)
        {
            // Em caso de erro, tenta montar uma nova mensagem, avisando sobre o erro
            try
            {
                // Cria uma novo objeto para modificação.
                this.v_obj_resposta                     =   Object.assign({}, p_obj_msg);
                // Marca as informações
                this.v_obj_resposta.embed.color             =   p_config.cor_vermelha.color;
                this.v_obj_resposta.embed.title             =   'NÃO FOI POSSÍVEL CONSULTAR';
                this.v_obj_resposta.embed.url               =   null;
                this.v_obj_resposta.embed.description       =   'Não consegui GENTE!!!';
                this.v_obj_resposta.embed.fields            =   [
                                                                    {
                                                                        name: 'Ocorreu um erro durante a consulta'
                                                                       ,value: 'O termo "' + p_consulta + '" gerou um erro! Acha que é sentar e chorar? Nananinanão avise um administrador.'
                                                                    }
                                                                ];
                console.log('MNT 7');

                // Informa sobre o erro
                this.obj_resposta                       =   Object.assign({}, v_obj_resposta);
            } // try { ... }
            catch(p_erro_sec)
            {
                // Caso nada acima surgir efeito ...
                console.log('-- --> MONTA RESPOSTA <-- --');
                console.log(p_erro);
                console.log('-- --> MONTA RESPOSTA <-- --');
                console.log(p_erro_sec);
                console.log('-- --> MONTA RESPOSTA <-- --');
                console.trace();
                console.log('-- --> MONTA RESPOSTA <-- --');

            } // catch(p_erro_sec) { ... }
        } // catch(p_erro) { ... }
    } // monta_resposta(p_titulo, p_obj_msg, p_config)

} // class bropedia



// Torna o método público
module.exports = bropedia;
