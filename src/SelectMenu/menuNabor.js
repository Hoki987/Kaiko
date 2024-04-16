//===========================================/ Import the modeles \===========================================\\
const {
    Client,
    StringSelectMenuInteraction,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
} = require("discord.js");

//==========< OTHERS >==========\\
const embedsModel = require("../Structures/Models/embedsModel.js");
const blackListNabor = require("../Structures/Models/blackListNabor.js");
const { Op } = require("sequelize");

//===========================================< Code >===========================\\
module.exports = {
    data: {
        name: "naborMenuselect",
    },

    /**
     * @param {Client} client
     * @param {StringSelectMenuInteraction} interaction
     */

    async execute(client, interaction) {
        let embed;
        let customLabel;
        const [, type] = interaction.customId.split("_");
        const [, subType] = interaction.values[0].split("_");

        const findActiveBan = await blackListNabor.findOne({
            where: {
                target: interaction.user.id,
                category: {
                    [Op.or]: [{ [Op.is]: null }, { [Op.eq]: subType }],
                },
                expiresAt: { [Op.or]: [{ [Op.gt]: new Date() }, { [Op.is]: null }] },
            },
            order: [['createdAt', 'DESC NULLS FIRST']]
        });
        if (findActiveBan) {
            await interaction.reply({
                ephemeral: true,
                content: findActiveBan.expiresAt
                    ? `Подача заявок будет разблокирована <t:${Math.floor(
                        findActiveBan.expiresAt.getTime() / 1000
                    )}:R>`
                    : `Подача заявок была заблокирована \`навсегда\``,
            });
            return;
        }
        if (type === "stuffNaborMain") {
            switch (subType) {
                case "ControlModNab":
                    customLabel = ["Заявка на Модератора войсов", "Заявка на модератора чатов"]
                    const controlEmbed = await embedsModel.findOne({
                        where: { type: "nabor_Control" },
                    });
                    embed = JSON.parse(controlEmbed.embed);
                    break;
                case "EventModNab":
                    const eventEmbed = await embedsModel.findOne({
                        where: { type: "nabor_Event" },
                    });
                    embed = JSON.parse(eventEmbed.embed);
                    break;
                case "MafiaModNab":
                    customLabel = ["Заявка на Ведущего мафии", "Заявка на Ведущего бункера"]
                    const mafiaEmbed = await embedsModel.findOne({
                        where: { type: "nabor_Mafia" },
                    });
                    embed = JSON.parse(mafiaEmbed.embed);
                    break;
                case "CloseModNab":
                    const closeEmbed = await embedsModel.findOne({
                        where: { type: "nabor_Close" },
                    });
                    embed = JSON.parse(closeEmbed.embed);
                    break;
                case "CreativeModNab":
                    const creativeEmbed = await embedsModel.findOne({
                        where: { type: "nabor_Creative" },
                    });
                    embed = JSON.parse(creativeEmbed.embed);
                    break;
                case "ContentModNab":
                    const contenterEmbed = await embedsModel.findOne({
                        where: { type: "nabor_Contenter" },
                    });
                    embed = JSON.parse(contenterEmbed.embed);
                    break;
            }
        }
        let components;
        if (['MafiaModNab', 'ControlModNab'].includes(subType)) {
            components = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`nabor_${subType}1`)
                    .setLabel(customLabel[0])
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId(`nabor_${subType}2`)
                    .setLabel(customLabel[1])
                    .setStyle(ButtonStyle.Secondary)
            );
        } else {
            components = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`nabor_${subType}`)
                    .setLabel("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤПодать заявкуㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ")
                    .setStyle(ButtonStyle.Secondary)
            );
        }
        try {
            if ("embeds" in embed) {
                await interaction.reply({
                    ephemeral: true,
                    ...embed,
                    components: [components],
                });
            } else {
                await interaction.reply({
                    ephemeral: true,
                    embeds: [embed],
                    components: [components],
                });
            }
        } catch (error) {
            await interaction.reply({
                ephemeral: true,
                embeds: embed,
                components: [components],
            });
        }
    },
};
