# skbjBypassVip
skbj에서 vip가 아니거나 코인이 없어서 볼 수 없는 영상을 볼 수 있게 만드는 스크립트

## 사용법
### 북마크 사용법
1. 아래 스크립트를 복사하기
```
javascript:(function(){fetch('https://raw.githubusercontent.com/crossSiteKikyo/skbjBypassVip/refs/heads/main/script.js').then((res)=>res.text()).then(scriptContent=>{const skbjScript=document.createElement('script');skbjScript.textContent=scriptContent;document.head.appendChild(skbjScript);})})();
```
2. 브라우저 북마크 또는 즐켜찾기에 추가하기. 이름은 skbj스크립트, url에 위 복사한것 붙여넣기
3. 볼 수 없는 영상에서 북마크 클릭하기
4. 화면이 나오지 않는다면 새로고침해서 다시 시도하기