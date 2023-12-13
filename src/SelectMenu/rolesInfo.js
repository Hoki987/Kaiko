//===========================================/ Import the modeles \===========================================\\
const { Client, StringSelectMenuInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

//==========< OTHERS >==========\\
const embedsModel = require('../Structures/Models/embedsModel.js');

//===========================================< Code >===========================\\
module.exports = {
    data: {
        name: 'rolesinfoMenu'
    },

    /**
     * @param {Client} client
     * @param {StringSelectMenuInteraction} interaction
     */

    async execute(client, interaction) {
        const [, type] = interaction.customId.split('_')
        const [, subType, roleId, channelRequest] = interaction.values[0].split('_')

        let embed;
        let customId;
        switch (type) {
            case "GameRoles":
            case "AnnouncementRoles":
                const hasRoleAC = (id) => interaction.member.roles.cache.has(id);
                const contentAC = (id) => hasRoleAC(id) ? "Роль успешно забрана" : "Роль успешно выдана"
                switch (true) {
                    case subType !== "Clear":
                        interaction.member.roles[hasRoleAC(roleId) ? "remove" : "add"](roleId)
                        interaction.reply({ ephemeral: true, content: contentAC(roleId) });
                        break;
                    default:
                        interaction.update({})
                        break;
                }
                break;
            case "CustomRoles":
                const findEmbed = await embedsModel.findOne({ where: { type: `rolesInfo_${subType}` } })
                switch (`rolesInfo_${subType}`) {
                    case findEmbed?.type:
                        embed = JSON.parse(findEmbed.embed)
                        customId = findEmbed.type.split('_')[1]
                        break;
                }
                switch (customId) {
                    case 'Loveroom':
                    case 'Nitro':
                    case 'Ruchki':
                    case 'Picture':
                    case 'Signa':
                    case 'Kubok':
                        await interaction.reply({ ephemeral: true, embeds: embed })
                        break;
                    default:
                        customId ? await interaction.reply({
                            ephemeral: true,
                            embeds: embed,
                            components: [new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                    .setLabel('ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤПодать заявкуㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setCustomId(`rolesInfo_${customId}_${channelRequest}`)
                            )]
                        }) : interaction.update({})
                        break;
                }
                break;
        }
    }
}