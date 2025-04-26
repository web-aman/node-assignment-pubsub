const { createClient } = require("redis");

const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});

(async () => {
    client.on("error", (err) => console.log("Redis Client Error", err));
    client.on("connect", () => console.log("Redis Connected"));

    await client.connect();
})();

module.exports = {
    disconnect: function () {
        client.quit();
    },

    subscribe: function (channel, callback) {
        return new Promise(async (resolve, reject) => {
            try {
                await client.subscribe(channel, async (message) => {
                    callback(message);
                });

                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }

};
