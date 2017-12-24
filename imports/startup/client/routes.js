import {FlowRouter} from 'meteor/ostrio:flow-router-extra';
import {Routes} from "../../api/routes/Routes";

import '../../ui/pages/splash/splash';

const allRoutes = Routes.all();

for (let route of allRoutes){
    FlowRouter.route(route.path, {
        triggersEnter: route.triggersEnter(),
        name: route.name(),
        waitOn(params, queryParams, ready) {
            console.log("wait on")
            route.template();
        },
        whileWaiting() {
            this.render(route.target(), 'splash',  {title:route.label});
        },
        action(params, queryParams) {
            console.log("action")
            /*Tracker.autorun(()=>{
                if (route.roles && Roles.subscription.ready()) {
                    route.roles();
                }
            });*/
            const data = route.data || {};
            data.params = params;
            data.queryParams = queryParams;
            this.render(route.target(), route.name(), data);
        }
    });
}