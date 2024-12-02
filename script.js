function skbjBypassVip() {
    analyseURL();
}
function analyseURL() {
    /* https://skbj.tv/videos/l2npo1xri1sr와 같이 영문숫자로만 되어있다면 볼 수 없다. 
    현재 해킹당하거나 영상이 내려간 것으로 보임. */
    if(/^https:\/\/skbj.tv\/videos\/[0-9a-zA-Z]+$/.test(window.location.href)) {
        alert("해당 영상은 볼 수 없습니다");
        return;
    }

    // 중간에 -가 들어가 있다면 볼 수 있는 영상.
    const imageContent = document.querySelector('meta[property="og:image"]').content;
    const mp4Name = imageContent.match(/[^/]+.mp4/)[0];
    // __NUXT_DATA__에서 mp4Name가 들어있다. 5개월 이상 된 옛날 방식인지 최근 방식인지 확인한다.
	const searchFromObfuscatedRegex = new RegExp(`"https[\s\S]+?${mp4Name}"`, 'g');
    const result = document.querySelector('#__NUXT_DATA__').innerHTML.match(searchFromObfuscatedRegex);
    // 결과가 있다면 최근방식.
    if(result) {
        alert("최근방식");
    }
    // 결과가 없다면 옛날방식.
    else {
        alert("옛날방식");
    }
}

skbjBypassVip();