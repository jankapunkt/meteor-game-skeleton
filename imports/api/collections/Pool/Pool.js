

export const Pool = {
    name:"pool",
    label:"pool.title",
    icon:"database",
    schema:{
        userId:String
    },
    methods:{
        add:{
            name:"pool.methods.addUser",
            schema:{
                userId:String,
            },
        },
        remove:{
            name:"pool.methods.removeUser",
            schema:{
                userId:String,
            },
        },
        get:{
            name:"pool.methods.get",
            schema:{},
        }
    },
    publications:{},
    dependencies:[],
};