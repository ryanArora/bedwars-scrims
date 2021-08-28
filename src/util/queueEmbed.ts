import { ISettings } from "../schemas/Settings";
import { MessageEmbed } from "discord.js";
import mentionsStr from "./mentionsStr";

const queueEmbed = (settings: ISettings) => {
  const embed = new MessageEmbed();
  embed.setColor("#841ccf");

  if (settings.players.length >= 8) {
    embed.setTitle("Queue - " + (settings.team2.length < 4 ? "Picking Teams" : "Game Started"));
    embed.addField("Team 1", mentionsStr(settings.team1, "\n", "No players on the team!"));
    embed.addField("Team 2", mentionsStr(settings.team2, "\n", "No players on the team!"));

    const remaining = settings.players.filter((p) => !settings.team1.includes(p) && !settings.team2.includes(p));
    if (remaining.length > 0) embed.addField("Remaining Players", mentionsStr(remaining, "\n"));
  } else {
    embed.setTitle(`Queue [${settings.players.length}/8]`);
    embed.setDescription(mentionsStr(settings.players, "\n", "No players in queue!"));
  }

  return embed;
};

export default queueEmbed;
