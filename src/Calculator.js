import {useState, useEffect} from "react";
import firebase from "firebase/app";
import {collection, addDoc, getDocs} from "firebase/firestore";
import { db } from "./FbConfig";

const Calculator = () => {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	
	
	const handleButtonClick = (value) => {
		if (value === "%") 
		{
			setInput((prevInput)=> prevInput + value);
		}
		else
		{
			setInput((prevInput) => prevInput + value);
		}
	};

	const handleClearClick = () => {
		setInput("");
		setOutput("");
	};
	const calculationsRef = collection(db, "calculations");
	const handleCalculateClick = () => {
	try {
	const hasOperators = /[+\-*/%^]/.test(input);
	if (!hasOperators) {
		alert("Incomplete Input ! Please enter a valid math expression. ");
		setOutput("");
		console.log(output);
		return;
			
		}
	let result;
	if (input.includes("^")) {
		const [base, exponent] = input.split("^").map(Number);
		result = Math.pow(base, exponent);
			} 
		else if (input.includes("%")) {
			result = input.replace(/(\d+)%/g, "($1/100)");
			result = eval(result);
			}
		else if (input === "") {
			alert("Input cannot be empty!");
			console.log("error");	
			}
		else {
			result = eval(input);
			if (result === Infinity) {
				alert("Zero Division Error!");
				}
			}

	const validChars="0123456789+-*^%/().";
		for (let char of input) {
			if(!validChars.includes(char)) {
				alert("Invalid Input! Only numbers and math operators are allowed.");
				console.log("error");
				return;
			}			
		setOutput(result.toFixed(2).toString());
		const calculationsRef = collection(db, "calculations");
		addDoc(calculationsRef, {
			calculation: input,
			result: setOutput
		})
		.then((docRef) => {
			console.log("Document written with ID: ", docRef.id);
		})
	.catch((error) => {
		console.error("Error adding document: ", error);
	});

	}
	}
	catch (error) {
	console.log("Error : " + error);
	if (error.message === "Unexpected end of input") {
		alert("Incomplete input!");
		console.log("error");
		setTimeout(() => {
			setOutput("");
			}, 1000);
			return;
		} 
	else if (error.message === "Unexpected token ILLEGAL") {
		alert("Invalid input!");
		console.log("error");
		setTimeout( () => {
			setOutput("");
			}, 1000);
			return;		
		}
	else if (error.message === "Cannot read property 'toString' of undefined") {
		alert("Input cannot be empty!");
		console.log("error");
		setTimeout( () => {
			setOutput("");
			}, 1000);
			return;
    		} 
	else if (error.message.includes("is not a function")) {
		alert("Text and special characters not allowed, except Math operators.");
		console.log("error");
		setTimeout( () => {
			setOutput("");
			}, 1000);
			return;
		} 
	else {
		console.log("error");
		alert("Invalid Input! Please enter numbers and math operators only.");
		setTimeout( () => {
			setOutput("");
			}, 1000);
			return;
		}
	}
};

	
	const handlePlusMinusClick = () => {
		setInput((prevInput) => {
			if(!isNaN(prevInput)) {
				return(-prevInput).toString();
	

			}
			else {
				return prevInput;
	

			}
		});
	};

	const handlePercentageClick = () => {
	setInput((prevInput) => {
	if (!isNaN(prevInput)) {
        return (prevInput / 100).toString();
	

	} 
	else {
	return prevInput;
	

			}
		});
	};
	
	const handleOperatorClick = (newOperator) => {
		let currentExp = input;
		const lastChar = currentExp[currentExp.length - 1];
	if (['+', '-', '*', '/', '.', '%', '^'].includes(lastChar)) 
		{
		currentExp = currentExp.slice(0, -1) + newOperator;
	

		}
	 else {
		currentExp += newOperator;
			
	}

		setInput(currentExp);
	};

	const handleHistoryClick = async () => {
		const calculationsSnapshot = await getDocs(calculationsRef);
		calculationsSnapshot.forEach((doc) => {
			console.log(doc.data());
		});
	
};
return(
	<>
	<center>
	<div className="title">
		<h1> Calculator App </h1>
	</div>
	<div className="calculator-container">

		<div className= "plus-minus-button">
			<button onClick={handlePlusMinusClick}>+/-</button>
		</div>

		<div className="display">
			<textarea rows={2} style={{padding: '0.25rem'}} placeholder="0" value={output || input} onChange={(event) => setInput(event.target.value)}/>
		</div>	
		
		
		<div className="buttons">

			<div className="number-buttons">
              { [7,8,9,4,5,6,1,2,3,".",0].map( (value) => (
                <button key={value} onClick={() => handleButtonClick(value.toString())}>
                  {value}
                </button>
              ))}
		<button style={{color:'blue'}} id="calculate" className="calculate-button" onClick={handleCalculateClick}>
		=	
		</button>
            </div>

			<div className="operation-buttons">
				<button onClick={ () => handleOperatorClick("+") }>+</button>
				<button onClick={ () => handleOperatorClick("-") }>-</button>
				<button onClick={ () => handleOperatorClick("*") }>x</button>
				<button onClick={ () => handleOperatorClick("/") }>/</button>
				<button onClick={ () => handleOperatorClick("^") }>^</button>
				<button onClick={handlePercentageClick}>%</button>
				<div className="controls">
				<button className="clear-button" onClick={handleClearClick}>
				clear
				</button>
				<button className="history-button" onClick={handleHistoryClick}>
				History
				</button>
				</div>
			</div>
		</div>
	</div>

	</center>
	</>
);
};

export default Calculator;