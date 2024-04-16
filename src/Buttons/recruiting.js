//===========================================/ Import the modeles \===========================================\\
const { Client, ButtonInteraction, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require('discord.js');

//==========< OTHERS >==========\\
const embedsModel = require('../Structures/Models/embedsModel.js')
const { ChannelID, RoleID } = require('../config.js')

//===========================================< Code >===========================\\
module.exports = {
    data: {
        name: 'sendNabor'
    },

    /**
     * @param {Client} client
     * @param {ButtonInteraction} interaction
     */

    async execute(client, interaction) {
        const [, subType] = interaction.customId.split('_')
        const recruitMap = new Map();
        let components;
        const dictionary = {
            'ControlModNab': 'nabor_Control',
            'EventModNab': 'nabor_Event',
            'MafiaModNab': 'nabor_Mafia',
            'CloseModNab': 'nabor_Close',
            'CreativeModNab': 'nabor_Creative',
            'ContentModNab': 'nabor_Contenter'
        }
        const findEmbed = await embedsModel.findOne({ where: { type: dictionary[subType] } })
        const embed = JSON.parse(findEmbed.embed);

        recruitMap.set('ControlModNab', {
            label: ["Заявка на Модератора войсов", "Заявка на Модератора чатов"],
        })

        recruitMap.set('MafiaModNab', {
            label: ["Заявка на Ведущего мафии", "Заявка на Ведущего бункера"],

        })

        const recruit = recruitMap.get(subType);

        if (["ControlModNab", "MafiaModNab"].includes(subType)) {
            components = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`nabor_${subType}1`)
                    .setLabel(recruit.label[0])
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId(`nabor_${subType}2`)
                    .setLabel(recruit.label[1])
                    .setStyle(ButtonStyle.Secondary)
            );
        } else {
            components = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`nabor_${subType}`)
                        .setLabel("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤПодать заявкуㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ")
                        .setStyle(ButtonStyle.Secondary),
                )
        }
        try {
            if ('embeds' in embed) {
                await client.channels.cache.get(ChannelID.Nabor).send({
                    ...embed,
                    content: `<@&${RoleID.AnNabor}>`,
                    components: [components]
                });
            } else {
                await client.channels.cache.get(ChannelID.Nabor).send({
                    content: `<@&${RoleID.AnNabor}>`,
                    embeds: [embed],
                    components: [components]
                });
            }
        } catch (error) {
            await client.channels.cache.get(ChannelID.Nabor).send({
                content: `<@&${RoleID.AnNabor}>`,
                embeds: embed,
                components: [components]
            })
        }
        await interaction.reply({ ephemeral: true, content: "Набор успешно отправлен!" });
    }
}