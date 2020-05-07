var that = window;
var pjax = new Pjax({
    selectors: [
        "title",
        "main"
    ],
    cacheBust: false,
    scrollTo: $('.main').position().top - 60
});
var loadingBar = document.querySelector('.loading-bar');
var progress = document.querySelector('.loading-bar .progress');
var timer = null;

// Pjax 开始时执行的函数
document.addEventListener('pjax:send', function () {
    // 删除播放器
    if (window.aplayers) {
        for (let i = 0; i < window.aplayers.length; i++) {
            window.aplayers[i].destroy();
        }
        window.aplayers = [];
    }
    // 进度条默认已经加载 20%
    var loadingBarWidth = 20;
    // 进度条的最大增加宽度
    var MAX_LOADING_WIDTH = 95;

    // 显示进度条
    loadingBar.classList.add('loading');
    // 初始化进度条的宽度
    progress.style.width = loadingBarWidth + '%';

    clearInterval(timer);
    timer = setInterval(function () {
        // 进度条的增加速度（可以改为一个随机值，显得更加真实）
        loadingBarWidth += 3;
        // 当进度条到达 95% 后停止增加
        if (loadingBarWidth > MAX_LOADING_WIDTH) {
            loadingBarWidth = MAX_LOADING_WIDTH;
        }

        progress.style.width = loadingBarWidth + '%';
    }, 100);
});

// Pjax 完成之后执行的函数
document.addEventListener('pjax:complete', function () {
    clearInterval(timer);
    progress.style.width = '100%';
    loadingBar.classList.remove('loading');
    //重载侧边栏affix
    affix();
    setTimeout(function () {
        progress.style.width = 0;
    }, 400);
    //重载阅读数
    $(function () {
        var Counter = AV.Object.extend("Counter");
        if ($('.leancloud_visitors').length == 1) {
            addCount(Counter);
        } else if ($('.post-title-link').length > 1) {
            showTime(Counter);
        }
    });
    //重载评论
    new Valine({
        el: '.comments',
        notify: false,
        verify: false,
        appId: 'V1Q5z5Gjq9fnYEHGB05RjoMF-gzGzoHsz',
        appKey: 'cksjsrfoq0N1MAvbrT2KYnYB',
        placeholder: '这是萌萌哒占位符！ o(*≧▽≦)ツ',
        path: that.location.pathname
    });


    //自动滚动
    $('html, body').animate({
        scrollTop: $('.main').position().top - 60
    }, 200);
});