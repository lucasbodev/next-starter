import players from "@/app/styles/players/players.module.scss";
import ViewPlayers from "@/app/components/players/view-players";
import AddPlayer from "@/app/components/players/add-player";

const Players = async () => {
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
}

export default Players;
