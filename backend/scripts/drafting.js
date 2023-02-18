const League = require('../model/leagueModel');
const User = require('../model/userModel');
const Swimmer = require('../model/swimmerModel');

const drafting_script = () => {
    const roaster_update = async (_id, swimmer_id, league_id) => {
        console.log('i updatingn this shit')
        const ob = {};
        try {
            const swimmer = await Swimmer.findById(swimmer_id)
            const league = await League.findById(league_id)
            if (!swimmer.picked) {
                if (league.player_roaster === []) {
                    league.player_roaster = ob;
                }
                if (league.player_roaster[_id] === undefined) {
                    league.player_roaster[_id] = [];
                }
                league.player_roaster[_id].push(swimmer_id);

                swimmer.picked = true;
                // console.log(league)
                try {
                    const league_up = await League.findByIdAndUpdate({_id: league_id}, league);
                } catch (e) {
                    console.log(e.message)
                }
                try {
                    const swimmer_up = await Swimmer.findByIdAndUpdate(swimmer_id, swimmer);
                } catch (e) {
                    console.log(e.message)
                }
            }
        } catch (e) {
            console.log(e.message)
        }
    }


    const order = async (choice, league_id) => {
        // console.log(choice === 'randomize')
        if (choice.toString() === 'randomize') {
            // console.log('adxbvhsf')
            let league;
            try {
                league = await League.findById(league_id);
            } catch (e) {
                console.log(e.message)
            }

            // let cur_index = league.players.length, pre_index, random_index;
            //
            // while (cur_index) {
            //     random_index = Math.floor(Math.random() * cur_index--)
            //
            //     pre_index = league.players[cur_index];
            //     league.players[cur_index] = league.players[random_index];
            //     league.players[random_index] = pre_index;
            // }
            return league.players_id;
        }
    }

    const convert = async (id) => {
        try {
            const user = await User.findById(id);
            return user.username;
        } catch (e) {
            console.log(e.message)
        }
    }


    return {order, convert, roaster_update}
}

module.exports = {drafting_script};
