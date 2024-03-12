exports.name = '/lol';
exports.index = async(req, res, next) => {
    const request = require('request');
    var champ = req.query.champion
    if (!champ) return res.jsonp({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
    const data = require('./data/lol.json');
    var find = data.find(info => info.name == champ.charAt(0).toUpperCase() + champ.slice(1))
    try {
        res.jsonp({
            name: find.name,
            hp: find.hp,
            hp_gain_per_lvl: find.hp_gain_per_lvl,
            hp_regen: find.hp_regen,
            hp_regen_gain_per_lvl: find.hp_regen_gain_per_lvl,
            mana: find.mana,
            mana_gain_per_lvl: find.mana_gain_per_lvl,
            mana_regen: find.mana_regen,
            mana_regen_gain_per_lvl: find.mana_regen_gain_per_lvl,
            attack_damage: find.attack_damage,
            attack_damage_gain_per_lvl: find.attack_damage_gain_per_lvl,
            attack_speed: find.attack_speed,
            attack_speed_gain_per_lvl: find.attack_speed_gain_per_lvl,
            armor: find.armor,
            armor_gain_per_lvl: find.armor_gain_per_lvl,
            magic_resist: find.magic_resist,
            magic_resist_gain_per_lvl: find.magic_resist_gain_per_lvl,
            movement_speed: find.movement_speed,
            range: find.range,
            ability_power: find.ability_power,
            ability_haste: find.ability_haste,
            crit: find.crit
        });
    } catch {
        return res.jsonp({ error: 'Không tìm thấy dữ liệu của tướng này!' })
    }
}