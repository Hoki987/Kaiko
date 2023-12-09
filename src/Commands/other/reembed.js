//===========================================/ Import the modeles \===========================================\\
const { Client, ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");

//==========< OTHERS >==========\\
const embedsModel = require('../../Structures/Models/embedsModel.js')
const { Emoji } = require("../../config.js");

//===========================================< Code >===========================\\

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reembed")
        .setDescription("Вызвать меню изменения набора.")
        .setDMPermission(false),

    /**
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(client, interaction) {
        const embed = await embedsModel.findOne({ where: { type: 'reembed_Main' } })
        await interaction.reply({
            ephemeral: true,
            embeds: JSON.parse(embed.embed),
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId("naborMenu_stuffRec")
                            .setPlaceholder("Выбери роль, которую хочешь изменить")
                            .addOptions(
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Контрол")
                                    .setEmoji(Emoji.NaborControl)
                                    .setValue("select_ControlReemRec"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Ассистент")
                                    .setEmoji(Emoji.NaborAssist)
                                    .setValue("select_AssistReemRec"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Ивентер")
                                    .setEmoji(Emoji.NaborEvent)
                                    .setValue("select_EventReemRec"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Ведущий")
                                    .setEmoji(Emoji.NaborMafia)
                                    .setValue("select_MafiaReemRec"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Клозер")
                                    .setEmoji(Emoji.NaborClose)
                                    .setValue("select_CloseReemRec"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Креатив")
                                    .setEmoji(Emoji.NaborCreative)
                                    .setValue("select_CreativeReemRec"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Контентер")
                                    .setEmoji(Emoji.NaborContent)
                                    .setValue("select_ContentReemRec"),
                            )
                    )
            ]
        })
    }
}