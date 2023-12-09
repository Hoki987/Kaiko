const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const { Utility } = require("../../../config.js")

function renderStats(data, page, totalPages, description, target, executor) {
    let components;
    const embed = new EmbedBuilder()
        .setTitle(`Статистика заявок | META`)
        .setColor(Utility.colorDiscord)
        .setThumbnail(target)
        .setFields([{
            name: '```   Номер / Дата   ```',
            value: data.map((p, i) => `**#${(page - 1) * 10 + i + 1}** <t:${Math.round(p.createdAt.getTime() / 1000)}:d>`).join('\n'),
            inline: true
        }, {
            name: '```   Статус заявки   ```',
            value: data.map(p => p.status).join('\n'),
            inline: true
        }, {
            name: '```   Соискатель   ```',
            value: data.map(p => `<@${p.executor?.toString()}>` || 'Не найден').join('\n'),
            inline: true
        }])
    if (totalPages > 1) {
        embed.setFooter({ text: `Страница ${page}/${totalPages}` })
        components = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`stats_left_${executor}`)
                .setEmoji('◀')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(page === 1),
            new ButtonBuilder()
                .setCustomId(`stats_right_${executor}`)
                .setEmoji('▶')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(page === totalPages),
        )
    }
    if (description) {
        embed.setDescription(description)
    }
    return {
        embeds: [embed], components: components ? [components] : undefined
    }
}

module.exports = { renderStats }