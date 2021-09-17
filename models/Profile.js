module.exports = (sequelize, DataTypes) => {

    const Profile = sequelize.define("Profile", {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        avatarUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    })
    return Profile
}