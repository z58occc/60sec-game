import { useEffect, useRef, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { all, create } from 'mathjs';

function App() {
  const startRef = useRef(null);
  const mainRef = useRef(null);
  const restartRef = useRef(null);
  const [countdown, setCountdown] = useState(60);
  const [resetTime, setResetTime] = useState(false);
  const [resetTopic, setResetTopic] = useState(false);
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [symbol, setSymbol] = useState('');
  const [playerAns, setPlayerAns] = useState('');
  const [correctAns, setCorrectAns] = useState('');
  const inputRef = useRef(null);
  const [score, setScore] = useState(0);

  const handleInputAns = (e) => {
    setPlayerAns(e.target.value);
  }
  const handleSentAns = (e) => {
    const { key } = e;
    if (key === 'Enter') {
      if (correctAns.toString() === playerAns) {
        if (countdown < 20) {
          setScore(score + 5);
        } else {
          setScore(score + 1);
        }
      } else {
        if (score === 0) {
          return
        }
        setScore(score - 1);
      }
      setResetTopic(prev => !prev);
      inputRef.current.value = '';
    }
  }

  //mathjs套件
  const config = {}
  const math = create(all, config)


  useEffect(() => {
    let num1;
    let num2;
    if (countdown > 40) {
      num1 = (Math.floor(Math.random() * 10));
      num2 = (Math.floor((Math.random() * 9) + 1));
    } else if (countdown > 20) {
      num1 = (Math.floor((Math.random() * 90) + 10));
      num2 = (Math.floor((Math.random() * 90) + 10));
    } else if (countdown > 0) {
      num1 = (Math.floor((Math.random() * 900) + 100));
      num2 = (Math.floor((Math.random() * 900) + 100));
    }

    setNum1(num1);
    setNum2(num2);
    const symbols = ['+', '-', '×', '÷'];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    setSymbol(symbol);
    try {
      const ans = num1 + symbol + num2;
      const result = ans.replace(/[× ÷]/g,//把乘除換成 '*' '/'符合套件格式
        (match) => {
          if (match === '×') {
            return '*'
          } else if (match === '÷') {
            return '/'
          }
        }
      );
      const correctAns = math.evaluate(result);
      const finalAns = Number.isInteger(correctAns) ? correctAns : correctAns.toFixed(1);
      setCorrectAns(finalAns);
    } catch (error) {
      console.log(error);
    }
  }, [resetTopic])
  const start = (e) => {
    const { type } = e;
    if (type === 'click') {
      startRef.current.style.display = 'none'
      mainRef.current.style.display = 'grid'
      setResetTime(true);
      setResetTopic(prev => !prev);
      setCountdown(60);
    }
  }
  const tryAgain = (e) => {
    const { type } = e;
    if (type === 'click') {
      restartRef.current.style.display = 'none'
      startRef.current.style.display = 'grid'
      setScore(0);
      setResetTime(false);
    }
  }
  useEffect(() => {
    if (!resetTime) return;
    let time = 3;
    const intervalId = setInterval(() => {
      time = time - 1;
      setCountdown(time);
    }, 1000)
    return () => clearInterval(intervalId);
  }, [resetTime])

  useEffect(() => {
    if (countdown === 0) {
      mainRef.current.style.display = 'none'
      restartRef.current.style.display = 'grid'
    }

  }, [countdown])

  useEffect(() => {
    const input = document.querySelector('input[type="number"]');
    const handleWheel = (e) => {
      e.preventDefault();
    };


    // 為每個 input 添加非 passive 的事件監聽器
    input.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      input.removeEventListener('wheel', handleWheel);
    };
  }, []);





  return (
    <div className="App "
      style={{ height: '100%' }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Chocolate+Classical+Sans&family=Noto+Sans+TC:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
      <div className='start back  vh-100'
        style={{
          display: 'grid'
        }}
        ref={startRef}
      >
        <div className="
            d-flex
            justify-content-center
            align-items-center
            "
          style={{
            marginTop: '174px',
            marginBottom: '67px'
          }}
        >
          <div className='title-1'>
            60
          </div>
          <div className="title-2"
            style={{
              position: 'relative'
            }}
          >
            SECONDS CHALLENGE
            <div className='symbol'>
              +−×÷
            </div>
            <div className='line-1'></div>
          </div>
        </div>
        <div className='
            d-flex
            justify-content-center
            align-items-center
            '>
          <div className='start-box
              d-flex
            justify-content-center
            align-items-center
              '
            onClick={(e) => start(e)}
          >
            <div className='start-word
            d-flex
            justify-content-center
            align-items-center
            '
            >
              START!
            </div>
          </div>
        </div>
        <div className='text-center slogan'>
          try to answer more as you can
        </div>

      </div>
      <div className='main back  vh-100'
        style={{
          display: 'none'
        }}
        ref={mainRef}
      >
        <div className="
         d-flex
        justify-content-center
        align-items-center
        "
          style={{
            marginTop: '213px',
            marginBottom: '104px'
          }}
        >
          <div>
            <div className='title-3-border'>
              <div className='title-3'>
                60 SECONDS CHALLENGE
              </div>
            </div>
            <div className="d-flex">
              <div className='score'>
                SCORE
              </div>
              <div className='question-n d-flex
                      align-items-center
                      '>
                0
                {score < 10 ? '0' : ''}
                {score}
              </div>
            </div>
          </div>
          <div className="countdown"
          >
            00 : {countdown < 10 ? `0${countdown}` : `${countdown}`}
          </div>
        </div>

        <div className='row g-0
        d-flex
        justify-content-center
           '
          style={{
            marginBottom: '212px',
          }}
        >
          <div className='col cal-box
              d-flex
              justify-content-center
              align-items-center
            '
            style={{
              maxWidth: '445px',
              fontSize: `${num1.toString().length > 2 ? '80px' : ''}`
            }}
          >
            <div>
              {num1} <span className='text-white'>{symbol}</span> {num2} <span className='text-white'>=</span>
            </div>
          </div>
          <div className='col
          '
            style={{
              maxWidth: '255px',
            }}
          >
            <div className=' answer-box
            '

            >
              <div className='answer
              '

              >
                <input className='border-0' type="number"
                  onChange={(e) => handleInputAns(e)}
                  onKeyDown={(e) => handleSentAns(e)}
                  style={{
                    width: `${Math.max(170, 170 + (playerAns.length - 3) * 75)}px`,
                    maxWidth: '470px',
                    height: '131px',
                    font: 'normal normal bold 112px/112px  Roboto Condensed',
                  }}
                  ref={inputRef}

                />
              </div>

            </div>
            <div className='hint text-center 
            d-flex
            justify-content-center
            align-items-center
            '>
              press enter to answer
              <br />
              （小數部分請四捨五入取到小數點下一位）
            </div>
          </div>
        </div>
      </div>

      <div
        ref={restartRef}
        className='restart back  vh-100'
        style={{
          display: 'none'
        }}
      >
        <div className="
            d-flex
            justify-content-center
            align-items-center
            flex-column
            "
          style={{
            marginTop: '191px',
          }}
        >
          <div className='title-3-border'>
            <div className='title-3'>
              60 SECONDS CHALLENGE
            </div>
          </div>
          <div className="final-score"
            style={{
              marginTop: '8px'
            }}
          >
            —
            <span className='final-score text-black'>
              YOUR FINAL SCORE
            </span>
            —
          </div>
          <div className='point'
            style={{
              marginBottom: '104px'
            }}
          >
            {score}
          </div>
        </div>
        <div className='
            d-flex
            justify-content-center
            align-items-center
            '>
          <div className='start-box
              d-flex
            justify-content-center
            align-items-center
              '
            style={{
              marginBottom: '191px'
            }}
            onClick={(e) => tryAgain(e)}
          >
            <div className='try-again'
            >
              TRY AGAIN!
            </div>
          </div>
        </div>


      </div>



    </div>
  );
}

export default App;

//79行的math兩個問題
//答案要給到小數幾位（玩家輸入的答案符合幾位算對）小數部分取到小數點下一位
//除0問題解決

