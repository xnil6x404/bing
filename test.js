const canvafy = require('canvafy');
async function generateRank() {
  const rank = await new canvafy.Rank()
    .setAvatar(message.author.displayAvatarURL({ forceStatic: true, extension: "png" }))
    .setBackground("image", "https://i.ibb.co/rtn9xSc/rank-png.webp")
    .setUsername("Sakibin")
    .setBorder("#fff")
    .setStatus("online")
    .setLevel(2)
    .setRank(1)
    .setCurrentXp(100)
    .setRequiredXp(400)
    .build();

  console.log(rank);
}

generateRank();
