

Accounts.methods = {
    createUser:{
        name:"accounts.methods.createUser",
        schema:{
            username:String,
            email:String,
            password:String,
        },
    },
    userExists:{
        name:"accounts.methods.userExists",
        schema:{
            username:String,
        },
        isPublic:true,
    },
};

Accounts.publications = {

};

Accounts.dependencies = [];