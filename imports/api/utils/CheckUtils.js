import {check, Match} from 'meteor/check';

export const NonEmptyString = Match.Where((x) => {
    check(x, String);
    return x.length > 0;
});

export const NonEmptyObject = Match.Where((obj) => {
    return typeof obj === 'object' && Object.keys(obj).length > 0;
});


export const NonNull = Match.Where((any) => {
    return any !== null && typeof any !== 'undefined';
});

export const ObjectType = Match.Where((obj) => {
    if (typeof obj !== 'object') return false;
});

export const MaybeEmptyObject = Match.Maybe(ObjectType);
