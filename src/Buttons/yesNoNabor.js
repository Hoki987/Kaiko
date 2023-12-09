//===========================================/ Import the modeles \===========================================\\
const { Client, ButtonInteraction, EmbedBuilder } = require('discord.js');

//==========< OTHERS >==========\\
const { Utility } = require('../config.js')
const requestsStat = require('../Structures/Models/requestsStat.js')

//===========================================< Code >===========================\\
module.exports = {
    data: {
        name: 'naborChoices'
    },

    /**
     * @param {Client} client
     * @param {ButtonInteraction} interaction
     */

    async execute(client, interaction) {
        const [, type, executor, subType] = interaction.customId.split('_')
        let color;
        let content = [];
        switch (subType) {
            case 'ControlModNab':
                content.push('Контрола')
                break;
            case 'AssistModNab':
                content.push('Ассистента')
                break;
            case 'EventModNab':
                content.push('Ивентера')
                break;
            case 'MafiaModNab1':
                content.push('Ведущего мафии')
                break;
            case 'MafiaModNab2':
                content.push('Ведущего бункера')
                break;
            case 'CloseModNab':
                content.push('Клозера')
                break;
            case 'CreativeModNab':
                content.push('Креатива')
                break;
            case 'ContenterModNab':
                content.push('Контентера')
                break;
        }
        switch (type) {
            case 'accept':
                color = Utility.colorGreen
                content.push(`<@${interaction.user.id}> \`одобрил(а)\` заявку!`, "\`\`\`ansi\n[2;36m[1;36m[1;36m[0;36mВаша заявка была одобрена![0m[1;36m[0m[1;36m[0m[2;36m[0m\`\`\`", `Скоро с вами свяжутся, следите за **личными сообщениями!**`)
                await requestsStat.update({ status: 'Одобрено' }, { where: { executor: executor, type: subType, status: 'В ожидании' } })
                break;
            case 'deny':
                color = Utility.colorRed
                content.push(`<@${interaction.user.id}> \`отклонил(а)\` заявку!`, "\`\`\`ansi\n[2;36m[2;31mВаша заявка была отклонена![0m[2;36m[0m\`\`\`", "За подробной информацией по вашему \`отказу\` вы можете обратиться к нему(ей) в **личные сообщения!**")
                await requestsStat.update({ status: 'Отказано' }, { where: { executor: executor, type: subType, status: 'В ожидании' } })
                break;
        }
        await interaction.update({
            content: content[1],
            embeds: [{ ...interaction.message.embeds[0].data, color: color }],
            components: [{ components: [{ ...interaction.message.components[0].components[0].data, disabled: true }, { ...interaction.message.components[0].components[1].data, disabled: true }] }]
        })
        client.users.cache.get(executor).send({
            embeds: [new EmbedBuilder()
                .setAuthor({ name: `Исполнитель: ${interaction.user.username} | ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL() })
                .setDescription(`${content[2]}\n${content[3]}`)
                .setColor(Utility.colorDiscord)
                .setImage('https://cdn.discordapp.com/attachments/772218365413818428/1079003352408543302/11112.png')
                .setFooter({ text: `Сервер | META ・ заявки на ${content[0]}`, iconURL: Utility.iconMETA })]
        })
    }
}