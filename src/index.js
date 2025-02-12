const player1 =  {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
};

const player2 =  {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0,
};

async function rollDice() {
    return Math.floor (Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break
        default:
            result = "CONFRONTO";
    }

    return result
}

async function logRollResult(charaterName, block, diceResult, attribute) {
    console.log(`${charaterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        //sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        //rolar dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSikll1 = 0;
    let totalTestSikll2 = 0;

    if (block === "RETA") {
        totalTestSikll1 = diceResult1 + character1.velocidade;
        totalTestSikll2 = diceResult2 + character2.velocidade;

        await logRollResult(character1.nome, "velocidade", diceResult1, character1.velocidade);
        await logRollResult(character2.nome, "velocidade", diceResult2, character2.velocidade);
    }
    if (block === "CURVA") {
        totalTestSikll1 = diceResult1 + character1.manobrabilidade;
        totalTestSikll2 = diceResult2 + character2.manobrabilidade;

        await logRollResult(character1.nome, "manobrabilidade", diceResult1, character1.manobrabilidade);
        await logRollResult(character2.nome, "manobrabilidade", diceResult2, character2.manobrabilidade);
    }
    if (block === "CONFRONTO") {
        let powerResult1 = diceResult1 + character1.poder;
        let powerResult2 = diceResult2 + character2.poder;
    }

    if (totalTestSikll1 > totalTestSikll2) {
        console.log(`${character1.nome} marcou um ponto!`);
        character1.pontos++;
    }else if (totalTestSikll2 >totalTestSikll1) {
        console.log(`${character2.nome} marcou um ponto!`);
        character2.pontos++;
    }

    console.log("---------------------------------------------")
}

async function getRandomBlock() {
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break
        default:
            result = "CONFRONTO";
        }
    
        return result
    }
}

async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando ...\n`);
    await playRaceEngine(player1, player2);
}
main();