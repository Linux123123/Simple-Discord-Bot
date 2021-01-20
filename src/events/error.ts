module.exports = async (client, error) => {
    client.logger.error(`An error has accured: \n${JSON.stringify(error)}`);
};
