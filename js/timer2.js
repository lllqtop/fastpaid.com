
  let timer = document.getElementById('timer')
  let timerText = timer.innerText

  let cur_sec
    let diff = 15;
    let now = Math.floor(new Date().getTime() / 1000);
  let db_time  = Math.floor(new Date(now + diff*60).getTime());

  function setTimerText() {
    now = Math.floor(new Date().getTime() / 1000);


    timer.innerText = timerText.replace("00:00", formatTime(db_time - now)) 
    cur_sec = db_time - now
  } setTimerText()

  let int = setInterval(() => {
    if (cur_sec > 0) {
      setTimerText()
    }
    else {
      clearInterval(int)
      // location.href = 'inc/timeout.php' + location.search
    }
  }, 1000);

  function formatTime(t){
    let o = Math.floor(t / 60),
    r = t % 60
    return o < 10 && (o = "0" + o),
    r < 10 && (r = "0" + r),
    o + ":" + r
  }
  
