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
    return typeof obj === 'object';
});

export const MaybeEmptyObject = Match.Where((obj)=>{
    return typeof obj === 'object';
});

//from:https://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address
// TODO: find npm package
export const validateEmail = (email) => {
    return email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)
};

export const ValidEmail = Match.Where(validateEmail);