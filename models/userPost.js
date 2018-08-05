module.exports = function (sequelize, DataTypes) {
    var postContent = sequelize.define("postContent", {
        Content: {
            type: DataTypes.STRING,
        }
    });

    
    postContent.associate = function (models) {
        postContent.belongsTo(models.User, {
            foreignKey:{
                allowNull: false,
            }
        });
    }
    return postContent;
}