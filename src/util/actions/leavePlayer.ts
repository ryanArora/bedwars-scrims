import { GuildMember, MessageEmbed } from "discord.js";
import { ISettings, Teams } from "../../schemas/Settings";

const leavePlayer = async (member: GuildMember, settings: ISettings) => {
  const channel = member.guild.channels.cache.get(settings.scrimsChat);
  if (channel?.type !== "GUILD_TEXT" || !channel.isText()) {
    console.log("Unable to find scrims chat channel while joining player", member.user.tag);
    return;
  }

  const i = settings.players.indexOf(member.id);
  if (i === -1) {
    channel.send("You weren't in the queue!");
    return;
  }

  settings.players.splice(i, 1);
  settings.team1 = [];
  settings.team2 = [];
  settings.pick = Teams.ONE;

  const embed = new MessageEmbed();
  embed.setColor("#841ccf");
  embed.setTitle("Player Left (unlucky)");

  if (settings.players.length <= 6) {
    embed.setDescription(`[${settings.players.length}/8] <@${member.id}> left the queue.`);
  } else {
    embed.setDescription(`[${settings.players.length}/8] <@${member.id}> left after queued, repicking teams!`);
  }

  channel.send({ embeds: [embed] });

  await settings.save().catch((err) => {
    console.log(err);
    channel.send("Failed to save player leave!");
  });
};

export default leavePlayer;
