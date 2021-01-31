import axios from 'axios';

import {
    DECLARATION_WEEKLY_CHALLENGES,
    PM_WINNER,
    PM_NICK,
    PM_SUBNICK_TEXT,
    PM_SUBNICK_IMG,
    PM_CHAMP,
    PM_FXP_POINTS,
    GENERAL_WARNING,
    SPAM_WARNING,
    IMPROPER_LANGUAGE_USE_WARNING
} from './Data';

const FIREBASE_DB = 'https://fxp-gen-default-rtdb.europe-west1.firebasedatabase.app/forums.json';

export const getForumsList = async () => {
    const response = await axios.get<any>( FIREBASE_DB );
    const results = Object.keys(response.data).map(key => ({ ...response.data[key] }));
    
    return results;
}

export const addForum = ( forumData: any ) => {
    return axios.post( FIREBASE_DB, forumData );
}

// @ts-ignore
export const getHtmlTemplate = ( template: any, values: any ) => htmlTemplates[ template ]( values );

/** Variables must be identical to the 'name' prop of inputs from ./Data.tsx */
const htmlTemplates = {
    [ DECLARATION_WEEKLY_CHALLENGES ]: ({ date, forumName, fourmImg, investorName, postWinner, postLink, postName }: any) =>
    `
        [CENTER][SIZE=3][FONT=tahoma][IMG]https://images.weserv.nl/?url=i.imgur.com/DPZXQRv.png[/IMG]
        [IMG]${ fourmImg }[/IMG]
        [SIZE=4][B][COLOR=#008080]משקיען ואשכול השבוע - ${ forumName }[/COLOR]
        [/B][/SIZE]
        גולשים יקרים!
        כמדי שבוע, יבחר המשתמש אשר השקיע ובלט מבין שאר הגולשים ואשכול מושקע ו/או שעניין את הגולשים.
        [U]אז, קבלו את משקיען ואשכול השבוע לתאריך [B][COLOR=#008080]${ date }[/COLOR][/B] בפורום ${ forumName }:[/U]
        ${ investorName ?
        `
            [IMG]https://images.weserv.nl/?url=i.imgur.com/49v3iQt.png[/IMG]
            [IMG]https://images.weserv.nl/?url=i.imgur.com/ThPiUoI.png[/IMG][U][B][SIZE=5][URL="https://www.fxp.co.il/member.php?username=${ investorName }"][COLOR=#daa520]${ investorName }[/COLOR][/URL][/SIZE][/B][/U][IMG]https://images.weserv.nl/?url=i.imgur.com/ThPiUoI.png[/IMG]
        ` : ''}
        ${ postWinner ?
        `
            [IMG]https://images.weserv.nl/?url=i.imgur.com/Rb4j5af.png[/IMG]
            [IMG]https://images.weserv.nl/?url=i.imgur.com/ThPiUoI.png[/IMG][U][B][URL="https://www.fxp.co.il/member.php?username=${ postWinner }"][COLOR=#daa520][SIZE=5]${ postWinner }[/SIZE][/COLOR][/URL][/B][/U][IMG]https://images.weserv.nl/?url=i.imgur.com/ThPiUoI.png[/IMG]

            [U][B][COLOR=#daa520]אשר פתח את האשכול[/COLOR][/B][/U]: [URL="${ postLink }"][SIZE=4]"[B]${ postName }[/B]"[/SIZE][/URL]
        ` : ''}
        ${ !investorName && !postWinner ? '[COLOR=#daa520][B][SIZE=4]לצערנו לא נמצא אשכול / משקיען.[/SIZE][/B][/COLOR]' : '' }
        ---------
        ${ investorName || postWinner ?
        `
            [U][B][URL="https://www.fxp.co.il/member.php?username=${ investorName }"][COLOR=#008080]${ investorName }[/COLOR][/URL][/B][/U]${ investorName && postWinner ? ' ו-' : '' }[U][B][URL="https://www.fxp.co.il/member.php?username=${ postWinner }"][COLOR=#008080]${ postWinner }[/COLOR][/URL][/B][/U], ${ investorName && postWinner ? 'זוכים בלא פחות מ- 7 ימי ווינר כל אחד' : 'זוכה בלא פחות מ- 7 ימי ווינר' }.
            [B][COLOR=#008080]מזל טוב ובהצלחה בשבוע הבא לכולם![/COLOR][/B]
            ---------
        ` : '' }

        בברכה,
        הנהלת פורום ${ forumName }
        [IMG]https://static.fcdn.co.il/smilies2/flowers.gif[/IMG].
        [IMG]https://images.weserv.nl/?url=i.imgur.com/DPZXQRv.png[/IMG]
        [/FONT][/SIZE][/CENTER]
    `,
    [ PM_WINNER ]: () => ``,
    [ PM_NICK ]: () => ``,
    [ PM_SUBNICK_TEXT ]: () => ``,
    [ PM_SUBNICK_IMG ]: () => ``,
    [ PM_CHAMP ]: () => ``,
    [ PM_FXP_POINTS ]: () => ``,
    [ GENERAL_WARNING ]: ({ forumName, warning, reason }: any) =>
    `
        משתמש יקר,
        קיבלת אזהרה ${warning === 'yellow' ? '[COLOR=#ffd700][B]צהובה[/B][/COLOR]' : '[B][COLOR=#ff0000]אדומה[/COLOR][/B]'} בעקבות [COLOR=#008000][B]${reason}[/B][/COLOR].
        על-מנת להימנע מאזהרות נוספות גם בעתיד, אנא קרא בקפידה את חוקי הפורום.
        הנך רשאי לערער על אזהרה זו, על ידי הגשת ערעור בתת-פורום תלונות בהתאם לטופס המתאים בנעוץ.
        בברכה,
        הנהלת פורום ${forumName}.
    `,
    [ SPAM_WARNING ]: ({ forumName, warning }: any) =>
    `
        משתמש יקר,
        קיבלת אזהרה ${warning === 'yellow' ? '[COLOR=#ffd700][B]צהובה[/B][/COLOR]' : '[B][COLOR=#ff0000]אדומה[/COLOR][/B]'} בעקבות פרסום ספאם.
        על-מנת להימנע מאזהרות נוספות גם בעתיד, אנא קרא בקפידה את חוקי הפורום.
        הנך רשאי לערער על אזהרה זו, על ידי הגשת ערעור בתת-פורום תלונות בהתאם לטופס המתאים בנעוץ.
        בברכה,
        הנהלת פורום ${forumName}.
    `,
    [ IMPROPER_LANGUAGE_USE_WARNING ]: ({ forumName, warning }: any) =>
    `
        משתמש יקר,
        קיבלת אזהרה ${warning === 'yellow' ? '[COLOR=#ffd700][B]צהובה[/B][/COLOR]' : '[B][COLOR=#ff0000]אדומה[/COLOR][/B]'} בעקבות שימוש בשפה לא נאותה, כזו שמטרתה לאיים, להעליב, לבזות, להטריד וכו..
        על-מנת להימנע מאזהרות נוספות גם בעתיד, אנא קרא בקפידה את חוקי הפורום.
        הנך רשאי לערער על אזהרה זו, על ידי הגשת ערעור בתת-פורום תלונות בהתאם לטופס המתאים בנעוץ.
        בברכה,
        הנהלת פורום ${forumName}.
    `
};
