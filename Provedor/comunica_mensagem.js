/****************************************************************************************************
 * Autor: Michel Brauna                                                            Data: 13/03/2018 *
 *                                                                                                  *
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
 ****************************************************************************************************
 *                            Projeto Kafra Moderadora - Bot para discord                           *
 ****************************************************************************************************/

// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ
let   bib_requisicao        =   require('request')
     ;
// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ


class comunica_msg
{
    constructor(p_cliente)
    {
        this.obj_cliente    =   p_cliente;
    } // constructor(p_cliente)

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    quantidade_palavra(p_conteudo)
    {
        // Quebra a frase/conteúdo em uma array - separado por espaço
        var v_conteudo  =   p_conteudo.trim().split(/ +/g);

        // Finaliza a função retornando a quantia de palavras
        return v_conteudo.length; // Adiciona 1 ao valor final para eliminar a casa 0
    } // quantidade_palavra(p_conteudo)

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    quantidade_letra(p_conteudo)
    {
        // Mede o tamanho de caracteres em p_conteudo
        return p_conteudo.length; // Adiciona 1 ao valor final para eliminar a casa 0
    } // quantidade_letra(p_conteudo)


    estatistica_mensagem(p_mensagem, callback)
    {
        let v_url_log           =   'http://kafra.mbrauna.org/api/estatistica/mensagem'
           ,v_informacao        =   {
                                        'token'     :   process.env.TOKEN_KAFRA_ADMIN
                                       ,'cliente'   :   this.obj_cliente
                                       ,'evento'    :   'mensagem'
                                       ,'nome_obj1' :   'mensagem_atual'
                                       ,'nome_obj2' :   'mensagem_anterior'
                                       ,'obj1'      :   p_mensagem
                                       ,'obj2'      :   p_mensagem_antiga
                                    }
           ,v_arquivo_data      =   {
                                        url     :   v_url_log
                                       ,json    :   true
                                       ,body    :   v_informacao
                                    }
           ;
    }
} // class comunica_msg

// Torna o método público - Acesso externo é permitido.
module.exports = comunica_msg;
