/****************************************************************************************************
 * Autor: Michel Brauna                                                            Data: 21/02/2018 *
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


class comando
{
    construct()
    {
        console.log('Construtor de comandos inicializado.');
    } // construct()


    trata_mensagem(p_cliente, p_mensagem)
    {
        try
        {
            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

            var v_kafra_prefixo         =   '<@' + p_cliente.user.id + '>';
            var v_kafra_id              =   p_cliente.user.id;
            var v_tmp_prefixo           =   p_mensagem.content.startsWith(v_kafra_prefixo);
            var v_tmp_tamanho           =   p_mensagem.mentions.users.keyArray().length;
            var v_campo_resposta        = {};

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

            // Verifica se a mensagem enviada foi de um bot ou usuário
            if(p_mensagem.author.bot) return; // Caso seja de um bot finaliza a verificação

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

            // Verifica se a mensagem foi iniciada com o prefixo desejado!
            if(v_tmp_prefixo)
            {
                // console.log(p_mensagem.content.slice(v_kafra_prefixo.length).trim().split(/ +/g));
                // Remove o prefixo e transforma imediatamente em uma array
                var v_mensagem = p_mensagem.content.slice(v_kafra_prefixo.length).trim().split(/ +/g);

                // Verifica se existe alguma informação ou é apenas menção;
                if(v_mensagem.length <= 0)
                {
                    v_campo_resposta =  [
                                            {
                                                name:   "Database"
                                               ,value:  "Para realizar pesquisas no database digite @Kafra Moderadora <item/monstro/mapa> <nome_desejado/ID>."
                                            }
                                           ,{
                                                name:   "Enciclopédia"
                                               ,value:  "Para realizar pesquisas na enciclopédia digite @Kafra Moderadora wiki <termo_desejado>."
                                            }
                                           ,{
                                                name:   "Recrutar para grupo"
                                               ,value:  "Está em jogo e pretende montar um grupo? Deixe que eu organizo para você, basta digitar @kafra Moderadora recrutar <nivel_inicial> <nivel_final> <mapa_desejado>, e por 20 minutos irei organizar seu grupo."
                                            }
                                           ,{
                                                name:   "Procurar grupo"
                                               ,value:  "Quer entrar num supimpa grupo e se aventurar em Rune Midgard? Digite @Kafra Moderadora procurar <nivel_atual>."
                                            }
                                           ,{
                                                name:   "Listar Grupos ativos"
                                               ,value:  "Quer descobrir os grupos ativos? Chame por @Kafra Moderadora grupos."
                                            }
                                           ,{
                                                name:   "Regras"
                                               ,value:  "Para ler as regras deste servidor digite @Kafra Moderadora regras, e irei listá-las para você."
                                            }

                                           ,{
                                                name:   "Ajuda"
                                               ,value:  "Está em dúvida sobre algo? Digite @Kafra Moderadora ajuda, que irei encontrar alguém para lhe socorrer."
                                            }
                                           ,{
                                                name:   "（ ^_^）o自  自o（^_^ ）"
                                               ,value:  "A qualquer momento você poderá me mencionar para que eu liste os comandos! Chame por @Kafra Moderadora."
                                            }
                                        ];
                    this.formata_mensagem(v_campo_resposta,p_cliente,p_mensagem);
                    return;
                }

                // Verifica o comando após o prefixo.
                switch(v_mensagem[0].toLowerCase())
                {
                    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

                    case 'item':
                        v_campo_resposta =  [
                                                {
                                                    name:   "Calma ai!"
                                                   ,value:  "Ainda não estou pronta!"
                                                }
                                            ];
                        this.formata_mensagem(v_campo_resposta,p_cliente,p_mensagem);
                        break;

                    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

                    case 'monstro':
                        v_campo_resposta =  [
                                                {
                                                    name:   "Calma ai!"
                                                   ,value:  "Ainda não estou pronta!"
                                                }
                                            ];
                        this.formata_mensagem(v_campo_resposta,p_cliente,p_mensagem);
                        break;

                    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

                    case 'mapa':
                        v_campo_resposta =  [
                                                {
                                                    name:   "Calma ai!"
                                                   ,value:  "Ainda não estou pronta!"
                                                }
                                            ];
                        this.formata_mensagem(v_campo_resposta,p_cliente,p_mensagem);
                        break;

                    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

                    case 'wiki':
                        v_campo_resposta =  [
                                                {
                                                    name:   "Calma ai!"
                                                   ,value:  "Ainda não estou pronta!"
                                                }
                                            ];
                        this.formata_mensagem(v_campo_resposta,p_cliente,p_mensagem);
                        break;

                    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

                    default:
                        p_mensagem.channel.send('Ai pessoal, que caquinha!!!',
                                    {
                                        'embed':
                                        {
                                            color: 0x882d93
                                           ,author:
                                           {
                                                name:       'Kafra Moderadora'
                                               ,icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                            }
                                           ,title: 'Kafra Moderadora'
                                           ,url: 'http://bropedia.net'
                                           ,description: 'Não pude atender sua requisição!'
                                           ,"image": {"url" : "https://i.imgur.com/LOGICNS.jpg"}
                                           ,fields: [
                                                        {
                                                            name:   "Gente essa foi pior que apagar tópico de manutenção! ):"
                                                           ,value:  "Eu juro que tentei entender mas não consegui ): Tente digitar @Kafra moderadora"
                                                        }
                                                    ]
                                           ,timestamp: new Date()
                                           ,footer: {
                                                icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                               ,text:       '© bROPédia - Por MBrauna e Lazarento'
                                            }
                                        }
                                    }
                                );
                        break;
                } // switch(lower(v_mensagem[0].toLowerCase())

                return;

            } // if(v_tmp_prefixo)
        }
        catch(p_erro)
        {
            p_mensagem.channel.send('Cuidadooooooooo deu erro!!!',
                                    {
                                        'embed':
                                        {
                                            color: 0x882d93
                                           ,author:
                                           {
                                                name:       'Kafra Moderadora'
                                               ,icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                            }
                                           ,title: 'Kafra Moderadora'
                                           ,url: 'http://bropedia.net'
                                           ,description: 'OU MAI GOSH O QUE SERÁ QUE FOI DESSA VEZ?'
                                           ,"image": {"url" : "https://i.imgur.com/LOGICNS.jpg"}
                                           ,fields: [
                                                        {
                                                            name:   "Ocorreu um erro na sua requisição!"
                                                           ,value:  "Infelizmente não pude atender o seu pedido! Mas juro que tentarei na próxima."
                                                        }
                                                    ]
                                           ,timestamp: new Date()
                                           ,footer: {
                                                icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                               ,text:       '© bROPédia - Por MBrauna e Lazarento'
                                            }
                                        }
                                    }
                                );
            console.log(p_erro);
            console.trace();
        }
    } // trata_mensagem(p_cliente, p_mensagem)



    formata_mensagem(p_campos, p_cliente, p_mensagem)
    {
        p_mensagem.channel.send('Olá galerinha!!!',
                                {
                                    'embed':
                                    {
                                        color: 0x882d93
                                       ,author:
                                       {
                                            name:       'Kafra Moderadora'
                                           ,icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                        }
                                       ,title: 'Kafra Moderadora'
                                       ,url: 'http://bropedia.net'
                                       ,description: 'A supervisora Kafra está na área!!'
                                       ,fields: p_campos
                                       ,timestamp: new Date()
                                       ,footer: {
                                            icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                           ,text:       '© bROPédia - Por MBrauna e Lazarento'
                                        }
                                    }
                                }
                            );
    } // formata_mensagem(p_campos, p_cliente, p_mensagem)

} // CLASS COMANDO


// Torna o método público
module.exports = comando;
