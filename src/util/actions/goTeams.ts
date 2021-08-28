import { Guild, VoiceChannel, Snowflake, TextChannel } from "discord.js";
import { ISettings } from "../../schemas/Settings";
import mentionsStr from "../mentionsStr";

const dragPlayers = async (players: Snowflake[], voice: VoiceChannel, notMoved?: string[]) => {
  for (const id of players) {
    voice.guild.members
      .fetch(id)
      .then((member) => {
        member.voice.setChannel(voice).catch(() => {
          if (notMoved) notMoved.push(id);
        });
      })
      .catch(() => {
        if (notMoved) notMoved.push(id);
      });
  }
};

const goTeams = async (guild: Guild, settings: ISettings) => {
  let text = guild.channels.cache.get(settings.scrimsChat);
  if (text?.type !== "GUILD_TEXT" || !text.isText()) {
    console.log("Unable to find scrims chat channel while dragging players");
    return;
  }

  let team1Voice = guild.channels.cache.get(settings.team1Voice);
  if (team1Voice?.type === "GUILD_VOICE" && team1Voice.isVoice()) {
    const notMoved: string[] = [];
    dragPlayers(settings.team1, team1Voice as VoiceChannel, notMoved);

    setTimeout(() => {
      const msg = mentionsStr(notMoved, ", ");
      if (msg) (text as TextChannel).send(`${msg} please join <#${(team1Voice as VoiceChannel).id}>`);
    }, 5000);
  } else {
    text.send("Team 1 voice channel not found, please update config");
  }

  let team2Voice = guild.channels.cache.get(settings.team2Voice);
  if (team2Voice?.type === "GUILD_VOICE" && team2Voice.isVoice()) {
    const notMoved: string[] = [];
    await dragPlayers(settings.team2, team2Voice as VoiceChannel, notMoved);

    setTimeout(() => {
      const msg = mentionsStr(notMoved, ", ");
      if (msg) (text as TextChannel).send(`${msg} please join <#${(team2Voice as VoiceChannel).id}>`);
    }, 5000);
  } else {
    text.send("Team 2 voice channel not found, please update config");
  }
};

export default goTeams;
