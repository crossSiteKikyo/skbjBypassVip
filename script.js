function skbjBypassVip() {
    analyseURL();
}
function analyseURL() {
    /* https://skbj.tv/videos/l2npo1xri1sr와 같이 영문숫자로만 되어있다면 볼 수 없다. 
    현재 해킹당하거나 영상이 내려간 것으로 보임. */
    if(/^https:\/\/skbj.tv\/videos\/[0-9a-zA-Z]+$/.test(window.location.href)) {
        alert("해당 영상은 현재 볼 수 없습니다");
        return;
    }

    // 중간에 -가 들어가 있다면 볼 수 있는 영상.
    const imageContent = document.querySelector('meta[property="og:image"]').content;
    console.log(`imageContent: ${imageContent}`);
    const mp4Name = imageContent.match(/[^/]+.mp4/)[0];
    console.log(`mp4Name: ${mp4Name}`);
    // __NUXT_DATA__에서 mp4Name가 들어있다. 5개월 이상 된 옛날 방식인지 최근 방식인지 확인한다.
	const searchFromObfuscatedRegex = new RegExp(`"https[\\s\\S]+?${mp4Name}"`, 'g');
    console.log(`searchFromObfuscatedRegex: ${searchFromObfuscatedRegex}`);
    const result = document.querySelector('#__NUXT_DATA__').innerHTML.match(searchFromObfuscatedRegex)[0];
    console.log(`result: ${result}`);
    // 결과가 있다면 최근방식.
    if(result) {
        alert("최근방식");
        const videoSrc = result.replace(/[",]/g, "");
        console.log(videoSrc);
        //미리보기와 버튼 삭제후 video 태그 삽입.
        document.querySelector('.player-wrapper.relative.bg-base-200').outerHTML=`<video src="${videoSrc}" style="width:100%;height:100%;" data-v-02e5f75f="" controls></video>`;
    }
    // 결과가 없다면 옛날방식.
    else {
        alert("옛날방식");
        // url에서 마지막 부분.
        const urlCode = window.location.href.match(/[^/]+$/g)[0];
        //미리보기와 버튼 삭제후 iframe삽입. src부분에 urlCode를 삽입하면 된다.
        document.querySelector('.player-wrapper.relative.bg-base-200').innerHTML=`<iframe data-v-1fbe32a4="" id="custom-iframe" src="https://iframe.mediadelivery.net/embed/141502/${urlCode}" loading="lazy" class="main-player absolute bg-base-200 is-loaded" allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;" allowfullscreen=""></iframe>`;
    }
}

skbjBypassVip();