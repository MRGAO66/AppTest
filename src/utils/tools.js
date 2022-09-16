//移动变顺滑
function moveTo(start, end, dom, prop) {
    let dis = 0;
    let speed = 5;
    if (end < 0) {
      speed = -5;
    }
    const timer = setInterval(() => {
      dis += speed;
      dom[prop] = start + dis;
      if (Math.abs(dis) > Math.abs(end)) {
        dom[prop] = start + end;
        clearInterval(timer);
      }
    }, 2);
}

export default moveTo;