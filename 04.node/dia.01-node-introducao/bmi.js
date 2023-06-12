const readline = require('readline-sync');


function bmi(height, weight) {
    if (height > 3) {
    const newHeight = height / 100
    return console.log(weight / (newHeight * newHeight))
    }
  return console.log(weight / (height * height))
}

function main() {
    const height = readline.questionFloat('What’s your height? ');
    const weight = readline.questionFloat('What’s your weight? ');

    const result = bmi(height, weight);

    const bmiResult = bmi3(result);

    console.log(result);
    console.log(bmiResult);

}

const BMI_MAX_AND_MIN = {
    'Underweight': {
      minBMI: 0,
      maxBMI: 18.4,
    },
    'Normal Weight': {
      minBMI: 18.5,
      maxBMI: 24.9,
    },
    'Overweight': {
      minBMI: 25,
      maxBMI: 29.9,
    },
    'Obese Class I': {
      minBMI: 30.0,
      maxBMI: 34.9,
    },
    'Obese Class II': {
      minBMI: 35,
      maxBMI: 39.9,
    },
    'Obese Class III': {
      minBMI: 40,
      maxBMI: 100,
    },
  };

function bmi3(bmi) {
    const statuses = Object.keys(BMI_MAX_AND_MIN);

    const resultFind = statuses.find((status) => {
    const { maxBMI, minBMI } = BMI_MAX_AND_MIN[status];

    return bmi >= minBMI && bmi <= maxBMI;
    
    });

  return resultFind;

}

main();