import players from "@/app/styles/players/players.module.scss";
import ViewPlayers from "@/app/components/players/view-players";
import AddPlayer from "@/app/components/players/add-player";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { NextPage } from "next";

const Players: NextPage = withPageAuthRequired ( async () => {
    return (
        <div className={players.flex_container}>
            <section className={`${players.flex_item_40}`}>
                <AddPlayer/>
            </section>
            <section className={players.flex_item_60}>
                <ViewPlayers/>
            </section>
        </div>
    );
}, { returnTo: '/players' });

export default Players;
