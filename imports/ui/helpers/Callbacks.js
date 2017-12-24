import {check, Match} from 'meteor/check';
import {NonNull} from "../../api/utils/CheckUtils";
import {i18n} from "../../api/language/i18n";

export const createCallback=function(options) {
    check(options, {
        instance:NonNull,
        silentErr:Match.Maybe(Boolean),
        silentRes:Match.Maybe(Boolean),
        onErr:Match.Maybe(Function),
        onRes:Match.Maybe(Function),
    });
    return function (err, res) {
        console.log(err, res);
        if (err && !options.silentErr) {
            // notify
            if (options.onErr) options.onErr.call(this, err);
            return;
        }
        if ((typeof res ==='undefined' || res === null) && !options.silentErr) {
            err = new Error(i18n.get("errors.resultExpected"));
            // notify
            if (options.onErr) options.onErr.call(this, err);
            return;
        }
        if (!options.silentRes) {
            // notify
            if (options.onRes) options.onRes.call(this, res);
        }
    }.bind(options.instance);
};