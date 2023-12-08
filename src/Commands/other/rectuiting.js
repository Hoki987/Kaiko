//===========================================/ Import the modeles \===========================================\\
const { Client, ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");

//==========< OTHERS >==========\\
const embedsModel = require('../../Structures/Models/embedsModel.js');
const { Emoji } = require("../../config.js");

//===========================================< Code >===========================\\

module.exports = {
    data: new SlashCommandBuilder()
        .setName("recruiting")
        .setDescription("Меню выбора стафф роли, набор который сейчас запостится.")
        .setDMPermission(false),

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(client, interaction) {
        const embed = await embedsModel.findOne({ where: { type: 'recruiting_Main' } })
        await interaction.reply({
            ephemeral: true,
            embeds: JSON.parse(embed.embed),
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId("naborMenu_stuffRec")
                            .setPlaceholder("Выбери роль для набора")
                            .addOptions(
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Контрол")
                                    .setEmoji(Emoji.NaborControl)
                                    .setValue("select_ControlModRec"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Ассистент")
                                    .setEmoji(Emoji.NaborAssist)
                                    .setValue("select_AssistModRec"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Ивентер")
                                    .setEmoji(Emoji.NaborEvent)
                                    .setValue("select_EventModRec"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Ведущий")
                                    .setEmoji(Emoji.NaborMafia)
                                    .setValue("select_MafiaModRec"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Клозер")
                                    .setEmoji(Emoji.NaborClose)
                                    .setValue("select_CloseModRec"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Креатив")
                                    .setEmoji(Emoji.NaborCreative)
                                    .setValue("select_CreativeModRec"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Контентер")
                                    .setEmoji(Emoji.NaborContent)
                                    .setValue("select_ContentModRec")
                            )
                    )
            ]
        })
    }
};