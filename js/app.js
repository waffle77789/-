// ============ STEAM CDN (REAL URLS) ============

let currentTab = 'reallife';
let isRolling = false;
let previousScreen = 'home';
let currentUser = null;
let userBalance = 0;

// ============ WEAR CONDITIONS ============
const WEAR_CONDITIONS = ['Factory New', 'Minimal Wear', 'Field-Tested', 'Well-Worn', 'Battle-Scarred'];

function getRandomWear() {
    const w = [5, 20, 45, 20, 10];
    const total = w.reduce((a,b) => a+b, 0);
    let r = Math.random() * total;
    for (let i = 0; i < WEAR_CONDITIONS.length; i++) { r -= w[i]; if (r <= 0) return WEAR_CONDITIONS[i]; }
    return 'Field-Tested';
}

// ============ REAL CS2 CHANCES ============
const CS2_RARITY = {
    covert:     { chance: 0.032,  label: 'МИФИЧЕСКОЕ' },
    classified: { chance: 0.128,  label: 'ЭПИЧЕСКОЕ' },
    restricted: { chance: 0.64,   label: 'РЕДКОЕ' },
    milspec:    { chance: 3.2,    label: 'РЕДКОЕ' },
    industrial: { chance: 15.98,  label: 'ОБЫЧНОЕ' },
    consumer:   { chance: 79.92,  label: 'ОБЫЧНОЕ' },
};

// ============ WEAPON BASE ICONS ============
const WEAPON_BASE_ICONS = {
    knives: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2avx-9ytd5lRi67gVNwsDvSwtqqc3iXZg4kCZYjReYLtRbum9XgYuvm5wbWjtgUzCn3iSsf8G81tFEeH9rw/256fx192f',
    gloves: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_u13ve5WSDu2jCIrujqNjsH_InuUaQQmDJd2Fu4NshO7kIGyYeu24Affg98UxCX_iXhJ5i465bwHT-N7rXbV3WG0/256fx192f',
    snipers: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_CNk7uW-V6JsJPWsAm6Xyfo45-c5GXDnwB534DuEwtuoIHOfaAYiAsYjF-QItUaxmoC0MO_h5ALcjJUFk3sEzfdk4w/256fx192f',
    rifles: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQu6WRa7ZsLvWsCGuZxuZij-1gSCGn20wksT7Xzo6ueX6VOgUmWZQiTO5btxDrldbmNru05QLfiN5EmHmsj3hXrnE8mi375M8/256fx192f',
    pistols: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2veql0H-ObB2mV_uJ_t-l9ASrgl0lzsWSDytatICnDaVQmWZt3Q-MJsxS4m4DgYuuz7w2L3ogRyivgznQeVdjncD8/256fx192f',
    all: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQu6WRa7ZsLvWsCGuZxuZij-1gSCGn20wksT7Xzo6ueX6VOgUmWZQiTO5btxDrldbmNru05QLfiN5EmHmsj3hXrnE8mi375M8/256fx192f',
};

// ============ REAL LIFE CASES ============
const REAL_LIFE_CASES = [
    { id: 'summer', name: 'ЛЕТО', icon: '☀️', isCS2: false,
      items: [
        { text: 'Поиграть футбол с друзьями', icon: '⚽', chance: 45, rarity: 'common' },
        { text: 'Удалить ТикТок', icon: '🗑️', chance: 45, rarity: 'common' },
        { text: 'Иди подыши свежим воздухом', icon: '🌳', chance: 10, rarity: 'epic' },
      ] },
    { id: 'food', name: 'ЕДА СЕГОДНЯ', icon: '🍔', isCS2: false,
      items: [
        { text: 'Пицца', icon: '🍕', chance: 40, rarity: 'common' },
        { text: 'Салат', icon: '🥗', chance: 30, rarity: 'common' },
        { text: 'Суп', icon: '🍲', chance: 20, rarity: 'rare' },
        { text: 'Фастфуд', icon: '🍟', chance: 10, rarity: 'epic' },
      ] },
    { id: 'weekend', name: 'ВЫХОДНЫЕ', icon: '🎮', isCS2: false,
      items: [
        { text: 'Сходить в кино', icon: '🎬', chance: 35, rarity: 'common' },
        { text: 'Пойти в парк', icon: '🏞️', chance: 35, rarity: 'common' },
        { text: 'Играть в видеоигры', icon: '🕹️', chance: 25, rarity: 'rare' },
        { text: 'Убраться в комнате', icon: '🧹', chance: 5, rarity: 'epic' },
      ] },
    { id: 'afterschool', name: 'ПОСЛЕ ШКОЛЫ', icon: '📚', isCS2: false,
      items: [
        { text: 'Делать домашку', icon: '📝', chance: 30, rarity: 'common' },
        { text: 'Заниматься спортом', icon: '🏋️', chance: 30, rarity: 'common' },
        { text: 'Играть в видеоигры', icon: '🎮', chance: 25, rarity: 'rare' },
        { text: 'Читать книгу', icon: '📖', chance: 15, rarity: 'epic' },
      ] },
    { id: 'gift', name: 'ПОДАРОК ДРУГУ', icon: '🎁', isCS2: false,
      items: [
        { text: 'Конфеты', icon: '🍬', chance: 40, rarity: 'common' },
        { text: 'Постер', icon: '🖼️', chance: 30, rarity: 'common' },
        { text: 'Видеоигра', icon: '🎮', chance: 20, rarity: 'rare' },
        { text: 'Книга', icon: '📚', chance: 10, rarity: 'epic' },
      ] },
];

// ============ CS2 CATEGORIES ============
const SPECIFIC_WEAPON_PRICE = 27;

const CS2_CATEGORIES = [
    { id: 'all', name: 'ВСЁ ОРУЖИЕ', icon: '🎰', color: '#d44242', price: 35 },
    { id: 'knives', name: 'НОЖИ', icon: '🔪', color: '#e4ae39', price: 5000 },
    { id: 'gloves', name: 'ПЕРЧАТКИ', icon: '🧤', color: '#8847ff', price: 5000 },
    { id: 'snipers', name: 'СНАЙПЕРКИ', icon: '🎯', color: '#eb4b4b', price: 50 },
    { id: 'rifles', name: 'ВИНТОВКИ', icon: '💥', color: '#4a9eff', price: 50 },
    { id: 'pistols', name: 'ПИСТОЛЕТЫ', icon: '🔫', color: '#5e98d9', price: 30 },
];

// ============ CS2 SKINS — MIXED BY CATEGORY ============
const CS2_SKINS = {
    rifles: [
        { name: 'AK-47 | Crane Flight', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQu6WRa7ZsLvWsCGuZxuZij-1gSCGn20wksT7Xzo6ueX6VOgUmWZQiTO5btxDrldbmNru05QLfiN5EmHmsj3hXrnE8mi375M8/256fx192f', rarity: 'classified' },
        { name: 'AK-47 | Searing Rage', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQu6WRbbx9LP-AB3GV_uJ_t-l9AXu2lk1xsD-EnI3_JHmeaAV1CZB1RbEJtxfuxNHuMuq251PY3o4UxXjgznQeg4Qz-rg/256fx192f', rarity: 'classified' },
        { name: 'AK-47 | The Oligarch', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQu6WReLFrJvWBMWSF0vp5vd5lRi67gVNz4Tvdn4qoJC3Ba1V1WcdxTbFcsEbpxoHhNunnsVPYitlFm3392C4f8G81tEVBuxrI/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | The Outsiders', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQu6WRfJtvNeOsAm6Xyfo4tbg7G3-wxxwl5mzRyYqodSrBagMjCZJxELMPthi8lNLgYuzltgHc3ZUFk3sO-7HKrg/256fx192f', rarity: 'classified' },
        { name: 'AK-47 | Inheritance', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQ0OKheqdoLPGaAFicyOl-pK8xGH_nwUt1sGrSz9ivcHKQOAcjXMYkRu5Yuxe4lYCyZOq25VSM2oMT02yg2UxBSEgA/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Hydroponic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNW0PCvZaZiL8-ZG2mXzetJvOhuRz39lk0m4Dncztz7Jy2fagIoC5t5QeNbskW6xNLgZu-24AXZgt4Xyi_4izQJsHjOr8RS6A/256fx192f', rarity: 'classified' },
        { name: 'AK-47 | Cartel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNK0POlPPNSI_GBGmKc_uJ_t-l9ASuywktwtW3dwt79eX6fZlUiCJJ1RbUPtkW8w4LiZe_i4ATYjN8WmH7gznQeZkk4ehM/256fx192f', rarity: 'classified' },
        { name: 'AK-47 | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNK0P2nZKFpH_yaCW-Ej7sk5bE8Sn-2lEpz4zndzoyvdHuUPwFzWZYiE7EK4Bi4k9TlY-y24FbAy9USGSiZd5Q/256fx192f', rarity: 'classified' },
        { name: 'AK-47 | Phantom Disruptor', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlJfA6H-CbD2mEzuNJtOh6XTyjgRI1jDGMnYftb3qTbQMpCZVxF-8Ku0Xtw4XkYu2xtQSL3d5FxSz-3H5Ovy895epRA6E7uvqAsbzZtpo/256fx192f', rarity: 'classified' },
        { name: 'AK-47 | Neon Revolution', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIf6SHGSY2NF6ueZhW2e3w0524mjQzomreXqVbAAhWJF3RuZfuxC5x920Yurh7gONjY0RxHr4kGoXuT5bpI-V/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Legion of Anubis', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIf6GDG6D_uJ_t-l9AX_nzBhw4TvWwo6udC2QbgZyWcN2RuMP4xHrlYDnYezm7geP3d5FyH3gznQeY_Oe4QY/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Asiimov', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIeOaB2qf19F6ueZhW2e2wEt-t2jcytf6dymSO1JxA5oiRecLsRa5kIfkYr-241aLgotHz3-rkGoXuUp8oX57/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Uncharted', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIeqHC2SvzedxuPUnFnCwwBl_5D_Syon8dnyUaQUlD5oiQ7ECuxW7l920ZL-w4AfX2IlByTK-0H0PRM7cOA/256fx192f', rarity: 'milspec' },
        { name: 'AK-47 | Redline', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-RHGavzedxuPUnFniykEtzsWWBzoyuIiifaAchDZUjTOZe4RC_w4buM-6z7wzbgokUyzK-0H08hRGDMA/256fx192f', rarity: 'classified' },
        { name: 'AK-47 | Ice Coaled', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-UGm-Zz-llj-1gSCGn2x4l5z_RyNj6JXnEbgFzXMYjEOUIsBe5m9exP-zg4leMj4pGxXn7jCJXrnE84asPq_0/256fx192f', rarity: 'classified' },
        { name: 'AK-47 | Aquamarine Revenge', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-GHGaXxNF3vPVWQyC0nQlp4WvVzturJ3qVb1B1DMd3Q7EO5xW_l9O2ZOLg5gyP2N9BxST_jXwY7TErvbj-FmM1dA/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Elite Build', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSLfGAGmKC2NF6ueZhW2e2wh9y5GjTztirdSqfP1dyCpclR7FZ5xe9wNbhZei25FGPjokXxC2vkGoXuQLr5jvs/256fx192f', rarity: 'milspec' },
        { name: 'AK-47 | Nightwish', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSLvmUBnOHyP1-j-1gSCGn20glt2nXnt78cnKUbwN2XJp2R-ZbuxHqlNXlMLiw5AHc3toWnCur23hXrnE8p0T2bx4/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Point Disarray', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSMP-aAHOvxedlsfN7TjCMmRQguynLnIz_dXnEbFcoDsNzQLMN40S7mte0Zuzl5gbY34JEnnr52ChA7ytisPFCD_Rw7udDlA/256fx192f', rarity: 'classified' },
        { name: 'AK-47 | Vulcan', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSMuWRDGKC_uJ_t-l9AXCxxEh14zjTztivci2ePQZ2W8NzTecD4BKwloLiYeqxtAOIj9gUyyngznQeF7I6QE8/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Frontside Misty', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSN_mdGmKC_v1mv_N9cCW6khUz_WvRm9r8JS-SaFMmWcN5ReMD4BDsltDkN-Prs1DfjN9Cn3r_jC4YvHl1o7FVgJsyBlQ/256fx192f', rarity: 'classified' },
        { name: 'AK-47 | Head Shot', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV6xoIfSsHW-f1dF-v-1mcCW6khUz_TzRnNigd3-SOg4lAsF1QOQN4xS4wdHnMu-0swaMjIxExSSoiyof6ih1o7FVGHIdVhw/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Wild Lotus', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV61-LPGdCliWzeFkse1WQyC0nQlpsDuGyt-pdnyRPA4hDcYkR-QPuhi-wdPuYbyx5AaMidkQnC_-2ilIuzErvbi4ijV5Mw/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Panthera onca', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV65sJ-WSHFicyOl-pK9sSS-2wEV25z_Qw4mqcn3EOgclCpJ3TbRctELtm9HmNLix4wHc3o5H02yg2Q50xEQx/256fx192f', rarity: 'classified' },
        { name: 'AK-47 | Neon Rider', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV6poL_6sHG6UxPxJvOhuRz39xkQhsTnVzoygdy7Ea1UoCZQkRe9bs0brl9TvN-m0tVHYjY5CyS35jjQJsHhk4o5zcA/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | X-Ray', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV7x_IemsAm6Xyfo44OQ_Tn3il08k4GzVyo2qeSnDaQAlXpF1RuZZsUO4kNLjNO2w51HWjJUFk3tTkVsnkA/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Fire Serpent', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0PSneqF-JeKDC2mE_u995LZWTTuygxIYvzSCkpu3cnvFPQB2DpUkROFY4Rntw93lP7i241DbiI1BxSuviHlKunk_6-sHU71lpPMTRLyP4Q/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Crossfade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0PW8abRlKfOsAXGV0-J3qd5oRH3kqhEutDWR1N6vdi2Wb1IjA5V5FrUPuhW6ldGzMe7htQTd2YoRzyn83HhPvys65eocEf1y0nVviGs/256fx192f', rarity: 'milspec' },
        { name: 'AK-47 | First Class', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0PW8baFjH_yWD3OYxPxJseo9GBa_nBovp3PXmNmpdymUZwMnX8EhEeBbtBnrk4LjZLzi7wbe3opNmCn8iH8YvX5i_a9cBikeWj5H/256fx192f', rarity: 'restricted' },
        { name: 'AK-47 | B the Monster', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0P24bbZ9IeOAMWqfz_1itfNWTiLnwiIrujqNjsGocC6QPQNyA8FxReZYtEHrw4ezMe_nsgbWjYIXni782ipA5yxv5OkET-N7rajaE730/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Jaguar', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0OKvZrBlJeKsD2zEltF6ueZhW2fhzUwi4WuBzNv6dCiWPVUgApV0TLIM40SwxNLuN-Pl71fdjogXmy79kGoXuYeqaPqj/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Emerald Pinstripe', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0OKnZrd5MvmDC1iRyrohj-1gSCGn20t-422Bn4v6eH_FaFcpWcFyRrRbsRK9xN3lNOK0tFPX2YJBmS_4iytXrnE8zwmR9Cc/256fx192f', rarity: 'restricted' },
        { name: 'AK-47 | Wasteland Rebel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0Oa8YaZ4NPWsD2zEltF6ueZhW2fgkEh35m3cmIusIn6TbwMpWJJxReMKtBHsw4HhM7nh4gTc3YJCxXr2kGoXudZyw1tq/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Jet Set', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0OWrZKhSNOKSGGKcxOpJseo9GBa_nBovp3ODydescy_FbVcoDZMkReYP4xC8w93jY7u35AeK2IhMmC__2itN73pv_a9cBpGGBr1j/256fx192f', rarity: 'classified' },
        { name: 'AK-47 | Leet Museo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSIfKAGnWRwvpJvOhuRz39xEly6jmHmdiqeS6UawMmCsBzFrRb4BLtx9DgPr635A3Xj45GySj5jzQJsHjwtGRbjQ/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Bloodsport', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSIvycAWOD0eFkpN5lRi67gVN15mmDw9egci_EPFAkDMQlTeZe4EXplNa0Yrvr5wbd345GyHioiC4b8G81tFuqg_k_/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | The Empress', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSJf2DHGKD0tF6ueZhW2exxEt152rWzI7_Ii-Ubw90DMB0Ee4C5xOwx9GxZbjk71PXgogWn36tkGoXudZeYvlo/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Gold Arabesque', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSJ_-fCliR0-90tfJ4WiyMmRQguynLntmvICieOARzCpMhF-BYsRe-xoHvYu_g5lSNj4NDyy2viCwY6Hlu5_FCD_Q1jEqYuQ/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Rat Rod', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSLvmRDGuV09F6ueZhW2fklBx362TTnN36dHiRa1AmW5QlQuVftxO9k4HhZuvksVDc398Rzy32kGoXuR34FNLu/256fx192f', rarity: 'restricted' },
        { name: 'AK-47 | Slate', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSMOKcCGKD0ud5vuBlcCW6khUz_W3Sytb4cCqTOFUpWJtzTOUD5hPsw9a0Yrnrs1SK3ooXzy6shilM5311o7FVYrIufmI/256fx192f', rarity: 'restricted' },
        { name: 'AK-47 | Steel Delta', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSM-SBAWmV_uJ_t-l9AXqyk0hy5GWEyduhdC2TPAEjDptzQbRf5EHrmoWyZu22sQLciokQyyzgznQesAEGx_A/256fx192f', rarity: 'milspec' },
        { name: 'AK-47 | Fuel Injector', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSM-WDC3WTye9kt-RtcCW6khUz_WuGy9_8dHuRbg5xW5IjQ-BYshK9mta0NLmw4lDa2o0Wni_3iy4f6np1o7FVB0pWHHg/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Orbit Mk01', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlV6diLP-dFzfB_vxztN5lRi67gVMk4TmEn9n_c3PGPwZyDMckTO8JsEPuktG1ZOrjsgPX2IwUyiyv3S0f8G81tLnuvOvF/256fx192f', rarity: 'restricted' },
        { name: 'AK-47 | Aphrodite', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI7PqRaa9SJPqaB2mvzedxuPUnGCi3wktzt2rRn92pdXuXbA4iDcdxQOIMsBK4k9S2Zeiw4lTdjdhNyTK-0H1wmrL4zA/256fx192f', rarity: 'covert' },
        { name: 'AK-47 | Olive Polycam', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipP0OKhZL1SI_GeAViRyrohj-1gSCGn201-4G7dyo2oeXORaAIpCcFwTeEK4ELskNa0NeKxtVTXiItDySms3XxXrnE8JD9gyYo/256fx192f', rarity: 'industrial' },
        { name: 'AK-47 | Blue Laminate', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0POlPPNhIf2sDGuFxNF6ueZhW2fhzE5_5G7dnt_7JXufa1J0DZAkE-cKtBaxl9WzPuyz5lDY3YpAzCn9kGoXuZPu7T4u/256fx192f', rarity: 'restricted' },
        { name: 'AK-47 | Black Laminate', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0POlPPNhIf2sDHCvzedxuPUnGnzjlh51sTyAzomrICnEbQByWcciTOQIsBG_m9LiZOLh7wfdi91DnzK-0H1Z7oynag/256fx192f', rarity: 'milspec' },
        { name: 'AK-47 | Green Laminate', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0POlPPNhIf2sCXWVxOBJvOhuRz39xUgj4WmByIuqInLCag8jWZJ3F-AL4xi6wd22Ne3rtQLZjYNEnHj92zQJsHgD_GLtVg/256fx192f', rarity: 'milspec' },
        { name: 'AK-47 | Red Laminate', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0POlPPNhIf2sAm6Xyfo4tucxS3rjwRx_42zRwo6pdSnCPwAmX5ohFOIJsUTqwdThNOi0s1TajZUFk3t5vdi_Cw/256fx192f', rarity: 'classified' },
        { name: 'AK-47 | Safety Net', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0P-re6xSM_GVC3OJzvx3vuZscCW6khUz_W3RyI2tdyjFaAUlW5J5QeNc4BS_xoKzYePi4QSIgoJDynn4jS9Mvyh1o7FVeAmr1N8/256fx192f', rarity: 'restricted' },
        { name: 'AK-47 | Baroque Purple', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0OSrZqF5L8-DG3WAzetJvOhuRz39wEgl6jyBwtqtJS6QbFRzApIkR-YLsRe6wdDvZung4gHbjd4XyH7_iTQJsHhGzMbuTA/256fx192f', rarity: 'industrial' },
        { name: 'AK-47 | Nouveau Rouge', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC6s2vY_A6H_6cG3GVwPtJvOhuRz39zBsm5j-HyNqpd32fPVd1AsB3RbEP4xntwdPuM-jl4QaK2NpCzX_23DQJsHjpyGbntg/256fx192f', rarity: 'classified' },
        { name: 'AK-47 | Breakthrough', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC6s20baB-H_yaCW-Ej-olseI8Gyq1kBkh4GrVz4queXySPAd0XJEkQ7UMu0TrldaxYbzjsw3Ay9USrh0CgFA/256fx192f', rarity: 'restricted' },
        { name: 'AK-47 | Midnight Laminate', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFU6s2neq1pJeOQC2mE_v5jovFlSha_nBovp3PRnt36d36UOlUmCcF2TOZfsRC_ldW1ML625AbZ2dhHyn_7jSgauCtp_a9cBpVVSdXG/256fx192f', rarity: 'restricted' },
        { name: 'AK-47 | Wintergreen', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFU6s2jbbBsLPyaDViX0-tzvt47cCW6khUz_W-Ay96seSrBaQcnDJRyTbMDuxTsw9bmNLy0sQPb34JNyn_-jS9N6n51o7FVK4Nkj6A/256fx192f', rarity: 'milspec' },
        { name: 'AK-47 | VariCamo Grey', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFU6s24abZkI_GeAVicyOl-pK8_TXvhxh5_626Bn477dn-fbQcnXMZzEeMPtxe_w9DhY-OztAXc2IsT02yg2Vc0ERtW/256fx192f', rarity: 'industrial' },
        { name: 'AK-47 | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFL0P-re6xSNPGdMWuZxuZi_rIxSirkkElyt2qEzI2heXiTaVIiX5siROQJtxnul4XnYbvgswOMgolbjXKpnRk9Yjk/256fx192f', rarity: 'industrial' },
        { name: 'AK-47 | Jungle Spray', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFL0OG-eqV0H_qGAGCcxNF6ueZhW2ewlhhz5T6ByY2oIi2XZgVxX8Z0FrFfsxnrl9bkMu625lbb2o9DzSyvkGoXuXE-297B/256fx192f', rarity: 'industrial' },
        { name: 'AK-47 | Predator', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFL0OirarZsI_GeMWuZxuZi_uMwF3i3xkh25W_VzNevICqTP1QoXpJ2E-MM40bpldXvY7yw4wXb3olbjXKpy8jW9Xo/256fx192f', rarity: 'industrial' },
        { name: 'FAMAS | Faulty Wiring', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a7s25YbZkLvesF2KczeFhj-1gSCGn20lw5GuBwov8InnFOgdyCMByROUNtRe9ltzuZenrtQTdi95Cmy73jHlXrnE8IJYzfbc/256fx192f', rarity: 'consumer' },
        { name: 'FAMAS | Neural Net', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a4s2oaalsM8-XAXOD_uJ_t-l9AX_lzB8ltmXcnoqvInjEPQEoC5AjELRY4Rm_lIDmM7zlsQ2L3YsQxHngznQe8yNao04/256fx192f', rarity: 'restricted' },
        { name: 'FAMAS | Meltdown', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a4s2gfadhJfGBMXeR1fpzou89cC-ymBw0jDGMnYftb3rDPQMhXppwRudet0O4xNLhMu7r7leMiY9Cmy34i39L7C9ssucBAvA7uvqAFyvbTO4/256fx192f', rarity: 'classified' },
        { name: 'FAMAS | Styx', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a4s2gfadhJfGBMXSb1OJ6o7NWSSi-lA4YvzSCkpu3dnvGPQAkCsMkRLQL5hW6ktC1Pu_h7lHWjY5Fznr-inkY6SxpsO5XAr1lpPPtc2FJkw/256fx192f', rarity: 'restricted' },
        { name: 'FAMAS | Prime Conspiracy', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a4s2gfalvJeKAMWqRxut4pOBWQyC0nQlp5m7Tmd39cSmSZwUlDZJwTLFZsUW5kIKyNbji71aLj4pDxX38h3wfuDErvbhergaiXw/256fx192f', rarity: 'restricted' },
        { name: 'FAMAS | Dark Water', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a4s20baZ_Ic-XD3Wb_uJ_t-l9ASywkUsmsjzdmdiqIiqXaQ4oDJF0RuNZukO-ltflNu_mslffg9gTnC3gznQeYZiQwTg/256fx192f', rarity: 'milspec' },
        { name: 'FAMAS | Sergeant', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a4c2oaalsM8-ACXOvzedxuPUnF3HmkBx_tjnSmNmrJHiROFN1W8NxFrFZsxbrk4e0Yuvr5wWLi4JAyjK-0H3maOk52Q/256fx192f', rarity: 'restricted' },
        { name: 'FAMAS | Valence', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a_s2oaalsM8-QAWmEzvtkj-1gSCGn2x4ksWzczo39c3_Ga1R1CpByR-YO4RXqm9fgP76w4lbYi91CzSyq2H5XrnE8rQqckvg/256fx192f', rarity: 'restricted' },
        { name: 'FAMAS | Djinn', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a_s2oaalsM8-ZB2me_uJ_t-l9AXzhwxt-5TiAzdmgd3yeaQ50DZRxEe5b4BXrm4HkPr7kslfcg9pCznjgznQepOOy8CM/256fx192f', rarity: 'classified' },
        { name: 'FAMAS | Afterimage', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1Y-s2seqtmJf6sHmaEydFwsexoXBa_nBovp3PQn46ucH_COwcoCMchTe4CshG7loG2NrmztFTajoIXyiitiCpLvSk6_a9cBkMHi1qM/256fx192f', rarity: 'classified' },
        { name: 'FAMAS | Waters of Nephthys', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1Y-s2oaalsM8-bAWuf_uF1teBncCW6khUz_W3WmYv_JSmSZgZ0WJRwEeRbtUS5kIKyZejmsQHciN5AxHj8intK6il1o7FV74niokA/256fx192f', rarity: 'classified' },
        { name: 'FAMAS | Survivor Z', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1Y-s2oaalsM8-fC2mEwNF6ueZhW2exlE8hsTzcw4n4JC7BOAQpCscmRrRe5xW7w9TgNu7itAHWiYpAziqokGoXuXR1eqm1/256fx192f', rarity: 'milspec' },
        { name: 'FAMAS | Decommissioned', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1Y-s2oaalsM8-dG2yV_vpzvvJgQCeMmRQguynLnouqJC-VbwciD5J3QORYshftkIXlPuzrtlCP2NlCySmvin9B7Xo_5_FCD_RaCEWnyQ/256fx192f', rarity: 'milspec' },
        { name: 'FAMAS | Eye of Athena', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1Y-s2oaalsM8-cGWuvzvx3vuZscCW6khUz_WzUnNb6eXjCbFV2WcAlTO5ct0G-xIfgZe63tADb34wTzX2qjXlO6Xx1o7FV19iwjVc/256fx192f', rarity: 'classified' },
        { name: 'FAMAS | Pulse', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1Y-s2oaalsM8-DG2uDxNF6ueZhW2flxBlxtm_WntqhJyiSbw90CpJyR-8DtRm6kdHkYuLj4QzY2INCzX-skGoXudLVHKnn/256fx192f', rarity: 'restricted' },
        { name: 'FAMAS | ZX Spectron', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1Y-s2oaalsM8-AHmKT1fx5vt5lRi67gVNxsDvTyNyueHOeaVVzCcN1EbVZtRK5k4LkNOnj4wbe2tlMxH_-jyNN8G81tGqq3pxL/256fx192f', rarity: 'restricted' },
        { name: 'FAMAS | Bad Trip', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1d7v-ve5tvIfSHHG6A_uJ_t-l9AX6xzExytWndzdj6eCrGb1MkWZB2TOBc4xK8mtHkZezrsQOPjoITyi_gznQezHhrR0c/256fx192f', rarity: 'covert' },
        { name: 'FAMAS | Meow 36', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2oaalsM8-QAXWA_uNzv_ZWQyC0nQlp6jvVztaudCnEbAUgDsckFOAJsBLtlN2yP7zqslGMiooXyCX43H8Y5zErvbiVlZtU7g/256fx192f', rarity: 'milspec' },
        { name: 'FAMAS | Commemoration', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2oaalsM8-fC2CRwvdJt-5lSxa_nBovp3PUztn4d3qSPQ8kDMR5ROVb4xCxw9a0NLni4lCIio4QzXn32yMb6Sds_a9cBr1TwPEt/256fx192f', rarity: 'covert' },
        { name: 'FAMAS | Mecha Industries', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2oaalsM8-eC2SYwNF6ueZhW2ewwx4hsm3dz46heSjCPVUjC8chEOYMtxOwkNHiYb63swXY3Y9Nn32skGoXuc3DGOrc/256fx192f', rarity: 'classified' },
        { name: 'FAMAS | Roll Cage', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2oaalsM8-BD2uc2NF6ueZhW2exzUhz4WjWmNqpdy-UbwJxDJtxReEMtRGwloflP7m04wfXi94QyXj9kGoXuV3JhaXD/256fx192f', rarity: 'covert' },
        { name: 'FAMAS | Rapid Eye Movement', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2oaalsM8-BD3eZxdFzqeR6cCW6khUz_WjRmN79JXmePABxDsB1QeZetxnqx9XhN-nk4A3f399CzX2qiCsa7yd1o7FVINiMH98/256fx192f', rarity: 'classified' },
        { name: 'FAMAS | Half Sleeve', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2paaloIuKWCliWwON3o95lRi67gVN35TyBy42pcS6ROAUkWJJ3FOMK50TswNzjPuPh71fYjYoWmX_33CtB8G81tAX5qatv/256fx192f', rarity: 'industrial' },
        { name: 'FAMAS | 2A2F', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M26eqVkLs-QD3Wvx-97sfJWQyC0nQlptWiEnt6odXLCagcgDpB2QO4PsBmxkoHvPu7ktlff399Cmy7_jyMa5jErvbgLXw1DVg/256fx192f', rarity: 'milspec' },
        { name: 'FAMAS | Halftone Wash', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1T-829eKhsM_isCGadwP1JvOhuRz39wxt14WuBy9qpJX-TPFdyDJFxRLRc5BK-wIXlNu3htleP3Y5Bynmt3zQJsHgxqrWZvw/256fx192f', rarity: 'industrial' },
        { name: 'FAMAS | Hexane', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1T9s2sZLFoKPWLMWuZxuZi_udoFn-2wBh04GXXnIr6dS2RbwUnDZNxQ-8D50OwkdK1ZOzi41OPiI9bjXKpn0lbjaM/256fx192f', rarity: 'milspec' },
        { name: 'FAMAS | Doomkitty', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1T9s2qZ6tgK_mHGn6vzedxuPUnTHrmxk1x6jmBmdb4Jy6QZw8jW8RwR-9esUHsltXnNu3n5VPXiY5AzTK-0H2q4sGvpw/256fx192f', rarity: 'milspec' },
        { name: 'FAMAS | Cyanospatter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1T9s28baFrH_yaCW-Ej7olsbNsG3rmzEoj5m6Hz9atJC2WOg8iDJchR7JeuhfuwIbnZO3k4FHAy9USioZeSPo/256fx192f', rarity: 'industrial' },
        { name: 'FAMAS | CaliCamo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1T9s24abZkI_GeAViUxP1zovVWQyC0nQlp4WXRn9qqI3uVblQgApJzELVb5BHqlYC1MePr71TXi91AzCz33S9KujErvbjpBPXbmw/256fx192f', rarity: 'industrial' },
        { name: 'FAMAS | Byproduct', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1T9veRbq1_JeecHGyv0e9is-lsXBa1lBAmoAKJk4jxNWWUaVN2DsB5Re4D4BLuxoDvP-PmsQffioJFnnqv3y1A7C9r5-tUUPd35OSJ2E5Oe0pX/256fx192f', rarity: 'consumer' },
        { name: 'FAMAS | Colony', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I4M29eKVuJc-eD3WZz-tJvOhuRz39xExw5GXTw4qod3uUaQ91ApZ3QbMItxDrxtK2ZbuxtAaLg4hDxS76hjQJsHgze9LmZw/256fx192f', rarity: 'consumer' },
        { name: 'FAMAS | Yeti Camo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I4PeRaqh4Jc-VD2qR0tF6ueZhW2fjk01x5jiBytqveXiWOFcnDJMmQeMLskPrmoCzYrzn7wPd3d1Fnyv8kGoXufV393rw/256fx192f', rarity: 'milspec' },
        { name: 'FAMAS | Vendetta', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I4PeRarNSIvySHXOvzedxuPUnSS-3wEx362jWw9eodnLGaFMhCZUlQO5etBe_k9XlNuvkslDcg91FxDK-0H3uRMe02w/256fx192f', rarity: 'industrial' },
        { name: 'FAMAS | Grey Ghost', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I4P2RbqVgIeOsCXWV2NFxuO56Wxa_nBovp3PXy9j6dX-fOFUoDZB4Q7IIsBTtwNHjN77jtVfdiY1ByyStiigcun0-_a9cBi0W6vWE/256fx192f', rarity: 'industrial' },
        { name: 'FAMAS | Crypsis', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I_82oaalsM8-UBmiD1dF_vvJsTD2gqhEutDWR1IyudXKSOFIkC8QhTbEK5kK8x9C2NOK3slbYg48Rnyr_hixI6i85sr0cEf1yzP52oWI/256fx192f', rarity: 'milspec' },
        { name: 'FAMAS | Macabre', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I_82oaalsM8-eD2SRw_xzj-1gSCGn2xkm5myEzo2sdXPBagInW5pxTLICshnswdOxNrzj71fc2d5CzC76iSJXrnE8xi9ndzw/256fx192f', rarity: 'milspec' },
        { name: 'FAMAS | Night Borre', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I_82lZqt5M8-RAnKV_uJ_t-l9AXHrxEV-sT-Ez9j7eHuVPQQgXpIhEOQPtxa_wd3gZbnm4QHXi49FxCXgznQeEWoLaGo/256fx192f', rarity: 'consumer' },
        { name: 'FAMAS | Teardown', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I_82jbbdlH_icGliRz-pJs-5lSxa_nBovp3PQw9r9cXuQZwMjXMF0E7YN4ES9loflPu_htQTX3otGyS3_iCNP6ixq_a9cBmFkCHH9/256fx192f', rarity: 'milspec' },
        { name: 'FAMAS | Sundown', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I_82-aahgH-OGAHSV1dF6ueZhW2frzEQhsWrRzNqoIHjCbgR1C5ZxRuIPsUO9l9XiYrnh7lPdj90Uni__kGoXuWBgr_h1/256fx192f', rarity: 'milspec' },
        { name: 'FAMAS | Spitfire', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I_829eK15JvmBC1iWwON3o95rXSilmiIrujqNjsGhI3ueZwJ1CMZ5ROYLthjqm9TuMeq2tgXWiYlDmy_733wd6S5isOcKT-N7rQ0Sk12j/256fx192f', rarity: 'restricted' },
        { name: 'FAMAS | Contrast Spray', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I_829eLZsOc-fB2CY1aByseI-THiwxU1-4j7dnI74eHOUaQciC8d4ReEC4RLpwNXmYrjh4wfflcsbmhid3JyN/256fx192f', rarity: 'consumer' },
        { name: 'FAMAS | Palm', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I__2ReKVhLc-fB2CY1aB06LgwSX_qkx914G7UyI2hI3KfaQYhWMRzRbMMshS8wYLkZenk51bdlcsbmgtj5aMJ/256fx192f', rarity: 'consumer' },
        { name: 'Galil AR | Amber Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0POvV6JsJPWsA2KEwOJ6ueJWQyC0nQlp52uGm9yodC3GZ1d0CMdyQeJctRDqmtayY-Kz71fW2IIUziz8intK6TErvbiZh4dEMQ/256fx192f', rarity: 'milspec' },
        { name: 'Galil AR | Aqua Terrace', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0POjV6NoL_2WGnWZwtFlpOR5XBa_nBovp3Pdzo6hcH6Ta1RxWZslRuYC4xG9x4bgP-zj4wfY2YoQzyT43XhA7Shq_a9cBkjd5CSZ/256fx192f', rarity: 'milspec' },
        { name: 'Galil AR | Blue Titanium', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0POgV7BkNPGdB3Kdkr5gj-1gSCGn208jsDvRmNmqdn6fbw4iCJp5Q7Nb4xW8xNSzMenk7wbX341AzyitjitXrnE8X82UsFg/256fx192f', rarity: 'milspec' },
        { name: 'Galil AR | Rainbow Spoon', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PO_V7BkNPGdB3Kd_vx3ue9rQD6MkhwrujGEiLD1KCzPKhhxCMclQeAPtUK-xoWxPrvkslOKg4tHzXn-3Xsbvyo647sLVqoh_6XekUifZrx5Pjj5/256fx192f', rarity: 'classified' },
        { name: 'Galil AR | Cerberus', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6doMvKBG3Svxu96ue1WQyC0nQlpsTjVzdb8IH-UOw8lX8B5EeYJ40a8k4XnPuvqsgzYjt0QnCyqh3wb7DErvbjusqqqdw/256fx192f', rarity: 'restricted' },
        { name: 'Galil AR | Chatterbox', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWaS0-9lue5ncCS2kRQyvnPXnIn7eSrEZ1AnD5NxTeII4ESwxN3jN7zl5QHXjdhAnyuo2y9Nv3xs_a9cBuAhdjfO/256fx192f', rarity: 'covert' },
        { name: 'Galil AR | Black Sand', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWaCjO13ve5WQyC0nQlp5T7dzoqpeX3FZ1R2DZd4Qe4CtRS_k9y0Ye7qtQOP2oxAyX73iytK6TErvbi0QhR0PQ/256fx192f', rarity: 'milspec' },
        { name: 'Galil AR | Sugar Rush', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWSRz-pvs-loQDqMmRQguynLyNqpJX_CPwUpXpEmEOMLs0K-kdPiN-uz4wfW2IgWyySr2ixKvCht4fFCD_QYspg1jQ/256fx192f', rarity: 'classified' },
        { name: 'Galil AR | Chromatic Aberration', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWSY0-F7sd55Rie4qhEutDWR1NivcH2VOAchC8B4ReZesxa5l4LlPu6z7wTa2IhHmCj4jyNJ7Sls4LscEf1yskqHCW4/256fx192f', rarity: 'classified' },
        { name: 'Galil AR | Destroyer', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWOV0vpkv_hsXRa_nBovp3PWwougcHvBP1IpWJohEOdc5hLrwNTiZbjh7gbaithNnnqsjX4f7y8-_a9cBt1aCBEk/256fx192f', rarity: 'milspec' },
        { name: 'Galil AR | Eco', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWKTztF6ueZhW2exwExw4WrcyImrcHmTbQAlWcQkQudYt0O5lNfgP-nh5AOL3otAziz7kGoXua-HTb4P/256fx192f', rarity: 'classified' },
        { name: 'Galil AR | Rocket Pop', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfD3Wv0e9kpOhqQyygqhEutDWR1Nf8eXzDP1InCMR3QucIshjrktexMOqz4QPcjo1Gz3qq2H9L5ylu4ugcEf1yh3Lp9zc/256fx192f', rarity: 'milspec' },
        { name: 'Galil AR | NV', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V7RiLOmsCXWVxOBJt-BlRiWMmRQguynLnNn4JXyWalMlW5ciE-RftRCwlt3gYbyz41Tb34pBmSr92yod7itq5fFCD_TxM0_hWQ/256fx192f', rarity: 'industrial' },
        { name: 'Galil AR | Sandstorm', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V7dsLvSAGmiCzNF6ueZhW2exkx4m6mrcmd6heS-XZgB1ApZ3FLUI5xm6ktezMuzh7gTeiYpFnCr-kGoXuTw2UKiI/256fx192f', rarity: 'milspec' },
        { name: 'Galil AR | Control', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PWvZK1hH_OcAHOCzuJJo_V7RiK2qhEutDWR1Nmvcn6RPFVxW5txTbRZuxDuxNKzZu2x7wCMiNpExCSshyof7Xlt5-scEf1y6paUA5M/256fx192f', rarity: 'restricted' },
        { name: 'Galil AR | Galigator', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PWvZK1hH_eSAm6XwPp5ot5lRi67gVN_42_VydytcX3BbQ8pCsB0ReMCtEG_lYLuNuji4AGPjt8Qynj4jXlI8G81tMQ6bFYi/256fx192f', rarity: 'restricted' },
        { name: 'Galil AR | Stone Cold', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMWmZxuZip-hnSBa_nBovp3PSnI2heXqXOwQjDpcmQ-UN5BjrmtexP-rgswDajotBxCz5iyhMui5u_a9cBuYTcBV8/256fx192f', rarity: 'restricted' },
        { name: 'Galil AR | Connexion', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMXeYzut4uflWQyC0nQlpt22Dzd_4cS7Db1NzDZYkQuIKsBW4xt3jPurq7gPag4oXnCqrhipB7TErvbi_0k78nw/256fx192f', rarity: 'restricted' },
        { name: 'Galil AR | Vandal', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMXGRz-p3vN5lRi67gVMj4mzVw92tdHKXPwcjD8AhR-YKtBe8mtHkNLvgtAGIjd0WxCyv2CNI8G81tKkB1-EH/256fx192f', rarity: 'milspec' },
        { name: 'Galil AR | Firefight', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfD3WvyOB1te9sXSinmg8YvzSCkpu3eH_EZ1IgDsR1ReYPshm6x9XnZe204VCMiIsXzS_33S0b7X5t4-dQUb1lpPOTHSUAOw/256fx192f', rarity: 'restricted' },
        { name: 'Galil AR | Shattered', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V6d_Nf2DAmKvw_x3pu5WQyC0nQlpsm7dn96tcniROgMoX8RzFuIJtRPqxtXhMujjsgLYjIlEzS-ojiIa5jErvbio8HB-SQ/256fx192f', rarity: 'milspec' },
        { name: 'Galil AR | Orange DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V6BpMPGHMWiCwOBxtd5lRi67gVN-4WzRwomqeHKQOwEoAsdzRrENskK7wIXiM-m341feg44TzXr33C0Y8G81tE9ebY28/256fx192f', rarity: 'restricted' },
        { name: 'Galil AR | Winter Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V6JiMvWAGliHyOBitfNWQyC0nQlp4m7Wy96geHvCPVQjA5d2ROYDtRC4lIGzYeLrtADejt0TzC6tj3tO7DErvbiqpszlmA/256fx192f', rarity: 'industrial' },
        { name: 'Galil AR | Kami', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V6NsLPmfMWyRzOdJvOhuRz39wkl142uEwtqsJ3OealV1DZYmFuNZ4xTtx4HnZuPl4gaLjdpNnHqt3TQJsHjaThnzjg/256fx192f', rarity: 'milspec' },
        { name: 'Galil AR | Signal', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V6NsLPmfMXSZxuB3vN57Si2MmRQguynLnIqvIy-TO1UlXJMjEeAN4UGwk9DkZLnltgPYjYkTnCn6iy8buips5PFCD_QZl2QaUg/256fx192f', rarity: 'restricted' },
        { name: 'Galil AR | Cold Fusion', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V6p4I_yWD3Wv0uVjvO16cCiigBwYvzSCkpu3cy6UbQIgC5QkReYKsEHsmtS2Yb_itA3Y2INNyXj6jHxK7Ho_selRA71lpPOhjRfzhg/256fx192f', rarity: 'industrial' },
        { name: 'Galil AR | Dusk Ruins', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V7Z4Kf6AMXWVxdF6ueZhW2fnlBkl427dno2rcXLBagYjDMN0Qu8Ls0a9wIK0PrvhtlHYgogTyy_5kGoXuQFMiuDz/256fx192f', rarity: 'milspec' },
        { name: 'Galil AR | VariCamo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V7JsMvmQD2qf_uJ_t-l9AXzgwU0ktW6HnIr_cH7FO1R1CpFyTbQNtBHqkYHuM-iw5FDeid1NmCjgznQefGamZCs/256fx192f', rarity: 'industrial' },
        { name: 'Galil AR | Urban Rubble', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V7JsMvmQD2qf_vtksuBncCW6khUz_TiDz9b8dXKQaAZ0X8MiRLVZ4RXslIflN-_g4gKIit1BnHn4iSNBvCl1o7FV6ub4EBU/256fx192f', rarity: 'industrial' },
        { name: 'Galil AR | Sky Mandala', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3bZtoIeKHBlidwOByse1ocCW6khUz_WzSy42rcS3CbwMkD5Z0TOAOsBDswNfhZu3q5w3ajdpNzSj-ii9P7nl1o7FVbxi6bE4/256fx192f', rarity: 'milspec' },
        { name: 'Galil AR | Acid Dart', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3bZt0JfyfAXCv1P13tt5lRi67gVNwtzvRzIv8dn_CZgBzXMMjRuZbsxe_lYbjNOzg71fajI8WnC2qjH9L8G81tK7k0ppc/256fx192f', rarity: 'industrial' },
        { name: 'Galil AR | Green Apple', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OGhV6N_JfWdMWuZxuZi_rI5H3_iwR9_4GSHmNuhcinDPQQgWZd5QLEJuka6koK1Mu6z7wDf2YhbjXKp2JcVlJI/256fx192f', rarity: 'industrial' },
        { name: 'Galil AR | Tuxedo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OGhV6t_I_GsAm6Xyfo45ONqGHC2kE1y42jWz9uscXmfbQQlCsZzFOACuxawl4GxMevj4QPfg5UFk3uvmVba9Q/256fx192f', rarity: 'milspec' },
        { name: 'Galil AR | Tornado', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OGhV7BiMv6SCmivzedxuPUnGHGywEtysm7Xy9qudXqWbwZ1XsRxQeIDs0W7mtbkM-ux4VCL3oxCmDK-0H3kO6HdPw/256fx192f', rarity: 'consumer' },
        { name: 'Galil AR | Grey Smoke', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OGha6xSIvycHGWvw_lJt-BlRiWyhyIrujqNjsH9dimTZgAmCMMhRuEL5xCxkNa0Pum3sgzX3osWyH362ixL7HlqtehUT-N7rUWzKN8P/256fx192f', rarity: 'consumer' },
        { name: 'Galil AR | O-Ranger', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OGhbZtiMvGdCWKvx-J_s-pWQyC0nQlp4jjRyYuhdy2WOgBzWZFxQrMP4RCwldbhM7jj5VDZi4IWzin7inwd5jErvbhrB4cQjg/256fx192f', rarity: 'industrial' },
        { name: 'Galil AR | Robin\'s Egg', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OGhbZt_L_KaAHSVxulJvOhuRz39kRl04ziAwouhInmTaQMlCcNxReFZ5xTqmtO1PuLntFDX3d8QyST_jjQJsHiwz7gI3Q/256fx192f', rarity: 'industrial' },
        { name: 'Galil AR | Akoben', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OG-V6NsLPmfMWabzuxzvt5lRi67gVMlt2_dzd6qcH2TOgN0CpIlE7Ve5hbukdW0MrixslPW2IgQzyv8jypI8G81tJzCUipD/256fx192f', rarity: 'milspec' },
        { name: 'Galil AR | CAUTION!', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OG-V6NsLPmfMWSR1Pp_v-9WQyC0nQlpsmnQwoqgIHuWa1QnC5EjRuJcsRi6lNfvPuvi7wPajo9Bziys23xIujErvbiCbfcatA/256fx192f', rarity: 'restricted' },
        { name: 'Galil AR | Crimson Tsunami', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OG-V6NsLPmfMXCR1-tJvOhuRz39x0Qm6mjQzo6qeHLGOg8nXJUiE-UKtxa5mtPgZu3rtFGMiIwXxH-viDQJsHh48m4KFg/256fx192f', rarity: 'restricted' },
        { name: 'Galil AR | Hunting Blind', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OG-V6loM_isHWuR0uZzo95lRi67gVMhsjyBmI38eHKUawZyDcB2RbVcuhXql4bnMePjsg3XjdgUxCr43y4d8G81tK0-GwoG/256fx192f', rarity: 'consumer' },
        { name: 'Galil AR | Metallic Squeezer', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OG-V6t7JeKDD3SD_v53ue99cDm2myIqtimElrD1KCzPKhh1W5N4EeQJ4ELuwNXgYu3r7gHe2ItExC_3hitL6C1o6-sEB6J0q_eBkUifZqkJVocB/256fx192f', rarity: 'milspec' },
        { name: 'Galil AR | Phoenix Blacklight', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OG-V7RlL_WdB3-v1e9xo955WjujmRgYvzSCkpu3JyqTblQhX5dxTeMJ40Pux4C2MOyw51DXjYtAyH7_jy9JuCk45LpWWL1lpPNjwyLnRw/256fx192f', rarity: 'restricted' },
        { name: 'Galil AR | Sage Spray', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OG-V7d9MvGKMWOV0utkpN56Ti62qhEutDWR1N6qcCqSOgEiCsMhQLZftxnpxtfkP-Ph71eMjYtDmCX3jytO5nlt5OkcEf1yc_oaZQU/256fx192f', rarity: 'consumer' },
        { name: 'M4A4 | Mainframe', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiNW0PGneqd4KeSRAWaCxdFlue1_SjuMmRQguynLmIyoI3KROlcgX5RxQrQMt0O6lIfkPuPi5AKKi9pEzX773XsYuHlj4_FCD_Ts_y5QsA/256fx192f', rarity: 'industrial' },
        { name: 'M4A4 | Daybreak', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiNW0PmnZatjL8-AG2mCyP1zj-1gSCGn2xgl5mjRzd2qeXmeO1coDZpxEeUJsxnrwYaxY7-w4wTb2NpGz3762yxXrnE8iKAzA8Q/256fx192f', rarity: 'restricted' },
        { name: 'M4A4 | Bullet Rain', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0PC7ZKhoNM-BD26e_uMisbBWQyC0nQlp4GmGydioIH3DPFMjDMd2QrQO5hDtkNK2Ne_htAXd3d0Uyiiriysb5zErvbh6fsb98Q/256fx192f', rarity: 'covert' },
        { name: 'M4A4 | Global Offensive', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0PG9b6tSI_GeAVicyOl-pK89HijjkU534mTRw478IirEOgUhXpshQrMK4xW9x4biYrvnsgDd3ohA02yg2Z7zUK8D/256fx192f', rarity: 'milspec' },
        { name: 'M4A4 | Asiimov', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6V6V-Kf2cGFidxOp_pewnTii3w0x_tmTRnt2qdHyWaFAjA5UlQOYI5BO5k9bhZunm41OI34NDnjK-0H3pAWw_Rw/256fx192f', rarity: 'covert' },
        { name: 'M4A4 | Howl', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afVSKP-EAm6extF6ueZhW2exwkl2tmTXwt39eCiUPQR2DMN4TOVetUK8xoLgM-K341eM2otDnC6okGoXufBz_TAB/256fx192f', rarity: 'contraband' },
        { name: 'M4A4 | йѕЌзЋ‹ (Dragon King)', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSIf6QC3SE0-96j-1gSCGn20x062mAwtb8cX3CaAMoApV3EeFZ50Wwk9fuM-vqtAHW3opHn3iqiSxXrnE8PytIGFg/256fx192f', rarity: 'classified' },
        { name: 'M4A4 | Cyber Security', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSI-mRC3WA1OB9j-1gSCGn2x9-527Tyt-pcnyUagQlW5JxEOIOuhjrw9XlMrixtQTd2NhNmH_5jCNXrnE8Cu1wa6c/256fx192f', rarity: 'classified' },
        { name: 'M4A4 | Desolate Space', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSJPWAAWuR1etJo_FoTCyMmRQguynLnNepJXPEaQJyDZJ0QOdbsxi7ktS0Y-Li4ADegthGn32ojCJJ7CxosfFCD_SyjfEkHg/256fx192f', rarity: 'classified' },
        { name: 'M4A4 | Poly Mag', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSJfyaGmKv1e91pOhqTiWMmRQguynLzY2pIi2QawR0CpdwTOdeuhXrw9XjZeq04QLYjIlFxSz9hn9MvCw44vFCD_Q07cip4Q/256fx192f', rarity: 'milspec' },
        { name: 'M4A4 | Evil Daimyo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSJeaaAliUwOd7qe5WQyC0nQlp4GqGz42ucCqXaQMhDpd4R-AIsxK6ktXgZePltVPXitoRn3-tjCgd6zErvbijVJZd2Q/256fx192f', rarity: 'restricted' },
        { name: 'M4A4 | Griffin', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSJ-KaCGGZz9F6ueZhW2e2zERysm3Umdesd3rGald1DpRyQLVbtUa5mtPvYuzrtATeg95EmS2vkGoXuZ5UWeP5/256fx192f', rarity: 'restricted' },
        { name: 'M4A4 | Hellfire', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSKPWfAmGZ0-tJvOhuRz39zEp24GTXmImsInqWP1AkXpBwE7FetUTswdfkPu7h5QXXithBy32t2DQJsHhDPmtuAA/256fx192f', rarity: 'classified' },
        { name: 'M4A4 | In Living Color', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSLP-FC1icyOl-pK84GH2wxhty4DjcyNuhdHyXbAVxW8QjTbEMthC8kNa0MLmzs1Hbj95E02yg2bbWGcKW/256fx192f', rarity: 'covert' },
        { name: 'M4A4 | Neo-Noir', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSLvWcMWmfyPxJvOhuRz39wE1142vSztmvInvBOgV0W5R1FLYNuxW4wIbgNrmx4g2Kj4tMmCX93zQJsHgJr0dqFw/256fx192f', rarity: 'covert' },
        { name: 'M4A4 | Tooth Fairy', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSMeWWC2mWwOdkqd5lRi67gVN35WyDwtv8IC-RblVxCpchQLIOuhK8xNG2YbnktAXZjthFxCiohntP8G81tOVu8Qhw/256fx192f', rarity: 'classified' },
        { name: 'M4A4 | Temukau', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSNPWeG2yR1NF6ueZhW2ewlBtx5W6AmYv9JS6XaAV1CJEmTeUL4UTpxNzjZO3jtgaIjN9ExCuskGoXuRnyRhBA/256fx192f', rarity: 'covert' },
        { name: 'M4A4 | Hellish', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSNOKSB2mvyet6vN5lRi67gVMj5W_VyNb7Ii-TPFdxCpskQOMDsEOxxNHgYb-xswKKgo8WyH2t3X9J8G81tMARX_8e/256fx192f', rarity: 'classified' },
        { name: 'M4A4 | Poseidon', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0OKhe6FkJP-dMWuZxuZi_uM9Sn23xkx_sG3VyNyqcnnFZgchDMYjQuMJtRHuw9PvZuPjtlCI3d9bjXKpHL2aoaM/256fx192f', rarity: 'classified' },
        { name: 'M4A4 | Desert-Strike', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0OanfKVjM-ScHGqvzedxuPUnHnjnxEsi4WTTntqucnuUaA92CZR2E-IDtRa-mobnYeLksQbXg4hDyTK-0H1Bbz5yqg/256fx192f', rarity: 'covert' },
        { name: 'M4A4 | X-Ray', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0Oq8ab1SLaSsAm6Xyfo46LAxTHrgxU8lt2WHmNf7cS-Ub1JxDpQkQecO40OwxN2yZbvg41DciJUFk3vXysuZ3Q/256fx192f', rarity: 'covert' },
        { name: 'M4A4 | Spider Lily', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6V6JhL-eWHHSvzedxuPUnHXiwlk4lsTvUz477ICiRPw52WJNxROICtxK-wYDhZejm5gCP2I9MzjK-0H1trtkVHA/256fx192f', rarity: 'restricted' },
        { name: 'M4A4 | Magnesium', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSI_icHneV09FxuO56Wxa_nBovp3OAzo2vdHPFPFUmCJRxRbNZ4xewx9W1Nb7j4gzXg99Ayy73iC1Aun1q_a9cBiEfMG3G/256fx192f', rarity: 'milspec' },
        { name: 'M4A4 | The Coalition', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSI_-SAm6EyOF4j-1gSCGn200jt2_XnIuseX_GaFR0XpEhReULtUKxlIWzP-_gs1HZjI1NzSutiClXrnE8e4r3Ge8/256fx192f', rarity: 'covert' },
        { name: 'M4A4 | The Emperor', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSJf2DC3Wf09F6ueZhW2exwBh_6m3dnt36InjDPQ4oXJt1TbJeshW_mtfjN-vrsgaKiokWy333kGoXuRj4z9Nd/256fx192f', rarity: 'covert' },
        { name: 'M4A4 | The Battlestar', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSMPmcAGKV09F6ueZhW2fjxB9_4GqEyN6vdi_BPwQgWZIkRLYD4Ba_kILgYeOz4lbagthBz3_9kGoXuZIYHoDp/256fx192f', rarity: 'covert' },
        { name: 'M4A4 | Eye of Horus', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSMvGsAm6Xyfo46eU5H3DnlxlytTyDwtr_JHmQZw4hC5R5RrRbtRO5xtCyZrzktgCI2ZUFk3sFC5kC3A/256fx192f', rarity: 'covert' },
        { name: 'M4A4 | Royal Paladin', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSMv-KD2uv0v9jufNscCW6khUz_W-Az9b8d3LFZ1AnDMAjR-4CsBO9xofhNL_q4wLWjogUzyn43SxM73x1o7FVNN3FvCs/256fx192f', rarity: 'covert' },
        { name: 'M4A4 | Buzz Kill', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSM_WQGmiC_uJ_t-l9AX22kBh0tm3Qn92qdS7GPARyW5t0QLQD4xi6w9XkZe3jsgDW3ogUnH3gznQeqfpfmso/256fx192f', rarity: 'covert' },
        { name: 'M4A4 | Steel Work', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwipP0P-rfKVhH_WXCWKD_uJ_t-l9ASyywhtz4GmGmNn9eH7CaQ4gC5ZxQLJc40bqlNSxNOjg4VSMjopMyyvgznQecTvSN4E/256fx192f', rarity: 'industrial' },
        { name: 'M4A4 | Urban DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwipC0PaqeKV5H-WBDFicyOl-pK8xF3DjzR5_4zncnouhcSjGPQ8jA5B3ELFbuhPqloDkPrvjsgXY2t5N02yg2Rf5X8A9/256fx192f', rarity: 'industrial' },
        { name: 'M4A4 | Red DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwipC0PaqeKV5H-WBDGae_vxztN5lRi67gVNxsT_SmYv8InrDblQhDJN2R7ZZ4RW7m9azYb_n5gLZ391AnCj92y8c8G81tFE6rC2P/256fx192f', rarity: 'restricted' },
        { name: 'M4A4 | Desert Storm', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwipC0Pare6F_NM-fB2CY1aB347UxFi-3kEgi5TmAw93_dXKWPFR1CJchTOQDsxa6m4DkM--0sgfZlcsbmn2FVX37/256fx192f', rarity: 'industrial' },
        { name: 'M4A4 | Modern Hunter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwipC0Pq7ZrBoMs-eAWOV0-BJvOhuRz39xUh0tmyDmIusd3mTbldxCcEmRrYNsEO8k9a1Punis1OLj4pBxHn82jQJsHibcUQx2g/256fx192f', rarity: 'restricted' },
        { name: 'M4A4 | Converter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwipC0OCrbJtlJeisAm6Xyfo46OAxFnHixEhztzuAyo79eCqfb1VyXpclTONctxS6w9KxMbi25Fbd2ZUFk3t2_C2R8Q/256fx192f', rarity: 'milspec' },
        { name: 'M4A4 | Jungle Tiger', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwipC0OSRfK1qJeKsAm6Xyfo457AxHyznxBkmsWzcyYmoeXLCalR2D8R3E-8O5he9wIXmM7zr4QSP3pUFk3sDhAfDyg/256fx192f', rarity: 'industrial' },
        { name: 'M4A4 | Aeolian Dark', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwipC6s2vard5MvGQGlibz-Fij-w9cCW6khUz_TvQnt37cS_EaQAgDMciEbVb4EK4ktzvZb_ltlOI3o4RmHmt23xKvSh1o7FVNKLRyHM/256fx192f', rarity: 'industrial' },
        { name: 'M4A4 | Naval Shred Camo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwipC6s2sZLFoH_3HDzOvzedxuPUnFnCxzElysG_Wydz9c3-VaARzXpEhEeVethDtx4LvPujktgbYiogTyDK-0H1inonrSw/256fx192f', rarity: 'industrial' },
        { name: 'M4A4 | Turbine', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwi8P7qaRbrF-Kf-dMWuZxuZi_rRtGiriwUgh5m6Bn9z4IHLEOA4gDpZxQOULsUW9k4eyMOLitQzd3opbjXKpOa4i6Kc/256fx192f', rarity: 'restricted' },
        { name: 'M4A4 | Choppa', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwi8P7qaRb7ZoJf6sDWadztF6ueZhW2fjl05-6mzVmdmgcHOTZgIhXpJ1RO5c4Bjql9DjMunhsgOL34gUnnr-kGoXuTonsfJ3/256fx192f', rarity: 'milspec' },
        { name: 'M4A4 | Full Throttle', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwi8P7qaRe69_MuKHMWCCxOt4j-1gSCGn20kk4mSHn97_eXqTOgMkXpdzR-MNsxO7w9e2Yrnk5VbciIhDznj8iy9XrnE8J4rQ87g/256fx192f', rarity: 'covert' },
        { name: 'M4A4 | Etch Lord', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwi8P7qaRe6psK_WRB3OV_uJ_t-l9AXjnw0Qh5GqGn9b_dH3Cbg4nCcAhRLIM4BW7mtXmM7jjtAXai40WmHngznQeK6EUrpc/256fx192f', rarity: 'restricted' },
        { name: 'M4A4 | Zubastick', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwi8P7qaRcrFvIeOHB2Sb_uxhj-1gSCGn208j5WqDw9ascn6VOlQoCJV0RbVb5xO5l4fgY-Pk5waMitpHzS79jiJXrnE8cY5TeGQ/256fx192f', rarity: 'milspec' },
        { name: 'M4A1-S | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GSMWGRxetJvbVoHjqMmRQguynLm92pci2WagEkC5Z5Q7VetkbukIXjNrnm5QPbjt8WxS-vii4b5i5v4fFCD_TfxF4xWg/256fx192f', rarity: 'covert' },
        { name: 'M4A1-S | Moss Quartz', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GeMWSC2P1ise1lRjO2kSIjsi-OpYjrJC7JAVp5Xco0W7NZsRCwmoCzNbni7lGNi4JMyij3ii9LvS5q4u4KUKIl-ayF2QnBOeYjoc5UYcWIs5E/256fx192f', rarity: 'industrial' },
        { name: 'M4A1-S | Atomic Alloy', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GeMWrEwL87o95oQyW8jCIooTyLnYrGLSLANkI-D5d2FrENtRG7wNDvZe-3slfci9pFmHj8jSof6yZjtugEB6QtrKTXhxaBb-PhITXxPA/256fx192f', rarity: 'classified' },
        { name: 'M4A1-S | Blue Phosphor', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GeMWrEwL9lj-NlWiygmBIstgKJk4jxNWWeOg5xDJR2Q-5b5BGwxIDuP7uw4ALa3ohMz3n3iypLvyc55-pQUKct5OSJ2OKlF5Nn/256fx192f', rarity: 'classified' },
        { name: 'M4A1-S | Knight', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GeMWqV1e96o95lRi67gVNwsWTQzdn4JHyQZ1QhWMZyQe5YsxK-ktPnZOiwtVDcjo9ExS393ytB8G81tGXpYjdX/256fx192f', rarity: 'classified' },
        { name: 'M4A1-S | Dark Water', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GeMX2Vw_x3j-VoXSKMmRQguynLzI6td3-TPQAlD5slR-EJ5hDux9XmMe7i71CI2t8UzSuthi9OvSlo6vFCD_TltxSe0A/256fx192f', rarity: 'restricted' },
        { name: 'M4A1-S | Hot Rod', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GdMXWVxdF75OA4XBa_nBovp3PXyt2uJ32QaQciDZUhReUM5hLskdy2Pu_n4wLe2doXm3j-2i5A7X5i_a9cBuWkb97d/256fx192f', rarity: 'classified' },
        { name: 'M4A1-S | Basilisk', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GCMWrEwL9lj-NoXCC_nA4sjDGMnYftbyqVPwUiX5V5ReUDuxC5m9zmNOPktAHYiIgXzSz43C4a7Sg_6uZQVKU7uvqA7bOYRbA/256fx192f', rarity: 'restricted' },
        { name: 'M4A1-S | Guardian', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL87o95sQyy0lBMzjDGMnYftb3-QPFUlWZJ1F7VbsBi7xoa0Y7vl5ACP2ohEzX-t2iJA7Xtv4ugKWaQ7uvqAAzqYQbE/256fx192f', rarity: 'classified' },
        { name: 'M4A1-S | Master Piece', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL87o956RiW2mx4ijDGMnYftby3FbFdyXpZxQ-AP5hi7wILkZOzg5ASNgt4WmCv833hKuntvsLxWAKE7uvqATAFok6E/256fx192f', rarity: 'classified' },
        { name: 'M4A1-S | Flashback', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9Jtu1oXCGxlB4sjDGMnYftb3yVPQFyDMB3EbJZ5xC4kNPvMOO35AHW3d1AnC_3iHlNuytqtuYDVfI7uvqAZWXE-YM/256fx192f', rarity: 'restricted' },
        { name: 'M4A1-S | Hyper Beast', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9JuPh5SjuMlxgmoCm6lob-KT-JbwF1WZEjR-YJskK9k9XiYePltAeNjYlAxSn5j34dvCZstb4LB6Ut-7qX0V8Xkv5_2A/256fx192f', rarity: 'covert' },
        { name: 'M4A1-S | Welcome to the Jungle', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9Jo-9oRCyMmRQguynLzYqgInjGZlcnX5ciE-IPthLrkN3hYu_ltQPW3Y1NzSn-jCpJ6ydpsvFCD_TdxQe8NQ/256fx192f', rarity: 'covert' },
        { name: 'M4A1-S | Player Two', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj-J6SCbhxUl_jDGMnYftby7BbVdyCsB0EeZY4RPukNfhZOO2sQ3W398Qy3_6jHxIunptsO9TUqs7uvqAAWrfZoM/256fx192f', rarity: 'covert' },
        { name: 'M4A1-S | Cyrex', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj-JwXSyrqhEutDWR1N77cimSbQQgC8F5QLYCsELpltTnZuvk7wbcjdhDzy_43yMb6ilvt7kcEf1yDWu2yf8/256fx192f', rarity: 'covert' },
        { name: 'M4A1-S | Emphorosaur-S', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj-dsSi26mxoYtS-AlJXgHifOOV5kFJt4F-8KukXtldyyMLjjtVOIjIsWzXj8iylJ5ig6tbsKV_ItqaaB3gHfcepq28_00F4/256fx192f', rarity: 'restricted' },
        { name: 'M4A1-S | Briefing', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj-xsWzu6gRg1sgKJk4jxNWWTZgclDpNzQ7FZsESxxNPgZujksVDf2dkTmS343S1M731t5OcLAvZ05OSJ2NaAMPYY/256fx192f', rarity: 'milspec' },
        { name: 'M4A1-S | Nightmare', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj-9gSCGnmBw1tgKJk4jxNWXCbAUpXpp0FrYPthC7k4fnZOm04laMjYxHn3r52HxJ6i065e0FVKV05OSJ2IHiKyzQ/256fx192f', rarity: 'classified' },
        { name: 'M4A1-S | Printstream', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj_F7Rienhgk1tjyIpYPwJiPTcAAoCpsiEO5ZsUbpm9C2Zuni4VHW3o5EzSX62HxP7Sg96-hWVqYi_6TJz1aW0nxrkGs/256fx192f', rarity: 'covert' },
        { name: 'M4A1-S | Chantico\'s Fire', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj_JmWiWnlBYioQKJk4jxNWXFZ1IgC5MiQuZeuhK4wIXnMuPhslCM2oMTxH75hnxK6Htjse4BVqd25OSJ2DU2Q_CD/256fx192f', rarity: 'covert' },
        { name: 'M4A1-S | Stratosphere', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGC1iD1fx3pO56XyG2hxgYvzSCkpu3eSjEOgUkDsRxR7RYsRexwNe0Y-O05VeNg90UmX2q33lJ7itvt-cKB71lpPNheQHx2Q/256fx192f', rarity: 'classified' },
        { name: 'M4A1-S | Decimator', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9JtORqRiSygRI1jDGMnYftb3iUb1dxW5ImFLNftxCxktflZLm2tgaP2otGyn_-hytOvy9q5elQV_A7uvqA6CRSoZY/256fx192f', rarity: 'classified' },
        { name: 'M4A1-S | Mecha Industries', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9JveRqRyiMnBMjpi6RiIb8MhTLN1F4TowiE7EMtRW7ltzlMbvi5wPej4pDmCT2i3tKuHo4sOoEWKFz8qPS3F7BL_Rjtn0I4s52/256fx192f', rarity: 'covert' },
        { name: 'M4A1-S | Leaded Glass', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9Jo-loWz22hyIrujqNjsH8dn6ePwB2DpEmFuAMt0HulYa1Nu2z4QWPjt9NnCX63H9M5ys96r1QT-N7rZDTLd1E/256fx192f', rarity: 'classified' },
        { name: 'M4A1-S | Imminent Danger', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9JpuR7WyC0miIrujqNjsGpciiVZgIpCpAjEOUPuhXuw93kZOzm4laPi4IRyij-2H9P6yc65rwCT-N7rc1sfRJu/256fx192f', rarity: 'covert' },
        { name: 'M4A1-S | Night Terror', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj-hnXCa-mxQmjDGMnYftby3FPFVxA5ZwRecOtUXuxtPiNL_jsQLc2NkTzS38jC5L7ydj5u8EUKo7uvqAgGSM4LM/256fx192f', rarity: 'restricted' },
        { name: 'M4A1-S | Mud-Spec', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj-xgQzqjkB4YvzSCkpu3I3rGP1JxDJpwEbEJ40G6mtfjPuqx7wTf3d5AzHn5hy9AuH5p4u9QBb1lpPNjrdVvDA/256fx192f', rarity: 'industrial' },
        { name: 'M4A1-S | Control Panel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj-55SjuygRI1jDGMnYftbynDbQBzDcR3ROMI40Hpmt3kP-y271OK3tpFmy7633hJ73xit70GBPE7uvqArjH2yek/256fx192f', rarity: 'classified' },
        { name: 'M4A1-S | Golden Coil', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj_JnTiK2lxQztgKClYP9HifOOV5kFJclQ-Jb5xW-m9CxPuLq4QTfjd0XzyX6jCpL6X5o5OgDVfYn_a2Ci1rfcepqgV49FrE/256fx192f', rarity: 'covert' },
        { name: 'M4A1-S | Glitched Paint', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_iHMWaS0vpkseJ9cD66mxkYvzSCkpu3dSnCPFJxXJZ2RrEP4Ri8k4a1Yu_j7w3e3okTzXr92ytA5ilrsroDUr1lpPMn2xt0Zg/256fx192f', rarity: 'restricted' },
        { name: 'M4A1-S | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_iKMWGf0-tlpN5rQDu2lBEYvzSCkpu3dyqVZgF1CJAhF7NYtULrlIa2M-Lh4wKMiYlDmyqrhygduCZs6-xXV71lpPMY7TF_eA/256fx192f', rarity: 'industrial' },
        { name: 'M4A1-S | Rose Hex', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_iKMW-V2e9xv-9WQyC0nQlp6mzTyNr8eH3EOAAmXMQjEOdZtxC7mt3gMuuw5FSL3YlNn3qv3CxO5jErvbgiwdR6KA/256fx192f', rarity: 'milspec' },
        { name: 'M4A1-S | Icarus Fell', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_iKMW6TwPxjo95lRi67gVN_smmHyor9eHyUZwImDpJzEeZf4xS6kN2zY77i7wPdjtgXn3msin4b8G81tDwr8lc2/256fx192f', rarity: 'restricted' },
        { name: 'M4A1-S | Bright Water', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_iKMWiTxO94j-N7Tj-8qhEutDWR1N2scy2Sa1UkC8NyRbMPuhexx4fgYrziswHf395Az3-qiStK5i864-kcEf1ycufvRr8/256fx192f', rarity: 'restricted' },
        { name: 'M4A1-S | Wash me plz', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_iKMWiGxPxmsfJ6cC28mhkrtgKIzo6oMhTLN1F4Tox1TLUNthHuxtbuZejntAzWjNlNmX6rjylJuyhp6-kLBKt38vKFiFuUL_Rjtk_8Ljjf/256fx192f', rarity: 'industrial' },
        { name: 'M4A1-S | Blood Tiger', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_iKMXWVxfp_t-R7cCW6khUz_WXWmdmpeXOWbA4jDJolQeMNthnrlIbiMO7m71TfjIpFxH-vjClO6CZ1o7FVlF3bnRA/256fx192f', rarity: 'milspec' },
        { name: 'M4A1-S | VariCamo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_iKMXGR0-d1sexmcCW6khUz_WjSw9qgd32TaAV1DMAlRrNcuhG7xt2yM-_ktlHW2tlHxHqs2iJI7yZ1o7FVeF8MW04/256fx192f', rarity: 'milspec' },
        { name: 'M4A1-S | Party Animal', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_iKC1iRz-d7se1WXzu6mwkY6m2WpYPwJiPTcFNxDcMjEeUIuxK-wNWyPrzj4wePiIxGmCj5jngcuCpvt7wBAKFw-KbJz1aW-PVDUm8/256fx192f', rarity: 'classified' },
        { name: 'M4A1-S | Black Lotus', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_ux6seJicCW8gQg0jDGMnYftb3-eOgEpDcFyQuMMtRG8kIbhMuK051ba2IMQyH6r3yof5ilv4bwLWfU7uvqA7qRNHGA/256fx192f', rarity: 'classified' },
        { name: 'M4A1-S | Electrum', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_ut6teJ9XTy-qhEutDWR1Iz4cnjCag51DZQlEOIMtEa7k9TiNbmw51OP3tlBxCr8iCsY6C5t6uwcEf1y--utkZE/256fx192f', rarity: 'restricted' },
        { name: 'M4A1-S | Liquidation', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_v9jueJicCW6hAgutzyRk4D3HifOOV5kFJtwQLQCshW4kYazNOngsQGMj4tAyXj8iy1N7CxqsulQVqt0-aaFhwrfcepqI4yC_kU/256fx192f', rarity: 'restricted' },
        { name: 'M4A1-S | Vaporwave', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_vh3oO57WCilkCIrujqNjsH_In7DZgYnWcAiR-MJshO6koDlN7vhsQyLi41HySX6iXlAvCZrsb0HT-N7rW-9qIHE/256fx192f', rarity: 'covert' },
        { name: 'M4A1-S | Nitro', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H-OcMWiCwOBxtd5oTCq2mwk0jDGMnYftb3nFaVQgApQiQuEOukS-x4KxP-PjsQOLjt9HzS6t2CpB6C0_4LxWBaA7uvqANEieesU/256fx192f', rarity: 'restricted' },
        { name: 'M4A1-S | Solitude', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H-OcDW-vzOFjvvVoRiegqhBzsmyWpYPwJiPTcFIoXpslROVftRK5kYblN7zq5VbX3YtMmH_8ji5MvX1qtu1XWPFxrvLJz1aW589-peo/256fx192f', rarity: 'classified' },
        { name: 'M4A1-S | Fizzy POP', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H-ODMXOVwuZ4v_ZoXRahkBkYvzSCkpu3JyqVagUhX5Z2QOYMs0a4lYHmMOjn7gCN2YwQyX6r3HhO5i464b1RA71lpPPi0vWs1A/256fx192f', rarity: 'milspec' },
        { name: 'M4A4 | Tornado', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFU0OaheqpsJP-sAm6Xyfo4secwGX3llEp3sT_dwtz4IH3GZgchD8AmTeUP5hO8lIG0Zuji5VTWipUFk3sAwQa4aw/256fx192f', rarity: 'industrial' },
        { name: 'M4A4 | Polysoup', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFU4M2-Z6h0M_-GHlidle8ij-1gSCGn2x904j7dntz4eX6UOlcmCZFwQLIL4Ri7ktexMePg4Q3ZiIIQmyv6inxXrnE8bylol6Q/256fx192f', rarity: 'restricted' },
        { name: 'M4A4 | Dark Blossom', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFL0PC7bJtvLOWWMWuZxuZi_rZsSi3rzRlwtmjVy4yheHzGa1V0DcF5RO4JsxO-x9C1ZenqtFbW2d1bjXKpi8Drf9k/256fx192f', rarity: 'industrial' },
        { name: 'M4A4 | Radiation Hazard', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFL0Py7Y6F-NOKaHmKvzvx3vuZscCW6khUz_WqGyI34dy6SbgcnWMN2QLNZu0GxkNznMbjn5lbbgtlGyCuviyJNu311o7FVcM-jMdQ/256fx192f', rarity: 'milspec' },
        { name: 'M4A4 | Zirka', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFL0OG6abZSIuKSGGivzedxuPUnSXnqkBwj62vTn9b8cyjBOlNxD8Z2Te8L5Ea8xtbkNe6z7lTajotCmDK-0H35HfkCFQ/256fx192f', rarity: 'restricted' },
        { name: 'M4A4 | Faded Zebra', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFL0OirarZsI_GeMWWH_uJ_t-l9AXu3zBkhsDyHz4z9dXmVagJzW8MiQbFetBfrkNHhZbjr51CMiN8TyS_gznQeEoYBjXk/256fx192f', rarity: 'milspec' },
        { name: 'M4A4 | Sheet Lightning', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFL6s2iYaNlNP6aAGCvzedxuPUnSiuxw0x06mjUzt2teX2QPQQkXMQmR7EK4EG9mtyzNr62tlbb2YpHzTK-0H1YrMl7BA/256fx192f', rarity: 'restricted' },
        { name: 'SG 553 | Desert Blossom', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1a7s2qbbdoMuSsDGufzuNJsvNgSCGnqhEutDWR1N_8JXPBagZ0WZUiRu4PukaxxNDjNb_mtQCPiYwRyymt2yhIuyc46-kcEf1yx7sEwjI/256fx192f', rarity: 'milspec' },
        { name: 'SG 553 | Lush Ruins', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1a7s28fa1jM8-UHGKVz9F6ueZhW2fmkU4jtTzSw42pc3LEOgJ2ApZ4FORZ50XtxoXiPr-z5FDcit9ExXqvkGoXubXo--Tz/256fx192f', rarity: 'consumer' },
        { name: 'SG 553 | Hypnotic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1a7s24bbZ5KfecMWuZxuZi_rJrF3DlkEUl5GTdy4yudHyRZgYnWZskFucO4RO_kIK0PuOxtVPb2d5bjXKpAmuHKUk/256fx192f', rarity: 'restricted' },
        { name: 'SG 553 | Army Sheen', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1a4s2veql0H-ObB2mV_uJ_t-l9AS3qxBgh4jnTyNr4eHKRbwEoWZd0F-RZtkG-lN3gMeix41Tdi98RyXrgznQeaSRFZ6A/256fx192f', rarity: 'consumer' },
        { name: 'SG 553 | Anodized Navy', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1a4c2gabJ0H_yaCW-Ej7ons-AwG37hzUQj5z_Tw9esIHnCZ1UiW5ojQuYJtBO6kNzgNrjitQXAy9USYrEgg8s/256fx192f', rarity: 'milspec' },
        { name: 'SG 553 | Damascus Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1a_s2qaalsM_OGHViDxrsj495lRi67gVMj4miGzteseXjBbAJxXsEjEOQK50axk9C1ZuPi4wbX39gRnC33iipJ8G81tD-xNff9/256fx192f', rarity: 'milspec' },
        { name: 'SG 553 | Traveler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s2ifaNqIfeWMXSXlLslj-1gSCGn20905myGzIn6cyqePQUpA8FxRLVetRK_lYbkMrmx7wbWjIkXzi2t2HtXrnE8Nea-0H8/256fx192f', rarity: 'industrial' },
        { name: 'SG 553 | Aerial', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-SC3WZwOJJvOhuRz39wkQj4TzXw9igJXrEbAJ1C5VyQeVZ5hHslIXjMOyz41begt9Myiiq3zQJsHi7xfgn5g/256fx192f', rarity: 'milspec' },
        { name: 'SG 553 | Atlas', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-SGmuR0tF6ueZhW2fgkxt_tTndn46rJX6QOAEoC5QhEe5f5hHqltfgMeO0tQHY2IsTyyyokGoXuYh0VG-5/256fx192f', rarity: 'milspec' },
        { name: 'SG 553 | Hazard Pay', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-QD3KEyOF4j-1gSCGn20Qj52vXw9z6c32RbAV2XpF1Q-UN4Ra7x4bkPuy0tFTciYpCxC37jC1XrnE8Zorh1bo/256fx192f', rarity: 'classified' },
        { name: 'SG 553 | Dragon Tech', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-QF2WV09FyouBuQCeMmRQguynLw9ygIHnGbgYlDpciEeBYsEPux9ThMuOz4ACLjY1FmX-viitMvCZp5_FCD_QeAJd5TA/256fx192f', rarity: 'restricted' },
        { name: 'SG 553 | Cyberforce', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-QF2WV0-h5ouJscCW6khUz_Wjdntr6Iy6WbgEjA5MlRedctxG5kNKyNbi3sgTfi9oUnyj9234b5n51o7FVairOMAY/256fx192f', rarity: 'milspec' },
        { name: 'SG 553 | Cyrex', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-QF3WV2dF6ueZhW2frlhl14W7Xzt6geXqQP1N0CMRyQuFY5kHsx9HmZejq7wPei91AzCT_kGoXueC0Dzdv/256fx192f', rarity: 'classified' },
        { name: 'SG 553 | Darkwing', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-XD3Wb1ud4t95lRi67gVN24D7WmN2sdSqSalAmDpR2F-IDtxTpkYKyZrmzsQffgtgXzSmqjSNA8G81tFvCRYkS/256fx192f', rarity: 'restricted' },
        { name: 'SG 553 | Pulse', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-DG2uDxNF6ueZhW2eykUh24jjczYqscH7GblIpCJBxF-AD4BHtxIKzM-nq5ACK3t1GyySskGoXuRyAaawM/256fx192f', rarity: 'restricted' },
        { name: 'SG 553 | Integrale', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-BD2uc2NF6ueZhW2e2wkV14m2DzditcnmQOA4gWcYlQOcDs0a7moLvZLiw5geP3dgRnnj2kGoXuQPBQAH6/256fx192f', rarity: 'classified' },
        { name: 'SG 553 | Colony IV', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-BC2aT1eFkj-1gSCGn20Qit2yAn9n8IHKealB2DZIjTO8JsBW7ktDlYu_m5ADWit4Rznn63XtXrnE82sW2soE/256fx192f', rarity: 'classified' },
        { name: 'SG 553 | Triarch', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4ds-HHG6R0-1-j-1gSCGn20Qk6m3UmY77IHOeOlNxCJQmQbYMuhC6mtaxP-K0sQLYi94RzC_8iH5XrnE8WPSRipg/256fx192f', rarity: 'restricted' },
        { name: 'SG 553 | Berry Gel Coat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1c_M2mabR9Oc-BC2Ov0ukj5bdWQyC0nQlp42vXn4mrIy2VagRzXJJxFOYJsxG4koLgP-zktVbf3oJMmSX43SIf6jErvbj113ptXQ/256fx192f', rarity: 'milspec' },
        { name: 'SG 553 | Heavy Metal', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1c_M29b_E4c8-XC2aEyeNzpOBlcCW6khUz_W6Gw9aqcH3EOAUlCcR5Qu4J50O5ltbhMrnltgbdg4tDmSus3ClOuCp1o7FV59kcj5o/256fx192f', rarity: 'milspec' },
        { name: 'SG 553 | Danger Close', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1c_M29b_E4c8-cGGKC_uZzsfVsSxa_nBovp3PSn4z_eH7Fb1V2DpckQeUJsRe8wNflMui0tVTX34MUyH2sjX8b7Xxu_a9cBmrf7Gwc/256fx192f', rarity: 'milspec' },
        { name: 'SG 553 | Phantom', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1c_M29b_E4c8-DBmae1eF7j-1gSCGn204k5WXSz4ysJSnDPQ5xDsZ0Ru4PtUKxw9XhMO-0tAON3YpMyS-v23lXrnE80YpLcJc/256fx192f', rarity: 'restricted' },
        { name: 'SG 553 | Ol\' Rusty', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1c_M29b_E4c8-BG3SE2NF6ueZhW2e3xxt35GzSw9_8J3yePFIpCMEiRrJZukO7x4exZLiw4AGLiNgRy32rkGoXuZqsEgp2/256fx192f', rarity: 'milspec' },
        { name: 'SG 553 | Tiger Moth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1c_M29b_E4c8-HB2CV09F7v_VhcCW6khUz_TnWn9n7cyqRPQ52DpN3QLEPshjrw9zlY-jjs1bWioMQxSj8hyxJu3l1o7FVwqXqqnE/256fx192f', rarity: 'restricted' },
        { name: 'SG 553 | Basket Halftone', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1T-82heqVjJ_WsDGaDyutij-1gSCGn2xxy6mndyNj6cnLCPAIlC5YkF-4Ku0W_ltDhPr6z5lfb2IJBniT7iy9XrnE8euhCJNg/256fx192f', rarity: 'industrial' },
        { name: 'SG 553 | Safari Print', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1T9veRaapkLfGfMXeCyOBij-1qcCW6khUz_T_Rn9qoIn-Sb1MkX5B3RecL4EXsltXmP-u0tgbbj4tEyHn7334a6Ch1o7FVNpTVjWQ/256fx192f', rarity: 'consumer' },
        { name: 'SG 553 | Ultraviolet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I4M2-fbZ9LPWsAm6Xyfo44bQ-Tn7gwRt-t2uAw96tIn7FOAF1CsckQLUJ4xXskdO2NLzrtAyIi5UFk3tU_MwgmA/256fx192f', rarity: 'milspec' },
        { name: 'SG 553 | Candy Apple', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I4M28baBSM_fGWzSvzedxuPUnF3vgx0kmtznSyoyreSqea1UoD5Z0RrZetBm-lt3nPu_r5waP2d9FnDK-0H3tyRypkA/256fx192f', rarity: 'industrial' },
        { name: 'SG 553 | Tornado', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I4M26Z7ZjIfScMWuZxuZi_uU7Syuxlx505muBzN2sI3uUOA51C5AhR7UIsEKww9W0MO634APd2NhbjXKp4EWrMzw/256fx192f', rarity: 'consumer' },
        { name: 'SG 553 | Bulldozer', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I4M23bahhL-esAm6Xyfo44rZsF3jmwU53tmyDzYv6cHnCalQhXMckEe9Y5kXplIC0NrzrtAfcipUFk3th3T45rw/256fx192f', rarity: 'restricted' },
        { name: 'SG 553 | Night Camo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I4P2Raqh4JeOsAm6Xyfo46eMxTi_qwEUmtTjUz9etJCnBaVJ0XMd3F-QIuxbtk9GzNe3n5FSP2pUFk3tLrFywMQ/256fx192f', rarity: 'consumer' },
        { name: 'SG 553 | Barricade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I_82ve6NsMvSsGWaczdF6ueZhW2e1xxwlsTyHn9r_ICmQPAd2CJZyQ7IC5hiwltzuY-u34wyLjYtFni6vkGoXubfBxhfQ/256fx192f', rarity: 'consumer' },
        { name: 'SG 553 | Bleached', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I_82qbbdoMuSsHWyFzeJlj-1gSCGn20Uk5WTSytmqJH6XbwMoA8RyRuBY4Ea6kNC2Y-Oz7gbc3o9HxS2r2n5XrnE8gS50bog/256fx192f', rarity: 'consumer' },
        { name: 'SG 553 | Gator Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I_82jbbdlH-CKGm-fz9F6ueZhW2e2zER_5j-ByIz_d3nCOgMiC5Z0Ru8DsBSxkN3mYrzjtFHd2I9DxH77kGoXubNdaEwA/256fx192f', rarity: 'industrial' },
        { name: 'SG 553 | Fallout Warning', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I_82gfa9oM-SBB3eV_uN3ou5mQRagkkhy4AKJk4jxNWWSZlAhA5QjFLJYukLpwdLjZe60sgzYjtpCxC2oi3tB6C5ot-pQWaJ35OSJ2GFfvLbQ/256fx192f', rarity: 'industrial' },
        { name: 'SG 553 | Aloha', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I_829b_E-c8-SAmiYwNF6ueZhW2fjxE5x5W_SnNz8eXmQaVN2WJUmF7RZuhS8wYbiZeO04VPa3YlCmHr7kGoXuWs6bs2V/256fx192f', rarity: 'milspec' },
        { name: 'SG 553 | Wave Spray', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I_829eLZsOc-ED3GV0tF0ouB_QBa_nBovp3PcwoqtdC3BOwQkCZB3QOIIsxm_kNyyZuzg7w3f2YNEnn6qjS0Y6Clq_a9cBmkkHSs4/256fx192f', rarity: 'milspec' },
        { name: 'SG 553 | Waves Perforated', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I_826abRoH_ScGnSv1u9gtfJWQyC0nQlp4TyDnNr4c3yVPQcpX8FxQORZ5he5lYG1Mr-07wOMjt1Hyyv-3H5O5jErvbhvnntidg/256fx192f', rarity: 'consumer' }
    ],
    pistols: [
        { name: 'CZ75-Auto | Army Sheen', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2veql0H-ObB2mV_uJ_t-l9ASrgl0lzsWSDytatICnDaVQmWZt3Q-MJsxS4m4DgYuuz7w2L3ogRyivgznQeVdjncD8/256fx192f', rarity: 'consumer' },
        { name: 'CZ75-Auto | Copper Fiber', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2tabZvL_6sCG6SxPxJs_s-Gha_nBovp3OEzIn8c3qUagUiD5p0FuILtUKxm4e2Mrzms1baiIpCyiiqhi1J6yxo_a9cBnTQQcTV/256fx192f', rarity: 'industrial' },
        { name: 'CZ75-Auto | Emerald Quartz', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2ter1-NPGfAm6KxOpJt_NsSieMmRQguynLyNivIn6XPFUnXsYmFuNbukK6ltfiYeux5A2M2dgXyCqo2igY7yhutfFCD_SCQHbp0w/256fx192f', rarity: 'milspec' },
        { name: 'CZ75-Auto | Polymer', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2tcrI_H_2VMWuZxuZi_rcwSnHjwxgh527SzI6oIHKUZ1dxA8ckTbUCskG6ldTuY-nh5FTf34JbjXKpj6qz0B4/256fx192f', rarity: 'milspec' },
        { name: 'CZ75-Auto | Tread Plate', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2qYaVgL_6XMXecwPpzj-1gSCGn20l_62-Bzd39cH2QaAYoD8ckE-9csxmxx9biML_q4w3Wi4gTmSyvjShXrnE8FqKNMu4/256fx192f', rarity: 'restricted' },
        { name: 'CZ75-Auto | The Fuschia Is Now', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2ofbduKPmSMWuZxuZi_uM-Sn_hlhgi4D_RnImrJC3COFIoApB3FLUP4RS9mtSzYu_r7wHZjopbjXKpFZZFzGk/256fx192f', rarity: 'classified' },
        { name: 'CZ75-Auto | Twist', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2pcbZsNPWsAm6Xyfo45bY7TXzjxk5w42XXn93_cnLFOFN1C5t0ROANsBLtx9ziNu6x4FHejpUFk3uH-TvaLw/256fx192f', rarity: 'milspec' },
        { name: 'CZ75-Auto | Poison Dart', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnj53UO7ryvaac0dKiVW2XBlrwmsuA6GH3hkE9062qEz9aoeCmVawchW8dwEe4MrFDmxWPDR_Ga/256fx192f', rarity: 'milspec' },
        { name: 'CZ75-Auto | Chalice', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s28Z71sLM-fB2CY1aBzsrQ5HnyyzBh25jzcyI3_dyqXaFcmC8ByReBZuxi-lYXlMei05FSPlcsbmsOlfuvI/256fx192f', rarity: 'restricted' },
        { name: 'CZ75-Auto | Emerald', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4c2rZaF_IfyXMWuZxuZi_rNsFyzqzUhy4zzWmdqvdnPFbQYoCpolQeMOuxHum4HnMbjl4FCM2I1bjXKpBQcUgmo/256fx192f', rarity: 'milspec' },
        { name: 'CZ75-Auto | Silver', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4c29Yah7JeKsAm6Xyfo457c5Gn7nwEV-6jvRy96rcHPEPwcpDcZ4RrQItxHsk9bnMOrg5QKPi5UFk3v7O4lRrA/256fx192f', rarity: 'industrial' },
        { name: 'CZ75-Auto | Victoria', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a_s2rfKdlJfSsDX3HlNF6ueZhW2fkk04i5WrXmY2sc3qfPFAlWZd3EOdY4Bi6loCxPu7h51fZjNlGzST5kGoXuTXAF0gA/256fx192f', rarity: 'covert' },
        { name: 'CZ75-Auto | Slalom', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2vard5MvGQGliHyeditd5qVRa_nBovp3Pdzt3_eSqUOA4hDpB1EbQPshXqkdPmPrm04APXjdhExXis2C1N7io9_a9cBtMaUZjs/256fx192f', rarity: 'restricted' },
        { name: 'CZ75-Auto | Tigris', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2tP_FsbeSaCWKC_uJ_t-l9ASvil0R15WjUmYmqc33CaQ91W5QlRbVetETtwNC1P-u34g2L2dpEmS_gznQebcVQ6rs/256fx192f', rarity: 'restricted' },
        { name: 'CZ75-Auto | Distressed', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2tcvM4H_OWHGabzvpzj-1gSCGn208hsTyHw9z6eS2faQEoX5p1ELECtBi7xtG2Pr7j5APZjopDynj_iHtXrnE8XiCan1o/256fx192f', rarity: 'milspec' },
        { name: 'CZ75-Auto | Eco', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2tcvM4H_WQAVicyOl-pK87HivqxR5xt2_Qnt6qI3-fPFciWJBzRuFZ5Ba_moG0Mrm04lfajYwQ02yg2Q7xomN1/256fx192f', rarity: 'restricted' },
        { name: 'CZ75-Auto | Pole Position', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2tcvM4H-CBC2SZ0ud5vt5lRi67gVNy4mTdzdmgc33COg90DcB2FuMPtxLpldSxZeLn4w2K34NCzXj9hnsY8G81tCL36RK-/256fx192f', rarity: 'restricted' },
        { name: 'CZ75-Auto | Circaetus', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2tcvM4H-ebB3Wc1ud4tN5lRi67gVN242-AzNuoIyieOg8lDJdyEeVe40TqxoDvZLixtVPZ2IhFmC333yNJ8G81tFbyihAW/256fx192f', rarity: 'milspec' },
        { name: 'CZ75-Auto | Yellow Jacket', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2tcvM4Ic-QBmaD1edstfNWQyC0nQlptjjRn9z8cHjBbgB2WccmFOAPukbux9zlP77nsQXf3YxFzSX9iy9AvDErvbgg0Q8tFg/256fx192f', rarity: 'classified' },
        { name: 'CZ75-Auto | Tacticat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1c_M2tcvM4H-SSDXOZwu9ij-1gSCGn2x4k5zvVm9z8IH7FZwFyCJckR7NfshSwwNGyMLzn41fejINHn3r6jy5XrnE8D8_CCNo/256fx192f', rarity: 'restricted' },
        { name: 'CZ75-Auto | Imprint', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1c_M2tcvM4H-SBC2aU_uJ_t-l9AX_ql0kksWTVyYupJC7FOAUiAptxQudbs0KxkNK1MLzl4wOPjIsWyCngznQeZTDWXeo/256fx192f', rarity: 'milspec' },
        { name: 'CZ75-Auto | Vendetta', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1c_M2tcvM4H-aWAGOV1fp3j-1gSCGn205ysWiEw9iqInueOAZyD5J1EOdf4Ea9l9bmMb_q4AaI2NhGySz6iStXrnE8_AWQoqE/256fx192f', rarity: 'milspec' },
        { name: 'CZ75-Auto | Red Astor', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1c_M2tcvM4Ic-BC2OR0vp5ot5lRi67gVMh5D_cwor7cy7GZ1UpA8F0QrQP5BjuwdHiZr7r5FeNjIpAmyT8hnlI8G81tORsc2LX/256fx192f', rarity: 'restricted' },
        { name: 'CZ75-Auto | Xiangliu', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1c_M2tcpt-LvGYC3Sv0ftkoO1scCW6khUz_WTcw9r7JH7BOgApApojQuBb5kO5lNO1ZO_h4VaM2o5Gm36s3HgbvH51o7FVgkdxNDg/256fx192f', rarity: 'classified' },
        { name: 'CZ75-Auto | Syndicate', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1c_M26eqVkLs-QFDDF_uJ_t-l9ASjglxhw52rQy974IirCa1UiC5R4RbJbsxjrk9SxMb7k4lfZ2o9AzirgznQeG7VwMmI/256fx192f', rarity: 'restricted' },
        { name: 'CZ75-Auto | Hexane', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1T9s2sZLFoKPWLMWuZxuZi_rBqS3vrkRxz5W7dnN2oIyiTZgYhXpN5EOIPsUbsloC1M-_qs1HdiYlbjXKpP5VEBps/256fx192f', rarity: 'milspec' },
        { name: 'CZ75-Auto | Green Plaid', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1T9s2-ZKVkJKKsAm6Xyfo4s7Y4Fn22xkhw6mzSyY2tcn3DaVIhXpshFLQD5hTpmtCzP-Pg4wKLg5UFk3t4lHCTnQ/256fx192f', rarity: 'consumer' },
        { name: 'CZ75-Auto | Framework', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1T9s24bbZ5KfecB2uc1P1_v-9WQyC0nQlp4WrQn42pIiqTZlQpXMByE-8Mu0Huxte0Y-zl41Pci4lFxST_33lA6TErvbh9z0zyoQ/256fx192f', rarity: 'consumer' },
        { name: 'CZ75-Auto | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1T9s25baZ-H_yaCW-Ej-0u4-VsH3G2x0x-sGXQyY76JXPGOAQkCMAlR-YNsBDqxtHhZerjsgTAy9USIjIDnE8/256fx192f', rarity: 'milspec' },
        { name: 'CZ75-Auto | Honey Paisley', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1T9veReKVkM_yWF1iUxP13pN5lRi67gVN2tW3Sntuvd3OROFUoXsB2Q-9Zs0Hqlta0Pujr7waIiYJAxS-sjy0c8G81tBzzAWSY/256fx192f', rarity: 'consumer' },
        { name: 'CZ75-Auto | Indigo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1I4M2nZqBkJ_-sD2mU_ulktfhWQyC0nQlp5zmGzo2rcXnDbFJxDZoiRrII40Puw9a2YeOwsgbdjNlCnCSoiilK6TErvbj4Q9U5dw/256fx192f', rarity: 'consumer' },
        { name: 'CZ75-Auto | Nitro', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1I4M2heqVjJ_WsD2STxOBio7NWQyC0nQlptWvXw9_7I3zCaVB1C5YkTeAIsRC8m9a1MePg5VGLiI9CnH772C9AuDErvbi4qlLcDQ/256fx192f', rarity: 'milspec' },
        { name: 'CZ75-Auto | Tuxedo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1I4M2heqdsH_yaCW-Ej7lz6Oc9GXC3zEwh4D_VzY36eHvDaQYkXJV3FLMJtEG_kNHiZLmxtAPAy9USE1srPao/256fx192f', rarity: 'milspec' },
        { name: 'CZ75-Auto | Pink Pearl', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1I4PeReK1jK8-DC2aCzdF6ueZhW2exk0xx6mnSmN-qci_BOwAgDZd3ReUO4BW4wYDmMejq51OL34lBmyT9kGoXudH7YXET/256fx192f', rarity: 'consumer' },
        { name: 'CZ75-Auto | Midnight Palm', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1I_82-aahgH_6aCW-E_uJ_t-l9ASiwl0lw5z_Unt_9IHqRbwV1X5QmFuJZtxi-l9HuML7htgGN3t1NzSjgznQe0h5WimA/256fx192f', rarity: 'industrial' },
        { name: 'CZ75-Auto | Jungle Dashed', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1I_826abRoH-ObAXWE_uRjvuZlSha_nBovp3PQyt2reHrGPAQiDJYjTOQItRDpwd3kZO23sQLY3Y0TmX75iXxB631i_a9cBsRmAsJf/256fx192f', rarity: 'consumer' },
        { name: 'Desert Eagle | Blaze', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7vORbqhsLfWAMWuZxuZi_uI_TX6wxxkjsGXXnImsJ37COlUoWcByEOMOtxa5kdXmNu3htVPZjN1bjXKpkHLRfQU/256fx192f', rarity: 'restricted' },
        { name: 'Desert Eagle | Hypnotic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7vORfqF_NPmUAVicyOl-pK9qSyyywxgjtmnVytyocnLGPA4iWcYmRLYIu0S-xtbuMLjg51DXjoJC02yg2VjGnh4J/256fx192f', rarity: 'classified' },
        { name: 'Desert Eagle | Bronze Deco', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7v-RarZiLuqWMXSAwPx9vORWQyC0nQlp4zzdydqtJXuTOgZzW5F4QbNZ4UK7l9e1N-Pq5AeNj9hHmH783S9J6zErvbgcMfnnyA/256fx192f', rarity: 'milspec' },
        { name: 'Desert Eagle | Meteorite', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7v-Ra7Z0M-SSAmuZ2-tyj-VoXSKMmRQguynLyN-qIH3Daw4mCZR3EeBbsUO-l4a2Prvm7gzWg4MXnymq2H8Yui9usfFCD_RyA7Mmlw/256fx192f', rarity: 'milspec' },
        { name: 'Desert Eagle | Cobalt Disruption', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7v-RbKB9IeSXC2mDxNFmteBqQCq4qhEutDWR1I36c3OVbFQjDcRwR7EO4EW-x4HvMumzswfWjd8XnCn2iShM53s5t-0cEf1ycu8KccY/256fx192f', rarity: 'classified' },
        { name: 'Desert Eagle | Night Heist', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7v-RYKFkM-SsHmuRz_1JoPR7XyW2qhEutDWR1I6uJH-RPQInXJB0F-Vb50bqxt3kN-Kw4VCMjYxCyXmvj3hO6X05t-8cEf1yxd2V6Eg/256fx192f', rarity: 'milspec' },
        { name: 'Desert Eagle | Emerald JГ¶rmungandr', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7v-RYqt_Lc-UHGKVz9F6ueZhW2fqzB51sGiGzNqrJXqWbAYmCpJ0RuYDshm_xNPmZuy07wDY3YwXni6okGoXuekvMmaE/256fx192f', rarity: 'restricted' },
        { name: 'Desert Eagle | The Bronze', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7v-RZrFgIvWBHViS0-F4quRWQyC0nQlp4muHzt78cXqXbQInCZFzTbEO4xS4lYKzMOnqtQTf3osQm36v3SJMujErvbh3QIzNUw/256fx192f', rarity: 'industrial' },
        { name: 'Desert Eagle | Golden Koi', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7v-Re6dsLPWAMWWCwPh5j-1gSCGn20om6jyGw9qgJHmQaAcgC8MmR7IMthm5m4W2M7zj7wOIj4pGn32o23hXrnE8VHBG1O4/256fx192f', rarity: 'covert' },
        { name: 'Desert Eagle | Sunset Storm еЈ±', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7v-Re6FsM-ScHGqvw-J5v-VWQyC0nQlp52nQn434cC7EblUmCpQmFONYtxCwxIW0Zrvk4ASIiI8UxHn82ika7zErvbhCT1u8fA/256fx192f', rarity: 'restricted' },
        { name: 'Desert Eagle | Midnight Storm', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7v-Re6FsM-ScHGqvzedxuPUnGXC3kR904myGyd79eXmUZwYlDsNyQe4JtkWxx9LgYuPrsVaNg99HzDK-0H3GwZY3mA/256fx192f', rarity: 'industrial' },
        { name: 'Desert Eagle | Sunset Storm ејђ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7v-Re6FsM-ScHGqv0uZ5uu5WQyC0nQlp4DiDyov6JH7FZgAmX5N5F-RZ5hntw9HlNuPkswLa2d1NzCv63S0cvTErvbieIVxaew/256fx192f', rarity: 'restricted' },
        { name: 'Desert Eagle | Heat Treated', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uORbKFsJ_yWMWSR0utJuOB7Syy9kBkY4QKJk4jxNWXGbQZ0CZpyTeBf4xO4m9y1Nuy05wHYg4lNySWr3C1Luyhu4LkKA6As5OSJ2JAJXn6j/256fx192f', rarity: 'classified' },
        { name: 'Desert Eagle | Corinthian', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uORbKFsJ_yWMWSf0-d4pOlgTieMmRQguynLzNz4Iy2ebgUmDZB4QeEDskO5ktWzMrjm7wPd2IlGmCr_3XxBuClr4PFCD_To4zX47g/256fx192f', rarity: 'milspec' },
        { name: 'Desert Eagle | Naga', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uORbKFsJ_yWMWmRxu9JvOhuRz39zEx06jjWm4n8Ii6WPFQhA5YjE7MJskPrwdTuZb7htlHbg9oTzCn2hjQJsHhQd9ynBw/256fx192f', rarity: 'restricted' },
        { name: 'Desert Eagle | Directive', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uORbKF-JeKHMWKRxuJzj-JmQTqnlB8rtgKJk4jxNWXGPQ9yA8Z0R7FbtBi7w9S2M7_msgCIid1CmH6viH5I7ilr4-oEUKst5OSJ2LTZlHwR/256fx192f', rarity: 'restricted' },
        { name: 'Desert Eagle | Kumicho Dragon', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uORbKF-JeKHC2aXzetJu_RkRiq7mhk1sjqKlLD1KCzPKhh0CcBwQLVe5BHrloKyZOnr5w3XiYhDnC39iCpK7X1psrlUWaFw8qXekUifZlV_fDVZ/256fx192f', rarity: 'classified' },
        { name: 'Desert Eagle | Heirloom', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uORbapqMvGFC2Ovxet3t-1scCW6khUz_W3czNegeXueO1N2WZIkE-RY4EGxlNSxZLnn5gfai4oTniSoiStA6y91o7FVItTkIhw/256fx192f', rarity: 'restricted' },
        { name: 'Desert Eagle | Hand Cannon', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uORYKVjJPOSAGmfz9F6ueZhW2eww0t-6mrUn977cinDZ1IgD8YiTeUIthjpk9zkYem04wTXj4oRnCv7kGoXuTIzWSlA/256fx192f', rarity: 'restricted' },
        { name: 'Desert Eagle | Pilot', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uOReK1hL-SsCmKRxuJzj-1gSCGn2x8jtWncyIupJH2TPwYlCJZyF-Rct0XplNfiYuy2tAeIiItEz36ointXrnE8Ks-4_Fs/256fx192f', rarity: 'restricted' },
        { name: 'Desert Eagle | Printstream', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ8-DHG6e1f1iouRoQha_nBovp3OGmdeqInyVP1V0XsYlRbEI50a5wNyzZr605AyI3t5MmCSohylAuC89_a9cBoMY9UkV/256fx192f', rarity: 'covert' },
        { name: 'Desert Eagle | Trigger Discipline', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ8-HHG6Xxutkj-VgXCq6hREuvTi6lob-KT-Ja1UlWMAkTOMCt0G9kIHlP77l5FbW344XxX_4iSJJv31r4bxRUKUn_rqX0V-d-rquYA/256fx192f', rarity: 'restricted' },
        { name: 'Desert Eagle | Conspiracy', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ_yWMWaF0-tjo95lRi67gVMk4WTSm9moI3-QPVBxDJByQOJe40O6k4fnM-zgsQXci4gUyH3_3CMa8G81tJHuULJI/256fx192f', rarity: 'classified' },
        { name: 'Desert Eagle | Ocean Drive', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ_yWMWyZ1e1-j-1gSCGn2x5-sG7Wzdyvc3OSbgcnXpR5FO9bukTtm9WzMePhswaN2N5CmCj_jyhXrnE8ibjhEyc/256fx192f', rarity: 'covert' },
        { name: 'Desert Eagle | Blue Ply', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ_yWMXWV0eJ_s-BWQyC0nQlpsjzdwtqgIHqfZgAgDZBwROBbtRDsm4HiM7zislfYitpBniz6iy5K7DErvbjLUTqBnA/256fx192f', rarity: 'milspec' },
        { name: 'Desert Eagle | Oxide Blaze', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKF-JeKHMWKRxuJzj-JmXTu8kRgpjDGMnYftb32UPwJxDJokRuUIsRi_lNPhM7izsgXZi49GySiq2nxNuCdttbtUB_A7uvqAjSk2l_c/256fx192f', rarity: 'milspec' },
        { name: 'Desert Eagle | Starcade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRb6hkNOSWHFiUxO9xvORWQyC0nQlpsD_SnN79JX2WbQ8pXMNwRO5ZsRK8lt21Nb7r4wPXgtgWmCz7hylJ6jErvbgNUrm8Kg/256fx192f', rarity: 'classified' },
        { name: 'Desert Eagle | Tilted', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRZ7JoMuCSHXSvwP9jsd5tSii0mRgYvzSCkpu3cH-UOgV2D8RyQrMKsRW-mtWyPunr4VeNjIhMmX6ojigY7y9v5ehUA71lpPMO4MWI5A/256fx192f', rarity: 'industrial' },
        { name: 'Desert Eagle | Calligraffiti', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6_evb6hoH_OSAmuZxvx3tudWQyC0nQlp52rQmNv_IC7DaFR0ApB4QbMKs0W8k9zuPr6xtAGMjoITmymohyMa6jErvbhrxmEjWA/256fx192f', rarity: 'milspec' },
        { name: 'Desert Eagle | Firebreathing', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6_evb6hoH_aaHGKS0-t3pOlgQS6MmRQguynLn9ircSiTPFUgCJAkQbELsxXtktDkMurk4lTZ39hEyn_-3HsbvXxj4fFCD_RcNNN-xQ/256fx192f', rarity: 'restricted' },
        { name: 'Desert Eagle | Serpent Strike', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6_evb6hoH-OdD2yV_v53pPVsXSeMmRQguynLzdmsIHOVPVciXMN3QuVeuxexmtHuP77m7gDd34kRxXj_3ChKvS9p5fFCD_SJMmxOXA/256fx192f', rarity: 'restricted' },
        { name: 'Desert Eagle | Code Red', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6OGRbKFsJ_yWMWaXxvxzo_JmXRa_nBovp3PRmNj4c3mTb1RxC5cjF-EItRnrlNzkYrnk5gaI3Y0UmyX52H9K7ixs_a9cBsGEcOCn/256fx192f', rarity: 'covert' },
        { name: 'Desert Eagle | Light Rail', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6OGRbKFsJ_yWMWKIztF6ueZhW2fhlhlw6m-GnNyvIiiXOwQoDMR2QbZe5hi5k9KxN-vhtFbciN1FnyqskGoXuU4JtHUo/256fx192f', rarity: 'restricted' },
        { name: 'Desert Eagle | Fennec Fox', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6OGRbKFsJ_yWMWGVz-Bzs95lRi67gVN14GvRyt77cnKfagRyXsMiTeUNtRO5kYWyYr7i4lfZgoIUzX722CpO8G81tMpbNfMB/256fx192f', rarity: 'classified' },
        { name: 'Desert Eagle | Mecha Industries', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6OGRbKFsJ_yWMWqVwuZ3j-1gSCGn20h042vSyY2tdyjCZwIlXJBxQeNe4EWxxoHkMOq0sQGIid5Fnyr42HtXrnE8p4gbgvE/256fx192f', rarity: 'classified' },
        { name: 'Desert Eagle | Mint Fan', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk5-aRbaV_NPisCGae0tF6ueZhW2ewlEoktW2AnI2qJHqSPFBxXJp0QrEIsRbpwYC0Purr4w3W3t1CmXiokGoXuVx1ISUO/256fx192f', rarity: 'milspec' },
        { name: 'Desert Eagle | Urban DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk5-uRbKB9IeSsG3WS_uJ_t-l9AXm2kxkk42rWn9egc36UOwYiX5N1EOVYsRLtldC0M77g5QXfiN1Fzn_gznQemk8fKYk/256fx192f', rarity: 'industrial' },
        { name: 'Desert Eagle | Mudder', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk5-uRZat5NPyWCliDwOByj-1gSCGn20gj4WrVyNiuJ3OfPVAjCpEmE7MKuxbqmtDmPuu0slDW3Y5GyS-tintXrnE8PKHjtHI/256fx192f', rarity: 'industrial' },
        { name: 'Desert Eagle | Urban Rubble', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk5-uRfqV_KfOSA2iv1Px0se9WQyC0nQlp52nWmduhIn-QaQIpX5RyF-ZY5BS4l9TjZOPmsleN34wWnir73yJI7zErvbj27zddPg/256fx192f', rarity: 'milspec' },
        { name: 'Desert Eagle | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk5-uRf6FvM8-XD3WbxPxJvOhuRz39wEUh5W3Rytyscy7FPAYgWJJzRe4MtUW8loKyZOm3sQzb34lEzyX32zQJsHig-EWd2A/256fx192f', rarity: 'restricted' },
        { name: 'Desert Eagle | The Daily Deagle', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk5-urV6dsMs-EHGaA_uJ_t-l9AXm3kxh162qHy9-pd3PEagMmDJMkRuEK4BG4x9zhZe-07gPdiotMyivgznQej0ovEM4/256fx192f', rarity: 'milspec' },
        { name: 'Desert Eagle | Night', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk_P2RZq1qKOSsAm6Xyfo4seVrHHjmzRhz42XUm4mgIC6TaQYkXpMjTLIIsRawl9HhYbzktFPfgpUFk3u310nzMg/256fx192f', rarity: 'industrial' },
        { name: 'Desert Eagle | Mulberry', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk_P2rV7RhNf2sAm6Xyfo44uIwGC_rx08lsjvdwt_7cinDZ1RyX8ZyRe8NsBexwdDgY-zr5gKI2pUFk3tTfLUzaw/256fx192f', rarity: 'restricted' },
        { name: 'Desert Eagle | Sputnik', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk_OKRe7RsI_WBD2SV_ux6peRWQyC0nQlp5W6Hydz_In7CPQMjWcYmQrZZ5xLumtCxZrnhsQ2I3dkTmCz5jyoaujErvbhRuDcF4A/256fx192f', rarity: 'milspec' },
        { name: 'Dual Berettas | Cobalt Quartz', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1a4s2ter1-NPGfAm6KxOpJsu18Sha_nBovp3OGm92vdXyWOgN2Dcd2E7Zfsxa7kNe2Zbm2slSN2N1HnCmqi39MuCc6_a9cBtlhe-EA/256fx192f', rarity: 'restricted' },
        { name: 'Dual Berettas | Heist', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1a4s2mba1-NM-DAmae0tFxouRsQRa_nBovp3OEn437c3yTZlJ0DpB3QORfshS8xIfjYe3n7wTbi98Wzn2o2ilPuilv_a9cBr2drwX0/256fx192f', rarity: 'consumer' },
        { name: 'Dual Berettas | Hemoglobin', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1a4s2he7dkJumsHGKU_uJ_t-l9ASjjxEgm4mWHzYuhdi-RPVByD5pxF-ULshS6xofjMrzgs1eIiIxHnnrgznQe0T5dj0k/256fx192f', rarity: 'restricted' },
        { name: 'Dual Berettas | Emerald', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1a4c2rZaF_IfyXMWuZxuZi_uBrF3u3zE5xsWjTzIr7eHKeaVIpCpd5QOIC5xi_w9PjY-2x4QDd3opbjXKpzqjop3Y/256fx192f', rarity: 'milspec' },
        { name: 'Dual Berettas | Anodized Navy', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1a4c2gabJ0H_yaCW-Ej7ci4blsTi_kwkki62yAnN6tcHLGZg4iAsF1FLULuhPuxtTiMOnn4gzAy9USUx32_HM/256fx192f', rarity: 'milspec' },
        { name: 'Dual Berettas | Cartel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1a_s2qfaVhIvWBC3OEwP1Js-B7Wyy_qhEutDWR1I38I3yROgAmDZIjFuEJ50S6lNLvMuKx5lPbj9gRySz92HhKuiZp5ekcEf1yPnX3Fyc/256fx192f', rarity: 'milspec' },
        { name: 'Dual Berettas | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1a_s2oZ7ZuJfSsAm6Xyfo45LVtG3zgzEt-tmWHydutd3nFaVciDJIjFrZZt0OxmoXkMuuz7wbY2pUFk3vnrYa7Ww/256fx192f', rarity: 'industrial' },
        { name: 'Dual Berettas | Flora Carnivora', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s2qfaVhH_WfB3OV0tFzpuhlcC-_mg8mjDGMnYftbynGOA4lDZd4FOZYuxi6kdPvZuLrsgTW2IIQxXn7iSNJ6ic96-YCB_I7uvqA4cV5qzc/256fx192f', rarity: 'restricted' },
        { name: 'Dual Berettas | Twin Turbo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s2qfaVhH_WfB3OV0tFkse1lVha_nBovp3OHytv8JCnBbAF1X5MjR7UPsBfrmoHuNr7nsgbfjdlAxSr63CIfuChr_a9cBiuNovOB/256fx192f', rarity: 'classified' },
        { name: 'Dual Berettas | Dualing Dragons', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s2qfaVhIvWBHGKE1e9JtPNoSCa9hiIrujqNjsGqcn-VZ1JyXMR3RuMK5xDswNXkYbjitgePj91Bynn32y5N7ydtsLoET-N7rXzpOmeh/256fx192f', rarity: 'milspec' },
        { name: 'Dual Berettas | Melondrama', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s2rZK15JeOsDGKHwPxzj-1gSCGn20t_5TiBmdf9Jy-QaQIiW5F1E-BesxG9lIaxNuLj41He340Ryi79ii5XrnE8Xl7Qhlk/256fx192f', rarity: 'classified' },
        { name: 'Dual Berettas | Urban Shock', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s2rZK15JeOsG3WSwOBlpO57Qha_nBovp3PQzI6pc3iRZ1cjC5dzQe4CsxPtwdHjMevq41CLjIpMm3_5jypN7Cxp_a9cBoxgoAoS/256fx192f', rarity: 'restricted' },
        { name: 'Dual Berettas | Sweet Little Angels', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s2hfqF_MPGAHViSwOxvj-V8TiW6kA4YvzSCkpu3dHrEag8oCMd2EeMCtRa5xIbkZuuxtVbb2IhHz3_7hywavH1s6-lTB71lpPNncouquQ/256fx192f', rarity: 'restricted' },
        { name: 'Dual Berettas | Retribution', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnl8StP6ryvOqJpJqjACjbBkb93srg-Fn7ilBhysWXSyNarJSqUZlIpCMclTbMCrFDmxYRwJ9Kk/256fx192f', rarity: 'milspec' },
        { name: 'Dual Berettas | Black Limba', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s29baV-L_6sC2uZ1etlj-N7Tj-8qhEutDWR1NyuJC6SPQQoC8N1TLYMthC_kNTmMOKw4gLe2osWmC6vhylB6C5i4OscEf1yNRLqhkE/256fx192f', rarity: 'milspec' },
        { name: 'Dual Berettas | Hideout', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1f-vOiV6ZoMvWHGmaD_uJzpOloQxa0hxQpjDGMnYftb3-WbQ92WcZ4EeFZs0TtxIfvZr_m7wXW2I0TySv93ywd5yxu5-0FAPE7uvqA-FxXgtE/256fx192f', rarity: 'milspec' },
        { name: 'Dual Berettas | Angel Eyes', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1f-vOiV6FhKeSWMWWZw-J_s-BlcCi9khgrjDGMnYftb32WZlN1W8B5R7UN50brwYDlPrm3s1CPjYoXmCn3hnlJuCpi574EAqA7uvqAcmHsw_M/256fx192f', rarity: 'restricted' },
        { name: 'Dual Berettas | Hydro Strike', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1f-vOiV6FhKeSWMW-Jxfx5j_J9XSC4kCIrujqNjsGgeHrGa1B2W5t1Q7NetkOwk4C2Ybzq4FDWjI0TzS6viilLv3tp6rwLT-N7rWtjCU_P/256fx192f', rarity: 'restricted' },
        { name: 'Dual Berettas | Royal Consorts', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhH_KWHGKE1e9lj-ZmQy22myIxtjOMmYrGLSLANkI-C5AjFOcM5EaxxtTmPrnl4Q2Ki91Eyyz32y1Luyk44u4LUqEjr_ff3BaBb-MmOWu8Lw/256fx192f', rarity: 'restricted' },
        { name: 'Dual Berettas | Tread', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhH_KWHGKE1e9lj_V7Sii3qhEutDWR1NmhcnPEPA92CJBxQeUNsha-ltC0ZOnltQHfjI1Gn3r7jy9N7npvsb4cEf1yGJF-WOQ/256fx192f', rarity: 'milspec' },
        { name: 'Dual Berettas | Elite 1.6', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhH_WfB3OV0tF1vOB6XCCwqhEutDWR1Ir4JS2UbQRxW5J5QLICsxi8ld3mY7jq4AeKj99FzCSsiy1M5y9q6r0cEf1yqEZuIxI/256fx192f', rarity: 'milspec' },
        { name: 'Dual Berettas | Dezastre', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhH_WfB3OV0tFytftoXD2hkCIrujqNjsH4c3qeOgR2XpJzFOcD4BK_m4HmN7mx5wGIjthDxHn23yhLv31u6u4HT-N7rWmjRO8T/256fx192f', rarity: 'restricted' },
        { name: 'Dual Berettas | Balance', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhH_WfB3OV0tFkv_JscCW6khUz_W2Dyon_dimePA8lWJclQrMJthm-kYW2NbzrtQ3eioJCnyWo33wa7Hl1o7FV2r7YJY0/256fx192f', rarity: 'milspec' },
        { name: 'Dual Berettas | Cobra Strike', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhIvWBC3OEwP1Js-5rXSiMmRQguynLydn9JXmUOwMgCsN1EbMPsRHtxoDuZrzm4VTait4Tzn_-jn4f7ipu4fFCD_Qo-zseRg/256fx192f', rarity: 'classified' },
        { name: 'Dual Berettas | Ventilators', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhIvWBC3OEwP1JpuRnWyC_lAkooS66lob-KT-JblNxDcMiQe8M5hDtxtfnNrvrswyLjdgWzCyvhytP7ilqt7pXBfdz-rqX0V-MxKZG7g/256fx192f', rarity: 'milspec' },
        { name: 'Dual Berettas | Duelist', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2jZ7BlJeKsAWGv0et3ou1WSiW6gRgYvzSCkpu3dn-RaFdzDZV4F-RZtxW7w9fgM--x5geNjooUyH3-iS5K53pq47wLUr1lpPNOmOBZwg/256fx192f', rarity: 'restricted' },
        { name: 'Dual Berettas | Pyre', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1T9s2pbah9Jf6sCmaCytF6ueZhW2fhzU8l4G3dyYr4d3jCPAd1AsdwQ-QD5hS7x9XlZOi35wGM2IMWzX2vkGoXuX-7oZQZ/256fx192f', rarity: 'industrial' },
        { name: 'Dual Berettas | Marina', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1T9s2jabZkLvGsHXKe0-dltd5lRi67gVN34DuDyoytIH3EPwYnDMYjROde4RC9lIDnZO_i51TejdoRxSWrhn9B8G81tGB0zZHS/256fx192f', rarity: 'restricted' },
        { name: 'Dual Berettas | Switch Board', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1T9s2gfalvJeKAMWCCxOt4j-1gSCGn20104juHydqtcnLBblAiWMdxQrUKsEG-wd3iPrmx5gGNiNgXznqtiCNXrnE8feK4iuw/256fx192f', rarity: 'industrial' },
        { name: 'Dual Berettas | Briar', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1T9s24YapoM8-fB2CY1aAn4rlsTnzhxxhx5TuHwt76cXuXbVApApV0TLJctxm9kd3vZL-35wTWlcsbmthIan4W/256fx192f', rarity: 'consumer' },
        { name: 'Dual Berettas | Moon in Libra', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1T9s20Z6BkIfPCMWuZxuZi_rFtFnC1zB9-tW_cz9z6dnvEbw4jD5MiRbMDs0Xqm9G1Ybvgs1bc3oJbjXKpy-pewO4/256fx192f', rarity: 'consumer' },
        { name: 'Dual Berettas | Panther', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I4M2-aap5KPWBMWuZxuZi_uA4Si-3kRx-sDzUn4r_cnPGa1AiApJwReRc4RXrwIHjMLu25AGP2otbjXKpeGQaAco/256fx192f', rarity: 'milspec' },
        { name: 'Dual Berettas | Contractor', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I4M2-ZadSLPmUBnPekb8g5LI8Hyi2l01z42Tdmdj9cXiRaA4jXJp4E7YJ4Ra8lILmP-7itBue1dzkV1WWjA/256fx192f', rarity: 'consumer' },
        { name: 'Dual Berettas | Colony', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I4M29eKVuJc-eD3WZz-tJvOhuRz39wRx2smzVyIqtJ3OQaARzDschFO5esxm5mtHiM-7l5wCN3ohBxSz63zQJsHg_UethgQ/256fx192f', rarity: 'consumer' },
        { name: 'Dual Berettas | Demolition', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I4M26aapqJeKaAGKvzOtyufRkASrhkEV-sWXRy4qudH-XbAJ1WZF1E7EDt0G8k4e2M-_q5FOLi4NHzX7gznQeYfmGzpI/256fx192f', rarity: 'restricted' },
        { name: 'Dual Berettas | BorDeux', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I4PGmV6VuMumfB2Svxvx_oPJWQyC0nQlp4TnXyImgd3mXbAAjXpZ4FORZuxawm4XhNOKxtQ3ciYJBxSj-jHwcujErvbh_J5_kxQ/256fx192f', rarity: 'consumer' },
        { name: 'Dual Berettas | Polished Malachite', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I4PGmV6lsMvKfC1iX0-dmo95lRi67gVN_5GWHz46sInLGPwAmX8F2E7MNsxPsld21Zerr5AyI34hCzHqrjShB8G81tPVumS8Z/256fx192f', rarity: 'industrial' },
        { name: 'Dual Berettas | Silver Pour', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I4PeRaad_OfyaDViWzeFh495lRi67gVN3tmnTn4yreXvFZgYjD8QlE-QK4EGxkda0Ze20tQbZ2Y9CyS_5iC1K8G81tJXDIHOE/256fx192f', rarity: 'consumer' },
        { name: 'Dual Berettas | Rose Nacre', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I4P2Reqt-Jc-UAWuU_uJ_t-l9AXuxlkl_5j_TyN2qc3-SaQd0C5d3FOQCsBfqlYWxYey34FeLjoJNny_gznQe5VNQ57w/256fx192f', rarity: 'industrial' },
        { name: 'Dual Berettas | Drift Wood', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I_82qer1SN_-cClicyOl-pK87GXGwlkxx5TnRnon4IHvCPAIiW8dxQ7Nc50K6l4XhY-m04QLdjo9N02yg2cWHvD9Z/256fx192f', rarity: 'industrial' },
        { name: 'Dual Berettas | Shred', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I_82rZK15JeOsGW6e1etkj_NoRi22hyIrujqNjsGrJ3rGbQAgDsEhE-YJ5he7w9TgZOnrtgWI2oNNxCv6hixP7SZitrpRT-N7rUuDq4Qp/256fx192f', rarity: 'milspec' },
        { name: 'Dual Berettas | Oil Change', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I_82rZqNkLvWsCm6C1fdJvOhuRz39x0txtzuHn9j_cn6VbVMiCpJ4Q-MCuhDukYXnN-7q4wTbjIlGzij9jzQJsHgVbYzf3Q/256fx192f', rarity: 'consumer' },
        { name: 'Five-SeveN | Berries And Cherries', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRaaVSJvGXC1iCxOpJsu18Sha_nBovp3OEmY2vIi_FagEoDMMjQuMKthDqm9TjP-O3sVSLio0Qnnr22i0f7C9t_a9cBnO-dw69/256fx192f', rarity: 'restricted' },
        { name: 'Five-SeveN | Copper Galaxy', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRaalSI_-DHmKC_uh6teJiXBa_nBovp3OAnN_6cXvEOwFzDcFzQ7Vc4BPuwNy0M7jk5gWL39pCnC35jShN6S1p_a9cBt8cUyQh/256fx192f', rarity: 'restricted' },
        { name: 'Five-SeveN | Silver Quartz', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRaalSI-KKHXORzeJ_quRtcDq6mQsioQKJk4jxNWXCP1AmX8Z0EbIP5Be8w4fhNu7r5ATZ3t4Xzn782yJB63o-5bkLA_En5OSJ2KaCxRX6/256fx192f', rarity: 'milspec' },
        { name: 'Five-SeveN | Anodized Gunmetal', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRaapSJ-WdA2KEwOJJsvNoWSaMmRQguynLy9v_J3qTPAYmX8Z5F-YCskG5xtHgNe22sgTYjIIXmSX5jX5L6Ck-t_FCD_SvybkrEQ/256fx192f', rarity: 'consumer' },
        { name: 'Five-SeveN | Fowl Play', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRabVSdaesCGKR1eZzovJWQyC0nQlptm_Vw9ercnOUaA8lA5skFuIPsxPqmtXkNu205lfYiN8XnCyvj3hNvDErvbiIo1idJQ/256fx192f', rarity: 'classified' },
        { name: 'Five-SeveN | Heat Treated', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRabVSI_GAC1iYwPxyte9sSxa1nAsioDiTn4HGLSLANkI-D5pxEbIDu0btkoXlNuO24wDZ2YhDmH7923tI7ClrsblWAqMj-KPRiBaBb-NawNZy0w/256fx192f', rarity: 'restricted' },
        { name: 'Five-SeveN | Scumbria', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRabVSJvmFC1iDxPhzvt56TDy-lw8usgKJk4jxNWXBP1JzAppxQ-UN5hm_mtLgZbjn5wPdi49Bnyqr3SJPvChq4-tWB6Ak5OSJ2BFWlPNZ/256fx192f', rarity: 'milspec' },
        { name: 'Five-SeveN | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRabVSL_mfC2OvzedxuPUnH3C1kRsi4jiAw4qtdXjCO1V2WcZxF-EO5xLsxtHmMeKw5g3fit4TnDK-0H1W4XC76Q/256fx192f', rarity: 'restricted' },
        { name: 'Five-SeveN | Angry Mob', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC1iDxPhzvt5oQS6hjCIrujqNjsH_cy2RagUjA8BwR-de5hjskNflNrnqsgaLiYgRyyythitM7Hw-sekKT-N7rXEld5dH/256fx192f', rarity: 'covert' },
        { name: 'Five-SeveN | Violent Daimyo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC1iDxPhzvt5tTiC-jBIYvzSCkpu3cXjCPAB2WZMmQ-EK4BTqlNSzNOLk71GI3tpGmX2oii5N6nk667kDWL1lpPNv4wCTtw/256fx192f', rarity: 'milspec' },
        { name: 'Five-SeveN | Fairy Tale', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC1iDxPhzvt5tRiihjCIrujqNjsGtdi-UbVUgXJAlRrFfuxi-lNbuPr7ltA3cjtkRzyit2H8c7H1t4O9TT-N7rZbBTJfn/256fx192f', rarity: 'classified' },
        { name: 'Five-SeveN | Scrawl', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-BlXyGyqhIqtjqEpYPwJiPTcAInA5J0FO9csBSww4bhZruzswLcjIsXmCusjCsbuno_57tXUqB386HJz1aW2pI_m5Q/256fx192f', rarity: 'milspec' },
        { name: 'Five-SeveN | Triumvirate', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-B8SCS2mwkitwKJk4jxNWWXPAZzD5pwTeBetUPtw4C1N7jh5A3bj48RxSyqiiwc7Sg6tr0ABaAk5OSJ2O3yTJMF/256fx192f', rarity: 'restricted' },
        { name: 'Five-SeveN | Monkey Business', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-NoQSi9lCIrujqNjsGheXmXPQcoWMFzEO5ZtUOwkILjY7yzsg3ci91DySiohn4buCht4eYET-N7rZVO80Su/256fx192f', rarity: 'classified' },
        { name: 'Five-SeveN | Buddy', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-Z6SHCMmRQguynLw4r9IHiRbFdzA8FzELYL4xntw9e1Mu7q5laMjN5AzXiqinxI6iw_t_FCD_TZbg2oLg/256fx192f', rarity: 'restricted' },
        { name: 'Five-SeveN | Hyper Beast', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-lwXyyhlxgmoCm6lob-KT-JO1QgWZVyELEPu0W4l9KzYbzn5Fbf3YkTzn_8hihIvXxtsOoFUKYirLqX0V_f6-eqCw/256fx192f', rarity: 'covert' },
        { name: 'Five-SeveN | Retrobution', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j_NsWzu8lwgzujKLpYPwJiPTcAByWJB4TOULsxS5wNfmPuzjtQHciYpHmCuqhypJvSlr4LsGBaEmr_bJz1aWW-JyGhc/256fx192f', rarity: 'restricted' },
        { name: 'Five-SeveN | Urban Hazard', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j_R7TSi9qhUmqTyXnrD1KCzPKhhzXpBwFu9YtxK6k4buYenrtgDWj4NGyX3-2yhBun1qt-YBBKsg_aXWkUifZnLiQ4dl/256fx192f', rarity: 'milspec' },
        { name: 'Five-SeveN | Capillary', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j_dsRieMmRQguynLmY79IinFbA90CZN2Q-Bc4UW6x9KyZLnjtQCMjo8WyXr7jy1O6Ck_sfFCD_SqR6qLvA/256fx192f', rarity: 'milspec' },
        { name: 'Five-SeveN | Fall Hazard', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSNvWBGm6XztFwufdsXCylkBMYvzSCkpu3Ii-QbQ51XJpzQ-8PsUOwmoLvZLm3sQfb3tkTxHj-hytBv35jt7wFBL1lpPNwauo7lw/256fx192f', rarity: 'classified' },
        { name: 'Five-SeveN | Hybrid', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRbq17JeOWGGKe_uZvsvNgSxa_nBovp3OBmd6oJXyeaQ9yCsZxEOICsUO7kdK0Y-qxtFCN2YsQnCv7i39N7ixp_a9cBsh2vVQD/256fx192f', rarity: 'restricted' },
        { name: 'Five-SeveN | Dark Polymer', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRbq17JeOWGGKe_v55vPhkSjuMkRw1uAKJk4jxNWWVaw9yAsF3R-cItkTqx9HiY-23tFeN3oNFyS_9jn4a5i5o5b0AB6B35OSJ2MsRWanJ/256fx192f', rarity: 'milspec' },
        { name: 'Five-SeveN | Boost Protocol', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRb7dSJvmFC1iDxPhzvt5sSTygnBIpjDGMnYftby7FalV1D5QhE-EDthW8xtCyPu63tFPciYhBynn_jykfuCttte4CA6E7uvqAn_5lxU8/256fx192f', rarity: 'restricted' },
        { name: 'Five-SeveN | Flame Test', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRb7dSJvmFC3SV1-t4j-lmWxahmhkYpTSKlortHifOOV5kFJt1FOVYsBC_lobmNe3q4AOK3dhDnimrhyoa7i9ssO4CU6F0rvWBiwvfcepqcNk1MwM/256fx192f', rarity: 'milspec' },
        { name: 'Five-SeveN | Crimson Blossom', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRYL1SIuWXMXWVxdF6ueZhW2ewkE5162rRnNerIy6WagApDptyRuVZshbql9DuMOPj71CI2YoRzyqokGoXufqVyZvA/256fx192f', rarity: 'milspec' },
        { name: 'Five-SeveN | Coolant', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRYL1SJOWQGnSvxvxzte9WQyC0nQlp5m_cmNqueH7EbQAiXpN0FO5YtBK_x4XgMrjmswON2osQzn77iipJ6zErvbgVYFr6QQ/256fx192f', rarity: 'consumer' },
        { name: 'Five-SeveN | Nightshade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRYL1SJvycGWKC0tF6ueZhW2frl08m5mrXyd-seSmVOgUkX5MhReRcsRHsm9LjZe_htACI3oJEzHj6kGoXucu6NwSL/256fx192f', rarity: 'milspec' },
        { name: 'Five-SeveN | Forest Night', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRYL1SJv-BC3SE_uB_t-l9cCW6khUz_T7Untv9cXmfPAEnCZFwRLUJtEXtxN3iN-mz7gffjtkRnir-2nkauyx1o7FVpfrK-Xo/256fx192f', rarity: 'consumer' },
        { name: 'Five-SeveN | Kami', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRYL1SK_GeB1icyOl-pK9oGnHnk012sT_XzNv4eXuUawUlDpEkQOIN40XskIHmP-mx4wOLio1B02yg2SJzf1Vk/256fx192f', rarity: 'milspec' },
        { name: 'Five-SeveN | Neon Kimono', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRYL1SK_meAWmf_up_sexmQS2gqhEutDWR1In4di-TagIkXMMiF-Vcthm5kNbvML604Ffdgt4WzCj22ikau35q4OwcEf1ySWJgvKc/256fx192f', rarity: 'restricted' },
        { name: 'Five-SeveN | Midnight Paintover', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRYL1SL-aWHHeR0v1JoOBgQT28gxg1jCmAm4PGLSLANkI-X5YmF-QN4EK8wdXgNenrsgDejYNAmS33jHtB6Ctj5esBBKItqKXQhhaBb-MJGErI3w/256fx192f', rarity: 'industrial' },
        { name: 'Five-SeveN | Hot Shot', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRe6tSJ-KWF1ie1O16teB7cCahlBMgtgKDk5n8HjjCKFN-Zc4pEr9OrBm4xN3vNrix41aIjtkQyH-s2ipMvSY_sOxRBaFx-vCE3AuXYLE_45kdZKHwQRxY8PU/256fx192f', rarity: 'industrial' },
        { name: 'Five-SeveN | Jungle', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRe6tSKuWdCWuV_uJ_t-l9AXy3wEok5G6Gw9uocnKfbQRzXpJzQ-Ne4BLsm9LnNrzk7wWKiIxNxSngznQeNadjO4s/256fx192f', rarity: 'consumer' },
        { name: 'Five-SeveN | Nitro', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRe6tSL-KSAGCV_u91s-RnWzqMmRQguynLy9ugci3EZlUpDMYjTOID4EPrxNTvZO224QWM3o9NniWs23lP5nw9tfFCD_Qs49oXvw/256fx192f', rarity: 'milspec' },
        { name: 'Five-SeveN | Contractor', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRe6tSMP2QMWuZxuZi_rRtTXjkxE115DjdmNn7ciieaVAkAsN4ELVc40Htx4fmPrng51DXj95bjXKpZ_EmD5Y/256fx192f', rarity: 'consumer' },
        { name: 'Five-SeveN | Candy Apple', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRe6tSMvWXMWuZxuZi_rAwG36xxUp-t2rVwt6vdCmSPAQnDpNxQOBY5BXsxoWzZuvg5Ffdid1bjXKptD9kyfI/256fx192f', rarity: 'industrial' },
        { name: 'Five-SeveN | Sky Blue', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRe6toH_KfG2KvwOByj-JhXSa-kCIrujqNjsGueHuXb1VxDZRzFuJe5BC4w4XnYbnj5A2NjIMUyyr3iikY6Cc4tecBT-N7rc172J_D/256fx192f', rarity: 'industrial' },
        { name: 'Five-SeveN | Fraise Crane', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRe6toH-CaAGyvwvx3vuR6cCW6khUz_WmHno2ueSmRbFAmC8MjF7EPsBDtwdDkZe_n41fYithDzyWo2CwY6nx1o7FVHGyLYB0/256fx192f', rarity: 'milspec' },
        { name: 'Five-SeveN | Autumn Thicket', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRe6tiH_KBD2mTyetlj-1gSCGn2xsl5Tvdm9itJy_DaFUoDJYhRuVZsBm9lobiNeiz71HcgoNGyHr4jypXrnE8g0nYtGk/256fx192f', rarity: 'consumer' },
        { name: 'Five-SeveN | Withered Vine', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRe7RSLf-BAViExPZiue1scDmmhw0rtgKcn4P1Ljz4Ml93UtZuReJcshe5m9HuYunhsQ3dgowWnCqviSgduC1q5OgGBKN0r6Le2gnHZKp9v8fcyxvZMw/256fx192f', rarity: 'industrial' },
        { name: 'Five-SeveN | Orange Peel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRe7RSNPGDC1if0-94t-RWQyC0nQlp6jjTytf7JH6XbQIiD5t2EOZYsBDtl4LjNe7k4QzYidlEzX34hn8Y7zErvbi46hZUEA/256fx192f', rarity: 'industrial' },
        { name: 'Glock-18 | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a7s2oaaBoH_yaCW-Ej-8u5bZvHnq1w0Vz62TUzNj4eCiVblMmXMAkROJeskLpkdXjMrzksVTAy9US8PY25So/256fx192f', rarity: 'restricted' },
        { name: 'Glock-18 | Moonrise', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a7s2pZKtuK8_CVliF0-x3vt5kQCa9qhsipTiXpYPwJiPTcANzXJNyFOEMthXsktHhMLzl4FaK3toWn3iqhi9BvHw9su5UU6Zw-_bJz1aWcX-Jd_0/256fx192f', rarity: 'restricted' },
        { name: 'Glock-18 | High Beam', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a7s24bbZ5KfecMWWc1OtJvOhuRz39zU5yt2vQntn9dC3Dbw8iDJQhF-IJ5xDqkdSxMr6251aMiI5BynqtiTQJsHhqpMNExQ/256fx192f', rarity: 'industrial' },
        { name: 'Glock-18 | Twilight Galaxy', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2vebFsH_afC2Sb0tF6ueZhW2e3zR9-5mjcztv8cnjBbQMiA8ZzFLUKtBbsl4LuY77q4AHdj4pNmCz-kGoXudhVSAZp/256fx192f', rarity: 'classified' },
        { name: 'Glock-18 | Steel Disruption', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2qbLRsNPSWAHSV_v1_vPdsXRa_nBovp3PWmYuhdnyebAdyWJUjE7ResBC6xoXhZe_j7w3Zid1Aziio3SlI5iw__a9cBqG4HP4O/256fx192f', rarity: 'restricted' },
        { name: 'Glock-18 | Dragon Tattoo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2qeqVqL_6sCWufwuVJvOhuRz39xUl-6miDzI37dHyXOlIkA8MmROVfshO9w9G1Ye-ztgPX34tEyi74jjQJsHi_DRfxVg/256fx192f', rarity: 'restricted' },
        { name: 'Glock-18 | Gamma Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2rZaF_IfyXMWqR0-x6tehzSi2MkhEosDa6lob-KT-JPwZzA5J4F-8Mt0a-ktTvNeyws1PfjIsQyiX9h3gYvSpr5bwFWash-7qX0V9IgS2WPw/256fx192f', rarity: 'covert' },
        { name: 'Glock-18 | Reactor', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2gfadhJfGBMXeR1fpzou84cC6_mh4sjDGMnYftb3yTbAQjA5NxR-4MtRjumtzkM-yzsVDegtkWyyX43ytBvC9tsrpRAKE7uvqAUKOQcp4/256fx192f', rarity: 'milspec' },
        { name: 'Glock-18 | Nuclear Garden', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2gfadhJfGBMXSb1OJ6o95uXSy2myIrujqNjsGpd3LCagQiWJVzEOdfu0PrkYe1MLnqtQzW34xDmH2oiiIc7i5p4u5RT-N7rQEHvAcX/256fx192f', rarity: 'restricted' },
        { name: 'Glock-18 | Brass', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a_s2seqV-M8-fB2CY1aAu5-c_HirjzExxtTnSntb_JSnBaVIpCJojFLUMs0GwwIDjMeOztVeIlcsbmrw2c4EA/256fx192f', rarity: 'restricted' },
        { name: 'Glock-18 | Bunsen Burner', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a_s2pZKtuK6HLMWGcwONzo95rQzy2qhEutDWR1Nb7IC-TOw4hCZF5FOJe40W5lILlZLvktAHXiIJMyST_3XlIv3k94escEf1yWue1sjU/256fx192f', rarity: 'milspec' },
        { name: 'Glock-18 | Grinder', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a_s2pZKtuK8-QAW6cxOpJvOhuRz39w00lsG-BnNj7cniROgd1WZRzReIDsBewk9G0YeOw5gWPi40Xnnr4hzQJsHiNyVoujA/256fx192f', rarity: 'restricted' },
        { name: 'Glock-18 | Ironwork', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a_s2pZKtuK8-XD3WbjOh3vO1WQyC0nQlp5jmEmNaodH6VbwMnApshEOcPskOww4e0N-qz5lPZ2YlGyCSviika6zErvbhhWFzqpw/256fx192f', rarity: 'milspec' },
        { name: 'Glock-18 | Water Elemental', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK72fB3aFxP11te99cCW6khUz_TjVyompc3-QOFR2DJQkFOMJtBbqk9LlY-7n5QLZjtkTxCWqhixPv311o7FVIf8eASQ/256fx192f', rarity: 'classified' },
        { name: 'Glock-18 | Oxide Blaze', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK6HLMWSf0_x5tORncCW6khUz_T_Xn9f6dnvDb1UkDsdwF7IItES6kYK1M-7k7wSI3YwQm3_63XlAvH51o7FVwJirs7M/256fx192f', rarity: 'milspec' },
        { name: 'Glock-18 | Bullet Queen', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK6HLMXCR0-N3ueVsQRa_nBovp3PQydf4dXuSalUgCJZwRrILthi9kYDlMe_m4g2Ij90Um3moiXkc6SZj_a9cBgLxwlYC/256fx192f', rarity: 'covert' },
        { name: 'Glock-18 | Weasel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK6HLMXCVwP1zvN5lRi67gVN_4j7Qzdj8dimQblQkX8YkTeNe5Bmxkd2zNr_j5QbdjthCzX-qjylI8G81tDMJpR5Y/256fx192f', rarity: 'restricted' },
        { name: 'Glock-18 | Catacombs', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-XC2aEyfp5vO1WQyC0nQlptWWDzIz8dy6QalMgXsMiQbEJtRjskdW2M7nn71Dcj49Fm3qsiClB7jErvbhnnfwjgw/256fx192f', rarity: 'milspec' },
        { name: 'Glock-18 | Vogue', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-WF2KTzuBiseJ9cCW6khUz_T-GyNavdCqRawN1CMFwTOcO5hO7loXiY-zmsQKPi44QzHj22ikcvy11o7FVfFOBmfY/256fx192f', rarity: 'classified' },
        { name: 'Glock-18 | Sacrifice', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-bC3Wf_uJ_t-l9AXHixRlytW7Ty4queH_DZlMlX5UjF-dZsUPqk9LhY-Lk5waMjdlCmSzgznQeEFBQhB0/256fx192f', rarity: 'milspec' },
        { name: 'Glock-18 | Off World', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-aAGOZxuFJvOhuRz39xRly4WSDm4z9dHvCOg8iC5pxQrZethbsk4C1MbnnsQTag4pFyy_9hzQJsHjSW_TM0g/256fx192f', rarity: 'milspec' },
        { name: 'Glock-18 | Umbral Rabbit', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-eAWie_vx3suNgWxa_nBovp3PXyo76Ii_FPAQmDMYiTLYDthm_kdbmZry2slCLjoMQzC7_3y1J7nts_a9cBi_qumx0/256fx192f', rarity: 'restricted' },
        { name: 'Glock-18 | Neo-Noir', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-dAW6C_uJ_t-l9AXznwh9zsjjSn9j9dH-eb1V0CsF3QrNZ4xW8ltPlM-7h4QbYit5NzyzgznQecekkTuo/256fx192f', rarity: 'covert' },
        { name: 'Glock-18 | Ramese\'s Reach', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-BD2qKxP1JvOhuRz39kUkk42TcztmuIHOVb1cpCcZ1EeBY5BLtkIDgNOqwtALXjI0Un3r4jDQJsHidobtL7w/256fx192f', rarity: 'restricted' },
        { name: 'Glock-18 | Snack Attack', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-AAGaTyu9ipOBqRBa_nBovp3PQyomrcHKSaQYkCcRwQe8LukHswYHhN-Kz7lOM3YoUni6tjn5K7C5u_a9cBhxPlKk2/256fx192f', rarity: 'classified' },
        { name: 'Glock-18 | Wasteland Rebel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-ED3SExOJ3vuVWXSyxkBEYvzSCkpu3Iy7GPFUnC5t3EO4I4Bm6w4DmNu3k4lCN3YNNniz23HsY6Xxv5rwCU71lpPMpvj9PCw/256fx192f', rarity: 'covert' },
        { name: 'Glock-18 | Franklin', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2jZ6poOc-UAmiTytF6ueZhW2eww0wmtz6Hz92hd3iUPwIhWZtzQ7UP5ha7kd22N-7j4gTZ345BnH_5kGoXuXiKVoel/256fx192f', rarity: 'restricted' },
        { name: 'Glock-18 | Block-18', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5tvMvmQBVidzuByouhoQRa_nBovp3PXzov9cyjDbwckXMMkF7IIthOwwNDmY-rq4AzfjItMyH_9iC0YuC04_a9cBk5_kH3q/256fx192f', rarity: 'restricted' },
        { name: 'Glock-18 | Gold Toof', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5tuKP-eHmKC_uJ_t-l9ASvik00m5TmEzd-geSiQPARxX5IiTLIMtBW4l9zmNuPr4VbbjItHxC_gznQeqLQCTjk/256fx192f', rarity: 'covert' },
        { name: 'Glock-18 | Fully Tuned', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5tnJOCWC2yvzedxuPUnS3HqzR9152_UyNigeSqWa1BxW8ElRLJfshfpkNHuZO_n4ADd2IxBxDK-0H3ID5Y8zA/256fx192f', rarity: 'covert' },
        { name: 'Glock-18 | Mirror Mosaic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5tgKeKBAXWvzO9std5_HRajkBw1vwKJk4jxNWXFP1UhDsYkRbUMsxC6lNSzNO7lsQaK2dpCyH2rjS5J5i054exUVqQi5OSJ2C0RseXl/256fx192f', rarity: 'classified' },
        { name: 'Glock-18 | Shinobu', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5t-KPmdAWWF_uJ_t-l9AX6ylh5w4mTcwtahdS2VOgRzWJsjEOQL5EWxwNblZeK2tVPXitlDmyvgznQeC7fvQL8/256fx192f', rarity: 'classified' },
        { name: 'Glock-18 | Green Line', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5t5MvGaAFiX0-tzvt5lRi67gVNw5TjSy4mseXqXagEpW8FyQu5cu0Hpw4ayNLjntFeNgoJEnyWqjCNN8G81tF3dwatE/256fx192f', rarity: 'milspec' },
        { name: 'Glock-18 | Royal Legion', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK6HLMWaHwPxyj-1gSCGn20gksm_Uyo7_JSmeOARyXsEhFLQMsUW_wIXuP-rj71CIiotAzCqoinhXrnE8DvG09t0/256fx192f', rarity: 'restricted' },
        { name: 'Glock-18 | Wraiths', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK6HLMXCCwPp-qfJWQyC0nQlp4T_Xnoz8dCmfZlUgXsd5RbMC40WxkdXnP7nl4wHXi9oUyH_9jilIuzErvbjBKaM58A/256fx192f', rarity: 'milspec' },
        { name: 'Glock-18 | Winterized', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK8-WAm6ExNF1sexmcCW6khUz_W6Azdn6eCrBalcjXJpzE7EO5xa_l4DuNu6ws1Hb2IgUn32si39B5y11o7FVC5qcAFg/256fx192f', rarity: 'milspec' },
        { name: 'Glock-18 | Clear Polymer', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK8-DAWuJzOtkj-1gSCGn200h4TnQwtqoci_CPQYlDsAiRuZc5hK7kd2zZbm37lGK2o5HnH2v2ixXrnE85Jt4rDY/256fx192f', rarity: 'milspec' },
        { name: 'Glock-18 | Warhawk', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK8-HBnKexetkj-V8XD2MmRQguynLwo34eXjBbgQnCMB1Q-QN5EXrkdfkNu7m5Ffd2YoTzyr52H5B7nk-5PFCD_Q2xs5K0Q/256fx192f', rarity: 'milspec' },
        { name: 'Glock-18 | AXIA', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_PGmV6V1KfGsCWufwuVJvOhuRz39lh93sDmDytj6InjCaQ52ApF1EeIMuxC9wNPmNe3k7wLfjIJGm32o2zQJsHgd3ZW3tg/256fx192f', rarity: 'classified' },
        { name: 'Glock-18 | Trace Lock', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1T-825YK15Jc-WCmCV0tF6ueZhW2fiw0Ujt2yGy4ysIHzEaQUlWJJyE-dbsBK5x4XjM7ix7gDeiYkUmy6okGoXubB2-hmv/256fx192f', rarity: 'restricted' },
        { name: 'Glock-18 | Blue Fissure', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1T9s2teqV8NfWfG3WV_uJ_t-l9ASzixkp15W2Bntn4cnPGaFMkC8R1EeIL5hKxl9a0ZOLntQbd2IhBnijgznQeP57NAAc/256fx192f', rarity: 'milspec' },
        { name: 'Glock-18 | Pink DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1T9s2qbLRsNM-DB2mb_uJ_t-l9ASi2lBgjsmjSm4ugeX6WO1AoCsElFuEIuhC6xta2Zbmw5gCMjtlAni3gznQeU26CORw/256fx192f', rarity: 'restricted' },
        { name: 'Glock-18 | Synth Leaf', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1T9s2ibaVrH_KfG2KvzedxuPUnGnuywx4h52nQzomsInmVbw8mCZAhR-UP4BHpldXhZevn7wXc2dkUnjK-0H1CafWWiA/256fx192f', rarity: 'restricted' },
        { name: 'Glock-18 | Death Rattle', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1T9s2gbbZiJPmSMWuZxuZi_rc8Hny3zBsm5GuDnNeoeS3Da1cgWcRwFLQL5hbux4biZenm4gXbjY5bjXKpYXhaJyA/256fx192f', rarity: 'industrial' },
        { name: 'Glock-18 | Teal Graf', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1T9s2hfqF_MPGAHViEwOlxteVWWyyymSIrujqNjsGueXyfaVN0X5N5Ru4O5he_k9XkM-7ltlPe2YJExX2tiXlN5yo6474LT-N7rZcNkc7T/256fx192f', rarity: 'milspec' },
        { name: 'Glock-18 | Ocean Topo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1T9veRfKt9L8-fB2CY1aAj57loSirrwEpy4mjSztyqdiiQbFRyCcd2RLFetEG5wdbuMbu35Azflcsbmny2FqpB/256fx192f', rarity: 'industrial' },
        { name: 'Glock-18 | Night', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1I4M2gYaNlNM-fB2CY1aAmtOU-S33jwEwhtWvdzIr4cHvCPwR1DZdxQrFZt0bsloLjP7jg4VGMlcsbmvNarNNc/256fx192f', rarity: 'industrial' },
        { name: 'Glock-18 | Groundwater', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1I4M2hZK17Jc-fB2CY1aBzseQ4GXG1lEwk4mWHmd39dC7BOwImD8F2QedeshjrkYKyML-z4Q3flcsbmqxtqryL/256fx192f', rarity: 'industrial' },
        { name: 'Glock-18 | Candy Apple', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1I4M28baBSLPmUBnPelb93teA-FivjzB5wsjzTyI2pIn_CPAMoW8N3ROJZshm5w9zgNbnk5xue1dyMA9ZU_Q/256fx192f', rarity: 'milspec' },
        { name: 'Glock-18 | Sand Dune', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1I4M29aappH_KBD3Gf_uJ_t-l9AS_gwE4i4GTdyIn6IinEalUhC5t5FOMN5BK7xobiPung7wbWiolNzS_gznQeDKgSRyc/256fx192f', rarity: 'industrial' },
        { name: 'Glock-18 | Coral Bloom', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1I4PeReqt-JeOsAm6Xyfo45edtFiyywExztjjdzNegIHuRaVImDpZ3RuJcshDpxtLhNOKw7gbci5UFk3s8sl0gEQ/256fx192f', rarity: 'milspec' },
        { name: 'Glock-18 | Red Tire', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1I_826YbZoH-SBC2aU_vxztN5lRi67gVN15WzSmY36cn6RagEnD8MjTbIJ50W5m9OyN-rmtQGIgo9Fnimrhngd8G81tCm_mA6x/256fx192f', rarity: 'industrial' },
        { name: 'Glock-18 | Glockingbird', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1I__eRZa1-M_mfC1icyOl-pK89GCy3xUh-sW3Vntn_eHOTPw9xA5R2F-Fb4EG4k9LiNu2x7leNiY8W02yg2c2Pc93z/256fx192f', rarity: 'restricted' },
        { name: 'P2000 | Amber Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0POvV6JsJPWsA2KEwOJ6ueJWQyC0nQlpsjvcmd_7dHyVZgdxAsB1QeRZ5BPqlYbmNuvr5lTW2o1Myyyt3ykY7DErvbib25P3aA/256fx192f', rarity: 'restricted' },
        { name: 'P2000 | Space Race', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0POvV7d9IfOWHGaTxNF5ouBnSCyMmRQguynLzNirI32Ua1dzDpVzQLMKtUGww4LhMejh4FTY34wWyyv-3ylO7S5i4vFCD_Qear_SSQ/256fx192f', rarity: 'restricted' },
        { name: 'P2000 | Panther Camo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0POjV6ZhIfOYMXeRz_p-tfNWQyC0nQlp522Hm9ivdHjEOg4jC5t3TeAJ5xCwlYHlMuzmsQGIj99BzST9h39K6zErvbhYhH-Bzg/256fx192f', rarity: 'industrial' },
        { name: 'P2000 | Chainmail', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0POjV6dlIfmdA2aZzdF6ueZhW2fqxU4k6znTn434JHnEPA9yWcR2TLIJ4UK4w9e2Nbjr4QbX2owXnyr7kGoXuSuECNR4/256fx192f', rarity: 'milspec' },
        { name: 'P2000 | Dispatch', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0POjV6p4LfKWHHSv0-tyj-NlWiyMmRQguynLm4mscyqXOAJ1DpAjQuML5BDpxN22NuPgsVeN3YpCn3mr3ypB7S455_FCD_SVmRFKPQ/256fx192f', rarity: 'milspec' },
        { name: 'P2000 | Ocean Foam', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0POjV6t-M_mVF1iSzftzj_E7H3njqh81siuKpYPwJiPTcA91W5N0EOMNskGwkt3gP-vh41GNiNpDn3r83ShL6itj4bsKA6Im-_XJz1aWVAZrXOc/256fx192f', rarity: 'classified' },
        { name: 'P2000 | Imperial', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0POjV7Q_cKDDMW6d0etkueBlcDu2kSIrujqNjsGrJH6XPQ9xAsZ5FLIDtBG5mtfhY7nl4gGNiosTzH792ntOvC1stbsDT-N7ra_mVv2F/256fx192f', rarity: 'milspec' },
        { name: 'P2000 | Scorpion', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0POjV7duL-KDB2ie_v4k4LE5cCW6khUz_T-GmNyuc3uTbgZ1CcNzR-8DtkS6wYLvMLzj7wHaid5DnHmthiJK5n51o7FVTAH3Dhg/256fx192f', rarity: 'restricted' },
        { name: 'P2000 | Silver', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0POgV7dkLOaWHFicyOl-pK8_Tn_nx00i6jjXnt-vJyqSaQdzDsYlFrED40W-x9bgYb6z41PY3Y9A02yg2X8l3LyC/256fx192f', rarity: 'milspec' },
        { name: 'P2000 | Acid Etched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PO_V7Q_cKDDMWaTyOpJs-1mWSyhqhEutDWR1NmhJH6VZ1BzCZtzTeQKuxe_x4fuYenj4Q3bgtkXyHn-iC5MvC864OccEf1ypheGRTI/256fx192f', rarity: 'restricted' },
        { name: 'P2000 | Handgun', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PO_V7Q_cKDDMWWfzuNJvOhuRz39xE53sWncnN2vcnKeaQAlA5cjRuUL4RTqxN3nP-ix4QCLjIIQyHn2iTQJsHgxqMM--w/256fx192f', rarity: 'restricted' },
        { name: 'P2000 | Gnarled', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PO_V7Q_cKDDMWuf0vpJp-57Qy2MmRQguynLyt38dXjDaA5zC5YlQ-Nc5BG5k93mP-jhsVeKiY8XmSr5iy5J7C1s6_FCD_TbNBDIDw/256fx192f', rarity: 'milspec' },
        { name: 'P2000 | Corticera', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V6JsNvWfD1iAk74m4N5lRi67gVNzt2TTyo6gdH6XPwEiCcZ2RucC5BG9kdTvZe-24QSIidhHyimoiC0b8G81tLsWWhFO/256fx192f', rarity: 'classified' },
        { name: 'P2000 | Coach Class', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V6h4J_eSCWKv0bwm4LFWQyC0nQlptTmEyNf9d3mQPQ91D5sjQrYJsxO_xNGxMLzi5QOMio4TxX79iy1JvzErvbjJFhomkA/256fx192f', rarity: 'industrial' },
        { name: 'P2000 | Wicked Sick', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMWOVwuJ_vuRWQyC0nQlp4jnTyNqodHyXOlQkDZtzF-UN4BjukYeyZuLn5Qbaj4NEzy3_3ywd5zErvbh-3lU8Iw/256fx192f', rarity: 'classified' },
        { name: 'P2000 | Fire Elemental', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMWGZ0-tJte1sQiy9gRwrjDGMnYftb3-RZldxWJVyF-QLsUG5mofnML_qtg3cjd4TyCr4jXsf63lr4-5TVvA7uvqA-y0nTh8/256fx192f', rarity: 'covert' },
        { name: 'P2000 | Woodsman', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMW-Fz_pzot5lRi67gVMi5GuBzo6sJXiSOAJxCMR2RuECthTskNG1Yrm3sgCM345CyCj32yJP8G81tLtUlzXH/256fx192f', rarity: 'restricted' },
        { name: 'P2000 | Ivory', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMW6Gzvxvj-1gSCGn20gism3dz96pc3KVOgYoCpR4TOFZsxbsxNzlYejl7lPWiIJBmX6t235XrnE8r5B4jsA/256fx192f', rarity: 'milspec' },
        { name: 'P2000 | Obsidian', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMWiS0udyueBncCW6khUz_W7QzNf4eHKUPA9xDMAkFrMJ40brldGxM-rk4lfago1MzXmrjCwYvC91o7FVDbVY3kE/256fx192f', rarity: 'restricted' },
        { name: 'P2000 | Pulse', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMXeFzf1zj-1gSCGn201wsTnRm9egcS7DaABxDZckQe5Ys0S6xtKxZO-wsQDbi9lMxSv-jS5XrnE8fJdFk9o/256fx192f', rarity: 'milspec' },
        { name: 'P2000 | Urban Hazard', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMXKCw-94j-loVSihkSIrujqNjsGsJXnFPw4gCcZ1TOIPt0LukoG2ZuqxtAXaj4sTzy6q3SpN7C9u6-YCT-N7rcTI-daA/256fx192f', rarity: 'milspec' },
        { name: 'P2000 | Lifted Spirits', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_K8-VAn6Zz-lJtPNsTiSMmRQguynLydatcHrEOgIhXJZxReINtRO7ltexZuiwtQPd34lFxXqqjisYun444fFCD_R1ajI6RQ/256fx192f', rarity: 'milspec' },
        { name: 'P2000 | Turf', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PW9V7Q_cKDDQ3SAzvxij-1gSCGn20h14mSByd6vJXmUagQoXpMkQecN40Xsm4DhM-3k4lTY340UxCn53HhXrnE88VIlnLo/256fx192f', rarity: 'milspec' },
        { name: 'P2000 | Imperial Dragon', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PW9V7Q_cKDDMW6d0etkueBlcC2hlBoovQKJk4jxNWXEbAQmDsQmRbNYsxGwxoC1YrvrsQXXg40QxCX533tJ7Xs-4eYKWKAl5OSJ2JuLIVNl/256fx192f', rarity: 'classified' },
        { name: 'P2000 | Coral Halftone', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0Pq6V6JsI_WHMXfCkb4mj-1gSCGn2xsj5mrWm4v_c37EaAV1CMR2Ru8P4RO7m4fjY7_rsgDZjYMQzHiriyNXrnE8hd3eC64/256fx192f', rarity: 'industrial' },
        { name: 'P2000 | Granite Marbleized', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0Pq3V6N_If6aGmKvzedxuPUnHyvhkUh2tmuBztupdi2fPwclDMN1F-JctUTuwYDgYu3rslPdj9lHnjK-0H1HqokLtA/256fx192f', rarity: 'industrial' },
        { name: 'P2000 | Oceanic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0Pq3V7Q_cKDDMWiTxO94ud5lRi67gVNysmuGzt_9JSiQaQJ0C8MkTLJbskHrk4fnZe3isgfZg4tMnySoiX8Y8G81tHDFigbI/256fx192f', rarity: 'milspec' },
        { name: 'P2000 | Red FragCam', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0Pq3V7RiLOmsDWadztF6ueZhW2flkRsm52nQyNquJ3nBaw4lXMFzQLNf50bpl9GxMePm7wyM3YoWmC_2kGoXucluK1Fs/256fx192f', rarity: 'milspec' },
        { name: 'P2000 | Red Wing', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0OL8OPQ9H_SWC3ev0-tyj-1gSCGn20RysWvczNqpeS3GOlQoXsYhTLJbuhfulIHjPurktVHfjY8Wmyuo2H5XrnE8nnCGDRE/256fx192f', rarity: 'milspec' },
        { name: 'P2000 | Sure Grip', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0OL8Y5trMvGQGmac_uJ_t-l9AS2wwxx06mTUw9b7JH2RZlQoDZYkRLQD5hW4lNPiYePktgzWj45CmSzgznQeV1pFuQ0/256fx192f', rarity: 'milspec' },
        { name: 'P2000 | Grassland', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0OGhV6N_IeOAAmaexdF6ueZhW2fkzEght2zVnIz_cXrCPQEmA5IhE7FZ4BG-x4GyY-rr5wWNj4kXyi_2kGoXucFfluJI/256fx192f', rarity: 'industrial' },
        { name: 'P2000 | Grip Tape', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0OGhbZt9cqDDXliX0-dmo95lRi67gVMlsj7SmNiuIHmfaA4gDZEhQeBZuxa7m4CxYu-w7geL2osRxS6qiSIc8G81tBwotro2/256fx192f', rarity: 'milspec' },
        { name: 'P2000 | Marsh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0OGhbZt5JfGfMWCcyPpitfNWQyC0nQlpsWvXy9-rdSiePQEkWZt0QuEI5kXsldXjMe3k5Qfag91CzyX-hyNL6zErvbj1scXf1A/256fx192f', rarity: 'industrial' },
        { name: 'P2000 | Pathfinder', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0OG-V6hsIumBB2mEybxJvOhuRz39lh4ksD7cz96gcX2UaAByA5olQeYLtxbsmtKyY-qxsw3Yg4MWnCz-jTQJsHiIL0xUTQ/256fx192f', rarity: 'industrial' },
        { name: 'P2000 | Grassland Leaves', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0OG-V6hoIeaWHViX0-9lo-1oQS2MmRQguynLzI77dSqVbwF0D8MkTOYJ5xfpl9zhM-62tleI3o0TxHmviisdvCxttvFCD_RWG0AtOw/256fx192f', rarity: 'industrial' },
        { name: 'P2000 | Royal Baroque', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0OG-bZt-I_GBCFiA0-d4pN5lRi67gVMk4GzVzNz9I32RawMoD5shR-ZeuhGxwIeyNuPntgWIjt5Ani33jC0Y8G81tMIEN1xi/256fx192f', rarity: 'milspec' },
        { name: 'P250 | Nevermore', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiNa0OL8PfRSJ-KSGGKUyOlxtfN6cCW6khUz_TjdmdeqdymfbVQlXpp0QuVYtBSwk9zmN-634gXd2tpCyH_2hipKunl1o7FVDpyoDiY/256fx192f', rarity: 'restricted' },
        { name: 'P250 | Digital Architect', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiNa0OSrerBkJ_-UC2ivz-t5vt5lRi67gVMk4mXQntr7JC_GPQNxApFxF7NethXqktfvMuLktAaKjd9Cyy_9iH8f8G81tGeD0jsi/256fx192f', rarity: 'restricted' },
        { name: 'P250 | Steel Disruption', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiNW0PaqeKV5JPWdHWKv0ud6puR7cCW6khUz_WmGzIqrc3mVOlN2CJF5Re4CskWwxoW0PuKzsVaL3o9Mn3762H5I53l1o7FVezFvgCM/256fx192f', rarity: 'milspec' },
        { name: 'P250 | Undertow', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiNW0OL8PfRSIvWSCmKU_v53ue99cCW6khUz_W3dzIuueSqWblJ0WMNwFuYK4xawk9S0Y-7n4Afag4JDzSz73XtK5nt1o7FVPKoITvg/256fx192f', rarity: 'classified' },
        { name: 'P250 | Ripple', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiNW0OL8PfRSM-CGGmmZytF6ueZhW2fnlht-5juGyY2vIC2SalQjX8Z1RbVesUG4m9XlN-_ntQPa3YNBn332kGoXubXJFvZo/256fx192f', rarity: 'milspec' },
        { name: 'P250 | Dark Filigree', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiNW0OCrZptpIeKYMWuZxuZi_uBrSS3iwBty4zvSntv7Jy_DZg90Xsd2Qudb5xG_kIfuZurm7wHbjtlbjXKpFkxeYNg/256fx192f', rarity: 'industrial' },
        { name: 'P250 | Metallic DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiNW0Oe8aqVjH_yaCW-Ej-9ys7UxSiqyzB4jsGnQn9f6cX6UbQ4mDZRyE-AKsxHpmtPiZe7q5wPAy9USTykR2DM/256fx192f', rarity: 'industrial' },
        { name: 'P250 | Cartel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiNK0OL8PfRSI_GBGmKc_uJ_t-l9AX2wlh906m7Uy4v_cXqWaA4gCpUmQLMNsBO_ltfiYuPltAHbgthGmyzgznQeqxXZ9kg/256fx192f', rarity: 'classified' },
        { name: 'P250 | Valence', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiNK0OL8PfRSI_-dGmiF09F6ueZhW2fiwUx14zmDnNagcC-WagUkApslQuBYsUW_ktexPry3swPfiogTyyiqkGoXuQius2mt/256fx192f', rarity: 'milspec' },
        { name: 'P250 | Verdigris', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiNK0OL8PfRSNvWBCm6X0-dlj-1gSCGn20R35DnRn42udXiVOg91CpZ4ReACthC4wYexZuuw5VeIjdkUzyqq3CNXrnE8Cr6wnKw/256fx192f', rarity: 'milspec' },
        { name: 'P250 | Constructivist', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiBJ-uavZK1-NM-SHGSYyPpzs_V8XSyMmRQguynLn974cXzGPAYgXpV4F-4NtRK6l4LkP7i35lSIgt1Nny6thnhA7SdtsPFCD_QCdWsc4g/256fx192f', rarity: 'industrial' },
        { name: 'P250 | Supernova', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0PCnfLBoMuOEC2KE_uJ_t-l9AXzlwk5zsGnWz46uICjCPAZ2CZF0QO8LtBjtkNaxZrji7wbY2tkUySXgznQe4Iqu8Lg/256fx192f', rarity: 'restricted' },
        { name: 'P250 | Franklin', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0P-hZqF0H_yaCW-Ej70htLhtF3Dgx0Vz5WrWwtf4JCjEPA8oDZF4FrRZ5xnulNy1Zrvn5wHAy9USTWvgE_Q/256fx192f', rarity: 'classified' },
        { name: 'P250 | Asiimov', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSIeOaB2qf19F6ueZhW2fixx53tWqEm4ugeXuebQN0CZJyRrMJuxm4loCyPr_i51TfjtgXzi79kGoXuUXmUJzm/256fx192f', rarity: 'classified' },
        { name: 'P250 | Red Rock', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSIeiaAWqvzedxuPUnSizhkEh05zzQmIr8JX6UbAZ2DsMhTOEOthexl9e2NuLktAzaiIpGnjK-0H2BmRk7ww/256fx192f', rarity: 'restricted' },
        { name: 'P250 | Cassette', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSI_GAHWKE1etJvOhuRz39lkwltT7Ww4ugc3PGOwd0DpQkQbUPshbpm93lMuy25QGIjIwUn3_72DQJsHjyHnRH0Q/256fx192f', rarity: 'milspec' },
        { name: 'P250 | See Ya Later', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSI-mRC3WT0-F1j-1gSCGn2x9ytmzWnN6pInjGOwMlDZp0EORe5BHsx93lP7zr5wzbiI5AyXr_jS9XrnE8gQrIgng/256fx192f', rarity: 'covert' },
        { name: 'P250 | Contaminant', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSKf6VC2SE_uJ_t-l9AXG3xUt-4jjcn4yqIHLGO1QkDsZ4TeNetUK4m9eyP-6xtVHcjd5DzSrgznQee4rYsVM/256fx192f', rarity: 'milspec' },
        { name: 'P250 | Muertos', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSLfGdCmacwNF6ueZhW2e1lh51sm3UmN37cHuUbQQhXJtwQO4C4BXsxtHjM-624A3a2IoWySiskGoXuSIJMqiP/256fx192f', rarity: 'classified' },
        { name: 'P250 | Re.built', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSMvWRG26c1dF6ueZhW2flkRh_sjjXmNb8cCnDPVUnW5ByQ-JZ5hG_xN3gZuPltAHegogWzH7-kGoXuSIylluX/256fx192f', rarity: 'milspec' },
        { name: 'P250 | Mehndi', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSMvWVB2mVxdF6ueZhW2eykERysj-GnNv7eHuTbAYjCpN4Q-ILsxGxw4DjM-rn5QTciIIRn36rkGoXuU7_dDjp/256fx192f', rarity: 'classified' },
        { name: 'P250 | X-Ray', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0Oq8ab1SMKLGXlicyOl-pK8_HSjjxx9wsmXQnIv6cH2TaAQoWZd4RuAKshe7wdS1NOvi5VCIi48Q02yg2fSIc8-4/256fx192f', rarity: 'restricted' },
        { name: 'P250 | Apep\'s Curse', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiVI0OL8PfRSIeCWHlicyOl-pK87HCjkxR9ztj-Dzdv8di2TPFchDptyTbEIthTsl9znY77r5Qzc2YwR02yg2XoGglyv/256fx192f', rarity: 'classified' },
        { name: 'P250 | Vino Primo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiVI0OL8PfRSI_iWDWyV09F6ueZhW2eyxR9x6m3SydqqcinFPQN2CcF4F-5buhi9w9PgYem25AKNj40Wzy2rkGoXuZ9g813e/256fx192f', rarity: 'restricted' },
        { name: 'P250 | Cyber Shell', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiVI0OL8PfRSI-mRC3WDyet6vN5lRi67gVMl6mzUm9n8IHzCaQUmA5Z3RLJb4xC9m4bhMbzn7lOL2Y5Am3j73HxI8G81tOdaiAQT/256fx192f', rarity: 'restricted' },
        { name: 'P250 | Inferno', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiVI0OL8PfRSKf6VC3WeztF6ueZhW2e3wUgi6z7WmI6gc3LDPQAgXsB2E7Veshbpl4DiNL_htQDZ2NlHy3qvkGoXuXYeEedL/256fx192f', rarity: 'restricted' },
        { name: 'P250 | Iron Clad', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiVI0OL8PfRSLfWHD2uv0e94te16cCW6khUz_W2Hzd6heSjBbFd1CsFxF-8DsULulNLjZu6xtQDfitlCyiWt3HtNu3p1o7FVE3GEpAE/256fx192f', rarity: 'milspec' },
        { name: 'P250 | Visions', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiVI0OL8PfRSNvmAB2ie0tF6ueZhW2fmzERx5jyHm4v_dXvGaQR2WJF2QrIMsxW_w9PvN-zhtgXXiokWn3_6kGoXuc_iGAKZ/256fx192f', rarity: 'classified' },
        { name: 'P250 | Facility Draft', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0PCifaF9MvmdGliCxOpJvOhuRz39l05wt2XRzNr7dHjCalBxXschRucD4xnpwIfhN7ngtVTe2tlCyi_5hzQJsHgA1f7ZYg/256fx192f', rarity: 'consumer' },
        { name: 'P250 | Facets', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0PG8fal9LPWsCmaCytF0ouB_QBa_nBovp3ODy9z8c3KQOg5zDJR3Te5e4RXpxoLuMbjl7wDdioJAzn_2jShJ6y9i_a9cBseVOER4/256fx192f', rarity: 'industrial' },
        { name: 'P250 | Black & Tan', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0Pare6F_NM-eG2uEyO13vd5lRi67gVMm5GrTyN-ueH6fO1MlDMd2RLQC50Trw4fvMuPns1eLj9hHzCn4j3lK8G81tJittFNq/256fx192f', rarity: 'milspec' },
        { name: 'P250 | Exchanger', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0Pa7a7B-H_KfG2KvzedxuPUnHnDkzRhz42rUnoqvcXyfPA4lDZVxEbReskS7lteyZLvq4FCKgo1DxTK-0H1XkoQg2Q/256fx192f', rarity: 'milspec' },
        { name: 'P250 | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0PSheqF-NM-RAXWVwOJJvOhuRz39wEsm4WXRz4urcXvEZw8pXJp1RrEIuhC_lNfiYeLj51TXg4JAyyT_jTQJsHgo2RMlUQ/256fx192f', rarity: 'consumer' },
        { name: 'P250 | Forest Night', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0PSheqF-NM-dB2CY1dF6ueZhW2fqkUpy5zzVyo76eC7DO1AnXJtzQuQMtkG_mtS1Y7zl41ffg91HyHmtkGoXueNjwZxk/256fx192f', rarity: 'consumer' },
        { name: 'P250 | Gunsmoke', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0PWrZLRoLs-fB2CY1aB04LJsSy_rkUhy52qAyteoJS2XbVV2DJElR-cPtxjplNy0M7jg4weNlcsbmpJkoaMM/256fx192f', rarity: 'industrial' },
        { name: 'P250 | Modern Hunter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0Pq7ZrBoMs-eAWOV0-BJvOhuRz39lkV-5zuEmN6seX-QbgYpA8B0QLZbtRXpmofgM-Pj4FSI3tkXxCj8hzQJsHhBKeBm5Q/256fx192f', rarity: 'milspec' },
        { name: 'P250 | Crimson Kimono', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0PmnZatjL8-XB2adzuByo957Si2MmRQguynLw9uvI3qVbld2XJF3ROMKtBTqxNO0P-Pj4lbXjt9HySv5hikf6y9s4PFCD_Tv7NBHeA/256fx192f', rarity: 'industrial' },
        { name: 'P250 | Contamination', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0Py7a6hoIeKsHWyFzeJl5N55HXzjqhEutDWR1NahIH6SaVUnDsB2Q-MIthHrxtTjMuLk7gXc2YlHyir93CtMuCdt4e8cEf1ykWaXO4g/256fx192f', rarity: 'industrial' },
        { name: 'P250 | Wingshot', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0OL8PfRSI-KSDWyDyeFij-1gSCGn205wtT7Xn4yuc3qQbQUkXJQmEeQCtkK7wdDgZO7n71Df2IkQxH7-hyhXrnE8AH9Qqg8/256fx192f', rarity: 'restricted' },
        { name: 'P250 | Bengal Tiger', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0OL8PfRSNPmUC3WvzedxuPUnSX7llhghsGjQnNv7I36SZlAjDZMmE-VYskS_kYfkNO2w4QffiItNyjK-0H3QIgynUA/256fx192f', rarity: 'milspec' },
        { name: 'P250 | Hive', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0OCrbKxoOM-fB2CY1aAu6LltFny1xRt2tjuAzoyoI33BOgQpX5ByTOVY5xXql4HvNbviswbelcsbmoYK4S35/256fx192f', rarity: 'milspec' },
        { name: 'P250 | Sleet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC6s2tabZSN-KSHljD_uJ_t-l9AXCwxhwi6j_Syoysc36TbAAhXpYiRuIPshLsk4bnYemw7wCKiNoUyC7gznQekhpLnpY/256fx192f', rarity: 'consumer' },
        { name: 'P250 | Red Tide', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC6s2-YapmH_OcHGac_uJ_t-l9AXznkUV35WiGy4yhcX6ROgYnCcd3F-AJ4RG_wNXvZOjm7wXWj9lFnCrgznQexaJMRP4/256fx192f', rarity: 'milspec' },
        { name: 'P250 | Bullfrog', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjIJuqKRarFhLPaBAWCvzedxuPUnG3q1kEUl6mnRmYz6JXvBOlQgXsMiRe5ZtxnpmoLiZuO0sVbcjo8XyTK-0H1rEQ3j6Q/256fx192f', rarity: 'milspec' },
        { name: 'P250 | Epicenter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjIJuqKRYal9IfOHMWuZxuZi_rg5TnvmzB916m_dm92pdH6eOwJ2DpVyQ7JftUXtwIK2MLiz7wTXjYtbjXKpkd0OdLY/256fx192f', rarity: 'classified' },
        { name: 'P250 | Kintsugi', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjIJuqKRY61jNOOGCW6vzedxuPUnHXrikBkh4jjXzd76I36VPQF2CJV2FOYLthC5k9DiNuOwswKLj4JHxTK-0H3jhNNozg/256fx192f', rarity: 'classified' },
        { name: 'P250 | Copper Oxide', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFU0PW8bb1vLOWWMXfClL5JvOhuRz39kEVx526GzYyudHLFbAYpXpZ0EbZeuxK4ktyxNOu3tQLX2o1DyCX7ijQJsHjyf3ICdA/256fx192f', rarity: 'consumer' },
        { name: 'P250 | Sand Dune', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFU0OGvZqBSLPmUBnPelesn5-RrSXDlwRhx5TjSwtmocCifPwQpDpshReBfsxPrk4DhNu3jshue1dy8VcXxuA/256fx192f', rarity: 'consumer' },
        { name: 'P250 | Whiteout', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFU0OWmYbBoL-WHMWuZxuZi_rJqTCq1wUUh6mSBntaqdHyTPFdzXJQjTeMLskTrk9zlN-7lsgyM34lbjXKp2HY6z6k/256fx192f', rarity: 'milspec' },
        { name: 'P250 | Small Game', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFU7PqRYLFjNPWBMWWcwPRzj_E7GnmMmRQguynLzdv4JCrGalRzCpZzQLUD5BG5wdPkZuqx51OLjt4Uyiv52CJL6ipssfFCD_QcHDx_gA/256fx192f', rarity: 'milspec' },
        { name: 'P250 | Sedimentary', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFU6s23bahhL-esHXCZ0-JJvOhuRz39xk9w62XRyNr9eCrDPwV0CpsiROAIsxC-kNyxNb7q71bcjY1GzXqsiTQJsHicAIc5kQ/256fx192f', rarity: 'industrial' },
        { name: 'P250 | Drought', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFL0Pare6F_NM-ABXKczf1JtOB-QRa_nBovp3PVyd6tIijBOAQhXsAlE-ECsxC9x9flMuPn5wfZ2YNNnn32iy4d53pi_a9cBo6jFyfx/256fx192f', rarity: 'consumer' },
        { name: 'P250 | Mint Kimono', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFL0PmnZatjL8-XB2adzuByo95lRi67gVNx4z_cn934JHvDOAEnCcZxTeZbsUTrxoGyMrzi4FHZiI0Uzyn-3HtM8G81tISNzIT_/256fx192f', rarity: 'consumer' },
        { name: 'P250 | Plum Netting', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFL0P6va6FSLPmUBnPembh05eA4H36ykBh3sGnRmN-hJyiQag4nDZB4RuQDtxLuw4fkYuK27xue1dzA89j_Xg/256fx192f', rarity: 'consumer' },
        { name: 'P250 | Nuclear Threat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFL0Py7Y6F-NOKaHmKvxvxzte9WQyC0nQlp5mrRztyuIy3GbQF1WMN2QbFetBfulNbnPruz7lGKit4UyS6vjn9K5jErvbiRPSOzZg/256fx192f', rarity: 'restricted' },
        { name: 'P250 | Splash', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFL0OG-ZKV-KM-DXDLA_uJ_t-l9AXDrxh4i62vTzNyrc3zEP1MpWJN2EOMN5kTpl9K2Zb62slTdi4NMzC7gznQe9E-5MVM/256fx192f', rarity: 'restricted' },
        { name: 'P250 | Bone Mask', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFL0OaveKFSLPmUBnPekL0l47g9TXuylE916mrRy9-vdS6VZgQpWJJ5F-8OsRawl4DhNbix4Rue1dyhzdnPWw/256fx192f', rarity: 'consumer' },
        { name: 'Tec-9 | Red Quartz', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiNW0PG8cbd5IfyfB32VxdF6ueZhW2e3xU13tzmAmdqsIC6TPw8hCcF3ReADuxPtl9ThNu3qtVPbjdlFny2okGoXub5yNIFB/256fx192f', rarity: 'restricted' },
        { name: 'Tec-9 | Titanium Bit', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiNW0PSifbBoJM-HC2TJ_uJ_t-l9ASi3w0gm62qHzdz6Jy2WbAZxW8dyTOEIukawldfhY7zqtgKN2d9MyHngznQe9VU90c8/256fx192f', rarity: 'restricted' },
        { name: 'Tec-9 | Ossified', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiNW0P29e61rOc-fB2CY1aAvsrQ6TCzqzEwisT7QnIqudCjGZgV0CpJ0ROFct0PrlNO2MOzg4gSKlcsbmgSNht1O/256fx192f', rarity: 'milspec' },
        { name: 'Tec-9 | Re-Entry', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiNW0Oara_1SMvWXDGuR0vpJvOhuRz39lkp-4j_QnoytcS-RPwEgDZt1FuAJshG6ktW1NLy34gCPj44WmH7-jzQJsHhOKqOsYw/256fx192f', rarity: 'restricted' },
        { name: 'Tec-9 | Ice Cap', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiNW0Oara5s0H-OWD1iDwOJij-1gSCGn2xtz5TjdyNquJX-XaVV0CMd3EOUP5Bjsw93uP77jsVHejohEyH6t339XrnE8zMglqPs/256fx192f', rarity: 'milspec' },
        { name: 'Tec-9 | Blue Titanium', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiNV0OanfKVjKeWeXTeG_uJ_t-l9AXnikBh-6mvTztz4eHvCOgIiCpFzQOAJ5xPulNK2Nr7q7gHcg9lEm3ngznQe7B1sAb0/256fx192f', rarity: 'milspec' },
        { name: 'Tec-9 | Brass', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiNK0PC8abd-H_yaCW-Ej-91tuQ7Sy3gzB9x4m_Vy9b8dy-SaFcjDZchQ-IL5EHqxtzhP7y34ADAy9USp8n4eRk/256fx192f', rarity: 'milspec' },
        { name: 'Tec-9 | Cut Out', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiNK0Oara_1SI_iSAmyv0e9ipOR7QRa_nBovp3OGnNb4dHiTaFdzX5EjRLVY5EG6mtOzYu7q4FDb2IxBynmvi34bvCo__a9cBktm4Qsf/256fx192f', rarity: 'milspec' },
        { name: 'Tec-9 | Isaac', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SIeOaB2qf19F6ueZhW2frlEpz6zyAy477dXrEagFxDcclRO4C5EK8wIa1Nem3s1TdiotNzCn5kGoXuYgN6W8t/256fx192f', rarity: 'milspec' },
        { name: 'Tec-9 | Avalanche', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SIeaSAmaewuZzj-1gSCGn20Qi4m_cwtv8dy7Fbg8kXptyRuMJtEG4kdDuN-jq71ffj90QxCT22HxXrnE83F92lc4/256fx192f', rarity: 'restricted' },
        { name: 'Tec-9 | Bamboozle', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SIvGeDGif_uJ_t-l9ASi2xxhzsT6Emdr6JCqTPQJyXpR4RLMI5hm_wNHjZe3r5Qzci41Dy3jgznQeOWU5G3g/256fx192f', rarity: 'restricted' },
        { name: 'Tec-9 | Cracked Opal', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SI-KSDWyVxdF5oOBlcCW6khUz_WvSwo2geHiUbFAkD8EkTOFetxi4w9ThZLnm5lfdj4JDznmqjixA6Sd1o7FVGUODCFM/256fx192f', rarity: 'milspec' },
        { name: 'Tec-9 | Flash Out', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SJvySHW-vzedxuPUnFn21zRt_6znQmY6gdyiXbQckWMBzRLIPtBnrl9LvYeqx5FPd2ItMmzK-0H2aE-DSCQ/256fx192f', rarity: 'milspec' },
        { name: 'Tec-9 | Rebel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SJuKWC2OfzNF6ueZhW2fgkU0k5GmBzIn6eHjBagBxDZMhReYN5hC5ldbgNb7jtFbfgt5Ey3_3kGoXuRiiuNrn/256fx192f', rarity: 'milspec' },
        { name: 'Tec-9 | Mummy\'s Rot', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SLeWeA36vzedxuPUnS3_jlEUm5muAzd6qcXiRaw9yWZciRuQItUHpxNXnP--27lGL2d5CyzK-0H1vVdbZoA/256fx192f', rarity: 'milspec' },
        { name: 'Tec-9 | Sandstorm', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SM_GdCnSEzvx7j-1gSCGn2xsi52XSyIqueCifOAMnD8YkQ-YMtUPpwIK2N-jq4QSK2ohCm36q239XrnE8IX2h_4o/256fx192f', rarity: 'milspec' },
        { name: 'Tec-9 | Snek-9', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SM_6SBWKvzedxuPUnHH23wEpz6j7Rydqqdy6SPwcoDpV0RrEN4Ra_x921ZOPitVDdiIpDmDK-0H1esiynQw/256fx192f', rarity: 'milspec' },
        { name: 'Tec-9 | Decimator', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiVI0Oara_1SJPWQB2qR1eFkj-1gSCGn20h16j-Ew9j6Jy6QbQB1XJJzQLVYshXqm92xY-7g4wze3dpAySz2iXlXrnE8_HmWmcE/256fx192f', rarity: 'classified' },
        { name: 'Tec-9 | Remote Control', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiVI0Oara_1SJf6FAX6vzedxuPUnGSvrlhxw62zXn92sJynGOFcnA5J5EeIPsRm5l93mM-6w7gzW2olEzzK-0H1xr8Niww/256fx192f', rarity: 'classified' },
        { name: 'Tec-9 | Fubar', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiVI0Oara_1SJuWRD3WvzedxuPUnGiq1xBh_4D6Bytmrcn_CaFUlX8NyR-5ZtBG7kdzgZe-z5gTb3o9NyDK-0H2rKvLQog/256fx192f', rarity: 'milspec' },
        { name: 'Tec-9 | Brother', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiVI0Oara_1SJ-WWHG6cze9JvOhuRz39xBsj4GmEyt-vIHjEbgJ2CsR2RONfu0K_lYXvZrjg4ADYg4wXzin42DQJsHgTPX1sbQ/256fx192f', rarity: 'restricted' },
        { name: 'Tec-9 | Jambiya', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiVI0Oara_1SKvGeDG6JwNF6ueZhW2ewwhhw5WnXy4v_dnqXOwMnAsQmF-IMtxDql9LmP-mw51feiIhDnn78kGoXuTq6iJ_X/256fx192f', rarity: 'milspec' },
        { name: 'Tec-9 | Fuel Injector', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiVI0Oara_1SM-WDC3WTye9kt-RtcCW6khUz_Wvcy9qgdCnEPQ8hApBzRrQJ4RW7moDgMLzktFDZiI5HnyWr3ChN5yp1o7FVg4hNKG8/256fx192f', rarity: 'classified' },
        { name: 'Tec-9 | Blast From the Past', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wipC0POga61oLuSsGm6cxP1JoORoTCGMmRQguynLm4qpJ3PDaQ9zXpIjQ-AJ4xawlNOzMrjktVPZ349AmS323Xga534-tvFCD_QT7Lx_Ug/256fx192f', rarity: 'milspec' },
        { name: 'Tec-9 | Bamboo Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wipC0PCvZaZiL8-ZG2mXzetJvOhuRz39kx90sjiBn9apcnPBOwRyDJcjTeUKtxbpwNzkZLm04geLjIsXzSivjTQJsHikA0D9yg/256fx192f', rarity: 'consumer' },
        { name: 'Tec-9 | Urban DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wipC0PaqeKV5H-WBDFicyOl-pK89HC3iwkwh522Dm9qqIijEbQN1XJt1TOZb5kbtkIbkZr7l4QTeiYIQ02yg2SkrOr2J/256fx192f', rarity: 'consumer' },
        { name: 'Tec-9 | Terrace', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wipC0PWrZ6loNOKaDViD1etmo95wSiW_mgoYvzSCkpu3eHySPQUmCsF5EeYMu0PuwNe1Nby25AHejY5Myn_5jnxL6S864OoLAL1lpPNSa1bCHA/256fx192f', rarity: 'milspec' },
        { name: 'Tec-9 | Hades', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wipC0PqvbKF-H_yaCW-Ej7chtLM9F322lkhxsm7Xyon_Ii-ePAYiD5ElEOUK4ETqx9DmZb_qsgDAy9USH97bt-4/256fx192f', rarity: 'industrial' },
        { name: 'Tec-9 | Safety Net', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wipC0P-re6xSM_GVC3OJzvx3vuZscCW6khUz_WnSyIytcXPBPw8oDpMkQeIPuxjtxoWyYuOztVTX3okXyy3_2y9N6Xp1o7FVepitb8I/256fx192f', rarity: 'milspec' },
        { name: 'Tec-9 | Orange Murano', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wipC0P-7eqVjL8-cHGaexutJvOhuRz39xUpx5GiEzIqrJy6Qaw9yW5MjFuUDuxe4kILgNe-wsQaIioxNmX2s3zQJsHgf4ROQiw/256fx192f', rarity: 'industrial' },
        { name: 'Tec-9 | Toxic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wipC0Py7a6hoIeKsHWyFzeJl5d59SirqqhEutDWR1N2pc3PFbgYgDMF5TbVZ5hfsk93hP7u2tQzf2t0RxSuviiJN5ydo5bwcEf1yPyH7PX0/256fx192f', rarity: 'milspec' },
        { name: 'Tec-9 | Phoenix Chalk', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wipC0OKmZ6FjKeisGmaX0tF6ue1oTBa_nBovp3PTnNuoIH2TPw9xApB0EOQK5kK-k93gNrjr4QSPj4JEnH__jy0d7io4_a9cBnAYh6IJ/256fx192f', rarity: 'consumer' },
        { name: 'Tec-9 | VariCamo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wipC0OSveq1uIf2cMWuZxuZi_rBrTXm1w0kksGjRw9yseS3Db1JzW8NyTLICtRiwxNbjMri25AzWg99bjXKp9aEM-ik/256fx192f', rarity: 'industrial' },
        { name: 'Tec-9 | Banana Leaf', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wipC6s2sabBkK8-WF2KD_vpzs7hWQyC0nQlpsWnRz9atIH3Gag4oCpQjFucP4Rfux9PuNr7j7wDZ3tgTny3_h3xPvzErvbgFFfz3Tg/256fx192f', rarity: 'industrial' },
        { name: 'Tec-9 | Raw Ceramic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wjFU0PGreqVgKfOsAm6Xyfo45uI5Siy1wU4l62rWyN-ocS_FbAFzDZtzFOdZtBe-kNy1Zu627gSI2ZUFk3tFqaykOQ/256fx192f', rarity: 'consumer' },
        { name: 'Tec-9 | Groundwater', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wjFU0P2iYbJoH_yaCW-Ej7om4eQ6H3zrxEwk4T-HmN78dirCb1MmA8Z3Re8D5hS5x9KzYrvkslPAy9USDDHRuWI/256fx192f', rarity: 'consumer' },
        { name: 'Tec-9 | Blue Blast', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wjFU0OaraahSLPmUBnPex7cj4Lg9GS-ylB4jsGTSzov_JHvDag8nCcB4FrZes0XtwIblNOLhshue1dxd5qECaQ/256fx192f', rarity: 'consumer' },
        { name: 'Tec-9 | Tornado', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wjFU0OaheqpsJP-sDHWR1-FJvOhuRz39w0Qh4WiHmd-uc36eZlcmX5p0E-IKuxLqkt3kYe_jsgDYg4NCziX82jQJsHiZ2a0fyg/256fx192f', rarity: 'consumer' },
        { name: 'Tec-9 | Whiteout', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wjFU0OWmYbBoL-WHMXOVwrdJvOhuRz39lB9_smmDn9ugdCrCbFcnCJEmFrVcuhC4w9TgNePhsQWKiN4QzSv7hzQJsHg2FaN_Cg/256fx192f', rarity: 'restricted' },
        { name: 'Tec-9 | Tiger Stencil', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wjFU7PqRfK1qJeKsHXOVz-1_vN59SirqqhEutDWR1Nr9cHKVPwRzCJsmROMC5haxldLnMLjk51fdgthNxST4iiJJuis55uccEf1yksXdoWw/256fx192f', rarity: 'industrial' },
        { name: 'Tec-9 | Garter-9', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wjFU6s29ZqVmJeOYB2mvzedxuPUnTHDlkU5y5j-BnI6gJX_Cag8nXpp5QORb4RCxmobuNLjgswDY2dlAxDK-0H3cj7008Q/256fx192f', rarity: 'industrial' },
        { name: 'Tec-9 | Citric Acid', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wjFU4M2-aa1jNM-AHmuR1f1JqeRlQyakqhEutDWR1NagcXnGOA8iXptyQO9Y5Bjpw4DlNrvntQOIiY4UyHmvh3hK7iw56rwcEf1yY9HMcYg/256fx192f', rarity: 'industrial' },
        { name: 'Tec-9 | Rust Leaf', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wjFL0P6raaJSL-KSAGCV_uJ_t-l9AXnhxUxz5mXSmd2sJ3yfagAjDJp4EeReuxHqwNfnY-O0tQSPjINNz3rgznQeAmDb9hs/256fx192f', rarity: 'industrial' },
        { name: 'Tec-9 | Army Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wjFL0P-re6xSIeKeF1icyOl-pK8xGnCxkR5_tWTQztepcHiWOwAlCpJ3Q7ML5BO-lNyxMuvl5wXYiY0Q02yg2eIzVY8M/256fx192f', rarity: 'consumer' },
        { name: 'Tec-9 | Nuclear Threat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wjFL0Py7Y6F-NOKaHmKvxvxzte9WWyywzCIrujqNjsGtIyjEbQR1A8Z1QLVZtha_k9HvNbu04wTei4sWxCX93SJP7nw_4rtWT-N7rTdwfM9W/256fx192f', rarity: 'restricted' },
        { name: 'Tec-9 | Slag', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wjZe7KuRYrFjK-mSHGOvxOBxue9sSju6mxoYvzSCkpu3eHPFZwMkWZBzR-cDsEbpm9DvY-yx51fajd8WyXn4hntBvX465OkBVL1lpPMDDuBGag/256fx192f', rarity: 'milspec' },
        { name: 'USP-S | Purple DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSIf2sCmOAwPpJoPR7XyW2qhEutDWR1N-rcHPBPFMiDZUkF-9Z4ETtxtDkYu3js1ffg94Tnn2o3yMavH0957ocEf1yWMwziKM/256fx192f', rarity: 'milspec' },
        { name: 'USP-S | Serum', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSIf2sC2uVwvpkueJWXSy3qhEutDWR1I34J3uXOwFyCsF4TeAJt0bpw9OxNrzh7gyI3t1DmHiq3y5M6HxqsrwcEf1yfEp4lzc/256fx192f', rarity: 'classified' },
        { name: 'USP-S | Target Acquired', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSIf2sB2mExOJ6ueZsQSq2qhAmtDiLjo7GLSLANkI-XpZxE-4MtxW5ldeyZbvq51PXid9EzSr6iSof7y1t47lQAqRxrvCEjxaBb-PT-N1SiA/256fx192f', rarity: 'classified' },
        { name: 'USP-S | Orange Anolis', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSIf2sAm6KwPxyj_NsSxa_nBovp3OHn4qqcX3FbQMgD5okQeFYtBbsktLmMeux5leLjIIXxXn4i3wdvC9s_a9cBikK0tGN/256fx192f', rarity: 'restricted' },
        { name: 'USP-S | Dark Water', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSIf2sFGKS0-9JtOB7RBa_nBovp3OHy9v8J3vFbgIhC5UmQ7UIsxm7wNDnNr_rswOMiNlGmCWoiH9Juis9_a9cBl2xnYuj/256fx192f', rarity: 'restricted' },
        { name: 'USP-S | Stainless', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSIeGsG3SA_v1isehnQyyghiIrujqNjsGqcHuVa1VxCcciR7MP50a5ktLuP-rr5ATXioJNyij93y0a7nlstboAT-N7rU1N1uE6/256fx192f', rarity: 'milspec' },
        { name: 'USP-S | Caiman', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsBWaZzO94j-1gSCGn20t-4WyBn4mocC6XbVN0CMB2RLYMsUG5x9DgN-20tQSNiI1GzS2q3XtXrnE8NAiGp64/256fx192f', rarity: 'classified' },
        { name: 'USP-S | Business Class', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsAnKXxu9xtd58XDn-hiIrujqNjsGvJSjDPQ4nW5d1EO5btka6x9y1Me7ktgWM2oMWn3irjn8Y5ils5rxWT-N7rQDu-iuk/256fx192f', rarity: 'milspec' },
        { name: 'USP-S | Black Lotus', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_ux6seJicCW8gQg0jDGMnYftbynFZg8nXpt2Ru8D5hSwl9PhN7_m7wzdjotFxXr62y4Y6C894OxQVKA7uvqAvobUkb8/256fx192f', rarity: 'milspec' },
        { name: 'USP-S | Cortex', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_u1jpN5lRi67gVNz4G7Qm938cS_Da1AhXpB1EeVb4xm4mtDjN7vj4A3b2NpGyCr52i4Y8G81tMzdoYZ7/256fx192f', rarity: 'classified' },
        { name: 'USP-S | Cyrex', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_u1vouRxcCW6khUz_TjdzdmsJyiTZg8kX8N4ELUP5EPsw9G1YeLn5VTXjY0WxS6rhiIYuCd1o7FV2N83Spg/256fx192f', rarity: 'restricted' },
        { name: 'USP-S | Guardian', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_ut6teZoQT2MmRQguynLyd76I32fbFUkD5EmRu4Ct0O4m9fmY-zlsQSMiN9CnHj2jitL531o4fFCD_TZrkjVNw/256fx192f', rarity: 'restricted' },
        { name: 'USP-S | Flashback', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_uh6sfJhTSiwniIrujqNjsH6dnKfbAdxAsF3ELQCu0Hsmty1N76z71GIit4RySX_2CJI6yk9tucLT-N7rUYlhjC0/256fx192f', rarity: 'restricted' },
        { name: 'USP-S | Kill Confirmed', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_uV_vO1WTCa9kxQ1vjiBpYPwJiPTcFB2Xpp5TO5cskG9lYCxZu_jsVCL3o4Xnij23ClO5ik9tegFA_It8qHJz1aWe-uc160/256fx192f', rarity: 'covert' },
        { name: 'USP-S | Monster Mashup', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_uVkv-pmXBa_nBovp3PQn46ueX3FbAB0WZMjTe9csEKwk9XvNbnl41Tcj48WzHqv3HhP5ydj_a9cBuLIfNg1/256fx192f', rarity: 'classified' },
        { name: 'USP-S | Printstream', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_v5kue99XD2hkBwqjDGMnYftb3yUPFR0XsNyRrNc5kO5ltziMenr5lONj4kXyi2riywc7y9o5LtQAqQ7uvqAkScWnv4/256fx192f', rarity: 'covert' },
        { name: 'USP-S | Torque', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_v5kv-Z7SjqgnAsYvzSCkpu3cH2eZgcgD5cmTOQK5BftlobvY-zk4gCN2I4UyX-s3XhI7S4_supXA71lpPNCDDeLhA/256fx192f', rarity: 'milspec' },
        { name: 'USP-S | Road Rash', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_v13vuV5Tjm2hxgjjDGMnYftby2UaFcmCsF1R-cLsBS4mtLmM7nmsVbfiNlHxSuriypAvytisuhQWPY7uvqAwrOwBmU/256fx192f', rarity: 'restricted' },
        { name: 'USP-S | Orion', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKn17jJk_PuibapuJeLdWGLFwL8i4eVsFiqxxUt34jmHnoysJ3qVOAYgCJZwQrRb5EPul4XlYvSiuVIHgy4Xvg/256fx192f', rarity: 'classified' },
        { name: 'USP-S | Ticket to Hell', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_vp5j-lsQyWMmRQguynLzt_8JXiVOwF2AsF4R-ECshftltKxZe6x41CKjotExST8jn8f7ilr5PFCD_TZVvgG5g/256fx192f', rarity: 'restricted' },
        { name: 'USP-S | Blueprint', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA0tF0vPRsXzu6mwkYvzSCkpu3IiqTZgAmCJIlRLEP5BXpxtPlMOOxswPZithFyyj3iyNPvCo96r1QBb1lpPPa5SpubA/256fx192f', rarity: 'milspec' },
        { name: 'USP-S | Neo-Noir', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA0tF4v-h7cCW6khUz_WXdmd-vI3uRPwEkApR4QuBcu0Xrk4biYr_mtQXdidlCz3r63Ska7Hx1o7FVWuokIcU/256fx192f', rarity: 'covert' },
        { name: 'USP-S | Lead Conduit', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSJ-OsG3SA_vh5vPVoSCyMmRQguynLmNyrdimTZw4mW8cmE-ZYsxewkYaxZb6z5FbfjY8RyS__iXsc6S09sfFCD_RkYnnFtg/256fx192f', rarity: 'milspec' },
        { name: 'USP-S | The Traitor', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSJ-OsG3SA0tF-se9uSi2-lBMYvzSCkpu3eX7EP1MpApdwR-8NsxbukoXuNLnj4QOMiN8XzHn_iC8a7Spi4upRWb1lpPOCQNKXgA/256fx192f', rarity: 'covert' },
        { name: 'USP-S | Desert Tactical', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSJ-OsG3SA0tFiseJ9RiqymSIksjCKpYPwJiPTcARxX5VzROcIuhLtl9HkMum25AbZ2YtDzCT5234b6Ho-67lRA6Bw_fDJz1aWLNvRpDs/256fx192f', rarity: 'industrial' },
        { name: 'USP-S | Alpine Camo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSJ-OQBliS0-dxuPVWTCi-miIyoC26lob-KT-JaVIpXpRxFuIMtRe4x9PjYrni7wfejYpFnn3-jCNB6C4_5u4FU6It8rqX0V8gYmZtWA/256fx192f', rarity: 'milspec' },
        { name: 'USP-S | Bleeding Edge', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSKOSsHGKU_utyt-R6cCW6khUz_TvRzd2tdy2WOlUoDZtxRLZY5xWwxty1Muzr4FCP2N5GmS-siywf7Xl1o7FVhoySCzY/256fx192f', rarity: 'restricted' },
        { name: 'USP-S | Royal Blue', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSKOmsB2mUyOl5j_R6Xxa_nBovp3OAzNv6d3yVbVBxAsNzReNZuxK8kIHnNurj4wTaiNlBnH6q3CMYv3po_a9cBsy26Gzj/256fx192f', rarity: 'industrial' },
        { name: 'USP-S | Blood Tiger', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSKOmsHGKU1edxtfNWQyC0nQlptWWEzd-qd3mVbgR2WZYiFuUMtUG7x4HhYeLhs1fZiN1DnC6viH4Y7TErvbgp6HjWjQ/256fx192f', rarity: 'milspec' },
        { name: 'USP-S | Overgrowth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSKOmsHW6VxutJsvNoWSaMmRQguynLytyqdy2eaVUgAsB0QeIIsxfuldy2MO3gtFSI2ooRzSiq3HxA7SlvtfFCD_RGjmYWyQ/256fx192f', rarity: 'restricted' },
        { name: 'USP-S | Night Ops', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSKOmsGGaCyO13ve5WQSC0nQkYvzSCkpu3cy-RbFciDJUlQ7Rc4xW6l4DuNLzi4gPdg41NzX6r3H8d7y5q5epTAr1lpPPHAcmmJQ/256fx192f', rarity: 'milspec' },
        { name: 'USP-S | Para Green', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSM_-sBW-RyudJt_NsSieMmRQguynLw9erJynFawZ0XMd0FLVZ5he4lIe0Puvq4gDfi9oQyy3_j3gd6Hw65PFCD_QfWpQsfw/256fx192f', rarity: 'industrial' },
        { name: 'USP-S | Whiteout', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSM_-sGW-Z1et5pfVWXSCjgRQjtgKJk4jxNWXCbQQpCJF1QLINsUbrlofgNunj5lSLg4sXnCT8jS5Oun445O8CUqUt5OSJ2Dgwztii/256fx192f', rarity: 'classified' },
        { name: 'USP-S | Royal Guard', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSM_-WMWWc1OtJse9tcC68mRkYvzSCkpu3dymfbAUmWJAkQ-AI40Oxx9ezMrvl5gyLj41Nn3n6iHlKvXk9trpXUr1lpPMve4WI8Q/256fx192f', rarity: 'restricted' },
        { name: 'USP-S | Sleeping Potion', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSM_-WMXeF0_56td5lRi67gVMh4D-Gn4qheH6RPFIoCcAhELVf5kK-xNexMe_rtFfai45EnC_8iH9I8G81tAH9GDu2/256fx192f', rarity: 'restricted' },
        { name: 'USP-S | Tropical Breeze', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSM_-WMXOCzv5_s-BlcCW6khUz_WqBz9avIyiRbAQiApB1E-dZsEK7ld3gZuPqtFHbiYtMnyn9hn5Avy51o7FVuRzLF34/256fx192f', rarity: 'milspec' },
        { name: 'USP-S | Ancient Visions', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSM-CsD2mTyOt4pN5rXSC0nQkYvzSCkpu3eHiSOAB0DsMkTOcJtRjtwNG1ZOvq4wDe2t1AzCuojy1JvSpp4ewKVr1lpPOm90TY1A/256fx192f', rarity: 'restricted' },
        { name: 'USP-S | Pathfinder', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSM-CsAmaS2Px_vvVhHRa_nBovp3PQzImpJHuTa1InCsEhF-cDsxjplIGxN7nqtlfdgotHyy6viylN6Sxj_a9cBrrpg9X-/256fx192f', rarity: 'industrial' },
        { name: 'USP-S | Forest Leaves', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSM-CsAmKR1-tlj-1gSCGn2xgh5W3Rwo2gcH6eP1IhWcYmTeYO4xTsw9TmY-mx5Q3a3ogQmSqsiCtXrnE8utrnVdI/256fx192f', rarity: 'industrial' },
        { name: 'USP-S | Check Engine', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSM-CsA2KDydFlsedsWzChkBkYvzSCkpu3Iy6RbQYnXJZ2F7QN4UPqkIfmNeni5laNit1Dyiz42C5JvCdo57xQA71lpPMz6iO7bg/256fx192f', rarity: 'milspec' },
        { name: 'USP-S | 27', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODMWGZxOJyj_JnTiK2qhEutDWR1Nf8dSieZlciX5skF-INsRe_l9HuMurn5QDZ2tgTnyT82ysduHo_tekcEf1yefDz68I/256fx192f', rarity: 'milspec' },
        { name: 'USP-S | PC-GRN', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODHViS0_titedmXSq2qho1tjiLpYPwJiPTcFcoCpV2F-Nc4xXpwNPhZeLg5AffiIxNynj2jylP53xp6ugHU6Ig__XJz1aWMWkGKhU/256fx192f', rarity: 'milspec' },
        { name: 'USP-S | Jawbreaker', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODHViUzulxqd5lRi67gVMl62nUyd2scnOVPAcgA5J2TOFY5xLrlN22YbzgsQaI2IlHyiWojnwa8G81tErOD-_J/256fx192f', rarity: 'classified' },
        { name: 'USP-S | Silent Shot', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODHViDyOJzvvVWTSaqqhEutDWR1Nf8cn_CPAQmW8Z5Ee8P4UbuxILmMLu3tAXYj4hByyWsjCscvy89sOYcEf1yCvXTIoM/256fx192f', rarity: 'milspec' }
    ],
    snipers: [
        { name: 'AWP | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_CNk7uW-V6JsJPWsAm6Xyfo45-c5GXDnwB534DuEwtuoIHOfaAYiAsYjF-QItUaxmoC0MO_h5ALcjJUFk3sEzfdk4w/256fx192f', rarity: 'covert' },
        { name: 'AWP | Man-o\'-war', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k7uW-V6NhL-KKMWuZxuZi_uM5HXG3xhh_t2iBnI2ucn3EZwEjDpJ0Q-dY5EPrxNTiYevj7gXa2IhbjXKpQIFOiXU/256fx192f', rarity: 'covert' },
        { name: 'AWP | PAW', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k7uW-V7RsN-CSGVicyOl-pK84Tn-3xkgltWWGnI39c3LDaA4lD5V0QO8It0LqktfuMOrq7gDajYJG02yg2bUm5WIV/256fx192f', rarity: 'restricted' },
        { name: 'AWP | Graphite', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k7OC7ZbRhJc-RHGaGztF6ueZhW2e2k0l2sW_WzN7_cS6SbgV1CsF3TOEI4EOwloGzNLzg5g3fiIpHxC78kGoXuTqeOjwH/256fx192f', rarity: 'classified' },
        { name: 'AWP | Lightning Strike', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k4_upYLBjKf6UMWaH0dF6ueZhW2frwU1_sW2EmNyvc32RZwMpCpcjQ-EJ4xbtmt3gYezk4wzb3tpAy3mrkGoXubsGIfVN/256fx192f', rarity: 'covert' },
        { name: 'AWP | Silk Tiger', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k-_upbbZ-H_KfG2KvzedxuPUnTXywkU1x4DvXztz_dH2WZlQkXMEhFrFY5BDrm9HhMurq4AfdiYxAnDK-0H0fPMTeBA/256fx192f', rarity: 'classified' },
        { name: 'AWP | Worm God', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DNk7uW-V7B6Kf6WMWuZxuZi_uRoGH3iw0wh4j7cnt6ucSqSZwUkCMB5TLIPsES_kNbuYeOwtgXai4NbjXKpZ4kj0o0/256fx192f', rarity: 'restricted' },
        { name: 'AWP | Ice Coaled', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0PutbZtuL_GfC2OvzedxuPUnS3u3wR8lsTzTn4qqcXuXOlQmCpUiQOdYtUG_ltXgP-u04wWL3Y9NnjK-0H2dw8uldQ/256fx192f', rarity: 'classified' },
        { name: 'AWP | LongDog', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0P6hZqNpL_esAm6Xyfo44rNtFi_kxhx-4WvWnImoJ3mTblJzDJFzR-QP4EK4m9XjZbvk7lCLiZUFk3u2JoT1UA/256fx192f', rarity: 'covert' },
        { name: 'AWP | Printstream', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0OK8Yap5M-SBC2ad_uJ_t-l9AX_qlk4k5GyAzo6ocC-QZgZxX8AjEbZY5xnrxtPjM7vnsgGIj9oTmXngznQeg3pfcPs/256fx192f', rarity: 'covert' },
        { name: 'AWP | Queen\'s Gambit', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0OO7baFjM8-UD2qSyPpJvOhuRz39kUpw42zWntiteSiVaQYhCJJzEeIOukSwl4XmPrmw4VHXjtpExC_33zQJsHjNnJgjQA/256fx192f', rarity: 'covert' },
        { name: 'AWP | Chrome Cannon', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0OarZbRoMvWXMWuZxuZi_uM6SXngxR5-smTXw4ugIi6RbVcpXsN1ELUDtxPrktOyNL7h4g2P2tpbjXKpKIbjbD4/256fx192f', rarity: 'covert' },
        { name: 'AWP | Asiimov', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6V-Kf2cGFidxOp_pewnF3nhxEt0sGnSzN76dH3GOg9xC8FyEORftRe-x9PuYurq71bW3d8UnjK-0H0YSTpMGQ/256fx192f', rarity: 'covert' },
        { name: 'AWP | Chromatic Aberration', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6dlMv-eD1iAyOB9j-1gSCGn2x50tT_Tm9f4cXORPA4oWJckFOMLtha_x9e1Nu-35QfbjYtHyiythitXrnE8ylr09zg/256fx192f', rarity: 'covert' },
        { name: 'AWP | Redline', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6diIuKSMWuZxuZi_rUxHS3lzUwm5DjWy976dSiRagd1WJB1RLQP4RK-mtazM-3itQeL2INbjXKpw2eVIZ0/256fx192f', rarity: 'classified' },
        { name: 'AWP | Oni Taiji', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6xsLv6KD1icyOl-pK9vGCqwkx524G_WnNmsInyXOAVyXJJ0TbNb5EOxxIflYbzj4gDdiNlC02yg2XaKgrAq/256fx192f', rarity: 'covert' },
        { name: 'AWP | Hyper Beast', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6x0MPWBMWWVwP1ij-1gSCGn20pxtm_WzNuoeHKeaFAnCZUiTe5bt0HqxofmZOrm5Q2IjoMQzS_5iShXrnE8NzWs__c/256fx192f', rarity: 'covert' },
        { name: 'AWP | Elite Build', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6lsM-SWHH6vzedxuPUnSnHmk0Qh4G6HmN-scXmSaQRxXJpwRuZYsxTqxtTnM7nl4gTW2dlFyjK-0H0d8XeEBg/256fx192f', rarity: 'classified' },
        { name: 'AWP | Neo-Noir', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6poL_6cB3WvzedxuPUnHirrxR4l423SyI39I3KXPwdxWZclQeNZ5EXskYfnNeyw71OMi9lNzDK-0H3r66pOTw/256fx192f', rarity: 'covert' },
        { name: 'AWP | Fever Dream', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7R-OfObAXeR1eZJvOhuRz39kE1w4jiAzNiod3qTOgcgXpAlQ-ML5hjqxtHjZOrrtlHWit9EyCj9iDQJsHhCZP-wUg/256fx192f', rarity: 'classified' },
        { name: 'AWP | Capillary', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JoKf6sAm6Xyfo44bE5HSrmlx5z4GTUzt__I3yebQAgA8R3FuFfsBTqx9W2Y7vq5lbfjZUFk3ugIlCuqg/256fx192f', rarity: 'milspec' },
        { name: 'AWP | Atheris', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JkMPWBMWuZxuZi_rZsS3zgzU8isW3dnIr6eHKfPVAhDpojEe9YsUW4xta1Nuzm5FDci4NbjXKpmWVQppo/256fx192f', rarity: 'restricted' },
        { name: 'AWP | Containment Breach', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JkMuWAMWuZxuZi_rQ6SXq1xURysj_Vw4uhJHOVPQ8oCZt4QrRbtRi6ldPlPu_g4FHaiYNbjXKpcPI_17A/256fx192f', rarity: 'covert' },
        { name: 'AWP | Wildfire', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7NkLPSVB3WV_uJ_t-l9AX7rxhl-tmzSwomtdC6TPwQnW5UkR-YD5kK-ltCzP-Ox4FfXiNoQyyrgznQeu9L0PzQ/256fx192f', rarity: 'covert' },
        { name: 'AWP | Corticera', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk6fO4bahsH_GEHlicyOl-pK8xTSzqwU1-5jjWno6hJHyeOg91A5R2TOEOtRS-kIG2ZeO25lDYg90U02yg2USK57Qn/256fx192f', rarity: 'classified' },
        { name: 'AWP | Dragon Lore', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk4veqYaF7IfysCnWRxuF4j-B-Xxa_nBovp3Pdwtj9cC_GaAd0DZdwQu9fuhS4kNy0NePntVTbjYpCyyT_3CgY5i9j_a9cBkcCWUKV/256fx192f', rarity: 'covert' },
        { name: 'AWP | Medusa', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk4veqfbdsH_GEHlicyOl-pK85TC23wk12tWSGnNr6JXqRPVUnA5J5RLIKshS-l4HuYbji7lfajdgU02yg2bOcOBD3/256fx192f', rarity: 'covert' },
        { name: 'AWP | Crakow!', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk4OSrerRsM-OsDXWRyuFhj-B-Xxa_nBovp3OAyd34cC2VOgUoCZYmF7UCthm_kdGyMry05wHa3t0XxH_23XhP7y9q_a9cBncOjtH9/256fx192f', rarity: 'classified' },
        { name: 'AWP | Green Energy', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jde0Pi7ZbRSLPmdC1icyOl-pK8wTCzlxkl_tm7Vz9j6cnLEOA91C5siTOBYsRWwxtC2MOzj5g2I3Y4W02yg2VFgswq6/256fx192f', rarity: 'classified' },
        { name: 'AWP | Mortis', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6BoIeSbMWuZxuZi_rNtHiuwwRwismWEnNn8JymSZgUiDpd3Ru9ZsxG-xNy2NLzn41DWg41bjXKp5oOAt0A/256fx192f', rarity: 'classified' },
        { name: 'AWP | The Prince', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6FjIf2WAlicyOl-pK9qHXHkw093sGvTw4uqJSnDPQAkCsNyEbZcshiwxtK0Yumz4gbX2o9C02yg2f5NtC8l/256fx192f', rarity: 'covert' },
        { name: 'AWP | Exoskeleton', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6F1L-OYC2uV1eF4j-1gSCGn20km5zyEmd2qc3uWZwcnA5MiELIJtxa_w9OyN-nh5wKKj4kTyn78hyNXrnE83OTew2I/256fx192f', rarity: 'restricted' },
        { name: 'AWP | Gungnir', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6N4LvedB3WvzedxuPUnHnjnzUl0sWrdztitI3rDZgJzAsZ1QOFY4UPqldDgMO_l41HXit9AmTK-0H227dAsvQ/256fx192f', rarity: 'covert' },
        { name: 'AWP | Desert Hydra', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6x0JOKSMWuZxuZi_uA7Syu2w0Ry4mqGzYypeH3DaAEnCpt0FuAK4RjrkoDgMb7mtFfcit5bjXKpX4RFZcA/256fx192f', rarity: 'covert' },
        { name: 'AWP | Duality', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6hkLfKcMXSewOVzj-1gSCGn20p_62-HnN7_cH-XblQjDZYhR-FZsETqmoXjYry2s1DX3d5AyyT62ipXrnE8bpg5yZk/256fx192f', rarity: 'classified' },
        { name: 'AWP | Phobos', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V7RlL_KcHVicyOl-pK84GXHmwk115D6GzdqudHyUbwRxW5R3ROZbtEG8wYDiY7-x5VOKgotB02yg2bdJjfAf/256fx192f', rarity: 'restricted' },
        { name: 'AWP | Black Nile', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V7d5Mv-dC1icyOl-pK89Gyvhlhsit2-BwoyrICmWPQcmDpEkQOdeskOxwNKzN7vm4VeP2oMR02yg2Z2CmmVC/256fx192f', rarity: 'milspec' },
        { name: 'AWP | CMYK', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk5vyqbbRoLvSWMWaH0dF6ueZhW2e1zElxtmzQmIv8J3qQalRzW5t0RrYOsBCwlte2Mbmw5AbXiYlAnnn4kGoXuYBQOb0Q/256fx192f', rarity: 'covert' },
        { name: 'AWP | BOOM', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk7f6vZZt-Kf2DAmKvzedxuPUnTX7mkxhy62iDzYqhdiqXbw4oWZEkE-IDsRa9lIXlMejktFOMi49MmDK-0H2AgUnw_w/256fx192f', rarity: 'classified' },
        { name: 'AWP | Pink DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk6_a-abBSMPmdBVicyOl-pK9qHXC2zUpz5DiBn9arJCmXOFd0DZpxQOUDtBC6wNK0MOzl4wXWjYpG02yg2c9nQ1pb/256fx192f', rarity: 'restricted' },
        { name: 'AWP | Electric Hive', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk5_u4bZthKfebGinElLtytLVtG362x05wsWyByt2scHrGOgd1WZJ1ROBc4xi_ld3gNO7g-UWA3Kwc2RVq/256fx192f', rarity: 'classified' },
        { name: 'AWP | Acheron', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk4eetZKFsMs-ABXKczf1JouRtTSWmkCIrujqNjsH4eC-ROFMkDccjR7EDsBCxlN2xZu7jtlaNj4pMxSr8hiIc53tt67kHT-N7rafi4HxI/256fx192f', rarity: 'milspec' },
        { name: 'AWP | Pit Viper', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk_PyvY6F-K_mdMWuZxuZi_rQ_GS3mxRwk4jvTyNv6eC-RPQV1W5AlTOZb4xLtw9fuNriw51Hd3otbjXKp4cSTTIs/256fx192f', rarity: 'restricted' },
        { name: 'AWP | POP AWP', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk-_etYKpiN_GBMXWHw9F6ueZhW2fikxgjtmjTzd-ucXOXbgEiCZN1QOcKtka_l9PgY7jrswbe2t5NyC_6kGoXuXrlRr9k/256fx192f', rarity: 'restricted' },
        { name: 'AWP | Arsenic Spill', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk-fO8YadsLf-sHW6d0eJzj_hsQyW8giIrujqNjsH8eS2ePANxXJN3Q-NbtxDtkNexMeri5lfd3doTnij7hiJMuy5jtutQT-N7rTqLZycV/256fx192f', rarity: 'milspec' },
        { name: 'AWP | Sun in Leo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk9f2qYaVucs-fB2CY1aAnteVqHCzgkRsh4TnXyY2vIH-QaVcpA5F3TOdct0S_wNO0Zri05wbXlcsbmn9hB4gb/256fx192f', rarity: 'industrial' },
        { name: 'AWP | Exothermic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Tte0PSneqF6L-KYMXeR1e1-tfJWQyC0nQlp4W7Xzd-qcH_DO1N0W5FzQuEP5kW8ltfnM-q24wzYgt0RmC_7jSlL5jErvbgX7dER8Q/256fx192f', rarity: 'restricted' },
        { name: 'AWP | The End', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf7i1e0PC5V7BlJc-WAGOvwPlmj-1gSCGn20hytjzSy4r_cy_FZlB1DJdxE7QN50bql4LuNL7g4gTYj9lGnir9iyJXrnE8dWNkiOM/256fx192f', rarity: 'classified' },
        { name: 'AWP | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf7jJk4ve9YJt5If6sAm6Xyfo45uU7HS_nzU914z_dzImtdXyQZlMjCJIkFOUI5ES9k9PkPriz71bdiJUFk3tlgygeXw/256fx192f', rarity: 'industrial' },
        { name: 'AWP | Snake Camo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf7jJk_PyvY6FSLPmUBnPexb10sbk8HXixk09-smqEyIytci7GPwFxCZt0RLMLtBG4xNHuPr-3tRue1dy_ONei3w/256fx192f', rarity: 'milspec' },
        { name: 'G3SG1 | Ancient Ritual', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1a4s2vZqdkJf6HMXCZz-tJvOhuRz39zE5ysWjSyterJX-VZ1UgX8EhTeVf5EOxlN3jYemwsw3WjtgQzi7-2zQJsHjSk9PLGw/256fx192f', rarity: 'industrial' },
        { name: 'G3SG1 | Murky', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1a4s2pO7dqcc-eG3Wb2NF6ueZhW2e2wE5y6juDy46uJ3qePVR1C5BzR7UO4xa9ldXlYuK07wSP2dlMzin6kGoXucw3wj8l/256fx192f', rarity: 'milspec' },
        { name: 'G3SG1 | Violet Murano', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1a4s2jfbZsLv-sGG6fzetij-1gSCGn2050tmuDn9v8JXmXPwclD5txROII40G-l9S1Mb-04lGIit5Mm3qt2HtXrnE8WK3_Jks/256fx192f', rarity: 'milspec' },
        { name: 'G3SG1 | Chronos', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1Y-s2tYLZiLv-AMWDD0uknj-1gSCGn20R1sG3dyt2qdyiWbwB2A8R0QeJcska6x9znNurrsgWNjooWxX37iyhXrnE8dtReaHc/256fx192f', rarity: 'restricted' },
        { name: 'G3SG1 | Black Sand', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1Y-s2pO7dqcc-RAmaTyv13vuVWQyC0nQlp4miGytahcSiTZ1J0DZZ1ELYDskO7mtfjMujn5gbajYlGyS38jywY6jErvbjKP5Wfiw/256fx192f', rarity: 'milspec' },
        { name: 'G3SG1 | The Executioner', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1Y-s2pO7dqcc-WFmKT1Pp_v-9sXRa_nBovp3PXmdyseC3DOFN1DJZ1TeIOtEKxmoG2PuKwsgOPgoxGzyr7jnhPvXlq_a9cBnGZIRC4/256fx192f', rarity: 'classified' },
        { name: 'G3SG1 | Dream Glade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1Y-s2pO7dqcc-UAmaUxNF6ueZhW2e3wkl162TVmdqvd3mUPw9yDJZ4FOYJ4UKxkNfiNrvn4QCMjdlHmHj6kGoXub9gXKkW/256fx192f', rarity: 'restricted' },
        { name: 'G3SG1 | Keeping Tabs', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1Y-s2pO7dqcc-HD2SEyO13vOxoXxa_nBovp3OHzouqcHqRZwBxDcd2EOUDskXtl4DmYevi4FGLg4tDz3n4iylB6Xw9_a9cBgS1m-61/256fx192f', rarity: 'milspec' },
        { name: 'G3SG1 | High Seas', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-RG2STwOBztfNWQyC0nQlp4j7Syt-rdHPEOAIjCpV5TLQK40K5wdLjY-_r7wfeio1AySiriCIf6DErvbj1Mwus0A/256fx192f', rarity: 'restricted' },
        { name: 'G3SG1 | Hunter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-QC3OdxNFkteV8Vxa_nBovp3Pdw9arJCrCP1N1DZFyR7EDskO4wd3mYr_ltVHa2oNNziWshn5Nunlp_a9cBi4_3bmx/256fx192f', rarity: 'milspec' },
        { name: 'G3SG1 | Digital Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-XB3SC1P5ij-1gSCGn20wh4m-By9-qIC7COA8jWcNxRuUPshe6kNfnYe62tQ2K2NpHmXj2iC9XrnE82YBIy5I/256fx192f', rarity: 'milspec' },
        { name: 'G3SG1 | Flux', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-VAnKI_v5jovFlSha_nBovp3ODz9uoc3vGOgMmApp3QrFe5xftm9bjNOm24Afb3YlBn3mqjS8dvy1p_a9cBmtTF-_C/256fx192f', rarity: 'classified' },
        { name: 'G3SG1 | Scavenger', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-AD3GRxutJvOhuRz39xkl2tziGmNf9JX-WPQcpAsEiQOUNsBixx4bmN7nj5FHb3Y9Cyiz-hzQJsHglCU9Y5w/256fx192f', rarity: 'restricted' },
        { name: 'G3SG1 | Ventilator', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-FC2mEyOJ3pO57cCW6khUz_W_Rwo36cC6SagZzDZZyQbMN5kTtwNC0Mb60sg3cjo8UnHn4j3hPuid1o7FVSaKTKS0/256fx192f', rarity: 'milspec' },
        { name: 'G3SG1 | Stinger', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-FB3eV09Fvte1lQD6MmRQguynLyo6rdH-RPAZ0D8chQeIL50TukdK2P-_rtFPejN8WmH34jylJvHtq5fFCD_TvHmnxYA/256fx192f', rarity: 'restricted' },
        { name: 'G3SG1 | Polar Camo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1T9s2veqd5KfOsDWie1fx3o_VWQyC0nQlp5D7Xn9n6cn2UP1IoCMF0ROYO4xnsldK1Nbnh5AGM2olDyy-siXwfuzErvbiZGyPTng/256fx192f', rarity: 'consumer' },
        { name: 'G3SG1 | Arctic Camo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1T9s2veqd5KfOsAm6Xyfo4s7BsFyyxzUlw5j6BmNn6In-QZw8pA8MiQuBYuha9mtLvZengtlGIjpUFk3s2Ceep5Q/256fx192f', rarity: 'industrial' },
        { name: 'G3SG1 | Demeter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1T9s2sZLFoMP-fF2Cfz9F0ouB_QBa_nBovp3OEnoz4cHnFZgMnD5R5TeQP40Swx4XgNLm34g3ei49FxC2qiXgbuy9t_a9cBh-mV6Cr/256fx192f', rarity: 'milspec' },
        { name: 'G3SG1 | Desert Storm', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1T9s2qbbdoMuSsAm6Xyfo45bU5S3i1wR5w5DnUyt6tIyqVOAEkCccjQ7Nb4RbslYayPr7i4FGPjpUFk3uqKe2F9w/256fx192f', rarity: 'consumer' },
        { name: 'G3SG1 | Orange Kimono', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1T9s2lYaliLv-sCm6RzOF4tPJWQDuymxoijDGMnYftby6RPwN1DZQmTbYL5kO9mt2zN-3j4wSKjdpDmy2tjCNN6ik45ewAAKs7uvqAyDUCDXE/256fx192f', rarity: 'consumer' },
        { name: 'G3SG1 | VariCamo', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1T9s24abZkI_GeAVicyOl-pK9qTn7gwUlwsWrVzd2sci3GZ1cnDpF0TeNe5kG9mt21Mrzq4VPYjdhA02yg2WVbe73u/256fx192f', rarity: 'industrial' },
        { name: 'G3SG1 | Green Apple', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1I4M2peqFoLs-fB2CY1aBzs7g4SXC2zRgjsWuBmdmtdiifagMhWZUlEeEP5BG9ktG2Pu-w4QSMlcsbmpnYc5LS/256fx192f', rarity: 'industrial' },
        { name: 'G3SG1 | Contractor', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1I4M2-ZadSLPmUBnPelOwj47A4GCyywEgl52_TmNyuJH2XOgJzX5UlQeUCsBS9m9bhP-rq4Rue1dx74w5z0g/256fx192f', rarity: 'consumer' },
        { name: 'G3SG1 | Red Jasper', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1I4P2Rb_d-J6GsGmidwPp5j-1gSCGn20Ql62_Tztz8dymWPwYoXpYjQ-8Ds0TpmoHnYbzh51aKjYhBzXn23CpXrnE8L3fMNjQ/256fx192f', rarity: 'consumer' },
        { name: 'G3SG1 | Orange Crash', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1I_82pO7dqcc-eB2uZ1ed3v_NoQS62qhEutDWR1Iv_IC2eZgUkA5Z0RbEL5BLqw9flMby2swba34JBnHr22CMd5i1r67ocEf1y0mrzb0E/256fx192f', rarity: 'milspec' },
        { name: 'G3SG1 | Green Cell', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1I_82lYKVmKc-QD2qf_uJ_t-l9AXi3whgm4WjczNageHzCZgRyDcchRu8Ls0W5l922N7jhsgyMjYpAzS7gznQe2xurqq8/256fx192f', rarity: 'consumer' },
        { name: 'G3SG1 | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1I_82jbbdlH-SSAFicyOl-pK8-Tn3qwkgi5j7Wm9z7dy6fbFMoWcZ0RucOshK5l4DkZr_l5ACNgtpM02yg2YL7CXWd/256fx192f', rarity: 'consumer' },
        { name: 'G3SG1 | New Roots', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1I_82jZ7ZiH_OSHHGZz-lJvOhuRz2xmQgijDGMnYftby2eOgEiDsMmReUDs0G5m4fhM7zm4ADY2d9FzyT_33kfvylp4utQV6E7uvqAlSn4mj4/256fx192f', rarity: 'milspec' },
        { name: 'G3SG1 | Jungle Dashed', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1I_826abRoH-ObAXWE_uRjvuZlSha_nBovp3PRz92tJSrFOw4oAsYmFucLsxaxkdfiNejj5gPX349BmXmqhnlPun5i_a9cBim8k1Zw/256fx192f', rarity: 'consumer' },
        { name: 'G3SG1 | Azure Zebra', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1I_820baZ_IfOSA1iSzftzj-1gSCGn20tz6jjXnN-pJSiUOAIlD5FyR-FYuhbtwdSyMb_l4VPajI1FyCSo2iJXrnE87owZcUA/256fx192f', rarity: 'milspec' },
        { name: 'SCAR-20 | Army Sheen', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk7v-RabZgOc-ABm6exNF6ueZhW2fhzU9-sGrRn9j_d3_DPwVzWMAiQrUI4RGwltGxNOmwtA3Z3Y1Dyyn3kGoXuRBHX853/256fx192f', rarity: 'consumer' },
        { name: 'SCAR-20 | Carbon Fiber', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk7v-Ra6V_Iv-dMWGZw-tkj-1gSCGn20xx4mXRyd79eHPBbgQiXJpyQrMLuhfqm4LkNu7htQWI2d9CzSX9jShXrnE8-xTDFeg/256fx192f', rarity: 'industrial' },
        { name: 'SCAR-20 | Emerald', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk7vyRbaloMvGfCliS0-9gv95lRi67gVMh5WuDyY2qeH7CbQ8jDMR0RuQDuhOwxtCzZL_ksVTe3otByyz3inkY8G81tKuEs31W/256fx192f', rarity: 'restricted' },
        { name: 'SCAR-20 | Brass', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk7uORarZsM-OsAm6Xyfo457MwH3zlzEwh6mXWw9qpdniQO1MmCJZ5QeBe5xa5wdfvZO234lOI3pUFk3uBClMh1w/256fx192f', rarity: 'milspec' },
        { name: 'SCAR-20 | Grotto', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk7uORe6dsMqLDMWuVwOVJvOhuRz39zRtx62uGm9z8JHnFaFR0AsAjRuQI40Sww9HvNunqtQTego5MmSX4izQJsHiOao_ijg/256fx192f', rarity: 'milspec' },
        { name: 'SCAR-20 | Blueprint', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk7OeRaqh4JeCBB2mE_v11sfNWQyC0nQlp4jvQn92oJX-VaVIgW5QkQuYM5kLswNTnNL-w4QaK2YNFmXqqjSxJuzErvbi8Z0332w/256fx192f', rarity: 'milspec' },
        { name: 'SCAR-20 | Wild Berry', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk7OeRa6xoNuKcAFiDwu9k4rFWQyC0nQlpsmnTyNf8dy-fZlIoDZd1F7MI4xbuw4e0NLm0sgaP3tpNn37_h3gf6jErvbhxX_RFLw/256fx192f', rarity: 'milspec' },
        { name: 'SCAR-20 | Cardiac', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk7OeRe6dsMqLDMW6e1etkpuRnWyC8myIrujqNjsH9cniTaFApD5R0F7EJsUG_k9bjM-3n4gLY3opBzCio3yxK5io55OdXT-N7rWZZlsYh/256fx192f', rarity: 'classified' },
        { name: 'SCAR-20 | Assault', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk7OeRe6dsMs-SHXSR1OJij-1gSCGn2xxw5GzWnNutdnKXagRxCMZ5TbYKtBbrl9WxPu7g5A2Ljt1HmXj5iSNXrnE819YWtjs/256fx192f', rarity: 'milspec' },
        { name: 'SCAR-20 | Cyrex', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk7OeRe6dsMs-QF3WV2dF6ueZhW2fgzUR_52nUzYugICnCPVImApYkRO8NtkLtw4a1Nbzn7lSN2oITnCr5kGoXuXXxbesR/256fx192f', rarity: 'classified' },
        { name: 'SCAR-20 | Bloodsport', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk6OGRe6dsMqLDMWWczuFyo_FmXT2MmRQguynLnoqrcHPCaFdzDMF5F-8P4Bbum9fkYuvrsVffjI5AyS75inlL5ixjsvFCD_R20nqesQ/256fx192f', rarity: 'classified' },
        { name: 'SCAR-20 | Enforcer', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk6OGRe6dsMqLDMWKex-Fks-R7cCW6khUz_TmEn4qudiqVPVB0X5t3QbEN4ELqxNHlY-O27gCLg9oXmyqsjCtN73x1o7FVEvhkFhM/256fx192f', rarity: 'restricted' },
        { name: 'SCAR-20 | Green Marine', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk6OGRe6dsMqLDMXeVwO1zveBiSjvjxiIrujqNjsH6IymVbQEmCZoiQ-MC5kbrwN3kPuy24lDa2YsQmy2t2iof7Hs56uxQT-N7rTkENKOY/256fx192f', rarity: 'milspec' },
        { name: 'SCAR-20 | Powercore', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk6OGRe6dsMqLDMXef1utks-57Sha_nBovp3OAzd2qIy_DPVMkXMEiE7UL5ES-l9yyP76wswWP3Y1Nyyn2i35L6S5s_a9cBj_cXeyl/256fx192f', rarity: 'restricted' },
        { name: 'SCAR-20 | Fragments', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk6OGRe6dsMs-VHGaXzOt4pPJWTSWylhYYvzSCkpu3dnmXbAZyX5pzQLQO4Ri_lIbgMOzktg2P3t8Uni32iHwc7i856r1UAL1lpPP6-FL_6g/256fx192f', rarity: 'milspec' },
        { name: 'SCAR-20 | Magna Carta', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk5-uRabF5KP-BB3OJ_v5jovFlSha_nBovp3PVzdr8cHnBbAcnXsAmR-UOsRHsktTmYb_ns1CNg4JCzSX_iiNKvS0__a9cBnHoQ9ul/256fx192f', rarity: 'milspec' },
        { name: 'SCAR-20 | Stone Mosaico', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk5-uRa6VjIfyAMXOZzetJvOhuRz39wk4m5TvWn474dyqWagcjCpZ2TeAPtxO8kYLnZezg5QbaitpGyyWrjTQJsHihs7k2tg/256fx192f', rarity: 'consumer' },
        { name: 'SCAR-20 | Splash Jam', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk5-uRYLFjNPWBMWWcwPRzj_FgQSKMmRQguynLmYn6J3rCPVQiCMZ1EbQIsRHql4a2Y7iw4QbZg48QxXj-hixB7ntvt_FCD_SAL_dw1Q/256fx192f', rarity: 'classified' },
        { name: 'SCAR-20 | Jungle Slipstream', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk5-uRe6dsMqLDMW2Fz-l6td56QyCjhgk1tjyIpYPwJiPTcFIgX5tyFOEJtxm_wdDkZOrq5gHcjIIRzyX_hiJP7io55O9WUKUgr_fJz1aWgsoiFrs/256fx192f', rarity: 'milspec' },
        { name: 'SCAR-20 | Outbreak', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk5-uRe6dsMqLDMW2Fz-l6tfNWQyC0nQlp5znXy9-vcXiWaA5yCMZ0ROUL5hXuwNfmY-_lsgSP2d0UzH-v3CtB7jErvbiWj5__Rg/256fx192f', rarity: 'milspec' },
        { name: 'SCAR-20 | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk5-uRf6FvM8-XD3WbxPxJvOhuRz39lEwhsGqBz9moJHmXawQhDsQhEOUNsBSwkdXiM-3k5AbZjo1MmSiojDQJsHiHhrZ4wA/256fx192f', rarity: 'milspec' },
        { name: 'SCAR-20 | Zinc', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk5-urV6dlMv-eC1iCyP5mvORWQyC0nQlpsD7Qydr6dSjEO1MnD5RzRuUIskPpl9zmN-7i5FbYj49NmXj4jXhP6TErvbhHIJnnmg/256fx192f', rarity: 'consumer' },
        { name: 'SCAR-20 | Trail Blazer', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk_PGvevY9H_aGHH6v1eFmv95lRi67gVN_5D6Bzo38cXOVOA52DZolReBbt0K5k9DvM-Pr4VHXjI9Enn6sjHkb8G81tIsMy8R0/256fx192f', rarity: 'milspec' },
        { name: 'SCAR-20 | Caged', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk_PGvept_JfaBD2SEyOF4j_c9cCW6khUz_W_SmNirdSmVOFcmDJEjQrEPtROwxtGyYevqsgPcg98RxXishi1Bui91o7FVKL5cNSg/256fx192f', rarity: 'milspec' },
        { name: 'SCAR-20 | Short Ochre', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk_P2RZbF-NPGBCliDwu9k4rFWQyC0nQlp4znSyo39dHifa1ciD8EjF-QCshmwxtKxY7_qsQze2olFyS-shyocvDErvbjS8vcY3w/256fx192f', rarity: 'consumer' },
        { name: 'SCAR-20 | Contractor', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk_P2ReKluH_yaCW-Ej7914-I_HHznx0lz4jmDwtaoJXOebgMlApt0EeJbt0W7xIG0Muzl5wTAy9USD_fgAo4/256fx192f', rarity: 'consumer' },
        { name: 'SCAR-20 | Storm', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk_P2Re7BiMv2VHGie1dF6ueZhW2fjxBgl5jyAntytc3ifO1AjXpslRLFft0PtxoXkMuKwslaPg49MmHj6kGoXuUn7n6Ef/256fx192f', rarity: 'consumer' },
        { name: 'SCAR-20 | Sand Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk_OKRZaF-KM-AD2mU_uJ_t-l9AXHhwxwi5zyDmIqoeCmWaAUhXpUiRrFZsBHsxNXvM-jl5lTdgotDySzgznQefYC7ilk/256fx192f', rarity: 'consumer' },
        { name: 'SCAR-20 | Palm', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk_OKReKVhLc-fB2CY1aAl6eM_GyuxlEh0tm6Eztj4dCiWbw92DppyTeYP4xDrkt3gZejn4ATZlcsbmiqh02Pr/256fx192f', rarity: 'industrial' },
        { name: 'SCAR-20 | Torn', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk_OKRe6dsMqLDMXSE0-d9tfNWSzyggSIrujqNjsH6eHiSOwZ0XsdxFrEIthfpx9W0Yuux4QDe34pFni-s3SpK7Hs6570KT-N7re2tWema/256fx192f', rarity: 'milspec' },
        { name: 'SCAR-20 | Poultrygeist', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk_OKRe6dsMs-QBm6Tyut4tuhuRz2MmRQguynLno2pdnnGOw9xWcFwEbMCtkHsmoXuNe23tVGNiINCyyv6iylJuyZi5_FCD_Tlwp1EIg/256fx192f', rarity: 'milspec' },
        { name: 'SSG 08 | Acid Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1a7s2oaaBoH_eBD3SDze94tN5lRi67gVN05G3QzI6pIn2UOAYhDJMjEeANsBbtlYC2ZbvltA2P2I5FyHmq2Hka8G81tCngBDgW/256fx192f', rarity: 'milspec' },
        { name: 'SSG 08 | Carbon Fiber', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1a4s2tabZvL_6sCG6SxPxJvOhuRz39kU9y4GvVyYygdniXaVd0DMckQ-dZtRK-moe0Murl5lHZgosUzSuv2DQJsHj4wzVBbg/256fx192f', rarity: 'industrial' },
        { name: 'SSG 08 | Threat Detected', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1a4s2nZrBoLPyaCWKewutJv_NoQS62qhEutDWR1ImuJy_BagUgDMR1ROVbthK6xofvNrnk5lHditpByCz3iC9M7Cdv4ekcEf1ytraGvsY/256fx192f', rarity: 'milspec' },
        { name: 'SSG 08 | Dark Water', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1a4s20baZ_Ic-XD3Wb_uJ_t-l9AXriwk1y6mqDyov9eXyTaAFzD5R4RrFYsRC4k9fhML7itQGPio9EyX_gznQeRZeU19w/256fx192f', rarity: 'milspec' },
        { name: 'SSG 08 | Abyss', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1a_s2ibbJkIeSbD2mvzedxuPUnH3_jzE1y4TvQyIr9JyieZlckCsRxF-8K50bsxN3gZOzktAzc2IJEzDK-0H1XlSI8xg/256fx192f', rarity: 'milspec' },
        { name: 'SSG 08 | Blood in the Water', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29YKV_K8-fB2CY1aAmsbFtFnDilkUl5j7UzoqsInmVaFd0XMMlELYDshbuxNPvP-yxtlCMlcsbmlWiixNl/256fx192f', rarity: 'covert' },
        { name: 'SSG 08 | Parallax', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-QBnWfzO9iueJWQyC0nQlp5G6AnNuhJXmeOAd2CsMjQOUMuxC-moHgNOzh5VPXjogRmyn_iSNI5zErvbhpsYYNZg/256fx192f', rarity: 'restricted' },
        { name: 'SSG 08 | Death\'s Head', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-XC2aEyf1-teBtcCW6khUz_WTXyNipeX-QOlQhXpJwFuYO4xLqxobuN7vn4QaNgthBnHn7iSJPv351o7FVSPuLyfc/256fx192f', rarity: 'restricted' },
        { name: 'SSG 08 | Dragonfire', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-XHGaXzuBwufNscDqwmg0ijDGMnYftbyrFPVAoWcQjELQOuxO4k4e1N-nnsQfW2I5Mz3ivi3wb7Stj5ukAUKY7uvqAqS55_Pw/256fx192f', rarity: 'covert' },
        { name: 'SSG 08 | Fever Dream', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-VC3GV09FyouRoQha_nBovp3PTmYmqJHmeb1N1CpJyFOZftkO8x9ezNOOztg2MjYwRyyWsjn4d7n1q_a9cBq7gpQcW/256fx192f', rarity: 'restricted' },
        { name: 'SSG 08 | Slashed', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-aA2qf0_p3vN5kSi26gBBp62XXyon_eHKXagYoC5ZwFLQNska7lIfiY-rgtVCN2IxExX_9h34buDErvbiGjEi-fQ/256fx192f', rarity: 'milspec' },
        { name: 'SSG 08 | Mainframe 001', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-eD26ex_x3veRWQyC0nQlptzjSntqgJS6Wbg5xDZVwTbUN5EO5ldWxYem04waP2IsUyX_5in4c6zErvbh54g-58w/256fx192f', rarity: 'milspec' },
        { name: 'SSG 08 | Necropos', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-dC2SCzv55o95lRi67gVN26m_VnomsdiqTZwB0W5R5E7UCuxe6lICyMO3i7lDWjt4XyHj_iypB8G81tA-y21Aw/256fx192f', rarity: 'milspec' },
        { name: 'SSG 08 | Death Strike', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-ADWiC0ed5vt5lRi67gVMh6jjTn9ygJSieaAEiAsB2F7Jfshe-xtHkPuvisQLXgt8UmCz523lM8G81tFON4mQ2/256fx192f', rarity: 'classified' },
        { name: 'SSG 08 | Big Iron', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-HC2SYz-d1se1gWzCMmRQguynLyYqqJSqQbAIiDMclTbYDtUKwlIfvP7jr4Fbcj4xGzir6jilJ6ils4PFCD_SOjD5UKQ/256fx192f', rarity: 'classified' },
        { name: 'SSG 08 | Bloodshot', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-HB2Sbzetkj-1gSCGn201wsjnUm9qrI3OXaAQnDsZwTbIDtxnpl9W0P7i35FfW3toTzC6q2ixXrnE8w4eIHZQ/256fx192f', rarity: 'classified' },
        { name: 'SSG 08 | Turbo Peek', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6NSL-aWHHORyutJvOhuRz39k01z62jTmIv6dC6WPQdzWJYiQLYL40K4koG1Ze-35wze3dpMnyz63TQJsHim_V6lkw/256fx192f', rarity: 'classified' },
        { name: 'SSG 08 | Azure Glyph', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1c_M29e6M9eM-SAHKSyP1JvOhuRz39xERwsT_Sn4r6eHmeOAAlCZBxFrEP4BbpxtyxYbji7g3dg4lAnH372jQJsHi7hX5I-w/256fx192f', rarity: 'industrial' },
        { name: 'SSG 08 | Ghost Crusader', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1c_M29e6M9eM-SHGqRwuFktd5lRi67gVN_6jnQzYmhc3jFbgUoA5J3ReYIsRO8ktGyM-iz4AaMi4hDzyqsiSJJ8G81tKe_wmAg/256fx192f', rarity: 'restricted' },
        { name: 'SSG 08 | Hand Brake', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1c_M29e6M9eM-QBmKTyutkj-1gSCGn2xtwtzzWmNagIH3CP1V2C5dxR7QLsES_m9PvY7nj4QPd2ohHy3r4hypXrnE8MesmkS4/256fx192f', rarity: 'milspec' },
        { name: 'SSG 08 | Zeno', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1c_PGmV75oLv-sHXSXkbZJvOhuRz39xhkitW-Hzduvc3zEPQJxWZMhR7NZ4xOwm9DjN7mx41GM2IoUzSmsijQJsHibvaeasA/256fx192f', rarity: 'milspec' },
        { name: 'SSG 08 | Calligrafaux', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1T-828baBSJfSUC3Svx-d4te1gQSyMmRQguynLwov6JHmRagd0WcBxQuYItxWxlYLgM--z4gDXjthGnnmqjXxAvSpqtfFCD_S8UR_TMg/256fx192f', rarity: 'industrial' },
        { name: 'SSG 08 | Halftone Whorl', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1T-829f61_LM-AHWDAmdF6ueZhW2e1lxxwsW3SnN-gIC6ea1cgDZdwQ7Fft0G5xoK2NOq241bfj9lCxX2tkGoXuc4PJZth/256fx192f', rarity: 'industrial' },
        { name: 'SSG 08 | Sea Calico', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1T9s2oZKt6JeKAMXSEzO9ks95lRi67gVMl5DuEm9ereCmVawImWZMhRLIDu0a7ktKzN7nq5lePi41Bn3r83H8b8G81tNArbz2X/256fx192f', rarity: 'restricted' },
        { name: 'SSG 08 | Mayan Dreams', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1T9s2jab1sLs-XHGKRzP1JsvNoWSaMmRQguynLytmqd3yQP1coCJR0QecK40TqkdHgMuvi5gDa3owRz3_72ilA6X1jsvFCD_TXuxrUgQ/256fx192f', rarity: 'industrial' },
        { name: 'SSG 08 | Orange Filigree', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1T9s28bapSL-KSAGCV_uJ_t-l9AXy3l093sjnSn9_6cnjBPAEhDMNwR-FbtEKwldzkM--05Afej4JGmSzgznQeBdxl634/256fx192f', rarity: 'milspec' },
        { name: 'SSG 08 | Detour', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1T9s29e6M9eM-eD3WbxPxJvOhuRz39lxsm6m_XmdugcnOXaFMlD5ImEbQP5kW4kICyM-vj5wXc2dkUzHqoiDQJsHjAk3eMVA/256fx192f', rarity: 'milspec' },
        { name: 'SSG 08 | Spring Twilly', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1T9s26eqVkLvGBDW-Z1et1pN5uXSy2myIrujqNjsGpeCjCOlMgWJZ0E7JfthfuktPmY-Pk7lON2Y5AyCr-iCtOuitr5O1RT-N7rXhDFbfv/256fx192f', rarity: 'milspec' },
        { name: 'SSG 08 | Sans Comic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1T9veRa6tgKfOsHW-R0etlj-1gSCGn20wl5W3VmImqcCmWOlAjXpolR-MP50Wwl9DmMOix5QXZ2d5EzSWqi3tXrnE8nx7Jn58/256fx192f', rarity: 'consumer' },
        { name: 'SSG 08 | Tiger Tear', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1T9veRfK1qJeLBMWuZxuZi_uVqFn3hzRsjt27Xz9z6dirEZgN0D5p4R-Jf4UPrl9XnMrzm7wCLjohbjXKpscqbOIY/256fx192f', rarity: 'industrial' },
        { name: 'SSG 08 | Green Ceramic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I4M2tbbZsLfmQMWCCxOt4j_J6SHnrqhEutDWR1Ir9cnvCZwN2X5IiEOQKtxDsxofnYu7k5ATeg4xCny-o2yNKuy0_5r4cEf1ysR10Fgo/256fx192f', rarity: 'consumer' },
        { name: 'SSG 08 | Blue Spruce', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I4M2jZ7d-H_yaCW-Ej7sl6OVsHXHizUQksGyDyNn7dH-WZgEgXJshFOdZskO6xoC1Y-LjtVDAy9US2YFh0PQ/256fx192f', rarity: 'consumer' },
        { name: 'SSG 08 | Red Stone', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I4M28fapoH-OHAWmV_uJ_t-l9AX_gkxl25W6AzIupcyqVagcjCJp4EeBctRHrx9KxMb6x5FONiotAnyXgznQeYtQapjc/256fx192f', rarity: 'consumer' },
        { name: 'SSG 08 | Sand Dune', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I4M29aappH_yaCW-Ej7wvsuJrHivilER-6j-EwtipIC-fald1DMcmEOYI4EW-lNOxY-u251bAy9US9tunUnw/256fx192f', rarity: 'consumer' },
        { name: 'SSG 08 | Grey Smoke', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I4PGmV6ZhL-KRMWWH_uJ_t-l9ASu1kBt_sD_dzN-pcX6ROlMgD5d5FuQP5hC4m4XlY-PkswbdjN8Xn3_gznQeOZ1jkG0/256fx192f', rarity: 'consumer' },
        { name: 'SSG 08 | Blush Pour', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I4P2Raad_OfyaDViWzeFhj_FgQSKMmRQguynLyY2rdHqWaAYgWJFyR-dZuxC-loLjMeixsgzXi4hGyyT4j3hOvHxu4fFCD_TyynIDEA/256fx192f', rarity: 'milspec' },
        { name: 'SSG 08 | Tropical Storm', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_82-aahgH-ObD2Of1tF6ueZhW2fhxU1ysDjWmdqvcHrGaw5xA8AkELUL5xa7ktLgZrjj5VPc2YsTxC3-kGoXuZdbLCna/256fx192f', rarity: 'industrial' },
        { name: 'SSG 08 | Lichen Dashed', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_829YKt_NM-HD3eV_uJ_t-l9AX3lkBh1smSAmNf7eH6VbVQoAsN1TbQC5xa-koXgM-zjswHf341EznrgznQepO2zZeE/256fx192f', rarity: 'consumer' },
        { name: 'SSG 08 | Jungle Dashed', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_826abRoH-ObAXWE_uRjvuZlSha_nBovp3PUz9-pcnuXPQMpCMZwQ-UM5xixmtGxN-7n4wWKiN5DySivhyxJ5ixj_a9cBvFEfbOR/256fx192f', rarity: 'consumer' },
        { name: 'SSG 08 | Prey', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_820baZ_IfOSA1iCxOpJvOhuRz39zBwmt2mAyI6rInrGaVd1X5N0Re8OshO5mtbvMr7q5wGIg95BmSX5ijQJsHiun1hzCg/256fx192f', rarity: 'consumer' },
        { name: 'SSG 08 | Memorial', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_PX-MJtvMuWHD2uZ0vpJvOhuRz39x0UlsWmEnt37IHyfaFAkWZR5RuALtRKxlYKxMLnn4leL3t5FmSv9ijQJsHj6GwByAQ/256fx192f', rarity: 'milspec' },
        { name: 'SSG 08 | Dezastre', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_PX-MJtpJeqSHXOCxNF6ueZhW2exwEp2tmmEw9epdCjCalQhX5ImQOZbtRixxNTgN-u24AHb2okTmX2vkGoXuacR7BX3/256fx192f', rarity: 'milspec' },
        { name: 'SSG 08 | Rapid Transit', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_PX-MJt5MvGdHW6E_vl-ufVscCW6khUz_WTSw479d3vDalIkCJNzFuIN4RHqw9K2P7nktQHf340Wyn-vh3wY7Sd1o7FV_lj0Yvg/256fx192f', rarity: 'restricted' }
    ],
    knives: [
        { name: 'Butterfly Knife | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2avx-9ytd5lRi67gVNwsDvSwtqqc3iXZg4kCZYjReYLtRbum9XgYuvm5wbWjtgUzCn3iSsf8G81tFEeH9rw/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2qvw-J3s-p5SiihmSIqsi-HlorwOy7DAVRPVssnHaMUuhe9xIHlMuvqtgPf2IoTyC383Sod7CY-sr4DVfZ2qKPU3g-TNuE-545DeqjFvb87vg/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Gamma Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2qvxONzouBlSxa-lA8lvziMgIr9HifOOV5kFJp2Ee9b4Rntm4GxY7_ntQHc2o1DmH6r3Hgcv3w4t-pXU6ZzrPHQjQnfcepq0dwfRJw/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Marble Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2qvzO9ksu1scC-ykRgYvzSCkpu3JCrBPVMkCZIiFLUC40S-l9DkZerg4Qfc3Y9DzCuo3SlK6ydv5e9UA71lpPNwsjHPzA/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Freehand', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2qvzO9ku-RtcDyjqkR3jDGMnYftbyqSZlcgCMd5RLEItBe9koXhZbzi4AyK34tNmXn4i3hO6SxttuoBAKI7uvqA0_B7rlE/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2qv2-t0ouBWQyC0nQlp4G_dmdauIC_DPQBzDpclRLINsEXsx92yP7jq7gXd2t1NzCT3iCwc6TErvbhfNpboFw/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Tiger Tooth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2mv1edxtfNWQDuymxoijDGMnYftb3mfOg8hAsFzRrYCtxKxxtPlZOnl5gaM3ogQmX_7jnkdvHppseoGVvI7uvqAJhUGkWs/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD3avw-JjteVWQyC0nQlpsmyBwo2tcS-eaFB2XpUjE7Jeuhi_kdfvYerj4FCMgtgUm3732ipM6jErvbi_vJM0jA/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Damascus Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD3avxe97sfJqWjqMzE0YvzSCkpu3J32VZgF1CZN1QLULsUWwkNTjNrnhtALYjo1Cnn762H4f5io9t-gBBL1lpPNt-MvFbw/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD3avx-Fks-RtcCW6khUz_TnXmImvIHuQaw8gC5AhRe4ItUTqw9a1NOyw7wTYiYgRzi__jHsbvCZ1o7FVCIQMXZk/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD3avzud6teVWQyC0nQlp5z6AyN_7I3mfOFQnApUlFrMN5BbpwdbhP-vgs1Pd3dpBmXr9jnwf6DErvbim1G57Bg/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Rust Coat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD3av0vpzte1WRCe6kxgYvjiBk5r0by7EbQMjDcdwF-UC4BG4l9C1ZO7q4VbYj49AySmt339LvH1ptupXUKA7uvqA1J4Dodk/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Lore', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsDXKvw_tipOR7SSWqqhEooTi6lob-KT-JZw90XJMiTO8PukW4wIXmN-zq5gXf2tpBm37_2y4auylv5exUAKAi_7qX0V8Ly4BE2w/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Autotronic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsCXSvw_tipOR7SSWqqhwypzKRiID3KCj4Ml93UtZuROIDtUawltG1N-Pj4gaMg98Xyy2q2CxN63k54uwHBfd0-_GEhwHBOap9v8dVISN0PQ/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Black Laminate', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsCXSvw_tipOR7SSWqqh8rsj6OpYP4LCLJP0J1Zc4pEr9OrBC7xtOyN-vjtFDZjYNAnH6qiS9J73s56u4BWPJxqK3U2gDDYLU-t5YdZKHw7iAX8js/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsBn6vxepmsfVWQyC0nQlp4W3Xw4v4di6fOFMkDpF5EeUL4UXqxtS2Zry0sVHdj4JBxCr32y5JvDErvbh_aZ0FHw/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsBn6vx-FktfJ9cCu8hxgmvwKJk4jxNWWfOlMoWMByQ7QCskGwx9WzMr60tVHfj41EyyX3jXxM5ypu5e5TA_Vx5OSJ2NuQJF0J/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Bright Water', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsBn6vzu1zse9WRCe6kxgY6m26lob-KT-JbgckDsR5TeRftkKwxN3mY7nq7wbci4hBzy783X5P7iZp67sEWaV0qbqX0V8sk0fSOA/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsBn6v1ut0o95lRi67gVN04WmDzNz_cX_CalAiW8FxR7MI4xKxmtPlYe7ksgzeiN5BziT83y4f8G81tOxPsLb-/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Night', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsHWivz-dxuPVWQyC0nQlp4T_QnNarcXzBPQN1CZcjFuEC40a4ktzuNeLgslGL2t5GmS733Cwc6jErvbgctlCLOw/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Ultraviolet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsHWiv0ftkoO1scCW6khUz_WuHyor4cnLEPAMjD5F2FOcLt0O-ktLgMLvg7wbYjIJNmH-viX9A6351o7FVdgPZdkU/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsHXevxe9moO1scCW6khUz_WTVzdurInyVbVdzXsB5TLZc50XuwdW1Yeu05Fbd3osXzXj_iy9N7H11o7FVf664M8c/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsHXevzOtluN59TieMmRQguynLmY2rdyqUOFNyC5N0QeQNuhC6kYe2M7nl7gTait1Hy3n52ipMvytj4_FCD_SLIWJ_mw/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsHXev1e9mtd58XSuymyIrujqNjsH_JCmUalNzCJJ2EOZb4RC_mtPiZLyz4laPg9lGyX-v2itI7i1r6-ZQT-N7rSOfJ1lh/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsIc-VD2OV_uJ_t-l9AXuwwBh0sT-BydarInPGPQUpCMcjELJY5xm4xIG0NLy241Dag9hNzirgznQeOQeAleU/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsLc-RAmaTyv5zsfNlcCSyhx8rtjSfn4vGLSLANkI-CJQjFrQJsxHrktfjMu6z5gbYi49FyS-rh3lJuHxst7oLAvci-PDehxaBb-MyRwuVrw/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | Marble Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsLc-eD3WSzetJtuBtSha_nBovp3OGztqtIH-RbwV1X5Z5QuEPshGwl9TuY-vrsQPd3d0QmSz72nwY5ilo_a9cBrKGUnAZ/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsLc-JC2WCwNF6ueZhW2fglEt-5jmDytn_InKRPwQkAsQhE-UJu0a4lYflNO7k41bc34sTyH76kGoXuTxGW3zC/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | Tiger Tooth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsLs-HB2CV09F5ouBnSCyMmRQguynLy42tdSnBOFcgC8EjF-ECtBi6x9fuY-3n4w2P2YsWyiX42iMd7Clp4vFCD_R6ZwboAg/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsMc-RAnKVxdF6ueZhW2fqxBh1tWXVm4v9c3iTawUnDpsjQeMMshW6ld2xP-_q5w3bjoNCyHn2kGoXucNZoqIn/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | Damascus Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsMc-XD2qR0u1jo95lRi67gVNw6myGnN6teHyTbFV1DMQhTeFYsBa7xtHhZb-z5gfejN4Un3-si3wf8G81tKX6O3VS/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsMc-VAXWTxOpJvOhuRz39kEkjtjmGydmhdi-TbVNyDJNwTbRf4BjpwILhNe7k4wzW2otCyn72jzQJsHhv3Am88A/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsMc-cB2uVxdF6ueZhW2fmx0gi4jzQm9qhdSqSPVRzDJR2FOEKsha4xtbgPuy04QON3YJEyyr_kGoXuQK6HIuK/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | Rust Coat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsMc-AGmKVzdF9vuhvSha-kBkupjDLn9ytc36QZwByCJpwE-4I4UW9kNy0NO3mtQHdj4xFxSr6j35Lu35s6vFCD_SeoZUIGw/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tlOc-XCneR1dF6ueZhW2frxE106zzQztb6Jy2TaQYoCpQiEO5Y4xOwldfjZurg5QTdid5GxCj-kGoXucz3RTaX/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tlOc-VAXWV0vpJsu57Sii_qhEutDWR1Ir9d3KSbgFxDJQiRe8O4ESxm9HiZu_k4lCP2NhBz3-tji1N6Hlv470cEf1yxrD6pCc/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tlOc-EC2WD_uJ_t-l9AXqxlEtytzzXwo2pJSnBb1InC5dzQrVYsRK5ktOzNenn7gXdi95FzX3gznQeN2X8HrE/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | Ultraviolet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5t-L8-DG3WAzetJvOhuRz39k0104GnVzor_InqfPQ9xDZJ0E7JfuxDql4XhPryxtg2MiI5An3-r2zQJsHhQRDEjrg/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5t-MM-XD3eAzetJvOhuRz39k09w5WnVyI34cnqUb1R2AsN5FuAPtha-m4CyMejitlfYiYpNmH392jQJsHiJvqHvqQ/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5t-MM-eC3SY_vp3vt5lRi67gVNztTmBydj4I32fZ1UpDMAiEecMuxXqxN2zN7zi5Abdg4hDxSj5iywf8G81tEchNhm2/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | Night Stripe', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5t-MM-dB2CY1f1iouh5Sha_nBovp3PVnN6uIn2VPQEiA5ZzR-BfuhS5loCxNO7gtFTa34hEyS75iS4duHk6_a9cBmI-JI41/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5t-MM-HD3eV_vtksuBncCW6khUz_WnTwo2vIHrEO1UpCcRwTe4MtEO-wNXnZOm2sw2Pgo5GxHr7j35I6y11o7FVtOoVFFs/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6VsH_aSCmKvzedxuPUnHSixkUl-4mqEnNj8IH3BOgUjX5RzFOMDthewlN3iYu-27gHcio1DmTK-0H2HlTMq_Q/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0PzadQJD4eO0mIGInOfxMqndqWZQ-sd9j-Db8IjKhF2zowdyNjqhI9SQdw9tYQ3V-la6lb3ngJLv78jJzXcwvnQj7HeLmhyygkkYO_sv26IMYqz0aQ/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | Marble Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6VgH_2SHGWcxNFwseVscCW6khUz_TnXw9-qdyiWbQEiA8FxROQMtxPqlILjM7vk4waIjoxNmSr9iyxK6yh1o7FVj-pHDZk/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6VgH-qWDHWR_uJ_t-l9AXjik0x362yDyIr8eHKUPQQnD5B4F-MKtxjrlNfnMu-04gDY2IlFnH7gznQeNL2G-UI/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | Tiger Tooth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6VjH-SaCWKC_uFkse9uSha_nBovp3OGnon7dXufZwcnC5cjEO8M5BDrw4LlNuvq5ADWid4XnCX63yxM5i8-_a9cBvWv3FY7/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6V8H_KfG2KU_uJ_t-l9ASu2zEkjsm6HytytcHnBPQ90XMNxE-VYsUK_m9TlN7nl7gHag48WmyngznQeOvn5VbM/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | Damascus Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6V8H_SSA2aDwvtlj-1gSCGn2xh0sG_VmNz9cS7CaAcgW8MkTOdftxS4wNexPu3n4QPbj9hHyH72jy5XrnE819bSoUk/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6V8H_acHGSVxdF6ueZhW2ewxU9wsDjXm9yrJXvCbAUiCsByF-RY4xfrk4CxZr605VTbj49GyC_3kGoXuZB2l8Tw/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6V8H_-aAmKU_uJ_t-l9ASrglh8l5DjWz479d3iTOwYlX5UhFrYMsRnrltWxNrzl5QHYjYJCyX_gznQeOO_KAyk/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | Rust Coat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6V8H-OHC2Kc_uV4uedscCS2kRQyvnPUzo2qIHjEaFQhC5dyF-ZbsxPpx9C1Y-nq4ACPiIJFzn_-hntJ6yxr_a9cBo1AYhy6/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6x0H_SXHmaE_uJ_t-l9AS3gkB4m5myGyo6sciifPQdzD8RzR-JctBjsl9bvMOzjslPYgopAyi_gznQexg-GN_M/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6x0H_acHGKD1dF0v_NsTiWMmRQguynLztutd3qfaFMlDcZwQbYIsUGwlILlYuzi4wGMi4MWyyusjnxJ7nk-5vFCD_TajkSe4A/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV6x0H-eWDHSvzedxuPUnGH_gx0pxtT-Dm9uvdXrGbAFzCsZ5Ee9YtkTpx9LgYuPjtA3djotByDK-0H0Jjl4AqA/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | Ultraviolet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV7diH-CGHHecxNFwse1qRyC8myIrujqNjsGrJXjEPwAiC5pwEeAC40brkNzvPuLgsgHY2oMWyiv9jCxIvChr4egHT-N7rbYjcxXs/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV7d9H_SSHnecxNF6ueZhW2fqzEl_sT7QwtegdCnEa1QnXsckEbIIt0TpxIWzZr7g5QPag4sXzXr8kGoXuabkrFHY/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV7d9H_2WHW-v1e94j-1gSCGn20t35z6HzdagcnmQPAMmD5V5Q7Rf5hLtwIK0MO-24wSM2YkXnnr_iiNXrnE8Zdgcdss/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | Night Stripe', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV7d9H_6aCW-E0vpkufFscCW6khUz_WvQm9v4cy-XaAIiXpshQ7QDsBLpktO2Nbnn4gfY2oxGmSmr3SwdvC91o7FVXhfCwdw/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y4OCqV7d9H-SSHmKv1Px0se9WQyC0nQlptm3Tw9aseHKeagAgDcMjEOIPtBSxwNHmMerlsQLYgoIRxHmv3ygcvzErvbijdLAgow/256fx192f', rarity: 'covert' },
        { name: 'Classic Knife | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRaaVSJvGXC1icyOl-pK9tHn-yxhkltmTVnon4IHqUbgInWcN1ELIK5hS9xIbkZumx4wONjd9H02yg2Yau6XG6/256fx192f', rarity: 'covert' },
        { name: 'Classic Knife | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRaalSOvWRHGavzedxuPUnGiy1xxkk6z_Tn4mucH2UOAUmCZZ1RLQJuhbrx9O0M-ji71OK34oTzDK-0H1Px6MwvA/256fx192f', rarity: 'covert' },
        { name: 'Classic Knife | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRabVSIvyGC2OvzedxuPUnGiuyw0x34jyDz9-tcX-XblVxCsElEeQLtxa_ltLnN-LhtVfd2d9MyDK-0H3ReQavbA/256fx192f', rarity: 'covert' },
        { name: 'Classic Knife | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRabVSJv-BDWKU_uJ_t-l9AXziwkV362nUzNj7dS2Sawd1A5p3TLQC5Bfrlt3nP-rh4wWPjYwXmy_gznQeaAH0jRU/256fx192f', rarity: 'covert' },
        { name: 'Classic Knife | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRabVSL_mfC2OvzedxuPUnSSjlxxsi627cyNevdnOWbAFyAsEmRbZesRSxlNXlNOm051aK34JAmDK-0H1p4FgDwA/256fx192f', rarity: 'covert' },
        { name: 'Classic Knife | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRYL1SJPSDD3OvzedxuPUnHyjhwx505T7Vwoyhc37BPQ8hXpd4RLQItBTukdPlZrmxtgaP3oNExDK-0H1P5hZEjg/256fx192f', rarity: 'covert' },
        { name: 'Classic Knife | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRYL1SJv-BC3SE_ux5ouRoQxa_nBovp3OHytj4IH7FOldyXMAmFuRftxG6xIWxZOux7lOLjoJBzCj92i5N6H5s_a9cBvSJSM6F/256fx192f', rarity: 'covert' },
        { name: 'Classic Knife | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRYL1SN_WRHVicyOl-pK8-HnHlwUkh62SGyd_6IHrCP1IlXJt1FuQPshXuk4fiMO2w5VGI34IU02yg2SQnu4I0/256fx192f', rarity: 'covert' },
        { name: 'Classic Knife | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRe7RSJPGDHmuV_uJ_t-l9AXrhxR4h5mvdzoyhJS2VbAQoC5ZwTOYL5xmxxtXvZOmxtFTZg45FmC7gznQeWPC0gg0/256fx192f', rarity: 'covert' },
        { name: 'Classic Knife | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRe7RSLfWABliEwOBJvOhuRz39kUx0tmWHno6geHLEbld1W5skFOII4RO6mtPiPr_i4wbfjI9Dyyn53DQJsHgORFidlg/256fx192f', rarity: 'covert' },
        { name: 'Classic Knife | Night Stripe', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRe7RSLvmUBnOD1fx_oORWQyC0nQlp52TVyIv7Ii_Cb1ckCsR0EOVf5xm7xIWxNr6x5QWL2dpDnniojntKuDErvbhtcklsTw/256fx192f', rarity: 'covert' },
        { name: 'Classic Knife | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRe7RSNPGDC1iF0-x3vt5lRi67gVNxsWWAytqqIHLBP1MlXMckQrMI50O4wIexM7u25gLcjN8UmCX22Cgd8G81tNnT-P6o/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SD1iWwOpzj-1gSCGn20l-tmjVmIqhdHmWa1AkCJRyFuUItBW9wNTmY7jh5ADa3o5Fy3-sinhXrnE8OtZmGks/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SA1iSze91u_FsTju_qhAmoT-Jn4bjJC_4Ml93UtZuQLECtxDrkIHlMem041aP2ohHmymsjSkaun49te9UAKp3-PWBjg-QNqp9v8frwaFCRg/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Gamma Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SA1iVzOtkse1tcCSyhx8rtjSfn4vGLSLANkI-WZEiR-cOu0Hrm9S1Nunm41PejopGny_-iStBuys5sukBVvYjrqTV2RaBb-OVFNXjzg/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Marble Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SA1idwPx0vORWSSi3kCIrujqNjsGqdXrFbFIlA8QjTO8Lu0O7m921ZLy05gfXj99Aziz_2nscuic6sr4AT-N7rSTjmXt5/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Freehand', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SA1idwPx9teVWWjmMzE0YvzSCkpu3eX6RbVN0D5t5F-MCtRjpl9DgYerq7lHb2t1Nynj_3C5I6ik5tr5TB71lpPOmEPqDwA/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SA1iKxOxksd5lRi67gVMhsWvXnIurc36UP1RzWJB4QbYCsBC-xoC0N-3gtVHY2N8XmCT_2isb8G81tLxG9DyC/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Tiger Tooth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SAFiEyOlzot5mXSi9khgYvzSCkpu3cCiRZwIiDcZ2ReEO4EW5xtXlMuO05weKjYNBxS-tjytOvC495u0BWb1lpPPh4hsqrQ/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SH1iSzftztN5lRi67gVNxsT7Tntmpdi-XPQAmWJJ5QuRYsBa7loe2P-7lsVTZjtkUnyz_inhK8G81tNS01icZ/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Damascus Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SH1iUwON3o-J8XBbqxSIrujqNjsH7eXjGPwAkXJR2QLMJtRe5kN2xYu7k5QHcio0XyX-o3S4duH5u4eYFT-N7rR0fzt1P/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SH1iWzvx1teVWQyC0nQlp4G-BnNeqc3KVaAAlDJomEOEI4BC4w4W2NLm0tlHWio0XnH332ilM6DErvbhTfwMZNQ/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SH1ifyOJztN5lRi67gVMi4z-Hz96tcSiUblcoA5tyTONZsxG4wdPjZLvg4Q3ej99Ezyr2jS1L8G81tJVww3hv/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Rust Coat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SH1iD1etzvN5iQSC1kCIqtjmMj4K3Ii3DbgAnCMBwQbRZtEG9wILlZu_nswyI345FxCSvjyMc6XxvtrxTUr1lpPMD9UqAWA/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Lore', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-QG1iWwOJ1uOhmQRa_mg8ijDGMnYftby-SalJ1AsQiEecC4xiwlobjMLnjsQffjtkQzSj2iS9I63xj4OwDVqo7uvqAGhE4d3k/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Autotronic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-UHViWwOJ1uOhmQRaygAkopy-KlIb6HifOOV5kFJAkRO5esxC-w4LjNezg5ASIgtkTyn76jHkc7XxisOcFWaUg8_LQi1nfcepqdp_zzW8/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Black Laminate', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-UHViWwOJ1uOhmQRaxmRwkuAKJm4LwLyrTO2l8U8UoAfkMtkKxwdTkY-m34ADfjoJNyiWs3ypN6ylp5bsAWaUi-KTWjQ-TNOI8_9BdcxUxepgb/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-bF1iUxf53pN5lRi67gVMksWuHntutdi_Cb1IlCZFwROYMuxmxloGyY77msQCNiNhNm3j-2CIa8G81tBGTV0lI/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-bF1iWzvxzo_VWTSahkBwrjDGMnYftbyjDPVQgCJEhELMOtRG9mtfkP-jr7wyMjoMWny2vjSxMvCc9suxWAqU7uvqAOEaxeJw/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Bright Water', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-bF1ifwut3vt5iQSC1kCJ-4wKJk4jxNWXCPA4kAsBxReFbt0S9xtCyNuq35lTfio8XxHmqh39O6S5rsL1QV_Uh5OSJ2JvTxrZB/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-bF1iHxOxlj-1gSCGn20t242-Eno34cC6SOgYoCZZzE-JesxawkIG0Pry24lCKj4IRzn-th3xXrnE8QWIt39g/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Night', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-AAVieyOl-pN5lRi67gVN35jjcmNmqcSrDPAR2ApMhQ7UDsBmwwNfvZL_r5wHcgoNFynj-2y9B8G81tDvvgv8m/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Ultraviolet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-AAViA1PxmvORWSSi_lhUuvDO6lob-KT-JOAQiCpJyRu4PsxPsk4fkNerjs1bXjtpCyCqri39BuH094OgKWfUn-LqX0V-hhcTrMg/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-AHliUwP5mvORWQyC0nQlpsG2Bmdv_cS7DOwIoDJB4F7MPsBHtkoDmZri25APZjYpNni_3higbvDErvbjw_sgWtw/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-AHlidxP1-j_VoQRa_nBovp3Pcwtv7dyqUPw5yDZN5FOAIu0Pqw4fmPuu07gSIiI5Fzy323Xga7C9u_a9cBhYueYQh/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-AHliEwP5zj_R7TSi9qhEutDWR1IqtI3_EOgYpC5EmQe5esha7kdHnPu3m4gTdg4MRxC6q2yxO6ik-67scEf1yx78TVSg/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6VsH_aSCmKvzedxuPUnTXywzR9-427Qyd34d3iUb1RyDJMlQbQL5xTtw920Zby05FeNjohDzDK-0H3GjMwqlg/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6VgH_KfD2Sb0et3ou1WQiihlxEiuieAnrD1KCzPKhh0CpN4FuICtEK4xoKxNbjq4gaM3dhCzSn-2i5I7346sesBVqF3_a3SkUifZq_j0qfR/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Gamma Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6VgH_WeC3WRzepJveB7TSW2nAcitwKJk4jxNWWWPVdzA5pyQeQCsEG9wNXiYey3sQbcjIhMzi73jy4duCprt-5QWKoh5OSJ2FqzBf3_/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Marble Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6VgH_2SHGWcxNFwseVscCW6khUz_WqBnt2qIyrBPwMoCcN1R7YCtRa7kofhY7nk4gzajNhEzyT43HhK6CZ1o7FVaZCrJoQ/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Freehand', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6VgH_2SHGyVxdFjoN5lRi67gVMk4Wzdm4r7cCiWPwUjXpt2QrZZ5ESxktLiNbmx4VPdiogTyi_42CxO8G81tO8hlF8A/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6VgH-qWDHWR_uJ_t-l9AXrrl0905Gjcm4uqcSmWblNzD8Z2QrZbtkK5ldTmY-rqtAba399BzyjgznQejSHMqZo/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Tiger Tooth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6VjH-SaCWKC_uFkse9uSha_nBovp3OBztqpI3yTbAIgDZslQbFbtUbuw9y2Y7y37gDcjooQxH__h39B5yxt_a9cBoXwL4KP/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6V8H_KfG2KU_uJ_t-l9ASqyzBl14jnXwoyuJCmeZwAiDpolRrFf4EXswN3iNrmw4FPZg9hMmSjgznQe7J0ACeg/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Damascus Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6V8H_SSA2aDwvtlj-1gSCGn20lx52ncwtn_eXyQb1JzXJR3FOEPsRO5xoDmM77n7gHeiIpCyC6tjyhXrnE8njKBWnQ/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6V8H_acHGSVxdF6ueZhW2fjkUUk4GzRmNuvcSnFO1MlW5RxR7MItUbskIHnZurl5ALf341Gmy-rkGoXuTDvkImE/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6V8H_-aAmKU_uJ_t-l9ASu2l0Qj4m7cnNf6JSqSZgAhA5NzFOALsBbrkILuPu625AXcjdpGz33gznQe1ZCqub0/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Rust Coat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6V8H-OHC2Kc_uV4uedscCS2kRQyvnPXmImsIC3DawJxWcN4RuQPuka7xNHhZuzqtgTcjN1FmH36jShL6S9r_a9cBvssjBEP/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Lore', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6d4H_afB3evzeFktd5lRi67gVMi4jjSy937In2fbA4gXptyROJetBK9ldLjPuPi5gyKjINMyCX23Soa8G81tMSuH9C0/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Black Laminate', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6d4H_afB3ev0vp5vuR-Tjq7qhEutDWR1NqheHqUOAMlXpR0FOVZ4Ba8wIW2P7u35VPX2Y9Azn6s2ihB7S5v5uccEf1yNTyJJU8/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Autotronic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6N-H_afB3evwPtiv_V7QCe6liIrujqNjsGrdn-faFMpXJd0TO4ItEKxm92xNurrsQCNiI9Fzy_43y0f63s5t-gCT-N7rYkKXYid/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6x0H_SXHmaE_uJ_t-l9AXmxx01xt2rRnI2uc3uRPVAkW5R0FrIIsha6wdbjZrjh4wOP3t0Ry3_gznQeDR4sxYY/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6x0H_acHGKD1dF0v_NsTiWMmRQguynLnIuoJXmfb1ciDsR5R-ZfthOwkN3nMryxsw2PiYoUySr63CNLvSts5fFCD_TIli8aVg/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Bright Water', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6x0H_-QC2ae_uV4uedscCW6khUz_WyHy4usJS7EOlJxWMMlFrMMsxKxmobnZr_i4leNgohCxCT_iHwfuH11o7FV6J7t-P8/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6x0H-eWDHSvzedxuPUnTn6wkEgksm7Rzon4JXOXOwYnD5oiELMP4EWww9LuN-zq5wKLgtoUzTK-0H1-4rT4QQ/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Night', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V7diH_6aCW-E_uJ_t-l9ASzgk09_tW_Qy9mocXLCbgQgWJQiReEI50SxldbiMuzn4gDd3oJCyi7gznQeD7v_WUw/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Ultraviolet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V7diH-CGHHecxNF6ueZhW2fqkxghsDmBydb8JXKXO1QgA8F0RO4KshDrkYblZumz5VGLgt9MxSr2kGoXufZKGhe-/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V7d9H_SSHnecxNF6ueZhW2eywRl3sGzQm46pIy-TPAIpXsEiEO5c40S_kdDlPr6xslCPiYMRniuskGoXuRzTMIE6/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V7d9H_2WHW-v1e94j-1gSCGn20Vz4G3Wztn9JHufO1UhWMclQ-AJ4BTqxIfgM7mzs1OLiosWmXr_hytXrnE8XsE6vh0/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V7d9H-SSHmKv1Px0se9WQyC0nQlp5DnWw46pIy2SOwBxW5VwFOcP5hC4x92zM-6ztVbYjtoTmST_iSNA6DErvbgg2ar9PQ/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRaaVSJvGXC1icyOl-pK88HyjikUR_6z_UmIyudy-WPVByCpRzQ7UDukbtmofmM-3r4gaKjINH02yg2St2xdPu/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRaalSIvySDWyAxO9kvN5kTjuxmRguqTiBpYPwJiPTcFInDpVyELMOshO9wYHvZujk5VPagotHnC6viixLui5jsr1XWKcgqKTJz1aW4QQYg2A/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Gamma Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRaalSJf2WHGacxdF7sfNrQyy6jxgjjDGMnYftby-ROwEmXMciQeUDt0Prkt3hMeKwsQKP2ogRzyWqiy4b6So_5-YBU6Q7uvqAIJUtHr4/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Marble Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRaalSLfGBDGuV_uh3tORWQyC0nQlp4TzTnNz_cHifawAiW8QjTe8Lu0K9w9HjY77m4lTXjI1FyCz9hnxBvDErvbgdMZDtHA/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Freehand', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRaalSLfGBBWKU_vtmj-1gSCGn20tw6jndyNmoIn3FbAQoCMEkTOYJsRTql4fkPriw5gyIjoxAyCj9hy1XrnE8qMFnbCI/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRaalSOvWRHGavzedxuPUnGH7hxk8jtWyByt-peC6RPQAoXJF0FO9Zt0bpw9zuMrjg5QLXjo1BnDK-0H35txVa0w/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Tiger Tooth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRaapSNPmUC3Wvzvx3vuZscCW6khUz_WyGyIv7I3nBOlchDZV3RO8JsEa7wYXnNr_n4AeI39pNyX_22yxO6id1o7FVdgPDjag/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRabVSIvyGC2OvzedxuPUnSyjrw0VztW3Wn4z4d33EPFUiDppyF-JZuhSxlobkP-jl4VHai4NHyzK-0H3cWj3rrw/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Damascus Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRabVSJPGeD3ST1P1JvOhuRz39xhl06zvWmYn9dnuePVVzXJYlQeFZ4Bfpk4XuY-PnsgfcitpDyi_4iTQJsHiloP4S4w/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRabVSJv-BDWKU_uJ_t-l9ASqwzUp152vXnoqrcXmfagYgCJF2Q-MD5hTqlN2zMu7m5VDYgt5Nn3jgznQeBu0Fnbw/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRabVSL_mfC2OvzedxuPUnGSvklk535GrRm9arInnEbg8nW8AjRucC4UK-kNDjZO_rtQDWjY1FnDK-0H0tccFB2g/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Rust Coat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRabVSM-SWC2uvyuB_tuRWQiy3nAgq_WvTnNr4cnqfPQEpDZB1ReBftEG_kde2P-zl4gzciYsXzC2o2Hgd7n11o7FVh370TBM/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Lore', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRa7FSJ-WHMWuf0-tJvOhuRz39zU5-4mzUyI2ud32RaQ8lXJB2FuUI40S4kofgM-7hslaPgtpBnHj-iDQJsHjij6hzng/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Black Laminate', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRa7FSJ-WHMXSEzuBzp-B6Rxa_nBovp3PRn96tIynBPFJxA5RzROYOtxHpwIWzP7zitQXe2owWySWojisa7S46_a9cBlypMIP0/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Autotronic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRb7dSJ-WHMWaF1eFiou5nRiqMmRQguynLy46odXPFZw9xD5dyFOUDuhPslNXkNOLj71Db3o4Rn3j7hy8YvCZu4_FCD_SSdjZ6vg/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRYL1SJPSDD3OvzedxuPUnS3njl00j5W3cnIqqcnOTaAZzDcF2RuYJtEK9wNTkZL_gsQyNjYwXyDK-0H1ch3290w/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRYL1SJv-BC3SE_ux5ouRoQxa_nBovp3PSmYqhJX6UPw9yD5N1FOEO4UPqwdLmNruz5lePjd9Dmy6q3SkYvCg5_a9cBkQf8e9t/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Bright Water', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRYL1SL_OWD2mvyuB_tuRWQyC0nQlp4TiDntmtIiqeblAmDsB2QLMNukSxwNDkZOrg4wbajItNzXn4in9LvDErvbi4dh8COQ/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRYL1SN_WRHVicyOl-pK9tG3-1w0ohsWvQn9iucSiTbgFyCpN5Q-dZ4RK4koa0P7m2tgHcj45A02yg2VxV6Ecz/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Night', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRe6tSLvmUBnOvzedxuPUnF3C3l0p25mvQz4r7c3ueag91DpclRrFc5kaxk4e2Y7zi4VOIg4hFmTK-0H3lwmjDRw/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Ultraviolet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRe6tSMOWBHmuV_uJ_t-l9ASvhkRhw4GiDnN2hcXrGOAYgDZFwQrVYs0XtxtDgZu3ktVDXiYgRyy3gznQex8McCSA/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRe7RSJPGDHmuV_uJ_t-l9AX-yl0Uj6jvQnoyrcy-TPQd1ApB2E7UIuxWwkoHkMOzjsgXei4pAyXngznQeOP3RS-8/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRe7RSLfWABliEwOBJvOhuRz39wU12sWnczIyuI3mQbFAnD8RyTLVc4BHukIfmZbjq4Vba2IlMzyT43DQJsHjApBIhpw/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c-uaRe7RSNPGDC1iF0-x3vt5lRi67gVN0t2WGz9z8cHufa1IpX5skQbJbuxHtl9KxZu7ntgWM3o8Uziishi5J8G81tIA_RSBn/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJseBWSSi3kCIrujqNjsH7c3qVOwV2DcZyQbQOukG5m4CyMeqz4laIgoxAnH_93Ckbvyw5troCT-N7rT3KN2DN/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWTSWylhY3tjyXlrD0IDnFMlN5QMckKrtT5Uj8jILvNu7r4VfZj4gTySX_33gc6i5r475RBPAh_vKBjQrIZ7Q45sEHJ_y5DUPZghIomjw/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | Marble Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWQiihlxEijDuEnorGLSLANkI-DpolR7Vf5hK5kdTlNbiwsg3YiNlCm3mq3Cgd6iZusetRUPJx-qTT2xaBb-MDauzVhA/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWVSyxhxwYvzSCkpu3JSjFaQR0WZFwFOFYtBLtl4e2Nrmz4FHci4tAxCT8iipK6yc6sekKUL1lpPNhGLzFnw/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | Tiger Tooth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJse9WWyC0kA8YvC-ElIj8HifOOV5kFMMlRLJf4BK4k9LlZuy35QTYg95NzXmri3tB6yk4sO5XBaoh_PDRhgHfcepqTt5nFFY/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsfBWTSWmkBkYvzSCkpu3JCqUaFIjCpV4ReAD50S9w4bgZO7h4Vba399DmC36jHlI6yo_tr0LB71lpPNA0Lycxg/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | Damascus Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsfBWSyi-lA4kpi66ip3wMibGAVp5Xco0W-8JuxK-k9y0Mbjj7wTXioNHmH33i3wcvCY6670CVKt3r_LTigyTMrUjoc5Uv9yDDqU/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsfBWSSahlhgjjDGMnYftbyiSaQUnX5BzELJY4Bi5w4DuMLvl4lSNiY1NmSj223wY7yo64b5TWKQ7uvqAVA9om-4/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsfBWQCC_kBkYvzSCkpu3eHKWaQ8jXpQkReZZtxa_x4HvYujh41HZg9pNzX2ojCJA7itpteYHBb1lpPM10bWGng/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | Rust Coat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsfBWXD22kBEYuDOMnIrGLC7DN0N9FMF2E7NbsEWwkYXjMe3r51OKid1MmXr42i0cvSdttb0KAKpz86WCjgDfcepqQnV13Fs/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJuPhWSy2jlAkYvzSCkpu3eSjBPVcoCZQiEbZYtRawwYXjM7nktgXW3YkXyH-qiiJL7Hpr6-hRAL1lpPMoI6wPcw/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJuPhWSSahkA4zjD-KiIr4LRTLN1F4TowkTeFc5kHpwNGzY--05VPd34NMxCz8jiJI6ns_4LtUVaYtqKHQ3gHDL_RjtjQ2sZy9/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJuPhWWCyxhiIrujqNjsGtJS-eag4iCpN4QrZYsEK_m9K0ZLzl4gOLiYgQxSj2in9Buis_5OZRT-N7rdEUHJYn/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | Ultraviolet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJo-5WXzyhhREijDGMnYftby3FOgUhAsYjTeZetBm4xtXkNbiw5lPbi9pGxCr92itB7C9q4ekDU6c7uvqA74P7bNU/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJo_FWSyijhREijDGMnYftb3qQPwNzXJIjELQLsxiwkdWxZOLntAHX2Y5Gm3_6i34a5n0-4OwBVqM7uvqAVQbj3nE/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJo_FWQiygnSIzsjO6lob-KT-JZgIlDJFxQbUIsxnsk9zjNrmz7wbfg4IQziT6hi9P5n5j674CWPIlqLqX0V-GxNuRmA/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | Night Stripe', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJo_FWQSC0nQk0py-MiorGLSLANkI-AsF1FrUI4US9wdeyZujg5lOIiIwTzHn823hO7X5rsrlUWatxqKWEjRaBb-NTNYcBTg/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJo_FWWyijkCIyoT-ElLD1KCzPKhggC5p4EeIPtkTtkdy2Y-7mtAOMg9pEnCr8iyIf6C8-sL5TWfYh_aCGkUifZi7Rx6Sa/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SD1iWwOpzj-1gSCGn20tztm_UyIn_JHKUbgYlWMcmQ-ZcskSwldS0MOnntAfd3YlMzH35jntXrnE8SOGRGG8/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SA1iSze91u_FsTju_qhAmoT-Jn4bjJC_4Ml93UtZuRLQPsBawkNfiMbnl5AKMiopCnin7iCJBv31j4rkBBKEg-6zUjV3GY6p9v8dpLWT3Fg/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Gamma Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SA1iVzOtkse1tcCSyhx8rtjSfn4vGLSLANkI-X8MjTLFYskTsw9bnZOuwsgSIj4sTniz-2i5A7yY6tbwGV6Nx-qGEjxaBb-MuPavopw/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Marble Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SA1idwPx0vORWSSi3kCIrujqNjsGveH2RaVRxX5ohEe4Juhawm4fiM-ji4APf2YMXmSz_hyoduytv4uhWT-N7rfLHGBJ4/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Freehand', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SA1idwPx9teVWWjmMkxQptgKJk4jxNWXCOlJ2CZpyEeBbuxbrltXkMbzlsgTXit1NyST9hiJBu3ptsesLAPJ35OSJ2AmQpzvF/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SA1iKxOxksd5lRi67gVNx5GzQztqrdH-ea1AjApImFuEJ5EO5wYHmP-2w7gGLgowTz3r5jCwY8G81tFw9kDjw/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Tiger Tooth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SAFiEyOlzot5mXSi9khgYvzSCkpu3eC3BbwUmCcMlQbMD4xG_w9zkPu7gsQXe2YJFzHqqjixL5ylr4ukAWb1lpPNV9oeSnQ/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SH1iSzftztN5lRi67gVNw4D_WytioJX2WO1AmCpJ5Qu9Z4EK-wYLjMOzm4gKMjt9BnC732i9M8G81tP_ecAuH/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Damascus Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SH1iUwON3o-J8XBa_nBovp3PUmdetJHyUblInCZF5TeID40bum9znMeKwtleKi4pCyC-q2CofuCxq_a9cBl9itWvl/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SH1iWzvx1teVWQyC0nQlp5zmEyI6rcC7DZg8pXpRyQOMOsBG-xNaxZbzl4wPdit5Azij3239MvDErvbgAJOXq8Q/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SH1ifyOJztN5lRi67gVNz5DvUmdj4eXuWOFAhAsF4RLFc5BC4xtbuY7yx7wDbgo9CzSj2h3xK8G81tB_XeHWq/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Rust Coat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SH1iD1etzvN5iQSC1kCIqtjmMj4K3cC2TZgQgWJUjR7QIukK7lNO0Prjk41PXjdgXySj4iCJMvH5p4rlRUL1lpPMtop-Pnw/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Lore', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-QG1ibwPx3vd5lQDu2qhEutDWR1IqrIHLCZlUmDJYlTLFb50HuwdyxPu2w4lCKjI5HniT2jS1PuCxj5e0cEf1y9ZCADXU/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Black Laminate', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-QG1ibwPx3vd56Wya9kAomoDW6lob-KT-JbwIlWcYmQ-UM40LrldXkZO6wslONiN0UmCT52iIdui8-5LlUAqUn-LqX0V8xd7EU5Q/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Autotronic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-UHVibwPx3vd5oWj28gQ8ovTSGpYPwJiPTcAMkCJt3QuVY4xXrloHhP-nlsw2Ljo1NzS6ohitJvCc4sOcHAqInqKfJz1aWliaAF_M/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-bF1iUxf53pN5lRi67gVN25WuBmNqpeC-RbgdxCZAkRucN4xC8w4axY-O07wfW3YkTzCn6jC9N8G81tIWhen7s/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-bF1iWzvxzo_VWTSahkBwrjDGMnYftbyifZgQlA8EhRrRfuhm7lIa2MerjtlaKi4NGnius3SMc6Slv574AUPA7uvqA0RoB8ZE/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Bright Water', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-bF1ifwut3vt5iQSC1kCIrujqNjsGteH6ebFR1XJp3E-MNtxK7lYbiM-rg5wLZgoNGyyX62Hsb7ixq5e9RT-N7reSUYiY6/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-bF1iHxOxlj-1gSCGn20wi4mTcyoyoeS_Dbwd2Cpd0RrMK4RbqxNTvZLyw7lff3Y5GxX6oiiNXrnE86bQY1_c/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Night', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-AAVieyOl-pN5lRi67gVNxsmzXyd2tJ3-QPwB2W8MkFu5YshG8lN3jYbnm5wTc34NNzS_423wd8G81tLSi0nj9/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Ultraviolet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-AAViA1PxmvORWQyC0nQlpt2uHwtqvdS6WZlUjXJt2RrFbuhC5wYG0MOKz41Hc2IIRm36sjnwf7jErvbiyCF9_ug/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-AHliUwP5mvORWQyC0nQlptmzcntmody-fbAYlDpElTLZf50W_ltS2NrywsgWMidlFyS2riS0Y7DErvbjAAm1c_A/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-AHlidxP1-j_VoQRa_nBovp3PRw9yhcHyTawJ1X8N4ELVb5BXqw9OxZu-x5wSKit1Mmyj83C9M7Ss__a9cBidCCPpT/256fx192f', rarity: 'covert' },
        { name: 'Karambit | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-AHliEwP5zj_R7TSi9qhEutDWR1N2qeXnGPQN2CcdxRucP5xK6kd3mP7jn4gyNiN1HxSiojHtN6Cc_t7wcEf1yQHicti4/256fx192f', rarity: 'covert' },
        { name: 'Kukri Knife | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsIc-VD2OV_uJ_t-l9AXyyzEohsGvVn4moIi-VO1N2CJR1E-UD4BXtkIXhMe2x7lbej4tEnyzgznQeN9c5PgA/256fx192f', rarity: 'covert' },
        { name: 'Kukri Knife | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsLc-JC2WCwNF6ueZhW2fmwkwj62TWmdyuc3nEOFB1Csd5ReFZtUTpxtXvYb_k4waPj4wXxXitkGoXuVwivb-T/256fx192f', rarity: 'covert' },
        { name: 'Kukri Knife | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsMc-RAnKVxdF6ueZhW2exzE0h62nVyd6qeXjEbgF0X8EiEbZesRS_wIXkPujq7wPWjNpDyn6vkGoXudm1ivk1/256fx192f', rarity: 'covert' },
        { name: 'Kukri Knife | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsMc-VAXWTxOpJvOhuRz39lkgl52TXzdiscH2TOgAkX8QiRuFftxW6kNW1Yrzr7wOK2YkWxXr43zQJsHia9a0bCA/256fx192f', rarity: 'covert' },
        { name: 'Kukri Knife | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsMc-cB2uVxdF6ueZhW2fizRsk4G_dzY39eCrCaA51W8QlF-ZZtRK6m4XlPunn71TbjY0QzimokGoXuR84GhWV/256fx192f', rarity: 'covert' },
        { name: 'Kukri Knife | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtlOc-XCneR1dF6ueZhW2eyw0wk4TuDnI6pdS7BOAcnWMFyEbNYtEa6x9HjPurj4lHajYIWny6vkGoXuZN4gz37/256fx192f', rarity: 'covert' },
        { name: 'Kukri Knife | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtlOc-VAXWV0vpJsu57Sii_qhEutDWR1N2vIH7Dbw8jXMZwTecNsEPsmoKzP-Kx5QHZ2YtAniyoi3kb6yht5-ocEf1yVn7b_ls/256fx192f', rarity: 'covert' },
        { name: 'Kukri Knife | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtlOc-EC2WD_uJ_t-l9AS-3x0x15m2Hw4z9eS-QbgQnA5ElFu8OtBfqwIK2NLjg4gbciN8UzirgznQebo7XmtM/256fx192f', rarity: 'covert' },
        { name: 'Kukri Knife | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZt-MM-XD3eAzetJvOhuRz39kUpw42zRnoz7InOeOAd2XpQiQ7Ve5xixm9HhMe3l5wCI2YxHxS_2iDQJsHhKp4l7vg/256fx192f', rarity: 'covert' },
        { name: 'Kukri Knife | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZt-MM-eC3SY_vp3vt5lRi67gVMit2vVyt-sc3qSalUjAsR1QOQLthKwk9HhYri34gzXg4wXmHmvjiNA8G81tJ681NhB/256fx192f', rarity: 'covert' },
        { name: 'Kukri Knife | Night Stripe', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZt-MM-dB2CY1f1iouh5Sha_nBovp3OHz9ahIynFPQUoDZZ2TbINtRK8lYXuM-nksQbago1FyS_23CNB5ihu_a9cBvtwqC7R/256fx192f', rarity: 'covert' },
        { name: 'Kukri Knife | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZt-MM-HD3eV_vtksuBncCW6khUz_W2GmdupJ3mfPA8jW5ZwR-QN4UKxmtOyN7y25lfW2YtNziX8jCtN7Xp1o7FVXby906g/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWaR_uh3tORWQyC0nQlp4znQytr6cnjFbg8oC8BzRrQK50S-lNDgP-_r5wWP3t5CyX37jCIb7DErvbiJu9Hv_g/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Kmsj2P7rSnXtU6dd9teTA5475jV2urhcDPzCkfMKLcAE-aV3R-lO5l-e61sfqvZ2fyiBgvikqsXiMyRGw1U1Ja-dm06adSULeWfJvEZCxug/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Gamma Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjxPr7Dl2dV18hwmOvN8IXvjVCLpxo7Oy3tIYKVIVNtYFjS_FC2yLvogMK4vM7NmHQ36CMgsHfbmhHkh0tEO-dtg-veFwv998pqQw/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Marble Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWad_uN3ouNlSha1lBkijDGMnYftb3OTbVRyD8Z1RrNctkS6kobkZLzi7gTW2NpFxH33hi9Nuno65uxXAqs7uvqA7lyFHH4/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Freehand', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWad_uN3oupsSxamhSJ-4wKJk4jxNWWSbVd2D8R1TbYKtxCww4DvZL7j71OI340Qnyqo2isbu3ps4ecHAqtz5OSJ2C2JEBJP/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWad_vRzsvNocCW6khUz_WXQyN6uIH-fbFd1XJcjFuEJ50W6xofhYuu05AHdiYxNn3-viXlM7C91o7FVpU-ja-I/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Tiger Tooth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWae_vp_t-R7cCahlBMgtgKJk4jxNWWTa1QhDMMmQOMJ5BPtkYHuM-KwsVTYjIoQy3n-iStL7yxj57wDB_cs5OSJ2H8uCzPz/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWaB_ux6peRtcCW6khUz_TyGnt6sdnLBPQ4mX5ImTeBesRC7k4WxZO7gtVCPjo9Dznj5h3lLuip1o7FVNy-moo8/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Damascus Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWaB_up3veB6TDygqkR3jDGMnYftb3-ePQEjCMQkQuUDsUW7lN22Ze_mtADa3o0RyH3_hyMY6CY94b0GAPU7uvqAmF9xxno/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWaB_uh5ouJsSxa_nBovp3PQzYuoIH7BaA51CMZ3FO9cskKxk4DjP-7l4VPW3d1Nm3-s3HhPuH4-_a9cBjoiw1dT/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWaB_uF_vORtcCW6khUz_WvXnNqteHKQZlV0CpolFLZZthDpxIKyNLmx4ADYiNpHmXqvjSJA5iZ1o7FVI83_8yo/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Rust Coat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWaB_v1iteRlcCK9nBsijDCAnobsLGXCPVV1XpB4ELYIsEbqktbjN-_k71GKjotAyS6sjn8d63pj4ewGUaci5OSJ2GrdBJ84/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Lore', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWSF_uMvj-NoVha_mg8ijDGMnYftbyrBOw52D5R0FOYPtkG6ltOxNrjl4FPdiN0WzC723SxP6ypp6u8LVKY7uvqAFpeI3XY/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Black Laminate', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWSF_uMvj-NoVhaggRIptiqEiYfGLSLANkI-WJZxE-Fct0a6l4bjM-zgtQ2Lio1MnyitiClL7ig44eoLWKB3r_eD3BaBb-N1KCFKnQ/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Autotronic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWCD_uMvj-NoVhaygAkopy-KlIb6HifOOV5kFJRxF-RZtxLqlIXvPr63tA2NithGmHj_iiwc6i5qsOwEA_Jxq_CD2grfcepqx0gUsCA/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMW-J_upyoOB9cCW6khUz_WrSzdv4d3KXZgAmW5ZxRuMJskS4wNHjM-rktgfagoxEziX5iC1I53x1o7FVgsvyhlU/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMW-J_uh5ouR6Wxaxmg8isjG6lob-KT-JZwMlApdxTOQMtBTtk4CzZezktgLW34pBz3r-in9JvC4-5ucEB_Bzq7qX0V9JeuCeUw/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Bright Water', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMW-J_uF1teBncCK9nBsijGTVpYPwJiPTcFUmC5p3FO5YsRO_lIG2Me3rsVOM3tpAmSv_33ka5i5r5upWV6Qsq_HJz1aWbk46ROo/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMW-J_vlzsvJWQyC0nQlp4GrWzYuqeHjDZlN1XJohTecO5xawwdDvNuLm5wPcjY0QzyX83Xsd7zErvbgxKe4lfw/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Night', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMXSf_uB_t-l9cCW6khUz_WSAnIyrIy6ValInCJNyQeIPtxLtk9DuZr7rsQaI3YkRmyyrh3gc6Cl1o7FVxcznlCA/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Ultraviolet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMXSf_v5jovFlSha_nBovp3OAzd6qcX6ROFd1X5QkF7MDuxDpxIDgNb_msVTbiI4XzCit2iMfvH1v_a9cBqI-pjxG/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMXSA_up3oPFlSha_nBovp3PSnNj6dnnEbA4oDZB0TbIP5BTulYG2NO3q4lTWjYpAyi79jHtNvHo6_a9cBpN31nKp/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMXSA_uNzo-lWWyi9qhEutDWR1Nv8dXqWPVUpXpp5TLFbsxLtxNDkM-zi51CM34NFm3n_i3tNvXs44u0cEf1yDs3UNjs/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMXSA_vp3oORWWjuxlBMYvzSCkpu3dnmQagEhApJwTeENsRW-l4LkZLjh4FbWg91ByiT-jSJB5nk96uwFWL1lpPPSsWRCMw/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GSMWGRxetJvOhuRz39wUUksW7Vm4n7d3yUO1InXsdxTeQDukO4l9zuN7_j5QzYjIlFy3n6jDQJsHjNMoy1vA/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GeMWWcwO19oORoXSWMmBw1sTGAk5X8JRTLN1F4TowlROMLuxe8k9DjP-rj4QONjNhAnCuojiNLvytpt-pRUPci-PffilzIL_Rjtq5H6bYu/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | Marble Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GeMWqR0-x6td5vTi22qhEutDWR1NqsdS6Wa1UpC8cjQ7QJ5BHqx9zjZurgsgfZiYgXn3r7hy8b6yo_5OocEf1y7tM7KOE/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GeMX2Vw_x3j-1gSCGn20R15TyGnNv_cS3GZlUnA5smTLEM4xDpx4bmY77h51OMiIJNziX53SJXrnE8R49sMsc/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | Tiger Tooth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GdMXOZxutkj-57Tie0kCIrujqNjsGsIH-WOlUnCpp3FOAMshe-xNHgZe20slPX2YNFn336iy1L6Stp47oET-N7rXiT8mY0/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GCMWWc1Otyj-1gSCGn2011smSEyIz6eH2XaAIkDpt3TLQDtEXpwdHmYe_itgTd3o9DySr8hihXrnE81fc4CIg/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | Damascus Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GCMWORzO9ls_R6cCW6khUz_W6Hyt-vJXifaQFzCJNzR7RZsxLsx4K0N-_m5AbZg9kXn3r93S1NvHx1o7FV4ooHb_M/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GCMWGf0-1ztN5lRi67gVMh6mjXwo6ud3rEOgVyA5ZxQeFZtBDpk9e0MrzmslDW2d5GzSit338a8G81tHbrR9Yc/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GCMWiZzetyj-1gSCGn2xhz5GyHwtr_dS7EOlR1DZtyEe8MsBO-xNKyNbnq7w3b2d8WzC7-jSNXrnE8rdGSE7w/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | Rust Coat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GCMXSExOt6j-pnRi-2qhAitzSQl8GteHyfZ1coCZB3FLUDthK_kdKzZr7i4leN3okTxH6t2i9M6XxpselRT-N7rRxzBN3w/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_iKMWOU0e9ij-1gSCGn20x_5jnRnN37dH-TO1MgXsAhTeUPt0XskYLiN7-24AaPiIoRniX_2HxXrnE8-aG-K_E/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_iKMWGf0-tlpN5rQDu2lBEYvzSCkpu3IC_EawN1WJMjRrMIsBiwlYXiPr7h5VOKgoJAyi37hy0f6Chp5egFVr1lpPOSgy8u-g/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_iKMXCVw_1JvOhuRz39xEV_sT6Bn9mueX3EP1QjApd4QbZe5EW6wIDmNO7islfW391EzCWt3TQJsHib9FqZhg/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | Ultraviolet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H-OcMXeF0_56td5lRi67gVMhsDiHyduhcS7BaQ4oApUmRrFf4ES-k9GzPumxsQLej44Wzi37i3wb8G81tLNXf6VL/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H-ODMWOR0f56td5lRi67gVN252yBy4uteS7FaQ4kA5B5Q7EMthW6wdO0Zu7m5VTXgthFzy__ji1L8G81tIOO-uWD/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H-ODMWqV0uZJpOBncCW6khUz_WzWm9esdXOfbwRyWZR0ROACthDulYeyM-m34AeL3doXxX-s2Hwb7311o7FVDfDKraI/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | Night Stripe', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H-ODMWmZxuZio_V7Rjm2qhEutDWR1N__eS6WbFMmD5MhFOJZ4xjswYHhMbzktFPYi45BmS3_2yJO6Cppt-4cEf1yoG4tbbU/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H-ODMXOR0etJpfNrTieMmRQguynLm96uciqSawMgX8Z1RrEIs0G8wN3nYbvjs1fZ2I1GmC-o3CofvSdi4PFCD_SLffhL6Q/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6VsH_aSCmKvzedxuPUnFy-3l0tz5DmGzNmhdnmVblB0CcMjTbQJsBe6k9zlMuLl4gHYjoIRmDK-0H3ZqbeWvA/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6VgH_KfD2Sb0et3ou1WQiihlxEiuieAnrD7HifOOV5kFJZ2TbMNtES-xobhY-rj4lTd39gRny_2jiIf6C5u67oHBasm-PXRjADfcepqXuISEy4/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Gamma Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eOzmYWZlvvwDLbQhGld7cxrj-3--YXygED6-0VsYz-hJNKcIwM8aQ3XqFi7l7_ngpHquJ7LyyZl6SQg5iqInRK0hQYMMLJWkXxH2Q/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Marble Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6VgH_2SHGWcxNFwseVscCW6khUz_T_dyI2tJXrFbQN2X5MjTLUCtEa5kYXnYuPh5QGLjowUxXitjixA7nl1o7FVu7_YRqU/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Freehand', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6VgH_2SHGyVxdFjoN4wHxa_nBovp3OHzomhdC3BbwIiDZV2Ru9ZukK4ld2zYerg4AGNjItExCT52C0c7H0__a9cBh2VpMK4/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6VgH-qWDHWR_uJ_t-l9AXHqx0V_tWzRn4v7Iy7Ea1QlDsEiF7UP5xWxkIexZuPjsgLWi91MyC3gznQen1baSVU/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Tiger Tooth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6VjH-SaCWKC_uFkse9uSha_nBovp3PUwt-uJHjFOgYlXpt4EbQJshS8loCxP7vr7gDZiItMnir-iC1O7X1s_a9cBp8PQ5hi/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6V8H_KfG2KU_uJ_t-l9AS21w0smtm-HmIz8JHyVbgMmDJYjQeNf40G9moXiYrnqsgGNjIoUxSzgznQe0gLV55c/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Damascus Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6V8H_SSA2aDwvtlj7g5cCW6khUz_WvXz9j8JHjBaAZ2ApMhRLVZtUK4w9ziNerr4QDYjotBynmqjSlM7Ct1o7FVMY__Aoc/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6V8H_acHGSVxdF6ueZhW2fkx0t_4D_WntapICjCbgMkD8NzR7ZeskK4lNDvN7_k4wTZiotFzi35kGoXuV1xPlgw/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6V8H_-aAmKU_uJ_t-l9AX3kkEx1tz7Vw437dXmUbQ9zCpF2RrUDsRe4wNXuZuzm7lHW2I0TzC_gznQe3C7aMsc/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Rust Coat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6V8H-OHC2Kc_uV4uedscCS2kRQyvnPQzdn6dSiUbw4jX8MmROdbskHpwde2Yu-x4VGKiYtBni__hisf63ti_a9cBjfCVlsL/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Lore', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6d4H-CGHW-vzeFktd5lRi67gVMksWXQz96sIy2UP1B2D8dwRe5b4Be9moDkN7nl4QLYg94UmX-vjHhM8G81tMoT8OiD/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Autotronic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6N-H-CGHW-vwPtiv_V7QCe6liIrujqNjsGrIH2fOFJxX5F1TeICsRe8x4ezY-vj7gHc2N9HxHir3HhK7Cds5L4AT-N7rU0zpOnr/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Black Laminate', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6N-H-CGHW-vw-J3s-pWQyi-nBMmpzi6lob-KT-JbQ9zDsMhEO8L4xS7k93mMbu35wOPitpBzij9hngY5ypitexXB_BxqbqX0V9R9Pjb9Q/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6x0H_SXHmaE_uJ_t-l9AX_jkU925m_UnN-qcXOfa1UjWcN5E-AOshi7xNe1ZOjhs1fWiYJGzX_gznQeild8Gek/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6x0H_acHGKD1dF0v_NsTiWMmRQguynLnI2uIi3DaQd0XpNwTLNctES-lILgM-_j5gfcjNlAxXj83S5N73tssPFCD_REhu3w7w/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Bright Water', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6x0H_-QC2ae_uV4uedscHDjqhEutDWR1NapdiiWblJxCpdyROVftBS9lNa1Meng5wXd3oJEyy_7ji1J6ilu6-0cEf1yYi7ebTk/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6x0H-eWDHSvzedxuPUnHi3mkRx24j_cn4qgIHnGbwF0A5p1R7UI5xm-k9XnMrjq5gOPj95BxDK-0H2triMq-g/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Night', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV7diH_6aCW-E_uJ_t-l9AX3llBlwsGiAy47_cSiWagdzDpMjF-8MsRHrloXhP-_r4FOP2o1NyyzgznQeozLE8WY/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Ultraviolet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV7diH-CGHHecxNF6ueZhW2e2wk9y4jiBntn7cy2XPwMgD8BxF7MN4BK5l9KzZu3kswTaj4kTxST6kGoXuU3Nl_sm/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV7d9H_SSHnecxNF6ueZhW2fkkxlx5W3Wz4mtJHySag8iDJcjFuIM50S9x92yPuOz5ADaj9oTm3r-kGoXueH6PD3x/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV7d9H_2WHW-v1e94j-1gSCGn201xtj7dn96hJCmTOlcjCMclELUMtEW5lYDkNum351aLjo5Gynj62ytXrnE8619lrZ4/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV7d9H-SSHmKv1Px0se9WQyC0nQlp5GTdz4mqcniVPQAkCZYiFrQMs0TslYXmM-7i5wfb3dpEn32viShL7DErvbjmz8a0gQ/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-SD1iWwOpzj-1gSCGn20kjt2-En9mpcCmQag8hXsciQeJYthW9kILkMLji4g3Ygo8Uznj6jX9XrnE8raC5r1M/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-SA1iSze91u_FsTju_qhAmoT-Jn4bjJC_4Ml93UtZuR7JYtEO-mtzjN-_gs1DXjN9MyHr92n4d7S89sL4AWaR2_vbSigzFZKp9v8c7W1qI3g/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | Marble Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-SA1idwPx0vORWSSi3kCIrujqNjsGtdy-SbFUhApd1QbZbsUa7l9LmMurktgza3tgQxC38iS0Y6Hlo4rsKT-N7rTdSaj39/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-SA1iKxOxksd5lRi67gVMh62_RzdygJHORZlAlDpZwQOYM4Ri5k4HhNezg4wOLg49Nyy772y9J8G81tBUopZdW/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | Tiger Tooth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-SAFiEyOlzot5mXSi9khgYvzSCkpu3dyjBagAlXMB4R-YOt0OxlIe2ZuuztQXdjNhAySn52i5Mv3tj5rlRUb1lpPPHmhG_Tw/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-SH1iSzftztN5lRi67gVMj4ziDz9-hc3vGbVAgCpB4RbQNu0G4lNHgPuqw4QfXi45BnHmtiixM8G81tDT9ezBU/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | Damascus Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-SH1iUwON3o-J8XBa_nBovp3PUm9_7JHOWZ1QjAsN0ELUD5EHpwdGxP7nksQTbgoxEyXj833gf7S1j_a9cBoUrfx8l/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-SH1iWzvx1teVWQyC0nQlpsGjRw9_8cn6QPAd2DZN1TbJYtxjumtGzZLyw4wSIjN4Uzin3iyNPujErvbgnFqUCGg/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-SH1ifyOJztN5lRi67gVMj6m3Rnt2sdnOUZwIgWJAkTLUJ4xbrx9buYuywsgCLjItBmC79jiNN8G81tGbdgHHm/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | Rust Coat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-SH1iD1etzvN5iQSC1kCIqtjmMj4K3d37COgAhXJEkQedc4ETuk4fkP7jq4VON3otFnCz_iHwdvH5qteZRA71lpPNCX9mpHA/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-bF1iUxf53pN5lRi67gVMh5z-Hy4z9IniUZlR1DZVzRrUMsUPpwNPuNuLn4QCL34xAznmt3Ssd8G81tIt2ow-p/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-bF1iWzvxzo_VWTSahkBwrjDGMnYftb32fPFIkDZV4EeJbskTpxt2yN-6wtQCIjY1GnyWriyIauCxv4LtQAvY7uvqAMerubhQ/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-bF1iHxOxlj-1gSCGn2011t26Bytr_cn-VZwciXJskRLQKuka9k4ezYrnqtQXf2YhGzC6viXxXrnE8k9yhp-k/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | Ultraviolet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-AAViA1PxmvORWQyC0nQlp4WTSnN74J3PCOAF0A5V3R-ACsUS6kYCzYrzk7geI2YlMzS2r2i1NvzErvbhVpSdBEA/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-AHliUwP5mvORWQyC0nQlp42zQydivIn_EaQFzXpRyFLIDuhe-ldXmZOLg7lSP3dlAmC79hn5N5zErvbgU3gnTIw/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-AHlidxP1-j_VoQRa_nBovp3PSyd6qdSqePQEhDpJ5E-cI5kK5kIe2Zrzh4Qza2I9Fyiys2i1N7Xpv_a9cBuq3CrbI/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | Night Stripe', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-AHlieyOl-pPJ9XSCjkCIrujqNjsH8dX2VbVJ1X5Z0RbVZtEO5mtPhY77qtlbc34IQxC_6jy0f7C0457wLT-N7rW2ankyk/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-AHliEwP5zj_R7TSi9qhEutDWR1N3_cnmWOAJzXJVwF-AO4xW8ld3iY-mz4lff399Mzi_7i39M6Cc947wcEf1y1H02ID0/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SD1iWwOpzj-1gSCGn20h2smqHzNuqcy6TawckApJ5EeIJuxPpwNaxMejmtQLa2o5Nnnj3hy9XrnE8H9hk9aQ/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SA1iSze91u_FsTju_qhAmoT-Jn4bjJC_4Ml93UtZuFrJbtRW_xNDhYbyxsgWKioJCxS7-jCga7Sto6usFUfIkq6bS3gCTMap9v8f8BQu6Gg/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | Marble Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SA1idwPx0vORWSSi3kCIrujqNjsGgI3mSbgIoA8N3TeICtBC-kYG0Nenl4QPYjIJHmX6qingY5yZut-cHT-N7rRs0KjZk/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SA1iKxOxksd5lRi67gVNy4GjTydv9JHvEZgJzC5NxTecD4xe9ltGxP7_r7gaK34hMzyr_jiob8G81tBYNQxXS/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | Tiger Tooth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SAFiEyOlzot5mXSi9khgYvzSCkpu3JyjBawQkXsF0EeEO4Ea_m93iNLjk71PfjtlDxSms3S1M7yhj47wLA71lpPOYHm96Lg/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SH1iSzftztN5lRi67gVMksmTczt-pcyiVOFAnCpJ2FOMOu0K4x9XmYuzq4APa3YgTz3mvjH9K8G81tONtHs_a/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | Damascus Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SH1iUwON3o-J8XBajhxQ0vjy6lob-KT-JZw52XpsiQuADtxjsm4GxPum37lSLjINBni7-iS1K7S9v5OkAUKIlq7qX0V-S_V0ZqQ/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SH1iWzvx1teVWQyC0nQlp4zjVyNn4cX-SPQcjCMBxRbIL40Kwl9SzNu3i5wSLjY9Byyz93X4f7jErvbjY1bBrVA/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SH1ifyOJztN5lRi67gVNzsWTdn92oJy6XaVUgWJQlQuALtxS4l4HnMrzk5VDc2d1Mmyj9hn8b8G81tHhX34fn/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | Rust Coat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SH1iD1etzvN5iQSC1kCIqtjmMj4K3dCqUbgVzDJQiR7FcshW8kNfvNejh5wKPgokXyS__3y1N634_5OsKVr1lpPNkLaxKOQ/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-bF1iUxf53pN5lRi67gVN_4mrQzt74eCmebgUhXJFzTbQMshm-wd2zM--xtAbYi48Xmy_-3CMb8G81tPLKibvi/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-bF1iWzvxzo_VWTSahkBwrjDGMnYftb3zCa1cgCZMhFONf4BDukofkZe7i5wPbid8Wniqtji5B6iptseoFAvI7uvqA6NgizlQ/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-bF1iHxOxlj-1gSCGn2xl-426HnourJHKWaQYkDpt5FLMKuxW4m9bvNO7k4ALYjIxNxH77iHxXrnE8aQrZRtQ/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | Ultraviolet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-AAViA1PxmvORWQyC0nQlptmmGmdeqcHyebQ5zXJVzFrMC4RO8moHlZOPj4Fba2dlAzin3iX9L7DErvbgj2cX5Sw/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-AHliUwP5mvORWQyC0nQlpsmuDzNj6d3-SaQ4hCpN1FOMM40LuwdeyMe625gOIidlMmXn6hi1N6DErvbhNNNdMtg/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-AHlidxP1-j_VoQRa_nBovp3OEzoyhI3nBP1AlX5AkF7VZtRG6kd2xM7vj7lCIjoNDxSj_h34d6Hpt_a9cBqAgwT_I/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | Night Stripe', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-AHlieyOl-pPJ9XSCjkCIrujqNjsGpdn2eOgZxWZJ2FO5Z4xW9kdyxYbjjsVGK2thEnC2th3lA63xj4O8HT-N7rY8ygNQY/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-AHliEwP5zj_R7TSi9qhEutDWR1Niud3ufbFMpA8B0TeNbuxW6w9PuP-_ntlTWi9oUnir5j35K5ypq67wcEf1y6MY6rfc/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3sd5vTi22qhEutDWR1NiocCqeZwYoC5pxRuMM5BPqxtTgY-20sgXZ2NpHnyqqiCpA5nk56u8cEf1y_UmCvro/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5rQyiwng0isi-JpYL4MynLO19qX8YfGb5d6lSmxt2yZeLq5QeI2dgWzSmsjiMauyxr5O4LB6Ej-6PXjVyQZLc54pZRJOHnE0pg4-kgmA/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Gamma Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5sQiyhlBEjjDCEiI31JCLdO1JPVssnHaMU4EG-ltyyPuLq5gHYj9lMzyz7hyxNuCs-5OoDVKImrKTe21mXZ-Zu5I5Deqhh5Zn_hA/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Marble Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5kTjuxmRgYtTyBn7D1KCzPKhgpXMdyTeBb5BPuktPvZOi2sgWM2d9HmSr-i3xAuidssO8HBKcsrvLXkUifZhxP_T8X/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Freehand', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5kTju4kBkYpi26w9_GLSLANkI-CcFyQbResEbuxIa0Nunr7wSMj95GxH77i39N6Hlitu4LB6oj8vHfjxaBb-PSbjYTRA/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5zSiuhlCIrujqNjsGscnueZwYoDJUmFO8Nsxfpx9buMeLm5Afe3Y8RxHivjS8bu34-4rsHT-N7rRZowTHv/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Tiger Tooth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vt59Ri62hyIooTyLnYrGLSLANkI-XJJ0FLNY5BOxw4XjNu-zsQDd2IpFyy32jS0b7Ss95L5RVaIk_qyE3RaBb-Pz4OFuTg/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3od5rQzy2kSIrujqNjsGrI3mTbQR1DpNxE7YK50O4wYfnMe207gLc2ohDyC7-jiobvy445L0GT-N7rT12_gEU/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Damascus Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3od5tTiSyhh4yoALcyrD1KCzPKhhxX5RxTeYN4BnuxtPgMurg5Qbbjt4UxC2sjS1N7ntv5-lRB_YsqPHekUifZkcTPu2g/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3od5vQDuwkBkYvzSCkpu3dy-QPAcoDJYjRbYI5xjrxNKyN77itFPaiN9Fmy-t2C5Jun5ptrsLUL1lpPMuQwpi3w/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3od5mRiW2kSIrujqNjsH_eHrFOAdzA8B2TeQLtBm6x4flNejislbb2tlHxCyti3tK53xq6uhTT-N7rR3UNjRY/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Rust Coat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3od56Wyy2mSIsvTSDn7D0JC_OK1s-C5F1RO4Ktka_kofuMevjtgWMjI8QmSj7iStM7itv6-hXUfEnqKHQ2xaBb-ObX0d6iA/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Lore', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF1pd5rQD66kCIrvC-ApYPwJiPTcAJyAsZ3FrINuhK-l9O2Yei35wTago9NyCj4iHtP5n5itbsGA6FwqaTJz1aWiYxmw3g/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Autotronic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNFxo95rQD66kCImpimKjp32LyLEAVp5Xco0W-cIsEW9xty1Zb-z7gHd3o8UzSv3hypNvX0-tu5QWKMk-6XUjAiUYLAjoc5UIuuJ8AY/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Black Laminate', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNFxo95rQD66kCIlvzyGkbD1ICbOMFdkX_0sHLBS9g7qx9HhMuyxtA3b3o0Tyij92H4fuy5q675XAPBxrvHVh1nBOeFo5ZYAOr_5Gl4TXifL/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF-qd5tSzmygSIrujqNjsGhIymfbFB1D5siE-RY5kK_xtTmPri0sVaIjtpCxCn53Hgf6XlotecLT-N7rWlxTPbP/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF-qd5vQDu2hgkYsTKXn471HifOOV5kFJJzE-IJs0K7mtfgN--0tATegt1MmX332nkcvS8557sDB6Bx86XejQ7fcepqCHZuB98/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Bright Water', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF-qd5mTCyymyIsvTSDn7CgcRTLN1F4Tox3E7RY4BW8l4CyMLvq5gSL2oMXzCyqin5I5nttsrsGA_Ihq6LX2lnAL_Rjtv1VSd_s/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF-qd5-SiugqhEutDWR1Nb6eHLCOlR0C8Z3TeEPtEHsw4KyY-Lh5gLZ2d9BnCiv2itI7Hps5-scEf1yekXUy9I/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Night', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNFlv95nRi67gSIrujqNjsGtdSqTagJ0CsF5RbMK5BC_lofjMLy0sQPcj90Tn3r7iC8cvShv5eZWT-N7rdA_agun/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Ultraviolet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNFlv955WjujmRgYvzSCkpu3dHKePw8oW8N5QOYLshW-wdC1N--0tAHajoNCmCj7iStI6Hw-tegBU71lpPP9HYRDsQ/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNFloN5tTjmjmRgYvzSCkpu3d3yWbFIoDJYiE-cLshHtkoHlYbyw7gzX2Y8WziysjH9I7n4_5L5RU71lpPPWuYfcpQ/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNFloN5kSjq7qgkmvQKJk4jxNWWfZgMnD5ZyF7ICs0awxoHkZuyw7wHYi9kUn3qvh3hI7no-5elXUKot5OSJ2DhCNq62/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNFloN59Tjm2qgg1sTyLpYPwJiPTcFUkDMFxRecO50LpxNazY7vgtAHcioNExSr4iH4Y6nk-57pRWaIlqPXJz1aWG3uFyDs/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SD1iWwOpzj-1gSCGn2x8hsW6DmIqpcXjBZgYkCZt5F7VcthS8ldS2Nr7m5VCMi4gRyyuqjHtXrnE8oar8MtU/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SA1iSze91u_FsTju_qhAmoT-Jn4bjJC_4Ml93UtZuE7UDuhC-mtbnNb-xtFfZ3YtGzSv6hisauns-5b5WVqIgqKDfjwjEYKp9v8eb6jzRvA/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Gamma Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlY20kvrxIbrdklRc6ddzhuzI74nxt1i9rBsofWD2IIDDcFQ9MwvV-FO5xejngpK16c6bmyZguiUj7HqMnRfjhBhOOOJxxavJeVUN3dA/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Marble Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SA1idwPx0vORWSSi3kCIrujqNjsH8JXvCZgEiDZVwEeUK40W6ldaxZOnn7g3Zj4gUmySoi39A7SxqsrsET-N7rT4plPHN/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Freehand', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SA1idwPx9teVWWjmMzE0YvzSCkpu3cC-Wald2A5tyFu9esxDpktO2Nrzq4wzaiYlGzXmo3SxIuHw65bsLU71lpPPkJkZySA/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SA1iKxOxksd5lRi67gVN_42jTnourc3OSbA4iCJV5F7UCsEXpx93jYrnn7gfago4QyH6ri3tL8G81tAzA6RBm/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Tiger Tooth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SAFiEyOlzot5mXSi9khgYvzSCkpu3JHmWZwFzWZB1R-RbtxC_kofvMLzg51SLj41Nmyuqjyoc5nxi5ekLUr1lpPOee5ognQ/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SH1iSzftztN5lRi67gVN1tW3UzousdnrBbFB0WZt0QbVctEawxoGxN-ywtgGNjtgUySz-hiIa8G81tLF2CaOG/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Damascus Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SH1iUwON3o-J8XBbqxSIrujqNjsGpIn_GbA8pA5J5Q7Jesxm5w9flZezi5FHXgo9Fzy_2iX8c7yhu47oCT-N7rcl4-qvl/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SH1iWzvx1teVWQyC0nQlpsjyHnIyvI3-UbgImApJxTLYJsUa9m4fkY7y25lbe3o8UzCn5j39BuzErvbgKxgW_zw/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SH1ifyOJztN5lRi67gVN_4W-Byt-hIi2UbVV2W5p2Fu4PuxmxkdO0Zejj7wff3okWzCT3ji4f8G81tJdWCOsa/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Rust Coat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SH1iD1etzvN5iQSC1kCIqtjmMj4K3cXiUbFd1ApZwQ-Bb5Ba5kYfjMu3hslSI2oNDyi6shy4bvy1i5-hWU71lpPPSsstkpw/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Lore', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-QG1iY1OBio-xoQRa_mg8ijDGMnYftb3qfPQZyWJtyFuNe4BG5ktDuY-ritleIid1Hynir3H9KvH055btRV6s7uvqAU_ahZxI/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Ultraviolet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-QG1iA1PxmvORWRzy9gQ4qsjO6lob-KT-JbFQlC5YhFrQN4xe4m4ezNL7g4QyLiItFyS772C5I7ilq6rpWUaYh-rqX0V82KISxGQ/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Autotronic', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-UHViY1OBio-xoQRaygAkopy-KlIb6HifOOV5kFMF1QrMNu0Puw4DvYbnk5Qfc2d5Azyv_3C1O7Hlq4ulRAvcn_qKBiFvfcepq3JPpPWw/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Black Laminate', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-UHViY1OBio-xoQRaxmRwkuAKJm4LwLyrTO2l8U8UoAfkJ5kTsmtfvNe7mswOL3YNByX_9338Y7ig44-cEV_Yk_PGBjgnCZeY7_9Bdc4dD_RHM/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-bF1iUxf53pN5lRi67gVN-6mqBz4msIHnDPAd1X5YiQuBe5Ba5ltG2NOvj7wTcjo1Eyn79inwd8G81tJCD569m/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-bF1iWzvxzo_VWTSahkBwrjDGMnYftb3qRaFMmCpokE-YOsRW5xNbjY-ri7gTb2YpDz36o3XtL7H1psecLUfI7uvqAW2HsimI/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Bright Water', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-bF1ifwut3vt5iQSC1kCJ-4wKJk4jxNWWVOA4hA5MjQONbtRGwkYHlP77l5FaLj9gTxS76hn4avXo-t-tTV_Uk5OSJ2DtQY32N/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-bF1iHxOxlj-1gSCGn20V24znRw4v7JXPEaVUnW8AkQbUP5xW4wYKzMeu3sgPbio4WzXr_3HxXrnE84qvZFNo/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Night', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-AAVieyOl-pN5lRi67gVMktj_XzNapIi6QPwYjCcd1FOIJsBPsm9TvM7-ztFfXjIgXnyX7jCxA8G81tHpNPllX/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-AHliUwP5mvORWQyC0nQlp5GiDnIqseHPGalMnXJMhQ-cDtkPrm93jZe7l5wbb2YsTyy352CpP7TErvbiCPrzwVA/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-AHlidxP1-j_VoQRa_nBovp3OEzd7_dn_FOAVxCpp2QuQC4xW9kYaxNOLqtA3dgowWyyn7jnxAuCxj_a9cBvBQQTn3/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-AHliEwP5zj_R7TSi9qhEutDWR1Nb4IH_GZw8lW8QiRu4M40Htl9W0NeK3tQKLjt9Cm3j4iypO6309suYcEf1yAgdvvhk/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tsIc-VD2OV_uJ_t-l9AXzml00i527XzouseH7GblAjX5N3R-NbuhLswYfjY-zj7laKjdkRyX_gznQeK-1-7hY/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tsLc-RAmaTyv5zsfNlcCSyhx8rtjSfn4vGLSLANkI-C5IiRrQN5BaxktbgNOrksVOPj9gRnin-jS8fvX4_6-kAAqNx8vLQiRaBb-PCt4gg5w/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | Marble Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tsLc-eD3WSzetJtuBtSha_nBovp3OEw92gdH_DPFcnWMB2EO9f5EPsktzhNO_n5gCIjdhHxH3_hnwauiht_a9cBmW6TNz5/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tsLc-JC2WCwNF6ueZhW2fhkU9wtTjWytepcHueblR2ApslReYM4xS6kYDlZrnjtAzb3dpBzi2skGoXufPjJEMh/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | Tiger Tooth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tsLs-HB2CV09F5ouBnSCyMmRQguynLnNypeXqeZ1coC5tyE-9fuxbpw4e1Yuvj5Qza344TzyuqjyoY6n1v4fFCD_RAjV1-VA/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tsMc-RAnKVxdF6ueZhW2e1kx8ksTnVzdz9Jy7FawNyX8NzQLNc4xK4xIflYb7n7gbcjI1Fzi_3kGoXuVwKdqHm/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | Damascus Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tsMc-XD2qR0u1jo955XSCgmBwYvzSCkpu3IHqeOwImXMFxEbULtUPqx9XmZO_iswTcg41Gzy743CxL7ntusLpTWb1lpPNKGasTBw/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tsMc-VAXWTxOpJvOhuRz39lBsk5m2Dz4mrdX6SZg92CsEhRrIO4USwmtHkZe3rsgTXjd9AniyrhjQJsHhzJIw6OA/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tsMc-cB2uVxdF6ueZhW2fmxBx-427Xntr_c3rBaFIkDZAhRLVYtxXql9LjMe_itQKL2d0UzXmskGoXueV9R1qR/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | Rust Coat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tsMc-AGmKVzdF9vuhvSha-kBkupjDLy9-hcymePwV0XpN1E7MPshfrl9HkMO7q5QyI2Y9MnC353ClLvCdu5PFCD_SZq2fGzA/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tlOc-XCneR1dF6ueZhW2fqxU0ktmTTytugdi_CZ1ckDZYiRO8Muka-kYXiZuri4wTdjIJDyHr9kGoXuTEenuE-/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tlOc-VAXWV0vpJsu57Sii_qhEutDWR1I2uJS-QZ1IhCJB2TOcOt0PuwNPvM-3k4VSMi4sQzCysiSxP73xi6-0cEf1y17OWkH8/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5tlOc-EC2WD_uJ_t-l9ASzrwRt14WXTmNqrIy-eaAIoCpdyQuYJtxHuwNyyZe_m5wHb39lCmSTgznQedPIzvI4/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | Ultraviolet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5t-L8-DG3WAzetJvOhuRz39k0Rw4jiHw4r4I3nEZ1UiWZJ3F7Jb4xPul9HnNejgtADWjNoUmC76iDQJsHhIUD-ATQ/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5t-MM-XD3eAzetJvOhuRz39zUgjtTvQyYz8ci6TPARzCZtyELILuhbsltazMOm04AHXiYJMziytjjQJsHj5P22EGw/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5t-MM-eC3SY_vp3vt5lRi67gVNzsW-Bn9-qIniRbgAhCMAkR-ZfsxPtmoDvPuzr7lHa3YhBzCr-3Xwf8G81tFy8vCpc/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | Night Stripe', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5t-MM-dB2CY1f1iouh5Sha_nBovp3Pdmd-qJ3rFZwclA5AlEbINsUS9ltbhM-6xtQHfit4UnC__hylB6Xpp_a9cBpOKr6LC/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1O_eG7e5t-MM-HD3eV_vtksuBncCW6khUz_W7Rw9ihcHqTaFUnDMYiEeEOtRe9kNXjM7vhswbZ3Y1BnCv6jSgbuix1o7FV-Na7K10/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWaR_uh3tORWQyC0nQlpsmXcnNaoeHuTZwUiWMZzRrVZsxm9x9ThNrzj4QCPjdhNmHj73S9KujErvbhX2ACGeQ/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | Doppler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWad_ux6seJiXyyyhxEYvjyXmIP8KDHCOml8U8UoAfkC4UbuldyzNOy35lHc3opEyS2qhiocvHs_5bsHVPIgq_bQhgrBM7w9_9Bdc1T7Obpq/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | Marble Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWad_uN3ouNlSha1lBkijCqMnoDuHifOOV5kFJMlQecC4RW5x4bkMLvgsgGP2IIXzy_-iysaunlo4bwEBfYh_aLS3A7fcepqAVr8ibw/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWad_vRzsvNocCW6khUz_W-Gy4n9cC3BOwIhA5t2ELFbuhm8x9LhYevq5AzZ3tkUmyr42HtIvXp1o7FVC_3pdDk/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | Tiger Tooth', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWae_vp_t-R7cCahlBMgtgKJk4jxNWXFOFN1XMF0Q7FfukW7moCyN-nq7gfejopDmSn73S4c7Ctu4esDBaUt5OSJ2J-DVBrR/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | Blue Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWaB_ux6peRtcCW6khUz_WqHnNmqJH7GPwEhXJN5F-Ff5hPrlt3uN7vhsw2IidpEmyyq3yxJ6Cd1o7FVPYygbVE/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | Damascus Steel', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWaB_up3veB6TDygqgoutzKSpYPwJiPTcAYoAsB4E-cIsRXqktKyMOzm4QWL3d4QziT53ykfu3tqtuYHBaJz8qzJz1aWxqN5i4Q/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | Stained', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWaB_uh5ouJsSxa_nBovp3PTm96sdnmRPwcnCcB0QeVcsEG-mtLiMunn51CI2YhByy-ojnhLvHo5_a9cBs8s08Rw/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWaB_uF_vORtcCW6khUz_WqBzd39Ii_CaVApAsYlEeUO4xXslNexY7nl5ALWjI0WmSqq3XlN5yx1o7FV8eN3eSM/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | Rust Coat', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWaB_v1iteRlcCK9nBsijDCAnobsLGWUaFB1WZAiE-Vf4UK5m93vP-3ntFGPidlDzn36jCobuy5usOwKA6oi5OSJ2B5Cd8s9/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMW-J_upyoOB9cCW6khUz_WTQn9iqdXjDOwEjDsdyQuQC5BHpkNyxML_i5Abeio9Cyy362H9N7yZ1o7FVCmRPBKA/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | Boreal Forest', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMW-J_uh5ouR6Wxaxmg8isjG6lob-KT-JZgUhDZVwRe4P5xm-mtfiZOnkswTc2YtEnC36jC4bunk94e4HVvAsrLqX0V8QiPlhEA/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMW-J_vlzsvJWQyC0nQlp5zzcw9qoIHuRZgV2A8EhF-IDtRC6l9PjN-zk4VHW2dhCyC-qjCtJ6TErvbjqnV9ukg/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | Ultraviolet', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMXSf_v5jovFlSha_nBovp3PTzIuudXLGbVMkWJd0ELEPsEa6wNa0PunktASMj44QzSr2hiwcuHxt_a9cBqbhUpOe/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | Scorched', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMXSA_up3oPFlSha_nBovp3ODydepeCqeOwBxC5NwQ-NZ5BDswIKxP7y04wzdgt9NzC_33XlBuChr_a9cBq0veVHG/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | Safari Mesh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMXSA_uNzo-lWWyi9qhEutDWR1ImueHmRbwFzCJF5RO8OtRXpkNyzM-rn51aP2YpEyS73ii5Auits6u0cEf1yj0RX76A/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | Night Stripe', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMXSA_uB_t-l9XD2hnA0ijDGMnYftby3GOA4pX8EiReRYtkbtkIXkY-y05FeIg4NCyi79ji4d6Hw65-0CAqU7uvqAN4w4WLQ/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | Urban Masked', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMXSA_vp3oORWWjuxlBMYvzSCkpu3Ii2TbwEjCZpzTOUIskawlYCxN7nisg2I2olAmyqrhy4duC5i67wKB71lpPPq3A_5rQ/256fx192f', rarity: 'covert' },
        { name: 'Classic Knife | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2te7cjd6HHXmHBxep157VtTi_rzUR-5WiHnt39c3_EZg4pW5UjQOZbsBCxw8qnab32FBG7RA/256fx192f', rarity: 'covert' },
        { name: 'Flip Knife | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2oZK19bqjKVjbDkbtwtbU4S3jhwElw4DvVzomhd3_CblV1CZd2TO5f4RG4lID5d7S15Y9TpQQ/256fx192f', rarity: 'covert' },
        { name: 'Gut Knife | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2pfbAjd6TAXDSSkeh3trdtTCy1zUV2t2vTyoyrIHzDalAgCsN1ROcO40O6wMqnab0rKy1qHw/256fx192f', rarity: 'covert' },
        { name: 'Karambit | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2labZsLfKaGinEx-0u5LhqGHrjlElz52jRmN2sd3yfb1NzWZVwRbNeu0S5k9WxMuvh-UWA3ObnwJvj/256fx192f', rarity: 'covert' },
        { name: 'M9 Bayonet | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2jMZtvIemcAGKEj7ojtOIwSnrrkEt25WiEw438cXuUaQB0WcBxFrUItxa6lNezMOKzsVPAy9USYWigJ8Q/256fx192f', rarity: 'covert' },
        { name: 'Huntsman Knife | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s26aad5KfOSAimVlugu47U5HSrmzEp14zncz4ygICiealIiAsF2EOdYtkTpwNXuYbjk-UWA3JpY_ZDP/256fx192f', rarity: 'covert' },
        { name: 'Falchion Knife | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2oaahuKPmcACmSlL4u5uVqG37klhh24DnUytaqJXKQbgcmX5RyF-4Puha8xofmZejg-UWA3FLkEz9H/256fx192f', rarity: 'covert' },
        { name: 'Bowie Knife | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s29fbZ7KeaSAliSzvl_ta88TX61xExyt2nTz9eveHjEPQRzXMcjFuYIuhHtkIKyNLnmtACLg4sX02yg2XbF4Kcv/256fx192f', rarity: 'covert' },
        { name: 'Butterfly Knife | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2sfbB5JeKVAn7elO8l6LRoF3_hzBsmtWSDzt-rcy3BP1AnXsR4FOJZskG6xtDkM7627xue1dy94mNpNQ/256fx192f', rarity: 'covert' },
        { name: 'Shadow Daggers | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2-fbdlbvXKWWXIlbh15bdrTnvmwkt34z_Qz46hdnjFbAIkCJdzR-Zctxi5kNb5d7S1mgn3amY/256fx192f', rarity: 'covert' },
        { name: 'Paracord Knife | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2tZ7ZpbqWRXmWTmbsm5bU5TXu3lkR_5j_Swor8JC_BPFVxWJd1FuID4RW7w9b5d7S1z-U4Rao/256fx192f', rarity: 'covert' },
        { name: 'Survival Knife | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2taapkM77CDzbIlrsms-NsHHGxzUwj5G6En4yuIy_BbQAjC5VxQLRc5hm8x4HvKaq8sEukLuHu/256fx192f', rarity: 'covert' },
        { name: 'Ursus Knife | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s27erd4M77AXWWWx7h3tOA5SyvilEkj5WuGw42qc3zEOg4iDJEjQu9b4xa6w4DgKaq8sDVgNcPY/256fx192f', rarity: 'covert' },
        { name: 'Navaja Knife | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2pcbR-Oc-ZD2SbyuB_tuQnGXu1kBxw62_dwtird3qXZwQgXJV0E-4PtESxl4ezYr6x4FaMjI4UyzK-0H1iy36efQ/256fx192f', rarity: 'covert' },
        { name: 'Nomad Knife | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2hfbBpL_-BQDPEw-hz57cxTnCxkEh_5jnVzor8dymXbgAiAsFyEOEMsBW8l9O1Ne38p1uJmh0Kkm0/256fx192f', rarity: 'covert' },
        { name: 'Stiletto Knife | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s29fK1hJeSHASnCmO8v4bc_HCjilkkismTWyNutciqealMhDsR5F7MM4UWwlYC1Zr7n-UWA3E6ZCYCt/256fx192f', rarity: 'covert' },
        { name: 'Talon Knife | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s25YaBiN_2SBWKCj7ghsrRrTHDnzB8h4mTRw9iudC_DPFVyCsF3R-Zc4xK_ldXgNb7qsgDAy9USS1NPX9M/256fx192f', rarity: 'covert' },
        { name: 'Skeleton Knife | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s29Y6FhJeScACnDkL8j6LU8GS3mwUh24G-Bno2tIymeblMgC5R3F-ECsBK6k4XuN-Lh-UWA3P3GyEv9/256fx192f', rarity: 'covert' },
        { name: 'Kukri Knife | ', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2lfa9_Kb6VXmPGwuogsbNvSyi3zR4jsTnQztyqdS6QP1IoXpoiEeAC5Be5l9CxKaq8sIvgdE5J/256fx192f', rarity: 'covert' }
    ],
    gloves: [
        { name: 'Hand Wraps | Spruce DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_u13ve5WSDu2jCIrujqNjsH_InuUaQQmDJd2Fu4NshO7kIGyYeu24Affg98UxCX_iXhJ5i465bwHT-N7rXbV3WG0/256fx192f', rarity: 'covert' },
        { name: 'Hand Wraps | Desert Shamagh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uh3svNgTBa7mggpty6RlYDtKRTILFd-XccfGb5d6lSmwdS1Zrzr4Q3Ygo5Ayiur23lL5idr5eZQBapzqPDRignHY-U058QHLOHnE0oCUw1MCg/256fx192f', rarity: 'covert' },
        { name: 'Hand Wraps | Badlands', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uh3svNgTBa8hxwptDi6mY70LhTLN1F4ToxyQuIK5EPqkobkZrjm5lGI2NoTni-vhnwd5iZp4-YHAqJxq6DRhlzIL_Rjthe3KNwq/256fx192f', rarity: 'covert' },
        { name: 'Hand Wraps | CAUTION!', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqh4mpimMlYHGLSLANkI-CcBxQeIMtEHsl4CyNOjm4QDa3dgTniWvjnhJ7Hk54bsEV_Ak-KWE3BaBb-Pt8HWajg/256fx192f', rarity: 'covert' },
        { name: 'Hand Wraps | Duct Tape', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqhkysCmRm5_8HifOOV5kFJF5R7IIskW_kIXnNriz7w3eg4hMzCX-2nxP6SZo4u0LBKAi-aXV2V7fcepqgxTHW6A/256fx192f', rarity: 'covert' },
        { name: 'Hand Wraps | Cobalt Skulls', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqhsmsS-MmbD7LT7CAUV7T84sBohW60fg1srnZb6zsw2Ng41MmST43C1L7is9574CBKIh_q2Big_IMOdutcNRd_iuU13QD7PQAmaY/256fx192f', rarity: 'covert' },
        { name: 'Hand Wraps | Overprint', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqhsmsS-MmbD-JCTKO0JiU8EfF7tP53_ky4O_c_Ti4wTe3t4Uy3j6jSxM5ic-4usBA6Mj-qTejAzJMbc14MRWd_v0SE-PRlxR734mHNkv/256fx192f', rarity: 'covert' },
        { name: 'Hand Wraps | Giraffe', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqhsmsS-MmbD-KDnGOFB1Zc4pEr9OrBm6w9bgM-Pi4wLe34tNnCT3jCxJ53s_6rsBUqQkq63V2wnBZOJo55YdZKHw2FL19Wg/256fx192f', rarity: 'covert' },
        { name: 'Hand Wraps | Arboreal', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqhsmsS-MmbD-My7CMGlzW88vKrtT5Uj8jIblMbnksQfb2IlAzXqojCpP6ylp67kLAKBz_6aFjFnCN-I66ZQHdv-5DUPZjQpqjqQ/256fx192f', rarity: 'covert' },
        { name: 'Hand Wraps | Leather', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqhEutDWR1NiodnmUPFNxX5B3TOFcuhfqktPvYe_h4AHWjolNnHn3iC1Puiw-sL0cEf1y0Sy-Ca0/256fx192f', rarity: 'covert' },
        { name: 'Hand Wraps | Constrictor', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqg4psjaAiYTwLxTILFd-XccfGb5d6lSmlYDiY-_r7gzc2IJGmX6t3CMb6iY5te0BBKt0-qDVhwyXYrU_6MQDIuHnE0r2o5Rb7g/256fx192f', rarity: 'covert' },
        { name: 'Hand Wraps | Slaughter', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_vxztN56QyimkhUzti-6lob-KT-Jb1UjX5t0ROIN5xW9l9e2ZOmw5QWLi41Fmy6r3Sgb7C1o5etUBfcgqbqX0V-0bsdMFQ/256fx192f', rarity: 'covert' },
        { name: 'Moto Gloves | Eclipse', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJsuB6RiqMlxEmsDa6lob-KT-JaQMpDpFzFOdY4EO8lIDnMLjr5ALZjN1Dnyj7iyhAvXo55ucKWadx87qX0V_LSR8vSA/256fx192f', rarity: 'covert' },
        { name: 'Moto Gloves | Turtle', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJsuB6RiqMkg8itjO6lZ34LyzCAVp5Xco0W7VftBjqxILkZbvi4FfYitpEynj6jSgc5i4_tegLV_F0q6SFhwDJMuUjoc5UdYAe6j0/256fx192f', rarity: 'covert' },
        { name: 'Moto Gloves | Blood Pressure', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJs-B7TSa9kxQlti-6iIr9HifOOV5kFJp2TeYOsxWxm9OyM7zl5AKIio0XyyiojiJA6C866-YFV6oi_6GBhwHfcepqnQk3Qfo/256fx192f', rarity: 'covert' },
        { name: 'Moto Gloves | Finish Line', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJs-lsTCK2hyIhvzyCpY31NC74OUR1X8wfGb5d6lSmkNW1Y-m0sgTciIxCz376i3lN63lu67wHV6Fx-qaCi1nAZbJr4MQBIeHnE0rhxc4-zg/256fx192f', rarity: 'covert' },
        { name: 'Moto Gloves | POW!', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJs-lmTCaMlxIovgKJk4jxNWXBPAZ2CpYmTOAO4UWwltOxP-3qswPdgopMzXiviSwavytpsO4FUvEh5OSJ2LE4Jnt4/256fx192f', rarity: 'covert' },
        { name: 'Moto Gloves | 3rd Commando Company', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJs-5kQii9kRIYuC6OpYPwJiPTcAZyDMd2F-YIu0a4ktTjP--35Vfb3oMTyy_-iCtM7Hpq5elTBaYirKTJz1aWk_tQEIo/256fx192f', rarity: 'covert' },
        { name: 'Moto Gloves | Spearmint', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJvehnWxanhxQmvTqJn7D1KCzPKhgnW5UmRO4DsxXrlYbhPurmtAXai98UzS73in5I6S5p4OsAU_Zx-KHWkUifZsxBQgc2/256fx192f', rarity: 'covert' },
        { name: 'Moto Gloves | Boom!', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJve5nQBaxmhIqjDGMnYftb3ufaQNxA5MiEeVb5kW5ldPiZuPj5lOKjt9BxCutiSlO5ys5sL1UUPU7uvqAf72SBgc/256fx192f', rarity: 'covert' },
        { name: 'Moto Gloves | Smoke Out', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJo-xmRCyMmRQguynLztircXjCaAAkDZp0TO4OsRW8xtznP-7mswXYj4wTnyysiHkc5n5p5PFCD_SXL_AlqA/256fx192f', rarity: 'covert' },
        { name: 'Moto Gloves | Cool Mint', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJpPNgTie0mRgYsTGQn7D1KCzPKhgiXMZwRuNe5xS5wYLvY-K3s1GN344Wz3ioiypK6X1p4e1WUKZ0q6WCkUifZln3nIr8/256fx192f', rarity: 'covert' },
        { name: 'Moto Gloves | Polygon', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJpPNgSDu6kSIlvyiApYPwJiPTcA92A5QlFu4N4ES4ktblMrvg5lSN34hEmHitinhLvHo64uhUUvVwqPDJz1aWhdr_Brk/256fx192f', rarity: 'covert' },
        { name: 'Moto Gloves | Transport', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJqeRlQyakqh4mvjK6lob-KT-JbwZzCsR0RrYK4ETrwIbkYe_l4gSM2YNEniv73XxKvyhj4u0DVKMi_rqX0V9cNOIfoA/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Brocade Crane', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3Wvw_x5s-BtShawhxwptgKXn4vGLSLANkI-XMN2Qu4OsEG6lYK2M-OwtgPf2IMRzXio3yMY7yhptbxRAKIkq_bVhhaBb-OYO4AFQA/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Brocade Flowers', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3Wvw_x5s-BtSha1mRIwti-6iIr9HifOOV5kFJJ5TeMK5xTsltSyM-m07wLW2Y4Uy32ohiJKuy9r4L1UWKAj-qGF3gzfcepq2gO2jDs/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Dragon Fists', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3Wvxfx3t-5ncDqwlBEijC-AnrD1KCzPKhgkCZdwTeIL4ES5wdXjPrm251Pdi98QzST3jy0d6nxp4e5QAKsk_q3RkUifZohUdPsK/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Garden', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3WvxON0ou5gSyyhkBkYtTGKjYrrMhTTO1d8Zc4pEr9OrES-w9exZuzrsgyLi4lEzij2in9KvHpj6u9XU6J2_aGDjwzCY709t8YdZKHwRXCqB8U/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Hand Sweaters', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3WvyuB_pN5oXS6qmRgYtC-An4HGLSLANkI-CZJzROEM4xa7lYbgM7i07lOP3okXmCn4iypM7idt4udXU6p0rqHS3haBb-PCGCVNWw/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Plum Quill', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3Wvzv1iouhqRxajgA83vzi6lob-KT-JawEjXMZyQuQMs0Xpl4fvMrvn4FOI2N5Dnn78jnxI5yZj5-tXWfEs8rqX0V_DSgKUxA/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Seigaiha', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3Wv0u13vO1mXxa-kAkmvzGMmbD7LT7CAVp5Xco0W-dZuhe6wNDuP-q05g2NiYlFmSn5iS1N7yxj4LxUWPJx-6yCiFqUNOIjoc5UtEcI9GU/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Wave Chaser', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3Wv0ud6u95tXSi0mhMYpDWMjorGLSLANkI-ApsmQrFbtkPux4bgMuvg7gzWjI0Xnyz-23lI6i5s4bpWUqMl-6PQ2xaBb-Mdlpgj5g/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Lunar Weave', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5tvLPGQBVicyOl-pK8xTizrzER1t2rczNj9JSqRZg92CZZ2RrRetBi7kYDhZeLl7wDajo9C02yg2YX5gL0s/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Snow Leopard', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5tnIfeGD3Wv1uZ_pORWQyC0nQlp4TnUw9f6J3PCOw4oW8ZxRuEOshK8l9fgZbnqswHX3owXmSisjCIfuzErvbiEoDwfJQ/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Queen Jaguar', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5tnIfeGD3Wv2Ot6vO5-cCW6khUz_WSHm4qteC2XOg4jDcN0EOZbthDsxoDnN7m24laI3d8QnCv6hn5PvHx1o7FVsUpsiR4/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Convoy', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5tgKfyaGmaC2NF6ueZhW2e1wER0smuGyd__dn6VOwd1A5JwQOFY5hi8ktKzNryx5wyPiYwTxX74kGoXue1G57tl/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Imperial Plaid', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t9LPGaCliA1PxmvORWQyC0nQlp4W-Hw9-ocy2fbwB2X8YkFucCtRe4xNzhYrjl4Fff39lMyn78iiJLuzErvbgqDAMwGQ/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Crimson Weave', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t_JfSsAm6Xyfo4trVoSnGxlh9x5DmEzt6rJS2RagYiA5siQ-MLthW9xtDlM7uxtFCNgpUFk3thcTnRAg/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Rezan the Red', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t_JeqSAFicyOl-pK9sHnrhxx5wsm2Ezo39cXufbVdzD8ZzReILtRfqm9OyMbzjtlfdio5A02yg2fWAU4q4/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | King Snake', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-LvGYC3SbyOBJp-lgWyyMmRQguynLz4r6Iy7EbFchApNyR-dbtEbuw4XkN7jq7gHdjtoQzi37hiwYvytvt_FCD_Ql24JgJg/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Diamondback', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-LvGYC3SbyOBJqeRlQyakqhEutDWR1N77ICqXZw4iApJ1ReRb5Bi-k4fjYb7mtgPdgooXyyusiS9A7Shv674cEf1yI93CpRI/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Overtake', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-NPmHDW-VxdF0vOBqRBa8hxwptDi6lob-KT-JOwYkXppzQO4OsRbqltfiMOvm41TYi44XySqqj35OvS4_57oKA6cl_LqX0V9d-bhOMA/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Black Tie', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-NPmHDW-VxdF0vOBqRBaknRQztgKJk4jxNWXBbwdxDcZwFrFY40XrktLgNr7q4AKM2owQmX6ojSpMuCo_tulQB6ss5OSJ2E_SKQx-/256fx192f', rarity: 'covert' },
        { name: 'Driver Gloves | Racing Green', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-NPmHDW-VxdFxouRsQRa0hxg-jDGMnYftb3mXblQnWJclRuNYtETux9DlYr-wtVaK2IsTmCT-jC4Y6ihjtr0FUaA7uvqAQikoKDk/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Lime Polycam', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V6NhL-aWMXSAxO1_se1gXD2MlB80py-EmZvGJjnCO1hPVssnHaMUtRTqwNK2Nrzr71aLi4sUzS_8iCJMuic54eoFVvVw-fGGiwySY7Q1t45DeqjW0uKN1w/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Cloud Chaser', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V6NhL-aWMXSAxO1_se1gXD2MkQ8mtDKLpY31NC74Ml93UtZuQe4L40bsl9HgM-Lr5lffgtgWnCT63H5O6XxqtehUVaIl-vCDjwiXMKp9v8dT8uAEag/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Blackbook', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V6NhL-aWMXSAxO1_se1gXD2Mkg8mtTuMjobGIyfGPV1PVssnHaMUthC9l9e2Mei25wTajN5EziT_2CodvSxs5ugBWKp2rvDX2Q6QMOc8tI5DeqjzpbB7FA/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Chocolate Chesterfield', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V6NhL-aWMXSAxO1_se1gXD2MhAguvymAnrD7LSrENWl8U8UoAfkNu0Ttx4CxP-zr4wDbjN4XmX79j3xM7SdisbkLBPB0q6LWiwnHM7Zs_9Bdc2KEwswI/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Pillow Punchers', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V6NhL-aWMXSAxO1_se1gXD2MhAguvymAnrDuKSLTO2l8U8UoAfkK5BKxkNyyZu7r4VGP3Y8UzSX_iC4av3trtbtWV_Vxq6SEh1mVN7c9_9Bdc6ulT-fJ/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Sunburst', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V6NhL-aWMXSAxO1_se1gXD2MhggpsSiXiZvGMy7DAVp5Xco0W-VesRKwxtLvMbm07gLbiI1GmX33hywd7Hk45ewEAPIiqfXW2Q7FMLIjoc5U0NHpGGE/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Big Swell', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V6NhL-aWMXSAxO1_se1gXD2MghwxtgKHlpr8HifOOV5kFJJyFOVZuhC8l9XjNL-3tgHcg41HzHr4hntBuntpse0LUvZwr_bX3QjfcepqIIhMOUI/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Forest DDPAT', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJtOV5Tj2Mkg8itjO6mY70LhTLN1F4TowkQrFYshHsxNKyPu_ntQfYid9By3j-ii9I6StqsOlUV6Aj-aCF2guTL_RjtifunYRS/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Emerald Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJtexsXSi_kSIwtj-6lob-KT-Jbw4kA8d4QOBb5hnqmoHuMLmx4AWK341Bnyr93CxN6itjsb1XUfAgqLqX0V92--w69A/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJtuBtSha_nBovp3PQy42sdX6eagIjW5AlQOVetBXuk92xNLvg4gOMjd5AmC2ointB53w__a9cBqntWBk3/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Field Agent', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJtuNgcCW6khUz_TiHydigcXyXawRxX5QmQLQIsxC9kYfgN--w5QCLi4IRzyz42yofvCZ1o7FVbJfAqIA/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Buckshot', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJtu57Sjqnqh81vCqLpYPwJiPTcFQhAsd5TOcDsxLqwN22ZrjqslDZg4gXnCj2jnlA7Sg54udWB_dz-qbJz1aWpqUo0Nk/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Crimson Kimono', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJu-hkQCe8qhkusjCKlIvqHjnCOml8U8UoAfkItBLswdbuNbjr5FHdjNkUzSv73C1K5y46tu4EUvAg-6bU3FrBMOE4_9BdcyhkRns5/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Marble Fade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJveB7TSW2qhsmtzi6lob-KT-JOlUhC8Z2QOUDsxa6xIe0N7nk5ALWjolMm3793SxAvX0_5-sBUaNz-rqX0V-xn3he8w/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Foundation', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJv_NoQS62qgovuimApYPwJiPTcFMgWJVwFLIPthDpkt3vN7ux5QTWitkTm3r5iiMc7nw6sukBBfV38vDJz1aWnrr9eTA/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Lt. Commander', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJouhqRDqygiIksjCKpYPwJiPTcFJzApV0F-cL5kHuk9CxP7u3sgDYgo1BzX76jixM7Cw-selXBacn-PHJz1aWiwi0X-Y/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Tiger Strike', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJpOhuSjuMmg8mvTqApYPwJiPTcAYkDMZ3EOUJ4Ra9w4W2NOyx4wGNjYtDy3763H4bvCY6t-sFUap3_KDJz1aW0GG4fIQ/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Crimson Web', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJp-RrXBahkBkYvzSCkpu3JyiSbAQkC8d1E7YJtEXtkIazMruz4lOP3dpGmCyt23hA731v4LkKAL1lpPOyoS0Ibw/256fx192f', rarity: 'covert' },
        { name: 'Specialist Gloves | Mogul', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJp-hnWyyhnRg_jDGMnYftb3qWagQlX8EjF7YIuhK9m9XiNO2x7gOPjY5HzHj7iiwcv3xi4-pQAPc7uvqAbB4ER4o/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Violet Beadwork', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk6P6hfqFSM-CcHHOvw-t3tPZmXSKMkRQmvjKLnpzGMT7VLlp1Zc4pEr9OrBWxxofvNOLitQKPid5Hznr-3C9JvHtu4uxTVKMlqaPQilrAM7Fr6cQdZKHwBJ-GjQo/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Frosty', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk6P6hfqFSM-CcHHOvwu97v95-RienkA8YvzSCkpu3dXqfbA5zW5N0F-dcu0K8ldDnMuPk4wHdjN9EniWthn4av31v4eoHWL1lpPOyBkNpPQ/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Blaze', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk6P6hfqFSM-CcHHOvx-J3veR6cCahlBMgtgKJk4jxNWWXblAgDJUiTeJZtBHpktDuY7m2sQPf2YNAxXn5iysf6Cc_67oGA6Ah5OSJ2AmILwG6/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Creme Pinstripe', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk6P6hfqFSM-CcHHOv0ed4o_V7Rjm2qh8rsj6OpYPwJiPTcAdzW5V2E-4IsBnswNHuZbznsQfXg4NCny_4hnhOvS04suoDVvZx86zJz1aWnYsnB-o/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Red Racer', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk6P6hfqFSM-CcHHOv0-91tfNWXSy3qhEutDWR1I77dC7GbQ4kWZNwEOJY5xLtwYHuN7yz7lPe2YgTniz2jn5Nv3lj5O0cEf1yHxfMKhM/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Ultra Violent', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk6P6hfqFSM-CcHHOv1et1uN5uXSi3nBgppwKHiIb-KT_4Ml93UtZuTOcLtUW8lNDvZL634FfYi4pCyiX5iXka6Htr4uhQVqt3_vfRiAzDZap9v8fuC2Vr0A/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Occult', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk6P6hfqFSM-CcHHOv1-t6puR9cDu2kSIrujqNjsGody2XPQVzWZslEe5euxS_lYC0Yu7l4wLfj99MmCv4jXka6Slp6-4ET-N7rUuG7GIq/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Omega', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_KfD2Sb_vlzsuNgQS6MjBgrvzKSpYPwJiPTcFAkC5UiRrRZ5BO9ktDnM-q37wCMjN5GxCqvhngb6Chj6u0CVvAj-6fJz1aW3nluLgw/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Vice', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_KfG2Kv0ed4u95lRi67gVNx4T-Bw434IHyVb1QlAsd1FOUDthG4xNznMu3m4QXXg90Wzn_33C1I8G81tLaDi_rK/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Hedge Maze', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_eBC2Ke_uJ_t-l9AX21whwi4Gndnov9JH_FblMlCJYjRbFZtkWww4HnNbjr7wWN39gUmH7gznQeohQBtY8/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Scarlet Shamagh', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_icG2mU0vp5v_VhcDu2kSIrujqNjsGqIC-SalIhW8B2Q7MNs0G9x4W0NeKwtALa3ohEyi2oiCpI5yZo4OcFT-N7rZxgqiT0/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Big Game', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_iGAHOV09F6ueZhW2fil0tx4T7RnouodXjCaAMjWJshQOAOsEG8l9bgMrvr5QfXjotHyyWtkGoXucEGPk8i/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Nocts', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_qSCXKR09F6ueZhW2fqlBly4GWGm9ivcXjFPFImWJQhEeRc5EXqkNGyMOzm51fY3dlAxCr9kGoXuaq1SOh9/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Superconductor', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_yaCW-E_ux6peRWQyC0nQlp4jjRyt-vJX6QblMgApt0R-5c5hLsktO2Nu_h4QaLg4MXyCmr2ClP7jErvbiwB_ADaw/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Arid', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_2aAm6EwPxvj-1gSCGn20h3sTvVyoqheX2TbA9zDcFwQOQLtBnpw4bvM-rm4ACMiY5Cnn_63CNXrnE8hMDc76M/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Amphibious', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H-CcB3Sfz9Fwou5ucCu_gBgYpDWMjorGLSLANkI-W5R4E7JZtxbskNWxZeLi4QPejdgTmSn62iwbvyw957kDAqog_fXWjBaBb-Pahe96zA/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Bronze Morph', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H-CcB3Sfz9Fwou5ucDu2kSIgoTiAlLD1KCzPKhghDJBzTLMCukW6kNblNe-2tlGKj45GyCWrii8f73k95e4HA_AjrvbSkUifZkDjXxpJ/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Pandora\'s Box', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H-CGHHecxNF6ueZhW2exk01w4j7cmYn4eHPCbAMhApdwTOIN5BPsx9yyYu605FTeid0Uy3j3kGoXueKyz5wo/256fx192f', rarity: 'covert' },
        { name: 'Sport Gloves | Slingshot', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H-OfB2mX0uZ5pN5lRi67gVN24DzSw479dnuTbAckWcElRbJctkW9ktPlNu2w51Dc2oNAmCWo2ioa8G81tMaI-Tzs/256fx192f', rarity: 'covert' },
        { name: 'Bloodhound Gloves | Charred', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIlvzyGkbDqKCfRO0RPVssnHaMUsES-k9HjNrixsgbd3YIRni7-inlO5i5t6-pRAqIs_aOFjg_JZbU5sI5Deqh-Veq-pA/256fx192f', rarity: 'covert' },
        { name: 'Bloodhound Gloves | Guerrilla', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIgpjiXiIb1LSr4Ml93UtZuR7QKthCwl4fkNuqw4lPXgosRzi78inwdvyk45e5UUqQkq_aDi1rEZap9v8fy7GQdug/256fx192f', rarity: 'covert' },
        { name: 'Bloodhound Gloves | Bronzed', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIqtimEloPwIhTLN1F4Tox2Q7UJ4RLrltDkMuyz4ASIg4kUxCr5jy8fvC46sLtWWaojqKze2giTL_Rjtvi23tdj/256fx192f', rarity: 'covert' },
        { name: 'Bloodhound Gloves | Snakebite', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSI0vTyOn5zyKCX4PERxSdEfGb5d6lSmxIfuMezmtFfb39lAxCivh3hI6Chi4eYGWfAt8vXTiw_EM7Q_t5NWIeHnE0qrynbE1A/256fx192f', rarity: 'covert' },
        { name: 'Broken Fang Gloves | Needle Point', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YtTGKiI71HifOOV5kFJQlQbUL4RHukofjY-227wDaidpHnCqs3H5K6So95ekLVKck__bW3Q_fcepqSI673wM/256fx192f', rarity: 'covert' },
        { name: 'Broken Fang Gloves | Jade', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YvjiRm4PwIhTALFN1VP0sHLBS9g65w9exM-Pl5gaKidkRziX22yNIv306571QA6pwrKGDiluTZLxs5ZdXOr_5GlzOqAIa/256fx192f', rarity: 'covert' },
        { name: 'Broken Fang Gloves | Yellow-banded', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YozKMiYD3Hi3VMVFPWM4hFrxl-0XkzougWLa7sF2alYpAyX__iClA5ntstuoEUqUirKeG2w3IYrZo4JRSLa2vRRvdWhwJsa98BNe077TKBCc/256fx192f', rarity: 'covert' },
        { name: 'Broken Fang Gloves | Unhinged', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YoDOEkYrqKiLJAVR8W8ErKrtT5Uj8jNfuN-2wtgeNioNDxS7_jS4av31j5L4CVqV0rvLTigzCNeE5tZkCJqm5DUPZGadTirc/256fx192f', rarity: 'covert' },
        { name: 'Hydra Gloves | Emerald', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOlo_k7yNk6P6hfqF-H_KfAWiUyeFjvuVWRzC3hxwYsTGEmYTGJjnCO1hPVssnHaMU4EG6ktGyPryz5A3fiIwUyin3h3lJ5nlq5-xQVPIk-6HWjVmQOeFptI5DeqjsQUewWg/256fx192f', rarity: 'covert' },
        { name: 'Hydra Gloves | Case Hardened', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOlo_k7yNk6P6hfqF-H_KfAWiUyeFjvuVWRzC3hxwYsDyWn7DxIDnDO1h1Xv0sHLBS9g7ul9zmMbi35FHYgolMmSj9jS8fvC5jte9RAqctqKCC2QHBYrU64MMCOr_5GlPhveuZ/256fx192f', rarity: 'covert' },
        { name: 'Hydra Gloves | Mangrove', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOlo_k7yNk6P6hfqF-H_KfAWiUyeFjvuVWRzC3hxwYtC-An4HGLS7GKl51SP0tEKRS3UL6w5ekWLa7sF2alY9MzyX92ixAvCs-sutWWKd08qDRh17CZOI86JcBcffyH0iGUR9asfh8BNe0yN2QCJM/256fx192f', rarity: 'covert' },
        { name: 'Hydra Gloves | Rattler', img: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOlo_k7yNk6P6hfqF-H_KfAWiUyeFjvuVWRzC3hxwYoDOEkYrqKiLJAVRiW9EzKrtT5Uj8jNOyZb_i5QHcg40Unyz-ji5LvX1v6-kEV_Ek8vCFjguUYOU_tJVWd6y5DUPZHBGjgbE/256fx192f', rarity: 'covert' }
    ],
};
CS2_SKINS.all = [...CS2_SKINS.knives, ...CS2_SKINS.gloves, ...CS2_SKINS.snipers, ...CS2_SKINS.rifles, ...CS2_SKINS.pistols];

// ============ SPECIFIC WEAPONS ============
const SPECIFIC_WEAPONS = [
    { id: 'awp', name: 'AWP', category: 'snipers', icon: '🎯', skins: CS2_SKINS.snipers.filter(s => s.name.startsWith('AWP')), },
    { id: 'hydra_gloves', name: 'Hydra Gloves', category: 'gloves', icon: '🧤', skins: CS2_SKINS.gloves.filter(s => s.name.startsWith('Hydra Gloves')), },
    { id: 'g3sg1', name: 'G3SG1', category: 'snipers', icon: '🎯', skins: CS2_SKINS.snipers.filter(s => s.name.startsWith('G3SG1')), },
    { id: 'scar_20', name: 'SCAR-20', category: 'snipers', icon: '🎯', skins: CS2_SKINS.snipers.filter(s => s.name.startsWith('SCAR-20')), },
    { id: 'sport_gloves', name: 'Sport Gloves', category: 'gloves', icon: '🧤', skins: CS2_SKINS.gloves.filter(s => s.name.startsWith('Sport Gloves')), },
    { id: 'talon_knife', name: 'Talon Knife', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('Talon Knife')), },
    { id: 'kukri_knife', name: 'Kukri Knife', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('Kukri Knife')), },
    { id: 'specialist_gloves', name: 'Specialist Gloves', category: 'gloves', icon: '🧤', skins: CS2_SKINS.gloves.filter(s => s.name.startsWith('Specialist Gloves')), },
    { id: 'desert_eagle', name: 'Desert Eagle', category: 'pistols', icon: '🔫', skins: CS2_SKINS.pistols.filter(s => s.name.startsWith('Desert Eagle')), },
    { id: 'five_seven', name: 'Five-SeveN', category: 'pistols', icon: '🔫', skins: CS2_SKINS.pistols.filter(s => s.name.startsWith('Five-SeveN')), },
    { id: 'shadow_daggers', name: 'Shadow Daggers', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('Shadow Daggers')), },
    { id: 'glock_18', name: 'Glock-18', category: 'pistols', icon: '🔫', skins: CS2_SKINS.pistols.filter(s => s.name.startsWith('Glock-18')), },
    { id: 'flip_knife', name: 'Flip Knife', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('Flip Knife')), },
    { id: 'p250', name: 'P250', category: 'pistols', icon: '🔫', skins: CS2_SKINS.pistols.filter(s => s.name.startsWith('P250')), },
    { id: 'p2000', name: 'P2000', category: 'pistols', icon: '🔫', skins: CS2_SKINS.pistols.filter(s => s.name.startsWith('P2000')), },
    { id: 'bloodhound_gloves', name: 'Bloodhound Gloves', category: 'gloves', icon: '🧤', skins: CS2_SKINS.gloves.filter(s => s.name.startsWith('Bloodhound Gloves')), },
    { id: 'famas', name: 'FAMAS', category: 'rifles', icon: '💥', skins: CS2_SKINS.rifles.filter(s => s.name.startsWith('FAMAS')), },
    { id: 'tec_9', name: 'Tec-9', category: 'pistols', icon: '🔫', skins: CS2_SKINS.pistols.filter(s => s.name.startsWith('Tec-9')), },
    { id: 'navaja_knife', name: 'Navaja Knife', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('Navaja Knife')), },
    { id: 'classic_knife', name: 'Classic Knife', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('Classic Knife')), },
    { id: 'driver_gloves', name: 'Driver Gloves', category: 'gloves', icon: '🧤', skins: CS2_SKINS.gloves.filter(s => s.name.startsWith('Driver Gloves')), },
    { id: 'm4a1_s', name: 'M4A1-S', category: 'rifles', icon: '💥', skins: CS2_SKINS.rifles.filter(s => s.name.startsWith('M4A1-S')), },
    { id: 'usp_s', name: 'USP-S', category: 'pistols', icon: '🔫', skins: CS2_SKINS.pistols.filter(s => s.name.startsWith('USP-S')), },
    { id: 'ursus_knife', name: 'Ursus Knife', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('Ursus Knife')), },
    { id: 'ak_47', name: 'AK-47', category: 'rifles', icon: '💥', skins: CS2_SKINS.rifles.filter(s => s.name.startsWith('AK-47')), },
    { id: 'galil_ar', name: 'Galil AR', category: 'rifles', icon: '💥', skins: CS2_SKINS.rifles.filter(s => s.name.startsWith('Galil AR')), },
    { id: 'm9_bayonet', name: 'M9 Bayonet', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('M9 Bayonet')), },
    { id: 'dual_berettas', name: 'Dual Berettas', category: 'pistols', icon: '🔫', skins: CS2_SKINS.pistols.filter(s => s.name.startsWith('Dual Berettas')), },
    { id: 'hand_wraps', name: 'Hand Wraps', category: 'gloves', icon: '🧤', skins: CS2_SKINS.gloves.filter(s => s.name.startsWith('Hand Wraps')), },
    { id: 'cz75_auto', name: 'CZ75-Auto', category: 'pistols', icon: '🔫', skins: CS2_SKINS.pistols.filter(s => s.name.startsWith('CZ75-Auto')), },
    { id: 'broken_fang_gloves', name: 'Broken Fang Gloves', category: 'gloves', icon: '🧤', skins: CS2_SKINS.gloves.filter(s => s.name.startsWith('Broken Fang Gloves')), },
    { id: 'survival_knife', name: 'Survival Knife', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('Survival Knife')), },
    { id: 'karambit', name: 'Karambit', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('Karambit')), },
    { id: 'bowie_knife', name: 'Bowie Knife', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('Bowie Knife')), },
    { id: 'skeleton_knife', name: 'Skeleton Knife', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('Skeleton Knife')), },
    { id: 'moto_gloves', name: 'Moto Gloves', category: 'gloves', icon: '🧤', skins: CS2_SKINS.gloves.filter(s => s.name.startsWith('Moto Gloves')), },
    { id: 'paracord_knife', name: 'Paracord Knife', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('Paracord Knife')), },
    { id: 'nomad_knife', name: 'Nomad Knife', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('Nomad Knife')), },
    { id: 'gut_knife', name: 'Gut Knife', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('Gut Knife')), },
    { id: 'butterfly_knife', name: 'Butterfly Knife', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('Butterfly Knife')), },
    { id: 'm4a4', name: 'M4A4', category: 'rifles', icon: '💥', skins: CS2_SKINS.rifles.filter(s => s.name.startsWith('M4A4')), },
    { id: 'stiletto_knife', name: 'Stiletto Knife', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('Stiletto Knife')), },
    { id: 'falchion_knife', name: 'Falchion Knife', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('Falchion Knife')), },
    { id: 'sg_553', name: 'SG 553', category: 'rifles', icon: '💥', skins: CS2_SKINS.rifles.filter(s => s.name.startsWith('SG 553')), },
    { id: 'huntsman_knife', name: 'Huntsman Knife', category: 'knives', icon: '🔪', skins: CS2_SKINS.knives.filter(s => s.name.startsWith('Huntsman Knife')), },
    { id: 'ssg_08', name: 'SSG 08', category: 'snipers', icon: '🎯', skins: CS2_SKINS.snipers.filter(s => s.name.startsWith('SSG 08')), },
];




// ============ STEAM MARKET LINK ============
function getSteamMarketUrl(skinName) {
    let searchName = skinName;
    const isKnife = /^(Karambit|M9 Bayonet|Butterfly Knife|Flip Knife|Gut Knife|Falchion Knife|Shadow Daggers|Bowie Knife|Huntsman Knife|Navaja Knife|Stiletto Knife|Talon Knife|Ursus Knife|Nomad Knife|Paracord Knife|Survival Knife|Classic Knife|Skeleton Knife|Kukri Knife)/.test(skinName);
    const isGlove = /^(Sport Gloves|Specialist Gloves|Driver Gloves|Moto Gloves|Hand Wraps|Broken Fang Gloves|Bloodhound Gloves|Hydra Gloves)/.test(skinName);
    if (isKnife || isGlove) {
        searchName = '★ ' + skinName;
    }
    return 'https://steamcommunity.com/market/search?appid=730&q=' + encodeURIComponent(searchName);
}

// ============ NORMALIZE CHANCES ============
function normalizeCaseItems(items) {
    const rarityCounts = {};
    items.forEach(it => { rarityCounts[it.rarity] = (rarityCounts[it.rarity] || 0) + 1; });
    const uniqueRarities = Object.keys(rarityCounts);
    if (uniqueRarities.length === 1 && items.length > 1) {
        return items.map(it => ({ ...it, chance: 100 / items.length }));
    }
    return items.map(it => {
        const normalized = CS2_RARITY[it.rarity] ? CS2_RARITY[it.rarity].chance / rarityCounts[it.rarity] : 1;
        return { ...it, chance: normalized };
    });
}

// ============ RARITY LABELS ============
const RARITY_LABELS = {
    consumer: 'ОБЫЧНОЕ', industrial: 'ОБЫЧНОЕ', milspec: 'РЕДКОЕ',
    restricted: 'РЕДКОЕ', classified: 'ЭПИЧЕСКОЕ', covert: 'МИФИЧЕСКОЕ',
    contraband: 'ЛЕГЕНДАРНОЕ', common: 'ОБЫЧНОЕ', rare: 'РЕДКОЕ',
    epic: 'ЭПИЧЕСКОЕ', mythic: 'МИФИЧЕСКОЕ', legendary: 'ЛЕГЕНДАРНОЕ',
};
const RARITY_BG = {
    consumer: 'rgba(74,158,255,0.06)', industrial: 'rgba(74,158,255,0.06)',
    milspec: 'rgba(136,71,255,0.06)', restricted: 'rgba(136,71,255,0.06)',
    classified: 'rgba(211,44,230,0.08)', covert: 'rgba(235,75,75,0.08)',
    contraband: 'rgba(228,174,57,0.08)', common: 'rgba(74,158,255,0.06)',
    rare: 'rgba(136,71,255,0.06)', epic: 'rgba(211,44,230,0.08)',
    mythic: 'rgba(235,75,75,0.08)', legendary: 'rgba(228,174,57,0.08)',
};

// ============ SOUND (CS2 Style) ============
let audioCtx = null;
let rollTimeout = null;
let rollCancelled = false;
function getAudioCtx() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); return audioCtx; }

function playSound(type) {
    try {
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        if (type === 'open') {
            const buf = ctx.createBuffer(1, ctx.sampleRate * 0.12, ctx.sampleRate);
            const d = buf.getChannelData(0);
            for (let i = 0; i < d.length; i++) {
                const t = i / ctx.sampleRate;
                const noise = (Math.random() * 2 - 1);
                const latch = Math.exp(-t * 80) * 0.6;
                const click = t < 0.005 ? Math.sin(t / 0.005 * Math.PI) * 0.8 : Math.exp(-(t - 0.005) * 120) * 0.3;
                d[i] = noise * latch + click;
            }
            const s1 = ctx.createBufferSource(); s1.buffer = buf;
            const f1 = ctx.createBiquadFilter(); f1.type = 'bandpass'; f1.frequency.value = 350; f1.Q.value = 2;
            const g1 = ctx.createGain(); g1.gain.value = 1.0;
            s1.connect(f1).connect(g1).connect(ctx.destination); s1.start(now);
            const s2 = ctx.createBufferSource(); s2.buffer = buf;
            const f2 = ctx.createBiquadFilter(); f2.type = 'highpass'; f2.frequency.value = 2500; f2.Q.value = 1;
            const g2 = ctx.createGain(); g2.gain.value = 0.75;
            s2.connect(f2).connect(g2).connect(ctx.destination); s2.start(now);
            const osc = ctx.createOscillator(); osc.type = 'sine'; osc.frequency.value = 90;
            const g3 = ctx.createGain();
            g3.gain.setValueAtTime(0.9, now); g3.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
            osc.connect(g3).connect(ctx.destination); osc.start(now); osc.stop(now + 0.06);
        } else if (type === 'drop') {
            const buf = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
            const d = buf.getChannelData(0);
            for (let i = 0; i < d.length; i++) {
                const t = i / ctx.sampleRate;
                const impact = Math.exp(-t * 30) * 0.5;
                const noise = (Math.random() * 2 - 1) * Math.exp(-t * 25) * 0.4;
                const tone1 = Math.sin(t * 200 * Math.PI * 2) * Math.exp(-t * 12) * 0.35;
                const tone2 = Math.sin(t * 350 * Math.PI * 2) * Math.exp(-t * 15) * 0.25;
                const ring = Math.sin(t * 4800 * Math.PI * 2) * Math.exp(-t * 10) * 0.15;
                d[i] = noise * impact + tone1 + tone2 + ring;
            }
            const s = ctx.createBufferSource(); s.buffer = buf;
            const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1500; f.Q.value = 2;
            const g = ctx.createGain(); g.gain.value = 1.0;
            s.connect(f).connect(g).connect(ctx.destination); s.start(now);
        } else if (type === 'legendary') {
            const notes = [523, 659, 784, 1047, 1319];
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.type = 'triangle'; osc.frequency.value = freq;
                g.gain.setValueAtTime(0, now + i * 0.07);
                g.gain.linearRampToValueAtTime(0.4, now + i * 0.07 + 0.03);
                g.gain.setValueAtTime(0.4, now + i * 0.07 + 0.15);
                g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.7);
                osc.connect(g).connect(ctx.destination);
                osc.start(now + i * 0.07); osc.stop(now + i * 0.07 + 0.7);
            });
            const sweep = ctx.createOscillator();
            const sg = ctx.createGain();
            sweep.type = 'sine';
            sweep.frequency.setValueAtTime(2000, now + 0.1);
            sweep.frequency.exponentialRampToValueAtTime(500, now + 1.5);
            sg.gain.setValueAtTime(0, now);
            sg.gain.linearRampToValueAtTime(0.15, now + 0.15);
            sg.gain.setValueAtTime(0.15, now + 0.4);
            sg.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
            sweep.connect(sg).connect(ctx.destination);
            sweep.start(now + 0.1); sweep.stop(now + 1.5);
            const sub = ctx.createOscillator();
            const subg = ctx.createGain();
            sub.type = 'sine'; sub.frequency.value = 60;
            subg.gain.setValueAtTime(0.3, now);
            subg.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
            sub.connect(subg).connect(ctx.destination);
            sub.start(now); sub.stop(now + 0.5);
            const nBuf = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
            const nd = nBuf.getChannelData(0);
            for (let i = 0; i < nd.length; i++) { nd[i] = (Math.random() * 2 - 1) * 0.3; }
            const ns = ctx.createBufferSource(); ns.buffer = nBuf;
            const ng = ctx.createGain();
            ng.gain.setValueAtTime(0.25, now);
            ng.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            ns.connect(ng).connect(ctx.destination); ns.start(now); ns.stop(now + 0.1);
        }
    } catch (e) {}
}

function startRollSound() {
    try {
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        rollCancelled = false;
        const startTime = Date.now();
        const duration = 4000;
        function tick() {
            if (rollCancelled) return;
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const curve = Math.pow(progress, 0.6);
            const interval = 60 + curve * 290;
            try {
                const now = ctx.currentTime;
                const buf = ctx.createBuffer(1, ctx.sampleRate * 0.012, ctx.sampleRate);
                const d = buf.getChannelData(0);
                for (let i = 0; i < d.length; i++) {
                    const env = Math.exp(-i / d.length * 6);
                    const tick_noise = (Math.random() * 2 - 1) * env;
                    const tick_tone = Math.sin(i / ctx.sampleRate * 5000) * env * 0.3;
                    d[i] = tick_noise * 0.6 + tick_tone;
                }
                const s = ctx.createBufferSource(); s.buffer = buf;
                const f = ctx.createBiquadFilter(); f.type = 'bandpass';
                f.frequency.value = 4000 - curve * 3200; f.Q.value = 2 + curve * 4;
                const g = ctx.createGain(); g.gain.value = 0.45 - curve * 0.2;
                s.connect(f).connect(g).connect(ctx.destination); s.start(now);
            } catch (e) {}
            rollTimeout = setTimeout(tick, interval);
        }
        tick();
    } catch (e) {}
}

function stopRollSound() {
    rollCancelled = true;
    if (rollTimeout) { clearTimeout(rollTimeout); rollTimeout = null; }
}

// ============ STATE ============
let currentCase = null;
// ============ CRYPTO ============
async function sha256(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function aesEncrypt(data, password) {
    const km = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, km, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
    const enc = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(JSON.stringify(data)));
    return { salt: Array.from(salt), iv: Array.from(iv), data: Array.from(new Uint8Array(enc)) };
}

async function aesDecrypt(encObj, password) {
    try {
        const salt = Array.isArray(encObj.salt) ? encObj.salt : Object.values(encObj.salt);
        const iv = Array.isArray(encObj.iv) ? encObj.iv : Object.values(encObj.iv);
        const data = Array.isArray(encObj.data) ? encObj.data : Object.values(encObj.data);
        const km = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
        const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: new Uint8Array(salt), iterations: 100000, hash: 'SHA-256' }, km, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
        const dec = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(iv) }, key, new Uint8Array(data));
        return JSON.parse(new TextDecoder().decode(dec));
    } catch { return null; }
}

// ============ FIREBASE ============
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBv4f07C7qczhAv7ny5ZnlZ7w2GsrES3cs",
    authDomain: "case-3b577.firebaseapp.com",
    databaseURL: "https://case-3b577-default-rtdb.firebaseio.com",
    projectId: "case-3b577",
    storageBucket: "case-3b577.firebasestorage.app",
    messagingSenderId: "463998145151",
    appId: "1:463998145151:web:e2b9c02cc62c376899654a",
};
let fbDb = null;
let firebaseReady = false;

function initFirebase() {
    try {
        if (typeof firebase !== 'undefined' && firebase.apps.length === 0) {
            firebase.initializeApp(FIREBASE_CONFIG);
            fbDb = firebase.database();
            firebaseReady = true;
        }
    } catch (e) { console.warn('Firebase init error:', e); }
}

async function fbWithTimeout(promise, ms) {
    return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error('Firebase timeout')), ms || 15000))]);
}

async function fbSave(loginHash, encryptedData) {
    if (!firebaseReady) return;
    try { await fbWithTimeout(fbDb.ref('users/' + loginHash).set(encryptedData)); } catch (e) { console.warn('FB save:', e); }
}
async function fbLoad(loginHash) {
    if (!firebaseReady) return null;
    try { const snap = await fbWithTimeout(fbDb.ref('users/' + loginHash).once('value')); return snap ? snap.val() : null; } catch { return null; }
}
async function fbSaveHistory(loginHash, encryptedHistory) {
    if (!firebaseReady) return;
    try { await fbWithTimeout(fbDb.ref('history/' + loginHash).set(encryptedHistory)); } catch (e) { console.warn('FB save hist:', e); }
}
async function fbLoadHistory(loginHash) {
    if (!firebaseReady) return null;
    try { const snap = await fbWithTimeout(fbDb.ref('history/' + loginHash).once('value')); return snap ? snap.val() : null; } catch { return null; }
}

// ============ BALANCE ============
async function loadBalance() {
    if (!currentUser) { userBalance = 0; updateBalanceUI(); return; }
    try { const b = localStorage.getItem('case-balance-' + currentUser.login); if (b !== null) userBalance = parseInt(b) || 0; } catch {}
    if (firebaseReady && currentUser.login) {
        try {
            const loginHash = await sha256(currentUser.login);
            const snap = await fbWithTimeout(fbDb.ref('balances/' + loginHash).once('value'));
            if (snap && snap.exists()) {
                const fbBal = parseInt(snap.val()) || 0;
                if (fbBal > userBalance) userBalance = fbBal;
            }
            localStorage.setItem('case-balance-' + currentUser.login, userBalance);
        } catch (e) { console.warn('FB load balance:', e); }
    }
    updateBalanceUI();
}
async function saveBalance() {
    if (!currentUser) return;
    localStorage.setItem('case-balance-' + currentUser.login, userBalance);
    if (firebaseReady && currentUser.login) {
        try {
            const loginHash = await sha256(currentUser.login);
            await fbWithTimeout(fbDb.ref('balances/' + loginHash).set(userBalance));
        } catch (e) { console.warn('FB save balance:', e); }
    }
    updateBalanceUI();
}
async function addBalance(amount) {
    userBalance += amount;
    await saveBalance();
}
async function spendBalance(amount) {
    if (userBalance < amount) return false;
    userBalance -= amount;
    await saveBalance();
    return true;
}
function updateBalanceUI() {
    const el = document.getElementById('balance-amount');
    if (el) el.textContent = userBalance;
}

// ============ PROMO KEYS ============
const ADMIN_PASSWORD_HASH = '2f1fae08999f88e6094e5dd8c08d62cdca67e3d4692ebf831d21f63cd8e9e34a';
async function generatePromoKey(amount, count) {
    const keys = [];
    for (let i = 0; i < (count || 1); i++) {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let j = 0; j < 16; j++) {
            if (j > 0 && j % 4 === 0) code += '-';
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        let saved = false;
        if (firebaseReady) {
            try {
                await fbWithTimeout(fbDb.ref('promo-keys/' + code).set({
                    amount: amount,
                    used: false,
                    usedBy: null,
                    usedAt: null,
                    createdAt: Date.now()
                }), 15000);
                saved = true;
            } catch (e) { console.error('FB save promo key error:', code, e); }
        }
        keys.push({ code, saved });
    }
    return keys;
}
async function redeemPromoKey(code) {
    if (!firebaseReady) { initFirebase(); await new Promise(r => setTimeout(r, 500)); }
    if (!firebaseReady) return { ok: false, error: 'Нет подключения к серверу. Обновите страницу.' };
    if (!currentUser) return { ok: false, error: 'Войдите в аккаунт' };
    const cleanCode = code.toUpperCase().replace(/\s/g, '');
    if (!/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(cleanCode)) {
        return { ok: false, error: 'Неверный формат ключа' };
    }
    try {
        const snap = await fbWithTimeout(fbDb.ref('promo-keys/' + cleanCode).once('value'), 15000);
        if (!snap || !snap.exists()) return { ok: false, error: 'Ключ не найден. Проверьте правильность ввода.' };
        const keyData = snap.val();
        if (keyData.used) return { ok: false, error: 'Ключ уже использован' };
        const loginHash = await sha256(currentUser.login);
        await fbWithTimeout(fbDb.ref('promo-keys/' + cleanCode).update({
            used: true,
            usedBy: loginHash,
            usedAt: Date.now()
        }), 15000);
        await addBalance(keyData.amount);
        return { ok: true, amount: keyData.amount };
    } catch (e) {
        console.error('Redeem key error:', e);
        return { ok: false, error: 'Ошибка: ' + (e.message || 'Проверьте подключение к интернету') };
    }
}

// ============ ADMIN PAGE ============
const ADMIN_PASSWORD = '456852951756WEQ';
let adminAuthenticated = false;
function initAdminPage() {
    if (window.location.hash !== '#admin') return false;
    document.getElementById('home-screen').classList.remove('active');
    document.getElementById('particles-canvas').style.display = 'none';
    const sb = document.querySelector('.support-btn'); if (sb) sb.style.display = 'none';
    document.getElementById('admin-overlay').classList.remove('hidden');
    document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const pass = document.getElementById('admin-pass').value;
        const hash = await sha256(pass);
        if (hash === ADMIN_PASSWORD_HASH) {
            adminAuthenticated = true;
            document.getElementById('admin-overlay').classList.add('hidden');
            document.getElementById('admin-screen').style.display = 'block';
            loadAdminKeys();
        } else {
            document.getElementById('admin-error').textContent = 'Неверный пароль';
        }
    });
    document.getElementById('admin-gen-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!adminAuthenticated) return;
        const amount = parseInt(document.getElementById('admin-amount').value);
        const count = parseInt(document.getElementById('admin-count').value) || 1;
        if (!amount || amount <= 0) return;
        const btn = e.target.querySelector('button[type="submit"]');
        btn.textContent = 'Сохранение...';
        btn.disabled = true;
        const keys = await generatePromoKey(amount, count);
        keys.forEach(k => addKeyToAdminList(k.code, amount, false, k.saved));
        document.getElementById('admin-amount').value = '';
        document.getElementById('admin-count').value = '1';
        btn.textContent = 'Генерировать';
        btn.disabled = false;
    });
    return true;
}
function addKeyToAdminList(code, amount, used, saved) {
    const list = document.getElementById('admin-keys-list');
    const item = document.createElement('div');
    item.className = 'admin-key-item';
    const statusClass = used ? 'admin-key-status used' : 'admin-key-status unused';
    const statusText = used ? 'Использован' : 'Активен';
    const saveIcon = saved === true ? '<span class="admin-key-saved" title="Сохранено в Firebase">✅</span>' : saved === false ? '<span class="admin-key-saved" title="Не сохранено в Firebase!">❌</span>' : '';
    item.innerHTML = '<span class="admin-key-code">' + code + '</span>' + saveIcon + '<span class="admin-key-amount">' + amount + '</span><span class="' + statusClass + '">' + statusText + '</span><button class="admin-key-copy">Копировать</button>';
    item.querySelector('.admin-key-copy').addEventListener('click', () => {
        navigator.clipboard.writeText(code).then(() => {
            item.querySelector('.admin-key-copy').textContent = '✓';
            setTimeout(() => { item.querySelector('.admin-key-copy').textContent = 'Копировать'; }, 1500);
        });
    });
    list.prepend(item);
}
async function loadAdminKeys() {
    if (!firebaseReady) { initFirebase(); await new Promise(r => setTimeout(r, 500)); }
    if (!firebaseReady) return;
    try {
        const snap = await fbWithTimeout(fbDb.ref('promo-keys').orderByChild('createdAt').limitToLast(50).once('value'));
        if (snap && snap.exists()) {
            const keys = snap.val();
            Object.entries(keys).forEach(([code, data]) => {
                addKeyToAdminList(code, data.amount, data.used);
            });
        }
    } catch (e) { console.warn('Load admin keys:', e); }
}

// ============ AUTH SYSTEM ============
const SESSION_KEY = 'case-session';
const USERS_KEY = 'case-users';
const SESSION_MAX_AGE = 24 * 60 * 60 * 1000;

function getUsersLocal() { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch { return []; } }
function saveUsersLocal(u) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }

function getSession() {
    try {
        const s = JSON.parse(localStorage.getItem(SESSION_KEY));
        if (s && (Date.now() - s.loginTime < SESSION_MAX_AGE)) return s;
        if (s) localStorage.removeItem(SESSION_KEY);
    } catch {}
    return null;
}
function setSession(login, nick, password) { localStorage.setItem(SESSION_KEY, JSON.stringify({ login, nick, password, loginTime: Date.now() })); }
function clearSession() { localStorage.removeItem(SESSION_KEY); }

function validateNick(nick) {
    if (!nick.trim()) return 'Введите ник';
    if (nick.length < 1 || nick.length > 16) return 'Ник: 1-16 символов';
    return null;
}
function validateLogin(login) {
    if (!login.trim()) return 'Введите логин';
    if (login.length < 3 || login.length > 15) return 'Логин: 3-15 символов';
    if (!/^[a-zA-Z0-9_-]+$/.test(login)) return 'Логин: только буквы, цифры, _ и -';
    return null;
}
function validatePassword(pass) {
    if (!pass) return 'Введите пароль';
    if (pass.length < 4 || pass.length > 26) return 'Пароль: 4-26 символов';
    return null;
}

async function registerUser(nick, login, password) {
    let err;
    if ((err = validateNick(nick))) return { ok: false, error: err };
    if ((err = validateLogin(login))) return { ok: false, error: err };
    if ((err = validatePassword(password))) return { ok: false, error: err };
    const users = getUsersLocal();
    const loginHash = await sha256(login);
    const nickLower = nick.trim().toLowerCase();
    if (users.find(u => u.loginHash === loginHash)) return { ok: false, error: 'Такой логин уже существует' };
    if (users.find(u => u.nick && u.nick.toLowerCase() === nickLower)) return { ok: false, error: 'Этот ник уже занят' };
    if (firebaseReady) {
        try {
            const loginSnap = await fbWithTimeout(fbDb.ref('users/' + loginHash).once('value'));
            if (loginSnap && loginSnap.exists()) return { ok: false, error: 'Такой логин уже существует' };
            const nickSnap = await fbWithTimeout(fbDb.ref('nick-map/' + nickLower).once('value'));
            if (nickSnap && nickSnap.exists()) return { ok: false, error: 'Этот ник уже занят' };
        } catch (e) { console.warn('FB check:', e); }
    }
    const passHash = await sha256(password);
    const encData = await aesEncrypt({ nick: nick.trim(), passwordHash: passHash }, password);
    users.push({ login: login.trim(), loginHash, encData, nick: nick.trim() });
    saveUsersLocal(users);
    await fbSave(loginHash, encData);
    if (firebaseReady) {
        try { await fbWithTimeout(fbDb.ref('nick-map/' + nickLower).set({ loginHash: loginHash, nick: nick.trim() })); } catch (e) {}
    }
    return { ok: true };
}

async function loginUser(login, password) {
    let err;
    if ((err = validateLogin(login))) return { ok: false, error: err };
    if (!password) return { ok: false, error: 'Введите пароль' };
    const loginHash = await sha256(login);
    const passHash = await sha256(password);
    let users = getUsersLocal();
    let user = users.find(u => u.loginHash === loginHash);
    if (!user) {
        const fbData = await fbLoad(loginHash);
        if (fbData) { user = { login: login.trim(), loginHash, encData: fbData }; users.push(user); saveUsersLocal(users); }
    }
    if (!user) return { ok: false, error: 'Аккаунт не найден' };
    const decrypted = await aesDecrypt(user.encData, password);
    if (!decrypted || decrypted.passwordHash !== passHash) return { ok: false, error: 'Неверный пароль' };
    return { ok: true, nick: decrypted.nick };
}

function getHistoryKey() { return currentUser ? 'case-history-' + currentUser.login : 'case-history-guest'; }
function getHistory() { try { return JSON.parse(localStorage.getItem(getHistoryKey())) || []; } catch { return []; } }

async function syncHistoryFromFB() {
    if (!firebaseReady || !currentUser || !currentUser.password) return;
    const loginHash = await sha256(currentUser.login);
    const encHistory = await fbLoadHistory(loginHash);
    if (encHistory) {
        const decrypted = await aesDecrypt(encHistory, currentUser.password);
        if (decrypted && Array.isArray(decrypted)) localStorage.setItem(getHistoryKey(), JSON.stringify(decrypted));
    }
}

async function syncHistoryToFB() {
    if (!firebaseReady || !currentUser || !currentUser.password) return;
    const history = getHistory();
    if (history.length === 0) return;
    const loginHash = await sha256(currentUser.login);
    const encHistory = await aesEncrypt(history, currentUser.password);
    await fbSaveHistory(loginHash, encHistory);
}

let authInitialized = false;

function initAuth() {
    const authOverlay = document.getElementById('auth-overlay');
    const session = getSession();
    if (session) {
        currentUser = { login: session.login, nick: session.nick, password: session.password || null };
        authOverlay.classList.add('hidden');
        updateBurger();
        loadBalance();
        return;
    }
    authOverlay.classList.remove('hidden');

    if (authInitialized) return;
    authInitialized = true;

    const tabs = authOverlay.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('auth-login-form');
    const registerForm = document.getElementById('auth-register-form');
    tabs.forEach(t => t.addEventListener('click', () => {
        tabs.forEach(b => b.classList.remove('active'));
        t.classList.add('active');
        if (t.dataset.authTab === 'login') { loginForm.classList.remove('hidden'); registerForm.classList.add('hidden'); }
        else { loginForm.classList.add('hidden'); registerForm.classList.remove('hidden'); }
        document.getElementById('login-error').textContent = '';
        document.getElementById('reg-error').textContent = '';
        document.getElementById('reg-error').style.color = '';
    }));

    async function doLogin() {
        try {
            const login = document.getElementById('login-login').value;
            const pass = document.getElementById('login-password').value;
            const remember = document.getElementById('login-remember').checked;
            const errEl = document.getElementById('login-error');
            const result = await loginUser(login, pass);
            if (!result.ok) { errEl.textContent = result.error; return; }
            if (remember) setSession(login, result.nick, pass);
            currentUser = { login: login.trim(), nick: result.nick, password: pass };
            authOverlay.classList.add('hidden');
            updateBurger();
            loadBalance();
            syncHistoryFromFB();
        } catch (e) { console.error('Login error:', e); document.getElementById('login-error').textContent = 'Ошибка, попробуйте ещё раз'; }
    }

    async function doRegister() {
        try {
            const nick = document.getElementById('reg-nick').value;
            const login = document.getElementById('reg-login').value;
            const pass = document.getElementById('reg-password').value;
            const errEl = document.getElementById('reg-error');
            const result = await registerUser(nick, login, pass);
            if (!result.ok) { errEl.textContent = result.error; return; }
            errEl.style.color = '#4fc978';
            errEl.textContent = 'Аккаунт создан! Войдите.';
            setTimeout(() => {
                tabs.forEach(b => b.classList.remove('active'));
                tabs[0].classList.add('active');
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
                errEl.textContent = '';
                errEl.style.color = '';
                document.getElementById('reg-nick').value = '';
                document.getElementById('reg-login').value = '';
                document.getElementById('reg-password').value = '';
                document.getElementById('login-login').value = login;
            }, 1500);
        } catch (e) { console.error('Register error:', e); document.getElementById('reg-error').textContent = 'Ошибка, попробуйте ещё раз'; }
    }

    document.getElementById('login-submit').addEventListener('click', doLogin);
    document.getElementById('login-password').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
    document.getElementById('login-login').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
    document.getElementById('reg-submit').addEventListener('click', doRegister);
    document.getElementById('reg-password').addEventListener('keydown', e => { if (e.key === 'Enter') doRegister(); });
}

function updateBurger() {
    const menu = document.getElementById('burger-menu');
    if (currentUser) { menu.classList.remove('hidden'); } else { menu.classList.add('hidden'); }
}

// ============ STATS PANEL ============
let currentPanelType = 'stats';

function switchPanelTab(type) {
    currentPanelType = type;
    document.querySelectorAll('.panel-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.panelTab === type);
    });
    document.getElementById('stats-title').textContent = type === 'inventory' ? 'Инвентарь' : 'Статистика';
    if (type === 'inventory') { renderInventory(); } else { renderStats(); }
}

function toggleStatsPanel(type) {
    const panel = document.getElementById('stats-panel');
    const overlay = document.getElementById('stats-overlay');
    const supportBtn = document.querySelector('.support-btn');
    if (panel.classList.contains('open')) {
        panel.classList.remove('open'); overlay.classList.remove('open');
        if (supportBtn) supportBtn.style.display = '';
    } else {
        if (type) switchPanelTab(type);
        panel.classList.add('open'); overlay.classList.add('open');
        if (supportBtn) supportBtn.style.display = 'none';
    }
}

function renderStats() {
    document.getElementById('stats-nick').textContent = currentUser ? currentUser.nick : '';
    const content = document.getElementById('stats-content');
    const history = getHistory();
    if (history.length === 0) { content.innerHTML = '<div class="stats-empty">Пока ничего не открыто</div>'; return; }
    const categories = {};
    const rareItems = [];
    history.forEach(item => {
        const cn = item.caseName || 'Неизвестно';
        if (!categories[cn]) categories[cn] = 0;
        categories[cn]++;
        if (['covert', 'legendary', 'epic'].includes(item.rarity)) rareItems.push(item);
    });
    let html = '<div class="stats-section"><div class="stats-section-title">Общая статистика</div>';
    html += '<div class="stats-row"><span class="stats-row-label">Всего открыто</span><span class="stats-row-value">' + history.length + '</span></div>';
    html += '<div class="stats-row"><span class="stats-row-label">Редких предметов</span><span class="stats-row-value">' + rareItems.length + '</span></div></div>';
    if (Object.keys(categories).length > 0) {
        html += '<div class="stats-section"><div class="stats-section-title">По кейсам</div>';
        Object.keys(categories).sort((a, b) => categories[b] - categories[a]).forEach(n => {
            html += '<div class="stats-row"><span class="stats-row-label">' + n + '</span><span class="stats-row-value">' + categories[n] + '</span></div>';
        });
        html += '</div>';
    }
    if (rareItems.length > 0) {
        html += '<div class="stats-section"><div class="stats-section-title">Редкие предметы</div>';
        rareItems.slice(0, 20).forEach(item => {
            const bt = RARITY_LABELS[item.rarity] || item.rarity;
            html += '<div class="stats-rare-item">';
            html += item.imgUrl ? '<div class="stats-rare-icon"><img src="' + item.imgUrl + '" /></div>' : '<div class="stats-rare-icon">' + (item.icon || '🔫') + '</div>';
            html += '<div class="stats-rare-info"><div class="stats-rare-name">' + item.text + (item.wear ? ' (' + item.wear + ')' : '') + '</div><div class="stats-rare-case">' + (item.caseIcon || '') + ' ' + (item.caseName || '') + '</div></div>';
            html += '<span class="stats-rare-badge rarity-' + item.rarity + '">' + bt + '</span></div>';
        });
        html += '</div>';
    }
    content.innerHTML = html;
    document.getElementById('stats-title').textContent = 'Статистика';
}

function renderInventory() {
    document.getElementById('stats-nick').textContent = currentUser ? currentUser.nick : '';
    const content = document.getElementById('stats-content');
    const history = getHistory();
    if (history.length === 0) { content.innerHTML = '<div class="stats-empty">Пока ничего не открыто</div>'; return; }
    const inventory = {};
    history.forEach((item, idx) => {
        const key = item.text + '|' + (item.wear || '');
        if (!inventory[key]) { inventory[key] = { text: item.text, wear: item.wear || '', icon: item.icon, imgUrl: item.imgUrl, rarity: item.rarity, isCS2: item.isCS2, price: item.price || 0, count: 0, firstIndex: idx }; }
        inventory[key].count++;
    });
    const rarityOrder = ['contraband','covert','legendary','epic','classified','restricted','milspec','industrial','consumer','rare'];
    const invArr = Object.values(inventory).sort((a, b) => {
        const ai = rarityOrder.indexOf(a.rarity);
        const bi = rarityOrder.indexOf(b.rarity);
        if (ai !== bi) return ai - bi;
        return b.count - a.count;
    });
    let html = '<div class="stats-section"><div class="stats-section-title">Инвентарь (' + invArr.length + ')</div>';
    if (invArr.length === 0) {
        html += '<div class="stats-empty">Пусто</div>';
    }
    invArr.forEach(item => {
        const bt = RARITY_LABELS[item.rarity] || item.rarity;
        html += '<div class="stats-rare-item">';
        html += item.imgUrl ? '<div class="stats-rare-icon"><img src="' + item.imgUrl + '" /></div>' : '<div class="stats-rare-icon">' + (item.icon || '🔫') + '</div>';
        html += '<div class="stats-rare-info"><div class="stats-rare-name">' + item.text + (item.wear ? ' (' + item.wear + ')' : '') + '</div><div class="stats-rare-case">×' + item.count;
        if (item.isCS2 && item.price > 0) html += ' · <span style="color:var(--accent)">' + item.price + ' ₽</span>';
        html += '</div></div>';
        if (item.isCS2) {
            html += '<button class="sell-btn" onclick="sellItem(' + item.firstIndex + ')">Продать ' + item.price + ' ₽</button>';
        } else {
            html += '<button class="delete-btn" onclick="deleteItem(' + item.firstIndex + ')">Удалить</button>';
        }
        html += '</div>';
    });
    html += '</div>';
    content.innerHTML = html;
    document.getElementById('stats-title').textContent = 'Инвентарь';
}

function logoutUser() {
    clearSession();
    currentUser = null;
    userBalance = 0;
    updateBalanceUI();
    document.getElementById('stats-panel').classList.remove('open');
    document.getElementById('stats-overlay').classList.remove('open');
    const sb = document.querySelector('.support-btn'); if (sb) sb.style.display = '';
    updateBurger();
    authInitialized = false;
    document.getElementById('auth-overlay').classList.remove('hidden');
    document.getElementById('burger-menu').classList.add('hidden');
}

function setupAuthEvents() {
    document.getElementById('burger-btn').addEventListener('click', () => { toggleStatsPanel('stats'); });
    document.querySelectorAll('.panel-tab').forEach(tab => {
        tab.addEventListener('click', () => { switchPanelTab(tab.dataset.panelTab); });
    });
    document.getElementById('stats-close').addEventListener('click', () => {
        document.getElementById('stats-panel').classList.remove('open');
        document.getElementById('stats-overlay').classList.remove('open');
        const sb = document.querySelector('.support-btn'); if (sb) sb.style.display = '';
    });
    document.getElementById('stats-overlay').addEventListener('click', () => {
        document.getElementById('stats-panel').classList.remove('open');
        document.getElementById('stats-overlay').classList.remove('open');
        const sb = document.querySelector('.support-btn'); if (sb) sb.style.display = '';
    });
    document.getElementById('stats-logout').addEventListener('click', logoutUser);
}

// ============ DOM ============
const homeScreen = document.getElementById('home-screen');
const caseScreen = document.getElementById('case-screen');
const cs2CategoriesScreen = document.getElementById('cs2-categories-screen');
const casesGrid = document.getElementById('cases-grid');
const cs2Grid = document.getElementById('cs2-grid');
const cs2CasesGrid = document.getElementById('cs2-cases-grid');
const backBtn = document.getElementById('back-btn');
const backBtnCs2 = document.getElementById('back-btn-cs2');
const caseIconLarge = document.getElementById('case-icon-large');
const caseTitle = document.getElementById('case-title');
const rollTrack = document.getElementById('roll-track');
const openBtn = document.getElementById('open-btn');
const caseItemsPreview = document.getElementById('case-items-preview');
const resultOverlay = document.getElementById('result-overlay');
const resultCard = document.getElementById('result-card');
const resultRarity = document.getElementById('result-rarity');
const resultIcon = document.getElementById('result-icon');
const resultText = document.getElementById('result-text');
const resultChance = document.getElementById('result-chance');
const resultCloseBtn = document.getElementById('result-close-btn');
const historyPanel = document.getElementById('history-panel');
const historyToggle = document.getElementById('history-toggle');
const historyList = document.getElementById('history-list');
const historyClear = document.getElementById('history-clear');
const cs2CatIcon = document.getElementById('cs2-cat-icon');
const cs2CatTitle = document.getElementById('cs2-cat-title');
const categoryTabs = document.getElementById('category-tabs');

// ============ INIT ============
function init() {
    initFirebase();
    if (initAdminPage()) return;
    renderRealLifeCases();
    renderCS2Grid();
    loadHistory();
    setupEvents();
    initFirebase();
    initAuth();
    setupAuthEvents();
}

function renderRealLifeCases() {
    casesGrid.innerHTML = '';
    REAL_LIFE_CASES.forEach(c => {
        const card = document.createElement('div');
        card.className = 'case-card';
        card.innerHTML = '<span class="case-icon">' + c.icon + '</span><div class="case-name">' + c.name + '</div><div class="case-count">' + c.items.length + ' предметов</div>';
        card.addEventListener('click', () => openCase(c));
        casesGrid.appendChild(card);
    });
}

function renderCS2Grid() {
    cs2Grid.innerHTML = '';
    CS2_CATEGORIES.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'case-card cs2-card';
        card.innerHTML = '<span class="case-icon"><img src="' + WEAPON_BASE_ICONS[cat.id] + '" class="case-icon-img" /></span><div class="case-name">' + cat.name + '</div><div class="case-count">' + CS2_SKINS[cat.id].length + ' скинов</div><div class="case-price">' + cat.price + '</div>';
        card.addEventListener('click', () => openCS2Category(cat));
        cs2Grid.appendChild(card);
    });
    const specificCard = document.createElement('div');
    specificCard.className = 'case-card cs2-card';
    specificCard.style.gridColumn = '1 / -1';
    specificCard.style.background = 'linear-gradient(135deg, rgba(255,71,71,0.08), rgba(255,71,71,0.02))';
    specificCard.innerHTML = '<span class="case-icon"><img src="' + WEAPON_BASE_ICONS.rifles + '" class="case-icon-img" /></span><div class="case-name">КОНКРЕТНОЕ ОРУЖИЕ</div><div class="case-count">Выбери оружие и крутай скины</div><div class="case-price">' + SPECIFIC_WEAPON_PRICE + '</div>';
    specificCard.addEventListener('click', () => openSpecificWeapons());
    cs2Grid.appendChild(specificCard);
}

function setupEvents() {
    backBtn.addEventListener('click', goBack);
    backBtnCs2.addEventListener('click', goBack);
    openBtn.addEventListener('click', roll);
    resultCloseBtn.addEventListener('click', closeResult);
    historyToggle.addEventListener('click', toggleHistory);
    historyClear.addEventListener('click', clearHistory);
    categoryTabs.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    const topupBtn = document.getElementById('topup-btn');
    const topupOverlay = document.getElementById('topup-overlay');
    const topupClose = document.getElementById('topup-close');
    const topupSubmit = document.getElementById('topup-submit');
    const topupKeyInput = document.getElementById('topup-key');
    if (topupBtn) {
        topupBtn.addEventListener('click', () => {
            if (!currentUser) { alert('Войдите в аккаунт'); return; }
            topupOverlay.classList.remove('hidden');
            document.getElementById('topup-error').textContent = '';
            topupKeyInput.value = '';
            topupKeyInput.focus();
        });
    }
    if (topupClose) topupClose.addEventListener('click', () => topupOverlay.classList.add('hidden'));
    if (topupOverlay) topupOverlay.addEventListener('click', (e) => { if (e.target === topupOverlay) topupOverlay.classList.add('hidden'); });
    if (topupSubmit) topupSubmit.addEventListener('click', async () => {
        const code = topupKeyInput.value.trim();
        const errEl = document.getElementById('topup-error');
        if (!code) { errEl.textContent = 'Введите ключ'; errEl.style.color = '#eb4b4b'; return; }
        errEl.textContent = 'Активация...'; errEl.style.color = '#e4ae39';
        const result = await redeemPromoKey(code);
        if (result.ok) {
            errEl.textContent = '+' + result.amount + ' добавлено на баланс!'; errEl.style.color = '#4fc978';
            topupKeyInput.value = '';
        } else {
            errEl.textContent = result.error; errEl.style.color = '#eb4b4b';
        }
    });
    if (topupKeyInput) topupKeyInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') topupSubmit.click(); });
}

function switchTab(tab) {
    currentTab = tab;
    categoryTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    categoryTabs.querySelector('[data-tab="' + tab + '"]').classList.add('active');
    if (tab === 'reallife') { casesGrid.classList.remove('cs2-hidden'); cs2Grid.classList.add('cs2-hidden'); }
    else { casesGrid.classList.add('cs2-hidden'); cs2Grid.classList.remove('cs2-hidden'); }
}

// ============ NAVIGATION ============
function openCase(caseData) {
    currentCase = caseData;
    if (caseData.isCS2 && caseData.imgUrl) { caseIconLarge.innerHTML = '<img src="' + caseData.imgUrl + '" class="case-icon-img" />'; }
    else { caseIconLarge.textContent = caseData.icon; }
    caseTitle.textContent = caseData.name;
    caseTitle.className = 'case-title' + (caseData.isCS2 ? ' cs2-title' : '');
    const rc = document.querySelector('.roll-container');
    if (caseData.isCS2) { rc.classList.add('cs2-roll'); openBtn.classList.add('cs2-btn'); openBtn.querySelector('.btn-text').textContent = 'ОТКРЫТЬ ЗА ' + caseData.price; }
    else { rc.classList.remove('cs2-roll'); openBtn.classList.remove('cs2-btn'); openBtn.querySelector('.btn-text').textContent = 'ОТКРЫТЬ КЕЙС'; }
    previousScreen = 'home';
    homeScreen.classList.remove('active');
    cs2CategoriesScreen.classList.remove('active');
    caseScreen.classList.add('active');
    buildRollTrack(caseData);
    renderCasePreview(caseData);
}

function openCS2Category(category) {
    const skins = CS2_SKINS[category.id];
    if (!skins) return;
    const items = skins.map(s => ({ text: s.name, imgUrl: s.img, rarity: s.rarity }));
    const normalized = normalizeCaseItems(items);
    openCase({ id: category.id, name: category.name, icon: category.icon, imgUrl: WEAPON_BASE_ICONS[category.id], isCS2: true, price: category.price, items: normalized });
    previousScreen = 'home';
}

function openSpecificWeapons() {
    previousScreen = 'home';
    homeScreen.classList.remove('active');
    caseScreen.classList.remove('active');
    cs2CategoriesScreen.classList.add('active');
    cs2CatIcon.innerHTML = '<img src="' + WEAPON_BASE_ICONS.rifles + '" class="case-icon-img" />';
    cs2CatTitle.textContent = 'КОНКРЕТНОЕ ОРУЖИЕ';
    cs2CatTitle.className = 'case-title cs2-title';
    cs2CasesGrid.innerHTML = '';
    SPECIFIC_WEAPONS.forEach(weapon => {
        const card = document.createElement('div');
        card.className = 'case-card cs2-card';
        const previewImg = weapon.skins.length > 0 ? weapon.skins[0].img : '';
        const iconHtml = previewImg
            ? '<span class="case-icon"><img src="' + previewImg + '" class="case-icon-img" /></span>'
            : '<span class="case-icon">' + weapon.icon + '</span>';
        card.innerHTML = iconHtml + '<div class="case-name">' + weapon.name + '</div><div class="case-count">' + weapon.skins.length + ' скинов</div>';
        card.addEventListener('click', () => openWeaponCase(weapon));
        cs2CasesGrid.appendChild(card);
    });
}

function openWeaponCase(weapon) {
    const items = weapon.skins.map(s => ({ text: s.name, imgUrl: s.img, rarity: s.rarity }));
    const normalized = normalizeCaseItems(items);
    openCase({ id: weapon.id, name: weapon.name, icon: weapon.icon, imgUrl: WEAPON_BASE_ICONS[weapon.category], isCS2: true, price: SPECIFIC_WEAPON_PRICE, items: normalized });
    previousScreen = 'specificweapons';
}

function goBack() {
    caseScreen.classList.remove('active');
    cs2CategoriesScreen.classList.remove('active');
    if (previousScreen === 'specificweapons') { homeScreen.classList.add('active'); }
    else if (previousScreen === 'cs2categories') { cs2CategoriesScreen.classList.add('active'); }
    else { homeScreen.classList.add('active'); }
    currentCase = null; isRolling = false;
}

// ============ PREVIEW ============
function renderCasePreview(caseData) {
    const seen = {};
    const unique = [];
    caseData.items.forEach(item => {
        if (!seen[item.text]) { seen[item.text] = true; unique.push(item); }
    });
    const allSameRarity = unique.length > 1 && unique.every(it => it.rarity === unique[0].rarity);
    const sorted = [...unique].sort((a, b) => {
        const ca = CS2_RARITY[a.rarity] ? CS2_RARITY[a.rarity].chance : 0;
        const cb = CS2_RARITY[b.rarity] ? CS2_RARITY[b.rarity].chance : 0;
        return cb - ca;
    });
    const title = caseData.isCS2 ? 'Возможные скины' : 'Возможные варианты';
    caseItemsPreview.innerHTML = '<h3>' + title + '</h3><div class="preview-list">' + sorted.map(item => {
        const displayChance = allSameRarity ? (100 / unique.length).toFixed(2) : (CS2_RARITY[item.rarity] ? CS2_RARITY[item.rarity].chance : item.chance);
        return '<div class="preview-item rarity-' + item.rarity + '">' +
        (item.imgUrl ? '<img src="' + item.imgUrl + '" class="preview-skin-img" />' : '<span class="preview-icon">' + (item.icon || '🔫') + '</span>') +
        '<div class="preview-info"><div class="preview-name">' + item.text + '</div><div class="preview-rarity">' + (RARITY_LABELS[item.rarity] || item.rarity) + '</div></div>' +
        '<div class="preview-chance">' + displayChance + '%</div></div>';
    }).join('') + '</div>';
}

// ============ ROLL TRACK ============
function buildRollTrack(caseData) {
    rollTrack.innerHTML = '';
    rollTrack.style.transition = 'none';
    rollTrack.style.transform = 'translateX(0)';
    for (let i = 0; i < 60; i++) {
        const item = getRandomItem(caseData);
        const el = document.createElement('div');
        el.className = 'roll-item rarity-' + item.rarity;
        el.style.background = RARITY_BG[item.rarity] || 'var(--bg-secondary)';
        el.innerHTML = (item.imgUrl ? '<img src="' + item.imgUrl + '" class="skin-img" />' : '<span class="roll-item-icon">' + (item.icon || '🔫') + '</span>') + '<span class="roll-item-text">' + item.text + '</span>';
        rollTrack.appendChild(el);
    }
}

function getRandomItem(caseData) {
    const rand = Math.random() * 100;
    let cum = 0;
    for (const item of caseData.items) { cum += item.chance; if (rand <= cum) return item; }
    return caseData.items[caseData.items.length - 1];
}

// ============ ROLL ============
function roll() {
    if (isRolling || !currentCase) return;
    if (currentCase.isCS2 && currentCase.price) {
        if (!currentUser) {
            const topupOverlay = document.getElementById('topup-overlay');
            const topupError = document.getElementById('topup-error');
            topupOverlay.classList.remove('hidden');
            topupError.textContent = 'Войдите в аккаунт для открытия кейсов';
            topupError.style.color = '#eb4b4b';
            return;
        }
        if (userBalance < currentCase.price) {
            const topupOverlay = document.getElementById('topup-overlay');
            const topupError = document.getElementById('topup-error');
            topupOverlay.classList.remove('hidden');
            topupError.textContent = 'Недостаточно средств! Баланс: ' + userBalance + ', нужно: ' + currentCase.price + '. Пополните баланс.';
            topupError.style.color = '#eb4b4b';
            return;
        }
        spendBalance(currentCase.price);
    }
    isRolling = true;
    openBtn.disabled = true;
    playSound('open');
    startRollSound();
    buildRollTrack(currentCase);
    const result = getRandomItem(currentCase);
    const wear = currentCase.isCS2 ? getRandomWear() : '';
    const children = rollTrack.children;
    const ri = Math.floor(children.length * 0.75);
    children[ri].innerHTML = (result.imgUrl ? '<img src="' + result.imgUrl + '" class="skin-img" />' : '<span class="roll-item-icon">' + (result.icon || '🔫') + '</span>') + '<span class="roll-item-text">' + result.text + '</span>';
    children[ri].className = 'roll-item rarity-' + result.rarity;
    children[ri].style.background = RARITY_BG[result.rarity] || 'var(--bg-secondary)';
    const iw = children[0].offsetWidth;
    const tc = rollTrack.parentElement.offsetWidth / 2;
    const to = (ri * iw) - tc + (iw / 2);
    requestAnimationFrame(() => {
        rollTrack.style.transition = 'transform 4s cubic-bezier(0.15,0.85,0.2,1)';
        rollTrack.style.transform = 'translateX(-' + to + 'px)';
    });
    setTimeout(() => {
        stopRollSound();
        if (['covert', 'contraband', 'legendary', 'epic'].includes(result.rarity)) { playSound('legendary'); }
        else { playSound('drop'); }
        showResult(result, wear);
        saveToHistory(result, currentCase, wear);
        isRolling = false;
        openBtn.disabled = false;
    }, 4200);
}

// ============ RESULT ============
function showResult(item, wear) {
    resultCard.className = 'result-card rarity-' + item.rarity;
    resultRarity.textContent = RARITY_LABELS[item.rarity] || item.rarity;
    if (item.imgUrl) { resultIcon.innerHTML = '<img src="' + item.imgUrl + '" class="skin-img" />'; }
    else { resultIcon.textContent = item.icon || '🔫'; }
    resultText.textContent = item.text + (wear ? ' (' + wear + ')' : '');

    if (currentCase) {
        const unique = [];
        const seen2 = {};
        currentCase.items.forEach(it => { if (!seen2[it.text]) { seen2[it.text] = true; unique.push(it); } });
        const allSame = unique.length > 1 && unique.every(it => it.rarity === unique[0].rarity);
        const displayChance = allSame ? (100 / unique.length).toFixed(2) : (CS2_RARITY[item.rarity] ? CS2_RARITY[item.rarity].chance : item.chance);
        resultChance.textContent = 'Шанс: ' + displayChance + '%';
    } else {
        resultChance.textContent = 'Шанс: ' + (CS2_RARITY[item.rarity] ? CS2_RARITY[item.rarity].chance : item.chance) + '%';
    }

    const isCS2Skin = currentCase && currentCase.isCS2;

    const steamBtn = document.getElementById('result-steam-btn');
    if (steamBtn) {
        steamBtn.href = getSteamMarketUrl(item.text);
        steamBtn.style.display = isCS2Skin ? '' : 'none';
    }

    resultOverlay.classList.add('show');
}
function closeResult() { resultOverlay.classList.remove('show'); buildRollTrack(currentCase); }

// ============ HISTORY ============
function toggleHistory() { historyPanel.classList.toggle('open'); historyToggle.classList.toggle('rotated'); }

const SKIN_PRICE_RANGES = {
    consumer: [3, 30], industrial: [3, 30],
    milspec: [30, 200], restricted: [30, 200],
    classified: [200, 1000],
    covert: [1000, 5000],
    contraband: [5000, 20000], legendary: [5000, 20000],
    common: [3, 30], rare: [30, 200], epic: [200, 1000],
    mythic: [1000, 5000],
};
function getSkinPrice(rarity) {
    const range = SKIN_PRICE_RANGES[rarity] || [3, 30];
    const price = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
    return Math.round(price * 100) / 100;
}

function sellItem(index) {
    const history = getHistory();
    if (index < 0 || index >= history.length) return;
    const item = history[index];
    if (!item.isCS2) return;
    const price = item.price || 0;
    showConfirmModal('Продать «' + item.text + (item.wear ? ' (' + item.wear + ')' : '') + '» за ' + price + ' ₽?', price, () => {
        history.splice(index, 1);
        localStorage.setItem(getHistoryKey(), JSON.stringify(history));
        addBalance(price);
        syncHistoryToFB();
        renderInventory();
    });
}

function deleteItem(index) {
    const history = getHistory();
    if (index < 0 || index >= history.length) return;
    const item = history[index];
    showConfirmModal('Удалить «' + item.text + (item.wear ? ' (' + item.wear + ')' : '') + '»?', 0, () => {
        history.splice(index, 1);
        localStorage.setItem(getHistoryKey(), JSON.stringify(history));
        syncHistoryToFB();
        renderInventory();
    });
}

function showConfirmModal(text, amount, onConfirm) {
    let overlay = document.getElementById('confirm-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'confirm-overlay';
        overlay.className = 'confirm-overlay';
        overlay.innerHTML = '<div class="confirm-modal">' +
            '<div class="confirm-text" id="confirm-text"></div>' +
            '<div class="confirm-buttons">' +
            '<button class="confirm-yes" id="confirm-yes">Да</button>' +
            '<button class="confirm-no" id="confirm-no">Отмена</button>' +
            '</div></div>';
        document.body.appendChild(overlay);
        document.getElementById('confirm-no').addEventListener('click', () => overlay.classList.add('hidden'));
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.add('hidden'); });
    }
    document.getElementById('confirm-text').textContent = text;
    const yesBtn = document.getElementById('confirm-yes');
    if (amount > 0) {
        yesBtn.textContent = 'Продать за ' + amount + ' ₽';
        yesBtn.className = 'confirm-yes';
    } else {
        yesBtn.textContent = 'Удалить';
        yesBtn.className = 'confirm-yes confirm-delete';
    }
    const newYes = yesBtn.cloneNode(true);
    yesBtn.parentNode.replaceChild(newYes, yesBtn);
    newYes.addEventListener('click', () => { overlay.classList.add('hidden'); onConfirm(); });
    document.getElementById('confirm-no').addEventListener('click', () => overlay.classList.add('hidden'));
    overlay.classList.remove('hidden');
}

function saveToHistory(item, caseData, wear) {
    const h = getHistory();
    const price = caseData.isCS2 ? getSkinPrice(item.rarity) : 0;
    h.unshift({ text: item.text, icon: item.icon || '🔫', imgUrl: item.imgUrl, rarity: item.rarity, caseName: caseData.name, caseIcon: caseData.icon, wear: wear || '', isCS2: !!caseData.isCS2, price: price, time: Date.now() });
    if (h.length > 50) h.pop();
    localStorage.setItem(getHistoryKey(), JSON.stringify(h));
    renderHistory();
}
function loadHistory() { renderHistory(); }
function renderHistory() {
    const h = getHistory();
    if (h.length === 0) { historyList.innerHTML = '<p class="history-empty">Пока ничего не открыто</p>'; return; }
    historyList.innerHTML = h.map(i =>
        '<div class="history-item rarity-' + i.rarity + '">' +
        (i.imgUrl ? '<img src="' + i.imgUrl + '" class="preview-skin-img" />' : '<span class="history-item-icon">' + (i.icon || '🔫') + '</span>') +
        '<div class="history-item-info"><div class="history-item-text">' + i.text + (i.wear ? ' (' + i.wear + ')' : '') + '</div><div class="history-item-case">' + i.caseIcon + ' ' + i.caseName + '</div></div></div>'
    ).join('');
}
function clearHistory() { localStorage.removeItem(getHistoryKey()); renderHistory(); }

// ============ START ============
document.addEventListener('DOMContentLoaded', init);

// ============ GLOBAL IMAGE ERROR HANDLER ============
document.addEventListener('error', function(e) {
    const img = e.target;
    if (img.tagName !== 'IMG') return;
    const src = img.src || '';
    let cat = 'pistols';
    if (src.includes('knife') || src.includes('bayonet') || src.includes('flip') || src.includes('butterfly') || src.includes('gut') || src.includes('falchion') || src.includes('shadow') || src.includes('bowie') || src.includes('huntsman') || src.includes('navaja') || src.includes('stiletto') || src.includes('talon') || src.includes('ursus') || src.includes('nomad') || src.includes('paracord') || src.includes('survival') || src.includes('classic') || src.includes('skeleton') || src.includes('kukri')) cat = 'knives';
    else if (src.includes('glove') || src.includes('leather_') || src.includes('handwrap') || src.includes('specialist') || src.includes('sportgloves') || src.includes('drivergloves') || src.includes('motogloves')) cat = 'gloves';
    else if (src.includes('awp') || src.includes('ssg08') || src.includes('scar20') || src.includes('g3sg1')) cat = 'snipers';
    else if (src.includes('ak47') || src.includes('m4a4') || src.includes('m4a1s') || src.includes('galilar') || src.includes('famas') || src.includes('sg553')) cat = 'rifles';
    const fb = { knives: '🔪', gloves: '🧤', snipers: '🎯', rifles: '💥', pistols: '🔫' };
    const span = document.createElement('span');
    const w = img.offsetWidth || 48;
    const h = img.offsetHeight || 48;
    span.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;font-size:' + Math.min(w,h)*0.5 + 'px;width:' + w + 'px;height:' + h + 'px;';
    span.textContent = fb[cat] || '🔫';
    img.replaceWith(span);
}, true);

// ============ PARTICLES ============
(function() {
    const c = document.getElementById('particles-canvas');
    if (!c) return;
    const ctx = c.getContext('2d');
    let w, h;
    const p = [];
    const N = 80;
    const C = ['rgba(245,166,35,0.5)','rgba(255,71,71,0.4)','rgba(136,71,255,0.3)','rgba(74,158,255,0.3)'];
    function resize() { w = c.width = window.innerWidth; h = c.height = window.innerHeight; }
    window.addEventListener('resize', resize); resize();
    for (let i = 0; i < N; i++) p.push({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*2+0.5, dx: (Math.random()-0.5)*0.4, dy: (Math.random()-0.5)*0.4, c: C[Math.floor(Math.random()*C.length)] });
    function draw() {
        ctx.clearRect(0,0,w,h);
        for (let i = 0; i < p.length; i++) {
            const q = p[i];
            ctx.beginPath(); ctx.arc(q.x,q.y,q.r,0,Math.PI*2); ctx.fillStyle = q.c; ctx.fill();
            q.x += q.dx; q.y += q.dy;
            if (q.x < 0 || q.x > w) q.dx *= -1;
            if (q.y < 0 || q.y > h) q.dy *= -1;
            for (let j = i+1; j < p.length; j++) {
                const r = p[j];
                const d = Math.hypot(q.x-r.x, q.y-r.y);
                if (d < 150) { ctx.beginPath(); ctx.moveTo(q.x,q.y); ctx.lineTo(r.x,r.y); ctx.strokeStyle = 'rgba(255,255,255,' + (0.06*(1-d/150)) + ')'; ctx.lineWidth = 0.5; ctx.stroke(); }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
})();