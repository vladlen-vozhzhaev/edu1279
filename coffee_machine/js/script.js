      let bills = document.querySelectorAll("img[src$='rub.jpg']");
      let progressBar = document.querySelector(".progress-bar");
      let progressCount = 0;
      
      
      console.log(bills);
      for(let i=0; i<bills.length; i++){
        bills[i].onmousedown = function(){
          let bill = this;
          bill.style.position = "absolute";
          bill.style.transform= "rotate(90deg)";
          bill.ondragstart = function(){return false};
          bill_width = bill.getBoundingClientRect().width;
          bill_height= bill.getBoundingClientRect().height;
          bill.style.left = event.pageX - (bill_height/2) + 'px';
          bill.style.top  = event.pageY - (bill_width/2) + 'px';
          document.onmousemove = function(e){
            bill.style.left = e.pageX - (bill_height/2) + 'px';
            bill.style.top  = e.pageY - (bill_width/2) + 'px';
          }
          bill.onmouseup = function(){
            document.onmousemove = null;
            let bill_acc_top = bill_acc.getBoundingClientRect().top;
            let bill_acc_right = bill_acc.getBoundingClientRect().right;
            let bill_acc_left = bill_acc.getBoundingClientRect().left;
            let bill_acc_bottom = bill_acc.getBoundingClientRect().bottom - (bill_acc.getBoundingClientRect().height/3)*2;
            let bill_top = bill.getBoundingClientRect().top;
            let bill_right = bill.getBoundingClientRect().right;
            let bill_left = bill.getBoundingClientRect().left;
            if(bill_top > bill_acc_top && bill_right < bill_acc_right && bill_left > bill_acc_left && bill_top < bill_acc_bottom){
              bill.hidden = true;
              money.value = +money.value + +bill.dataset.value;
              balance.innerText = money.value;
            }
          }
        }
      }
    
    
      function getCoffee(coffeeName, cost){
        if(money.value >= cost){
          money.value = money.value - cost;
          balance.innerText = money.value;
          progressBar.hidden = false;
          info.innerText = "Напиток готовится, ожидайте...";
          blocker.style.height = "100vh";
          let timerId = setInterval(()=>{
            progressCount++;
            progressBar.style.width = progressCount+"%";
            progressBar.innerText = progressCount+"%";
            if(progressCount < 30){
              info.innerHTML = `Напиток готовится,<br> <i class="fas fa-hourglass-start"></i> ожидайте...`
            }else if(progressCount<60){
              info.innerHTML = `Напиток готовится,<br> <i class="fas fa-hourglass-half"></i> ожидайте...`
            }else if(progressCount>60){
              info.innerHTML = `Напиток готовится,<br> <i class="fas fa-hourglass-end"></i> ожидайте...`;
            }
              
            if (progressCount == 100){
              info.innerHTML = "<i class='fas fa-mug-hot'></i> Кофе "+coffeeName+" готов"; 
              progressBar.hidden = true;
              progressBar.style.width = 0+"%";
              progressCount = 0;
              blocker.style.height = "0vh";
              clearInterval(timerId);
            }
          },100);
        }else{
          info.innerText = "Недостаточно денег";
        }
      }
      
      
      function getChange(num){
        let coin;
        let left = getRandom(0, change_box.getBoundingClientRect().width-60);
        let top = getRandom(0, change_box.getBoundingClientRect().height-60);
        if(num>=10) coin = 10;
        else if(num>=5) coin = 5;
        else if(num>=2) coin = 2;
        else if(num>=1) coin = 1;
        
        if(coin>0){
          change_box.innerHTML += `<img style="left:${left}px; top:${top}px;" src="/img/${coin}rub.png" onclick="this.hidden=true">`;
          getChange(num-coin);
        }else{
          money.value = 0;
          balance.innerText = money.value;
          let audio = new Audio("http://1279.vozhzhaev.ru/audio/03927.mp3");
          audio.play();
        }
      }
      function getRandom(min, max){
        return Math.random()*(max-min)+min
      }
