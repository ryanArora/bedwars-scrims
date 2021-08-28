import { GuildMember, MessageEmbed } from "discord.js";
import { ISettings, PickingMode, Teams } from "../../schemas/Settings";
import randomInts from "../api/randomInts";
import queueEmbed from "../queueEmbed";
import shuffle from "../shuffle";

const joinPlayer = async (member: GuildMember, settings: ISettings) => {
  const channel = member.guild.channels.cache.get(settings.scrimsChat);
  if (channel?.type !== "GUILD_TEXT" || !channel.isText()) {
    console.log("Unable to find scrims chat channel while joining player", member.user.tag);
    return;
  }

  if (settings.players.includes(member.id)) {
    channel.send("You're already in the queue!");
    return;
  }

  if (settings.players.length >= 8) {
    channel.send("The queue is already full!");
    return;
  }

  settings.players.push(member.id);

  let content: string | undefined = undefined;
  let embed = new MessageEmbed();

  if (settings.players.length <= 7) {
    embed.setColor("#841ccf");
    embed.setTitle("Player Joined");
    embed.setDescription(`[${settings.players.length}/8] <@${member.id}> joined the queue.`);
  } else {
    const shuffled = shuffle(settings.players.slice());
    let cap1 = shuffled[0];
    let cap2 = shuffled[1];

    if (settings.pickingMode === PickingMode.FIRST) {
      cap1 = settings.players[0] as string;
      cap2 = settings.players[1] as string;
    } else if (settings.pickingMode === PickingMode.TRUERANDOM) {
      const rand = await randomInts(2, 0, 7, false).catch(() => {});
      if (rand && typeof rand[0] === "number" && typeof rand[1] === "number") {
        cap1 = settings.players[rand[0]];
        cap2 = settings.players[rand[1]];
      }
    }

    settings.team1 = [cap1];
    settings.team2 = [cap2];
    settings.pick = Teams.ONE;

    content = `<@${cap1}> can select **1** player for the next pick.`;
    embed = queueEmbed(settings);
  }

  channel.send({ embeds: [embed], content });

  await settings.save().catch((err) => {
    console.log(err);
    channel.send("Failed to save player join!");
  });
};

export default joinPlayer;
