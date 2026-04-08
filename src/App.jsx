import { useState } from "react"

export default function App() {
  const choices = ["rock", "paper", "scissors"]

  const [userMove, setuserMove] = useState(null)
  const [computerMove, setcomputerMove] = useState(null)
  const [result, setResult] = useState("")
  const [score, setScore] = useState({ user: 0, computer: 0 })
  const [rounds, setRounds] = useState(0)
  const [history, setHistory] = useState([])
  const [streak, setStreak] = useState(0)

  function getcomputerMove() {
    const randomIndex = Math.floor(Math.random() * 3)
    return choices[randomIndex]
  }

  function determineWinner(user, computer) {
    if (user === computer) return "Draw"

    if (
      (user === "rock" && computer === "scissors") ||
      (user === "paper" && computer === "rock") ||
      (user === "scissors" && computer === "paper")
    ) {
      return "You Win"
    }

    return "Computer Wins"
  }

  function play(user) {
    const computer = getcomputerMove()

    setuserMove(user)
    setcomputerMove(computer)
    setRounds(rounds + 1)

    const gameResult = determineWinner(user, computer)
    setResult(gameResult)

    if (gameResult === "You Win") {
      setScore({
        user: score.user + 1,
        computer: score.computer
      })

      setStreak(streak + 1)
    } 
    else if (gameResult === "Computer Wins") {
      setScore({
        user: score.user,
        computer: score.computer + 1
      })

      setStreak(0)
    } 
    else {

    }
    const newEntry = {
      user,
      computer,
      result: gameResult
    }

    setHistory([newEntry, ...history])
  }

  function resetGame() {
    setuserMove(null)
    setcomputerMove(null)
    setResult("")
    setScore({ user: 0, computer: 0 })
    setHistory([])
    setStreak(0)
    setRounds(0)
  }

  return (
  <div className="container">

    <style>{`
      body{
        background:linear-gradient(135deg,#667eea,#764ba2);
        min-height:100vh;
      }

      .container{
        text-align:center;
        margin-top:40px;
        font-family:sans-serif;
        color:white;
      }

      .card{
        background:white;
        color:black;
        width:420px;
        margin:auto;
        padding:25px;
        border-radius:20px;
        box-shadow:0 20px 40px rgba(0,0,0,0.2);
      }

      .buttons{
        display:flex;
        justify-content:center;
        gap:15px;
        margin:20px 0;
      }

      .btn{
        padding:12px 18px;
        font-size:18px;
        border:none;
        border-radius:12px;
        cursor:pointer;
        transition:0.2s;
        background:#f1f5f9;
      }

      .btn:hover{
        transform:scale(1.1);
        background:#e2e8f0;
      }

      .result{
        font-size:26px;
        font-weight:bold;
        margin:10px 0;
      }

      .score{
        background:#f8fafc;
        padding:10px;
        border-radius:10px;
        margin:10px 0;
      }

      .rounds{
        color:#34d399;
        font-weight:bold;
      }

      .streak{
        color:#ff9800;
        font-weight:bold;
      }

      .reset{
        margin-top:10px;
        background:#ef4444;
        color:white;
      }

      .history{
        margin-top:20px;
        text-align:left;
        max-height:200px;
        overflow:auto;
      }

      .history-item{
        background:#f1f5f9;
        padding:8px;
        border-radius:8px;
        margin-bottom:6px;
        font-size:14px;
      }
    `}</style>

    <div className="card">
      <h1>Rock Paper Scissors</h1>

      <div className="buttons">
        <button className="btn" onClick={() => play("rock")}>🪨 Rock</button>
        <button className="btn" onClick={() => play("paper")}>📄 Paper</button>
        <button className="btn" onClick={() => play("scissors")}>✂️ Scissors</button>
      </div>

      <h3>Your Choice: {userMove}</h3>
      <h3>Computer Choice: {computerMove}</h3>

      <div className="result">{result}</div>

      <div className="score">
        Score → You: {score.user} | Computer: {score.computer}
      </div>

      <div className="rounds">Rounds Played: {rounds}</div>

      <div className="streak">🔥 Win Streak: {streak}</div>

      <button className="btn reset" onClick={resetGame}>Reset</button>

      <div className="history">
        <h3>History</h3>

        {history.map((item, index) => (
          <div className="history-item" key={index}>
            You: {item.user} | Computer: {item.computer} → {item.result}
          </div>
        ))}
      </div>
    </div>
  </div>
)
}
