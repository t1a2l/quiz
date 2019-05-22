import React from 'react';

class Quiz extends React.Component{
    constructor(){
        super();
        this.state = {
            questionArr: ["which city is the capital of England?", 
                          "How many wheels you have in a car?",
                          "If a=1 and b=2, what is a+b?",
                          "The city known as the 'IT capital' of India is?",
                          "What is the color of the sun?"
                        ],
            answerArr: [
                        {
                            "Tel aviv": false,
                            "London": true,
                            "Cairo": false,
                            "Jerusalem": false
                        },
                        {
                            "number 2": false,
                            "number 5": false,
                            "number 4": true,
                            "number 3": false
                        },
                        {
                            "number 12": false,
                            "number 3": true,
                            "number 4": false,
                            "number 10": false
                        },
                        {
                            "Bangalore": true,
                            "Mumbai": false,
                            "Mexico": false,
                            "Hyderabad": false
                        },
                        {
                            "Green": false,
                            "Red": false,
                            "Blue": false,
                            "Yellow": true
                        }
                    ],
            questionNum: 1, // The question number currntly displayed
            isStart: true, // Check if it is the first question
            buttonText: "next", // Change the text between 'next' and 'done' on the last question
            data : {
                numOfQuestions: 5 // Number of questions in the question array
            },
            chosenAnswers: [], // Array of the chosen answers
            scores: [] // Array to check the correct answer
        }
    }

    componentWillMount(){
        let answerArr = [];
        this.state.answerArr.forEach(item=>{
            answerArr.push(Object.keys(item)[0]);
        });
        this.setState({
            chosenAnswers: answerArr
        });

        if(this.state.questionArr.length === 1){
            this.setState({
                buttonText: "done"
            })
        } else if(this.state.questionNum === this.state.data.numOfQuestions){
            this.setState({
                buttonText: "done",
                isStart: false
            });
        } 
    }

    goToPrev = e => {
        // Check if the prev question is the first one
        if(this.state.questionNum - 1 === 1){
            this.setState({
                questionNum: this.state.questionNum - 1,
                isStart: true,
                buttonText: "next"
            });
        } else {
            this.setState({
                questionNum: this.state.questionNum - 1,
                buttonText: "next",
                isStart: false
            });
        }
        
    }

    goToNext = e => {
        // Check if the next question is the last one
        if(this.state.questionNum + 1 >= this.state.data.numOfQuestions){
            if(this.state.buttonText === "done"){
                this.calculateScore();
            } else {
                this.setState({
                    questionNum: this.state.questionNum + 1,
                    buttonText: "done",
                    isStart: false
                });
            }
        } else {
            this.setState({
                questionNum: this.state.questionNum + 1,
                buttonText: "next",
                isStart: false
            });
        }
        
    }

    calculateScore = e => {
        let score = 0;
        this.state.scores.forEach(res =>{
            if(res)
                score++;
        })
        let result = (100 * score) / this.state.data.numOfQuestions;
        alert("Your result is " + result);
    }

    handleOptionChange = e => {
        let answer = e.target.value;
        let value = this.state.answerArr[this.state.questionNum-1][answer];
        let index = this.state.questionNum - 1;
        let answersTemp = this.state.chosenAnswers;
        let scoresTemp = this.state.scores;
        answersTemp[index] = answer;
        scoresTemp[index] = value;
        this.setState({
            chosenAnswers: answersTemp,
            scores: scoresTemp
        });
    }

    render(){ 
        return(
            <div style={{
                padding: "120px"
            }}>
                <form style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <label>{this.state.questionArr[this.state.questionNum-1]}</label>
                        {
                            Object.keys(this.state.answerArr[this.state.questionNum-1]).map((item, index) =>{
                                return  <div className="radio" key={index} style={{
                                                                                      padding: "5px"                      
                                                                                  }}>
                                            <label>
                                                <input type="radio" value={item} onChange={this.handleOptionChange} checked={this.state.chosenAnswers[this.state.questionNum-1] === item}/>
                                                {item}
                                            </label>
                                        </div>
                            })
                        }
                </form>
                <div>
                    <button onClick={this.goToPrev} disabled={this.state.isStart}>prev</button>
                    <button onClick={this.goToNext} style={{marginLeft: "145px"}}>{this.state.buttonText}</button>
                </div>
            </div>
        )
    }
}

export default Quiz;