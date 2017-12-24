/**
 * Global routes definitions.
 */
export const Routes = {

    /**
     * Route triggers on entering a page.
     */
    triggers:{
        toLogin(){
            import {Meteor} from 'meteor/meteor';
            if (!Meteor.user() && !Meteor.userId()) {
                import {FlowRouter} from 'meteor/ostrio:flow-router-extra';
                FlowRouter.go(Routes.login.path);
            }
        },
    },

    /**
     * Render targets.
     */
    targets:{
        main:"main-container",
    },

    ///////////////////////////////////////////////

    root:{
        name(){
            return Meteor.user() && Meteor.userId() ? "dashboard" : "frontPage";
        },
        label:"routes.root",
        icon(){return "pie-chart"},
        path:"/",
        target(){
            return Routes.targets.main;
        },
        triggersEnter(){return []},
        toRoute(){
            return this.path;
        },
        template(){
            if (Meteor.user() && Meteor.userId()) {
                import '../../ui/pages/dashboard/dashboard'
            }else{
                import '../../ui/pages/frontPage/frontPage';
            }
        },
        data:{},
    },

    login:{
        name(){return "login"},
        label:"routes.login",
        icon(){return ""},
        path:"/login",
        target(){return Routes.targets.main;},
        triggersEnter(){
            return [Routes.triggers.toLogin];
        },
        toRoute(){return this.path;},
        template(){
            import '../../ui/pages/login/login';
        },
        data:{},
    },

    notFound:{
        name(){return "notFound"},
        label:"routes.notFound",
        icon:"question-circle-o",
        path:"*",
        target(){return Routes.targets.main;},
        triggersEnter(){
            return [Routes.triggers.toLogin];
        },
        toRoute(){return "";},
        template(){
            import '../../ui/pages/notFound/notFound';
        },
        data:{},
    },

    register:{
        name(){return "register"},
        label:"routes.register",
        icon:"question-circle-o",
        path:"/register",
        target(){return Routes.targets.main;},
        triggersEnter(){
            return [];
        },
        toRoute(){return "";},
        template(){
            import '../../ui/pages/register/register';
        },
        data:{},
    },

    mainRoutes(){
        return [Routes.root, Routes.login, Routes.register, Routes.notFound]
    },

    ///////////////////////////////////////////////

    all(){
        return [].concat(Routes.mainRoutes());
    },
};