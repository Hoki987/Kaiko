//===========================================/ Import the modeles \===========================================\\
const { Client, ButtonInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

//===========================================< Code >===========================\\
module.exports = {
    data: {
        name: 'rolesInfo'
    },

    /**
     * @param {Client} client
     * @param {ButtonInteraction} interaction
     */

    async execute(client, interaction) {
        const [, type, channelRequest] = interaction.customId.split('_')

        let title = 'Заявка';
        let label;
        let placeholder;
        let components;
        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`rolesInfoChoices_accept`)
                .setEmoji('✔')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId(`rolesInfoChoices_deny`)
                .setEmoji('❌')
                .setStyle(ButtonStyle.Secondary)
        )
        switch (type) {
            case 'Erydit':
                client.channels.cache.get(channelRequest).send({
                    embeds: [new EmbedBuilder().setDescription("Заявка на эрудита").setAuthor({ name: `Заполнил: ${interaction.user.username} | ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL() })],
                    components: [buttons]
                })
                await interaction.reply({ ephemeral: true, content: 'Заявка была отправлена!' })
                break;
            case 'MafiaHS':
                client.channels.cache.get(channelRequest).send({
                    embeds: [new EmbedBuilder().setDescription("Заявка на заядлого игрока").setAuthor({ name: `Заполнил: ${interaction.user.username} | ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL() })],
                    components: [buttons]
                })
                await interaction.reply({ ephemeral: true, content: 'Заявка была отправлена!' })
                break;
            default:
                switch (type) {
                    case 'CloseHS':
                        label = ['По какой игре получаешь HS-роль?', 'Укажи ссылку на аккаунт', 'Как часто участвуешь в клозах/пабах?']
                        placeholder = ['', 'Например: op.gg (для League of Legends), dotabuff.com (для Dota 2).', '']
                        break;
                    case 'Dabber':
                    case 'Music':
                    case 'Reader':
                        label = ['Когда вам удобно пройти прослушивание?']
                        placeholder = ['']
                        break;
                        case 'Painter':
                        label = ['Сколько работ ты выложил(а) в творчестве?']
                        placeholder = ['']
                            break;
                    case 'Cloud':
                        label = ['Ваше имя и возраст', 'Были ли у вас муты/варны/баны', 'Точная дата присоединения к серверу']
                        placeholder = ['Олег, 30', 'Да, по 2.3 мут/нет', 'Можно узнать по команде /info user']
                        break;
                }

                if (label.length > 1) {
                    components = [new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('modalRolesInfo_Input1')
                            .setLabel(label[0])
                            .setPlaceholder(placeholder[0])
                            .setMaxLength(100)
                            .setStyle(TextInputStyle.Short)
                    ),
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('modalRolesInfo_Input2')
                            .setLabel(label[1])
                            .setPlaceholder(placeholder[1])
                            .setMaxLength(100)
                            .setStyle(TextInputStyle.Short)
                    ),
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('modalRolesInfo_Input3')
                            .setLabel(label[2])
                            .setPlaceholder(placeholder[2])
                            .setMaxLength(100)
                            .setStyle(TextInputStyle.Short)
                    )]
                } else {
                    components = new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('modalRolesInfo_Input1')
                            .setLabel(label[0])
                            .setPlaceholder(placeholder[0])
                            .setMaxLength(100)
                            .setStyle(TextInputStyle.Short)
                    )
                }
                await interaction.showModal(
                    new ModalBuilder()
                        .setCustomId(`modalRolesInfo_${type}_${channelRequest}`)
                        .setTitle(title)
                        .addComponents(components)
                )
                break;
        }
    }
}