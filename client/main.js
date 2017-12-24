import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// PACKAGES
import bootstrap from 'bootstrap';
import '../public/css/theme.css';

// HELPERS
import '../imports/ui/helpers/TemplateHelpers';

// STARTUP
import '../imports/api/language/i18n';
import '../imports/startup/both/accounts';
import '../imports/startup/both/schema';
import '../imports/startup/client/routes';


// MAIN
import './main.html';

