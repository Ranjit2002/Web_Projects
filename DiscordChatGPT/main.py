# app id: 1542913399514599565
# public key: 276c1b0b9465be94d1f9a1bad72cc419a931b878c1bd2b699b02815864ad6893

import discord

class MyClient(discord.Client):
    async def on_ready(self):
        print('Logged on as', self.user)

    async def on_message(self, message):
        # don't respond to ourselves
        if message.author == self.user:
            return

        if message.content == 'ping':
            await message.channel.send('pong')
        channel = message.channel
        await channel.send("Hello I am Chitti!")

intents = discord.Intents.default()
intents.message_content = True
client = MyClient(intents=intents)
# client.run('token')
client.run('MTU0MjkxMzM5OTUxNDU5OTU2NQ.GbowYc.JQNi8DkJy3_FgencQjB7iW8KgvNLWoq7pqPN1U')