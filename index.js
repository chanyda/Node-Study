// 10000개를 기준으로 common: 90%, unCommon: 9%, rare: 1% 확률로 등급을 얻을 수 있다.
// 따라서 common은 9000명, unCommon은 900명, rare는 100명이 얻을 수 있다.
// 만일 rare의 100명이 모두 채워졌으면 common과 unCommon 중에서 얻을 수 있게 된다.

const dbCommonCount = 0;
const dbUnCommonCount = 0;
const dbRareCount = 0;

const STANDARD = 10000;

const a = [
    { grade: "Common", value: 90 },
    { grade: "unCommon", value: 9 },
    { grade: "Rare", value: 1 },
];

const getRandomGrade = () => {
    const common = a.find((item) => item.grade === "Common").value;
    console.log(common);

    const commonLimit = STANDARD * (a.find((item) => item.grade === "Common").value / 100);
    const unCommonLimit = STANDARD * (9 / 100);
    const rareLimit = STANDARD * (1 / 100);

    const rnd = Math.random() * 100;
    console.log(rnd);

    if (rnd < commonLimit) {
        // common 90% 확률 - 만약 9000개가 모두 찼으면 함수를 다시 호출하여 재생성
        return dbCommonCount !== commonLimit ? "Common" : getRandomGrade();
    } else if (rnd < commonLimit + unCommonLimit) {
        // unCommon 9% 확률
        return dbUnCommonCount !== unCommonLimit ? "unCommon" : getRandomGrade();
    } else {
        // rare 1% 확률
        return dbRareCount !== rareLimit ? "rare" : getRandomGrade();
    }
};

const grade = getRandomGrade();
console.log(grade);
