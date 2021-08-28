import { GuildMember, MessageEmbed } from "discord.js";
import { ISettings, Teams } from "../../schemas/Settings";
import queueEmbed from "../queueEmbed";
import goTeams from "./goTeams";

const pickPlayer = async (team: Teams, picked: GuildMember, settings: ISettings) => {
  const channel = picked.guild.channels.cache.get(settings.scrimsChat);
  if (channel?.type !== "GUILD_TEXT" || !channel.isText()) {
    console.log("Unable to find scrims chat channel while joining player", picked.user.tag);
    return;
  }

  if (!settings.players.includes(picked.id)) {
    channel.send("That member isn't in the queue!");
    return;
  }

  if ((team === Teams.ONE && settings.team1.includes(picked.id)) || (team === Teams.TWO && settings.team2.includes(picked.id))) {
    channel.send("You have already picked that player!");
    return;
  }

  if ((team === Teams.ONE && settings.team2.includes(picked.id)) || (team === Teams.TWO && settings.team1.includes(picked.id))) {
    channel.send("The other team has already picked that player!");
    return;
  }

  if (team === Teams.ONE) {
    settings.pick = Teams.TWO;
    settings.team1.push(picked.id);
  } else {
    settings.pick = Teams.ONE;
    settings.team2.push(picked.id);
  }

  const remaining = settings.players.filter((p) => !settings.team1.includes(p) && !settings.team2.includes(p));
  let content = "";
  let embed: MessageEmbed | undefined = undefined;

  if (remaining.length > 1) {
    content = `<@${settings.pick === Teams.ONE ? settings.team1[0] : settings.team2[0]}> can select **1** player for the next pick.`;
    embed = queueEmbed(settings);
  } else {
    settings.team2 = settings.team2.concat(remaining);

    content = "Teams have been picked! The game will start shortly.";
    embed = queueEmbed(settings);

    goTeams(picked.guild, settings);

    settings.players = [];
    settings.team1 = [];
    settings.team2 = [];
    settings.pick = Teams.ONE;
  }

  channel.send({ content, embeds: [embed] });

  // reset queue when the teams have been picked (no players remaining)

  settings.save().catch((err) => {
    console.log(err);
    channel.send("Failed to save pick");
  });
};

export default pickPlayer;
