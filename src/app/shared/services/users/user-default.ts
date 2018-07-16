import { IUser } from '../../../models/user.model'

export let UserDefault: IUser = {
    "name": "rigasa",
    "hash": '$2y$10$OxKx0Vpk5SJJPZFb2hRn0.o79LR7Dw6FpczGmY5QoWh0yVCVF6Dq.',
    "role": 'admin',
    "created": new Date(),
    "modified": new Date(),
    "lang": 'fr-FR'
}
/*
{
    "_id": {
        "$oid": "5b3f2347881bf30023125643"
    },
    "name": "rigasa",
    "role": "admin",
    "created": {
        "$date": "2018-07-05T10:02:00.000Z"
    },
    "modified": {
        "$date": "2018-07-05T10:02:00.000Z"
    },
    "lang": "fr-FR",
    "__v": 0
}
*/