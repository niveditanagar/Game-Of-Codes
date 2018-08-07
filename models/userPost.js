module.exports = function (sequelize, DataTypes) {
    var PostContent = sequelize.define("PostContent", {
        content: {
            type: DataTypes.STRING,
        }
    });
    
    PostContent.associate = function (models) {
        PostContent.belongsTo(models.User, {
            foreignKey:{
                allowNull: false,
            }
        });
    }
    return PostContent;
 }