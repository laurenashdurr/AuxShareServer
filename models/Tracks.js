module.exports = (sequelize, DataTypes) => {

    const Tracks = sequelize.define("Tracks", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    })
    return Tracks
}