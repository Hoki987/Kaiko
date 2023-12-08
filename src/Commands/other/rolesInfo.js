//===========================================/ Import the modeles \===========================================\\
const { Client, ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");

//==========< OTHERS >==========\\
const embedsModel = require('../../Structures/Models/embedsModel.js');
const { Emoji } = require("../../config.js");

//===========================================< Code >===========================\\
module.exports = {
    data: new SlashCommandBuilder()
        .setName("rolesinfo")
        .setDescription("Информация ролей приветствия")
        .setDMPermission(false),

    /**
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(client, interaction) {
        const gameEmbed = await embedsModel.findOne({ where: { type: 'rolesInfo_GameRoles' } })
        const announcementEmbed = await embedsModel.findOne({ where: { type: 'rolesInfo_AnnouncementRoles' } })
        const customEmbed = await embedsModel.findOne({ where: { type: 'rolesInfo_CustomRoles' } })
        await interaction.channel.send({
            embeds: JSON.parse(gameEmbed.embed),
            components: [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("selectMenu_GameRoles")
                        .setPlaceholder("Выберите нужное")
                        .addOptions(
                            new StringSelectMenuOptionBuilder()
                                .setLabel("minecraft")
                                .setEmoji(Emoji.Minecraft)
                                .setValue("select_AnMinecraft"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("dota 2")
                                .setEmoji(Emoji.Dota)
                                .setValue("select_AnDota"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("league of legends")
                                .setEmoji(Emoji.LOL)
                                .setValue("select_AnLol"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("cs:go")
                                .setEmoji(Emoji.CSGO)
                                .setValue("select_AnCs"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("valorant")
                                .setEmoji(Emoji.Valorant)
                                .setValue("select_AnValorant"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Очистить выбор")
                                .setEmoji(Emoji.Trash)
                                .setValue("select_Clear")
                        )
                )
            ]
        }),
            await interaction.channel.send({
                embeds: JSON.parse(announcementEmbed.embed),
                components: [
                    new ActionRowBuilder().addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId("select_AnnouncementRoles")
                            .setPlaceholder("Выберите нужное")
                            .addOptions(
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("анонсы наборов в стафф")
                                    .setEmoji(Emoji.NaborStuff)
                                    .setValue("select_AnNabor"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("анонсы кинотеатра")
                                    .setEmoji(Emoji.Kino)
                                    .setValue("select_AnKino"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("анонсы творчества")
                                    .setEmoji(Emoji.CreativeAn)
                                    .setValue("select_AnCreative"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("анонсы браузерных игр")
                                    .setEmoji(Emoji.Browser)
                                    .setValue("select_AnBrowser"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("анонсы настольных игр")
                                    .setEmoji(Emoji.Dice)
                                    .setValue("select_AnNastolki"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("анонсы клозов")
                                    .setEmoji(Emoji.CloseAn)
                                    .setValue("select_AnClose"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("анонсы мафии")
                                    .setEmoji(Emoji.MafiaAn)
                                    .setValue("select_AnMafia"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("анонсы бункера")
                                    .setEmoji(Emoji.BunkerAn)
                                    .setValue("select_AnBunker"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Очистить выбор")
                                    .setEmoji(Emoji.Trash)
                                    .setValue("select_Clear")
                            ),
                    )
                ]
            }),
            await interaction.channel.send({
                embeds: JSON.parse(customEmbed.embed),
                components: [
                    new ActionRowBuilder().addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId("select_CustomRoles")
                            .setPlaceholder("Выберите нужное")
                            .addOptions(
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Товарищ сервера")
                                    .setEmoji(Emoji.Ruchki)
                                    .setValue("select_AnRuchki"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Показатель эрудированности пользователя")
                                    .setEmoji(Emoji.Erydit)
                                    .setValue("select_AnErydit"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Показатель частой и хорошей игры в клозы")
                                    .setEmoji(Emoji.VHSClose)
                                    .setValue("select_AnCloseRole"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Показатель хорошей игры в мафию или бункер")
                                    .setEmoji(Emoji.VHSMafia)
                                    .setValue("select_AnMafiaRole"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Порядочный человек")
                                    .setEmoji(Emoji.Cloudy)
                                    .setValue("select_AnCloud"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Даббер сервера")
                                    .setEmoji(Emoji.Dubber)
                                    .setValue("select_AnDabber"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Музыкант сервера")
                                    .setEmoji(Emoji.Music)
                                    .setValue("select_AnMusic"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Художник сервера")
                                    .setEmoji(Emoji.Painter)
                                    .setValue("select_AnPainter"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Чтец сервера")
                                    .setEmoji(Emoji.Reader)
                                    .setValue("select_AnReader"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Лаврумы")
                                    .setEmoji(Emoji.Loveroom)
                                    .setValue("select_AnLoveroom"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Нитро бустер")
                                    .setEmoji(Emoji.Nitro)
                                    .setValue("select_AnNitro"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Отправлять картинки")
                                    .setEmoji(Emoji.Pictures)
                                    .setValue("select_AnKartinki"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Выдается за сигну серверу")
                                    .setEmoji(Emoji.Signa)
                                    .setValue("select_AnSigna"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Выдается за победу в глобальном мероприятии")
                                    .setEmoji(Emoji.Kubok)
                                    .setValue("select_AnKubok"),
                                new StringSelectMenuOptionBuilder()
                                    .setLabel("Очистить выбор")
                                    .setEmoji(Emoji.Trash)
                                    .setValue("select_Clear")
                            ),
                    )
                ]
            });
    }
}