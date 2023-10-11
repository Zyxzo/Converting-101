const convert = (inches, unit) => {
  if (isNaN(inches)) {
    throw new Error("Only numbers");
  }

  let result;

  switch (unit) {
    case "-mm":
      result = inches * 25.4;
      break;
    case "-cm":
      result = inches * 2.54;
      break;
    case "-m":
      result = inches * 0.0254;
      break;
    default:
      throw new Error("Invalid unit. Use '-mm', '-cm', or '-m'.");
  }

  return result;
};

if (process.argv.includes("-t")) {
  
  console.log("Running tests");
  testConvert();
} else if (process.argv.length === 4 && process.argv[3].startsWith("-")) {
  
  const inches = parseFloat(process.argv[2]);
  const unit = process.argv[3];
  const result = convert(inches, unit);
  console.log(`${result.toFixed(2)} ${unit.slice(1)}`);
} else {
  console.log("Usage: node convert.js <inches> <-mm | -cm | -m> [-t]");
}

function testConvert() {
  
  const tests = [
    { inches: 3, unit: "-mm", expected: 76.20 },
    { inches: 3, unit: "-cm", expected: 7.62 },
    { inches: 3, unit: "-m", expected: 0.07 },
  ];

  tests.forEach((test, index) => {
    try {
      const result = convert(test.inches, test.unit);
      if (result.toFixed(2) === test.expected.toFixed(2)) {
        console.log(`Test ${index + 1}: Passed`);
      } else {
        console.error(`Test ${index + 1}: Failed`);
        console.error(`  Expected: ${test.expected.toFixed(2)} ${test.unit.slice(1)}`);
        console.error(`  Actual: ${result.toFixed(2)} ${test.unit.slice(1)}`);
      }
    } catch (error) {
      console.error(`Test ${index + 1}: Failed`);
      console.error(`  Error: ${error.message}`);
    }
  });
}