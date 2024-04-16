//===========================================/ Import the modeles \===========================================\\
const { Client, ModalSubmitInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const axios = require('axios')
require("dotenv").config();

//==========< OTHERS >==========\\
const { ChannelID } = require('../config.js')

//===========================================< Code >===========================\\
module.exports = {
    data: {
        name: 'modalRolesInfo'
    },

    /**
     * @param {Client} client
     * @param {ModalSubmitInteraction} interaction
     */

    async execute(client, interaction) {
        const [, type, channelRequest] = interaction.customId.split('_')
        console.log(interaction.customId.split('_'));
        let label;
        const embed = new EmbedBuilder().setAuthor({ name: `Заполнил: ${interaction.user.username} | ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL() })
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
            case 'CloseHS':
                label = ['По какой игре получаешь HS-роль?', 'Укажи ссылку на аккаунт', 'Как часто участвуешь в клозах/пабах?']
                break;
            case 'Dabber':
            case 'Music':
            case 'Reader':
                label = ['Когда вам удобно пройти прослушивание?']
                break;
            case 'Painter':
                label = ['Сколько работ ты выложил(а) в творчестве?']
                break;
            case 'Cloud':
                label = ['Ваше имя и возраст', 'Были ли у вас муты/варны/баны', 'Точная дата присоединения к серверу']
                break;
        }

        if (label.length === 1) {
            client.channels.cache.get(channelRequest).send({
                embeds: [embed.setFields(
                    { name: label[0], value: `\`\`\`${interaction.fields.getTextInputValue('modalRolesInfo_Input1')}\`\`\`` }
                )
                ],
                components: [buttons]
            })
        } else {
            const getUser = async (guildId, userId) => {
                try {
                    const response = await axios.get(`https://yukine.ru/util/api/users/${guildId}/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${process.env.BEARERTOKEN}`
                        }
                    })
                    return response.data
                } catch (error) {
                    console.log(error)
                }
            }
            const getOnline = await getUser(ChannelID.META, interaction.user.id)
            type === 'Cloud' ?
                client.channels.cache.get(channelRequest).send({
                    embeds: [embed.setFields(
                        { name: label[0], value: `\`\`\`${interaction.fields.getTextInputValue('modalRolesInfo_Input1')}\`\`\`` },
                        { name: label[1], value: `\`\`\`${interaction.fields.getTextInputValue('modalRolesInfo_Input2')}\`\`\`` },
                        { name: label[2], value: `\`\`\`${interaction.fields.getTextInputValue('modalRolesInfo_Input3')}\`\`\`` },
                        {
                            name: 'Онлайн на сервере', value: `\`\`\`${getOnline.online / 3600}\`\`\``
                        }
                    )
                    ],
                    components: [buttons]
                }) :
                client.channels.cache.get(channelRequest).send({
                    embeds: [embed.setFields(
                        { name: label[0], value: `\`\`\`${interaction.fields.getTextInputValue('modalRolesInfo_Input1')}\`\`\`` },
                        { name: label[1], value: `\`\`\`${interaction.fields.getTextInputValue('modalRolesInfo_Input2')}\`\`\`` },
                        { name: label[2], value: `\`\`\`${interaction.fields.getTextInputValue('modalRolesInfo_Input3')}\`\`\`` }
                    )
                    ],
                    components: [buttons]
                })
        }
        await interaction.reply({ ephemeral: true, content: 'Заявка была отправлена' })
    }
}