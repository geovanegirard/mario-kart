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

const player3 =  {
    nome: "Bowser",
    velocidade: 5,
    manobrabilidade: 2,
    poder: 5,
    pontos: 0,
};

const player4 =  {
    nome: "Peach",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 2,
    pontos: 0,
};

const player5 =  {
    nome: "Yoshi",
    velocidade: 2,
    manobrabilidade: 4,
    poder: 3,
    pontos: 0,
};

const player6 =  {
    nome: "Donkey Kong",
    velocidade: 2,
    manobrabilidade: 2,
    poder: 5,
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

async function getRandomElement() {
    let fight = Math.random();
    let effect

    switch (true) {
        case fight < 0.5:
            effect = "CASCO";
            break;
        default:
            effect = "BOMBA";
    }

    return effect
}
// const prompt = require('prompt-sync')();
// const nome = prompt('Qual seu nome: ');
// console.log("Olá " + nome);

async function logRollResult(charaterName, block, diceResult, attribute) {
    console.log(`${charaterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        //sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        let element = await getRandomElement();
        if (block === "CONFRONTO") {
            console.log(`Efeito: ${element}`)
        }
        
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

        if (totalTestSikll1 === totalTestSikll2) {
            console.log("Empate, ninguém pontua.");
        }
    }
    if (block === "CURVA") {
        totalTestSikll1 = diceResult1 + character1.manobrabilidade;
        totalTestSikll2 = diceResult2 + character2.manobrabilidade;

        await logRollResult(character1.nome, "manobrabilidade", diceResult1, character1.manobrabilidade);
        await logRollResult(character2.nome, "manobrabilidade", diceResult2, character2.manobrabilidade);

        if (totalTestSikll1 === totalTestSikll2) {
            console.log("Empate, ninguém pontua.");
        }
    }
    if (block === "CONFRONTO") {
        let powerResult1 = diceResult1 + character1.poder;
        let powerResult2 = diceResult2 + character2.poder;

        console.log(`${character1.nome} confrontou com ${character2.nome}! 🥊`);

        await logRollResult(character1.nome, "poder", diceResult1, character1.poder);
        await logRollResult(character2.nome, "poder", diceResult2, character2.poder);

        if (powerResult1 > powerResult2 && character2.pontos > 0 && element === "CASCO") {
            console.log(`${character1.nome} Venceu o confronto! ${character2.nome} perdeu um ponto 💥.`);
            character2.pontos --;
        }else if (powerResult1 > powerResult2 && character2.pontos > 1 && element === "BOMBA") {
            console.log(`${character1.nome} Venceu o confronto! ${character2.nome} perdeu dois pontos 💥.`);
            character2.pontos -= 2;
        }

        if (powerResult2 > powerResult1 && character1.pontos > 0 && element === "CASCO") {
            console.log(`${character2.nome} Venceu o confronto! ${character1.nome} perdeu um ponto 💥.`);
            character1.pontos --;
        }else if (powerResult2 > powerResult1 && character1.pontos > 1 && element === "BOMBA") {
            console.log(`${character2.nome} Venceu o confronto! ${character1.nome} perdeu dois pontos 💥.`);
            character1.pontos -= 2;
        }

        console.log(powerResult2 === powerResult1 ? "Confronto empatado! Nenhum ponto foi perdido." : "");

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
}

async function declareWinner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.nome}: ${character1.pontos} ponto(s).`);
    console.log(`${character2.nome}: ${character2.pontos} ponto(s).`);

    if(character1.pontos > character2.pontos) {
        console.log(`\n${character1.nome} venceu a corrida! Parabéns! 🏆`)
    }else if(character2.pontos > character1.pontos) {
        console.log(`\n${character2.nome} venceu a corrida! Parabéns! 🏆`)
    }else {
        console.log("\nA corrida terminou em empate.")
    }
}

async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando ...\n`);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
}
main();