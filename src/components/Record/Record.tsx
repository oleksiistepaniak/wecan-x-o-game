import Styles from './Record.module.scss';
import {Header} from "../Header/Header.tsx";
import {Footer} from "../Footer/Footer.tsx";
import {User} from "../../types/User.ts";
import {useContext} from "react";
import {AppContext} from "../../main.tsx";
import {database} from "../../data/database.ts";

// IMITATION OF THE DATABASE
const imitationDatabase: User[] = [];
imitationDatabase.push({ id: 1, username: 'alex', numberOfVictories: 10, password: '123456', isNextTurn: true});
imitationDatabase.push({ id: 2, username: 'kiko123', numberOfVictories: 7, password: '123456', isNextTurn: true});
imitationDatabase.push({ id: 3, username: 'stefania', numberOfVictories: 6, password: '123456', isNextTurn: true});
imitationDatabase.push({ id: 4, username: 'lincoln', numberOfVictories: 5, password: '123456', isNextTurn: true});
imitationDatabase.push({ id: 5, username: 'genius228', numberOfVictories: 1, password: '123456', isNextTurn: true});
imitationDatabase.push({ id: 6, username: 'user21031', numberOfVictories: 0, password: '123456', isNextTurn: true});
imitationDatabase.push({ id: 7, username: 'petro', numberOfVictories: 1, password: '123456', isNextTurn: true});
imitationDatabase.push({ id: 8, username: 'sergio', numberOfVictories: 20, password: '123456', isNextTurn: true});
imitationDatabase.push({ id: 9, username: 'george', numberOfVictories: 8, password: '123456', isNextTurn: true});
imitationDatabase.push({ id: 10, username: 'user1337', numberOfVictories: 4, password: '123456', isNextTurn: true});

// A COMPONENT WHICH IS RESPONSIBLE FOR RENDERING THE RECORDS PAGE
export const Record = () => {
    const {recordsService} = useContext(AppContext);
    const recordsData: User[] = recordsService.sortUsersWithBiggestNumberOfVictories(database.users);

    return recordsData.length < 5 ? <>
            <Header/>
            <div className={Styles.recordsEmpty}>
                Unfortunately, too few users are registered to display records.
            </div>
            <Footer/>
        </>  :
        <>
            <Header />
            <ol className={Styles.recordsList}>
                <li className={Styles.recordsElement}>
                    {recordsData[0].username.toUpperCase()}. Number of victories: {recordsData[0].numberOfVictories}
                </li>
                <li className={Styles.recordsElement}>
                    {recordsData[1].username.toUpperCase()}. Number of victories: {recordsData[1].numberOfVictories}
                </li>
                <li className={Styles.recordsElement}>
                    {recordsData[2].username.toUpperCase()}. Number of victories: {recordsData[2].numberOfVictories}
                </li>
                <li className={Styles.recordsElement}>
                    {recordsData[3].username.toUpperCase()}. Number of victories: {recordsData[3].numberOfVictories}
                </li>
                <li className={Styles.recordsElement}>
                    {recordsData[4].username.toUpperCase()}. Number of victories: {recordsData[4].numberOfVictories}
                </li>
            </ol>
            <Footer/>
        </>
};

