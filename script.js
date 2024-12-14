function skbjBypassVip() {
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
    const result = document.querySelector('#__NUXT_DATA__').innerHTML.match(searchFromObfuscatedRegex);
    console.log(`result: ${result}`);
    // data-v- 속성이 제대로 맞지 않는다면 동영상 재생 ui가 제대로 화면에 표시되지 않음.
    data_v_attr = document.querySelectorAll('.left-content')[0].getAttributeNames().find((val)=>{return val.startsWith('data-v-')});

    // 결과가 있다면 외부 스트리밍방식.
    if(result) {
        // alert("외부 스트리밍 방식");
        const videoSrc = result[0].replace(/[",]/g, "");
        console.log(videoSrc);
        //미리보기와 버튼 삭제후 video 태그 삽입.
        document.querySelector('.player-wrapper.relative.bg-base-200').outerHTML=`<video src="${videoSrc}" style="width:100%;height:100%;" ${data_v_attr}="" controls></video>`;
    }
    // 결과가 없다면 iframe.
    else {
        // alert("iframe방식");
        // url에서 마지막 부분.
        const urlCode = window.location.href.match(/[^/]+$/g)[0];
        //미리보기와 버튼 삭제후 iframe삽입. src부분에 urlCode를 삽입하면 된다.
        document.querySelector('.player-wrapper.relative.bg-base-200').innerHTML=`<iframe ${data_v_attr}="" id="custom-iframe" src="https://iframe.mediadelivery.net/embed/141502/${urlCode}" loading="lazy" class="main-player absolute bg-base-200 is-loaded" allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;" allowfullscreen=""></iframe>`;
    }
}

skbjBypassVip();