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

    publish: function (channel, message) {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await client.publish(channel, JSON.stringify(message));
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }
};
